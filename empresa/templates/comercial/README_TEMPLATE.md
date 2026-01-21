# 📘 Guia de Uso: Template Master de Proposta Comercial

## Visão Geral
Template HTML premium com Tailwind CSS para propostas comerciais executivas da CodeSprint.

## 🎨 Design System

### Paleta de Cores
```css
Brand Dark:  #0B1120 (Background principal)
Brand Neon:  #00D4FF (Destaque e CTAs)
Brand Slate: #1E293B (Cards e divisões)
Brand Gray:  #64748B (Textos secundários)
```

### Tipografia
- **Font**: Inter (Google Fonts)
- **Pesos**: 300 (Light), 400 (Regular), 600 (Semibold), 700 (Bold), 900 (Black)

---

## 🔧 Placeholders Disponíveis

### Metadata
| Placeholder | Descrição | Exemplo |
|-------------|-----------|---------|
| `{{NOME_CLIENTE}}` | Nome da empresa cliente | "Limpeza Express" |
| `{{DATA_PROPOSTA}}` | Data de emissão | "20 de Janeiro de 2026" |
| `{{DIAS_VALIDADE}}` | Prazo de validade | "7" |

### Hero Section
| Placeholder | Descrição |
|-------------|-----------|
| `{{TITULO_PROJETO}}` | Título do projeto | "Sistema de Controle de Estoque" |
| `{{DESCRICAO_PROBLEMA}}` | Descrição da dor do cliente | |

### Financeiro
| Placeholder | Descrição | Exemplo |
|-------------|-----------|---------|
| `{{PERDA_MENSAL}}` | Perda financeira mensal | "R$ 10.000" |
| `{{PERDA_ANUAL}}` | Perda anualizada | "R$ 120.000" |
| `{{ROI_PERCENTUAL}}` | ROI esperado | "357%" |
| `{{PAYBACK_MESES}}` | Tempo de retorno | "2 meses" |
| `{{VALOR_SETUP}}` | Investimento inicial | "R$ 15.000" |
| `{{VALOR_MENSALIDADE}}` | Mensalidade recorrente | "R$ 990/mês" |
| `{{INVESTIMENTO_ANO1}}` | Total investido ano 1 | "R$ 26.880" |
| `{{ECONOMIA_ANO1}}` | Economia projetada | "R$ 96.000" |
| `{{SOBRA_ANO1}}` | Lucro líquido | "R$ 69.120" |

### Solução
| Placeholder | Descrição |
|-------------|-----------|
| `{{DESCRICAO_SOLUCAO}}` | Descrição da solução técnica |

**Entregas (Lista Iterável):**
```handlebars
{{#each ENTREGAS}}
    {{ENTREGA_NOME}} - Nome da funcionalidade
    {{ENTREGA_DESCRICAO}} - Valor entregue
{{/each}}
```

### Cronograma
| Placeholder | Descrição | Exemplo |
|-------------|-----------|---------|
| `{{PRAZO_DIAS}}` | Prazo total de entrega | "12" |

**Fases (Lista Iterável):**
```handlebars
{{#each FASES_CRONOGRAMA}}
    {{FASE_NUMERO}} - Número da fase (1, 2, 3...)
    {{FASE_NOME}} - Nome da fase
    {{FASE_DESCRICAO}} - Descrição da etapa
    {{FASE_PRAZO}} - Tempo relativo ("+3 dias")
{{/each}}
```

### CTA e Footer
| Placeholder | Descrição |
|-------------|-----------|
| `{{URGENCIA_TEXTO}}` | Texto persuasivo do CTA |
| `{{NOME_RESPONSAVEL}}` | Nome do vendedor |
| `{{CARGO_RESPONSAVEL}}` | Cargo (ex: "CEO") |
| `{{WHATSAPP}}` | Telefone WhatsApp |
| `{{EMAIL}}` | Email de contato |
| `{{WEBSITE}}` | Site da empresa |
| `{{FRASE_ASSINATURA}}` | Frase de impacto final |

---

## 🚀 Como Usar

### 1. Substituição Manual (Básica)
```bash
# Abra o arquivo e substitua os placeholders
# Busque por {{ e substitua os valores
```

### 2. Substituição com Script Python (Recomendado)
```python
from pathlib import Path

template = Path("templates/proposta_comercial_master.html").read_text()

dados = {
    "NOME_CLIENTE": "Limpeza Express",
    "DATA_PROPOSTA": "20 de Janeiro de 2026",
    "PERDA_MENSAL": "R$ 10.000",
    # ... outros campos
}

# Substituir placeholders simples
for key, value in dados.items():
    template = template.replace(f"{{{{{key}}}}}", value)

# Salvar proposta final
Path("clientes/limpeza_express/04_proposta/proposta_final.html").write_text(template)
```

### 3. Exportar para PDF
1. Abra o HTML no navegador
2. Clique no botão "🖨️ Exportar para PDF"
3. Ou: `Ctrl+P` → Salvar como PDF
4. Configurações:
   - Margens: Padrão
   - Orientação: Retrato
   - Escala: 100%
   - Imprimir cores de fundo: ✅ ATIVADO

---

## 🎯 Checklist Pré-Envio

- [ ] Todos os placeholders `{{XXX}}` foram substituídos
- [ ] Valores financeiros conferidos
- [ ] Cronograma alinhado com prazo real
- [ ] Dados de contato atualizados
- [ ] Teste de visualização no Firefox/Chrome
- [ ] PDF exportado com cores corretas

---

## 🛠️ Customização

### Alterar Cor Principal
```html
<!-- No <script> do Tailwind Config -->
brand: {
    neon: '#00D4FF', // ← Altere aqui
}
```

### Adicionar Nova Seção
```html
<section class="mb-16">
    <h2 class="text-3xl font-bold mb-6 text-gradient">📊 Título</h2>
    <div class="bg-white/5 border border-white/10 rounded-2xl p-8">
        <!-- Conteúdo -->
    </div>
</section>
```

---

*Desenvolvido pelo Designer UX/UI da CodeSprint*
