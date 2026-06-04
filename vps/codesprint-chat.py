#!/usr/bin/env python3
"""
📡 CodeSprint — Chat Service (VPS)
Endpoint /chat integra com Gemini 2.5 Flash para atendimento automatizado (Sofia).
Notifica eventos e captação de leads via Telegram.

Roda na VPS como serviço systemd na porta 8056.
O Nginx faz proxy_pass /chat -> localhost:8056
"""

import os
import re
import json
import time
import threading
import urllib.request
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ──────────────────── Config ────────────────────
PORT = 8056
LOG_DIR = "/var/log/codesprint"
LOG_FILE = f"{LOG_DIR}/events.jsonl"
CHAT_LOG_FILE = f"{LOG_DIR}/chat.jsonl"
TELEGRAM_BOT_TOKEN = "8574801333:AAHfS1MV0cBrXhs9N_SDhzUG_1ZvN0L7ZPI"
TELEGRAM_CHAT_ID = "8453400539"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "CONFIGURE_ME")
GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "gemini-2.5-flash:generateContent?key={key}"
)

SESSION_TTL_SECONDS = 30 * 60  # 30 minutos
CLEANUP_INTERVAL_SECONDS = 5 * 60  # 5 minutos

# Fuso horário de São Paulo (UTC-3)
SP_TZ = timezone(timedelta(hours=-3))

# ──────────────────── System Prompt ────────────────────
SYSTEM_PROMPT = (
    "Você é a Sofia, atendente da CodeSprint, agência especializada em criação "
    "de sites profissionais e Landing Pages de alta conversão para pequenos negócios e profissionais liberais.\n"
    "Você é uma atendente humana real da nossa equipe, NUNCA diga que é uma inteligência artificial, robô ou IA.\n\n"
    "Seu objetivo principal: tirar dúvidas do visitante de forma simpática, objetiva e coletar NATURALMENTE durante a conversa:\n"
    "1. Nome do visitante\n"
    "2. WhatsApp para contato (com DDD)\n"
    "3. Segmento do negócio dele (ex: restaurante, barbearia, clínica, advocacia, loja, etc.)\n\n"
    "Regras de comunicação:\n"
    "- Respostas CURTAS: no máximo 2-3 frases curtas por mensagem. Seja ágil como em um chat real de suporte.\n"
    "- Tom de voz: acolhedor, profissional, consultivo e direto ao ponto.\n"
    "- Use emojis de forma moderada (máximo 1-2 por mensagem).\n"
    "- NUNCA mencione termos técnicos como 'modelo de linguagem', 'prompt', 'robô', 'IA' ou 'chat-widget'.\n"
    "- Evite enrolações ou textos longos.\n\n"
    "Informações sobre a CodeSprint e o produto:\n"
    "- Produto principal: Site Profissional (ou Landing Page de Alta Conversão).\n"
    "- Preço: Investimento único de R$ 497 (sem mensalidades recorrentes, sem taxas ocultas).\n"
    "- Prazo de Entrega: O site fica pronto e no ar em até 48 horas após o envio do material.\n"
    "- O que está incluso no pacote:\n"
    "  * Design premium exclusivo otimizado para celular, tablet e computador.\n"
    "  * Registro de domínio e configuração de hospedagem (nós cuidamos de toda a parte técnica).\n"
    "  * Integração direta de botões de contato com o WhatsApp do cliente.\n"
    "  * Otimização básica de SEO para o site aparecer no Google.\n"
    "  * 30 dias de suporte e ajustes gratuitos inclusos após a entrega.\n"
    "  * Garantia de Satisfação: 100% de satisfação ou devolvemos o dinheiro.\n"
    "- Formas de pagamento: Pix ou cartão de crédito em até 12x.\n"
    "- Caso o cliente não tenha logotipo, informamos que podemos começar apenas com o nome da marca em tipografia profissional ou ajudá-lo a estruturar.\n\n"
    "Fluxo ideal da conversa:\n"
    "1. Cumprimentar de forma acolhedora e perguntar como pode ajudar com a criação do site.\n"
    "2. Responder às dúvidas de forma objetiva, destacando o preço de R$ 497 único e o prazo de 48h.\n"
    "3. Oferecer para que um especialista monte uma proposta e entre em contato.\n"
    "4. Coletar: Segmento → Nome → WhatsApp (na ordem que parecer mais natural na conversa).\n"
    "5. Quando tiver coletado os 3 dados (Segmento, Nome e WhatsApp), agradecer com simpatia e informar que a equipe de especialistas entrará em contato em instantes pelo WhatsApp."
)

# ──────────────────── Garantir diretório de logs ────────────────────
Path(LOG_DIR).mkdir(parents=True, exist_ok=True)

# ──────────────────── Sessões in-memory ────────────────────
# { sessionId: { "history": [...], "leadData": {...}, "lastActivity": float } }
sessions = {}
sessions_lock = threading.Lock()


# ══════════════════════════════════════════════════════════════
#  Funções utilitárias
# ══════════════════════════════════════════════════════════════

def send_telegram(message):
    """Envia mensagem para o Telegram"""
    try:
        text = urllib.parse.quote(message)
        url = (
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            f"?chat_id={TELEGRAM_CHAT_ID}&text={text}&parse_mode=HTML"
        )
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=5) as resp:
            return resp.status == 200
    except Exception as e:
        print(f"[Telegram Error] {e}")
        return False


def log_event(event_data):
    """Grava evento em JSONL"""
    event_data["timestamp"] = datetime.now(SP_TZ).isoformat()
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(json.dumps(event_data, ensure_ascii=False) + "\n")


def log_chat(session_id, role, text, lead_data=None):
    """Grava mensagem de chat em JSONL"""
    entry = {
        "timestamp": datetime.now(SP_TZ).isoformat(),
        "sessionId": session_id,
        "role": role,
        "message": text,
    }
    if lead_data:
        entry["leadData"] = lead_data
    try:
        with open(CHAT_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except Exception as e:
        print(f"[Chat Log Error] {e}")


# ══════════════════════════════════════════════════════════════
#  Lead extraction (regex)
# ══════════════════════════════════════════════════════════════

_RE_NAME = re.compile(
    r"(?:me\s+chamo|meu\s+nome\s+[eé]|sou\s+(?:o|a)\s+)"
    r"\s*([A-ZÀ-Ú][a-zà-ú]+Header(?:\s+[A-ZÀ-Ú][a-zà-ú]+)*|[A-ZÀ-Ú][a-zà-ú]+)",
    re.IGNORECASE,
)

_RE_WHATSAPP = re.compile(
    r"(?<!\d)"
    r"(\(?\d{2}\)?\s*9\s*\d{4}[\s.-]?\d{4}|\(?\d{2}\)?\s*[2-8]\d{3}[\s.-]?\d{4})"
    r"(?!\d)"
)

_SEGMENTS = [
    "restaurante", "barbearia", "clínica", "clinica", "academia",
    "loja", "serviço", "servico", "pet ?shop", "petshop", "salão",
    "salao", "estética", "estetica", "padaria", "pizzaria", "hamburgueria",
    "farmácia", "farmacia", "oficina", "consultório", "consultorio",
    "escola", "imobiliária", "imobiliaria", "dentista", "odonto",
    "bar", "café", "cafe", "mercado", "supermercado", "ótica",
    "otica", "floricultura", "advocacia", "contabilidade", "advogado",
    "arquiteto", "arquitetura", "médico", "medico", "psicólogo",
    "engenheiro", "construtora", "estúdio", "fotógrafo", "doceria",
]
_RE_SEGMENT = re.compile(
    r"\b(" + "|".join(_SEGMENTS) + r")\b",
    re.IGNORECASE,
)


def extract_lead_data(user_messages):
    """Analisa todas as mensagens do usuário e extrai dados do lead."""
    full_text = " ".join(user_messages)

    # Extração de Nome
    name = None
    # Tentativa simples por padrão "me chamo [Nome]"
    match = _RE_NAME.search(full_text)
    if match:
        name = match.group(1).strip()
    else:
        # Se não achou padrão verbal, pega o primeiro nome próprio se a mensagem for curta
        words = [w for w in full_text.split() if w.istitle()]
        if words and len(full_text.split()) <= 4:
            name = words[0]

    # Extração de WhatsApp
    whatsapp = None
    match = _RE_WHATSAPP.search(full_text)
    if match:
        digits = re.sub(r"\D", "", match.group(1))
        if len(digits) in (10, 11):
            whatsapp = digits

    # Extração de Segmento
    segment = None
    match = _RE_SEGMENT.search(full_text)
    if match:
        segment = match.group(1).strip().lower()

    return {
        "name": name,
        "whatsapp": whatsapp,
        "segment": segment,
    }


def lead_is_complete(lead_data):
    """Retorna True se todos os 3 campos do lead foram preenchidos."""
    return all(lead_data.get(k) for k in ("name", "whatsapp", "segment"))


# ══════════════════════════════════════════════════════════════
#  Gemini API
# ══════════════════════════════════════════════════════════════

def call_gemini(history):
    """Chama Gemini 2.5 Flash via REST."""
    url = GEMINI_URL.format(key=GEMINI_API_KEY)

    payload = {
        "system_instruction": {
            "parts": [{"text": SYSTEM_PROMPT}]
        },
        "contents": history,
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 300,
        },
    }

    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "").strip()
            return "Desculpa, não consegui processar. Pode repetir? 😊"
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8", errors="replace")
        print(f"[Gemini HTTPError] {e.code}: {error_body}")
        return "Desculpa, estou com um probleminha técnico. Tenta de novo em instantes! 😅"
    except Exception as e:
        print(f"[Gemini Error] {e}")
        return "Desculpa, estou com um probleminha técnico. Tenta de novo em instantes! 😅"


# ══════════════════════════════════════════════════════════════
#  Session management
# ══════════════════════════════════════════════════════════════

def get_or_create_session(session_id):
    """Obtém ou cria sessão. Retorna (history, lead_data, notified)."""
    with sessions_lock:
        if session_id not in sessions:
            sessions[session_id] = {
                "history": [],
                "leadData": {
                    "name": None,
                    "whatsapp": None,
                    "segment": None,
                },
                "leadNotified": False,
                "lastActivity": time.time(),
            }
        session = sessions[session_id]
        session["lastActivity"] = time.time()
        return (
            session["history"],
            session["leadData"],
            session["leadNotified"],
        )


def mark_notified(session_id):
    """Marca que a notificação de lead completo já foi enviada."""
    with sessions_lock:
        if session_id in sessions:
            sessions[session_id]["leadNotified"] = True


def cleanup_sessions():
    """Remove sessões expiradas (>30min sem atividade)."""
    while True:
        time.sleep(CLEANUP_INTERVAL_SECONDS)
        now = time.time()
        expired = []
        with sessions_lock:
            for sid, data in sessions.items():
                if now - data["lastActivity"] > SESSION_TTL_SECONDS:
                    expired.append(sid)
            for sid in expired:
                del sessions[sid]
        if expired:
            print(f"[Session Cleanup] Removidas {len(expired)} sessões expiradas")


# ══════════════════════════════════════════════════════════════
#  HTTP Handler
# ══════════════════════════════════════════════════════════════

class CodeSprintHandler(BaseHTTPRequestHandler):

    # ───── GET (health and stats) ─────
    def do_GET(self):
        from urllib.parse import urlparse

        parsed = urlparse(self.path)

        if parsed.path == "/chat/health":
            self.send_response(200)
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"OK")

        elif parsed.path == "/chat/stats":
            stats = {"total_events": 0, "chat_leads": 0}
            try:
                if os.path.exists(CHAT_LOG_FILE):
                    with open(CHAT_LOG_FILE, "r", encoding="utf-8") as f:
                        for line in f:
                            try:
                                ev = json.loads(line.strip())
                                if ev.get("role") == "model" and ev.get("leadData"):
                                    data = ev["leadData"]
                                    if all(data.get(k) for k in ("name", "whatsapp", "segment")):
                                        stats["chat_leads"] += 1
                            except json.JSONDecodeError:
                                pass
            except Exception:
                pass

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(stats, ensure_ascii=False).encode("utf-8"))

        else:
            self.send_response(404)
            self.end_headers()

    # ───── OPTIONS (CORS preflight) ─────
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "86400")
        self.end_headers()

    # ───── POST (/chat) ─────
    def do_POST(self):
        from urllib.parse import urlparse

        parsed = urlparse(self.path)

        if parsed.path == "/chat":
            self._handle_chat()
        else:
            self.send_response(404)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

    def _handle_chat(self):
        """Processa requisição POST /chat."""
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length)
            body = json.loads(raw_body.decode("utf-8"))
        except Exception:
            self._send_json(400, {"error": "JSON inválido"})
            return

        session_id = body.get("sessionId", "").strip()
        user_message = body.get("message", "").strip()

        if not session_id or not user_message:
            self._send_json(400, {"error": "sessionId e message são obrigatórios"})
            return

        # Obter/criar sessão
        history, lead_data, already_notified = get_or_create_session(session_id)

        # Adicionar mensagem do usuário ao histórico
        history.append({
            "role": "user",
            "parts": [{"text": user_message}],
        })

        # Logar mensagem do usuário
        log_chat(session_id, "user", user_message)

        # Chamar Gemini
        ai_reply = call_gemini(history)

        # Adicionar resposta da IA ao histórico
        history.append({
            "role": "model",
            "parts": [{"text": ai_reply}],
        })

        # Extrair dados do lead de TODAS as mensagens do usuário na sessão
        user_messages = [
            turn["parts"][0]["text"]
            for turn in history
            if turn["role"] == "user"
        ]
        extracted = extract_lead_data(user_messages)

        # Mesclar dados extraídos (não sobrescrever dados existentes com None)
        for key in ("name", "whatsapp", "segment"):
            if extracted[key] and not lead_data[key]:
                lead_data[key] = extracted[key]

        # Se lead completo e ainda não notificado, enviar Telegram
        if lead_is_complete(lead_data) and not already_notified:
            mark_notified(session_id)
            now = datetime.now(SP_TZ).strftime("%H:%M:%S")
            tg_msg = (
                f"<b>[CodeSprint]</b> 🤖💬 <b>LEAD QUALIFICADO VIA CHAT</b>\n"
                f"👤 Nome: <b>{lead_data['name']}</b>\n"
                f"📱 WhatsApp: <b>{lead_data['whatsapp']}</b>\n"
                f"🏢 Segmento: <b>{lead_data['segment']}</b>\n"
                f"🔑 Sessão: {session_id[:12]}...\n"
                f"⏰ Hora: {now}"
            )
            # Enviar em background para não travar a resposta do HTTP
            threading.Thread(
                target=send_telegram,
                args=(tg_msg,),
                daemon=True,
            ).start()

        # Logar resposta da IA
        log_chat(session_id, "model", ai_reply, lead_data)

        # Responder
        response = {
            "reply": ai_reply,
            "leadData": {
                "name": lead_data.get("name"),
                "whatsapp": lead_data.get("whatsapp"),
                "segment": lead_data.get("segment"),
            },
        }
        self._send_json(200, response)

    def _send_json(self, status_code, data):
        """Envia resposta JSON com CORS."""
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        pass  # Silenciar logs automáticos de console


# ══════════════════════════════════════════════════════════════
#  Threading HTTP Server
# ══════════════════════════════════════════════════════════════

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    """HTTPServer multithreaded para requisições concorrentes."""
    daemon_threads = True


# ══════════════════════════════════════════════════════════════
#  Main
# ══════════════════════════════════════════════════════════════

def main():
    # Iniciar thread de limpeza de sessões expiradas
    cleanup_thread = threading.Thread(target=cleanup_sessions, daemon=True)
    cleanup_thread.start()

    server = ThreadedHTTPServer(("127.0.0.1", PORT), CodeSprintHandler)
    print(f"[CodeSprint Chat] Rodando na porta {PORT}")
    print(f"[CodeSprint Chat] Logs de Conversas: {CHAT_LOG_FILE}")
    print(f"[CodeSprint Chat] Gemini API: {'Configurada' if GEMINI_API_KEY != 'CONFIGURE_ME' else 'NÃO Configurada'}")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()


if __name__ == "__main__":
    main()
