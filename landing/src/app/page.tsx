import {
  Sparkles,
  ArrowRight,
  BarChart3,
  Bot,
  Shield,
  MessageCircle,
  CheckCircle2,
  Workflow,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Package
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    icon: Workflow,
    title: 'Sistemas Web Sob Medida',
    description: 'Aplicações web modernas construídas com sprints semanais e validações constantes.',
    features: ['Entregas incrementais', 'Feedback contínuo', 'Escopo gerenciado']
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Relatórios',
    description: 'Visualização de dados em tempo real para tomada de decisão estratégica.',
    features: ['KPIs personalizados', 'Alertas inteligentes', 'Relatórios automáticos']
  },
  {
    icon: Package,
    title: 'Sistemas ERP',
    description: 'Gestão integrada de estoque, vendas e financeiro para operações eficientes.',
    features: ['Controle de estoque', 'PDV completo', 'Gestão financeira']
  },
  {
    icon: MessageCircle,
    title: 'Integrações & Automações',
    description: 'Conectamos seus sistemas existentes e automatizamos processos repetitivos.',
    features: ['APIs e webhooks', 'WhatsApp Business', 'Fluxos automatizados']
  }
];

const caseStudies = [
  {
    client: 'Loja do Monstrão',
    segment: 'Moda Masculina Premium',
    result: '+R$ 53.200',
    metric: 'ROI no Ano 1',
    description: 'Sistema de captação de leads entregue em ciclos ágeis com validação semanal.',
    timeline: '20 dias'
  },
  {
    client: 'Estoque Fácil',
    segment: 'SaaS Fashion ERP',
    result: '100%',
    metric: 'Offline-First',
    description: 'ERP completo desenvolvido com metodologia ágil e entregas incrementais.',
    timeline: 'Em produção'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Descoberta',
    description: 'Entendemos seu negócio, dores e objetivos.',
    duration: '1-2 dias'
  },
  {
    step: 2,
    title: 'Proposta',
    description: 'Apresentamos solução técnica com ROI projetado.',
    duration: '2-3 dias'
  },
  {
    step: 3,
    title: 'Desenvolvimento',
    description: 'Construímos com sprints semanais e validações.',
    duration: '2-4 semanas'
  },
  {
    step: 4,
    title: 'Entrega',
    description: 'Deploy, treinamento e suporte contínuo.',
    duration: 'Ongoing'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header - Dark bar to match logo */}
      <header className="px-6 py-4 bg-[#0B1120]">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="CodeSprint"
            width={180}
            height={45}
            className="h-10 md:h-12 w-auto"
            priority
          />
          <Link
            href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20CodeSprint."
            className="bg-white text-[#0B1120] px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Fale Conosco</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="badge badge-primary mb-6 mx-auto w-fit">
            <Zap className="w-4 h-4" />
            Desenvolvimento Ágil
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] leading-tight mb-6">
            Sistemas que{' '}
            <span className="text-gradient-pro">transformam</span>
            <br />
            operações em resultados
          </h1>

          <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
            Desenvolvemos software sob medida com entregas semanais, validações
            constantes e escopo gerenciado — sem surpresas no orçamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20agendar%20uma%20consultoria%20gratuita."
              className="btn-accent px-8 py-4 text-lg flex items-center justify-center gap-2"
            >
              Agendar Consultoria Gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#cases"
              className="px-8 py-4 text-lg border border-[var(--card-border)] rounded-xl text-[var(--foreground)] hover:border-[var(--primary)] transition-colors flex items-center justify-center gap-2"
            >
              Ver Cases de Sucesso
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--success)]" />
              <span>Dados protegidos (LGPD)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--primary)]" />
              <span>Entrega em até 4 semanas</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
              <span>ROI garantido por contrato</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-16 section-alt" id="servicos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              O Que Construímos
            </h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto">
              Sistemas sob medida com processo ágil e entregas incrementais
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="pro-card p-8">
                <div className="icon-container mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                  {service.title}
                </h3>
                <p className="text-[var(--text-muted)] mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--foreground)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="px-6 py-16" id="cases">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Cases de Sucesso
            </h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto">
              Resultados reais que comprovam nosso método
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div key={index} className="pro-card p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-5 rounded-bl-full" />

                <div className="flex items-center gap-3 mb-4">
                  <div className="badge badge-success">
                    <Zap className="w-3 h-3" />
                    Case Ativo
                  </div>
                  <span className="text-sm text-[var(--text-muted)]">{caseStudy.segment}</span>
                </div>

                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  {caseStudy.client}
                </h3>

                <p className="text-[var(--text-muted)] mb-6">
                  {caseStudy.description}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-[var(--primary)]">{caseStudy.result}</div>
                    <div className="text-sm text-[var(--text-muted)]">{caseStudy.metric}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--text-muted)]">Timeline</div>
                    <div className="font-semibold text-[var(--foreground)]">{caseStudy.timeline}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-16 section-alt" id="processo">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Nosso Processo
            </h2>
            <p className="text-[var(--text-muted)] max-w-xl mx-auto">
              Do briefing ao deploy em sprints ágeis
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="pro-card p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">
                    {step.description}
                  </p>
                  <div className="text-xs text-[var(--primary)] font-medium">
                    {step.duration}
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-[var(--card-border)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="pro-card p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-5" />

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 relative z-10">
              Pronto para transformar seu negócio?
            </h2>
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-xl mx-auto relative z-10">
              Agende uma consultoria gratuita e descubra como podemos aumentar sua eficiência operacional.
            </p>

            <Link
              href="https://wa.me/5511960552522?text=Ol%C3%A1!%20Quero%20agendar%20uma%20consultoria%20gratuita."
              className="btn-accent px-10 py-5 text-lg inline-flex items-center gap-3 relative z-10"
            >
              <MessageCircle className="w-6 h-6" />
              Conversar no WhatsApp
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-sm text-[var(--text-muted)] mt-6 relative z-10">
              Respondemos em até 2 horas úteis
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image
                src="/logo.png"
                alt="CodeSprint"
                width={150}
                height={38}
                className="h-8 w-auto mb-4"
              />
              <p className="text-sm text-[var(--text-muted)]">
                Software house com metodologia ágil: entregas semanais,
                validações constantes e escopo gerenciado.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-4">Serviços</h4>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li>Sistemas Web Sob Medida</li>
                <li>Dashboards & Relatórios</li>
                <li>Sistemas ERP</li>
                <li>Integrações & Automações</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--foreground)] mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (11) 96055-2522
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  contato@codesprint.com.br
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  São Paulo, SP
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © 2026 CodeSprint. Todos os direitos reservados.
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              CNPJ: XX.XXX.XXX/0001-XX
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
