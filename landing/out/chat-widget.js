/* ═══════════════════════════════════════════
   CODESPRINT — Chat Widget
   Atendente virtual "Sofia" para a LP
   Self-contained: CSS + HTML + JS
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  const CHAT_API = '/chat';
  const SESSION_KEY = 'codesprint_chat_sid';
  const HISTORY_KEY = 'codesprint_chat_history';
  const SOFIA_AVATAR = '/sofia-avatar.png';
  
  // Generate or retrieve session ID
  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 'cs_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  }

  // ─── Inject CSS ───
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Chat Bubble — Card style with avatar */
      .cs-chat-bubble {
        position: fixed;
        bottom: 24px;
        right: 24px;
        border-radius: 32px;
        background: #111F38;
        border: 1px solid rgba(255,255,255,0.08);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 22px 10px 10px;
        box-shadow: 0 6px 28px rgba(0,0,0,0.4);
        z-index: 10000;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        animation: cs-bubble-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        opacity: 0;
        transform: translateY(16px);
        font-family: 'Inter', -apple-system, sans-serif;
      }
      
      .cs-chat-bubble:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.45);
        border-color: rgba(255,255,255,0.12);
      }
      
      .cs-chat-bubble.cs-open {
        transform: translateY(16px) !important;
        opacity: 0 !important;
        pointer-events: none;
      }
      
      .cs-bubble-avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        border: 2px solid rgba(6, 182, 212, 0.4);
      }
      
      .cs-bubble-info {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      
      .cs-bubble-name {
        color: #F0F4FA;
        font-weight: 600;
        font-size: 15px;
        line-height: 1.3;
        white-space: nowrap;
      }
      
      .cs-bubble-status {
        color: #22C55E;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
        line-height: 1.2;
      }
      
      .cs-bubble-status::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #22C55E;
        display: inline-block;
        animation: cs-pulse-dot 2s ease-in-out infinite;
      }
      
      @keyframes cs-pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      
      @keyframes cs-bubble-in {
        to { opacity: 1; transform: translateY(0); }
      }

      /* Proactive tooltip */
      .cs-chat-tooltip {
        position: fixed;
        bottom: 82px;
        right: 24px;
        background: #162847;
        color: #F0F4FA;
        padding: 10px 32px 10px 14px;
        border-radius: 12px 12px 4px 12px;
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 13px;
        max-width: 260px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateY(6px);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        border: 1px solid rgba(255,255,255,0.06);
      }
      
      .cs-chat-tooltip.cs-show {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        cursor: pointer;
      }
      
      .cs-chat-tooltip .cs-tooltip-close {
        position: absolute;
        top: 4px;
        right: 8px;
        background: none;
        border: none;
        color: #506688;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
      }

      /* Chat Window */
      .cs-chat-window {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 370px;
        height: 520px;
        max-height: calc(100vh - 48px);
        max-width: calc(100vw - 24px);
        background: #0D1B30;
        border-radius: 16px;
        box-shadow: 0 8px 48px rgba(0,0,0,0.4);
        z-index: 10001;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transform: translateY(16px) scale(0.95);
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        border: 1px solid rgba(255,255,255,0.06);
        font-family: 'Inter', -apple-system, sans-serif;
      }
      
      .cs-chat-window.cs-open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }
      
      /* Header */
      .cs-chat-header {
        padding: 16px 20px;
        background: linear-gradient(135deg, #111F38, #162847);
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }
      
      .cs-chat-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        border: 2px solid rgba(6, 182, 212, 0.3);
      }
      
      .cs-chat-header-info {
        flex: 1;
      }
      
      .cs-chat-header-name {
        color: #F0F4FA;
        font-weight: 600;
        font-size: 15px;
      }
      
      .cs-chat-header-status {
        color: #22C55E;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
      
      .cs-chat-header-status::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #22C55E;
        display: inline-block;
      }
      
      .cs-chat-close {
        background: none;
        border: none;
        color: #506688;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .cs-chat-close:hover {
        background: rgba(255,255,255,0.05);
        color: #F0F4FA;
      }
      
      /* Messages Area */
      .cs-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        scrollbar-width: thin;
        scrollbar-color: rgba(255,255,255,0.1) transparent;
      }
      
      .cs-msg {
        max-width: 85%;
        padding: 10px 14px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
        animation: cs-msg-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        word-wrap: break-word;
      }
      
      @keyframes cs-msg-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .cs-msg-bot {
        background: #111F38;
        color: #F0F4FA;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        border: 1px solid rgba(255,255,255,0.04);
      }
      
      .cs-msg-user {
        background: linear-gradient(135deg, #06B6D4, #0891B2);
        color: white;
        border-bottom-right-radius: 4px;
        align-self: flex-end;
      }
      
      /* Typing indicator */
      .cs-typing {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        align-self: flex-start;
      }
      
      .cs-typing-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #506688;
        animation: cs-typing-bounce 1.2s infinite;
      }
      
      .cs-typing-dot:nth-child(2) { animation-delay: 0.15s; }
      .cs-typing-dot:nth-child(3) { animation-delay: 0.3s; }
      
      @keyframes cs-typing-bounce {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-6px); }
      }
      
      /* Quick replies */
      .cs-quick-replies {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 16px 8px;
        flex-shrink: 0;
      }
      
      .cs-quick-btn {
        background: rgba(6, 182, 212, 0.1);
        border: 1px solid rgba(6, 182, 212, 0.3);
        color: #67E8F9;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        white-space: nowrap;
      }
      
      .cs-quick-btn:hover {
        background: rgba(6, 182, 212, 0.2);
        border-color: #06B6D4;
      }

      /* Input Area */
      .cs-chat-input-area {
        padding: 12px 16px;
        background: #0A1628;
        border-top: 1px solid rgba(255,255,255,0.06);
        display: flex;
        gap: 8px;
        flex-shrink: 0;
      }
      
      .cs-chat-input {
        flex: 1;
        background: #111F38;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 24px;
        padding: 10px 16px;
        color: #F0F4FA;
        font-size: 14px;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s;
      }
      
      .cs-chat-input:focus {
        border-color: rgba(6, 182, 212, 0.4);
      }
      
      .cs-chat-input::placeholder {
        color: #506688;
      }
      
      .cs-chat-send {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #06B6D4, #0891B2);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        flex-shrink: 0;
      }
      
      .cs-chat-send:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 12px rgba(6, 182, 212, 0.4);
      }
      
      .cs-chat-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
      
      .cs-chat-send svg {
        width: 18px;
        height: 18px;
        color: white;
      }

      /* Mobile adjustments */
      @media (max-width: 480px) {
        .cs-chat-window {
          bottom: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          max-height: 100vh;
          max-width: 100vw;
          border-radius: 0;
        }
        
        .cs-chat-bubble {
          bottom: 12px;
          right: 12px;
        }
        
        .cs-chat-tooltip {
          bottom: 72px;
          right: 12px;
          max-width: calc(100vw - 80px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Build DOM ───
  function buildWidget() {
    // Chat bubble — card style
    const bubble = document.createElement('button');
    bubble.className = 'cs-chat-bubble';
    bubble.id = 'csChatBubble';
    bubble.innerHTML = `
      <img class="cs-bubble-avatar" src="${SOFIA_AVATAR}" alt="Sofia" />
      <div class="cs-bubble-info">
        <span class="cs-bubble-name">Sofia \u00b7 Atendente</span>
        <span class="cs-bubble-status">Online agora</span>
      </div>
    `;

    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'cs-chat-tooltip';
    tooltip.id = 'csChatTooltip';
    tooltip.innerHTML = `
      <button class="cs-tooltip-close" aria-label="Fechar">&times;</button>
      Oi! 👋 Posso te ajudar com o seu site?
    `;

    // Chat window
    const win = document.createElement('div');
    win.className = 'cs-chat-window';
    win.id = 'csChatWindow';
    win.innerHTML = `
      <div class="cs-chat-header">
        <img class="cs-chat-avatar" src="${SOFIA_AVATAR}" alt="Sofia" />
        <div class="cs-chat-header-info">
          <div class="cs-chat-header-name">Sofia \u00b7 Atendente</div>
          <div class="cs-chat-header-status">Online agora</div>
        </div>
        <button class="cs-chat-close" id="csChatClose" aria-label="Fechar chat">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="cs-chat-messages" id="csChatMessages"></div>
      <div class="cs-quick-replies" id="csQuickReplies"></div>
      <div class="cs-chat-input-area">
        <input type="text" class="cs-chat-input" id="csChatInput" placeholder="Digite sua mensagem..." autocomplete="off" />
        <button class="cs-chat-send" id="csChatSend" aria-label="Enviar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(tooltip);
    document.body.appendChild(win);

    return { bubble, tooltip, win };
  }

  // ─── Chat Logic ───
  function initChat() {
    injectStyles();
    const { bubble, tooltip, win } = buildWidget();
    
    const messagesEl = document.getElementById('csChatMessages');
    const inputEl = document.getElementById('csChatInput');
    const sendBtn = document.getElementById('csChatSend');
    const closeBtn = document.getElementById('csChatClose');
    const quickRepliesEl = document.getElementById('csQuickReplies');
    
    let isOpen = false;
    let isFirstOpen = true;
    let isSending = false;
    const sessionId = getSessionId();

    // Restore history from sessionStorage
    const savedHistory = sessionStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        const msgs = JSON.parse(savedHistory);
        msgs.forEach(m => addMessage(m.text, m.type, false));
        isFirstOpen = false;
        
        // Verifica se a última mensagem do bot indicava finalização para reinscrever o botão de whatsapp
        const hasContactInfo = msgs.some(m => m.type === 'user' && (m.text.includes('wa.me') || m.text.includes('Falar pelo WhatsApp')));
        // Se a conversa já estava qualificada, exibe o botão do WhatsApp
        const lastMsg = msgs[msgs.length - 1];
        if (lastMsg && msgs.length > 3) {
           // Checa se o leadData já foi enviado buscando no localStorage se qualificou
           if (localStorage.getItem('cs_lead_qualified') === 'true') {
              showWhatsAppButton();
           }
        }
      } catch(e) {}
    }

    // ─── Open/Close ───
    function openChat() {
      isOpen = true;
      win.classList.add('cs-open');
      bubble.classList.add('cs-open');
      tooltip.classList.remove('cs-show');
      
      if (isFirstOpen) {
        isFirstOpen = false;
        // Send initial greeting
        showTyping();
        setTimeout(() => {
          hideTyping();
          addMessage('Oi! 👋 Tudo bem? Sou a Sofia, da CodeSprint. Posso te ajudar com alguma dúvida sobre a criação do seu site profissional?', 'bot');
          showQuickReplies(['Quanto custa?', 'Como funciona?', 'Preciso de logo?']);
        }, 800);
      }
      
      setTimeout(() => inputEl.focus(), 400);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function closeChat() {
      isOpen = false;
      win.classList.remove('cs-open');
      bubble.classList.remove('cs-open');
    }

    bubble.addEventListener('click', openChat);
    tooltip.addEventListener('click', openChat);
    tooltip.querySelector('.cs-tooltip-close').addEventListener('click', (e) => {
      e.stopPropagation();
      tooltip.classList.remove('cs-show');
    });
    closeBtn.addEventListener('click', closeChat);

    // ─── Messages ───
    function addMessage(text, type, save = true) {
      const msg = document.createElement('div');
      msg.className = `cs-msg cs-msg-${type}`;
      msg.textContent = text;
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      if (save) {
        // Save to sessionStorage
        const history = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]');
        history.push({ text, type });
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.className = 'cs-typing';
      typing.id = 'csTypingIndicator';
      typing.innerHTML = '<span class="cs-typing-dot"></span><span class="cs-typing-dot"></span><span class="cs-typing-dot"></span>';
      messagesEl.appendChild(typing);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
      const el = document.getElementById('csTypingIndicator');
      if (el) el.remove();
    }

    function showQuickReplies(options) {
      quickRepliesEl.innerHTML = '';
      options.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'cs-quick-btn';
        btn.textContent = text;
        btn.addEventListener('click', () => {
          quickRepliesEl.innerHTML = '';
          sendMessage(text);
        });
        quickRepliesEl.appendChild(btn);
      });
    }

    // ─── Send Message ───
    async function sendMessage(text) {
      if (!text.trim() || isSending) return;
      
      isSending = true;
      sendBtn.disabled = true;
      inputEl.value = '';
      quickRepliesEl.innerHTML = '';
      
      addMessage(text, 'user');
      showTyping();

      try {
        const response = await fetch(CHAT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId,
            message: text
          })
        });

        hideTyping();

        if (response.ok) {
          const data = await response.json();
          addMessage(data.reply, 'bot');
          
          // Rastrear mensagem de chat no Telegram server-side
          if (typeof window.sendEvent === 'function') {
            window.sendEvent('chat_message');
          }

          // Se lead completo, exibe o botão do WhatsApp e grava no localStorage
          if (data.leadData && data.leadData.name && data.leadData.whatsapp) {
            localStorage.setItem('cs_lead_qualified', 'true');
            showWhatsAppButton();
          }
        } else {
          addMessage('Desculpa, tive um probleminha aqui. Pode tentar de novo? 😅', 'bot');
        }
      } catch (error) {
        hideTyping();
        addMessage('Ops, parece que a conexão caiu. Tenta de novo? 😊', 'bot');
      }

      isSending = false;
      sendBtn.disabled = false;
      inputEl.focus();
    }

    function showWhatsAppButton() {
      // Evita duplicar o botão se ele já existe nas mensagens
      const existingBtn = document.getElementById('csWhatsAppDirectBtn');
      if (existingBtn) return;

      const waBtn = document.createElement('div');
      waBtn.className = 'cs-msg cs-msg-bot';
      waBtn.id = 'csWhatsAppDirectBtn';
      waBtn.style.cssText = 'background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3); cursor: pointer; color: #22C55E; font-weight: bold; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;';
      waBtn.innerHTML = `
        <img src="/whatsapp-icon.png" alt="WhatsApp" style="width: 20px; height: 20px; object-fit: contain;" />
        <span>Falar com Especialista no WhatsApp</span>
      `;
      
      waBtn.addEventListener('click', () => {
        if (typeof window.handleCTAClick === 'function') {
           window.handleCTAClick('Chat Sofia Redirect');
        }
        window.open('https://wa.me/5521981477503?text=Oi!%20Falei%20com%20a%20Sofia%20no%20site%20e%20quero%20meu%20site%20R%24%20497!%20%F0%9F%91%8B', '_blank');
      });
      
      messagesEl.appendChild(waBtn);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      // Salva o clique do botão no histórico de mensagens do sessionStorage
      const history = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]');
      if (!history.some(h => h.text.includes('Falar com Especialista'))) {
         history.push({ text: '💬 [Botão de Redirecionamento para o WhatsApp]', type: 'bot' });
         sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
    }

    // ─── Input handlers ───
    sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage(inputEl.value);
    });

    // ─── Proactive tooltip after 8s ───
    setTimeout(() => {
      if (!isOpen) {
        // Apenas mostra o tooltip se o usuário não abriu o chat e não qualificou o lead
        if (localStorage.getItem('cs_lead_qualified') !== 'true') {
           tooltip.classList.add('cs-show');
           // Auto-hide after 12s
           setTimeout(() => {
             if (!isOpen) tooltip.classList.remove('cs-show');
           }, 12000);
        }
      }
    }, 8000);

    // Track chat widget loaded/ready
    if (typeof window.sendEvent === 'function') {
      window.sendEvent('chat_widget_loaded');
    }
  }

  // ─── Init when DOM ready ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }

})();
