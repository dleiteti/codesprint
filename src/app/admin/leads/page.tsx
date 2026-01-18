'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { RefreshCw, Eye, CheckCircle, Clock, Rocket, ArrowLeft, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Briefing {
    id: string;
    created_at: string;
    nome: string;
    empresa: string;
    whatsapp: string;
    nicho: string;
    objetivo: string;
    urgencia: string;
    investimento: string;
    status: string;
}

const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    novo: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: <Clock className="w-3 h-3" /> },
    em_producao: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: <Rocket className="w-3 h-3" /> },
    entregue: { bg: 'bg-green-500/20', text: 'text-green-400', icon: <CheckCircle className="w-3 h-3" /> },
};

export default function AdminLeads() {
    const [briefings, setBriefings] = useState<Briefing[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBriefing, setSelectedBriefing] = useState<Briefing | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('todos');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchBriefings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('briefings')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setBriefings(data);
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        await supabase.from('briefings').update({ status: newStatus }).eq('id', id);
        fetchBriefings();
    };

    useEffect(() => {
        fetchBriefings();
    }, []);

    const filteredBriefings = briefings.filter(b => {
        const matchesStatus = filterStatus === 'todos' || b.status === filterStatus;
        const matchesSearch = b.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.whatsapp?.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <main className="min-h-screen bg-[#0B1120]">
            <header className="border-b border-cyan-500/20 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <Image src="/logo.png" alt="CodeSprint" width={120} height={30} className="h-6 w-auto" />
                        </Link>
                        <span className="text-cyan-400 text-sm bg-cyan-500/10 px-3 py-1 rounded-full">Dashboard de Leads</span>
                    </div>
                    <button onClick={fetchBriefings} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-slate-400 text-xs mb-1">Total</p>
                        <p className="text-2xl font-bold text-white">{briefings.length}</p>
                    </div>
                    <div className="bg-slate-900/50 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-slate-400 text-xs mb-1">Novos</p>
                        <p className="text-2xl font-bold text-blue-400">{briefings.filter(b => b.status === 'novo').length}</p>
                    </div>
                    <div className="bg-slate-900/50 border border-yellow-500/20 rounded-xl p-4">
                        <p className="text-slate-400 text-xs mb-1">Em Produção</p>
                        <p className="text-2xl font-bold text-yellow-400">{briefings.filter(b => b.status === 'em_producao').length}</p>
                    </div>
                    <div className="bg-slate-900/50 border border-green-500/20 rounded-xl p-4">
                        <p className="text-slate-400 text-xs mb-1">Entregues</p>
                        <p className="text-2xl font-bold text-green-400">{briefings.filter(b => b.status === 'entregue').length}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, empresa ou WhatsApp..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-cyan-500/20 rounded-xl text-white placeholder-slate-400 focus:border-cyan-400 transition-all text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['todos', 'novo', 'em_producao', 'entregue'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-2 rounded-xl text-sm transition-all ${filterStatus === status ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400' : 'bg-slate-800/50 text-slate-400 border border-cyan-500/20 hover:border-cyan-500/50'}`}
                            >
                                {status === 'todos' ? 'Todos' : status === 'novo' ? 'Novos' : status === 'em_producao' ? 'Em Produção' : 'Entregues'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
                            <p className="text-slate-400">Carregando leads...</p>
                        </div>
                    ) : filteredBriefings.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-slate-400">Nenhum lead encontrado</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-800/50 border-b border-cyan-500/20">
                                    <tr>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Data</th>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Cliente</th>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Empresa</th>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Nicho</th>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Urgência</th>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Status</th>
                                        <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBriefings.map((b) => (
                                        <tr key={b.id} className="border-b border-cyan-500/10 hover:bg-slate-800/30 transition-colors">
                                            <td className="px-4 py-3 text-xs text-slate-400">{formatDate(b.created_at)}</td>
                                            <td className="px-4 py-3">
                                                <p className="text-white text-sm font-medium">{b.nome || '-'}</p>
                                                <p className="text-slate-400 text-xs">{b.whatsapp || '-'}</p>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-white">{b.empresa || '-'}</td>
                                            <td className="px-4 py-3 text-sm text-slate-300">{b.nicho || '-'}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${b.urgencia?.includes('ontem') ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                                                    {b.urgencia || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={b.status || 'novo'}
                                                    onChange={(e) => updateStatus(b.id, e.target.value)}
                                                    className={`px-3 py-1 rounded-full text-xs border-0 cursor-pointer ${statusColors[b.status || 'novo']?.bg} ${statusColors[b.status || 'novo']?.text}`}
                                                >
                                                    <option value="novo">🕐 Novo</option>
                                                    <option value="em_producao">🚀 Em Produção</option>
                                                    <option value="entregue">✅ Entregue</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <button
                                                    onClick={() => setSelectedBriefing(b)}
                                                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" /> Ver
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {selectedBriefing && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedBriefing(null)}>
                    <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Briefing: {selectedBriefing.empresa}</h2>
                            <button onClick={() => setSelectedBriefing(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {Object.entries(selectedBriefing).filter(([k]) => !['id', 'created_at'].includes(k)).map(([key, value]) => (
                                <div key={key} className="bg-slate-800/50 rounded-lg p-3">
                                    <p className="text-slate-400 text-xs mb-1">{key.replace(/_/g, ' ')}</p>
                                    <p className="text-white">{value || '-'}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex gap-3">
                            <a
                                href={`https://wa.me/${selectedBriefing.whatsapp?.replace(/\D/g, '')}`}
                                target="_blank"
                                className="flex-1 py-3 bg-[#25D366] text-white font-bold rounded-xl text-center hover:bg-green-500 transition-all"
                            >
                                💬 Abrir WhatsApp
                            </a>
                            <button onClick={() => setSelectedBriefing(null)} className="flex-1 py-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition-all">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
