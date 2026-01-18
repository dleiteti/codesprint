# 🔌 Guia de Conexão - Supabase CodeSprint Agency

> **Projeto:** codesprint-agency  
> **Ref:** zgfqdodkmmklelskaeok  
> **Região:** South America (São Paulo - sa-east-1)  
> **Criado:** 2026-01-18

---

## 📌 Informações do Projeto

| Campo | Valor |
|-------|-------|
| **Project ID** | `zgfqdodkmmklelskaeok` |
| **URL** | `https://zgfqdodkmmklelskaeok.supabase.co` |
| **Região** | `sa-east-1` (São Paulo) |
| **Dashboard** | https://supabase.com/dashboard/project/zgfqdodkmmklelskaeok |
| **API Settings** | https://supabase.com/dashboard/project/zgfqdodkmmklelskaeok/api |
| **Database** | https://supabase.com/dashboard/project/zgfqdodkmmklelskaeok/database/tables |

---

## 🔑 Credenciais

### Chaves de API (Frontend)
```bash
# .env.local (Next.js)
NEXT_PUBLIC_SUPABASE_URL="https://zgfqdodkmmklelskaeok.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZnFkb2RrbW1rbGVsc2thZW9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDk5ODksImV4cCI6MjA4NDMyNTk4OX0.0BThkLmbz5BXfKWXc4Q7yE7OfMzaolFRssap3ZPfGBg"
```

### Service Role Key (Backend/Edge Functions)
```bash
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZnFkb2RrbW1rbGVsc2thZW9rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODc0OTk4OSwiZXhwIjoyMDg0MzI1OTg5fQ.bQ_77U3MuPSWnVcVIbM_Ges_kS5tqW2hICXIdLn9Vuw"
```
> ⚠️ **Nunca exponha no frontend!** Apenas para backend/serverless.

### Access Token (CLI/Management API)
```bash
SUPABASE_ACCESS_TOKEN="sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf"
```
> ✅ **Melhor método para CLI e Management API**

### Senha do Postgres
```bash
SUPABASE_DB_PASSWORD="CodeSprint2026!Secure"

# Connection String Direta (requer IPv6):
postgresql://postgres:CodeSprint2026!Secure@db.zgfqdodkmmklelskaeok.supabase.co:5432/postgres
```

---

## 🚀 Métodos de Conexão (Testados)

### 1. JavaScript Client (Frontend) ✅ **RECOMENDADO**
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Uso:
const { data, error } = await supabase
  .from('briefings')
  .select('*')
  .order('created_at', { ascending: false })
```
**Status:** ✅ Funcionando  
**Uso:** Frontend (React, Next.js)

### 2. Management API (Executar SQL) ✅
```bash
# Executar query SQL diretamente
curl -X POST 'https://api.supabase.com/v1/projects/zgfqdodkmmklelskaeok/database/query' \
  -H 'Authorization: Bearer sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf' \
  -H 'Content-Type: application/json' \
  -d '{"query":"SELECT * FROM briefings LIMIT 10"}'
```
**Status:** ✅ Testado e funcionando  
**Uso:** Migrations, queries ad-hoc, scripts

### 3. REST API (PostgREST) ✅
```bash
# Buscar dados via REST
curl "https://zgfqdodkmmklelskaeok.supabase.co/rest/v1/briefings?select=nome,empresa,status&limit=5" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
**Status:** ✅ Funcionando  
**Uso:** APIs externas, webhooks

---

## 💻 Supabase CLI

### Listar Projetos
```bash
SUPABASE_ACCESS_TOKEN="sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf" \
  npx supabase projects list
```

### Obter API Keys
```bash
SUPABASE_ACCESS_TOKEN="sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf" \
  npx supabase projects api-keys --project-ref zgfqdodkmmklelskaeok
```

### Link ao Projeto
```bash
SUPABASE_ACCESS_TOKEN="sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf" \
  npx supabase link --project-ref zgfqdodkmmklelskaeok
```

### Ver Migrações
```bash
SUPABASE_ACCESS_TOKEN="sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf" \
  npx supabase db diff --project-ref zgfqdodkmmklelskaeok
```

---

## 📊 Schema do Banco

### Tabela `briefings`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | PK, auto-gerado |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `nome` | TEXT | Nome do cliente |
| `empresa` | TEXT | Nome da empresa |
| `whatsapp` | TEXT | WhatsApp do cliente |
| `nicho` | TEXT | Nicho do negócio |
| `objetivo` | TEXT | Objetivo da LP |
| `status` | TEXT | Novo, Em Produção, Entregue |
| ... | ... | +25 campos adicionais |

### Criar Tabela Manualmente (via Management API)
```bash
curl -X POST 'https://api.supabase.com/v1/projects/zgfqdodkmmklelskaeok/database/query' \
  -H 'Authorization: Bearer sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf' \
  -H 'Content-Type: application/json' \
  -d '{
    "query": "CREATE TABLE IF NOT EXISTS briefings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      nome TEXT,
      empresa TEXT,
      whatsapp TEXT,
      status TEXT DEFAULT '\''novo'\''
    )"
  }'
```

---

## 🔧 Comandos Úteis

### Inserir Dados via CLI
```bash
# Usando Management API
curl -X POST 'https://api.supabase.com/v1/projects/zgfqdodkmmklelskaeok/database/query' \
  -H 'Authorization: Bearer sbp_9bcabc76a438b14d49e0cf7a51bb5c9fb08d9edf' \
  -H 'Content-Type: application/json' \
  -d '{"query":"INSERT INTO briefings (nome, empresa, status) VALUES ('\''Teste'\'', '\''Empresa Teste'\'', '\''novo'\'')"}'
```

### Buscar Briefings
```bash
# Via REST API
curl "https://zgfqdodkmmklelskaeok.supabase.co/rest/v1/briefings?select=*&order=created_at.desc" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Atualizar Status
```bash
curl -X PATCH "https://zgfqdodkmmklelskaeok.supabase.co/rest/v1/briefings?id=eq.UUID_AQUI" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"status":"em_producao"}'
```

---

## 🏠 Integração com o Projeto CodeSprint

### Estrutura de Arquivos
```
/home/danilo/.gemini/antigravity/scratch/codesprint/
├── .env.local                          # Credenciais
├── src/
│   ├── lib/
│   │   └── supabase.ts                 # Client Supabase
│   └── app/
│       ├── conhecendo-seu-negocio/
│       │   └── page.tsx                # Formulário com integração
│       └── admin/
│           └── leads/
│               └── page.tsx            # Dashboard de leads
```

### Exemplo de Integração
```typescript
// Salvar briefing
await supabase.from('briefings').insert([{
  nome: formData.nome,
  empresa: formData.empresa,
  status: 'novo'
}])

// Buscar briefings
const { data } = await supabase
  .from('briefings')
  .select('*')
  .eq('status', 'novo')

// Atualizar status
await supabase
  .from('briefings')
  .update({ status: 'entregue' })
  .eq('id', briefingId)
```

---

## 📚 Documentação Oficial

| Recurso | URL |
|---------|-----|
| **JavaScript Client** | https://supabase.com/docs/reference/javascript |
| **REST API** | https://supabase.com/docs/guides/api |
| **Management API** | https://supabase.com/docs/reference/api |
| **CLI Reference** | https://supabase.com/docs/reference/cli |

---

## ⚠️ Troubleshooting

### Erro: "Invalid API key"
- **Causa:** Chave incorreta ou expirada
- **Solução:** Verificar `.env.local` e gerar nova key se necessário

### Erro: "Project not found"
- **Causa:** Project ref incorreto
- **Solução:** Usar `zgfqdodkmmklelskaeok`

### Erro: "Connection refused"
- **Causa:** Ambiente sem IPv6 (para conexão direta)
- **Solução:** Usar Management API ou REST API

---

*Documento criado: 18 Jan 2026*  
*Última atualização: Todas as credenciais verificadas e testadas*
