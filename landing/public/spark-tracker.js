/**
 * Spark Ads LP Intelligence Tracker
 * Telemetria comportamental leve e inteligente (sem gravações de vídeo ou heatmaps).
 */
(function() {
  // 1. Identificação do App e Configurações
  const trackerScript = document.currentScript;
  const APP_ID = trackerScript ? (trackerScript.getAttribute('data-app') || 'sparkads') : 'sparkads';
  const ENDPOINT = '/events';
  const FLUSH_INTERVAL = 5000; // 5 segundos
  
  // Fila local de eventos
  let eventQueue = [];
  let currentScrollMax = 0;
  let tabHiddenAt = null;
  
  // 2. Utilitários de Identificação (LGPD-compliant / First-Party)
  const VISITOR_ID_KEY = 'spark_vid';
  const SESSION_ID_KEY = 'spark_sid';
  
  function getVisitorId() {
    let vid = localStorage.getItem(VISITOR_ID_KEY);
    if (!vid) {
      vid = 'v_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
      localStorage.setItem(VISITOR_ID_KEY, vid);
    }
    return vid;
  }
  
  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_ID_KEY);
    if (!sid) {
      sid = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
      sessionStorage.setItem(SESSION_ID_KEY, sid);
    }
    return sid;
  }
  
  // 3. Envio de Eventos (Push & Flush)
  function pushEvent(event, data = {}) {
    eventQueue.push({
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      event: event,
      data: data,
      timestamp: new Date().toISOString()
    });
  }
  
  function flushEvents() {
    if (eventQueue.length === 0) return;
    
    const payload = JSON.stringify({
      app_id: APP_ID,
      events: eventQueue
    });
    
    // Esvazia fila imediatamente para evitar reenvio por concorrência
    eventQueue = [];
    
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, payload);
    } else {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(err => console.warn('Tracker send error:', err));
    }
  }
  
  // Configura o timer de flush e eventos de saída da página
  setInterval(flushEvents, FLUSH_INTERVAL);
  window.addEventListener('beforeunload', flushEvents);
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushEvents();
    }
  });

  // 4. Detecção de Metadados de Sessão Inicial
  function detectDevice() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
    return 'desktop';
  }
  
  function getTrafficSource() {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    
    // UTMs
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');
    const utmContent = urlParams.get('utm_content');
    
    if (urlParams.has('fbclid') || (utmSource && /facebook|instagram|meta|ig/i.test(utmSource))) {
      return { source: 'Meta Ads', campaign: utmCampaign, content: utmContent };
    }
    if (urlParams.has('gclid') || (utmSource && /google|gads/i.test(utmSource))) {
      return { source: 'Google Ads', campaign: utmCampaign, content: utmContent };
    }
    
    if (referrer) {
      if (/facebook\.com|instagram\.com/i.test(referrer)) return { source: 'Social (Meta)', campaign: utmCampaign, content: utmContent };
      if (/google\.com/i.test(referrer)) return { source: 'Google Orgânico', campaign: utmCampaign, content: utmContent };
      return { source: 'Referral', campaign: utmCampaign, content: utmContent };
    }
    
    return { source: 'Orgânico/Direto', campaign: utmCampaign, content: utmContent };
  }

  // Envia evento de início de sessão
  const traffic = getTrafficSource();
  pushEvent('session_start', {
    device: detectDevice(),
    source: traffic.source,
    campaign: traffic.campaign,
    content: traffic.content,
    referrer: document.referrer || null,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight
  });

  // 5. Mapeamento e Visibilidade de Seções (IntersectionObserver)
  const sectionTimers = {};
  const observerOptions = {
    threshold: [0, 0.25, 0.5, 0.75, 1.0]
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Usa ID ou tag para identificar a seção
      const sectionId = entry.target.id || entry.target.getAttribute('data-section') || entry.target.tagName.toLowerCase();
      
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        if (!sectionTimers[sectionId]) {
          sectionTimers[sectionId] = { start: Date.now(), max_ratio: entry.intersectionRatio };
        } else {
          sectionTimers[sectionId].max_ratio = Math.max(sectionTimers[sectionId].max_ratio, entry.intersectionRatio);
        }
      } else if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
        if (sectionTimers[sectionId]) {
          const duration = Date.now() - sectionTimers[sectionId].start;
          if (duration > 500) { // Registra apenas se ficou visível > 0.5s
            pushEvent('section_view', {
              section: sectionId,
              duration_ms: duration,
              max_ratio: sectionTimers[sectionId].max_ratio
            });
          }
          delete sectionTimers[sectionId];
        }
      }
    });
  }, observerOptions);
  
  // Inicializa a observação das seções lógicas da LP
  document.addEventListener('DOMContentLoaded', () => {
    // Procura elementos comuns de seções
    const targets = document.querySelectorAll('section, header, footer, [data-section], #hero, #features, #faq, #pricing, #testimonials, #contact');
    const observedSet = new Set();
    
    targets.forEach(el => {
      const id = el.id || el.getAttribute('data-section') || el.tagName.toLowerCase();
      if (!observedSet.has(id)) {
        sectionObserver.observe(el);
        observedSet.add(id);
      }
    });
  });

  // 6. Interações: Cliques, Rage Clicks e Dead Clicks
  let clickHistory = [];
  
  function getElementRole(el) {
    if (el.closest('[data-cta]') || el.closest('.btn') || el.closest('.button')) return 'cta';
    if (el.closest('form')) return 'form';
    if (el.closest('.faq') || el.closest('.faq-item')) return 'faq';
    if (el.closest('.pricing') || el.closest('.pricing-card')) return 'pricing';
    if (el.closest('.testimonial') || el.closest('.testimonials')) return 'testimonial';
    if (el.tagName.toLowerCase() === 'a') return 'link';
    if (el.tagName.toLowerCase() === 'button') return 'button';
    return 'other';
  }
  
  function getElementIdentifier(el) {
    const ctaAttr = el.closest('[data-cta]');
    if (ctaAttr) return ctaAttr.getAttribute('data-cta') || ctaAttr.innerText || 'cta';
    const text = el.innerText ? el.innerText.trim().substring(0, 30) : '';
    const id = el.id ? '#' + el.id : '';
    const classes = el.className ? '.' + el.className.split(' ').join('.') : '';
    return `${el.tagName.toLowerCase()}${id}${classes} (${text})`;
  }

  document.addEventListener('click', (e) => {
    const now = Date.now();
    const targetEl = e.target;
    
    // Registra clique no histórico local para rage clicks
    clickHistory.push({ x: e.clientX, y: e.clientY, time: now });
    // Limpa histórico antigo (>1.5s)
    clickHistory = clickHistory.filter(c => now - c.time < 1500);
    
    // Detecção de Rage Click: 3+ cliques em uma área de 30px em <1.5s
    const nearbyClicks = clickHistory.filter(c => 
      Math.abs(c.x - e.clientX) < 30 && Math.abs(c.y - e.clientY) < 30
    );
    
    if (nearbyClicks.length >= 3) {
      pushEvent('rage_click', {
        element: getElementIdentifier(targetEl),
        role: getElementRole(targetEl)
      });
      // Limpa para não disparar rage clicks subsequentes
      clickHistory = [];
      return;
    }
    
    // Detecção de Clique Normal e Dead Click
    const role = getElementRole(targetEl);
    const identifier = getElementIdentifier(targetEl);
    
    const isInteractive = targetEl.closest('a, button, input, select, textarea, label, [onclick], [data-cta], .sa-chat-bubble, .faq-trigger, .accordion-header');
    
    if (isInteractive) {
      pushEvent('click', {
        element: identifier,
        role: role,
        text: targetEl.innerText ? targetEl.innerText.trim().substring(0, 40) : null
      });
    } else {
      // Dead click: clique em local estático/texto
      pushEvent('dead_click', {
        element_tag: targetEl.tagName.toLowerCase(),
        x_pct: (e.clientX / window.innerWidth * 100).toFixed(1),
        y_pct: (e.clientY / window.innerHeight * 100).toFixed(1)
      });
    }
  });

  // 7. Hovers em Elementos Críticos (>1s)
  let hoverTimeout = null;
  let currentHoverEl = null;
  let hoverStart = 0;
  
  document.addEventListener('mouseover', (e) => {
    const targetEl = e.target.closest('[data-cta], .btn, .pricing-card, .faq-item');
    if (!targetEl) return;
    
    if (currentHoverEl !== targetEl) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      currentHoverEl = targetEl;
      hoverStart = Date.now();
      
      hoverTimeout = setTimeout(() => {
        pushEvent('hover', {
          element: getElementIdentifier(targetEl),
          role: getElementRole(targetEl)
        });
      }, 1000); // 1 segundo parado sobre o elemento
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (currentHoverEl && !currentHoverEl.contains(e.relatedTarget)) {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      currentHoverEl = null;
    }
  });

  // 8. Scroll Depth & Exit Intent
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (docHeight <= 0) return;
    
    const pct = Math.round((scrollTop / docHeight) * 100);
    
    // Scroll Depth por breakpoints (10%, 25%, 50%, 75%, 90%, 100%)
    const breakpoints = [10, 25, 50, 75, 90, 100];
    for (let bp of breakpoints) {
      if (pct >= bp && currentScrollMax < bp) {
        currentScrollMax = bp;
        pushEvent('scroll_depth', { depth_pct: bp });
      }
    }
    
    // Detecção de Scroll Reverso (Leitura anterior)
    if (scrollTop < lastScrollTop - 150) { // Subiu mais de 150px
      pushEvent('scroll_reverse', {
        from_pct: Math.round((lastScrollTop / docHeight) * 100),
        to_pct: pct
      });
      lastScrollTop = scrollTop; // Reset
    } else if (scrollTop > lastScrollTop) {
      lastScrollTop = scrollTop;
    }
  }, { passive: true });

  // Exit Intent (Desktop): Mouse saindo do topo da tela
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 10) {
      pushEvent('exit_intent', {
        method: 'mouse_leave',
        scroll_depth: currentScrollMax
      });
      flushEvents();
    }
  });

  // 9. Visibility e Tab Switch
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      tabHiddenAt = Date.now();
      pushEvent('tab_hidden');
    } else if (tabHiddenAt) {
      const awayDuration = Date.now() - tabHiddenAt;
      pushEvent('tab_visible', { away_duration_ms: awayDuration });
      tabHiddenAt = null;
    }
  });

  // 10. Lógica de Campos de Formulário
  let formFieldTimers = {};
  
  document.addEventListener('focusin', (e) => {
    const el = e.target;
    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea' || el.tagName.toLowerCase() === 'select') {
      const fieldName = el.name || el.id || 'field';
      formFieldTimers[fieldName] = Date.now();
      pushEvent('form_focus', { field: fieldName });
    }
  });
  
  document.addEventListener('focusout', (e) => {
    const el = e.target;
    if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea' || el.tagName.toLowerCase() === 'select') {
      const fieldName = el.name || el.id || 'field';
      if (formFieldTimers[fieldName]) {
        const duration = Date.now() - formFieldTimers[fieldName];
        pushEvent('form_blur', {
          field: fieldName,
          duration_ms: duration,
          has_value: !!el.value
        });
        delete formFieldTimers[fieldName];
      }
    }
  });

  // Exposição da API pública para integração com outros componentes (ex: chat)
  window.sparkTracker = {
    push: pushEvent
  };
})();
