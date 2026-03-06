'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  BarChart3,
  Shield,
  MessageCircle,
  CheckCircle2,
  Workflow,
  Zap,
  TrendingUp,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ChevronDown,
  Package,
  X,
  NotebookPen,
  Sheet,
  Smartphone,
  HelpCircle,
  Users,
  Rocket,
  Target,
  CalendarCheck,
  Headphones,
  Star,
  Moon,
  Sun,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ==============================================
   THEME TOGGLE HOOK
   ============================================== */
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('codesprint-theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
      document.documentElement.classList.toggle('light', stored === 'light');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      // Don't add class — let prefers-color-scheme handle it
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('codesprint-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.classList.toggle('light', next === 'light');
  };

  return { theme, toggleTheme, mounted };
}

/* ==============================================
   DATA
   ============================================== */

const painPoints = [
  {
    icon: Smartphone,
    title: 'Sem presença online',
    description: 'Seus concorrentes estão no Google e você não. Cada dia sem site é cliente indo pra outro.',
  },
  {
    icon: Sheet,
    title: 'Site amador ou desatualizado',
    description: 'Site feio. Não converte, não aparece no Google, e espanta seu cliente.',
  },
  {
    icon: HelpCircle,
    title: 'Agência cobra uma fortuna',
    description: 'Orçamento de R$5.000+ e prazo de semanas pra uma landing page simples? Sério?',
  },
  {
    icon: NotebookPen,
    title: 'Não sabe por onde começar',
    description: 'Domínio, hospedagem, design, SEO... Parece outro idioma. Você só quer vender mais.',
  },
];

const services = [
  {
    icon: Workflow,
    title: 'Sites & Landing Pages',
    description: 'Páginas de alta conversão que transformam visitantes em clientes.',
    features: ['Entregue em até 72 horas', 'Design premium e responsivo', 'Otimizado para Google (SEO)', 'Hospedagem e domínio incluso', 'Suporte pós-entrega 30 dias'],
    price: '⚡ A partir de R$ 997',
  },
];

const comparisonRows = [
  { feature: 'Prazo de entrega', us: 'Até 72h', them: '3 a 4 semanas' },
  { feature: 'Investimento', us: 'A partir de R$ 997', them: 'R$ 4.000+' },
  { feature: 'Comunicação', us: 'WhatsApp direto', them: 'E-mail com 48h de resposta' },
  { feature: 'Suporte pós-entrega', us: 'Incluso 30 dias', them: 'Cobrado à parte' },
  { feature: 'Feedback e ajustes', us: 'Ilimitados', them: '2 revisões' },
];

const caseStudies = [
  {
    client: 'Loja do Monstrão',
    segment: 'Moda Masculina Premium',
    result: '+R$ 53.200',
    metric: 'ROI projetado no Ano 1',
    description: 'Landing page de captação de leads de alta conversão — entregue em tempo recorde com validação semanal.',
    timeline: '72 horas',
    testimonial: 'A CodeSprint transformou completamente como a gente capta clientes. Tudo é rápido e funciona.',
    author: 'Proprietário',
  },
  {
    client: 'Estoque Fácil',
    segment: 'SaaS Fashion ERP',
    result: '100%',
    metric: 'Funciona offline',
    description: 'Sistema completo com landing page, PDV e gestão — desenvolvido com entregas semanais.',
    timeline: 'Em produção',
    testimonial: 'Finalmente um sistema que funciona mesmo sem internet. Meus vendedores adoraram.',
    author: 'CEO',
  },
];

const processSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Briefing',
    description: 'Você nos conta o que precisa pelo WhatsApp. Entendemos seu negócio e objetivos.',
    duration: '30 min',
  },
  {
    step: 2,
    icon: Target,
    title: 'Proposta & Wireframe',
    description: 'Em poucas horas você recebe a proposta com preço, prazo e o esboço do site.',
    duration: 'Mesmo dia',
  },
  {
    step: 3,
    icon: Rocket,
    title: 'Design & Desenvolvimento',
    description: 'Criamos seu site com design profissional. Você acompanha e valida em tempo real.',
    duration: '24–48h',
  },
  {
    step: 4,
    icon: CalendarCheck,
    title: 'Site no Ar',
    description: 'Deploy, domínio configurado e 30 dias de suporte incluso. Pronto pra vender.',
    duration: '72h total',
  },
];

const faqs = [
  {
    q: 'E se eu não gostar do resultado?',
    a: 'Impossível — porque você participa de cada etapa. Contato frequente e em tempo real, validamos o que foi feito e ajustamos. Você nunca recebe algo "pronto" sem ter aprovado antes.',
  },
  {
    q: 'Quanto custa um projeto?',
    a: 'Landing pages a partir de R$ 997, sites completos sob consulta. Geralmente os orçamentos ficam entre R$997 e R$2500. Sempre com proposta detalhada antes de começar — sem surpresas.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Zero. Você só precisa saber explicar seu negócio. A gente cuida de toda a parte técnica e entrega tudo funcionando.',
  },
  {
    q: 'Quanto tempo demora?',
    a: 'Landing pages e Sites completos em até 72 horas.',
  },
  {
    q: 'Vocês fazem manutenção depois?',
    a: '30 dias de suporte gratuito após a entrega. Depois, oferecemos planos mensais acessíveis de manutenção e evolução.',
  },
  {
    q: 'Por que são mais baratos que agências tradicionais?',
    a: 'Usamos processo de desenvolvimento super ágil, o que nos permite entregar mais rápido e com menos custo. A economia vai direto pro seu bolso.',
  },
];

/* ==============================================
   FAQ COMPONENT
   ============================================== */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {question}
        <ChevronDown
          className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="faq-content">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ==============================================
   PAGE
   ============================================== */
export default function Home() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <main className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      {/* ============ HEADER ============ */}
      <header className="px-6 py-4 bg-[var(--header-bg)] sticky top-0 z-50 transition-colors duration-300">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="CodeSprint"
            width={180}
            height={45}
            className="h-10 md:h-12 w-auto"
            priority
          />
          <div className="flex items-center gap-3">
            <Link
              href="#servicos"
              className="hidden md:inline-block text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Serviços
            </Link>
            <Link
              href="#cases"
              className="hidden md:inline-block text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Cases
            </Link>
            <Link
              href="#processo"
              className="hidden md:inline-block text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Processo
            </Link>
            <Link
              href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20CodeSprint."
              className="btn-cta px-5 py-2.5 text-sm"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Fale Conosco</span>
            </Link>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {!mounted ? (
                <div className="w-5 h-5" />
              ) : theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section className="px-6 py-16 md:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="badge badge-cta mb-6 mx-auto w-fit">
            <Zap className="w-4 h-4" />
            ⚡ Sites prontos em 72 horas
          </div>

          <h1 className="heading-hero mb-6">
            Seu site pronto em{' '}
            <span className="text-gradient">72 horas</span>
          </h1>

          <p className="body-lg max-w-2xl mx-auto mb-10">
            Landing pages e sites de alta conversão para sua empresa —{' '}
            <strong className="text-[var(--foreground)]">
              design profissional, entrega rápida
            </strong>
            , a partir de R$997.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20meu%20site%20em%2072h.%20Podem%20me%20ajudar?"
              className="btn-cta px-8 py-4 text-lg animate-pulse-glow"
            >
              Quero Meu Site em 72h
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#comparacao"
              className="btn-secondary px-8 py-4 text-lg"
            >
              Ver Comparação de Preço
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Metrics Strip */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="metric-card">
              <div className="metric-value text-gradient">50+</div>
              <div className="metric-label">Projetos entregues</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-gradient">72h</div>
              <div className="metric-label">Prazo para entrega</div>
            </div>
            <div className="metric-card">
              <div className="metric-value text-gradient">96%</div>
              <div className="metric-label">Satisfação</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--success)]" />
              <span>LGPD Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--primary)]" />
              <span>Sem surpresas no orçamento</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[var(--cta)]" />
              <span>Satisfação garantida ou ajustamos grátis</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DORES / PAIN POINTS ============ */}
      <section className="px-6 py-16 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">
              Se você se identifica, a gente resolve
            </h2>
            <p className="body-lg max-w-xl mx-auto">
              Esses problemas são mais comuns do que você imagina. E todos têm solução.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((pain, i) => (
              <div key={i} className="pain-card cursor-pointer">
                <div className="icon-pain mb-4">
                  <pain.icon className="w-6 h-6 text-[var(--danger)]" />
                </div>
                <h3 className="heading-card mb-2">{pain.title}</h3>
                <p className="body-sm">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVIÇOS / SOLUTIONS ============ */}
      <section className="px-6 py-16" id="servicos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-primary mb-4 mx-auto w-fit">
              <Rocket className="w-4 h-4" />
              Soluções
            </div>
            <h2 className="heading-section mb-4">
              O que construímos pra você
            </h2>
            <p className="body-lg max-w-xl mx-auto">Do briefing ao site no ar — em até 72 horas.</p>
          </div>

          <div className="max-w-xl mx-auto">
            {services.map((service, i) => (
              <div key={i} className="pro-card p-10 cursor-pointer border-2 border-[var(--cta)] shadow-lg" style={{ boxShadow: '0 8px 40px rgba(16, 185, 129, 0.15)' }}>
                <div className="flex items-start justify-between mb-6">
                  <div className="icon-container" style={{ padding: '18px' }}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="badge badge-success text-sm font-bold">{service.price}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="body-lg mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-base text-[var(--foreground)]">
                      <CheckCircle2 className="w-5 h-5 text-[var(--success)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20meu%20site%20em%2072h.%20Podem%20me%20ajudar?"
                  className="btn-cta px-8 py-4 text-lg mt-8 w-full justify-center animate-pulse-glow"
                >
                  Quero Meu Site em 72h
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPARAÇÃO ============ */}
      <section className="px-6 py-16 section-alt" id="comparacao">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-cta mb-4 mx-auto w-fit">
              <TrendingUp className="w-4 h-4" />
              Melhor custo-benefício
            </div>
            <h2 className="heading-section mb-4">
              CodeSprint vs Agências Tradicionais
            </h2>
            <p className="body-lg max-w-xl mx-auto">
              Mesma qualidade, fração do preço, muito mais velocidade.
            </p>
          </div>

          <div className="pro-card overflow-hidden">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="highlight">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      CodeSprint
                    </div>
                  </th>
                  <th className="competitor">Agência Tradicional</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td className="highlight-cell">
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                        {row.us}
                      </span>
                    </td>
                    <td className="competitor-cell">
                      <span className="inline-flex items-center gap-1.5">
                        <X className="w-4 h-4 text-[var(--danger)] opacity-60" />
                        {row.them}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-8">
            <Link
              href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Vi%20a%20compara%C3%A7%C3%A3o%20no%20site%20e%20quero%20saber%20mais."
              className="btn-cta px-8 py-4 text-lg"
            >
              Quero esse preço justo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PORTÓFLIO ============ */}
      <section className="px-6 py-16" id="cases">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-success mb-4 mx-auto w-fit">
              <Star className="w-4 h-4" />
              Projetos reais
            </div>
            <h2 className="heading-section mb-4">Feito pela CodeSprint</h2>
            <p className="body-lg max-w-xl mx-auto">Conheça alguns dos sites e sistemas que já entregamos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Seu Recurso */}
            <Link href="https://seurecurso.com.br" target="_blank" className="pro-card p-6 group hover:border-[var(--primary)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-primary text-xs">SaaS</span>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">Seu Recurso</h3>
              <p className="body-sm mb-4">Plataforma com IA que analisa multas de trânsito e gera defesas técnicas em minutos. Upload, análise e resultado automático.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">IA</span>
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Landing Page</span>
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Next.js</span>
              </div>
            </Link>

            {/* Rede Conecta */}
            <Link href="https://redeconecta.ia.br" target="_blank" className="pro-card p-6 group hover:border-[var(--primary)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-primary text-xs">Marketing Local</span>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">Rede Conecta</h3>
              <p className="body-sm mb-4">Plataforma de totens digitais para publicidade local. Anúncios posicionados em estabelecimentos com alto fluxo de pessoas.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Landing Page</span>
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Publicidade</span>
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Design</span>
              </div>
            </Link>

            {/* Estoque Fácil */}
            <Link href="https://estoquefacil.net" target="_blank" className="pro-card p-6 group hover:border-[var(--primary)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-primary text-xs">SaaS / ERP</span>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">Estoque Fácil</h3>
              <p className="body-sm mb-4">Sistema completo para lojistas de roupas: PDV, controle de estoque, fiado e relatórios financeiros. Funciona 100% offline.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">ERP</span>
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Offline-first</span>
                <span className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-muted)]">Landing Page</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      {/* ============ PROCESSO ============ */}
      <section className="px-6 py-16 section-alt" id="processo">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">
              Simples assim
            </h2>
            <p className="body-lg max-w-xl mx-auto">Do briefing ao site no ar em até 72 horas. Veja como funciona.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="timeline-step">
                <div className="pro-card p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-[var(--primary)] mb-2 uppercase tracking-wider">
                    Passo {step.step}
                  </div>
                  <h3 className="heading-card mb-2">{step.title}</h3>
                  <p className="body-sm mb-3">{step.description}</p>
                  <div className="text-xs text-[var(--primary)] font-semibold">{step.duration}</div>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-[var(--card-border)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="px-6 py-16" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section mb-4">
              Perguntas frequentes
            </h2>
            <p className="body-lg max-w-xl mx-auto">
              Tire suas dúvidas antes de dar o próximo passo.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA PÓS-FAQ ============ */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="pro-card p-10 md:p-14 relative overflow-hidden border-2 border-[var(--cta)]" style={{ boxShadow: '0 8px 40px rgba(16, 185, 129, 0.15)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-[0.04]" />

            <div className="badge badge-cta mb-6 mx-auto w-fit relative z-10">
              <Zap className="w-4 h-4" />
              Entrega em 72 horas
            </div>

            <h2 className="heading-section mb-4 relative z-10">Seu site pronto em{' '}<span className="text-gradient">72 horas</span></h2>

            <p className="body-lg mb-8 max-w-xl mx-auto relative z-10">
              Landing pages e sites de alta conversão, a partir de R$997. Design profissional, SEO e suporte incluso.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20meu%20site%20em%2072h.%20Podem%20me%20ajudar?"
                className="btn-cta px-10 py-5 text-lg animate-pulse-glow"
              >
                <MessageCircle className="w-6 h-6" />
                Quero Meu Site em 72h
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 relative z-10">
              <Headphones className="w-4 h-4 text-[var(--text-muted)]" />
              <p className="text-sm text-[var(--text-muted)]">Respondemos em até 2 horas úteis</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="px-6 py-12 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Image
                src="/logo.png"
                alt="CodeSprint"
                width={150}
                height={38}
                className="h-8 w-auto mb-4"
              />
              <p className="body-sm max-w-sm">
                Sites e landing pages de alta conversão, entregues em até 72 horas.
                Design profissional, SEO e suporte incluso. A partir de R$997.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[var(--foreground)] mb-4 text-sm uppercase tracking-wider">
                Serviços
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
                <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Sites & Landing Pages</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[var(--foreground)] mb-4 text-sm uppercase tracking-wider">
                Contato
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  (11) 96055-2522
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  contato@codesprint.com.br
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  São Paulo, SP
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © 2026 CodeSprint. Todos os direitos reservados.
            </p>
            <div className="flex gap-4 text-sm text-[var(--text-muted)]">
              <Link href="/privacidade" className="hover:text-[var(--primary)] transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-[var(--primary)] transition-colors">
                Termos
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
