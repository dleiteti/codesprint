'use client';

import { useState, useCallback, memo } from 'react';
import { Send, Sparkles, CheckCircle2, Building2, Target, Palette, Loader2 } from 'lucide-react';
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
            etapa: 'mockup',
            status: 'novo'
        };

        try {
            await supabase.from('briefings').insert([briefingData]);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }

        const msg = encodeURIComponent(`🚀 *NOVO BRIEFING RÁPIDO*\n\n*Nome:* ${briefingData.nome}\n*Empresa:* ${briefingData.empresa}\n*WhatsApp:* ${briefingData.whatsapp}\n*Nicho:* ${briefingData.nicho}\n*Objetivo:* ${briefingData.objetivo}\n*Estilo:* ${briefingData.clima}\n\n_Aguardando mockups!_`);
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

    return (
        <main className="relative min-h-screen bg-[#0B1120]">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

            <header className="relative z-10 px-4 py-4">
                <nav className="max-w-xl mx-auto flex items-center justify-between">
                    <Link href="/"><Image src="/logo.png" alt="CodeSprint" width={150} height={38} className="h-8 w-auto" priority /></Link>
                    <span className="text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full">⚡ Rápido</span>
                </nav>
            </header>

            <section className="relative z-10 px-4 py-6">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-300 text-sm">5 perguntas • 1 minuto</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Vamos criar sua Landing Page!</h1>
                        <p className="text-slate-400">Responda rapidamente e receba <strong className="text-cyan-400">3 opções de layout</strong></p>
                    </div>

                    <div className="bg-slate-900/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-5 md:p-6">
                        <TextInput name="nome" label="Seu nome" placeholder="Ex: Ana Silva" required value={getStringValue('nome')} onChange={(v) => handleInput('nome', v)} />
                        <TextInput name="whatsapp" label="WhatsApp" placeholder="(11) 99999-9999" required value={getStringValue('whatsapp')} onChange={(v) => handleInput('whatsapp', v)} />
                        <TextInput name="empresa" label="Nome da empresa/marca" placeholder="Ex: Studio Ana Beauty" value={getStringValue('empresa')} onChange={(v) => handleInput('empresa', v)} />

                        <MultiSelectCard name="nicho" label="Qual seu nicho?" options={['Estética/Beleza', 'Moda/Roupas', 'Saúde/Fitness', 'Alimentação', 'Advocacia', 'Consultoria', 'Educação/Cursos', 'Serviços Gerais']} selected={getArrayValue('nicho')} onToggle={(v) => handleMultiToggle('nicho', v)} />

                        <MultiSelectCard name="objetivo" label="O que quer com a página?" options={['Receber contatos no WhatsApp', 'Vender produto/serviço', 'Capturar e-mails', 'Mostrar portfólio', 'Divulgar evento']} selected={getArrayValue('objetivo')} onToggle={(v) => handleMultiToggle('objetivo', v)} />

                        <OptionCard name="estilo" label="Qual estilo visual?" options={['Moderno/Tech', 'Elegante/Sofisticado', 'Jovem/Colorido', 'Minimalista/Clean', 'Acolhedor/Familiar', 'Profissional/Sério']} selected={getStringValue('estilo')} onSelect={(v) => handleSelect('estilo', v)} />

                        <button onClick={handleSubmit} disabled={isSubmitting} className="w-full py-4 mt-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-green-500 transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50" style={{ boxShadow: '0 0 30px rgba(37, 211, 102, 0.4)' }}>
                            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</> : <><Send className="w-5 h-5" /> Enviar e Receber Mockups</>}
                        </button>
                    </div>

                    <p className="text-center text-slate-500 text-xs mt-4">🔒 Informações confidenciais • CodeSprint</p>
                </div>
            </section>
        </main>
    );
}
