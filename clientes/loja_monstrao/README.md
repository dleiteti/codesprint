# 📁 Template de Cliente — CodeSprint

Esta pasta é o **modelo padrão** para criar novos projetos de clientes.

## 🚀 Como Usar

### Criar novo cliente:
```bash
# Copiar template
cp -r _template clientes/[nome-cliente]

# Ou criar do zero:
mkdir -p clientes/[nome-cliente]/{01_discovery,02_analise,03_solucao,04_proposta}
```

## 📂 Estrutura

```
[nome-cliente]/
├── 01_discovery/       # Fase 1: Conversa bruta
│   └── conversa_bruta.md
├── 02_analise/         # Fase 2: Viabilidade
│   ├── viabilidade.md
│   └── dor_financeira.md
├── 03_solucao/         # Fase 3-4: Feature Map + Arquitetura
│   ├── feature_map.md
│   └── arquitetura.md
└── 04_proposta/        # Fase 5: Proposta Comercial
    ├── proposta_comercial.md
    └── proposta_visual_*.html
```

## 🤖 Responsável por Fase

| Pasta | Agente | Tempo |
|-------|--------|-------|
| 01_discovery | Arquiteto | 30min |
| 02_analise | Arquiteto | 1h |
| 03_solucao | Arquiteto | 4h |
| 04_proposta | Comercial + Designer | 1h |

---

*CodeSprint Agency © 2026*
