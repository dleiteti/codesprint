'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Package, DollarSign, FileText, BarChart3, Smartphone, Cloud, CheckCircle2, Star } from 'lucide-react';

export default function EstoqueFacilWaitlist() {
    const [formData, setFormData] = useState({
        nome: '',
        whatsapp: '',
        loja: '',
        cidade: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Track Meta Pixel Lead event
        if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead', {
                content_name: 'Estoque Fácil - Lista de Espera',
                content_category: 'waitlist',
                value: 0,
                currency: 'BRL'
            });
        }

        // TODO: Send to backend
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    if (isSubmitted) {
        return (
            <main className="relative min-h-screen bg-grid-pattern">
                <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

                {/* Header */}
                <header className="relative z-10 px-6 py-6">
                    <nav className="max-w-6xl mx-auto flex items-center justify-start">
                        <Link href="/">
                            <Image
                                src="/logo.png"
                                alt="CodeSprint"
                                width={220}
                                height={55}
                                className="h-12 md:h-14 w-auto cursor-pointer"
                                priority
                            />
                        </Link>
                    </nav>
                </header>

                <div className="relative z-10 container mx-auto px-4 py-16 max-w-2xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Você está na Lista! 🎉</h1>

                    <p className="text-xl mb-8 text-[var(--text-muted)]">
                        Obrigado por se inscrever na lista de espera do Estoque Fácil.
                    </p>

                    <div className="glass-card p-8 mb-8 text-left">
                        <h2 className="text-2xl font-semibold mb-4">O que acontece agora:</h2>

                        <div className="space-y-4">
                            <p className="flex gap-3">
                                <span className="text-3xl">1️⃣</span>
                                <span>Em breve você receberá uma mensagem no WhatsApp confirmando sua inscrição.</span>
                            </p>

                            <p className="flex gap-3">
                                <span className="text-3xl">2️⃣</span>
                                <span>Quando o sistema estiver pronto, você será avisado ANTES de todo mundo.</span>
                            </p>

                            <p className="flex gap-3">
                                <span className="text-3xl">3️⃣</span>
                                <span>Você terá acesso ao preço de fundador com 50% OFF vitalício.</span>
                            </p>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/5511960552522?text=Oi!%20Acabei%20de%20entrar%20na%20lista%20de%20espera%20do%20Estoque%20Fácil"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#1B8A4A] text-white font-semibold text-lg rounded-full hover:scale-105 transition-transform"
                        style={{
                            boxShadow: '0 0 40px rgba(37, 211, 102, 0.5), 0 0 80px rgba(37, 211, 102, 0.3)',
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image src="/whatsapp-icon.png" alt="WhatsApp" width={28} height={28} />
                        Chamar no WhatsApp
                    </a>

                    <p className="mt-8 text-sm text-[var(--text-muted)]">
                        Enquanto isso, siga-nos no Instagram: <a href="https://instagram.com/estoquefacil" className="text-cyan-400 hover:underline">@estoquefacil</a>
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen bg-grid-pattern">
            {/* Radial Glow Overlay */}
            <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 px-6 py-6">
                <nav className="max-w-6xl mx-auto flex items-center justify-start">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="CodeSprint"
                            width={220}
                            height={55}
                            className="h-12 md:h-14 w-auto cursor-pointer"
                            priority
                        />
                    </Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative z-10 px-6 pt-12 pb-6 md:pt-20 md:pb-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
                        style={{
                            borderColor: 'rgba(200, 220, 255, 0.4)',
                            boxShadow: '0 0 20px rgba(200, 220, 255, 0.15), inset 0 0 10px rgba(200, 220, 255, 0.05)'
                        }}
                    >
                        <Sparkles className="w-4 h-4 text-[#C8E0FF]" />
                        <span className="text-sm text-[#C8E0FF]">🎯 Lista de Espera Exclusiva</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                        Chega de Caderno e Planilha.<br />
                        <span className="text-gradient">Gerencie Sua Loja pelo Celular.</span>
                    </h1>

                    <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-6 leading-relaxed px-2">
                        O <strong className="text-white">sistema mais simples do Brasil</strong> para donos de loja de roupa que querem controlar estoque, vendas e fiado — sem complicação.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(0, 212, 255, 0.5)',
                                boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
                            }}
                        >
                            <span style={{ color: '#ffffff', textShadow: '0 0 8px #1B8A4A, 0 0 15px #1B8A4A' }}>✓</span>
                            <span className="text-white font-medium">100% pelo celular</span>
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(0, 212, 255, 0.5)',
                                boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
                            }}
                        >
                            <span style={{ color: '#ffffff', textShadow: '0 0 8px #1B8A4A, 0 0 15px #1B8A4A' }}>✓</span>
                            <span className="text-white font-medium">Funciona sem internet</span>
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 rounded-full"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(0, 212, 255, 0.5)',
                                boxShadow: '0 0 15px rgba(0, 212, 255, 0.2)',
                            }}
                        >
                            <span style={{ color: '#ffffff', textShadow: '0 0 8px #1B8A4A, 0 0 15px #1B8A4A' }}>✓</span>
                            <span className="text-white font-medium">Feito pra quem não é de tecnologia</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problema Section */}
            <section className="relative z-10 px-6 py-16">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">Você se identifica?</h2>

                    <div className="grid gap-4">
                        {[
                            'Perde vendas porque não sabe o que tem em estoque',
                            'Anota fiado no caderno e esquece de cobrar',
                            'Não sabe se está tendo lucro ou prejuízo',
                            'Já tentou outros sistemas, mas eram complicados demais'
                        ].map((problem, i) => (
                            <div key={i} className="glass-card p-4 flex gap-4 items-start" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                                <span className="text-2xl">❌</span>
                                <p className="text-[var(--text-muted)]">{problem}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center mt-8 text-lg text-[var(--text-muted)]">
                        Se você respondeu &quot;sim&quot; para qualquer uma dessas,<br />
                        <strong className="text-white">o Estoque Fácil foi feito pra você.</strong>
                    </p>
                </div>
            </section>

            {/* Solução Section */}
            <section className="relative z-10 px-6 py-16">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">Um Sistema que Funciona do Seu Jeito</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: <Package className="w-10 h-10" />, title: 'Estoque', desc: 'Veja o que tem' },
                            { icon: <DollarSign className="w-10 h-10" />, title: 'Vendas', desc: 'Registre em 3 toques' },
                            { icon: <FileText className="w-10 h-10" />, title: 'Fiado', desc: 'Nunca mais esqueça' },
                            { icon: <BarChart3 className="w-10 h-10" />, title: 'Relatórios', desc: 'Saiba seu lucro' },
                            { icon: <Smartphone className="w-10 h-10" />, title: 'Celular', desc: 'Sem computador' },
                            { icon: <Cloud className="w-10 h-10" />, title: 'Offline', desc: 'Funciona sem wifi' }
                        ].map((feature, i) => (
                            <div key={i} className="glass-card p-6 text-center hover:scale-105 transition-transform">
                                <div className="text-cyan-400 mb-4 flex justify-center">{feature.icon}</div>
                                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                                <p className="text-[var(--text-muted)]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prova Social */}
            <section className="relative z-10 px-6 py-16">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">Quem Já Testou, Aprovou</h2>

                    <div className="space-y-6">
                        <div className="glass-card p-6" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <p className="text-lg mb-4 italic">
                                &quot;Finalmente um sistema que eu consigo usar! Tenho 58 anos e nunca fui de tecnologia, mas esse aqui é diferente.&quot;
                            </p>
                            <p className="text-sm text-[var(--text-muted)]">— Maria, Boutique Elegance (SP)</p>
                        </div>

                        <div className="glass-card p-6" style={{ borderLeft: '4px solid #10b981' }}>
                            <p className="text-lg mb-4 italic">
                                &quot;Descobri que estava dando R$ 2.000 de fiado e nem sabia. O sistema me salvou!&quot;
                            </p>
                            <p className="text-sm text-[var(--text-muted)]">— José, Loja do Zé (RJ)</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-cyan-400">50+</div>
                            <div className="text-sm text-[var(--text-muted)]">lojistas testando</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-yellow-400 flex items-center justify-center gap-1">
                                4.9 <Star className="w-6 h-6 fill-current" />
                            </div>
                            <div className="text-sm text-[var(--text-muted)]">de satisfação</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-400">15 min</div>
                            <div className="text-sm text-[var(--text-muted)]">para aprender</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Oferta + Formulário */}
            <section className="relative z-10 px-6 py-16">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Entre na Lista de Espera e Garanta <span className="text-gradient">Condição Especial</span>
                    </h2>

                    <div className="glass-card p-8 mb-8" style={{ borderColor: 'rgba(139, 92, 246, 0.3)' }}>
                        <div className="space-y-3 mb-6">
                            {[
                                'Acesso antecipado ao sistema',
                                'Preço de fundador (50% OFF vitalício)',
                                'Suporte prioritário por WhatsApp',
                                'Treinamento individual gratuito',
                                '30 dias grátis para testar'
                            ].map((benefit, i) => (
                                <p key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                </p>
                            ))}
                        </div>

                        <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 text-center">
                            <p className="text-sm">
                                ⚠️ Vagas de fundador limitadas — após o lançamento, o preço será reajustado para o valor regular.
                            </p>
                        </div>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium mb-2">Nome completo</label>
                            <input
                                type="text"
                                id="nome"
                                required
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="João Silva"
                            />
                        </div>

                        <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium mb-2">WhatsApp (com DDD)</label>
                            <input
                                type="tel"
                                id="whatsapp"
                                required
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="(11) 99999-9999"
                            />
                        </div>

                        <div>
                            <label htmlFor="loja" className="block text-sm font-medium mb-2">Nome da sua loja</label>
                            <input
                                type="text"
                                id="loja"
                                required
                                value={formData.loja}
                                onChange={(e) => setFormData({ ...formData, loja: e.target.value })}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="Boutique da Maria"
                            />
                        </div>

                        <div>
                            <label htmlFor="cidade" className="block text-sm font-medium mb-2">Cidade/Estado</label>
                            <input
                                type="text"
                                id="cidade"
                                required
                                value={formData.cidade}
                                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                placeholder="São Paulo/SP"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#1B8A4A] text-white font-bold py-4 px-8 rounded-full text-lg transition-all disabled:opacity-50 hover:scale-105"
                            style={{
                                boxShadow: '0 0 40px rgba(37, 211, 102, 0.5), 0 0 80px rgba(37, 211, 102, 0.3)',
                            }}
                        >
                            {isSubmitting ? 'Enviando...' : 'Garantir Minha Vaga Gratuita'}
                        </button>

                        <p className="text-center text-sm text-[var(--text-muted)]">
                            🔒 Seus dados estão seguros. Não enviamos spam.
                        </p>
                    </form>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-10 px-6 py-16">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">Perguntas Frequentes</h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'Preciso de computador?',
                                a: 'Não! O Estoque Fácil funciona 100% pelo celular. Você só precisa de um smartphone com Android ou iPhone.'
                            },
                            {
                                q: 'E se eu não tiver internet na loja?',
                                a: 'Sem problema. O sistema funciona offline e sincroniza quando você tiver conexão.'
                            },
                            {
                                q: 'Quanto vai custar?',
                                a: 'Para quem entrar na lista de espera, oferecemos 50% de desconto vitalício como fundador. O valor exato será anunciado no lançamento.'
                            },
                            {
                                q: 'Preciso saber mexer em tecnologia?',
                                a: 'O Estoque Fácil foi criado pensando em quem NÃO é de tecnologia. Se você sabe usar WhatsApp, sabe usar nosso sistema.'
                            },
                            {
                                q: 'Posso cancelar a qualquer momento?',
                                a: 'Sim! Você pode cancelar quando quiser, sem multa e sem burocracia.'
                            }
                        ].map((faq, i) => (
                            <div key={i} className="glass-card p-6">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-[var(--text-muted)]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-white/10">
                <div className="container mx-auto px-4 text-center text-[var(--text-muted)]">
                    <p className="mb-2">Estoque Fácil © 2026</p>
                    <p className="mb-4">Feito no Brasil, para lojistas brasileiros.</p>
                    <p>
                        Dúvidas? WhatsApp:{' '}
                        <a
                            href="https://wa.me/5511960552522"
                            className="text-cyan-400 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            (11) 96055-2522
                        </a>
                    </p>

                    <div className="mt-8">
                        <Link href="/" className="text-cyan-400 hover:underline">
                            ← Voltar para CodeSprint
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
