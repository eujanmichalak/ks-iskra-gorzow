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
            alert('Statystyki zapisane pomyślnie!');
        }
        setLoading(false);
    };

    const fields = [
        { id: 'goals_scored', label: 'Gole Strzelone', color: 'text-green-600', border: 'border-green-100' },
        { id: 'goals_conceded', label: 'Gole Stracone', color: 'text-blue-600', border: 'border-blue-100' },
        { id: 'yellow_cards', label: 'Żółte Kartki', color: 'text-yellow-600', border: 'border-yellow-100' },
        { id: 'red_cards', label: 'Czerwone Kartki', color: 'text-red-600', border: 'border-red-100' },
    ];

    if (fetching) return (
        <div className="p-12 text-center text-slate-900 font-black uppercase animate-pulse">
            Wczytywanie statystyk...
        </div>
    );

    return (
        <div className="bg-white p-6 md:p-8 rounded-[32px] border-2 border-slate-200 shadow-xl">
            {/* Header - Mocny czarny tekst */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-950 rounded-2xl text-white shadow-lg">
                    <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter text-slate-950">
                    Edytor Statystyk
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {fields.map(f => (
                    <div key={f.id} className={`p-5 rounded-[24px] bg-slate-50 border-2 ${f.border}`}>
                        <label className="text-[11px] font-[1000] uppercase text-slate-900 block mb-4 ml-1 tracking-wider">
                            {f.label}
                        </label>

                        <div className="flex items-center justify-between bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm">
                            <button
                                onClick={() => updateVal(f.id, -1)}
                                className="p-3 hover:bg-slate-950 hover:text-white rounded-xl transition-all border border-slate-100 text-slate-950 shadow-sm active:scale-90"
                            >
                                <Minus size={24} strokeWidth={3} />
                            </button>

                            <span className={`text-4xl font-[1000] italic tabular-nums ${f.color}`}>
                                {(stats as any)[f.id]}
                            </span>

                            <button
                                onClick={() => updateVal(f.id, 1)}
                                className="p-3 hover:bg-slate-950 hover:text-white rounded-xl transition-all border border-slate-100 text-slate-950 shadow-sm active:scale-90"
                            >
                                <Plus size={24} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSave}
                disabled={loading}
                className="w-full mt-8 bg-slate-950 text-white py-5 rounded-[24px] font-[1000] uppercase italic tracking-[0.2em] hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95 disabled:opacity-50"
            >
                {loading ? (
                    <RefreshCw className="animate-spin" size={24} />
                ) : (
                    <>
                        <Save size={24} strokeWidth={2.5} />
                        <span className="text-lg">Zapisz statystyki w bazie</span>
                    </>
                )}
            </button>
        </div>
    );
};