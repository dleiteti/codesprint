# 📄 Instruções de Export para PDF
## Proposta Moda Premium - Loja do Monstrão

---

## Método 1: Export Automático via Botão (Recomendado)

### Passo a Passo:

1. **Abra o arquivo** `proposta_moda_premium.html` no navegador
   ```bash
   # No terminal (opcional)
   open proposta_moda_premium.html
   ```

2. **Clique no botão "💾 Exportar PDF"** no canto superior direito

3. **Aguarde** a geração (pode levar alguns segundos)

4. **O arquivo PDF será downloadado automaticamente** com o nome:
   ```
   proposta_loja_monstrao_codesprint.pdf
   ```

### ✅ Vantagens deste Método:
- ✨ Mantém fidelidade visual total (bordas, sombras, gradientes)
- 🎨 Preserva cores exatas (Slate + Azul Neon)
- 📐 Formatação A4 profissional
- 🚀 Rápido e automatizado

---

## Método 2: Print Manual do Navegador (Alternativa)

### Passo a Passo:

1. **Abra** `proposta_moda_premium.html` no navegador

2. **Pressione:**
   - **Windows/Linux:** `Ctrl + P`
   - **Mac:** `Cmd + P`

3. **Configure a impressão:**
   - **Destino:** "Salvar como PDF"
   - **Layout:** Retrato
   - **Margens:** Padrão
   - **Opções de segundo plano:** ✅ Ativar (IMPORTANTE para gradientes)
   - **Escala:** 100%

4. **Clique em "Salvar"** e escolha o local

### ⚠️ Atenção:
- **Certifique-se de ativar "Gráficos de segundo plano"** para preservar gradientes
- Alguns navegadores podem não renderizar sombras sutis perfeitamente
- O botão "Exportar PDF" e footer será ocultado automaticamente

---

## Método 3: Ferramentas Externas (Opcional)

### Para Alta Fidelidade Profissional:

Se precisar de qualidade máxima para impressão offset ou apresentação C-level:

1. **Wkhtmltopdf** (CLI):
   ```bash
   wkhtmltopdf --enable-local-file-access \
               --page-size A4 \
               --margin-top 10mm \
               --margin-bottom 10mm \
               proposta_moda_premium.html \
               proposta_final.pdf
   ```

2. **Puppeteer** (Node.js):
   ```javascript
   const puppeteer = require('puppeteer');
   (async () => {
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto('file:///path/to/proposta_moda_premium.html');
     await page.pdf({
       path: 'proposta_final.pdf',
       format: 'A4',
       printBackground: true
     });
     await browser.close();
   })();
   ```

---

## 🎯 Checklist de Qualidade do PDF

Antes de enviar ao cliente, verifique:

- [ ] **Cores:** Gradientes azul neon visíveis
- [ ] **Bordas:** Tabelas e cards com bordas sutis preservadas
- [ ] **Sombras:** Cards têm sombra suave (shadow-sm/shadow-lg)
- [ ] **Fontes:** Inter carregou corretamente (não é Times New Roman)
- [ ] **Ícones:** Emojis (⚙️🤖🔗🚀) renderizaram
- [ ] **Timeline:** Linha vertical azul neon conecta as 4 fases
- [ ] **ROI Card:** Comparação lado a lado (vermelho vs azul) legível
- [ ] **Tabela:** Checkmarks verdes e X vermelhos visíveis
- [ ] **Footer:** Ocultou automaticamente (classe `no-print`)

---

## 🚨 Troubleshooting

### Problema: Gradientes não aparecem
**Solução:** Ative "Gráficos de segundo plano" nas configurações de impressão

### Problema: Fonte aparece como Times New Roman
**Solução:** Aguarde 2-3 segundos após abrir a página antes de exportar (Google Fonts loading)

### Problema: Timeline vertical quebrada
**Solução:** Use o Método 1 (botão de export) ao invés do print manual

### Problema: Cores muito claras
**Solução:** No print manual, aumente o brilho/contraste ou use Método 1

---

## 📧 Enviando ao Cliente

### Email Sugerido:

**Assunto:** Proposta Comercial — Máquina de Vendas Inteligente | Loja do Monstrão

**Corpo:**
```
Olá [Nome do Cliente],

Conforme conversamos, segue em anexo a proposta executiva para a 
Máquina de Vendas Inteligente da CodeSprint.

Principais destaques:
• ROI de 1.761% no primeiro ano
• Payback em menos de 1 mês
• Sistema pronto em 12 dias úteis

Estou à disposição para tirar qualquer dúvida.

Abraços,
Danilo — CodeSprint
📱 (XX) XXXXX-XXXX
```

---

**CodeSprint © 2026**  
*Documentação gerada automaticamente*
