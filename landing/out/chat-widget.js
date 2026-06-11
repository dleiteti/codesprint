/* ═══════════════════════════════════════════
   CODESPRINT — Chat Widget v3
   Atendente virtual "Sofia" para a LP
   Self-contained: CSS + HTML + JS
   v3: Foco em maximizar taxa de abertura e integração com telemetria
   ═══════════════════════════════════════════ */

(function() {
  'use strict';

  const CHAT_API = '/chat';
  const SESSION_KEY = 'codesprint_chat_sid';
  const HISTORY_KEY = 'codesprint_chat_history';
  const QR_KEY = 'codesprint_chat_qr';
  const SOFIA_AVATAR = '/sofia-avatar.png';
  const APP_ID = 'codesprint';

  // Mensagens proativas dinâmicas da Sofia
  const PROACTIVE_MESSAGES = [
    '👋 Precisa de um site profissional ou aplicativo sob medida? Fala comigo!',
    '💻 Desenvolvemos seu sistema em tempo recorde. Quer saber mais?',
    '🚀 Solicite um orçamento gratuito para o seu projeto de software!',
    '📊 Quer automatizar processos da sua empresa? Me chama!'
  ];

  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 'cs_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  }

  // Helper para registrar eventos no tracker
  function trackEvent(name, data = {}) {
    if (window.sparkTracker && typeof window.sparkTracker.push === 'function') {
      window.sparkTracker.push(name, data);
    } else if (typeof window.sendEvent === 'function') {
      window.sendEvent(name, data);
    }
  }

  // ─── Inject CSS ───
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ══════ CHAT BUBBLE — Estilo Premium CodeSprint (Ciano) ══════ */
      .cs-chat-bubble {
        position: fixed;
        bottom: 20px;
        right: 16px;
        border-radius: 60px;
        background: linear-gradient(135deg, #111F38 0%, #162847 100%);
        border: 1.5px solid rgba(6,182,212,0.25);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 20px 10px 10px;
        box-shadow: 0 6px 32px rgba(0,0,0,0.45);
        z-index: 10000;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 1;
        transform: translateY(0);
        font-family: 'Inter', -apple-system, sans-serif;
        -webkit-tap-highlight-color: transparent;
      }

      .cs-chat-bubble:active {
        transform: scale(0.96) !important;
      }

      .cs-chat-bubble:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 36px rgba(0,0,0,0.5), 0 0 20px rgba(6,182,212,0.15);
        border-color: rgba(6,182,212,0.4);
      }

      .cs-chat-bubble.cs-open {
        transform: translateY(16px) !important;
        opacity: 0 !important;
        pointer-events: none;
      }

      /* Bounce de atenção */
      @keyframes cs-attention-bounce {
        0%, 100% { transform: translateY(0); }
        15% { transform: translateY(-8px); }
        30% { transform: translateY(0); }
        45% { transform: translateY(-4px); }
        60% { transform: translateY(0); }
      }
      .cs-chat-bubble.cs-attention {
        animation: cs-attention-bounce 0.8s cubic-bezier(0.36, 0, 0.66, -0.56);
      }

      .cs-bubble-avatar-wrap {
        position: relative;
        flex-shrink: 0;
      }

      .cs-bubble-avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        border: 2.5px solid rgba(6,182,212,0.5);
        box-shadow: 0 0 12px rgba(6,182,212,0.2);
      }

      /* Anel pulsante */
      .cs-bubble-avatar-wrap::after {
        content: '';
        position: absolute;
        top: -4px; left: -4px; right: -4px; bottom: -4px;
        border-radius: 50%;
        border: 2px solid rgba(6,182,212,0.4);
        animation: cs-ring-pulse 2s ease-in-out infinite;
      }
      @keyframes cs-ring-pulse {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.12); opacity: 0; }
      }

      /* Notification Badge */
      .cs-notification-badge {
        position: absolute;
        top: -5px;
        left: -5px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: #EF4444;
        color: #fff;
        font-size: 13px;
        font-weight: 800;
        display: none;
        align-items: center;
        justify-content: center;
        border: 2.5px solid #111F38;
        animation: cs-badge-pulse 1.2s ease-in-out infinite;
        z-index: 2;
        line-height: 1;
        box-shadow: 0 2px 8px rgba(239,68,68,0.4);
      }

      .cs-notification-badge.cs-show {
        display: flex;
      }

      @keyframes cs-badge-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); }
      }

      .cs-bubble-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .cs-bubble-name {
        color: #F0F4FA;
        font-weight: 700;
        font-size: 16px;
        line-height: 1.3;
        white-space: nowrap;
      }

      .cs-bubble-status {
        color: #22C55E;
        font-size: 12px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 5px;
        line-height: 1.2;
      }

      .cs-bubble-status::before {
        content: '';
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #22C55E;
        display: inline-block;
        animation: cs-pulse-dot 2s ease-in-out infinite;
        box-shadow: 0 0 6px rgba(34,197,94,0.5);
      }

      @keyframes cs-pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }

      /* ══════ PROACTIVE BALLOON ══════ */
      .cs-proactive-balloon {
        position: fixed;
        bottom: 100px;
        right: 16px;
        max-width: 300px;
        z-index: 10000;
        opacity: 0;
        transform: translateY(10px) scale(0.95);
        transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
        font-family: 'Inter', -apple-system, sans-serif;
        filter: drop-shadow(0 6px 20px rgba(0,0,0,0.4));
        -webkit-tap-highlight-color: transparent;
      }

      .cs-proactive-balloon.cs-show {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
        cursor: pointer;
      }

      .cs-balloon-body {
        background: #162847;
        border: 1px solid rgba(6,182,212,0.25);
        border-radius: 16px 16px 4px 16px;
        padding: 14px 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        position: relative;
      }

      .cs-balloon-avatar {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        border: 2px solid rgba(6,182,212,0.4);
      }

      .cs-balloon-content {
        flex: 1;
        min-width: 0;
      }

      .cs-balloon-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
      }

      .cs-balloon-name {
        font-size: 13px;
        font-weight: 700;
        color: #F0F4FA;
      }

      .cs-balloon-time {
        font-size: 11px;
        color: #506688;
      }

      .cs-balloon-text {
        font-size: 14px;
        color: #c8d6e5;
        line-height: 1.45;
        font-weight: 400;
      }

      .cs-balloon-close {
        position: absolute;
        top: 6px;
        right: 8px;
        background: rgba(255,255,255,0.05);
        border: none;
        color: #506688;
        cursor: pointer;
        font-size: 16px;
        line-height: 1;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .cs-balloon-close:hover {
        background: rgba(255,255,255,0.1);
        color: #F0F4FA;
      }

      .cs-balloon-arrow {
        width: 0; height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #162847;
        position: absolute;
        bottom: -8px;
        right: 36px;
      }

      .cs-proactive-balloon.cs-show .cs-balloon-body {
        animation: cs-balloon-glow 2s ease-in-out 1;
      }
      @keyframes cs-balloon-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0); }
        50% { box-shadow: 0 0 20px 4px rgba(6,182,212,0.15); }
      }

      /* ══════ CHAT WINDOW ══════ */
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

      .cs-chat-header {
        padding: 16px 20px;
        background: linear-gradient(135deg, #111F38, #162847);
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0;
      }

      .cs-chat-back {
        display: none;
        background: none;
        border: none;
        color: #8BA3C7;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        transition: all 0.2s;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-right: 4px;
      }

      .cs-chat-back:hover {
        background: rgba(255,255,255,0.05);
        color: #F0F4FA;
      }

      .cs-chat-avatar {
        width: 42px;
        height: 42px;
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

      /* Adaptações Mobile */
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
          right: 10px;
          padding: 8px 16px 8px 8px;
        }

        .cs-bubble-avatar {
          width: 56px;
          height: 56px;
        }

        .cs-bubble-name {
          font-size: 15px;
        }

        .cs-proactive-balloon {
          bottom: 88px;
          right: 10px;
          left: 10px;
          max-width: none;
        }

        .cs-balloon-arrow {
          right: 30px;
        }

        .cs-chat-back {
          display: flex;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ─── Notification Sound ───
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch(e) {}
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(function(){});
    }
  }

  function playNotificationSound() {
    if (!audioCtx || audioCtx.state !== 'running') return;
    try {
      const now = audioCtx.currentTime;
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.value = 1318;
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.value = 1760;
      gain2.gain.setValueAtTime(0.06, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.35);
    } catch(e) {}
  }

  // ─── Build DOM ───
  function buildWidget() {
    const bubble = document.createElement('button');
    bubble.className = 'cs-chat-bubble';
    bubble.id = 'csChatBubble';
    bubble.innerHTML = `
      <div class="cs-bubble-avatar-wrap">
        <img class="cs-bubble-avatar" src="${SOFIA_AVATAR}" alt="Sofia" />
        <div class="cs-notification-badge" id="csNotificationBadge">1</div>
      </div>
      <div class="cs-bubble-info">
        <span class="cs-bubble-name">Sofia \u00b7 Atendente</span>
        <span class="cs-bubble-status">Online agora</span>
      </div>
    `;

    const balloon = document.createElement('div');
    balloon.className = 'cs-proactive-balloon';
    balloon.id = 'csProactiveBalloon';
    balloon.innerHTML = `
      <div class="cs-balloon-body">
        <img class="cs-balloon-avatar" src="${SOFIA_AVATAR}" alt="Sofia" />
        <div class="cs-balloon-content">
          <div class="cs-balloon-header">
            <span class="cs-balloon-name">Sofia</span>
            <span class="cs-balloon-time">agora</span>
          </div>
          <div class="cs-balloon-text" id="csBalloonText"></div>
        </div>
        <button class="cs-balloon-close" aria-label="Fechar">&times;</button>
        <div class="cs-balloon-arrow"></div>
      </div>
    `;

    const win = document.createElement('div');
    win.className = 'cs-chat-window';
    win.id = 'csChatWindow';
    win.innerHTML = `
      <div class="cs-chat-header">
        <button class="cs-chat-back" id="csChatBack" aria-label="Voltar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
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
    document.body.appendChild(balloon);
    document.body.appendChild(win);

    return { bubble, balloon, win };
  }

  // ─── Chat Logic ───
  function initChat() {
    injectStyles();
    const { bubble, balloon, win } = buildWidget();

    const messagesEl = document.getElementById('csChatMessages');
    const inputEl = document.getElementById('csChatInput');
    const sendBtn = document.getElementById('csChatSend');
    const closeBtn = document.getElementById('csChatClose');
    const backBtn = document.getElementById('csChatBack');
    const quickRepliesEl = document.getElementById('csQuickReplies');
    const badgeEl = document.getElementById('csNotificationBadge');
    const balloonText = document.getElementById('csBalloonText');

    let isOpen = false;
    let isFirstOpen = true;
    let isSending = false;
    let balloonDismissed = false;
    let proactiveInterval = null;
    let proactiveIndex = 0;
    const sessionId = getSessionId();

    // Restaurar histórico do sessionStorage
    const savedHistory = sessionStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      try {
        const msgs = JSON.parse(savedHistory);
        msgs.forEach(m => addMessage(m.text, m.type, false));
        isFirstOpen = false;
      } catch(e) {}
    }

    // Restaurar Quick Replies
    if (!isFirstOpen) {
      const savedQR = sessionStorage.getItem(QR_KEY);
      if (savedQR) {
        try {
          const qrOptions = JSON.parse(savedQR);
          if (qrOptions.length > 0) showQuickReplies(qrOptions, false);
        } catch(e) {}
      }
    }

    // Se lead completo qualificado, exibe o botão do WhatsApp
    if (localStorage.getItem('cs_lead_qualified') === 'true') {
      showWhatsAppButton();
    }

    // Balloon proativo
    function showBalloon(text) {
      if (isOpen || balloonDismissed) return;
      balloonText.textContent = text;
      balloon.classList.add('cs-show');
      badgeEl.classList.add('cs-show');
      trackEvent('cta_float_shown', { text });
    }

    function hideBalloon() {
      balloon.classList.remove('cs-show');
      if (badgeEl) badgeEl.classList.remove('cs-show');
      bubble.classList.remove('cs-attention');
    }

    function startProactiveLoop() {
      setTimeout(() => {
        if (!isOpen) {
          showBalloon(PROACTIVE_MESSAGES[0]);
          proactiveIndex = 1;
        }
      }, 3000);

      proactiveInterval = setInterval(() => {
        if (isOpen || balloonDismissed) {
          clearInterval(proactiveInterval);
          return;
        }
        hideBalloon();
        setTimeout(() => {
          if (!isOpen && !balloonDismissed) {
            showBalloon(PROACTIVE_MESSAGES[proactiveIndex % PROACTIVE_MESSAGES.length]);
            proactiveIndex++;
          }
        }, 800);
      }, 18000);

      setInterval(() => {
        if (!isOpen && !balloonDismissed) {
          bubble.classList.remove('cs-attention');
          void bubble.offsetWidth;
          bubble.classList.add('cs-attention');
        }
      }, 8000);
    }

    // Open/Close
    function openChat() {
      isOpen = true;
      win.classList.add('cs-open');
      bubble.classList.add('cs-open');
      hideBalloon();
      balloonDismissed = true;
      if (proactiveInterval) clearInterval(proactiveInterval);

      if (badgeEl) badgeEl.classList.remove('cs-show');
      initAudioContext();
      trackEvent('chat_opened');

      if (isFirstOpen) {
        isFirstOpen = false;
        inputEl.disabled = true;
        sendBtn.disabled = true;

        showTyping();
        setTimeout(() => {
          hideTyping();
          addMessage('Oi! 👋 Tudo bem?', 'bot');
          playNotificationSound();

          setTimeout(() => {
            showTyping();
            setTimeout(() => {
              hideTyping();
              addMessage('Sou a Sophia da CodeSprint. Desenvolvemos aplicativos móveis, plataformas web e sistemas internos robustos de forma extremamente ágil.', 'bot');
              playNotificationSound();

              setTimeout(() => {
                showTyping();
                setTimeout(() => {
                  hideTyping();
                  addMessage('Você já tem um projeto em mente ou gostaria de entender como podemos automatizar o seu negócio?', 'bot');
                  playNotificationSound();
                  showQuickReplies(['Tenho uma ideia! 🚀', 'Como funciona?', 'Quero um orçamento']);
                  inputEl.disabled = false;
                  sendBtn.disabled = false;
                  if (window.innerWidth > 480) {
                    inputEl.focus();
                  }
                }, 1200);
              }, 500);
            }, 1500);
          }, 600);
        }, 1000);
      } else {
        if (window.innerWidth > 480) {
          setTimeout(() => inputEl.focus(), 400);
        }
      }
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function closeChat() {
      isOpen = false;
      win.classList.remove('cs-open');
      bubble.classList.remove('cs-open');
    }

    bubble.addEventListener('click', openChat);
    balloon.addEventListener('click', (e) => {
      if (e.target.closest('.cs-balloon-close')) {
        e.stopPropagation();
        hideBalloon();
        balloonDismissed = true;
        return;
      }
      openChat();
    });
    closeBtn.addEventListener('click', closeChat);
    backBtn.addEventListener('click', closeChat);

    // Messages
    function addMessage(text, type, save = true) {
      const msg = document.createElement('div');
      msg.className = `cs-msg cs-msg-${type}`;
      msg.textContent = text;
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      if (save) {
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

    function showQuickReplies(options, save = true) {
      quickRepliesEl.innerHTML = '';
      options.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'cs-quick-btn';
        btn.textContent = text;
        btn.addEventListener('click', () => {
          quickRepliesEl.innerHTML = '';
          sessionStorage.removeItem(QR_KEY);
          sendMessage(text);
        });
        quickRepliesEl.appendChild(btn);
      });
      if (save) {
        sessionStorage.setItem(QR_KEY, JSON.stringify(options));
      }
    }

    // Send Message
    async function sendMessage(text) {
      if (!text.trim() || isSending) return;

      isSending = true;
      sendBtn.disabled = true;
      inputEl.disabled = true;
      inputEl.value = '';
      quickRepliesEl.innerHTML = '';
      sessionStorage.removeItem(QR_KEY);

      addMessage(text, 'user');
      showTyping();

      try {
        const response = await fetch(CHAT_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId,
            message: text,
            appId: APP_ID
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.reply;
          const typingDelay = Math.min(Math.max(replyText.length * 15, 1200), 3500);

          setTimeout(() => {
            hideTyping();
            addMessage(replyText, 'bot');
            playNotificationSound();

            trackEvent('chat_message');

            if (data.leadData && data.leadData.name && data.leadData.whatsapp) {
              localStorage.setItem('cs_lead_qualified', 'true');
              showWhatsAppButton();
            }

            isSending = false;
            sendBtn.disabled = false;
            inputEl.disabled = false;
            if (window.innerWidth > 480) {
              inputEl.focus();
            }
          }, typingDelay);
        } else {
          hideTyping();
          addMessage('Desculpa, tive um probleminha aqui. Pode tentar de novo? 😅', 'bot');
          isSending = false;
          sendBtn.disabled = false;
          inputEl.disabled = false;
          if (window.innerWidth > 480) {
            inputEl.focus();
          }
        }
      } catch (error) {
        hideTyping();
        addMessage('Ops, parece que a conexão caiu. Tenta de novo? 😊', 'bot');
        isSending = false;
        sendBtn.disabled = false;
        inputEl.disabled = false;
        if (window.innerWidth > 480) {
          inputEl.focus();
        }
      }
    }

    function showWhatsAppButton() {
      const existingBtn = document.getElementById('csWhatsAppDirectBtn');
      if (existingBtn) return;

      const waBtn = document.createElement('div');
      waBtn.className = 'cs-msg cs-msg-bot';
      waBtn.id = 'csWhatsAppDirectBtn';
      waBtn.style.cssText = 'background: rgba(37, 211, 102, 0.1); border: 1px solid rgba(37, 211, 102, 0.3); cursor: pointer; color: #22C55E; font-weight: bold; margin-top: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;';
      waBtn.innerHTML = '<img src="/whatsapp-icon.png" alt="WhatsApp" style="width: 20px; height: 20px; object-fit: contain;" /><span>Falar com Especialista no WhatsApp</span>';

      waBtn.addEventListener('click', () => {
        trackEvent('cta_click', { role: 'cta', element: 'Chat Sofia Redirect' });
        window.open('https://wa.me/5521981477503?text=Oi!%20Falei%20com%20a%20Sofia%20no%20site%20e%20quero%20um%20or%C3%A7amento%20de%20projeto!', '_blank');
      });

      messagesEl.appendChild(waBtn);
      messagesEl.scrollTop = messagesEl.scrollHeight;

      const history = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]');
      if (!history.some(h => h.text.includes('Falar com Especialista'))) {
        history.push({ text: '💬 [Botão de Redirecionamento para o WhatsApp]', type: 'bot' });
        sessionStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
    }

    // Input handlers
    sendBtn.addEventListener('click', () => sendMessage(inputEl.value));
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage(inputEl.value);
    });

    // Restaurar estado do balão
    if (localStorage.getItem('cs_lead_qualified') !== 'true') {
      startProactiveLoop();
    }
    
    trackEvent('chat_widget_loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChat);
  } else {
    initChat();
  }
})();
