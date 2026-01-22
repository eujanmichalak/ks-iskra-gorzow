'use client';
import React, { useEffect, useState } from 'react';
import { Sword, ShieldAlert, Layers, Flame } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const TeamStats = () => {
    const [stats, setStats] = useState({
        goals_scored: 0, goals_conceded: 0, yellow_cards: 0, red_cards: 0
    });

    const fetchStats = async () => {
        const { data } = await supabase.from('team_stats').select('*').eq('id', 1).single();
        if (data) setStats(data);
    };

    useEffect(() => {
        fetchStats();
        const channel = supabase.channel('stats-sync')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'team_stats' }, () => fetchStats())
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    const statCards = [
        { label: 'Gole Strzelone', val: stats.goals_scored, icon: <Sword size={28}/>, color: 'text-green-600', bg: 'bg-green-50', cat: 'Ofensywa' },
        { label: 'Gole Stracone', val: stats.goals_conceded, icon: <ShieldAlert size={28}/>, color: 'text-blue-600', bg: 'bg-blue-50', cat: 'Defensywa' },
        { label: 'Żółte Kartki', val: stats.yellow_cards, icon: <Layers size={28}/>, color: 'text-yellow-500', bg: 'bg-yellow-50', cat: 'Dyscyplina' },
        { label: 'Czerwone Kartki', val: stats.red_cards, icon: <Flame size={28}/>, color: 'text-red-600', bg: 'bg-red-50', cat: 'Kary' },
    ];

    return (
        <section id="stats" className="py-12 md:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="mb-10 md:mb-16">
                    <span className="text-slate-950 font-[1000] text-xs uppercase tracking-[0.4em] mb-2 block">Sezon w liczbach</span>
                    <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 italic uppercase tracking-tighter leading-tight">
                        Statystyki <span className="text-slate-500">Zespołu</span>
                    </h2>
                    <div className="h-[3px] w-20 md:w-24 bg-slate-900 mt-4 md:mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {statCards.map((s, i) => (
                        <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:bg-slate-900 transition-all duration-500 cursor-default">
                            <div className="flex justify-between items-start mb-6 md:mb-8">
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${s.bg} flex items-center justify-center ${s.color} group-hover:bg-white/10 transition-all`}>
                                    {s.icon}
                                </div>
                                <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.cat}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-5xl md:text-6xl font-[1000] text-slate-900 italic tracking-tighter group-hover:text-white transition-colors">
                                    {s.val}
                                </span>
                                <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-slate-400">{s.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};