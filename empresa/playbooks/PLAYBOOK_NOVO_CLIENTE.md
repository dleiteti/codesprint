# 🚀 Playbook: Novo Cliente CodeSprint (Foco em Sites & Landing Pages)

> **Processo de Onboarding, Copywriting, Design e Deploy Express para Clientes**
> **Tempo estimado:** 1.5 a 2.5 horas por cliente (do briefing à proposta comercial)

---

## 📋 Checklist Master

### Fase 1: Setup Rápido (5 min)
- [ ] Copiar pasta template: `cp -r clientes/_template clientes/[nome_cliente]`
- [ ] Criar diretório de assets visuais: `mkdir -p clientes/[nome_cliente]/03_solucao/assets`

### Fase 2: Discovery & Briefing (20 min)
- [ ] **01_discovery/conversa_bruta.md** - Registrar briefing do WhatsApp
  - Nicho de atuação e perfil do cliente
  - Objetivo principal do site (Venda, captação, autoridade)
  - Links de referências visuais/concorrentes
  - Prazos e ativos prontos (Logotipo, fotos)

### Fase 3: Análise de Viabilidade & ROI (30 min)
- [ ] **02_analise/dor_financeira.md** - Estimar perda de leads & Cálculo de ROI
  - Ticket médio do cliente
  - Tráfego estimado vs leads perdidos por falta de site ou site ruim
  - Mostrar como o preço de R$ 497 se paga com poucos ou um único fechamento (ROI imediato)
- [ ] **02_analise/viabilidade.md** - Relatório de Risco Comercial & Ético
  - Validação de regras éticas (ex: regras da OAB para advogados)
  - Riscos de bloqueio de anúncios (políticas do Meta/Google Ads)

### Fase 4: Copywriting & Estrutura (45 min) ⭐
- [ ] **03_solucao/copywriting_e_secoes.md** - Roteiro de seções da Landing Page
  - Aplicação do framework **AIDA** (Negócios Locais) ou **Autoridade/Ética** (Profissionais Liberais/Advogados)
  - Redação exata dos Títulos (H1, H2), Subtítulos e textos dos botões (CTAs)

### Fase 5: Setup Técnico & Design System (30 min)
- [ ] **03_solucao/setup_e_design.md** - Especificação Visual e Infraestrutura
  - Definição da Paleta de Cores (sem clichês) e fontes do Google Fonts
  - Configuração de Tags de SEO (Meta title, Meta description, og-image)
  - Identificação de Pixels de Rastreamento (Meta Ads, Google)
  - Instruções de apontamento de DNS e configuração Nginx na VPS

### Fase 6: Geração de Proposta Comercial (10 min)
- [ ] **04_proposta/** - Gerar proposta comercial HTML baseada em pacotes
  - Rodar o script: `python empresa/templates/comercial/gerar_proposta.py`
  - *(O script lê as entregas estruturadas e prazos e gera as propostas Dark e Light automáticas)*

---

## 🎨 Prompts para Diagramas de Apresentação

Quando apresentar a solução técnica para o cliente, utilize imagens conceituais geradas para impressioná-lo na proposta:

### Diagrama 1: Jornada de Tráfego e Captação
```
Professional marketing funnel diagram for [SEGMENTO] business.
Modern, clean infographic showing customer flow.
Flow: "Anúncios Meta/Google Ads (Tráfego)" → "Landing Page Premium CodeSprint (Conversão)" → "Contato Direto no WhatsApp (Venda Fechada)".
Use modern gradients (cyan, slate-dark), clean icons.
Title: "JORNADA DE CAPTAÇÃO DE LEADS"
```

### Diagrama 2: Mockup Estético de Preview (Visual da Landing Page)
```
Professional UI/UX landing page mockup for [SEGMENTO] website.
Modern design, dark premium theme (or custom light theme).
Layout: Shown on a smartphone screen mockup side-by-side with a laptop screen.
Visuals: High-quality typography, clear call to action buttons, clean navigation, professional images related to [SEGMENTO].
Style: Premium SaaS web design.
```

---

## 📁 Estrutura Final do Diretório do Cliente

```
clientes/[nome_cliente]/
├── 01_discovery/
│   └── conversa_bruta.md         ✅ Registro bruto do briefing
│
├── 02_analise/
│   ├── dor_financeira.md         ✅ ROI e cálculo de perda de leads
│   └── viabilidade.md            ✅ Análise de regras éticas (OAB) e de tráfego
│
├── 03_solucao/
│   ├── copywriting_e_secoes.md   ✅ Textos e estrutura por seções (AIDA/Autoridade)
│   ├── setup_e_design.md         ✅ Cores, fontes, SEO, Pixel, DNS e Nginx VPS
│   └── assets/                   ✅ Logotipo, fotos e assets visuais
│
├── 04_proposta/
│   ├── proposta_visual_dark.html ✅ Proposta Dark Mode pronta
│   └── proposta_visual_light.html✅ Proposta Light Mode pronta
│
└── README.md                     ✅ Índice e status do projeto do cliente
```

---

## 💡 Diretrizes Operacionais (Sucesso de Vendas)

1.  **Fale a Língua do Cliente:** Advogados querem escutar sobre "autoridade, segurança jurídica e conformidade institucional". Clínicas de estética querem escutar sobre "desejo, captação visual e experiência do cliente". Adapte o vocabulário.
2.  **Ancore o ROI:** Sempre mostre que se o cliente fechar 1 ou 2 novos contratos/vendas, a Landing Page de R$ 497 já se pagou por completo.
3.  **Use a VPS como Diferencial:** Custo de hospedagem baixo para a agência, estabilidade e controle total do servidor Nginx. Facilita cobrar uma taxa de manutenção opcional mensal para fazer pequenas alterações no futuro.
4.  **Entrega Expressa de Verdade:** Para cumprir as 48 horas, o copywriting e setup de design devem ser fechados no dia 1, permitindo que o desenvolvimento em Next.js seja feito direto e sem bloqueios de infraestrutura.
