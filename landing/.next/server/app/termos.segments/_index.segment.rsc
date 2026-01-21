1:"$Sreact.fragment"
6:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"default"]
7:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"default"]
:HL["/_next/static/chunks/0781b9f2d2497af0.css","style"]
2:Ta85,
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
            0:{"buildId":"4ZKPyb4bC0rfkEVsDJnDl","rsc":["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/0781b9f2d2497af0.css","precedence":"next"}]],["$","html",null,{"lang":"pt-BR","suppressHydrationWarning":true,"children":[["$","head",null,{"children":[["$","script",null,{"async":true,"src":"https://www.googletagmanager.com/gtag/js?id=G-C98EFJG709"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              gtag('js', new Date());\n              gtag('config', 'G-C98EFJG709');\n            "}}],["$","script",null,{"type":"text/javascript","dangerouslySetInnerHTML":{"__html":"\n              (function(c,l,a,r,i,t,y){\n                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n                t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;\n                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n              })(window, document, \"clarity\", \"script\", \"v144xksgk2\");\n            "}}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$2"}}],"$L3"]}],"$L4"]}]]}],"loading":null,"isPartial":false}
5:["$","img",null,{"height":"1","width":"1","style":{"display":"none"},"src":"https://www.facebook.com/tr?id=1683199166335451&ev=PageView&noscript=1"}]
3:["$","noscript",null,{"children":"$5"}]
4:["$","body",null,{"className":"geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable antialiased","children":["$","$L6",null,{"parallelRouterKey":"children","template":["$","$L7",null,{}],"notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]]}]}]
