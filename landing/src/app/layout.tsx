import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codesprint.com.br"),
  title: "CodeSprint | Sites e Landing Pages em 48h — Feitas Pra Vender",
  description: "Criamos sites e landing pages de alta conversão em até 48 horas. Design profissional, entrega rápida, a partir de R$497.",
  keywords: ["landing page profissional", "criação de site rápido", "site para empresa", "landing page 48h", "site barato", "landing page de alta conversão", "site profissional", "criação de landing page", "site para pequena empresa"],
  authors: [{ name: "CodeSprint" }],
  creator: "CodeSprint",
  publisher: "CodeSprint",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://codesprint.com.br",
    siteName: "CodeSprint",
    title: "CodeSprint | Sites e Landing Pages em 48h — Feitas Pra Vender",
    description: "Criamos sites e landing pages de alta conversão em até 48 horas. Design profissional, entrega rápida, a partir de R$497.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeSprint - Sites e Landing Pages em 48h",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSprint | Sites e Landing Pages em 48h — Feitas Pra Vender",
    description: "Sites e landing pages de alta conversão em 48h — design profissional, a partir de R$497.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Schema.org Structured Data (JSON-LD) for Google SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "name": "CodeSprint Agency",
                  "description": "Criamos sites e landing pages de alta conversão em até 48 horas. Design profissional, entrega rápida, a partir de R$497.",
                  "url": "https://codesprint.com.br",
                  "logo": "https://codesprint.com.br/logo.png",
                  "image": "https://codesprint.com.br/og-image.png",
                  "telephone": "+55-21-98147-7503",
                  "email": "dleite.ti@gmail.com",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Rio de Janeiro",
                    "addressRegion": "RJ",
                    "addressCountry": "BR"
                  },
                  "priceRange": "R$497",
                  "sameAs": [
                    "https://www.instagram.com/codesprint2000"
                  ]
                },
                {
                  "@type": "Service",
                  "name": "Criação de Landing Page Premium",
                  "description": "Landing page profissional de alta conversão entregue em até 48 horas, com design exclusivo, hospedagem e domínio inclusos.",
                  "provider": { "@type": "LocalBusiness", "name": "CodeSprint Agency" },
                  "areaServed": { "@type": "Country", "name": "Brasil" },
                  "offers": {
                    "@type": "Offer",
                    "price": "497.00",
                    "priceCurrency": "BRL",
                    "description": "Investimento único, sem mensalidade"
                  }
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "E se eu não gostar do resultado?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Nós só finalizamos o projeto quando você estiver 100% satisfeito. Você nos acompanha durante o processo e garantimos que o visual atinja suas expectativas." }
                    },
                    {
                      "@type": "Question",
                      "name": "Por que um valor tão acessível?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Especializamos nossa equipe na criação de Páginas de Alta Conversão. Nossos processos internos ágeis reduzem o tempo de produção, repassando essa economia direto para o seu bolso." }
                    },
                    {
                      "@type": "Question",
                      "name": "Não entendo nada de tecnologia. Isso é para mim?",
                      "acceptedAnswer": { "@type": "Answer", "text": "Completamente. Nós cuidamos de tudo: desde o design até colocar o site no ar (Domínio e Hospedagem). Você só precisa nos enviar sua logo e um contato de WhatsApp." }
                    }
                  ]
                }
              ]
            })
          }}
        />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C98EFJG709"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C98EFJG709');
            `,
          }}
        />

        {/* Microsoft Clarity - Behavior Analytics & Heatmaps */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v144xksgk2");
            `,
          }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '969809299178290');
              fbq('track', 'PageView');
              
              // Enhanced tracking - Lead event on WhatsApp CTA click
              function setupConversionTracking() {
                document.addEventListener('click', function(e) {
                  var link = e.target.closest('a[href*="wa.me"]');
                  if (link) {
                    // Single Lead event - Plano Unico R$497
                    fbq('track', 'Lead', {
                      content_name: 'LP Premium R$497',
                      value: 497.00,
                      currency: 'BRL'
                    });
                    
                    // Google Analytics event
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'whatsapp_click', {
                        'event_category': 'engagement',
                        'event_label': 'LP Premium R$497',
                        'value': 497
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
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=969809299178290&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script src="/spark-tracker.js" data-app="codesprint" strategy="afterInteractive" id="spark-tracker" />
      </body>
    </html>
  );
}
