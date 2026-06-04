# 📁 Template de Cliente — CodeSprint (Sites & Landing Pages)

Esta pasta é o **modelo padrão** para organizar o onboarding, planejamento e proposta comercial de cada novo site ou landing page desenvolvida pela agência.

---

## 🚀 Como Usar

### Criar novo cliente:
```bash
# Copiar o template para o novo cliente (substitua [nome-cliente] pelo nome do projeto, ex: advogado-silva)
cp -r src/clientes/_template src/clientes/[nome-cliente]

# Criar a pasta de assets visuais do cliente
mkdir -p src/clientes/[nome-cliente]/03_solucao/assets
```

---

## 📂 Estrutura de Pastas

```
[nome-cliente]/
├── 01_discovery/       # Fase 1: Conversa bruta do WhatsApp
│   └── conversa_bruta.md
│
├── 02_analise/         # Fase 2: Viabilidade e ROI
│   ├── viabilidade.md
│   └── dor_financeira.md
│
├── 03_solucao/         # Fase 3-4: Copywriting e Setup de Design
│   ├── copywriting_e_secoes.md
│   ├── setup_e_design.md
│   └── assets/         # Logotipos, imagens e fotos reais do cliente
│
└── 04_proposta/        # Fase 5: Proposta Comercial Visual (HTML/PDF)
    ├── proposta_visual_dark.html
    └── proposta_visual_light.html
```

---

## 🤖 Responsabilidades e Estimativa de Tempo

| Etapa | Responsável | Tempo Estimado | Arquivo Foco |
|-------|-------------|----------------|--------------|
| **01_discovery** | Comercial / Atendimento | 20 min | `conversa_bruta.md` |
| **02_analise** | Arquiteto de Conversão | 30 min | `viabilidade.md` e `dor_financeira.md` |
| **03_solucao** | Copywriter & Designer UX | 1h 15m | `copywriting_e_secoes.md` e `setup_e_design.md` |
| **04_proposta**| Comercial + Script Python | 10 min | `gerar_proposta.py` (cria os arquivos HTML) |

---

*CodeSprint Agency © 2026*
*Foco Exclusivo em Sites e Landing Pages Premium de Alta Conversão*
