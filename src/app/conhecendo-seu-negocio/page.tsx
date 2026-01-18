'use client';

import { useState } from 'react';
import { Send, Sparkles, CheckCircle2, Building2, Target, Users, Palette, Camera, Gift, Phone, Star, ChevronDown, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const WHATSAPP_LINK = "https://wa.me/5511960552522";

export default function ConhecendoSeuNegocio() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [customInputs, setCustomInputs] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        { icon: Building2, title: 'Seu Negócio', desc: 'Informações básicas' },
        { icon: Target, title: 'Objetivo', desc: 'O que você quer' },
        { icon: Users, title: 'Seu Cliente', desc: 'Quem você atende' },
        { icon: Palette, title: 'Visual', desc: 'Estilo da página' },
        { icon: Camera, title: 'Materiais', desc: 'O que você tem' },
        { icon: Gift, title: 'Oferta', desc: 'Preços e promoções' },
        { icon: Phone, title: 'Contato', desc: 'Como te encontrar' },
        { icon: Star, title: 'Finalizar', desc: 'Enviar briefing' }
    ];

    const handleSelect = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        if (value !== 'outro') setCustomInputs({ ...customInputs, [name]: '' });
    };

    const handleCustom = (name: string, value: string) => {
        setCustomInputs({ ...customInputs, [name]: value });
    };

    const handleInput = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const getValue = (name: string) => formData[name] === 'outro' ? customInputs[name] : formData[name];

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Prepare data for database
        const briefingData = {
            nome: getValue('nome'),
            empresa: getValue('empresa'),
            whatsapp: getValue('whatsapp'),
            nicho: getValue('nicho'),
            tempo_mercado: getValue('tempo'),
            local_atuacao: getValue('local'),
            objetivo: getValue('objetivo'),
            acao_desejada: getValue('acao'),
            servico_principal: getValue('servico'),
            publico: getValue('publico'),
            renda: getValue('renda'),
            dor_principal: getValue('dor'),
            diferencial: getValue('diferencial'),
            clima: getValue('clima'),
            cores: getValue('cores'),
            tem_logo: getValue('logo'),
            estilo: getValue('estilo'),
            tem_fotos: getValue('fotos'),
            tem_depoimentos: getValue('depoimentos'),
            numeros: getValue('numeros'),
            instagram: getValue('instagram'),
            mostrar_precos: getValue('preco'),
            faixa_preco: getValue('faixa'),
            promocao: getValue('promocao'),
            garantia: getValue('garantia'),
            formas_pagamento: getValue('pagamento'),
            whatsapp_contato: getValue('whatsappFinal'),
            horario: getValue('horario'),
            tempo_resposta: getValue('resposta'),
            urgencia: getValue('urgencia'),
            investimento: getValue('investimento'),
            observacoes: getValue('observacao'),
            status: 'novo'
        };

        try {
            // Save to Supabase
            await supabase.from('briefings').insert([briefingData]);
        } catch (error) {
            console.error('Erro ao salvar briefing:', error);
        }

        // Open WhatsApp
        const data = Object.entries(formData).map(([k, v]) => `*${k}:* ${v === 'outro' ? customInputs[k] : v}`).join('\n');
        const msg = encodeURIComponent(`🚀 *NOVO BRIEFING - LANDING PAGE*\n\n${data}\n\n_Enviado pelo formulário CodeSprint_`);
        window.open(`${WHATSAPP_LINK}?text=${msg}`, '_blank');

        setIsSubmitting(false);
    };

    const OptionCard = ({ name, options, label }: { name: string; options: string[]; label: string }) => (
        <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-3">{label}</label>
            <div className="grid grid-cols-2 gap-2">
                {options.map(opt => (
                    <button key={opt} type="button" onClick={() => handleSelect(name, opt)}
                        className={`p-3 text-left text-sm rounded-xl border transition-all ${formData[name] === opt ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-800/30 border-cyan-500/20 text-slate-300 hover:border-cyan-500/50'}`}>
                        {formData[name] === opt && <CheckCircle2 className="w-4 h-4 inline mr-2 text-cyan-400" />}
                        {opt === 'outro' ? '✏️ Outro...' : opt}
                    </button>
                ))}
            </div>
            {formData[name] === 'outro' && (
                <input type="text" placeholder="Digite aqui..." value={customInputs[name] || ''} onChange={(e) => handleCustom(name, e.target.value)}
                    className="mt-2 w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 transition-all" />
            )}
        </div>
    );

    const TextInput = ({ name, label, placeholder, required = false }: { name: string; label: string; placeholder: string; required?: boolean }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">{label} {required && <span className="text-red-400">*</span>}</label>
            <input type="text" value={formData[name] || ''} onChange={(e) => handleInput(name, e.target.value)} placeholder={placeholder}
                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 transition-all" />
        </div>
    );

    const renderStep = () => {
        switch (currentStep) {
            case 0: return (<>
                <TextInput name="nome" label="Seu nome" placeholder="Ex: Ana Silva" required />
                <TextInput name="empresa" label="Nome da empresa/marca" placeholder="Ex: Studio Ana Beauty" required />
                <TextInput name="whatsapp" label="WhatsApp" placeholder="(11) 99999-9999" required />
                <OptionCard name="nicho" label="Qual seu nicho?" options={['Estética/Beleza', 'Moda/Roupas', 'Saúde/Fitness', 'Alimentação', 'Advocacia', 'Consultoria', 'Educação/Cursos', 'Imóveis', 'Serviços Gerais', 'outro']} />
                <OptionCard name="tempo" label="Há quanto tempo está no mercado?" options={['Começando agora', 'Menos de 1 ano', '1-3 anos', '3-5 anos', 'Mais de 5 anos']} />
                <OptionCard name="local" label="Onde você atende?" options={['Apenas minha cidade', 'Meu estado', 'Brasil todo', 'Online/Remoto', 'outro']} />
            </>);
            case 1: return (<>
                <OptionCard name="objetivo" label="Qual o objetivo PRINCIPAL da página?" options={['Receber contatos no WhatsApp', 'Vender produto/serviço', 'Capturar e-mails', 'Mostrar portfólio', 'Divulgar evento', 'outro']} />
                <OptionCard name="acao" label="O que o visitante deve fazer?" options={['Clicar no WhatsApp', 'Preencher formulário', 'Ver catálogo/preços', 'Agendar horário', 'Comprar direto', 'outro']} />
                <OptionCard name="servico" label="Seu serviço principal" options={['Procedimentos estéticos', 'Consultoria/Assessoria', 'Produtos físicos', 'Cursos/Mentorias', 'Serviços de manutenção', 'Eventos/Festas', 'outro']} />
            </>);
            case 2: return (<>
                <OptionCard name="publico" label="Quem é seu cliente ideal?" options={['Mulheres 18-35', 'Mulheres 35-55', 'Homens 18-35', 'Homens 35-55', 'Empresas/B2B', 'Público geral', 'outro']} />
                <OptionCard name="renda" label="Poder aquisitivo do cliente" options={['Classe C (popular)', 'Classe B (médio)', 'Classe A (premium)', 'Misto']} />
                <OptionCard name="dor" label="Qual a maior dor do seu cliente?" options={['Falta de tempo', 'Falta de dinheiro', 'Não sabe como resolver', 'Já tentou e não deu certo', 'Quer resultado rápido', 'Quer qualidade/premium', 'outro']} />
                <OptionCard name="diferencial" label="Seu diferencial principal" options={['Preço acessível', 'Qualidade premium', 'Atendimento rápido', 'Experiência no mercado', 'Resultados comprovados', 'Atendimento personalizado', 'outro']} />
            </>);
            case 3: return (<>
                <OptionCard name="clima" label="Qual clima quer passar?" options={['Profissional/Sério', 'Jovem/Descolado', 'Luxuoso/Premium', 'Acessível/Popular', 'Moderno/Tech', 'Acolhedor/Familiar', 'Minimalista', 'outro']} />
                <OptionCard name="cores" label="Cores preferidas" options={['Rosa/Feminino', 'Azul/Confiança', 'Verde/Natural', 'Preto/Elegante', 'Dourado/Luxo', 'Colorido/Vibrante', 'Deixo vocês escolherem', 'outro']} />
                <OptionCard name="logo" label="Você tem logo?" options={['Sim, profissional', 'Sim, mas simples', 'Não tenho', 'Preciso criar']} />
                <OptionCard name="estilo" label="Estilo de design" options={['Moderno/Tecnológico', 'Elegante/Sofisticado', 'Divertido/Colorido', 'Clássico/Tradicional', 'Minimalista/Clean', 'outro']} />
            </>);
            case 4: return (<>
                <OptionCard name="fotos" label="Você tem fotos profissionais?" options={['Sim, do produto/serviço', 'Sim, minhas/da equipe', 'Tenho do celular', 'Não tenho (usem banco)', 'Vou providenciar']} />
                <OptionCard name="depoimentos" label="Tem depoimentos de clientes?" options={['Sim, prints de WhatsApp', 'Sim, avaliações Google', 'Tenho vídeos', 'Não tenho ainda']} />
                <OptionCard name="numeros" label="Números para mostrar" options={['+50 clientes', '+100 clientes', '+500 clientes', 'X anos no mercado', 'Não tenho números', 'outro']} />
                <OptionCard name="instagram" label="Tem Instagram ativo?" options={['Sim, com bastante conteúdo', 'Sim, mas pouco', 'Tenho mas não uso', 'Não tenho']} />
            </>);
            case 5: return (<>
                <OptionCard name="preco" label="Quer mostrar preços?" options={['Sim, valor fixo', 'Sim, "a partir de"', 'Não, só pelo WhatsApp', 'Tabela de preços completa']} />
                <OptionCard name="faixa" label="Faixa de preço do serviço" options={['Até R$ 100', 'R$ 100 - R$ 500', 'R$ 500 - R$ 1.000', 'R$ 1.000 - R$ 5.000', 'Acima de R$ 5.000', 'Variável/sob consulta']} />
                <OptionCard name="promocao" label="Tem promoção especial?" options={['Sim, desconto à vista', 'Sim, primeira compra', 'Sim, combo/pacote', 'Não tenho', 'outro']} />
                <OptionCard name="garantia" label="Oferece garantia?" options={['Sim, devolução', 'Sim, satisfação', 'Garantia do produto', 'Não ofereço', 'outro']} />
                <OptionCard name="pagamento" label="Formas de pagamento" options={['Pix', 'Cartão', 'Pix + Cartão', 'Todas (pix, cartão, boleto)', 'outro']} />
            </>);
            case 6: return (<>
                <TextInput name="whatsappFinal" label="WhatsApp para receber contatos" placeholder="(11) 99999-9999" required />
                <TextInput name="instagramLink" label="@ do Instagram" placeholder="@suaempresa" />
                <OptionCard name="horario" label="Horário de atendimento" options={['Comercial (9h-18h)', 'Manhã e tarde', 'Noite também', '24 horas', 'Só agendamento']} />
                <OptionCard name="resposta" label="Tempo de resposta" options={['Até 30 minutos', 'Até 1 hora', 'Até 24 horas', 'Variável']} />
            </>);
            case 7: return (<>
                <OptionCard name="urgencia" label="Qual a urgência?" options={['Preciso para ontem! 🔥', 'Essa semana', 'Próximos 15 dias', 'Sem pressa']} />
                <OptionCard name="investimento" label="Investimento previsto" options={['Até R$ 500', 'R$ 500 - R$ 1.000', 'R$ 1.000 - R$ 2.000', 'Acima de R$ 2.000', 'Quero saber o preço']} />
                <TextInput name="observacao" label="Algo mais que queira contar? (opcional)" placeholder="Detalhes extras, dúvidas..." />
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-green-400 text-sm text-center">✅ Perfeito! Você receberá <strong>3 opções de layout</strong> em até 3 dias úteis!</p>
                </div>
            </>);
            default: return null;
        }
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <main className="relative min-h-screen bg-[#0B1120]">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

            <header className="relative z-10 px-4 py-4">
                <nav className="max-w-3xl mx-auto flex items-center justify-between">
                    <Link href="/"><Image src="/logo.png" alt="CodeSprint" width={150} height={38} className="h-8 w-auto" priority /></Link>
                    <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full hidden sm:block">Briefing</span>
                </nav>
            </header>

            <section className="relative z-10 px-4 py-6">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-xl md:text-2xl font-bold text-white mb-1">{steps[currentStep].title}</h1>
                        <p className="text-slate-400 text-sm">{steps[currentStep].desc}</p>
                    </div>

                    <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6">
                        <div className="bg-gradient-to-r from-cyan-500 to-green-400 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 md:p-6">
                        {renderStep()}

                        <div className="flex gap-3 mt-6">
                            {currentStep > 0 && (
                                <button onClick={() => setCurrentStep(currentStep - 1)} className="flex-1 py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-all text-sm">
                                    ← Voltar
                                </button>
                            )}
                            {currentStep < steps.length - 1 ? (
                                <button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 py-3 bg-[#128C7E] text-white font-bold rounded-xl hover:bg-[#075E54] transition-all text-sm flex items-center justify-center gap-2">
                                    Próximo →
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed" style={{ boxShadow: '0 0 30px rgba(37, 211, 102, 0.4)' }}>
                                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Enviar pelo WhatsApp</>}
                                </button>
                            )}
                        </div>
                    </div>

                    <p className="text-center text-slate-500 text-xs mt-4">🔒 Informações confidenciais • CodeSprint</p>
                </div>
            </section>
        </main>
    );
}
