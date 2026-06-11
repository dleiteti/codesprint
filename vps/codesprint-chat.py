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
    "- Preço: Investimento único de R$ 397 em promoção relâmpago por tempo limitado (antes R$ 497). Sem mensalidades recorrentes, sem taxas ocultas.\n"
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
    "2. Responder às dúvidas de forma objetiva, destacando o preço promocional de R$ 397 único (antes R$ 497) e o prazo de 48h.\n"
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
#  Lead extraction (inteligente — tolerante a falhas de digitação)
# ══════════════════════════════════════════════════════════════

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

_IGNORAR_NOMES = {
    "sim", "nao", "não", "quero", "custa", "quanto", "como", "funciona", "ok",
    "ola", "oi", "bom", "dia", "tarde", "noite", "whatsapp",
    "whats", "zap", "fone", "telefone", "numero", "número", "gratis", "gratuita",
    "site", "sites", "landing", "page", "preciso", "logo", "logotipo",
    "mais", "info", "informacao", "informação", "informações", "valores", "valor",
    "plano", "planos", "pagina", "página", "preco", "preço", "obrigado", "obrigada",
}


def extrair_nome_inteligente(text):
    """Extrai nome do lead tolerando variações comuns de chat."""
    text_clean = re.sub(r'[^\w\s]', '', text).strip()

    # 1. Padrões com prefixo explícito
    match = re.search(
        r"(?:me\s+chamo|meu\s+nome\s+[eé]|sou\s+(?:o|a)\s+|pode\s+chamar\s+de|falar\s+com)\s*([a-zA-Zà-úÀ-Ú]+(?:\s+[a-zA-Zà-úÀ-Ú]+)*)",
        text,
        re.IGNORECASE
    )
    if match:
        nome = match.group(1).strip()
        if nome.lower() not in _IGNORAR_NOMES:
            return nome.title()

    # 2. Se for mensagem curta (1 a 3 palavras) sem termos de ignore ou números
    words = text_clean.split()
    if 1 <= len(words) <= 3:
        if not any(w.lower() in _IGNORAR_NOMES for w in words):
            if not any(w.isdigit() or w.startswith('@') for w in words):
                return text_clean.title()

    return None


def extrair_whatsapp_inteligente(text):
    """Extrai WhatsApp tolerando DDI 55, DDD faltante, 9 faltante, e 0 inicial."""
    numbers = re.sub(r"\D", "", text)

    # Trata 0 inicial de DDD (ex: 021981477503 -> 21981477503)
    if len(numbers) >= 11 and numbers.startswith("0"):
        numbers = numbers[1:]

    # Se vier com DDI "55", remove o prefixo
    if (len(numbers) == 13 or len(numbers) == 12) and numbers.startswith("55"):
        numbers = numbers[2:]

    if len(numbers) == 11:
        return numbers
    elif len(numbers) == 10:
        # DDD + 8 dígitos -> insere o 9 no celular
        return f"{numbers[:2]}9{numbers[2:]}"
    elif len(numbers) == 9:
        # Sem DDD -> assume DDD 21 (Rio)
        return f"21{numbers}"
    elif len(numbers) == 8:
        # Sem DDD e sem o 9 -> assume DDD 21 e insere o 9
        return f"219{numbers}"

    return None


def extract_lead_data(user_messages):
    """Analisa todas as mensagens do usuário e extrai dados de forma incremental."""
    name = None
    whatsapp = None
    segment = None

    for msg in user_messages:
        if not name:
            name = extrair_nome_inteligente(msg)
        if not whatsapp:
            whatsapp = extrair_whatsapp_inteligente(msg)
        if not segment:
            match = _RE_SEGMENT.search(msg)
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
    """Obtém ou cria sessão. Retorna (history, lead_data, notified_data)."""
    with sessions_lock:
        if session_id not in sessions:
            sessions[session_id] = {
                "history": [
                    {
                        "role": "model",
                        "parts": [{"text": (
                            "Oi! 👋 Tudo bem?\n\n"
                            "Sou a Sofia, da CodeSprint! Criamos sites profissionais em até 48h por apenas R$ 397 na nossa Promoção Relâmpago — sem mensalidade 🚀\n\n"
                            "Como posso te ajudar hoje?"
                        )}]
                    }
                ],
                "leadData": {
                    "name": None,
                    "whatsapp": None,
                    "segment": None,
                },
                "notifiedData": {
                    "name": None,
                    "whatsapp": None,
                    "segment": None,
                },
                "lastActivity": time.time(),
            }
        session = sessions[session_id]
        session["lastActivity"] = time.time()
        # Migration: add notifiedData if missing (hot upgrade)
        if "notifiedData" not in session:
            session["notifiedData"] = {
                "name": None,
                "whatsapp": None,
                "segment": None,
            }
        return (
            session["history"],
            session["leadData"],
            session["notifiedData"],
        )


# mark_notified removido — agora usamos notifiedData incremental


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

    # ───── GET (health, stats and notify) ─────
    def do_GET(self):
        from urllib.parse import urlparse, parse_qs

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

        elif parsed.path == "/notify":
            params = parse_qs(parsed.query)
            event = params.get("event", ["unknown"])[0]
            source = params.get("source", ["Desconhecido"])[0]
            local = params.get("local", [""])[0]
            campaign = params.get("campaign", [""])[0]
            content = params.get("content", [""])[0]

            # Montar dados do evento
            event_data = {
                "event": event,
                "source": source,
                "ip": self.client_address[0],
                "user_agent": self.headers.get("User-Agent", ""),
            }

            # Montar mensagem Telegram
            now = datetime.now(SP_TZ).strftime("%H:%M:%S")
            
            if event == "visit":
                source_detail = source
                if campaign:
                    source_detail += f"\nCampanha: {campaign}"
                if content:
                    source_detail += f"\nCriativo: {content}"
                msg = f"<b>[Code Sprint]</b> 🚀 <b>Novo Visitante na LP!</b>\nOrigem: <b>{source_detail}</b>\nHora: {now}"

            elif event == "cta_click":
                event_data["local"] = local
                msg = f"<b>[Code Sprint]</b> 📲 <b>Lead Clicou no CTA!</b>\nLocal: <b>{local}</b>\nOrigem: <b>{source}</b>\nHora: {now}"

            elif event == "cta_float":
                msg = f"<b>[Code Sprint]</b> 📲 <b>Lead Clicou no CTA Flutuante!</b>\nOrigem: <b>{source}</b>\nHora: {now}"

            elif event == "chat_opened":
                msg = f"<b>[Code Sprint]</b> 💬 <b>Conversa com a Sofia Iniciada!</b>\nO visitante abriu o chat.\nOrigem: <b>{source}</b>\nHora: {now}"

            elif event in ("scroll_50", "chat_widget_loaded", "chat_message", "cta_float_shown"):
                # Apenas grava no log, não envia ao Telegram
                msg = None

            else:
                msg = f"<b>[Code Sprint]</b> ❓ Evento: {event}\nOrigem: {source}\nHora: {now}"

            # Log always; Telegram only if msg is set
            log_event(event_data)
            
            if msg:
                threading.Thread(
                    target=send_telegram,
                    args=(msg,),
                    daemon=True,
                ).start()

            # Resposta (1x1 pixel transparente para Image() trick)
            self.send_response(200)
            self.send_header("Content-Type", "image/gif")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Cache-Control", "no-cache, no-store")
            self.end_headers()
            try:
                self.wfile.write(b"\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00\xff\xff\xff\x00\x00\x00\x21\xf9\x04\x00\x00\x00\x00\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02\x44\x01\x00\x3b")
            except BrokenPipeError:
                pass  # Client disconnected before receiving response

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
        history, lead_data, notified_data = get_or_create_session(session_id)

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

        # ── Notificação incremental no Telegram ──
        should_notify = False
        is_new_lead = False

        with sessions_lock:
            # Se o WhatsApp foi detectado e ainda não foi notificado
            if lead_data["whatsapp"] and not notified_data["whatsapp"]:
                should_notify = True
                is_new_lead = True

            # Se o WhatsApp já foi notificado, mas agora temos dados adicionais
            elif notified_data["whatsapp"]:
                for key in ("name", "segment"):
                    if lead_data[key] and not notified_data[key]:
                        should_notify = True
                        break

            if should_notify:
                # Atualizar o controle na sessão
                for key in ("name", "whatsapp", "segment"):
                    notified_data[key] = lead_data[key]

        if should_notify:
            now = datetime.now(SP_TZ).strftime("%H:%M:%S")
            if is_new_lead:
                tg_msg = (
                    f"<b>[Code Sprint]</b> 🤖💬 <b>NOVO LEAD VIA CHAT (Sofia)</b>\n"
                    f"👤 Nome: <b>{lead_data['name'] or 'Não informado'}</b>\n"
                    f"📱 WhatsApp: <b>{lead_data['whatsapp']}</b>\n"
                    f"🏢 Segmento: <b>{lead_data['segment'] or 'Não informado'}</b>\n"
                    f"🔑 Sessão: <code>{session_id[-6:]}</code>\n"
                    f"⏰ Hora: {now}"
                )
            else:
                tg_msg = (
                    f"<b>[Code Sprint]</b> 📝 <b>LEAD ATUALIZADO (Sofia)</b>\n"
                    f"👤 Nome: <b>{lead_data['name'] or 'Não informado'}</b>\n"
                    f"📱 WhatsApp: <b>{lead_data['whatsapp']}</b>\n"
                    f"🏢 Segmento: <b>{lead_data['segment'] or 'Não informado'}</b>\n"
                    f"🔑 Sessão: <code>{session_id[-6:]}</code>\n"
                    f"⏰ Hora: {now}"
                )
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
