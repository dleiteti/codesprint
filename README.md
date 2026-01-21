# 🚀 CodeSprint - Workspace Corporativo

> **Missão:** Transformar conversas brutas em software lucrativo.

---

## 📁 Estrutura do Workspace

```
codesprint/
├── 📂 empresa/          ← Processos, conhecimento, templates
├── 📂 clientes/         ← Projetos por cliente  
├── 📂 landing/          ← Site CodeSprint (Next.js)
└── README.md
```

---

## 🏢 Empresa

Tudo relacionado à operação interna da CodeSprint.

| Pasta | Conteúdo |
|-------|----------|
| `empresa/processo/` | Fluxogramas e pipelines visuais |
| `empresa/conhecimento/` | Learnings, auditorias, pesquisas |
| `empresa/templates/analise/` | Templates de viabilidade, features, arquitetura |
| `empresa/templates/comercial/` | Propostas HTML + scripts de automação |
| `empresa/templates/juridico/` | Contratos e termos |
| `empresa/playbooks/` | Guias operacionais (SOPs) |

---

## 👥 Clientes

Cada cliente tem sua pasta com a estrutura padrão:

```
clientes/
├── _template/           ← Copiar para novo cliente
└── limpeza_express/     ← Projeto ativo
    ├── 01_discovery/
    ├── 02_analise/
    ├── 03_solucao/
    └── 04_proposta/
```

### Projetos Ativos

| Cliente | Status | Início |
|---------|--------|--------|
| Limpeza Express | 🟢 GO Aprovado | 2026-01-20 |

---

## 🌐 Landing

Site institucional da CodeSprint (Next.js).

```bash
cd landing && npm run dev
```

---

## 🤖 Agentes

Workflows dos agentes AI estão em `.agent/workflows/`.

---

*CodeSprint Agency © 2026*
