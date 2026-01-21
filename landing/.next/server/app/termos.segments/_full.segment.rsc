1:"$Sreact.fragment"
8:I[68027,[],"default"]
:HL["/_next/static/chunks/0781b9f2d2497af0.css","style"]
:HL["/_next/static/media/797e433ab948586e-s.p.dbea232f.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/media/caa3a2e1cccd8315-s.p.853070df.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
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
            0:{"P":null,"b":"4ZKPyb4bC0rfkEVsDJnDl","c":["","termos"],"q":"","i":false,"f":[[["",{"children":["termos",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],[["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/chunks/0781b9f2d2497af0.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],["$","html",null,{"lang":"pt-BR","suppressHydrationWarning":true,"children":[["$","head",null,{"children":[["$","script",null,{"async":true,"src":"https://www.googletagmanager.com/gtag/js?id=G-C98EFJG709"}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"\n              window.dataLayer = window.dataLayer || [];\n              function gtag(){dataLayer.push(arguments);}\n              gtag('js', new Date());\n              gtag('config', 'G-C98EFJG709');\n            "}}],["$","script",null,{"type":"text/javascript","dangerouslySetInnerHTML":{"__html":"\n              (function(c,l,a,r,i,t,y){\n                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n                t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;\n                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n              })(window, document, \"clarity\", \"script\", \"v144xksgk2\");\n            "}}],["$","script",null,{"dangerouslySetInnerHTML":{"__html":"$2"}}],"$L3"]}],"$L4"]}]]}],{"children":["$L5",{"children":["$L6",{},null,false,false]},null,false,false]},null,false,false],"$L7",false]],"m":"$undefined","G":["$8",[]],"S":true}
a:I[39756,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"default"]
b:I[37457,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"default"]
c:I[22016,["/_next/static/chunks/3df468b1e896883e.js"],""]
d:I[5500,["/_next/static/chunks/3df468b1e896883e.js"],"Image"]
19:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"ViewportBoundary"]
1b:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"MetadataBoundary"]
1c:"$Sreact.suspense"
9:["$","img",null,{"height":"1","width":"1","style":{"display":"none"},"src":"https://www.facebook.com/tr?id=1683199166335451&ev=PageView&noscript=1"}]
3:["$","noscript",null,{"children":"$9"}]
4:["$","body",null,{"className":"geist_a71539c9-module__T19VSG__variable geist_mono_8d43a2aa-module__8Li5zG__variable antialiased","children":["$","$La",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Lb",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}]
5:["$","$1","c",{"children":[null,["$","$La",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$Lb",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}]
6:["$","$1","c",{"children":[["$","main",null,{"className":"min-h-screen bg-[#0B1120] text-gray-300","children":[["$","header",null,{"className":"px-6 py-6 border-b border-gray-800","children":["$","nav",null,{"className":"max-w-4xl mx-auto flex items-center justify-between","children":[["$","$Lc",null,{"href":"/","children":["$","$Ld",null,{"src":"/logo.png","alt":"CodeSprint","width":200,"height":50,"className":"h-12 w-auto"}]}],["$","$Lc",null,{"href":"/","className":"text-sm text-[#1B8A4A] hover:underline","children":"← Voltar ao início"}]]}]}],["$","article",null,{"className":"max-w-4xl mx-auto px-6 py-12","children":[["$","h1",null,{"className":"text-3xl md:text-4xl font-bold text-white mb-8","children":"Termos de Uso"}],["$","p",null,{"className":"text-sm text-gray-500 mb-8","children":"Última atualização: 09 de janeiro de 2026"}],["$","div",null,{"className":"space-y-8 text-gray-400 leading-relaxed","children":[["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"1. Aceitação dos Termos"}],["$","p",null,{"children":["Ao acessar e utilizar o site da ",["$","strong",null,{"className":"text-white","children":"CodeSprint"}]," (codesprint.com.br), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nosso site ou serviços."]}]]}],["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"2. Descrição dos Serviços"}],["$","p",null,{"className":"mb-4","children":"A CodeSprint oferece serviços de desenvolvimento de software, incluindo:"}],["$","ul",null,{"className":"list-disc list-inside space-y-2 ml-4","children":[["$","li",null,{"children":"Criação de landing pages e sites institucionais;"}],["$","li",null,{"children":"Desenvolvimento de aplicativos web e mobile;"}],["$","li",null,{"children":"Automação de processos com inteligência artificial;"}],["$","li",null,{"children":"Sistemas personalizados sob demanda;"}],["$","li",null,{"children":"Manutenção e suporte técnico."}]]}]]}],["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"3. Orçamentos e Contratação"}],["$","ul",null,{"className":"list-disc list-inside space-y-2 ml-4","children":[["$","li",null,{"children":"Todos os orçamentos são gratuitos e sem compromisso;"}],["$","li",null,{"children":"Os valores apresentados são válidos por 7 (sete) dias, salvo indicação contrária;"}],["$","li",null,{"children":"A contratação formal ocorre mediante proposta comercial e aceite por escrito;"}],["$","li",null,{"children":"Prazos de entrega são definidos no contrato individual de cada projeto."}]]}]]}],["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"4. Propriedade Intelectual"}],["$","p",null,{"children":"Todo o conteúdo deste site, incluindo textos, imagens, logos, design e código-fonte, é de propriedade exclusiva da CodeSprint ou licenciado para uso. É proibida a reprodução, distribuição ou uso comercial sem autorização prévia por escrito."}],["$","p",null,{"className":"mt-4","children":"Os projetos desenvolvidos para clientes terão a propriedade intelectual transferida mediante pagamento integral dos valores contratados, conforme estipulado em contrato específico."}]]}],["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"5. Responsabilidades do Cliente"}],["$","p",null,{"className":"mb-4","children":"O cliente se compromete a:"}],["$","ul",null,{"className":"list-disc list-inside space-y-2 ml-4","children":[["$","li",null,{"children":"Fornecer informações verdadeiras e atualizadas;"}],["$","li",null,{"children":"Disponibilizar materiais necessários (textos, imagens, logos) em tempo hábil;"}],["$","li",null,{"children":"Realizar feedbacks e aprovações dentro dos prazos acordados;"}],["$","li",null,{"children":"Efetuar os pagamentos nas datas acordadas."}]]}]]}],["$","section",null,{"children":["$Le","$Lf","$L10"]}],"$L11","$L12","$L13","$L14","$L15"]}]]}],"$L16"]}],["$L17"],"$L18"]}]
7:["$","$1","h",{"children":[null,["$","$L19",null,{"children":"$L1a"}],["$","div",null,{"hidden":true,"children":["$","$L1b",null,{"children":["$","$1c",null,{"name":"Next.Metadata","children":"$L1d"}]}]}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}]
1e:I[97367,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"OutletBoundary"]
e:["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"6. Limitação de Responsabilidade"}]
f:["$","p",null,{"children":"A CodeSprint não se responsabiliza por:"}]
10:["$","ul",null,{"className":"list-disc list-inside space-y-2 ml-4 mt-4","children":[["$","li",null,{"children":"Danos indiretos, incidentais ou consequenciais;"}],["$","li",null,{"children":"Perda de dados causada por falhas de terceiros (hospedagem, domínio);"}],["$","li",null,{"children":"Resultados de negócio esperados pelo cliente;"}],["$","li",null,{"children":"Interrupções de serviço fora de nosso controle."}]]}]
11:["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"7. Garantia e Suporte"}],["$","p",null,{"children":"Oferecemos garantia de 30 (trinta) dias para correção de bugs e ajustes técnicos após a entrega final do projeto. Alterações de escopo, novas funcionalidades ou mudanças substanciais são consideradas novos serviços e serão orçadas separadamente."}]]}]
12:["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"8. Política de Cancelamento"}],["$","p",null,{"children":"Em caso de cancelamento pelo cliente após o início do projeto, os valores referentes ao trabalho já executado serão devidos. A CodeSprint reserva-se o direito de cancelar contratos em caso de inadimplência superior a 15 (quinze) dias."}]]}]
13:["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"9. Alterações nos Termos"}],["$","p",null,{"children":"Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações serão publicadas nesta página com a data de atualização. O uso continuado do site após alterações constitui aceitação dos novos termos."}]]}]
14:["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"10. Legislação Aplicável"}],["$","p",null,{"children":"Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da Comarca do Rio de Janeiro, RJ, com renúncia expressa a qualquer outro."}]]}]
15:["$","section",null,{"children":[["$","h2",null,{"className":"text-xl font-semibold text-white mb-4","children":"11. Contato"}],["$","p",null,{"children":["Para dúvidas sobre estes Termos de Uso, entre em contato conosco através do WhatsApp: ",["$","a",null,{"href":"https://wa.me/5511960552522","className":"text-[#1B8A4A] hover:underline","children":"(11) 96055-2522"}]]}]]}]
16:["$","footer",null,{"className":"border-t border-gray-800 px-6 py-8","children":["$","div",null,{"className":"max-w-4xl mx-auto text-center text-sm text-gray-500","children":[["$","p",null,{"children":"© 2026 CodeSprint. Todos os direitos reservados."}],["$","div",null,{"className":"mt-4 space-x-4","children":[["$","$Lc",null,{"href":"/privacidade","className":"text-[#1B8A4A] hover:underline","children":"Política de Privacidade"}],["$","$Lc",null,{"href":"/termos","className":"text-[#1B8A4A] hover:underline","children":"Termos de Uso"}]]}]]}]}]
17:["$","script","script-0",{"src":"/_next/static/chunks/3df468b1e896883e.js","async":true,"nonce":"$undefined"}]
18:["$","$L1e",null,{"children":["$","$1c",null,{"name":"Next.MetadataOutlet","children":"$@1f"}]}]
1a:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
20:I[27201,["/_next/static/chunks/ff1a16fafef87110.js","/_next/static/chunks/7340adf74ff47ec0.js"],"IconMark"]
1d:[["$","title","0",{"children":"CodeSprint | Sites, Apps e Sistemas Personalizados"}],["$","meta","1",{"name":"description","content":"Transforme suas ideias em realidade digital mais rápido do que você imagina. Desenvolvemos sites, aplicativos e sistemas personalizados em tempo recorde."}],["$","meta","2",{"name":"author","content":"CodeSprint"}],["$","meta","3",{"name":"keywords","content":"desenvolvimento web,criação de sites,aplicativos,sistemas personalizados,software,startup,tecnologia,landing page"}],["$","meta","4",{"name":"creator","content":"CodeSprint"}],["$","meta","5",{"name":"publisher","content":"CodeSprint"}],["$","meta","6",{"name":"robots","content":"index, follow"}],["$","meta","7",{"property":"og:title","content":"CodeSprint | Sites, Apps e Sistemas Personalizados"}],["$","meta","8",{"property":"og:description","content":"Transforme suas ideias em realidade digital mais rápido do que você imagina. Desenvolvemos sites, aplicativos e sistemas personalizados."}],["$","meta","9",{"property":"og:url","content":"https://codesprint.com.br"}],["$","meta","10",{"property":"og:site_name","content":"CodeSprint"}],["$","meta","11",{"property":"og:locale","content":"pt_BR"}],["$","meta","12",{"property":"og:image","content":"https://codesprint.com.br/og-image.png"}],["$","meta","13",{"property":"og:image:width","content":"1200"}],["$","meta","14",{"property":"og:image:height","content":"630"}],["$","meta","15",{"property":"og:image:alt","content":"CodeSprint - Desenvolvimento de Software"}],["$","meta","16",{"property":"og:type","content":"website"}],["$","meta","17",{"name":"twitter:card","content":"summary_large_image"}],["$","meta","18",{"name":"twitter:title","content":"CodeSprint | Sites, Apps e Sistemas Personalizados"}],["$","meta","19",{"name":"twitter:description","content":"Transforme suas ideias em realidade digital mais rápido do que você imagina."}],["$","meta","20",{"name":"twitter:image","content":"https://codesprint.com.br/og-image.png"}],["$","link","21",{"rel":"shortcut icon","href":"/favicon.png"}],["$","link","22",{"rel":"icon","href":"/favicon.ico?favicon.0b3bf435.ico","sizes":"256x256","type":"image/x-icon"}],["$","link","23",{"rel":"icon","href":"/favicon.png"}],["$","link","24",{"rel":"apple-touch-icon","href":"/favicon.png"}],["$","$L20","25",{}]]
1f:null
