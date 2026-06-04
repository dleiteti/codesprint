'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Play, Check, X, MessageCircle, DollarSign, GripVertical, Filter, TerminalSquare, Globe, Activity } from 'lucide-react';

type Lead = {
  id: string;
  created_at: string;
  nome_empresa: string;
  telefone: string;
  nicho: string;
  cidade?: string;
  estado?: string;
  website?: string;
  status: 'NOVO' | 'FILA_DISPARO' | 'ABORDADO' | 'RESPONDIDO' | 'NEGOCIACAO' | 'WON' | 'LOST';
};

const COLUMNS = [
  { id: 'NOVO', title: 'Novos Leads', color: 'bg-[#18181b]/40 border-zinc-800/50', accent: 'bg-zinc-400', glow: 'shadow-[0_0_15px_rgba(161,161,170,0.1)]' },
  { id: 'FILA_DISPARO', title: 'Fila do Bot local', color: 'bg-[#fbbf24]/5 border-amber-500/20', accent: 'bg-amber-400', glow: 'shadow-[0_0_15px_rgba(251,191,36,0.1)]' },
  { id: 'ABORDADO', title: 'Abordados', color: 'bg-[#3b82f6]/5 border-blue-500/20', accent: 'bg-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]' },
  { id: 'RESPONDIDO', title: 'Respondeu', color: 'bg-[#6366f1]/5 border-indigo-500/20', accent: 'bg-indigo-400', glow: 'shadow-[0_0_15px_rgba(99,102,241,0.1)]' },
  { id: 'NEGOCIACAO', title: 'Em Negociação', color: 'bg-[#a855f7]/5 border-purple-500/20', accent: 'bg-purple-400', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]' },
  { id: 'WON', title: 'Venda Fechada', color: 'bg-[#10b981]/5 border-emerald-500/20', accent: 'bg-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]' },
  { id: 'LOST', title: 'Perdido', color: 'bg-[#f43f5e]/5 border-rose-500/20', accent: 'bg-rose-400', glow: 'shadow-[0_0_15px_rgba(244,63,94,0.1)]' }
] as const;

export default function CRMBoard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNicho, setSelectedNicho] = useState<string>('ALL');

  const nichos = Array.from(new Set(leads.map(l => l.nicho))).filter(Boolean).sort();

  useEffect(() => {
    fetchLeads();
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'codesprint_leads' },
        () => {
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchLeads() {
    const { data, error } = await supabase
      .from('codesprint_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar leads:', error);
      return;
    }
    setLeads(data as Lead[]);
    setLoading(false);
  }

  async function moveLead(leadId: string, novoStatus: Lead['status']) {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: novoStatus } : l));
    const { error } = await supabase
      .from('codesprint_leads')
      .update({ status: novoStatus })
      .eq('id', leadId);

    if (error) {
      alert('Faz o F5, quebrou a requisição pro Supabase.');
      fetchLeads();
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-emerald-500 animate-spin"></div>
        <p className="text-zinc-500 font-medium tracking-widest uppercase text-sm">Carregando Nuvem...</p>
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-[#050505] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/30 overflow-hidden">
      {/* HEADER PRIME */}
      <header className="flex-none z-50 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5 px-8 py-5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)] shrink-0">
            <TerminalSquare className="w-5 h-5 text-zinc-950" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">CodeSprint</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">Autonomous CRM</p>
          </div>

          <div className="hidden lg:flex items-center gap-4 ml-6 py-2 px-5 bg-[#121214] border border-white/5 rounded-xl shadow-inner">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-300 tracking-wider">🟢 MOTOR LOCAL</span>
              <span className="text-[10px] text-zinc-500 font-medium font-mono">python auto_sender.py</span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-300 tracking-wider">🟡 GARIMPEIRO</span>
              <span className="text-[10px] text-zinc-500 font-medium font-mono">python harvester.py --limite 5</span>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="relative group">
            <select
              value={selectedNicho}
              onChange={(e) => setSelectedNicho(e.target.value)}
              className="appearance-none bg-[#121214] border border-white/10 hover:border-white/20 text-zinc-300 py-2 pl-4 pr-10 rounded-xl text-xs font-medium outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer transition-all shadow-inner"
            >
              <option value="ALL">Nexus (Todos)</option>
              {nichos.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-3 top-2.5 text-zinc-500 pointer-events-none group-hover:text-emerald-400 transition-colors" />
          </div>
          
          <a href="/admin/metrics" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-white/10 text-[10px] uppercase tracking-wider font-bold text-zinc-300 transition-colors">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            War Room (Métricas)
          </a>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] uppercase tracking-wider font-bold text-zinc-400">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></div>
            Nuvem Sincronizada
          </div>
        </div>
      </header>

      {/* BOARD KANBAN */}
      <main className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/10 via-[#050505] to-[#050505]">
        <div className="flex gap-6 items-start h-full min-w-max pb-2">
          {COLUMNS.map(column => {
            const columnLeads = leads.filter(l => l.status === column.id && (selectedNicho === 'ALL' || l.nicho === selectedNicho));
            return (
              <div key={column.id} className="w-80 flex-shrink-0 flex flex-col h-full">
                
                {/* Cabeçalho da Coluna Profundo */}
                <div className={`flex-none mb-4 p-4 rounded-2xl border ${column.color} ${column.glow} backdrop-blur-xl flex flex-col gap-3 shadow-xl relative overflow-hidden group transition-colors duration-500`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${column.accent} shadow-[0_0_8px_currentColor]`} />
                      <h2 className="text-xs tracking-[0.1em] uppercase font-bold text-zinc-200">{column.title}</h2>
                    </div>
                    <span className="bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/5 shadow-inner backdrop-blur-md">{columnLeads.length}</span>
                  </div>

                  {/* Batch Actions (Opção 1) */}
                  {column.id === 'NOVO' && columnLeads.length > 0 && (
                    <div className="flex items-center gap-2 mt-1 relative z-10">
                      <input 
                        type="number" 
                        defaultValue={5} 
                        id="batchAmount"
                        min={1}
                        max={100}
                        className="w-14 text-xs p-1.5 rounded-lg bg-zinc-950 border border-white/10 focus:border-emerald-500 text-zinc-200 font-bold outline-none text-center shadow-inner" 
                      />
                      <button 
                        onClick={() => {
                          const amount = parseInt((document.getElementById('batchAmount') as HTMLInputElement).value) || 5;
                          const leadsToFire = columnLeads.slice(0, amount);
                          leadsToFire.forEach(l => moveLead(l.id, 'FILA_DISPARO'));
                        }}
                        className="flex-1 bg-white hover:bg-zinc-200 text-zinc-950 px-2 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <Play className="w-3 h-3" fill="currentColor"/> Soltar Robô
                      </button>
                    </div>
                  )}
                </div>

                {/* Cards Container Custom Scrolbar UI */}
                <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2 pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent hover:scrollbar-thumb-zinc-700">
                  {columnLeads.map(lead => (
                    <div key={lead.id} className="bg-[#121214]/60 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:border-white/15 hover:bg-[#18181b]/80 transition-all duration-300 group shadow-lg flex flex-col gap-4 relative overflow-hidden">
                      {/* Brilho hover subjacente */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                      <div className="flex justify-between items-start relative z-10 gap-2 mb-1">
                        <h3 className="font-semibold text-zinc-100 leading-snug tracking-tight text-sm drop-shadow-md pr-2">{lead.nome_empresa}</h3>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-emerald-400 p-1 hover:bg-emerald-400/10 rounded-md transition-all">
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <GripVertical className="w-4 h-4 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      
                      <div className="relative z-10 flex flex-wrap gap-2 mb-2">
                        <p className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-zinc-400">
                          {lead.telefone}
                        </p>
                        {(lead.cidade || lead.estado) && (
                          <p className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-medium text-emerald-400/80 tracking-wide">
                            {lead.cidade}{lead.cidade && lead.estado ? ' - ' : ''}{lead.estado}
                          </p>
                        )}
                      </div>

                      {/* Botões de Ação Glassmorphism */}
                      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                        {column.id === 'NOVO' && (
                          <button 
                            onClick={() => moveLead(lead.id, 'FILA_DISPARO')}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-800/50 hover:bg-zinc-700 border border-white/5 hover:border-white/20 text-zinc-200 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                          >
                            <Play className="w-3 h-3" fill="currentColor" /> Disparo Individual
                          </button>
                        )}

                        {['ABORDADO', 'FILA_DISPARO', 'RESPONDIDO'].includes(column.id) && (
                          <>
                            {column.id !== 'RESPONDIDO' && (
                              <button onClick={() => moveLead(lead.id, 'RESPONDIDO')} className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20 rounded-xl text-xs font-bold transition-all active:scale-95">
                                <MessageCircle className="w-3.5 h-3.5" /> Retornou
                              </button>
                            )}
                            <button onClick={() => moveLead(lead.id, 'NEGOCIACAO')} className="flex items-center justify-center gap-1.5 px-3 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 rounded-xl text-xs font-bold transition-all active:scale-95">
                              <DollarSign className="w-3.5 h-3.5" /> Negociar
                            </button>
                            <button onClick={() => moveLead(lead.id, 'LOST')} className="flex items-center justify-center px-3 py-2 bg-zinc-900 border border-rose-500/10 text-zinc-500 hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 rounded-xl text-xs font-medium transition-all active:scale-95">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}

                        {column.id === 'NEGOCIACAO' && (
                          <>
                            <button onClick={() => moveLead(lead.id, 'WON')} className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)] active:scale-95">
                              <Check className="w-4 h-4" /> Venda Realizada
                            </button>
                            <button onClick={() => moveLead(lead.id, 'LOST')} className="flex items-center justify-center px-3 py-2 bg-rose-500/5 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-rose-500 rounded-xl text-xs font-bold transition-all active:scale-95">
                              Lost
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {columnLeads.length === 0 && (
                    <div className="h-24 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-zinc-600 text-[11px] uppercase tracking-widest font-bold bg-white/[0.01]">
                      Sem Leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
