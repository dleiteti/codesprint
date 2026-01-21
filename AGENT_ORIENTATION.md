# 🚨 ATUALIZAÇÃO ESTRUTURAL - LEIA PRIMEIRO

> **Data:** 2026-01-20
> **Autor:** Arquiteto de Software
> **Impacto:** Todos os agentes que operam no workspace `/scratch/codesprint/`

---

## O Que Mudou

O workspace CodeSprint foi **reorganizado** para separar empresa de clientes.

### ❌ Estrutura ANTIGA (NÃO USE)
```
codesprint/
├── src/           ← Landing misturada
├── docs/          ← NÃO EXISTE MAIS
├── processo/      ← NÃO EXISTE MAIS
├── templates/     ← NÃO EXISTE MAIS (movido)
└── clientes/
```

### ✅ Estrutura NOVA (USE ESTA)
```
codesprint/
├── 📂 empresa/              ← TUDO DA CODESPRINT
│   ├── processo/            ← Fluxogramas HTML
│   ├── conhecimento/        ← Learnings, auditorias, pesquisas
│   ├── templates/
│   │   ├── analise/         ← viabilidade, feature_map, arquitetura
│   │   ├── comercial/       ← propostas HTML, scripts
│   │   └── juridico/        ← contratos (MSA, SOW, SLA)
│   └── playbooks/           ← Guias operacionais
│
├── 📂 clientes/             ← PROJETOS POR CLIENTE
│   ├── _template/           ← Copiar para novo cliente
│   └── [nome_cliente]/
│       ├── 01_discovery/
│       ├── 02_analise/
│       ├── 03_solucao/
│       └── 04_proposta/
│
├── 📂 landing/              ← SITE NEXT.JS (movido)
│   ├── src/
│   ├── public/
│   ├── node_modules/
│   └── package.json
│
└── README.md
```

---

## Regras de Operação

### 1️⃣ Trabalho de Cliente
```
SEMPRE use: /scratch/codesprint/clientes/[nome_cliente]/
```

### 2️⃣ Templates de Análise
```
SEMPRE use: /scratch/codesprint/empresa/templates/analise/
- viabilidade_template.md
- feature_map_template.md  
- arquitetura_template.md
```

### 3️⃣ Propostas Comerciais
```
SEMPRE use: /scratch/codesprint/empresa/templates/comercial/
```

### 4️⃣ Contratos Jurídicos
```
SEMPRE use: /scratch/codesprint/empresa/templates/juridico/
```

### 5️⃣ Base de Conhecimento
```
SEMPRE use: /scratch/codesprint/empresa/conhecimento/
```

### 6️⃣ Landing Page
```
SEMPRE use: /scratch/codesprint/landing/
Para rodar: cd landing && npm run dev
```

---

## Paths Absolutos de Referência

| Recurso | Path Absoluto |
|---------|---------------|
| **Workspace** | `/home/danilo/.gemini/antigravity/scratch/codesprint/` |
| **Clientes** | `/home/danilo/.gemini/antigravity/scratch/codesprint/clientes/` |
| **Templates** | `/home/danilo/.gemini/antigravity/scratch/codesprint/empresa/templates/` |
| **Conhecimento** | `/home/danilo/.gemini/antigravity/scratch/codesprint/empresa/conhecimento/` |
| **Landing** | `/home/danilo/.gemini/antigravity/scratch/codesprint/landing/` |

---

## Fluxo de Novo Cliente

1. **Copiar template:**
   ```bash
   cp -r clientes/_template clientes/[nome_cliente]
   ```

2. **Preencher discovery:**
   ```
   clientes/[nome_cliente]/01_discovery/conversa_bruta.md
   ```

3. **Usar templates de análise:**
   ```
   empresa/templates/analise/viabilidade_template.md → 02_analise/
   empresa/templates/analise/feature_map_template.md → 03_solucao/
   empresa/templates/analise/arquitetura_template.md → 03_solucao/
   ```

4. **Gerar proposta:**
   ```bash
   python empresa/templates/comercial/gerar_proposta.py
   ```

---

## ⚠️ ATENÇÃO

- **NÃO crie arquivos na raiz** do workspace
- **NÃO use paths antigos** (`/codesprint/docs/`, `/codesprint/templates/`)
- **SEMPRE verifique** a estrutura antes de criar novos arquivos

---

> **Dúvidas?** Consulte `/scratch/codesprint/README.md`
