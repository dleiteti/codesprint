'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TerminalSquare, Target, Activity, Flame } from 'lucide-react';

type Lead = {
  id: string;
  status: string;
  nicho: string;
  cidade?: string;
  uf?: string;
  created_at: string;
};

export default function MetricsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      const { data } = await supabase.from('codesprint_leads').select('id, status, nicho, cidade, uf, created_at');
      if (data) setLeads(data as Lead[]);
      setLoading(false);
    }
    fetchLeads();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-zinc-800 border-t-emerald-500 animate-spin"></div>
    </div>
  );

  const total = leads.length;
  const disparados = leads.filter(l => ['ABORDADO', 'RESPONDIDO', 'NEGOCIACAO', 'WON', 'LOST'].includes(l.status)).length;
  const won = leads.filter(l => l.status === 'WON').length;
  
  // Pipeline Velocity (Conversão de Disparados para Won)
  const successRate = disparados > 0 ? ((won / disparados) * 100).toFixed(1) : '0';

  // Group by nicho
  const byNicho = leads.reduce((acc, l) => {
    acc[l.nicho] = (acc[l.nicho] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedNichos = Object.entries(byNicho).sort((a,b) => b[1] - a[1]).slice(0, 10);

  // Group by UF / Regionalidade
  const byUF = leads.reduce((acc, l) => {
    if (l.uf) {
      acc[l.uf] = (acc[l.uf] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  const sortedUFs = Object.entries(byUF).sort((a,b) => b[1] - a[1]).slice(0, 10);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-emerald-500/30 p-8">
      <header className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)] shrink-0">
            <Activity className="w-5 h-5 text-zinc-950" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white leading-tight">War Room</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">Analytics & Burn Rate</p>
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <a href="/admin/crm" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#121214] hover:bg-zinc-800 border border-white/5 hover:border-white/10 text-xs font-bold text-zinc-300 transition-all shadow-inner hover:shadow-lg">
            ← Voltar ao Kanban
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#121214]/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <Target className="w-6 h-6 text-emerald-400 mb-4" />
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Munição Adquirida</h2>
          <p className="text-4xl font-black text-white">{total} <span className="text-sm font-medium text-zinc-600">Leads Nacionais</span></p>
        </div>

        <div className="bg-[#121214]/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <Flame className="w-6 h-6 text-amber-500 mb-4" />
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Fogo Efetivo (Disparos WA)</h2>
          <p className="text-4xl font-black text-amber-500">{disparados} <span className="text-sm font-medium text-amber-500/50">Leads Ativados</span></p>
        </div>

        <div className="bg-[#121214]/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.05] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <TerminalSquare className="w-6 h-6 text-emerald-400 mb-4" />
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Win Rate (Conversões)</h2>
          <p className="text-4xl font-black text-white">{successRate}% <span className="text-sm font-medium text-emerald-500/50">dos Ativados Fecham</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-[#121214]/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
          <h2 className="text-zinc-100 text-sm font-bold uppercase tracking-wide mb-6">Top 10 C-Level Nichos</h2>
          <div className="space-y-5">
            {sortedNichos.map(([n, count], idx) => (
              <div key={n} className="flex items-center gap-4 group">
                <div className="text-zinc-600 font-mono text-xs w-4">0{idx+1}</div>
                <div className="flex-1 bg-zinc-900/50 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
                  <div 
                    className="absolute top-0 left-0 bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out" 
                    style={{ width: `${(count / total) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold text-zinc-300 w-36 truncate group-hover:text-emerald-400 transition-colors">{n}</div>
                <div className="text-xs font-mono text-emerald-500 w-8 text-right bg-emerald-500/10 px-1.5 py-0.5 rounded">{count}</div>
              </div>
            ))}
            
            {sortedNichos.length === 0 && (
              <div className="text-zinc-600 text-xs tracking-widest uppercase font-bold text-center py-6 border border-dashed border-white/5 rounded-xl">
                Nenhum Dado de Colheita
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#121214]/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl relative overflow-hidden">
          <h2 className="text-zinc-100 text-sm font-bold uppercase tracking-wide mb-6">Radar Geográfico (Top 10 UFs)</h2>
          <div className="space-y-5">
            {sortedUFs.map(([uf, count], idx) => (
              <div key={uf} className="flex items-center gap-4 group">
                <div className="text-zinc-600 font-mono text-xs w-4">0{idx+1}</div>
                <div className="flex-1 bg-zinc-900/50 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
                  <div 
                    className="absolute top-0 left-0 bg-blue-500 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out" 
                    style={{ width: `${(count / total) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold text-zinc-300 w-24 truncate group-hover:text-blue-400 transition-colors">Estado: {uf}</div>
                <div className="text-xs font-mono text-blue-500 w-8 text-right bg-blue-500/10 px-1.5 py-0.5 rounded">{count}</div>
              </div>
            ))}
            
            {sortedUFs.length === 0 && (
              <div className="text-zinc-600 text-xs tracking-widest uppercase font-bold text-center py-6 border border-dashed border-white/5 rounded-xl">
                Geolocalização Pendente
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
