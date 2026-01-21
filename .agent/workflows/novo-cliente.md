---
description: Processo completo para analisar e gerar entregáveis de novo cliente CodeSprint
---

# Workflow: Novo Cliente CodeSprint

Este workflow guia a análise completa de um novo lead, gerando todos os artefatos e diagramas visuais.

## Pré-requisitos
- Briefing do cliente com problema e dor financeira
- Nome do cliente definido (slug para pasta, ex: loja_monstrao)

## Passos

### 1. Setup da Pasta
// turbo
```bash
cp -r clientes/_template clientes/[NOME_CLIENTE]
mkdir -p clientes/[NOME_CLIENTE]/03_solucao/diagramas
```

### 2. Registrar Discovery
Criar `clientes/[NOME_CLIENTE]/01_discovery/conversa_bruta.md` com:
- Problema principal
- Dor financeira declarada
- Perfil do negócio
- Quotes importantes

### 3. Análise Financeira
Criar `clientes/[NOME_CLIENTE]/02_analise/dor_financeira.md` usando template:
```
empresa/templates/analise/viabilidade_template.md
```
- Calcular prejuízo mensal/anual
- Definir Setup e Mensalidade (meta: ROI em 3 meses)
- Criar cenários de negociação

### 4. Relatório de Viabilidade
Criar `clientes/[NOME_CLIENTE]/02_analise/viabilidade.md`:
- Viabilidade técnica de cada integração
- Análise de riscos e buracos de coelho
- Veredito Go/No-Go

### 5. Feature Map (MVP)
Criar `clientes/[NOME_CLIENTE]/03_solucao/feature_map.md`:
- 3 telas/módulos que resolvem 80% do problema
- Funcionalidades detalhadas por módulo
- Backlog futuro (o que NÃO entra)
- Cronograma Shape Up (10-15 dias)

### 6. Arquitetura Técnica
Criar `clientes/[NOME_CLIENTE]/03_solucao/arquitetura.md`:
- Stack tecnológica
- Modelo de dados (diagramas ER + SQL)
- Fluxos de integração
- Políticas RLS

### 7. Gerar Diagramas Visuais ⭐
Usar `generate_image` para criar 3 diagramas:

**7.1 Diagrama Problema → Solução:**
Salvar como: `03_solucao/diagramas/solucao_visual.png`

**7.2 Diagrama Jornada do Cliente:**
Salvar como: `03_solucao/diagramas/jornada_lead.png`

**7.3 Mockup do Dashboard:**
Salvar como: `03_solucao/diagramas/mockup_dashboard.png`

Consultar prompts em: `empresa/playbooks/PLAYBOOK_NOVO_CLIENTE.md`

### 8. Gerar Proposta Comercial
// turbo
```bash
cd /home/danilo/.gemini/antigravity/scratch/codesprint
python empresa/templates/comercial/gerar_proposta.py --cliente [NOME_CLIENTE]
```

### 9. Notificar Usuário
Apresentar resumo executivo com:
- Veredito (Go/No-Go)
- Valores (Setup + Mensalidade)
- ROI calculado
- Links para os 3 diagramas
- Próximos passos

## Entregáveis Finais

```
clientes/[NOME_CLIENTE]/
├── 01_discovery/conversa_bruta.md
├── 02_analise/
│   ├── dor_financeira.md
│   └── viabilidade.md
├── 03_solucao/
│   ├── feature_map.md
│   ├── arquitetura.md
│   └── diagramas/
│       ├── solucao_visual.png
│       ├── jornada_lead.png
│       └── mockup_dashboard.png
└── 04_proposta/proposta.html
```

## Tempo Estimado
- Discovery: 30 min
- Análise: 45 min
- Solução: 60 min
- Diagramas: 30 min
- Proposta: 15 min
- **Total: ~3 horas**
