import { notFound } from 'next/navigation';
import { mockups } from '@/data/mockups';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Clock, Phone, MapPin } from 'lucide-react';

export function generateStaticParams() {
  return Object.keys(mockups).map((slug) => ({
    slug: slug,
  }));
}

export default async function ClienteMockup({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const lead = mockups[resolvedParams.slug];

  if (!lead) {
    notFound();
  }

  // Injecting custom CSS variables for this specific route
  const customStyle = {
    '--client-primary': lead.accent_color,
  } as React.CSSProperties;

  const isLight = lead.theme === 'light';
  
  // Theme dictionary
  const colors = {
    mainBg: isLight ? 'bg-slate-50' : 'bg-[#060b14]',
    altBg: isLight ? 'bg-white' : 'bg-[#0a1120]',
    headerBg: isLight ? 'bg-white/80' : 'bg-[#0a1120]/80',
    cardBg: isLight ? 'bg-white' : 'bg-[#060b14]',
    border: isLight ? 'border-slate-200' : 'border-white/5',
    textPrimary: isLight ? 'text-slate-900' : 'text-white',
    textSecondary: isLight ? 'text-slate-600' : 'text-slate-400',
    textMuted: isLight ? 'text-slate-400' : 'text-slate-600',
  };

  return (
    <main className="client-theme min-h-screen relative" style={customStyle}>
      {/* 
        ======== CSS INJETADO (OVERRIDE DA IDENTIDADE) ======== 
        Redefinimos as variaveis do globals.css localmente para a cor do cliente
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .client-theme {
          --primary: var(--client-primary);
        }
        .btn-client {
          background-color: var(--primary);
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s;
        }
        .btn-client:hover {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px var(--primary);
        }
      `}} />

      <div className={`min-h-screen ${colors.mainBg} ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
        
        {/* HEADER */}
        <header className={`px-6 py-4 backdrop-blur-md sticky top-0 z-50 border-b ${colors.headerBg} ${colors.border}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className={`text-xl font-bold uppercase tracking-widest ${colors.textPrimary}`}>
              {lead.client_name}
            </h1>
            <div className="hidden sm:flex items-center gap-6">
              <a href="#contato" className={`text-sm font-semibold tracking-wider hover:text-[var(--primary)] transition-colors ${colors.textPrimary}`}>
                SERVIÇOS
              </a>
              <a href="#contato" className="btn-client text-sm py-2 px-4 rounded-full">
                AGENDAR AGORA
              </a>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section className="relative px-6 py-24 md:py-32 overflow-hidden flex items-center min-h-[80vh]">
          {/* Background Image com Overlay */}
          <div className="absolute inset-0 z-0">
            <div className={`absolute inset-0 bg-gradient-to-r ${isLight ? 'from-slate-50 via-slate-50/90' : 'from-[#060b14] via-[#060b14]/90'} to-transparent z-10`} />
            <img 
              src={lead.background_image} 
              alt={lead.client_name}
              className={`w-full h-full object-cover ${isLight ? 'opacity-20' : 'opacity-40'}`}
            />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-20 w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold tracking-widest uppercase mb-6 border border-[var(--primary)]/20">
                <Star className="w-4 h-4 fill-current" /> Excelência em {lead.niche}
              </div>
              
              <h2 className={`text-4xl md:text-6xl font-black leading-[1.1] mb-6 tracking-tight ${colors.textPrimary}`}>
                RESULTADOS QUE VOCÊ <span className="text-[var(--primary)]">MERECE</span>.
              </h2>
              
              <p className={`text-lg mb-10 leading-relaxed border-l-2 border-[var(--primary)] pl-6 ${colors.textSecondary}`}>
                {lead.bio || `A estrutura da ${lead.client_name} foi desenvolvida para oferecer o mais alto nível de atendimento. Confiança, segurança e foco no que realmente importa: Você.`}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={lead.contact_link || "#contato"} target="_blank" rel="noreferrer" className="btn-client text-lg justify-center">
                  FALAR PELO WHATSAPP <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* HERO IMAGE CONDICIONAL (Split Layout) */}
            {lead.hero_image && (
              <div className="hidden lg:flex justify-end relative items-center">
                {/* Glow Effect / Backdrop - Centralizado embaixo da imagem */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--primary)]/20 blur-[100px] rounded-full z-0 pointer-events-none" />
                <img 
                  src={lead.hero_image} 
                  alt={`Imagem de ${lead.client_name}`}
                  className="relative z-10 w-full max-w-lg object-contain drop-shadow-2xl opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            )}
          </div>
        </section>

        {/* =========================================
            SERVIÇOS / PROCEDIMENTOS (DINAMICO)
            ========================================= */}
        {lead.services && lead.services.length > 0 ? (
          <section className={`px-6 py-20 relative z-20 border-t ${colors.altBg} ${colors.border}`}>
            <div className="max-w-7xl mx-auto">
              <h2 className={`text-3xl font-black mb-12 text-center tracking-tight ${colors.textPrimary}`}>
                Nossos Procedimentos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lead.services.map((svc, i) => (
                  <div key={i} className={`flex items-center gap-4 p-6 rounded-2xl border hover:border-[var(--primary)]/50 transition-colors group ${colors.cardBg} ${colors.border}`}>
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <span className={`text-lg font-medium transition-colors ${isLight ? 'text-slate-700 group-hover:text-slate-900' : 'text-slate-300 group-hover:text-white'}`}>{svc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className={`px-6 py-20 relative z-20 border-t ${colors.altBg} ${colors.border}`}>
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
              <div className={`p-8 rounded-2xl border hover:border-[var(--primary)]/50 transition-colors ${colors.cardBg} ${colors.border}`}>
                <Shield className="w-10 h-10 text-[var(--primary)] mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${colors.textPrimary}`}>Confiabilidade</h3>
                <p className={`text-sm ${colors.textSecondary}`}>Estrutura preparada para entregar segurança total em cada etapa do atendimento.</p>
              </div>
              <div className={`p-8 rounded-2xl border hover:border-[var(--primary)]/50 transition-colors ${colors.cardBg} ${colors.border}`}>
                <Clock className="w-10 h-10 text-[var(--primary)] mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${colors.textPrimary}`}>Atendimento Rápido</h3>
                <p className={`text-sm ${colors.textSecondary}`}>Nossa equipe está sempre a postos para entender sua necessidade com urgência.</p>
              </div>
              <div className={`p-8 rounded-2xl border hover:border-[var(--primary)]/50 transition-colors ${colors.cardBg} ${colors.border}`}>
                <Star className="w-10 h-10 text-[var(--primary)] mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${colors.textPrimary}`}>Qualidade Premium</h3>
                <p className={`text-sm ${colors.textSecondary}`}>Focamos nos mínimos detalhes para que a sua experiência seja inesquecível.</p>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER FALSO */}
        <footer id="contato" className={`px-6 py-20 border-t text-center pb-32 ${colors.mainBg} ${colors.border}`}>
          <h2 className={`text-3xl font-black mb-10 ${colors.textPrimary}`}>AGENDE SUA AVALIAÇÃO O QUANTO ANTES</h2>
          <div className={`flex flex-col items-center gap-6 mb-10 max-w-lg mx-auto ${colors.textSecondary}`}>
            <a href={lead.contact_link || "#"} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 text-lg hover:text-[var(--primary)] transition-colors">
              <Phone className="w-6 h-6 text-[var(--primary)]" /> Atendimento Exclusivo via WhatsApp
            </a>
            {lead.address && (
              <div className="flex items-center justify-center gap-3 text-center text-lg">
                <MapPin className="w-8 h-8 text-[var(--primary)] shrink-0" /> {lead.address}
              </div>
            )}
          </div>
          <p className={`text-xs uppercase tracking-widest ${colors.textMuted}`}>© {new Date().getFullYear()} {lead.client_name}. TODOS OS DIREITOS RESERVADOS.</p>
        </footer>

      </div>

      {/* ==============================================
          PITCH DA CODESPRINT EXIBIDO NO RODAPÉ (GODFATHER OFFER)
          ============================================== */}
      <div className="fixed bottom-0 left-0 w-full bg-[var(--primary)] border-t border-white/20 p-4 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white/80 text-xs font-black uppercase tracking-widest mb-1 drop-shadow-sm">PROTÓTIPO GERADO PELA CODESPRINT AGENCY ⚡</div>
            <h3 className="text-white text-sm md:text-base font-medium drop-shadow-sm">
              Gostou desse site pronto? Ele pode ser definitivamente da <strong className="font-black text-white">{lead.client_name}</strong> por R$ 997.
            </h3>
          </div>
          <Link href="/" className="bg-white text-slate-900 hover:bg-slate-50 font-black text-sm px-6 py-3 rounded-md uppercase tracking-wide whitespace-nowrap transition-colors shadow-lg">
            Quero esse Site Pra Mim
          </Link>
        </div>
      </div>

    </main>
  );
}
