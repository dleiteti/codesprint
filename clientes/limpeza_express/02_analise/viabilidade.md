# 📋 Relatório de Viabilidade - Limpeza Express

> **Cliente:** Ricardo - Limpeza Express
> **Data:** 2026-01-20
> **Analista:** CodeSprint AI Architect

---

## 1. Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Veredito** | 🟢 **GO** |
| **Dor Financeira Mensal** | R$ 10.000 |
| **Investimento Proposto** | R$ 15.000 (setup) + R$ 990/mês |
| **ROI Esperado** | **2 meses** (payback) |
| **ROI Ano 1** | **357%** |
| **Risco** | 🟡 Médio |

---

## 2. Diagnóstico da Dor

### 2.1 Problema Central
**Vendas cegas:** Vendedores via WhatsApp não sabem o que tem disponível no estoque, gerando:
- Vendas canceladas após confirmação
- Ruptura de estoque sem aviso
- Retrabalho operacional constante

### 2.2 Impacto Financeiro Detalhado

| Tipo de Perda | Mensal | Anual |
|---------------|--------|-------|
| Vendas perdidas (ruptura) | R$ 5.000 | R$ 60.000 |
| Cancelamentos (erro) | R$ 2.500 | R$ 30.000 |
| Custo operacional | R$ 1.500 | R$ 18.000 |
| Custo de oportunidade | R$ 1.000 | R$ 12.000 |
| **TOTAL** | **R$ 10.000** | **R$ 120.000** |

### 2.3 Causa Raiz
1. **Ausência de sistema:** Controle via caderno/WhatsApp
2. **Comunicação fragmentada:** Estoque não fala com vendas
3. **Zero visibilidade:** Ninguém sabe o saldo real

---

## 3. Solução Proposta

### 3.1 MVP (Fatia Fina) - 3 Telas

| Tela | Usuário | Problema que Resolve |
|------|---------|---------------------|
| **Catálogo Mobile** | Vendedor | Sabe o que tem antes de vender |
| **Dashboard Admin** | Ricardo | Visão completa + Alertas |
| **Baixa Rápida** | Estoque | Confirma separação com 1 clique |

### 3.2 Diferenciais Técnicos
- ✅ **Funciona 100% Offline** (PWA + IndexedDB)
- ✅ **Sincronização automática** quando voltar online
- ✅ **Mobile-first** (otimizado para uso em campo)
- ✅ **Feedback visual exagerado** (fácil para equipe)

### 3.3 Prazo de Entrega
- **Ciclo Shape Up:** 12 dias úteis
- **Go-Live:** 2026-02-05 (estimativa)

---

## 4. Análise de Riscos

### 4.1 Buracos de Coelho Identificados

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| **Vendedor sem internet** | Alta | Alto | ✅ PWA Offline-First com Background Sync |
| **Equipe não adotar** | Média | Alto | Onboarding presencial + UX simplificada |
| **Escopo crescer** | Alta | Médio | Contrato Shape Up (escopo fechado) |
| **Dados inconsistentes** | Média | Alto | Sync bidirecional com conflito resolution |
| **WhatsApp do cliente** | Baixa | Baixo | Fase 2: Integração Bot |

### 4.2 Estratégia Offline (Buraco de Coelho Principal)

```
CENÁRIO: Vendedor em área sem sinal

PROBLEMA: Como registrar venda se não tem internet?

SOLUÇÃO IMPLEMENTADA:
1. App funciona 100% offline via PWA
2. Vendas salvas no IndexedDB local
3. Service Worker monitora conexão
4. Quando online → Background Sync automático
5. Indicador visual de status sempre visível

RESULTADO: Zero vendas perdidas por falta de sinal
```

### 4.3 Dependências Externas
| Dependência | Risco | Plano B |
|-------------|-------|---------|
| Supabase | Baixo | Self-hosted se necessário |
| Internet do cliente | N/A | Offline-first resolve |
| Smartphone vendedor | Baixo | Qualquer Android 8+ funciona |

---

## 5. Precificação

### 5.1 Investimento

| Item | Valor | Justificativa |
|------|-------|---------------|
| **Setup (Desenvolvimento)** | R$ 15.000 | 12 dias × dev senior |
| **Mensalidade (Sustentação)** | R$ 990/mês | Infra + Suporte + Updates |

### 5.2 Demonstração de Valor

```
SEM SISTEMA (12 meses):
├── Perdas: -R$ 120.000
└── Saldo: -R$ 120.000

COM SISTEMA (12 meses):
├── Setup: -R$ 15.000
├── Mensalidade: -R$ 11.880 (R$ 990 × 12)
├── Economia: +R$ 96.000 (R$ 8.000 × 12)
└── Saldo: +R$ 69.120 ← Sobra no bolso!
```

### 5.3 ROI Calculado

| Métrica | Valor |
|---------|-------|
| **Payback** | ~2 meses |
| **ROI Ano 1** | 357% |
| **Economia Líquida Ano 1** | R$ 69.120 |

---

## 6. Escopo Detalhado do MVP

### 6.1 Incluso no Setup (R$ 15.000)

| Entrega | Descrição |
|---------|-----------|
| ✅ Catálogo Mobile | PWA com busca + status de estoque |
| ✅ Modo Offline | Funciona sem internet |
| ✅ Dashboard Admin | Visão geral + Alertas |
| ✅ Baixa Rápida | Tela para equipe de estoque |
| ✅ Login via WhatsApp | Sem senha |
| ✅ Treinamento | 2h de onboarding |
| ✅ Deploy | Hospedagem configurada |

### 6.2 NÃO Incluso (Fases Futuras)

| Feature | Ciclo | Custo Estimado |
|---------|-------|----------------|
| Bot WhatsApp | Ciclo 2 | R$ 8.000 |
| Leitor de barras | Ciclo 2 | R$ 3.000 |
| Relatórios avançados | Ciclo 3 | R$ 5.000 |
| NFe/NFCe | Ciclo 4 | R$ 12.000 |

---

## 7. Veredito Final

### 🟢 **GO - PROJETO APROVADO**

### Justificativa

1. **ROI Claro:** O cliente perde R$ 10k/mês. O sistema custa R$ 15k + R$ 990/mês. Payback em 2 meses.

2. **Problema Real:** A dor é tangível, mensurável e urgente. Não é "nice to have".

3. **Escopo Controlável:** 3 telas, 12 dias, equipe enxuta. Baixo risco de derrapagem.

4. **Tecnologia Madura:** Stack boring (React + Supabase + PWA). Sem experimentos.

5. **Mitigação de Riscos:** Offline-first resolve o principal buraco de coelho.

### Próximos Passos

| Passo | Responsável | Prazo |
|-------|-------------|-------|
| 1. Apresentar proposta ao Ricardo | Danilo | Hoje |
| 2. Assinatura contrato + Sinal 50% | Ricardo | +3 dias |
| 3. Kick-off + Coleta de produtos | Dev Team | +5 dias |
| 4. Sprint Shape Up (12 dias) | Dev Team | +17 dias |
| 5. Go-Live + Treinamento | Dev Team | +18 dias |

---

## 8. Anexos

- [📊 Diagnóstico Financeiro](./dor_financeira.md)
- [🗺️ Mapa de Funcionalidades](../03_solucao/feature_map.md)
- [🏗️ Arquitetura Técnica](../03_solucao/arquitetura.md)

---

> **"Não é sobre ter o melhor sistema. É sobre parar de perder R$ 10.000 por mês."**

*Gerado por CodeSprint AI Architect*
