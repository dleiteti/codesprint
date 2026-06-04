# ⚙️ Template: Setup Técnico, Identidade Visual & Deploy

Use este template para centralizar todas as decisões de design, configurações de SEO, códigos de rastreamento de anúncios (pixels) e informações de deploy na VPS para o cliente.

---

## 🎨 1. Direção Visual & Design System

### A. Paleta de Cores (Cores Harmoniosas - Sem Clichês)
* **Cor Primária (Destaque/CTA):** `Hex/HSL` _________________ (Ex: HSL 190, 90%, 50% - Ciano Neon)
* **Cor Secundária (Apoio/Badges):** `Hex/HSL` _________________
* **Fundo (Background):** `Hex/HSL` _________________ (Preferencialmente tons escuros ou neutros premium)
* **Texto Principal:** `Hex/HSL` _________________

### B. Tipografia (Google Fonts Padrão)
* **Fonte de Títulos (Headings):** _______________ (Recomendações: Outfit, Montserrat, Playfair Display)
* **Fonte de Corpo (Body):** _______________ (Recomendações: Inter, Roboto, Plus Jakarta Sans)

### C. Assets Visuais (Logotipo & Fotos)
* [ ] Logotipo em formato SVG ou PNG de alta resolução enviado
* [ ] Fotos corporativas/pessoais salvas na pasta `public/assets/`
* [ ] Ícones selecionados da biblioteca `lucide-react`

---

## 🔍 2. Configurações de SEO & Meta Tags

* **Title da Página (Título na aba do navegador - Máx 60 caracteres):**
  > Exemplo: Advocacia Silva | Especialista em Direito Tributário no RJ
  > Escreva aqui: __________________________________________________
* **Meta Description (Resumo para Google e WhatsApp - Máx 160 caracteres):**
  > Exemplo: Defesa tributária especializada para micro e grandes empresas. Recupere impostos pagos a mais de forma rápida e segura. Agende uma consulta.
  > Escreva aqui: __________________________________________________
* **Imagens de Compartilhamento (Open Graph):**
  - [ ] Arquivo `public/og-image.png` (tamanho recomendado: 1200x630px para visualização rica em redes sociais/WhatsApp).

---

## 📈 3. Pixels, Conversão & Integração

Cole aqui as chaves de integração do cliente para as campanhas de tráfego pago:

* **ID do Pixel do Meta Ads (Facebook Pixel):** `___________________`
* **ID do Google Analytics (GA4 Tag):** `___________________`
* **Token/Chat ID do Telegram (Para Notificação de Leads no WhatsApp):**
  - *Bot Token:* `___________________`
  - *Chat ID:* `___________________`
  - *(Opcional: Caso a agência forneça o bot de alerta interno no grupo do cliente)*

---

## 🚀 4. Apontamento de Domínio e VPS Deploy

### A. DNS (Registro.br ou Cloudflare)
Aponte o domínio do cliente para a VPS da CodeSprint:
* **Entrada A:** `@` apontando para o IP da VPS: `72.60.146.84`
* **Entrada CNAME:** `www` apontando para o domínio do cliente (ex: `cliente.com.br`)

### B. Configuração do Servidor Remoto (Nginx VPS)
Para cada cliente novo, crie um arquivo de configuração no Nginx na VPS `/etc/nginx/sites-available/[cliente].com.br`:

```nginx
server {
    listen 80;
    server_name [cliente].com.br www.[cliente].com.br;

    root /var/www/[cliente];
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Habilitar Gzip para carregamento instantâneo
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
}
```

### C. Deploy Automatizado
Duplique o script `deploy.ps1` na raiz da pasta do cliente e altere as variáveis de destino:
* `$DestDir = "/var/www/[nome-do-cliente]"`
* `$NginxDest = "/etc/nginx/sites-available/[cliente].com.br"`
* Execute o deploy via PowerShell: `.\deploy.ps1`
