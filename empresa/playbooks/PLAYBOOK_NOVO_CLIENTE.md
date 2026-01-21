# 🚀 Playbook: Novo Cliente CodeSprint

> **Processo completo para análise e entrega visual de novos clientes**
> **Tempo estimado:** 2-3 horas por cliente

---

## 📋 Checklist Master

### Fase 1: Setup (5 min)
- [ ] Copiar template: `cp -r clientes/_template clientes/[nome_cliente]`
- [ ] Criar pasta de diagramas: `mkdir -p clientes/[nome_cliente]/03_solucao/diagramas`

### Fase 2: Discovery (30 min)
- [ ] **01_discovery/conversa_bruta.md** - Registrar briefing do cliente
  - Problema principal
  - Dor financeira declarada
  - Perfil do negócio
  - Quotes importantes

### Fase 3: Análise (45 min)
- [ ] **02_analise/dor_financeira.md** - Calcular prejuízo
  - Fórmula de perda
  - Precificação (Setup + Mensalidade)
  - Demonstração de ROI
  - Cenários de negociação

- [ ] **02_analise/viabilidade.md** - Relatório Go/No-Go
  - Viabilidade técnica
  - Análise de riscos
  - Buracos de coelho
  - Veredito final

### Fase 4: Solução (60 min)
- [ ] **03_solucao/feature_map.md** - MVP Fatia Fina
  - 3 telas/módulos que resolvem 80%
  - Fluxo completo
  - Backlog futuro
  - Cronograma Shape Up

- [ ] **03_solucao/arquitetura.md** - Desenho técnico
  - Stack tecnológica
  - Modelo de dados (SQL)
  - Fluxos de integração
  - Estratégia offline (se aplicável)

### Fase 5: Diagramas Visuais (30 min) ⭐
- [ ] **03_solucao/diagramas/solucao_visual.png** - Problema → Solução
- [ ] **03_solucao/diagramas/jornada_lead.png** - Fluxo do cliente
- [ ] **03_solucao/diagramas/mockup_dashboard.png** - Preview do sistema

### Fase 6: Proposta (15 min)
- [ ] **04_proposta/** - Proposta comercial HTML
  - Gerar com script: `python empresa/templates/comercial/gerar_proposta.py`

---

## 🎨 Prompts para Diagramas

### Diagrama 1: Problema → Solução

```
Professional business diagram showing [PROBLEMA DO CLIENTE] optimization solution. 
Modern infographic style with vibrant colors.

Layout: Vertical flow diagram with 3 sections

TOP SECTION - "PROBLEMA ATUAL":
- Red background with warning icon
- Shows: "[MÉTRICA ATUAL]" → "[RESULTADO RUIM] ([%] PERDIDOS)"
- Include funnel icon showing drop-off

MIDDLE SECTION - "SOLUÇÃO EM [N] CAMADAS":
Split into [N] columns with gradient backgrounds (blue, green, purple):

Column 1 - "[NOME MÓDULO 1]":
- Icon: [ícone relevante]
- Bullet points: [3 benefícios]
- Small stat: "+[X]% conversão"

[Repetir para cada módulo]

BOTTOM SECTION - "RESULTADO":
- Green background with success icon
- Shows: "[MÉTRICA]" → "[RESULTADO BOM] (+[X]%)"

Style: Clean, modern, professional. Business presentation quality.
```

### Diagrama 2: Jornada do Cliente

```
Professional customer journey map infographic for [SEGMENTO] business.
Modern, clean design with [CORES DO CLIENTE] accents.

Horizontal flow with [N] connected steps, each as a rounded card with icon:

STEP 1 - "[ETAPA 1]" ([cor]):
- Icon: [ícone]
- Small text: "[descrição]"
- Arrow pointing right

[Repetir para cada etapa do fluxo]

At the bottom: Timeline showing tempo de cada fase.

Title: "JORNADA DO [PERSONA] - [NOME CLIENTE]"
Subtitle: "[Descrição do fluxo]"

Style: Professional business presentation, clean icons, modern gradients.
```

### Diagrama 3: Mockup do Dashboard

```
Professional dashboard UI mockup for [SEGMENTO] analytics. 
Dark theme with vibrant accent colors. Modern SaaS design style.

LEFT SIDEBAR (dark):
- Logo "[NOME CLIENTE]" at top
- Menu items: [listar menus relevantes]

MAIN CONTENT:

TOP ROW - 4 metric cards:
Card 1: "[MÉTRICA 1]" - Large number - Small comparison
Card 2: "[MÉTRICA 2]" - Large number - Small comparison
Card 3: "[MÉTRICA 3]" - Large number - Small comparison
Card 4: "[MÉTRICA 4]" - Large number - Small comparison

MIDDLE ROW - 2 charts:
Left: "[GRÁFICO 1]" (bar chart com dados relevantes)
Right: "[GRÁFICO 2]" (funil ou linha)

BOTTOM ROW - Table with recent data

Title: "Dashboard - Visão Geral"
Style: Modern SaaS dashboard, dark theme, professional typography.
```

---

## 📁 Estrutura Final do Cliente

```
clientes/[nome_cliente]/
├── 01_discovery/
│   └── conversa_bruta.md         ✅ Briefing
│
├── 02_analise/
│   ├── dor_financeira.md         ✅ Cálculo de prejuízo
│   └── viabilidade.md            ✅ Go/No-Go
│
├── 03_solucao/
│   ├── feature_map.md            ✅ MVP + Cronograma
│   ├── arquitetura.md            ✅ Desenho técnico
│   └── diagramas/
│       ├── solucao_visual.png    ✅ Problema → Solução
│       ├── jornada_lead.png      ✅ Fluxo do cliente
│       └── mockup_dashboard.png  ✅ Preview do sistema
│
├── 04_proposta/
│   └── proposta.html             ✅ Proposta comercial
│
└── README.md                     ✅ Índice do projeto
```

---

## 🔄 Fluxo Resumido

```
BRIEFING → ANÁLISE → SOLUÇÃO → DIAGRAMAS → PROPOSTA
   ↓          ↓          ↓          ↓          ↓
 30min      45min      60min      30min      15min
```

**Total: ~3 horas por cliente**

---

## 💡 Dicas

1. **Sempre calcule ROI** - Cliente quer saber quando recupera o investimento
2. **Use números reais** - Pergunte métricas específicas (ticket, volume, perda)
3. **Mostre antes de falar** - Diagramas visuais vendem melhor que texto
4. **Identifique buracos** - Antecipar problemas técnicos ganha confiança
5. **Precifique pelo valor** - Preço = % da dor, não custo do dev

---

*CodeSprint - Playbook Novo Cliente v1.0*
*Atualizado: 2026-01-20*
