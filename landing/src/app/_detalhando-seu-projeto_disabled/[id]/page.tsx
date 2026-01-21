'use client';

import { useState, useCallback, useEffect, memo } from 'react';
import { Send, CheckCircle2, Users, Camera, Gift, Phone, Star, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const WHATSAPP_LINK = "https://wa.me/5511960552522";

const TextInput = memo(({ name, label, placeholder, required = false, value, onChange }: {
    name: string; label: string; placeholder: string; required?: boolean; value: string; onChange: (value: string) => void;
}) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-white mb-2">{label} {required && <span className="text-red-400">*</span>}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 transition-all" />
    </div>
));

const TextArea = memo(({ name, label, placeholder, value, onChange }: {
    name: string; label: string; placeholder: string; value: string; onChange: (value: string) => void;
}) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-white mb-2">{label}</label>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3}
            className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 transition-all resize-none" />
    </div>
));

const OptionCard = memo(({ name, options, label, selected, onSelect }: {
    name: string; options: string[]; label: string; selected: string; onSelect: (value: string) => void;
}) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-white mb-3">{label}</label>
        <div className="grid grid-cols-2 gap-2">
            {options.map(opt => (
                <button key={opt} type="button" onClick={() => onSelect(opt)}
                    className={`p-3 text-left text-sm rounded-xl border transition-all ${selected === opt ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-800/30 border-cyan-500/20 text-slate-300 hover:border-cyan-500/50'}`}>
                    {selected === opt && <CheckCircle2 className="w-4 h-4 inline mr-2 text-cyan-400" />}
                    {opt}
                </button>
            ))}
        </div>
    </div>
));

interface BriefingData {
    id: string;
    nome: string;
    empresa: string;
    nicho: string;
    objetivo: string;
    clima: string;
}

export default function DetalhandoSeuProjeto() {
    const params = useParams();
    const briefingId = params.id as string;

    const [briefing, setBriefing] = useState<BriefingData | null>(null);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { icon: Users, title: 'Seu Cliente', desc: 'Quem você atende' },
        { icon: Camera, title: 'Materiais', desc: 'Fotos e depoimentos' },
        { icon: Gift, title: 'Oferta', desc: 'Preços e promoções' },
        { icon: Phone, title: 'Contato', desc: 'Redes e atendimento' },
        { icon: Star, title: 'Finalizar', desc: 'Últimos detalhes' }
    ];

    useEffect(() => {
        const loadBriefing = async () => {
            const { data, error } = await supabase
                .from('briefings')
                .select('id, nome, empresa, nicho, objetivo, clima')
                .eq('id', briefingId)
                .single();

            if (error || !data) {
                setError('Briefing não encontrado. Verifique o link.');
            } else {
                setBriefing(data);
            }
            setIsLoading(false);
        };

        if (briefingId) loadBriefing();
    }, [briefingId]);

    const handleInput = useCallback((name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const updateData = {
            publico: formData.publico,
            renda: formData.renda,
            dor_principal: formData.dor,
            diferencial: formData.diferencial,
            tem_fotos: formData.fotos,
            tem_depoimentos: formData.depoimentos,
            numeros: formData.numeros,
            mostrar_precos: formData.preco,
            faixa_preco: formData.faixa,
            promocao: formData.promocao,
            garantia: formData.garantia,
            formas_pagamento: formData.pagamento,
            whatsapp_contato: formData.whatsappFinal,
            instagram: formData.instagram,
            horario: formData.horario,
            tempo_resposta: formData.resposta,
            urgencia: formData.urgencia,
            observacoes: formData.observacao,
            etapa: 'completo',
            detalhes_enviado_em: new Date().toISOString()
        };

        try {
            await supabase.from('briefings').update(updateData).eq('id', briefingId);
        } catch (err) {
            console.error('Erro:', err);
        }

        const msg = encodeURIComponent(`✅ *BRIEFING COMPLETO*\n\n*Cliente:* ${briefing?.nome}\n*Empresa:* ${briefing?.empresa}\n\n_Detalhes preenchidos! Pronto para desenvolver._`);
        window.open(`${WHATSAPP_LINK}?text=${msg}`, '_blank');

        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-[#0B1120] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h1 className="text-xl font-bold text-white mb-2">Link Inválido</h1>
                    <p className="text-slate-400">{error}</p>
                </div>
            </main>
        );
    }

    if (submitted) {
        return (
            <main className="min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Tudo Pronto! 🎉</h1>
                    <p className="text-slate-300 mb-6">Agora vamos desenvolver sua <strong className="text-cyan-400">Landing Page</strong> completa!</p>
                    <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm text-slate-400">Prazo de entrega:</p>
                        <p className="text-xl font-bold text-white">3 a 5 dias úteis</p>
                    </div>
                </div>
            </main>
        );
    }

    const renderStep = () => {
        switch (currentStep) {
            case 0: return (<>
                <OptionCard name="publico" label="Quem é seu cliente ideal?" options={['Mulheres 18-35', 'Mulheres 35-55', 'Homens 18-35', 'Homens 35-55', 'Empresas/B2B', 'Público geral']} selected={formData.publico || ''} onSelect={(v) => handleInput('publico', v)} />
                <OptionCard name="renda" label="Poder aquisitivo" options={['Classe C (popular)', 'Classe B (médio)', 'Classe A (premium)', 'Misto']} selected={formData.renda || ''} onSelect={(v) => handleInput('renda', v)} />
                <TextArea name="dor" label="Qual a maior dor do seu cliente?" placeholder="O que tira o sono dele?" value={formData.dor || ''} onChange={(v) => handleInput('dor', v)} />
                <TextArea name="diferencial" label="Seu diferencial principal" placeholder="Por que devem escolher você?" value={formData.diferencial || ''} onChange={(v) => handleInput('diferencial', v)} />
            </>);
            case 1: return (<>
                <OptionCard name="fotos" label="Você tem fotos profissionais?" options={['Sim, do produto/serviço', 'Sim, minhas/da equipe', 'Tenho do celular', 'Não tenho (usem banco)']} selected={formData.fotos || ''} onSelect={(v) => handleInput('fotos', v)} />
                <OptionCard name="depoimentos" label="Tem depoimentos de clientes?" options={['Sim, prints de WhatsApp', 'Sim, avaliações Google', 'Tenho vídeos', 'Não tenho ainda']} selected={formData.depoimentos || ''} onSelect={(v) => handleInput('depoimentos', v)} />
                <TextInput name="numeros" label="Números para mostrar (opcional)" placeholder="Ex: +200 clientes, 10 anos no mercado..." value={formData.numeros || ''} onChange={(v) => handleInput('numeros', v)} />
            </>);
            case 2: return (<>
                <OptionCard name="preco" label="Quer mostrar preços?" options={['Sim, valor fixo', 'Sim, "a partir de"', 'Não, só pelo WhatsApp']} selected={formData.preco || ''} onSelect={(v) => handleInput('preco', v)} />
                <OptionCard name="faixa" label="Faixa de preço" options={['Até R$ 100', 'R$ 100 - R$ 500', 'R$ 500 - R$ 1.000', 'R$ 1.000+', 'Sob consulta']} selected={formData.faixa || ''} onSelect={(v) => handleInput('faixa', v)} />
                <TextInput name="promocao" label="Tem promoção especial?" placeholder="Ex: 10% desconto à vista..." value={formData.promocao || ''} onChange={(v) => handleInput('promocao', v)} />
                <OptionCard name="pagamento" label="Formas de pagamento" options={['Pix', 'Cartão', 'Pix + Cartão', 'Todas']} selected={formData.pagamento || ''} onSelect={(v) => handleInput('pagamento', v)} />
            </>);
            case 3: return (<>
                <TextInput name="whatsappFinal" label="WhatsApp para a página" placeholder="(11) 99999-9999" value={formData.whatsappFinal || ''} onChange={(v) => handleInput('whatsappFinal', v)} />
                <TextInput name="instagram" label="Instagram" placeholder="@suaempresa" value={formData.instagram || ''} onChange={(v) => handleInput('instagram', v)} />
                <OptionCard name="horario" label="Horário de atendimento" options={['Comercial (9h-18h)', 'Manhã e tarde', 'Noite também', '24 horas']} selected={formData.horario || ''} onSelect={(v) => handleInput('horario', v)} />
            </>);
            case 4: return (<>
                <OptionCard name="urgencia" label="Qual a urgência?" options={['Preciso para ontem! 🔥', 'Essa semana', 'Próximos 15 dias', 'Sem pressa']} selected={formData.urgencia || ''} onSelect={(v) => handleInput('urgencia', v)} />
                <TextArea name="observacao" label="Algo mais? (opcional)" placeholder="Detalhes extras, dúvidas..." value={formData.observacao || ''} onChange={(v) => handleInput('observacao', v)} />
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                    <p className="text-green-400 text-sm text-center">✅ Após enviar, iniciaremos o desenvolvimento!</p>
                </div>
            </>);
            default: return null;
        }
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <main className="relative min-h-screen bg-[#0B1120]">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />

            <header className="relative z-10 px-4 py-4">
                <nav className="max-w-xl mx-auto flex items-center justify-between">
                    <Link href="/"><Image src="/logo.png" alt="CodeSprint" width={150} height={38} className="h-8 w-auto" priority /></Link>
                    <span className="text-xs text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">Detalhes</span>
                </nav>
            </header>

            <section className="relative z-10 px-4 py-6">
                <div className="max-w-xl mx-auto">
                    {briefing && (
                        <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4 mb-6">
                            <p className="text-sm text-slate-400">Completando briefing de:</p>
                            <p className="text-lg font-bold text-white">{briefing.empresa || briefing.nome}</p>
                        </div>
                    )}

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
                                <button onClick={() => setCurrentStep(currentStep + 1)} className="flex-1 py-3 bg-[#128C7E] text-white font-bold rounded-xl hover:bg-[#075E54] transition-all text-sm">
                                    Próximo →
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2" style={{ boxShadow: '0 0 30px rgba(37, 211, 102, 0.4)' }}>
                                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Finalizar</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
