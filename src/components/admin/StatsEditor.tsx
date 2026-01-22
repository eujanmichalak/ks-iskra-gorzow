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
        if (!error) {
            alert('ZAPISANO POMYŚLNIE');
        }
        setLoading(false);
    };

    const fields = [
        { id: 'goals_scored', label: 'GOLE STRZELONE' },
        { id: 'goals_conceded', label: 'GOLE STRACONE' },
        { id: 'yellow_cards', label: 'ŻÓŁTE KARTKI' },
        { id: 'red_cards', label: 'CZERWONE KARTKI' },
    ];

    if (fetching) return <div className="p-12 text-center text-black font-black uppercase">ŁADOWANIE...</div>;

    return (
        <div className="bg-white p-6 md:p-8 rounded-[32px] border-[4px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            {/* Nagłówek - Betonowa czerń */}
            <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-black rounded-2xl text-white">
                    <BarChart3 size={32} />
                </div>
                <h3 className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tighter text-black">
                    EDYTOR STATYSTYK
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fields.map(f => (
                    <div key={f.id} className="p-6 rounded-[24px] border-[3px] border-black bg-white">
                        <label className="text-sm font-[1000] uppercase text-black block mb-5 tracking-widest">
                            {f.label}
                        </label>
                        
                        <div className="flex items-center justify-between gap-6">
                            <button 
                                onClick={() => updateVal(f.id, -1)} 
                                className="w-16 h-16 flex items-center justify-center bg-white hover:bg-black hover:text-white rounded-2xl border-[3px] border-black text-black transition-all active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Minus size={32} strokeWidth={4} />
                            </button>
                            
                            <span className="text-6xl font-[1000] italic tabular-nums text-black">
                                {(stats as any)[f.id]}
                            </span>
                            
                            <button 
                                onClick={() => updateVal(f.id, 1)} 
                                className="w-16 h-16 flex items-center justify-center bg-white hover:bg-black hover:text-white rounded-2xl border-[3px] border-black text-black transition-all active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                <Plus size={32} strokeWidth={4} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleSave} 
                disabled={loading}
                className="w-full mt-12 bg-black text-white py-6 rounded-[28px] font-[1000] uppercase italic text-2xl tracking-[0.1em] hover:bg-slate-800 transition-all flex items-center justify-center gap-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] active:scale-95 disabled:opacity-50"
            >
                {loading ? (
                    <RefreshCw className="animate-spin" size={32} />
                ) : (
                    <>
                        <Save size={32} strokeWidth={3} />
                        ZAPISZ STATYSTYKI
                    </>
                )}
            </button>
        </div>
    );
};