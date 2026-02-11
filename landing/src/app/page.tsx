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
  Sun
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/* ==============================================
   THEME TOGGLE HOOK
   ============================================== */
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
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

  return { theme, toggleTheme };
}

/* ==============================================
   DATA
   ============================================== */

const painPoints = [
  {
    icon: NotebookPen,
    title: 'Caderno e caneta',
    description: 'Anotando pedidos, estoque e fiado em papel. Uma chuva e você perde tudo.',
  },
  {
    icon: Sheet,
    title: 'Planilhas infinitas',
    description: 'Excel com 47 abas que só você entende. Trava, some dados e ninguém confia.',
  },
  {
    icon: Smartphone,
    title: 'WhatsApp caótico',
    description: 'Pedidos misturados com fotos de família. Clientes reclamando que "mandou mensagem".',
  },
  {
    icon: HelpCircle,
    title: 'Zero controle',
    description: 'Não sabe quanto vendeu, quanto tem em estoque, nem quanto cobra o fiado.',
  },
];

const services = [
  {
    icon: Workflow,
    title: 'Sites & Landing Pages',
    description: 'Páginas de alta conversão que transformam visitantes em clientes.',
    features: ['Design premium', 'Otimizado para Google', 'Carrega em 2 segundos'],
    price: 'A partir de R$ 797',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Relatórios',
    description: 'Visualize seus dados em tempo real e tome decisões com confiança.',
    features: ['KPIs do seu negócio', 'Alertas automáticos', 'Acesso pelo celular'],
    price: 'A partir de R$ 1.497',
  },
  {
    icon: Package,
    title: 'Sistemas & ERPs',
    description: 'Gestão integrada de estoque, vendas e financeiro sob medida.',
    features: ['Controle de estoque', 'PDV móvel', 'Relatórios financeiros'],
    price: 'Sob consulta',
  },
  {
    icon: MessageCircle,
    title: 'Automações & Integrações',
    description: 'Automatize o que é repetitivo e conecte seus sistemas.',
    features: ['WhatsApp Business', 'Fluxos automatizados', 'Sem retrabalho'],
    price: 'A partir de R$ 997',
  },
];

const comparisonRows = [
  { feature: 'Prazo de entrega', us: 'Até 30 dias', them: '3-6 meses' },
  { feature: 'Investimento', us: 'A partir de R$ 797', them: 'R$ 15.000+' },
  { feature: 'Comunicação', us: 'WhatsApp direto', them: 'E-mail com 48h de resposta' },
  { feature: 'Metodologia', us: 'Entregas semanais', them: 'Tudo no final' },
  { feature: 'Suporte pós-entrega', us: 'Incluso 30 dias', them: 'Cobrado à parte' },
  { feature: 'Feedback e ajustes', us: 'Ilimitados no sprint', them: '2 revisões' },
];

const caseStudies = [
  {
    client: 'Loja do Monstrão',
    segment: 'Moda Masculina Premium',
    result: '+R$ 53.200',
    metric: 'ROI projetado no Ano 1',
    description: 'Sistema de captação de leads entregue em ciclos ágeis com validação semanal.',
    timeline: '20 dias',
    testimonial: 'A CodeSprint transformou completamente como a gente capta clientes. Tudo é rápido e funciona.',
    author: 'Proprietário',
  },
  {
    client: 'Estoque Fácil',
    segment: 'SaaS Fashion ERP',
    result: '100%',
    metric: 'Funciona offline',
    description: 'ERP completo com PDV, estoque e financeiro — desenvolvido com entregas semanais.',
    timeline: 'Em produção',
    testimonial: 'Finalmente um sistema que funciona mesmo sem internet. Meus vendedores adoraram.',
    author: 'CEO',
  },
];

const processSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: 'Conversa',
    description: 'Você nos conta seu problema pelo WhatsApp. Sem burocracia.',
    duration: '1 dia',
  },
  {
    step: 2,
    icon: Target,
    title: 'Proposta',
    description: 'Apresentamos a solução com prazo, preço e ROI projetado.',
    duration: '2-3 dias',
  },
  {
    step: 3,
    icon: Rocket,
    title: 'Desenvolvimento',
    description: 'Construímos com entregas semanais. Você acompanha tudo.',
    duration: '2-4 semanas',
  },
  {
    step: 4,
    icon: CalendarCheck,
    title: 'Entrega',
    description: 'Deploy, treinamento e 30 dias de suporte incluso.',
    duration: 'Ongoing',
  },
];

const faqs = [
  {
    q: 'E se eu não gostar do resultado?',
    a: 'Impossível — porque você participa de cada etapa. A cada semana, validamos o que foi feito e ajustamos. Você nunca recebe algo "pronto" sem ter aprovado antes.',
  },
  {
    q: 'Quanto custa um projeto?',
    a: 'Landing pages a partir de R$ 797, sistemas completos sob consulta. Sempre com proposta detalhada antes de começar — sem surpresas.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Zero. Você só precisa saber explicar seu negócio. A gente cuida de toda a parte técnica e entrega tudo funcionando.',
  },
  {
    q: 'Quanto tempo demora?',
    a: 'Landing pages em 7-14 dias. Sistemas em 2-4 semanas. Sempre com entregas parciais toda semana para você acompanhar.',
  },
  {
    q: 'Vocês fazem manutenção depois?',
    a: '30 dias de suporte gratuito após a entrega. Depois, oferecemos planos mensais acessíveis de manutenção e evolução.',
  },
  {
    q: 'Por que são mais baratos que agências tradicionais?',
    a: 'Usamos IA e automação em boa parte do processo, o que nos permite entregar mais rápido e com menos custo. A economia vai direto pro seu bolso.',
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
  const { theme, toggleTheme } = useTheme();

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
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ============ HERO ============ */}
      <section className="px-6 py-16 md:py-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="badge badge-cta mb-6 mx-auto w-fit">
            <Zap className="w-4 h-4" />
            Mais rápido e mais barato que agências tradicionais
          </div>

          <h1 className="heading-hero mb-6">
            Seu negócio merece mais
            <br />
            que{' '}
            <span className="text-gradient">planilhas e cadernos</span>
          </h1>

          <p className="body-lg max-w-2xl mx-auto mb-10">
            Criamos sistemas, sites e automações sob medida para micro e pequenas
            empresas —{' '}
            <strong className="text-[var(--foreground)]">
              por uma fração do custo
            </strong>{' '}
            e com entrega em até 30 dias.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20digitalizar%20meu%20neg%C3%B3cio.%20Podem%20me%20ajudar?"
              className="btn-cta px-8 py-4 text-lg animate-pulse-glow"
            >
              Quero Digitalizar Meu Negócio
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
              <div className="metric-value text-gradient">30</div>
              <div className="metric-label">Dias para entrega</div>
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
              Esses problemas são mais comuns do que você imagina — e todos têm solução.
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
            <p className="body-lg max-w-xl mx-auto">
              Tudo sob medida, sem template genérico. Seu sistema, do seu jeito.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={i} className="pro-card p-8 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="icon-container">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="badge badge-success text-xs">{service.price}</span>
                </div>
                <h3 className="heading-card mb-2">{service.title}</h3>
                <p className="body-sm mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
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

      {/* ============ CASES ============ */}
      <section className="px-6 py-16" id="cases">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="badge badge-success mb-4 mx-auto w-fit">
              <Star className="w-4 h-4" />
              Resultados reais
            </div>
            <h2 className="heading-section mb-4">
              Quem confia na CodeSprint
            </h2>
            <p className="body-lg max-w-xl mx-auto">
              Transformações reais de negócios como o seu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs, i) => (
              <div key={i} className="pro-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-[0.04] rounded-bl-full" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="badge badge-success">
                    <Zap className="w-3 h-3" />
                    Case Ativo
                  </div>
                  <span className="text-sm text-[var(--text-muted)]">{cs.segment}</span>
                </div>

                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  {cs.client}
                </h3>

                <p className="body-sm mb-5">{cs.description}</p>

                {/* Testimonial */}
                <blockquote className="border-l-3 border-[var(--primary)] pl-4 mb-6">
                  <p className="italic text-[var(--text-muted)] text-sm leading-relaxed">
                    &ldquo;{cs.testimonial}&rdquo;
                  </p>
                  <footer className="mt-2 text-xs font-semibold text-[var(--foreground)]">
                    — {cs.author}, {cs.client}
                  </footer>
                </blockquote>

                <div className="flex items-end justify-between pt-4 border-t border-[var(--card-border)]">
                  <div>
                    <div className="text-3xl font-extrabold text-[var(--primary)]">{cs.result}</div>
                    <div className="text-sm text-[var(--text-muted)]">{cs.metric}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--text-muted)]">Prazo</div>
                    <div className="font-semibold text-[var(--foreground)]">{cs.timeline}</div>
                  </div>
                </div>
              </div>
            ))}
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
            <p className="body-lg max-w-xl mx-auto">
              Do primeiro contato ao sistema rodando em 4 passos.
            </p>
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

      {/* ============ CTA FINAL ============ */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="pro-card p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-[0.04]" />

            <div className="badge badge-cta mb-6 mx-auto w-fit relative z-10">
              <Users className="w-4 h-4" />
              Vagas limitadas
            </div>

            <h2 className="heading-section mb-4 relative z-10">
              Atendemos apenas{' '}
              <span className="text-gradient-cta">4 projetos</span> por mês
            </h2>

            <p className="body-lg mb-8 max-w-xl mx-auto relative z-10">
              Para garantir qualidade e atenção total, limitamos nossos projetos.
              Converse com a gente e garanta sua vaga.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20para%20um%20projeto."
                className="btn-cta px-10 py-5 text-lg animate-pulse-glow"
              >
                <MessageCircle className="w-6 h-6" />
                Garantir Minha Vaga
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 relative z-10">
              <Headphones className="w-4 h-4 text-[var(--text-muted)]" />
              <p className="text-sm text-[var(--text-muted)]">
                Respondemos em até 2 horas úteis
              </p>
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
                Transformamos negócios com tecnologia acessível.
                Sistemas sob medida, entrega rápida e preço justo para micro e
                pequenas empresas.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[var(--foreground)] mb-4 text-sm uppercase tracking-wider">
                Serviços
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--text-muted)]">
                <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Sites & Landing Pages</li>
                <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Dashboards & Relatórios</li>
                <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Sistemas & ERPs</li>
                <li className="hover:text-[var(--primary)] transition-colors cursor-pointer">Automações & Integrações</li>
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
