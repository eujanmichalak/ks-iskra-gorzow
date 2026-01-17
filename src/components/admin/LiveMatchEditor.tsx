'use client';
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Save, MapPin, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const LiveMatchEditor = () => {
    const [match, setMatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [newGoalPlayer, setNewGoalPlayer] = useState('');
    const [newGoalMin, setNewGoalMin] = useState('');
    const [newGoalTeam, setNewGoalTeam] = useState<'home' | 'away'>('home');

    // Ładowanie meczu z Supabase
    const loadMatch = async () => {
        const { data, error } = await supabase
            .from('matches')
            .select('*, match_events(*)')
            .order('match_date', { ascending: false })
            .limit(1)
            .single();
        if (data) setMatch(data);
        setLoading(false);
    };

    useEffect(() => { loadMatch(); }, []);

    // AUTOMATYCZNY LICZNIK MINUT (dokładnie jak na localhost)
    useEffect(() => {
        let interval: any;
        if (match?.status === 'live' && match?.current_minute < 90) {
            interval = setInterval(async () => {
                const { error } = await supabase
                    .from('matches')
                    .update({ current_minute: match.current_minute + 1 })
                    .eq('id', match.id);
                if (!error) setMatch((p: any) => ({ ...p, current_minute: p.current_minute + 1 }));
            }, 60000);
        }
        return () => clearInterval(interval);
    }, [match?.status, match?.current_minute]);

    const handleUpdate = async (updates: any) => {
        const { error } = await supabase.from('matches').update(updates).eq('id', match.id);
        if (!error) setMatch({ ...match, ...updates });
    };

    const addGoal = async () => {
        if (!newGoalPlayer) return;
        const min = parseInt(newGoalMin) || match.current_minute;
        
        // 1. Dodaj bramkę do tabeli zdarzeń
        const { error: evError } = await supabase.from('match_events').insert([{
            match_id: match.id,
            minute: min,
            player_name: newGoalPlayer,
            team: newGoalTeam,
            event_type: 'goal'
        }]);

        if (!evError) {
            // 2. Aktualizuj wynik główny (+1)
            const scoreKey = newGoalTeam === 'home' ? 'score_home' : 'score_away';
            const newVal = match[scoreKey] + 1;
            await handleUpdate({ [scoreKey]: newVal });
            
            setNewGoalPlayer('');
            setNewGoalMin('');
            loadMatch(); // Odśwież listę zdarzeń
        }
    };

    const handleStop = async () => {
        if(!confirm("Zakończyć mecz i zapisać wynik?")) return;
        await handleUpdate({ status: 'finished' });
        alert("Mecz zakończony!");
    };

    if (loading) return <div className="p-10 text-white animate-pulse">Ładowanie panelu...</div>;
    if (!match) return <div className="p-10 text-white">Brak meczu w bazie. Dodaj go w Supabase najpierw.</div>;

    return (
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 md:space-y-8 text-slate-900">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">MECZ LIVE - STEROWANIE</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => handleUpdate({ status: 'live' })} className="flex-1 sm:flex-none p-4 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Play size={20}/></button>
                    <button onClick={() => handleUpdate({ status: 'break' })} className="flex-1 sm:flex-none p-4 bg-orange-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Pause size={20}/></button>
                    <button onClick={handleStop} className="flex-1 sm:flex-none p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Square size={20}/></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-[28px] border border-slate-100 shadow-inner">
                    <p className="text-[10px] font-black uppercase text-slate-400 ml-2">Wynik i Czas</p>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={match.home_team} onChange={e => setMatch({...match, home_team: e.target.value})} className="p-3 rounded-xl border border-slate-200 font-bold text-xs md:text-sm bg-white outline-none focus:border-slate-950" placeholder="Gospodarz"/>
                        <input type="text" value={match.away_team} onChange={e => setMatch({...match, away_team: e.target.value})} className="p-3 rounded-xl border border-slate-200 font-bold text-xs md:text-sm bg-white outline-none focus:border-slate-950" placeholder="Gość"/>
                    </div>
                    <div className="flex items-center gap-4 justify-center py-4">
                        <input type="number" value={match.score_home} onChange={e => handleUpdate({ score_home: parseInt(e.target.value) || 0 })} className="w-16 md:w-20 text-center text-3xl md:text-4xl font-black p-2 rounded-2xl bg-white border border-slate-200 shadow-inner outline-none"/>
                        <div className="flex flex-col items-center bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-sm min-w-[60px]">
                             <Clock size={14} className="text-iskra-red mb-1" />
                             <div className="flex items-center">
                                <input type="number" value={match.current_minute} onChange={e => handleUpdate({ current_minute: parseInt(e.target.value) || 0 })} className="w-8 text-center font-black text-sm outline-none bg-transparent"/>
                                <span className="text-[10px] font-bold text-slate-400">'</span>
                             </div>
                        </div>
                        <input type="number" value={match.score_away} onChange={e => handleUpdate({ score_away: parseInt(e.target.value) || 0 })} className="w-16 md:w-20 text-center text-3xl md:text-4xl font-black p-2 rounded-2xl bg-white border border-slate-200 shadow-inner outline-none"/>
                    </div>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-[28px] border border-slate-100 shadow-inner">
                    <div className="flex justify-between items-center">
                        <h4 className="font-black uppercase text-[10px] tracking-widest text-slate-400 italic">Strzelcy bramek</h4>
                        <span className="text-[9px] font-black text-iskra-red uppercase italic bg-white px-2 py-1 rounded-lg border">Dla: {newGoalTeam === 'home' ? match.home_team : match.away_team}</span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setNewGoalTeam('home')} className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${newGoalTeam === 'home' ? 'bg-slate-900 text-white' : 'bg-white'}`}>{match.home_team}</button>
                        <button onClick={() => setNewGoalTeam('away')} className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase border transition-all ${newGoalTeam === 'away' ? 'bg-slate-900 text-white' : 'bg-white'}`}>{match.away_team}</button>
                    </div>
                    <input type="text" placeholder="Nazwisko strzelca" value={newGoalPlayer} onChange={e => setNewGoalPlayer(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 font-bold text-sm bg-white outline-none focus:border-slate-950"/>
                    <div className="flex gap-2">
                        <input type="number" placeholder="Min" value={newGoalMin} onChange={e => setNewGoalMin(e.target.value)} className="w-20 p-3 rounded-xl border border-slate-200 font-bold text-sm bg-white outline-none focus:border-slate-950"/>
                        <button onClick={addGoal} className="flex-1 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-iskra-red transition-all shadow-lg">
                            <Plus size={16}/> Dodaj Gol
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl flex items-center gap-3">
                <MapPin size={18} className="text-iskra-red shrink-0" />
                <input type="text" value={match.location} onChange={e => setMatch({...match, location: e.target.value})} onBlur={() => handleUpdate({ location: match.location })} className="flex-1 bg-transparent border-none font-bold text-xs text-white outline-none" placeholder="Lokalizacja (np. Stadion Zawarcie)"/>
            </div>

            <button onClick={() => handleUpdate({ home_team: match.home_team, away_team: match.away_team, location: match.location })} className="w-full bg-slate-900 text-white font-[1000] uppercase italic py-4 rounded-[20px] shadow-xl hover:bg-iskra-red transition-all flex items-center justify-center gap-3">
                <Save size={20}/> Zapisz Dane Meczowe
            </button>
        </div>
    );
};