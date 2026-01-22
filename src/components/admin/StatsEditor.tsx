'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Plus, Minus, BarChart3, RefreshCw } from 'lucide-react';

export const StatsEditor = () => {
    const [stats, setStats] = useState({
        goals_scored: 0, goals_conceded: 0, yellow_cards: 0, red_cards: 0
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const { data } = await supabase.from('team_stats').select('*').eq('id', 1).single();
            if (data) setStats(data);
            setFetching(false);
        };
        fetchStats();
    }, []);

    const updateVal = (field: string, amount: number) => {
        setStats(prev => ({ ...prev, [field]: Math.max(0, (prev as any)[field] + amount) }));
    };

    const handleSave = async () => {
        setLoading(true);
        const { error } = await supabase.from('team_stats').update(stats).eq('id', 1);
        if (!error) alert('Statystyki zaktualizowane!');
        setLoading(false);
    };

    const fields = [
        { id: 'goals_scored', label: 'Gole Strzelone' },
        { id: 'goals_conceded', label: 'Gole Stracone' },
        { id: 'yellow_cards', label: 'Żółte Kartki' },
        { id: 'red_cards', label: 'Czerwone Kartki' },
    ];

    if (fetching) return <div className="p-12 text-center text-slate-900 font-black uppercase italic animate-pulse">Wczytywanie...</div>;

    return (
        <div className="bg-white p-5 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100 text-slate-900">
            {/* Header spójny z resztą panelu */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-slate-950 rounded-2xl text-white shadow-lg shrink-0">
                    <BarChart3 size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter text-slate-950">
                    Statystyki Sezonu
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {fields.map(f => (
                    <div key={f.id} className="p-5 rounded-[24px] bg-slate-50 border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-3 block tracking-widest">
                            {f.label}
                        </label>
                        
                        <div className="flex items-center justify-between bg-white p-2 rounded-2xl border-2 border-slate-100 shadow-sm">
                            <button 
                                onClick={() => updateVal(f.id, -1)} 
                                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-950 active:scale-90"
                            >
                                <Minus size={20} strokeWidth={2.5} />
                            </button>
                            
                            <span className="text-3xl font-[1000] italic text-slate-950 tabular-nums">
                                {(stats as any)[f.id]}
                            </span>
                            
                            <button 
                                onClick={() => updateVal(f.id, 1)} 
                                className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-950 active:scale-90"
                            >
                                <Plus size={20} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleSave} 
                disabled={loading}
                className="w-full mt-8 bg-slate-950 text-white py-4 md:py-5 rounded-xl md:rounded-[24px] font-[1000] uppercase italic tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
                {loading ? (
                    <RefreshCw className="animate-spin" size={20} />
                ) : (
                    <>
                        <Save size={20} />
                        <span className="text-sm md:text-base">Zapisz statystyki</span>
                    </>
                )}
            </button>
        </div>
    );
};