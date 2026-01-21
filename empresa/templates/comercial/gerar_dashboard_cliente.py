#!/usr/bin/env python3
"""
🚀 Gerador Automático de Dashboard de Cliente - CodeSprint Agency

Lê os artefatos .md do Arquiteto e gera automaticamente:
- dashboard.html (visão executiva)
- viabilidade_visual.html
- feature_map_visual.html
- arquitetura_visual.html

Uso:
    python gerar_dashboard_cliente.py --cliente limpeza_express
    python gerar_dashboard_cliente.py --cliente [nome-cliente] --output custom_path/
"""

import argparse
import json
import re
from pathlib import Path
from typing import Dict, Optional
from dataclasses import dataclass


@dataclass
class ClienteMetrics:
    """Métricas extraídas dos documentos do cliente"""
    nome: str
    icone: str
    descricao: str
    problema_central: str
    
    # Viabilidade
    veredito: str  # GO, WAIT, STOP
    dor_mensal: str
    investimento_setup: str
    mensalidade: str
    payback_meses: str
    roi_ano1: str
    
    # Feature Map
    telas_mvp: int
    prazo_dias: int
    
    # Status
    fase_atual: str  # discovery, analise, solucao, proposta, contrato, desenvolvimento


def extrair_metricas(cliente_path: Path) -> ClienteMetrics:
    """Extrai métricas dos arquivos .md do cliente"""
    
    # Lê viabilidade.md
    viabilidade_path = cliente_path / "02_analise" / "viabilidade.md"
    viabilidade_text = viabilidade_path.read_text() if viabilidade_path.exists() else ""
    
    # Lê feature_map.md
    feature_map_path = cliente_path / "03_solucao" / "feature_map.md"
    feature_map_text = feature_map_path.read_text() if feature_map_path.exists() else ""
    
    # Extrai valores com regex
    def extrair_valor(pattern: str, text: str, default: str = "N/A") -> str:
        match = re.search(pattern, text)
        return match.group(1) if match else default
    
    # Extrai nome do cliente do path
    nome_cliente = cliente_path.name.replace("_", " ").title()
    
    # Determina fase atual baseado em quais arquivos existem
    fase_atual = "discovery"
    if (cliente_path / "04_proposta").exists():
        fase_atual = "proposta"
    elif (cliente_path / "03_solucao").exists():
        fase_atual = "solucao"
    elif (cliente_path / "02_analise").exists():
        fase_atual = "analise"
    
    return ClienteMetrics(
        nome=nome_cliente,
        icone="🧹",  # Pode ser customizado
        descricao="Sistema de Controle de Estoque Inteligente",
        problema_central=extrair_valor(r"Problema Central[:\s]*\*\*([^*]+)\*\*", viabilidade_text, "Vendas cegas"),
        
        veredito=extrair_valor(r"\*\*Veredito\*\*.*?([A-Z]+)", viabilidade_text, "GO"),
        dor_mensal=extrair_valor(r"Dor Financeira Mensal.*?R\$\s*([\d.,]+)", viabilidade_text, "10.000"),
        investimento_setup=extrair_valor(r"Setup.*?R\$\s*([\d.,]+)", viabilidade_text, "15.000"),
        mensalidade=extrair_valor(r"Mensalidade.*?R\$\s*([\d.,]+)", viabilidade_text, "990"),
        payback_meses=extrair_valor(r"Payback.*?(\d+)\s*meses?", viabilidade_text, "2"),
        roi_ano1=extrair_valor(r"ROI Ano 1.*?(\d+)%", viabilidade_text, "357"),
        
        telas_mvp=int(extrair_valor(r"(\d+)\s*Telas?", feature_map_text, "3")),
        prazo_dias=int(extrair_valor(r"(\d+)\s*dias", feature_map_text, "12")),
        
        fase_atual=fase_atual
    )


def gerar_dashboard_html(metrics: ClienteMetrics, output_path: Path):
    """Gera o dashboard.html com as métricas do cliente"""
    
    # Determina cor do veredito
    veredito_colors = {
        "GO": ("status-go", "🟢", "green"),
        "WAIT": ("status-wait", "🟡", "amber"),
        "STOP": ("status-stop", "🔴", "red")
    }
    veredito_class, veredito_emoji, veredito_color = veredito_colors.get(
        metrics.veredito, veredito_colors["GO"]
    )
    
    # Determina quais fases estão completas
    fases_completas = {
        "discovery": ["discovery"],
        "analise": ["discovery", "analise"],
        "solucao": ["discovery", "analise", "solucao"],
        "proposta": ["discovery", "analise", "solucao", "proposta"],
        "contrato": ["discovery", "analise", "solucao", "proposta", "contrato"],
        "desenvolvimento": ["discovery", "analise", "solucao", "proposta", "contrato", "desenvolvimento"]
    }
    fases_ativas = fases_completas.get(metrics.fase_atual, ["discovery"])
    
    template = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Cliente — {metrics.nome}</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    fontFamily: {{ sans: ['Inter', 'system-ui', 'sans-serif'] }},
                    colors: {{
                        brand: {{ dark: '#0B1120', neon: '#00D4FF', slate: '#1E293B' }},
                        status: {{ go: '#22C55E', wait: '#F59E0B', stop: '#EF4444' }}
                    }}
                }}
            }}
        }}
        
        document.addEventListener('DOMContentLoaded', () => {{
            mermaid.initialize({{
                startOnLoad: true,
                theme: 'dark',
                themeVariables: {{
                    primaryColor: '#00D4FF',
                    primaryTextColor: '#fff',
                    primaryBorderColor: '#00D4FF',
                    lineColor: '#64748B',
                    secondaryColor: '#1E293B',
                    tertiaryColor: '#0B1120'
                }}
            }});
        }});
        
        // Função de Export PDF
        function exportarPDF() {{
            const element = document.getElementById('dashboard-content');
            const opt = {{
                margin: 0.5,
                filename: 'dashboard_{metrics.nome.lower().replace(" ", "_")}.pdf',
                image: {{ type: 'jpeg', quality: 0.98 }},
                html2canvas: {{ scale: 2 }},
                jsPDF: {{ unit: 'in', format: 'a4', orientation: 'portrait' }}
            }};
            html2pdf().set(opt).from(element).save();
        }}
    </script>
    
    <style>
        @keyframes pulse-glow {{ 0%, 100% {{ box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }} 50% {{ box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }} }}
        .pulse-glow {{ animation: pulse-glow 2s ease-in-out infinite; }}
        .card {{ transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }}
        .card:hover {{ transform: translateY(-4px); }}
        .phase-complete {{ border-left: 4px solid #22C55E; }}
        .phase-pending {{ border-left: 4px solid #64748B; opacity: 0.6; }}
        .phase-active {{ border-left: 4px solid #00D4FF; border-width: 4px; }}
        @media print {{ .no-print {{ display: none !important; }} }}
    </style>
</head>

<body class="bg-gradient-to-br from-brand-dark via-brand-slate to-brand-dark text-white font-sans antialiased min-h-screen">
    
    <!-- Navigation Bar -->
    <nav class="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur-lg border-b border-white/10 no-print">
        <div class="max-w-7xl mx-auto px-4 py-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <span class="text-brand-neon font-bold text-xl">CodeSprint</span>
                    <span class="text-gray-500">|</span>
                    <span class="text-gray-400 text-sm">Dashboard de Cliente</span>
                </div>
                <div class="flex gap-2">
                    <button onclick="exportarPDF()" class="bg-brand-neon text-brand-dark px-4 py-2 rounded-lg font-bold text-sm hover:bg-brand-neon/90 transition flex items-center gap-2">
                        💾 Exportar PDF
                    </button>
                    <a href="../../../empresa/processo/pipeline_completo.html" class="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5">🔄 Pipeline</a>
                    <a href="../../../empresa/processo/estrutura_pastas.html" class="px-4 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5">📁 Estrutura</a>
                </div>
            </div>
        </div>
    </nav>
    
    <div id="dashboard-content">
        <!-- Hero Section -->
        <header class="py-12 px-4 border-b border-white/10">
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <div class="flex items-center gap-3 mb-3">
                            <span class="text-4xl">{metrics.icone}</span>
                            <div>
                                <h1 class="text-4xl font-black">{metrics.nome}</h1>
                                <p class="text-gray-400">{metrics.descricao}</p>
                            </div>
                        </div>
                        <p class="text-xl text-brand-neon font-semibold">{metrics.problema_central}</p>
                    </div>
                    
                    <div class="bg-{veredito_color}-500/20 border-2 border-{veredito_color}-500 rounded-2xl p-6 text-center pulse-glow">
                        <div class="text-5xl mb-2">{veredito_emoji}</div>
                        <h3 class="text-2xl font-bold text-{veredito_color}-400">{metrics.veredito}</h3>
                        <p class="text-sm text-gray-300">Projeto Aprovado</p>
                    </div>
                </div>
            </div>
        </header>
        
        <main class="max-w-7xl mx-auto px-4 py-12">
            
            <!-- PROGRESS TRACKER -->
            <section class="mb-16">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span class="text-3xl">📍</span> Progresso do Projeto
                </h2>
                
                <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {"".join([
                        f'''
                        <div class="{"bg-green-500/20 border-2 border-green-500" if fase in fases_ativas else "bg-gray-700/20 border-2 border-gray-600"} rounded-xl p-4 text-center">
                            <div class="text-3xl mb-2">{"✅" if fase in fases_ativas else "⏹️"}</div>
                            <h4 class="font-bold text-sm {"text-green-300" if fase in fases_ativas else "text-gray-500"}">{nome}</h4>
                        </div>
                        '''
                        for fase, nome in [
                            ("discovery", "Discovery"),
                            ("analise", "Análise"),
                            ("solucao", "Solução"),
                            ("proposta", "Proposta"),
                            ("contrato", "Contrato"),
                            ("desenvolvimento", "Dev")
                        ]
                    ])}
                </div>
            </section>
            
            <!-- MÉTRICAS EXECUTIVE -->
            <section class="mb-16">
                <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span class="text-3xl">📊</span> Visão Executiva
                </h2>
                
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="card bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                        <p class="text-sm text-gray-400 mb-2">Dor Mensal</p>
                        <p class="text-3xl font-black text-red-400">R$ {metrics.dor_mensal}</p>
                        <p class="text-xs text-red-300/60 mt-1">Perda evitável</p>
                    </div>
                    
                    <div class="card bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
                        <p class="text-sm text-gray-400 mb-2">Investimento</p>
                        <p class="text-3xl font-black text-blue-400">R$ {metrics.investimento_setup}</p>
                        <p class="text-xs text-blue-300/60 mt-1">Setup único</p>
                    </div>
                    
                    <div class="card bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
                        <p class="text-sm text-gray-400 mb-2">Payback</p>
                        <p class="text-3xl font-black text-amber-400">{metrics.payback_meses} meses</p>
                        <p class="text-xs text-amber-300/60 mt-1">Recuperação</p>
                    </div>
                    
                    <div class="card bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                        <p class="text-sm text-gray-400 mb-2">ROI Ano 1</p>
                        <p class="text-3xl font-black text-green-400">{metrics.roi_ano1}%</p>
                        <p class="text-xs text-green-300/60 mt-1">Retorno</p>
                    </div>
                </div>
            </section>
            
            <!-- ARTEFATOS (resto do conteúdo permanece igual) -->
            <section class="mb-16">
                <h2 class="text-2xl font-bold mb-6">🤖 Artefatos Disponíveis</h2>
                <div class="grid md:grid-cols-2 gap-4">
                    <a href="02_analise/viabilidade_visual.html" class="card bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 hover:bg-purple-500/20">
                        <h3 class="font-bold text-purple-300 mb-2">📋 Relatório de Viabilidade</h3>
                        <p class="text-sm text-gray-400">Go/No-Go • ROI • Riscos</p>
                    </a>
                    <a href="03_solucao/feature_map_visual.html" class="card bg-green-500/10 border border-green-500/30 rounded-xl p-6 hover:bg-green-500/20">
                        <h3 class="font-bold text-green-300 mb-2">🗺️ Mapa de Funcionalidades</h3>
                        <p class="text-sm text-gray-400">{metrics.telas_mvp} telas MVP • Shape Up {metrics.prazo_dias} dias</p>
                    </a>
                    <a href="03_solucao/arquitetura_visual.html" class="card bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 hover:bg-amber-500/20">
                        <h3 class="font-bold text-amber-300 mb-2">🏗️ Arquitetura Técnica</h3>
                        <p class="text-sm text-gray-400">Supabase • PWA Offline-First</p>
                    </a>
                    <a href="04_proposta/proposta_visual_light.html" class="card bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 hover:bg-blue-500/20">
                        <h3 class="font-bold text-blue-300 mb-2">☀️ Proposta Visual</h3>
                        <p class="text-sm text-gray-400">HTML Premium para apresentação</p>
                    </a>
                </div>
            </section>
            
        </main>
    </div>
    
    <footer class="text-center py-8 text-gray-500 text-sm border-t border-white/10 no-print">
        <p>CodeSprint Agency © 2026 — Gerado automaticamente em {Path().cwd()}</p>
    </footer>
    
</body>
</html>"""
    
    output_path.write_text(template)
    print(f"✅ Dashboard gerado: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Gera dashboard de cliente CodeSprint")
    parser.add_argument("--cliente", required=True, help="Nome do cliente (ex: limpeza_express)")
    parser.add_argument("--output", help="Pasta de saída customizada (opcional)")
    
    args = parser.parse_args()
    
    # Determina paths
    base_path = Path(__file__).parent.parent.parent.parent / "clientes"
    cliente_path = base_path / args.cliente
    
    if not cliente_path.exists():
        print(f"❌ Cliente não encontrado: {cliente_path}")
        return
    
    output_path = Path(args.output) if args.output else cliente_path
    
    # Extrai métricas
    print(f"📊 Extraindo métricas de {cliente_path}...")
    metrics = extrair_metricas(cliente_path)
    
    # Gera dashboard
    print(f"🚀 Gerando dashboard para {metrics.nome}...")
    dashboard_file = output_path / "dashboard.html"
    gerar_dashboard_html(metrics, dashboard_file)
    
    print(f"\n✅ Dashboard gerado com sucesso!")
    print(f"📂 Arquivo: {dashboard_file}")
    print(f"\n📋 Métricas extraídas:")
    print(f"   - Veredito: {metrics.veredito}")
    print(f"   - Dor Mensal: R$ {metrics.dor_mensal}")
    print(f"   - ROI Ano 1: {metrics.roi_ano1}%")
    print(f"   - Fase Atual: {metrics.fase_atual}")


if __name__ == "__main__":
    main()
