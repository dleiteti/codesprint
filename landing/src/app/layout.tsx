import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "CodeSprint | Sites, Apps e Sistemas Personalizados",
  description: "Transforme suas ideias em realidade digital mais rápido do que você imagina. Desenvolvemos sites, aplicativos e sistemas personalizados em tempo recorde.",
  keywords: ["desenvolvimento web", "criação de sites", "aplicativos", "sistemas personalizados", "software", "startup", "tecnologia", "landing page"],
  authors: [{ name: "CodeSprint" }],
  creator: "CodeSprint",
  publisher: "CodeSprint",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://codesprint.com.br",
    siteName: "CodeSprint",
    title: "CodeSprint | Sites, Apps e Sistemas Personalizados",
    description: "Transforme suas ideias em realidade digital mais rápido do que você imagina. Desenvolvemos sites, aplicativos e sistemas personalizados.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeSprint - Desenvolvimento de Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeSprint | Sites, Apps e Sistemas Personalizados",
    description: "Transforme suas ideias em realidade digital mais rápido do que você imagina.",
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
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1683199166335451&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
