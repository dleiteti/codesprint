'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Sheet,
  HelpCircle,
  NotebookPen,
  CheckCircle2,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  Zap,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

/* ==============================================
   DATA - REFINADO PARA COPY DE NEGÓCIOS
   ============================================== */
const painPoints = [
  {
    icon: Smartphone,
    title: 'INVISÍVEL NO GOOGLE',
    description: 'Seus clientes estão procurando pelo seu serviço agora mesmo. Se você não tem um site profissional, eles estão comprando do seu concorrente.',
  },
  {
    icon: Sheet,
    title: 'PRIMEIRA IMPRESSÃO RUIM',
    description: 'Você entrega um serviço de excelência e cobra caro por isso, mas se o seu site parece amador, o cliente foge antes mesmo de pedir orçamento.',
  },
  {
    icon: HelpCircle,
    title: 'AGÊNCIAS CARAS E LENTAS',
    description: 'Orçamentos absurdos, meses de espera e reuniões desgastantes por um projeto que não gera vendas. Chega da burocracia tradicional.',
  },
  {
    icon: NotebookPen,
    title: 'ZERO DORES DE CABEÇA',
    description: 'Hospedagem? Domínio? Configurações complexas? Deixe a tecnologia com a nossa equipe. Seu único trabalho é atender os novos clientes.',
  },
];

const comparisonRows = [
  { feature: 'VELOCIDADE DE ENTREGA', us: 'Até 48h', them: '30 a 60 Dias' },
  { feature: 'INVESTIMENTO', us: 'R$ 897 (Único)', them: 'R$ 1.200 a R$ 2.500' },
  { feature: 'ATENDIMENTO', us: 'WhatsApp Direto', them: 'E-mail (Lento)' },
  { feature: 'MANUTENÇÃO E AJUSTES', us: '30 Dias Inclusos', them: 'Cobrados à parte' },
];

const caseStudies = [
  {
    client: 'OBJETO SINCERO',
    segment: 'Infoprodutos',
    url: 'https://objetosincero.com',
    result: '+120%',
    metric: 'Conversões',
    description: 'Construção da Landing Page focada em alta conversão para venda de guias e produtos digitais, estruturando a oferta de forma totalmente persuasiva.',
  },
  {
    client: 'REDE CONECTA IA',
    segment: 'Dashboard SaaS',
    url: 'https://redeconecta.ia.br',
    result: '100%',
    metric: 'Responsivo',
    description: 'Desenvolvimento estrutural da interface web do sistema, criando um ambiente limpo que comunica inovação (IA) e atrai usuários corporativos.',
  },
  {
    client: 'ESTOQUE FÁCIL',
    segment: 'Sistema Gestão ERP',
    url: 'https://estoquefacil.net',
    result: '+200%',
    metric: 'Leads B2B',
    description: 'Criação do site comercial oficial do ERP, projetado especificamente para captação de lojistas, com fluxo intuitivo para fechamento de sistema.',
  },
  {
    client: 'SEU RECURSO',
    segment: 'LegalTech (IA)',
    url: 'https://www.seurecurso.com.br',
    result: '+50%',
    metric: 'Cadastros',
    description: 'Construção integral da Landing Page para a plataforma jurídica. Otimizamos a experiência visual para transformar motoristas multados em novos clientes da IA.',
  },
];

const faqs = [
  {
    q: 'E SE EU NÃO GOSTAR DO RESULTADO?',
    a: 'Nós só finalizamos o projeto quando você estiver 100% satisfeito. Você nos acompanha durante o processo e garantimos que o visual atinja suas expectativas.',
  },
  {
    q: 'POR QUE UM VALOR TÃO ACESSÍVEL?',
    a: 'Especializamos nossa equipe na criação de Páginas de Alta Conversão. Nossos processos internos ágeis reduzem o tempo de produção, repassando essa economia direto para o seu bolso.',
  },
  {
    q: 'NÃO ENTENDO NADA DE TECNOLOGIA. ISSO É PARA MIM?',
    a: 'Completamente. Nós cuidamos de tudo: desde o design até colocar o site no ar (Domínio e Hospedagem). Você só precisa nos enviar sua logo e um contato de WhatsApp.',
  },
  {
    q: 'JÁ TENHO REDES SOCIAIS. PRECISO DE UM SITE?',
    a: 'Com certeza. Redes sociais limitam seu alcance pelo algoritmo, estão cheias de distrações e você não é dono do perfil. Um site profissional é sua vitrine 24h, aparece no Google e transmite a credibilidade que as redes não conseguem.',
  },
  {
    q: 'QUANTO TEMPO LEVA PARA TER RESULTADOS?',
    a: 'O site fica no ar em até 48 horas. A partir daí, você já pode divulgar e receber contatos. Para resultados orgânicos no Google, normalmente entre 2 a 4 semanas. Com tráfego pago, os primeiros leads podem chegar no mesmo dia.',
  },
  {
    q: 'POSSO FAZER ALTERAÇÕES DEPOIS?',
    a: 'Sim! O plano inclui 30 dias de suporte e ajustes gratuitos. Se precisar trocar uma foto, atualizar um texto ou ajustar cores — é só pedir pelo WhatsApp.',
  },
  {
    q: 'PRECISO TER UMA LOGO PRONTA?',
    a: 'Não necessariamente. Se você já tem, ótimo — usamos no projeto. Se não tem, podemos trabalhar apenas com o nome do seu negócio em tipografia profissional.',
  },
];

/* ==============================================
   COMPONENTES PREMIUM (UI/UX PRO MAX)
   ============================================== */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-trigger group" onClick={() => setOpen(!open)} aria-expanded={open}>
        {question}
        <ChevronDown
          className={`w-6 h-6 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-all duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="faq-content overflow-hidden"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
}

/* ==============================================
   SERVER-SIDE EVENT TRACKING
   ============================================== */
const sendEvent = (event: string, extraParams?: Record<string, string>) => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmCampaign = urlParams.get('utm_campaign') || '';
    const utmContent = urlParams.get('utm_content') || '';
    
    let source = 'Orgânico 🌱';
    const fbclid = urlParams.get('fbclid');
    const utmSource = (urlParams.get('utm_source') || '').toLowerCase();
    const utmMedium = (urlParams.get('utm_medium') || '').toLowerCase();
    
    if (fbclid || ['facebook', 'meta', 'ig', 'instagram'].includes(utmSource) || ['cpc', 'ad', 'ads'].includes(utmMedium)) {
      source = 'Meta Ads 🎯';
    } else if (['google', 'gclid'].includes(utmSource)) {
      source = 'Google Ads 🔍';
    } else if (document.referrer) {
      try {
        const hostname = new URL(document.referrer).hostname;
        if (hostname.includes('google')) source = 'Google Orgânico 🔍';
        else if (hostname.includes('instagram')) source = 'Instagram 📸';
        else if (hostname.includes('facebook')) source = 'Facebook 👥';
        else source = `Referência: ${hostname} 🔗`;
      } catch (e) {}
    }

    const campaignInfo = utmCampaign ? ` (Campanha: ${utmCampaign})` : '';
    const fullSource = `${source}${campaignInfo}`;

    const params = new URLSearchParams({
      event: event,
      source: fullSource,
      campaign: utmCampaign,
      content: utmContent,
      ...extraParams
    });

    const img = new window.Image();
    img.src = `/notify?${params.toString()}`;
  } catch (error) {
    console.error('Failed to send tracking event', error);
  }
};

/* ==============================================
   PAGE MAIN COMPONENT
   ============================================== */
export default function Home() {
  const [trafficSource, setTrafficSource] = useState('Analisando...');

  useEffect(() => {
    // Expor funções globalmente para o widget de chat
    (window as any).handleCTAClick = handleCTAClick;
    (window as any).sendEvent = sendEvent;

    let source = 'Orgânico 🌱';
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    const utmSource = urlParams.get('utm_source')?.toLowerCase() || '';
    const utmMedium = urlParams.get('utm_medium')?.toLowerCase() || '';
    const utmCampaign = urlParams.get('utm_campaign') || '';

    if (fbclid || ['facebook', 'meta', 'ig', 'instagram'].includes(utmSource) || ['cpc', 'ad', 'ads'].includes(utmMedium)) {
      source = 'Meta Ads 🎯';
    }

    const campaignInfo = utmCampaign ? ` (Campanha: ${utmCampaign})` : '';
    const fullSource = `${source}${campaignInfo}`;
    setTrafficSource(fullSource);

    // Enviar evento de visita inicial
    sendEvent('visit');

    // Configurar monitoramento de rolagem 50%
    let scrollTracked = false;
    const handleScroll = () => {
      if (scrollTracked) return;
      const scrollPct = (window.scrollY + window.innerHeight) / document.body.scrollHeight;
      if (scrollPct > 0.5) {
        scrollTracked = true;
        sendEvent('scroll_50');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = (local: string) => {
    sendEvent('cta_click', { local: local });
  };

  return (
    <main className="min-h-screen">
      {/* ============ BANNER DE URGÊNCIA ============ */}
      <div className="bg-[var(--danger)] text-white text-center py-2 px-4 text-xs md:text-sm font-bold tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span>⚠️ Promoção por tempo limitado: Apenas 4 das 10 vagas restantes para pagar apenas R$ 897! para ter um site premium.</span>
      </div>
      
      {/* ============ HEADER ============ */}
      <header className="px-6 py-4 bg-[var(--header-bg)] border-b border-[var(--card-border)] sticky top-0 z-50 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="CodeSprint"
              width={180}
              height={45}
              className="h-8 md:h-10 w-auto" 
              priority
            />
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="https://api.whatsapp.com/send?phone=5521981477503&text=Oi!%20Quero%20garantir%20meu%20site%20na%20promo%C3%A7%C3%A3o%20rel%C3%A2mpago%20de%20R%24%20897%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" onClick={() => handleCTAClick('Header')} className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
              <Image src="/whatsapp-icon.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5 object-contain" />
              <span className="hidden sm:inline">FALE COM UM ATENDENTE</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* ============ HERO (PREMIUM STORYTELLING) ============ */}
      <section className="px-6 py-20 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Tipografia Premium Massiva */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 z-10"
          >
            <div className="badge badge-primary mb-8 px-4 py-2">
              <Zap className="w-4 h-4 text-[var(--primary)]" /> ✓ PROMOÇÃO RELÂMPAGO — R$ 897 TAXA ÚNICA
            </div>
            
            <h1 className="heading-hero mb-6">
              SEU SITE PROFISSIONAL <br/>
              NO AR EM <br/>
              <span className="gradient-text">48 HORAS</span>
            </h1>
            
            <p className="body-lg max-w-2xl mb-12 text-[var(--text-muted)] border-l-2 border-[var(--primary)] pl-6">
              Design premium que transmite autoridade e atrai clientes. <br /> <span className="text-[var(--foreground)] font-semibold whitespace-nowrap">Investimento único de R$ 897</span> — sem mensalidade, sem contrato, sem complicação.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="https://api.whatsapp.com/send?phone=5521981477503&text=Oi!%20Quero%20garantir%20meu%20site%20na%20promo%C3%A7%C3%A3o%20rel%C3%A2mpago%20de%20R%24%20897%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" onClick={() => handleCTAClick('Hero')} className="btn-cta text-lg">
                QUERO MEU SITE AGORA <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-[var(--text-muted)] mt-4">Sem compromisso. Resposta em até 5 minutos. 💬</p>
          </motion.div>

          {/* Lado Direito: Grid Premium */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card"
            >
              <div className="text-sm font-medium text-[var(--primary)] uppercase tracking-wider mb-2">PRAZO DE ENTREGA RÁPIDO</div>
              <div className="text-5xl font-black text-white">48<span className="text-2xl text-[var(--primary)] ml-1">HR</span></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card"
            >
              <div className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">QUALIDADE PREMIUM</div>
              <div className="text-3xl font-bold mb-3">DESIGN DE ALTO NÍVEL</div>
              <div className="badge border border-[var(--primary)] text-[var(--primary)] bg-[rgba(6,182,212,0.1)]">Focado em Conversão</div>
            </motion.div>
             <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card border-[var(--primary)] bg-[rgba(6,182,212,0.05)]"
            >
              <div className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">FUNCIONA EM QUALQUER TELA</div>
              <div className="text-3xl font-bold mb-3">CELULAR, PC E TABLET</div>
              <div className="badge border border-[var(--primary)] text-[var(--primary)] bg-[rgba(6,182,212,0.1)]">Visual Impecável</div>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section className="px-6 py-20 section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge badge-primary mb-6 inline-flex">SIMPLES E RÁPIDO</div>
            <h2 className="heading-section">COMO <span className="text-[var(--text-muted)] font-light">FUNCIONA</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '📱', title: 'FALE CONOSCO', desc: 'Envie uma mensagem no WhatsApp. Vamos entender o que seu negócio precisa em poucos minutos.' },
              { step: '02', icon: '✏️', title: 'CRIAMOS SEU SITE', desc: 'Nossa equipe desenha e desenvolve seu site profissional. Você aprova cada detalhe antes de ir ao ar.' },
              { step: '03', icon: '🚀', title: 'SITE NO AR EM 48H', desc: 'Domínio, hospedagem e tudo configurado. Seu site profissional pronto para atrair clientes.' },
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} className="glass-card text-center relative">
                <div className="text-6xl font-black text-[var(--primary)] opacity-10 absolute top-4 right-4">{item.step}</div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="body-sm text-[var(--text-muted)]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DORES ============ */}
      <section className="px-6 py-24 section-alt">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="heading-section mb-6">VOCÊ ESTÁ PERDENDO VENDAS DIARIAMENTE</h2>
            <p className="body-lg">Se o seu negócio se encaixa em algum desses problemas, você está deixando dinheiro na mesa e perdendo espaço para a concorrência.</p>
          </div>
          <div className="md:w-2/3 flex flex-col gap-4">
            {painPoints.map((pain, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="pain-card flex flex-col md:flex-row md:items-center gap-6"
              >
                <div className="bg-[rgba(239,68,68,0.1)] p-4 rounded-xl shrink-0">
                  <pain.icon className="w-8 h-8 text-[var(--danger)]" />
                </div>
                <div>
                  <h3 className="heading-card mb-2">{pain.title}</h3>
                  <p className="body-sm text-[var(--text-muted)]">{pain.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOLUÇÃO & CUSTO ============ */}
      <section className="px-6 py-24 relative" id="comparacao">
        {/* Glow de fundo traseiro para impacto da oferta */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Título da Seção - agora fora do grid para alinhar os dois blocos pelo topo */}
          <div className="mb-12">
             <div className="badge badge-primary mb-6 hidden md:inline-flex">ANÁLISE DE MERCADO</div>
             <h2 className="heading-section">A CODESPRINT <span className="text-[var(--text-muted)] font-light">VS AGÊNCIAS</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Tabela de Guerra */}
            <div className="overflow-x-auto rounded-3xl p-[1px] bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-transparent">
              <table className="comparison-table w-full">
                 <thead>
                   <tr>
                     <th>COMPARAÇÃO</th>
                     <th className="highlight">CODESPRINT</th>
                     <th className="competitor">OUTRAS AGÊNCIAS</th>
                   </tr>
                 </thead>
                 <tbody>
                   {comparisonRows.map((row, i) => (
                     <tr key={i}>
                       <td>{row.feature}</td>
                       <td className="highlight-cell">{row.us}</td>
                       <td className="competitor-cell">{row.them}</td>
                     </tr>
                   ))}
                 </tbody>
              </table>
            </div>

            {/* Oferta Premium */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass-card relative z-10 border-[var(--primary-dark)] bg-[rgba(15,23,42,0.8)] overflow-hidden"
            >
              {/* Luz interna pra oferta superior */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>
              
              <h3 className="heading-card text-3xl mb-4 font-black tracking-tight">O SEU SITE PROFISSIONAL</h3>
              <p className="body-lg mb-8">Nossa solução definitiva para transformar visitantes em clientes qualificados todos os dias.</p>
              
              <div className="badge badge-primary mb-4">⚡ APENAS 10 VAGAS DISPONÍVEIS OU 5 DIAS</div>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-2xl text-[var(--text-muted)] line-through">R$ 497</span>
                <span className="text-5xl font-black tracking-tighter text-white">R$ 897</span>
              </div>
              
              <ul className="space-y-5 mb-10 font-medium text-[var(--foreground)]">
                <li className="flex gap-4 items-center"><CheckCircle2 className="text-[var(--primary)] w-6 h-6"/> Design Exclusivo de Alto Padrão (Premium)</li>
                <li className="flex gap-4 items-center"><CheckCircle2 className="text-[var(--primary)] w-6 h-6"/> Preparado para o Google (Captação de Clientes)</li>
                <li className="flex gap-4 items-center"><CheckCircle2 className="text-[var(--primary)] w-6 h-6"/> Nós cuidamos da Hospedagem e Domínio</li>
                <li className="flex gap-4 items-center"><CheckCircle2 className="text-[var(--primary)] w-6 h-6"/> Integração direta com seu WhatsApp</li>
                <li className="flex gap-4 items-center"><CheckCircle2 className="text-[var(--primary)] w-6 h-6"/> 30 dias de suporte e ajustes inclusos</li>
                <li className="flex gap-4 items-center"><CheckCircle2 className="text-[var(--primary)] w-6 h-6"/> Otimizado para celular, tablet e desktop</li>
              </ul>
              
               <Link href="https://api.whatsapp.com/send?phone=5521981477503&text=Oi!%20Quero%20garantir%20meu%20site%20na%20promo%C3%A7%C3%A3o%20rel%C3%A2mpago%20de%20R%24%20897%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" onClick={() => handleCTAClick('Oferta Premium')} className="btn-cta w-full justify-center py-5 text-xl tracking-wide uppercase">
                QUERO MEU SITE AGORA <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <p className="text-sm text-[var(--text-muted)] mt-4 text-center">Sem compromisso. Resposta em até 5 minutos. 💬</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                <span>100% de satisfação ou seu dinheiro de volta</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============ PORTFÓLIO (PREMIUM SHOWCASE) ============ */}
      <section className="px-6 py-24 section-alt" id="cases">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="heading-section">RESULTADOS<br/> <span className="text-[var(--text-muted)] font-light">COMPROVADOS</span></h2>
            </div>
            <p className="body-lg max-w-sm">Dê uma olhada em como transformamos completamente a presença digital de alguns de nossos parceiros.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((kase, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="glass-card p-0 flex flex-col group overflow-hidden border border-[var(--card-border)] bg-[var(--background)]"
              >
                {/* Visual Block Mock com fundo texturizado e glow animado */}
                <Link href={kase.url} target="_blank" rel="noopener noreferrer" className="h-56 bg-[rgba(255,255,255,0.02)] w-full relative overflow-hidden flex items-center justify-center p-6 border-b border-[var(--card-border)] group-hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-80 z-10"></div>
                  <div className="absolute w-32 h-32 bg-[var(--primary)] rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                  
                  <span className="font-black text-3xl text-[var(--foreground)] opacity-20 tracking-widest uppercase z-20 group-hover:scale-105 transition-transform duration-700">{kase.client}</span>
                  <ExternalLink className="absolute top-4 right-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:text-[var(--primary)]" />
                </Link>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <span className="badge border border-[var(--card-border)] text-xs">{kase.segment}</span>
                    <span className="text-xl font-bold text-[var(--primary)]">{kase.result} <span className="text-[var(--foreground)] ml-1">{kase.metric}</span></span>
                  </div>
                  <h3 className="heading-card mb-3">{kase.client}</h3>
                  <p className="body-sm">{kase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ (CLEAN LUXURY) ============ */}
      <section className="px-6 py-24 max-w-3xl mx-auto" id="faq">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">DÚVIDAS FREQUENTES <span className="text-[var(--primary)]">(FAQ)</span></h2>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>

      {/* ============ FOOTER PREMIUM ============ */}
      <footer className="bg-[var(--section-bg)] px-6 py-24 border-t border-[rgba(255,255,255,0.05)] relative overflow-hidden">
        {/* Glow Footer */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary)] blur-[150px] opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
          
          <div>
            <h2 className="heading-hero mb-8">INICIE O<br/><span className="gradient-text">PROJETO.</span></h2>
            <Link href="https://api.whatsapp.com/send?phone=5521981477503&text=Oi!%20Quero%20garantir%20meu%20site%20na%20promo%C3%A7%C3%A3o%20rel%C3%A2mpago%20de%20R%24%20897%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" onClick={() => handleCTAClick('Footer')} className="btn-cta text-xl px-8 py-5">
              FALAR COM ESPECIALISTA <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-[var(--text-muted)] mt-4">Atendimento humanizado pelo WhatsApp 💬</p>
          </div>
          
          <div className="flex flex-col gap-8 text-[var(--text-muted)] font-medium md:pt-4">
            <div 
              className="flex items-center gap-4 text-lg hover:text-[var(--primary)] transition-colors cursor-pointer w-max"
              onClick={() => {
                handleCTAClick('Footer Phone');
                window.open('https://api.whatsapp.com/send?phone=5521981477503&text=Oi!%20Quero%20garantir%20meu%20site%20na%20promo%C3%A7%C3%A3o%20rel%C3%A2mpago%20de%20R%24%20897%20%F0%9F%9A%80', '_blank');
              }}
            >
              <Phone className="w-5 h-5 text-[var(--primary)]" /> (21) 98147-7503
            </div>
            <div className="flex items-center gap-4 text-lg hover:text-[var(--primary)] transition-colors cursor-pointer w-max">
              <Mail className="w-5 h-5 text-[var(--primary)]" /> dleite.ti@gmail.com
            </div>
            <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col sm:flex-row gap-4 sm:justify-between text-sm uppercase tracking-wider">
              <span>© 2026 CODESPRINT AGENCY</span>
              <span>RIO DE JANEIRO / RJ</span>
            </div>
          </div>
          
        </div>
      </footer>

      {/* ============ CHAT WIDGET SOFIA ============ */}
      <Script src="/chat-widget.js" strategy="afterInteractive" id="chat-widget-sofia" />
      
      {/* ============ FLOATING WHATSAPP BUTTON (LEFT SIDE) ============ */}
      <Link
        href="https://api.whatsapp.com/send?phone=5521981477503&text=Oi!%20Quero%20garantir%20meu%20site%20na%20promo%C3%A7%C3%A3o%20rel%C3%A2mpago%20de%20R%24%20897%20%F0%9F%9A%80"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleCTAClick('Floating WhatsApp')}
        className="whatsapp-float"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <Image src="/whatsapp-icon.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8 object-contain" />
      </Link>
    </main>
  );
}
