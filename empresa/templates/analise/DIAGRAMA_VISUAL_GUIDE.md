# 📊 Guia de Diagrama Visual da Solução

> **Objetivo:** Todo cliente deve ter um diagrama visual mostrando PROBLEMA → SOLUÇÃO → RESULTADO

---

## Quando Criar

Após completar a análise de viabilidade e feature map, crie um diagrama que mostre:
1. **Problema Atual** (vermelho/laranja) - A dor do cliente
2. **Solução Proposta** (azul/verde/roxo) - As camadas da nossa solução
3. **Resultado Esperado** (verde) - O impacto mensurável

---

## Template de Prompt (Nano Banana Pro)

```
Professional business diagram showing [DESCRIÇÃO DO PROBLEMA] optimization solution. 
Modern infographic style with vibrant colors.

Layout: Vertical flow diagram with 3 sections

TOP SECTION - "PROBLEMA ATUAL":
- Red/orange background with warning icon
- Shows: "[MÉTRICA ATUAL]" → large red arrow → "[RESULTADO RUIM]"
- Include relevant icon showing the pain point

MIDDLE SECTION - "SOLUÇÃO EM [N] CAMADAS":
Split into [N] columns with gradient backgrounds:

Column 1 - "[NOME SOLUÇÃO 1]":
- Icon: [descrever ícone]
- Bullet points:
  • [Benefício 1]
  • [Benefício 2]
  • [Benefício 3]
- Small stat: "[% de melhoria]"

[Repetir para cada camada da solução]

BOTTOM SECTION - "RESULTADO":
- Green background with success icon
- Shows: "[MÉTRICA]" → large green arrow → "[RESULTADO BOM] ([% MELHORIA])"
- Include upward trending graph icon

Style: Clean, modern, professional. Use icons, clear typography. 
Business presentation quality. White text on colored backgrounds for readability.
```

---

## Exemplo Real (Loja do Monstrão)

**Problema:** 75% de perda no funil (clique → conversa WhatsApp)

**Solução:** 3 camadas
1. Landing Page de captura (+15%)
2. IA de resposta instantânea (+10%)
3. Retargeting de desistentes (+5%)

**Resultado:** +120% de conversão

**Diagrama gerado:** `diagrama_exemplo.png` (nesta pasta)

---

## Onde Incluir

1. **Slide de apresentação** para reunião com cliente
2. **Seção "Solução Visual"** no `feature_map.md`
3. **Proposta comercial** (04_proposta/)
4. **Documentação técnica** para referência futura

---

## Checklist

- [ ] Identificar a métrica principal do problema
- [ ] Definir as camadas da solução (2-4 ideal)
- [ ] Calcular % de impacto por camada
- [ ] Gerar diagrama com Nano Banana Pro
- [ ] Salvar na pasta `03_solucao/diagramas/`
- [ ] Incluir no feature_map.md

---

*CodeSprint - Template de Diagrama Visual v1.0*
