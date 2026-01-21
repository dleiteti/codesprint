'use client';

import { useState, useCallback, memo } from 'react';
import { Send, Sparkles, CheckCircle2, Building2, Target, Palette, Loader2, Users, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const WHATSAPP_LINK = "https://wa.me/5511960552522";

const TextInput = memo(({ name, label, placeholder, required = false, value, onChange }: {
    name: string; label: string; placeholder: string; required?: boolean; value: string; onChange: (value: string) => void;
}) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-white mb-2">{label} {required && <span className="text-red-400">*</span>}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 transition-all" />
    </div>
));

const MultiSelectCard = memo(({ name, options, label, selected, onToggle }: {
    name: string; options: string[]; label: string; selected: string[]; onToggle: (value: string) => void;
}) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-white mb-3">{label} <span className="text-cyan-400 text-xs">(Pode escolher mais de uma)</span></label>
        <div className="grid grid-cols-2 gap-2">
            {options.map(opt => (
                <button key={opt} type="button" onClick={() => onToggle(opt)}
                    className={`p-3 text-left text-sm rounded-xl border transition-all ${selected.includes(opt) ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-800/30 border-cyan-500/20 text-slate-300 hover:border-cyan-500/50'}`}>
                    {selected.includes(opt) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-cyan-400" />}
                    {opt}
                </button>
            ))}
        </div>
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

export default function ConhecendoSeuNegocio() {
    const [formData, setFormData] = useState<Record<string, string | string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const handleInput = useCallback((name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSelect = useCallback((name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleMultiToggle = useCallback((name: string, value: string) => {
        setFormData(prev => {
            const current = Array.isArray(prev[name]) ? prev[name] as string[] : [];
            const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
            return { ...prev, [name]: updated };
        });
    }, []);

    const getStringValue = (name: string): string => {
        const value = formData[name];
        return Array.isArray(value) ? '' : (value || '');
    };

    const getArrayValue = (name: string): string[] => {
        const value = formData[name];
        return Array.isArray(value) ? value : [];
    };

    const handleSubmit = async () => {
        if (!formData.nome || !formData.whatsapp) {
            alert('Por favor, preencha seu nome e WhatsApp');
            return;
        }

        setIsSubmitting(true);

        const briefingData = {
            nome: getStringValue('nome'),
            whatsapp: getStringValue('whatsapp'),
            empresa: getStringValue('empresa'),
            nicho: getArrayValue('nicho').join(', '),
            objetivo: getArrayValue('objetivo').join(', '),
            clima: getStringValue('estilo'),
            cores_preferidas: getStringValue('cores'),
            publico_resumo: getStringValue('publico'),
            diferencial_curto: getStringValue('diferencial'),
            referencia_visual: getStringValue('referencia'),
            etapa: 'mockup',
            status: 'novo'
        };

        try {
            await supabase.from('briefings').insert([briefingData]);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }

        const msg = encodeURIComponent(`🚀 *NOVO BRIEFING*\n\n*Nome:* ${briefingData.nome}\n*Empresa:* ${briefingData.empresa}\n*Nicho:* ${briefingData.nicho}\n*Objetivo:* ${briefingData.objetivo}\n*Estilo:* ${briefingData.clima}\n*Cores:* ${briefingData.cores_preferidas}\n*Público:* ${briefingData.publico_resumo}\n*Diferencial:* ${briefingData.diferencial_curto}\n\n_Pronto para gerar mockups!_`);
        window.open(`${WHATSAPP_LINK}?text=${msg}`, '_blank');

        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <main className="relative min-h-screen bg-[#0B1120] flex items-center justify-center p-4">
                <div className="max-w-md text-center">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Briefing Enviado! 🎉</h1>
                    <p className="text-slate-300 mb-6">Agora vamos criar <strong className="text-cyan-400">3 opções de layout</strong> para você escolher.</p>
                    <div className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4 mb-6">
                        <p className="text-sm text-slate-400">📱 Prazo de entrega dos mockups:</p>
                        <p className="text-xl font-bold text-white">Até 48 horas</p>
                    </div>
                    <p className="text-slate-500 text-sm">Você receberá as opções pelo WhatsApp!</p>
                </div>
            </main>
        );
    }

    const steps = [
        { title: 'Básico', desc: 'Seus dados' },
        { title: 'Visual', desc: 'Estilo desejado' }
    ];

    const renderStep = () => {
        if (currentStep === 0) {
            return (<>
                <TextInput name="nome" label="Seu nome" placeholder="Ex: Ana Silva" required value={getStringValue('nome')} onChange={(v) => handleInput('nome', v)} />
                <TextInput name="whatsapp" label="WhatsApp" placeholder="(11) 99999-9999" required value={getStringValue('whatsapp')} onChange={(v) => handleInput('whatsapp', v)} />
                <TextInput name="empresa" label="Nome da empresa/marca" placeholder="Ex: Studio Ana Beauty" value={getStringValue('empresa')} onChange={(v) => handleInput('empresa', v)} />
                <MultiSelectCard name="nicho" label="Qual seu nicho?" options={['Estética/Beleza', 'Moda/Roupas', 'Saúde/Fitness', 'Alimentação', 'Advocacia', 'Consultoria', 'Educação/Cursos', 'Serviços Gerais']} selected={getArrayValue('nicho')} onToggle={(v) => handleMultiToggle('nicho', v)} />
                <MultiSelectCard name="objetivo" label="O que quer com a página?" options={['Receber contatos no WhatsApp', 'Vender produto/serviço', 'Capturar e-mails', 'Mostrar portfólio', 'Divulgar evento']} selected={getArrayValue('objetivo')} onToggle={(v) => handleMultiToggle('objetivo', v)} />
            </>);
        }
        return (<>
            <OptionCard name="estilo" label="Qual estilo visual?" options={['Moderno/Tech', 'Elegante/Sofisticado', 'Jovem/Colorido', 'Minimalista/Clean', 'Acolhedor/Familiar', 'Profissional/Sério']} selected={getStringValue('estilo')} onSelect={(v) => handleSelect('estilo', v)} />
            <OptionCard name="cores" label="Cores preferidas" options={['Deixar a critério', 'Preto/Escuro', 'Branco/Claro', 'Azul/Confiança', 'Verde/Natural', 'Rosa/Feminino', 'Dourado/Luxo', 'Colorido/Vibrante']} selected={getStringValue('cores')} onSelect={(v) => handleSelect('cores', v)} />
            <OptionCard name="publico" label="Seu público principal" options={['Mulheres 18-35', 'Mulheres 35+', 'Homens 18-35', 'Homens 35+', 'Empresas/B2B', 'Público geral']} selected={getStringValue('publico')} onSelect={(v) => handleSelect('publico', v)} />
            <TextInput name="diferencial" label="Seu principal diferencial (1 frase)" placeholder="Ex: Atendimento personalizado, 10 anos de experiência..." value={getStringValue('diferencial')} onChange={(v) => handleInput('diferencial', v)} />
            <TextInput name="referencia" label="Algum site que você gosta? (opcional)" placeholder="Ex: www.exemplo.com" value={getStringValue('referencia')} onChange={(v) => handleInput('referencia', v)} />
        </>);
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <main className="relative min-h-screen bg-[#0B1120]">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

            <header className="relative z-10 px-4 py-4">
                <nav className="max-w-xl mx-auto flex items-center justify-between">
                    <Link href="/"><Image src="/logo.png" alt="CodeSprint" width={150} height={38} className="h-8 w-auto" priority /></Link>
                    <span className="text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full">⚡ 2 etapas • 2 min</span>
                </nav>
            </header>

            <section className="relative z-10 px-4 py-6">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Vamos criar sua Landing Page!</h1>
                        <p className="text-slate-400">Etapa {currentStep + 1} de {steps.length}: <strong className="text-cyan-400">{steps[currentStep].title}</strong></p>
                    </div>

                    <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6">
                        <div className="bg-gradient-to-r from-cyan-500 to-green-400 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 md:p-6">
                        {renderStep()}

                        <div className="flex gap-3 mt-6">
                            {currentStep > 0 && (
                                <button onClick={() => setCurrentStep(0)} className="flex-1 py-3 bg-slate-700 text-white font-medium rounded-xl hover:bg-slate-600 transition-all">
                                    ← Voltar
                                </button>
                            )}
                            {currentStep === 0 ? (
                                <button onClick={() => setCurrentStep(1)} className="flex-1 py-3 bg-[#128C7E] text-white font-bold rounded-xl hover:bg-[#075E54] transition-all">
                                    Próximo →
                                </button>
                            ) : (
                                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50" style={{ boxShadow: '0 0 30px rgba(37, 211, 102, 0.4)' }}>
                                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Enviar e Receber Mockups</>}
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
