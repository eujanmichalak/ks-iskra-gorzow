'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Plus, Minus, BarChart3 } from 'lucide-react';

export const StatsEditor = () => {
    const [stats, setStats] = useState({
        goals_scored: 0, goals_conceded: 0, yellow_cards: 0, red_cards: 0
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            const { data } = await supabase.from('team_stats').select('*').eq('id', 1).single();
            if (data) setStats(data);
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
        { id: 'goals_scored', label: 'Gole Strzelone', color: 'bg-green-500' },
        { id: 'goals_conceded', label: 'Gole Stracone', color: 'bg-blue-500' },
        { id: 'yellow_cards', label: 'Żółte Kartki', color: 'bg-yellow-500' },
        { id: 'red_cards', label: 'Czerwone Kartki', color: 'bg-red-500' },
    ];

    return (
        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-lg">
                    <BarChart3 size={24} />
                </div>
                <h3 className="text-2xl font-[1000] uppercase italic tracking-tighter">Statystyki Sezonu</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {fields.map(f => (
                    <div key={f.id} className="p-5 rounded-[24px] bg-slate-50 border border-slate-100">
                        <label className="text-[10px] font-black uppercase text-slate-400 block mb-3 ml-1">{f.label}</label>
                        <div className="flex items-center justify-between bg-white p-2 rounded-2xl border-2 border-slate-100">
                            <button onClick={() => updateVal(f.id, -1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><Minus size={20}/></button>
                            <span className="text-3xl font-[1000] italic">{(stats as any)[f.id]}</span>
                            <button onClick={() => updateVal(f.id, 1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><Plus size={20}/></button>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleSave} 
                disabled={loading}
                className="w-full mt-8 bg-slate-950 text-white py-5 rounded-[24px] font-[1000] uppercase italic tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"
            >
                <Save size={20} /> {loading ? 'Zapisywanie...' : 'Zaktualizuj liczby'}
            </button>
        </div>
    );
};