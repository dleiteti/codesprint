module.exports=[89578,a=>{a.v({className:"geist_a71539c9-module__T19VSG__className",variable:"geist_a71539c9-module__T19VSG__variable"})},35214,a=>{a.v({className:"geist_mono_8d43a2aa-module__8Li5zG__className",variable:"geist_mono_8d43a2aa-module__8Li5zG__variable"})},27572,a=>{"use strict";var b=a.i(7997),c=a.i(89578);let d={className:c.default.className,style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"}};null!=c.default.variable&&(d.variable=c.default.variable);var e=a.i(35214);let f={className:e.default.className,style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"}};null!=e.default.variable&&(f.variable=e.default.variable);let g={metadataBase:new URL("https://codesprint.com.br"),title:"CodeSprint | Sites, Apps e Sistemas Personalizados",description:"Transforme suas ideias em realidade digital mais rápido do que você imagina. Desenvolvemos sites, aplicativos e sistemas personalizados em tempo recorde.",keywords:["desenvolvimento web","criação de sites","aplicativos","sistemas personalizados","software","startup","tecnologia","landing page"],authors:[{name:"CodeSprint"}],creator:"CodeSprint",publisher:"CodeSprint",robots:"index, follow",openGraph:{type:"website",locale:"pt_BR",url:"https://codesprint.com.br",siteName:"CodeSprint",title:"CodeSprint | Sites, Apps e Sistemas Personalizados",description:"Transforme suas ideias em realidade digital mais rápido do que você imagina. Desenvolvemos sites, aplicativos e sistemas personalizados.",images:[{url:"/og-image.png",width:1200,height:630,alt:"CodeSprint - Desenvolvimento de Software"}]},twitter:{card:"summary_large_image",title:"CodeSprint | Sites, Apps e Sistemas Personalizados",description:"Transforme suas ideias em realidade digital mais rápido do que você imagina.",images:["/og-image.png"]},icons:{icon:"/favicon.png",shortcut:"/favicon.png",apple:"/favicon.png"}};function h({children:a}){return(0,b.jsxs)("html",{lang:"pt-BR",suppressHydrationWarning:!0,children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("script",{async:!0,src:"https://www.googletagmanager.com/gtag/js?id=G-C98EFJG709"}),(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C98EFJG709');
            `}}),(0,b.jsx)("script",{type:"text/javascript",dangerouslySetInnerHTML:{__html:`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v144xksgk2");
            `}}),(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1683199166335451');
              fbq('track', 'PageView');
              
              // Enhanced tracking - identify which pricing card was clicked
              function setupConversionTracking() {
                document.addEventListener('click', function(e) {
                  var link = e.target.closest('a[href*="wa.me"]');
                  if (link) {
                    var href = link.getAttribute('href');
                    var cardType = '';
                    var value = 0;
                    var currency = 'BRL';
                    
                    // Identify which card based on message content
                    if (href.includes('LP%20Express') || href.includes('LP Express')) {
                      cardType = 'Express';
                      value = 797.00;
                    } else if (href.includes('Site%20Business') || href.includes('Business')) {
                      cardType = 'Business';
                      value = 1497.00;
                    } else if (href.includes('customizado') || href.includes('Custom')) {
                      cardType = 'Custom';
                      value = 3997.00;
                    }
                    
                    // Single Lead event only
                    fbq('track', 'Lead', {
                      content_name: cardType,
                      value: value,
                      currency: 'BRL'
                    });
                    
                    // Google Analytics event
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'whatsapp_click', {
                        'event_category': 'engagement',
                        'event_label': cardType || 'Generic WhatsApp',
                        'value': value
                      });
                    }
                  }
                });
              }
              
              // Wait for DOM to be ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupConversionTracking);
              } else {
                setupConversionTracking();
              }
            `}}),(0,b.jsx)("noscript",{children:(0,b.jsx)("img",{height:"1",width:"1",style:{display:"none"},src:"https://www.facebook.com/tr?id=1683199166335451&ev=PageView&noscript=1"})})]}),(0,b.jsx)("body",{className:`${d.variable} ${f.variable} antialiased`,children:a})]})}a.s(["default",()=>h,"metadata",0,g],27572)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__11fa4345._.js.map