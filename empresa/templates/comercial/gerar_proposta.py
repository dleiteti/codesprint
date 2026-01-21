#!/usr/bin/env python3
"""
🤖 Gerador Automático de Propostas Comerciais - CodeSprint
===========================================================

Script para o Agent Comercial gerar propostas visuais premium
a partir dos dados coletados nas fases anteriores.

Autor: Designer UX/UI CodeSprint
Data: 2026-01-20
"""

from pathlib import Path
from typing import Dict, List, Literal
from dataclasses import dataclass
from datetime import datetime, timedelta
import json
import re


@dataclass
class Entrega:
    """Representa uma entrega do projeto"""
    nome: str
    descricao: str


@dataclass
class FaseCronograma:
    """Representa uma fase do cronograma"""
    numero: int
    nome: str
    descricao: str
    prazo: str


@dataclass
class DadosProposta:
    """Estrutura completa dos dados da proposta"""
    # Metadata
    nome_cliente: str
    data_proposta: str
    
    # Hero
    titulo_projeto: str
    descricao_problema: str
    
    # Financeiro
    perda_mensal: str
    perda_anual: str
    roi_percentual: str
    payback_meses: str
    valor_setup: str
    valor_mensalidade: str
    investimento_ano1: str
    economia_ano1: str
    sobra_ano1: str
    
    # Solução
    descricao_solucao: str
    entregas: List[Entrega]
    
    # Cronograma
    prazo_dias: int
    fases_cronograma: List[FaseCronograma]
    
    # CTA e Footer
    urgencia_texto: str
    nome_responsavel: str
    cargo_responsavel: str
    whatsapp: str
    email: str
    website: str
    frase_assinatura: str
    
    # Campos com default (no final)
    dias_validade: int = 7


class GeradorProposta:
    """Gerenciador de geração de propostas comerciais"""
    
    def __init__(self, workspace_root: Path):
        self.workspace = Path(workspace_root)
        self.templates_dir = self.workspace / "templates"
        self.clientes_dir = self.workspace / "clientes"
        
    def carregar_template(self, modo: Literal["dark", "light"] = "dark") -> str:
        """Carrega o template base"""
        if modo == "dark":
            template_path = self.templates_dir / "proposta_comercial_master.html"
        else:
            template_path = self.templates_dir / "proposta_comercial_light.html"
            
        if not template_path.exists():
            raise FileNotFoundError(f"Template não encontrado: {template_path}")
            
        return template_path.read_text(encoding="utf-8")
    
    def substituir_placeholders_simples(self, template: str, dados: DadosProposta) -> str:
        """Substitui placeholders simples (não iteráveis)"""
        replacements = {
            "{{NOME_CLIENTE}}": dados.nome_cliente,
            "{{DATA_PROPOSTA}}": dados.data_proposta,
            "{{DIAS_VALIDADE}}": str(dados.dias_validade),
            "{{TITULO_PROJETO}}": dados.titulo_projeto,
            "{{DESCRICAO_PROBLEMA}}": dados.descricao_problema,
            "{{PERDA_MENSAL}}": dados.perda_mensal,
            "{{PERDA_ANUAL}}": dados.perda_anual,
            "{{ROI_PERCENTUAL}}": dados.roi_percentual,
            "{{PAYBACK_MESES}}": dados.payback_meses,
            "{{VALOR_SETUP}}": dados.valor_setup,
            "{{VALOR_MENSALIDADE}}": dados.valor_mensalidade,
            "{{INVESTIMENTO_ANO1}}": dados.investimento_ano1,
            "{{ECONOMIA_ANO1}}": dados.economia_ano1,
            "{{SOBRA_ANO1}}": dados.sobra_ano1,
            "{{DESCRICAO_SOLUCAO}}": dados.descricao_solucao,
            "{{PRAZO_DIAS}}": str(dados.prazo_dias),
            "{{URGENCIA_TEXTO}}": dados.urgencia_texto,
            "{{NOME_RESPONSAVEL}}": dados.nome_responsavel,
            "{{CARGO_RESPONSAVEL}}": dados.cargo_responsavel,
            "{{WHATSAPP}}": dados.whatsapp,
            "{{EMAIL}}": dados.email,
            "{{WEBSITE}}": dados.website,
            "{{FRASE_ASSINATURA}}": dados.frase_assinatura,
        }
        
        for placeholder, valor in replacements.items():
            template = template.replace(placeholder, valor)
            
        return template
    
    def gerar_html_entregas(self, entregas: List[Entrega]) -> str:
        """Gera HTML para lista de entregas"""
        html_parts = []
        for entrega in entregas:
            html = f"""
                    <div class="flex items-start space-x-3">
                        <span class="text-brand-neon text-2xl">✓</span>
                        <div>
                            <p class="font-semibold">{entrega.nome}</p>
                            <p class="text-sm text-white/60">{entrega.descricao}</p>
                        </div>
                    </div>"""
            html_parts.append(html)
        
        return "\n".join(html_parts)
    
    def gerar_html_cronograma(self, fases: List[FaseCronograma]) -> str:
        """Gera HTML para cronograma"""
        html_parts = []
        for fase in fases:
            html = f"""
                    <div class="flex items-start space-x-4">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full gradient-neon flex items-center justify-center text-brand-dark font-bold">
                            {fase.numero}
                        </div>
                        <div class="flex-1">
                            <p class="font-semibold text-lg">{fase.nome}</p>
                            <p class="text-sm text-white/60">{fase.descricao}</p>
                        </div>
                        <div class="text-right text-sm text-brand-neon font-semibold">
                            {fase.prazo}
                        </div>
                    </div>"""
            html_parts.append(html)
        
        return "\n".join(html_parts)
    
    def substituir_iteraveis(self, template: str, dados: DadosProposta) -> str:
        """Substitui seções iteráveis (entregas e cronograma) usando regex"""
        
        # Substituir entregas usando regex para capturar todo o bloco {{#each ENTREGAS}}...{{/each}}
        entregas_html = self.gerar_html_entregas(dados.entregas)
        template = re.sub(
            r'\{\{#each ENTREGAS\}\}.*?\{\{/each\}\}',
            entregas_html,
            template,
            flags=re.DOTALL
        )
        
        # Substituir cronograma usando regex para capturar todo o bloco {{#each FASES_CRONOGRAMA}}...{{/each}}
        cronograma_html = self.gerar_html_cronograma(dados.fases_cronograma)
        template = re.sub(
            r'\{\{#each FASES_CRONOGRAMA\}\}.*?\{\{/each\}\}',
            cronograma_html,
            template,
            flags=re.DOTALL
        )
        
        return template
    
    def gerar_proposta(
        self,
        nome_cliente: str,
        dados: DadosProposta,
        modo: Literal["dark", "light"] = "dark"
    ) -> Path:
        """
        Gera proposta completa para um cliente
        
        Args:
            nome_cliente: Nome do diretório do cliente (ex: "limpeza_express")
            dados: Dados estruturados da proposta
            modo: "dark" ou "light"
            
        Returns:
            Path do arquivo HTML gerado
        """
        # Carregar template
        template = self.carregar_template(modo)
        
        # Substituir placeholders simples
        template = self.substituir_placeholders_simples(template, dados)
        
        # Substituir seções iteráveis
        template = self.substituir_iteraveis(template, dados)
        
        # Salvar arquivo
        cliente_dir = self.clientes_dir / nome_cliente / "04_proposta"
        cliente_dir.mkdir(parents=True, exist_ok=True)
        
        output_file = cliente_dir / f"proposta_visual_{modo}.html"
        output_file.write_text(template, encoding="utf-8")
        
        return output_file
    
    def carregar_dados_de_json(self, json_path: Path) -> DadosProposta:
        """Carrega dados de proposta a partir de arquivo JSON"""
        data = json.loads(json_path.read_text(encoding="utf-8"))
        
        entregas = [Entrega(**e) for e in data["entregas"]]
        fases = [FaseCronograma(**f) for f in data["fases_cronograma"]]
        
        return DadosProposta(
            **{k: v for k, v in data.items() if k not in ["entregas", "fases_cronograma"]},
            entregas=entregas,
            fases_cronograma=fases
        )


# ============================================
# EXEMPLO DE USO
# ============================================

def exemplo_limpeza_express():
    """Exemplo: Gerar proposta para Limpeza Express"""
    
    workspace = Path("/home/danilo/.gemini/antigravity/scratch/codesprint")
    gerador = GeradorProposta(workspace)
    
    # Dados da proposta
    dados = DadosProposta(
        # Metadata
        nome_cliente="Limpeza Express",
        data_proposta="20 de Janeiro de 2026",
        dias_validade=7,
        
        # Hero
        titulo_projeto="Sistema de Controle de Estoque Inteligente",
        descricao_problema=(
            "Ricardo, você está perdendo vendas todos os dias porque seu time não sabe "
            "o que tem disponível no estoque. Vendedores fazem promessas no WhatsApp sem ter "
            "certeza se conseguirão entregar. O resultado? Clientes frustrados, tempo desperdiçado "
            "conferindo estoque manualmente e R$ 10.000 por mês \"escapando pelo ralo\"."
        ),
        
        # Financeiro
        perda_mensal="R$ 10.000",
        perda_anual="R$ 120.000",
        roi_percentual="357%",
        payback_meses="2 meses",
        valor_setup="R$ 15.000",
        valor_mensalidade="R$ 990/mês",
        investimento_ano1="R$ 26.880",
        economia_ano1="R$ 96.000",
        sobra_ano1="R$ 69.120",
        
        # Solução
        descricao_solucao=(
            "Um sistema sob medida que dá visibilidade total do estoque para sua equipe, "
            "funciona offline e encerra de vez o caos operacional. Vendedores consultam "
            "disponibilidade em 3 segundos, você recebe alertas automáticos de produtos "
            "acabando e a baixa acontece com um clique."
        ),
        entregas=[
            Entrega("Catálogo Mobile para Vendedores", "Consulta estoque em tempo real direto do celular"),
            Entrega("Dashboard Administrativo", "Visão completa + alertas automáticos via WhatsApp"),
            Entrega("Tela de Baixa Rápida", "Equipe de estoque confirma saída com 1 clique"),
            Entrega("Modo Offline Completo", "Funciona sem internet, sincroniza depois"),
            Entrega("Login via WhatsApp", "Sem senha, seguro e rápido"),
            Entrega("Treinamento Completo", "2 horas para toda equipe dominar o sistema"),
        ],
        
        # Cronograma
        prazo_dias=12,
        fases_cronograma=[
            FaseCronograma(1, "Aprovação da Proposta", "Você aprova e assinamos o contrato digital", "Hoje"),
            FaseCronograma(2, "Pagamento do Sinal", "50% do setup (R$ 7.500) para iniciar", "+2 dias"),
            FaseCronograma(3, "Kick-off Técnico", "Reunião de alinhamento e coleta de produtos", "+3 dias"),
            FaseCronograma(4, "Sprint de Desenvolvimento", "12 dias de construção usando Shape Up", "+15 dias"),
            FaseCronograma(5, "Go-Live + Treinamento", "Sistema no ar + 2h de capacitação da equipe", "+16 dias"),
        ],
        
        # CTA e Footer
        urgencia_texto=(
            "Cada dia que passa sem resolver isso é <strong>R$ 333 a menos no seu caixa</strong>. "
            "Se decidir hoje, em 12 dias você tem o sistema rodando, em 60 dias recuperou todo o "
            "investimento e em 12 meses você tem R$ 69.000 a mais do que teria sem o sistema."
        ),
        nome_responsavel="Danilo",
        cargo_responsavel="CEO & Founder",
        whatsapp="(XX) XXXXX-XXXX",
        email="contato@codesprint.com.br",
        website="codesprint.com.br",
        frase_assinatura="Não é sobre ter o melhor sistema. É sobre parar de perder R$ 10.000 por mês.",
    )
    
    # Gerar versão dark
    arquivo_dark = gerador.gerar_proposta("limpeza_express", dados, modo="dark")
    print(f"✅ Proposta Dark Mode: {arquivo_dark}")
    
    # Gerar versão light
    arquivo_light = gerador.gerar_proposta("limpeza_express", dados, modo="light")
    print(f"✅ Proposta Light Mode: {arquivo_light}")
    
    return arquivo_dark, arquivo_light


if __name__ == "__main__":
    """Execução direta do script"""
    exemplo_limpeza_express()
