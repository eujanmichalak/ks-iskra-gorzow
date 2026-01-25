'use client';
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Save, MapPin, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const LiveMatchEditor = () => {
    const [match, setMatch] = useState<any>(null);
    const [newGoalPlayer, setNewGoalPlayer] = useState('');
    const [newGoalMin, setNewGoalMin] = useState('');
    const [newGoalTeam, setNewGoalTeam] = useState<'home' | 'away'>('home');

    const loadMatch = async () => {
        const { data } = await supabase.from('live_match').select('*').eq('id', 1).single();
        if (data) setMatch(data);
    };

    useEffect(() => { loadMatch(); }, []);

    const saveToDB = async (updatedData: any) => {
        const { error } = await supabase
            .from('live_match')
            .update(updatedData)
            .eq('id', 1);
        
        if (!error) setMatch((prev: any) => ({ ...prev, ...updatedData }));
    };

    // FUNKCJA STARTU - Zapisuje czas rzeczywisty rozpoczęcia
    const handleStart = async () => {
        const now = new Date().toISOString();
        // Jeśli startujemy od 46 minuty, cofamy start_time o 45 min, żeby obliczenia się zgadzały
        let startTime = now;
        if (match.minute >= 45) {
            const date = new Date();
            date.setMinutes(date.getMinutes() - match.minute);
            startTime = date.toISOString();
        }
        await saveToDB({ status: 'live', start_time: startTime });
    };

    const handleStop = async () => {
        if (!confirm("Zakończyć mecz? Wynik zostanie zapisany w historii i sekcji ligowej.")) return;

        await supabase.from('match_history').insert([{
            home: match.home,
            away: match.away,
            score_home: match.score_home,
            score_away: match.score_away,
            location: match.location,
            match_date: new Date().toLocaleDateString('pl-PL')
        }]);

        const resetData = {
            status: 'finished',
            minute: 0,
            score_home: 0,
            score_away: 0,
            events: [],
            start_time: null
        };
        await saveToDB(resetData);
        alert("Mecz zapisany w bazie!");
    };

    const addGoal = async () => {
        if (!newGoalPlayer) return;
        const goalMin = Number(newGoalMin) || match.minute;
        const newEvent = { team: newGoalTeam, min: goalMin, player: newGoalPlayer };

        const updatedData = {
            score_home: newGoalTeam === 'home' ? match.score_home + 1 : match.score_home,
            score_away: newGoalTeam === 'away' ? match.score_away + 1 : match.score_away,
            events: [newEvent, ...(match.events || [])]
        };

        await saveToDB(updatedData);
        setNewGoalPlayer('');
        setNewGoalMin('');
    };

    if (!match) return <div className="p-10 text-white italic">Ładowanie połączenia z bazą...</div>;

    return (
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 md:space-y-8 text-slate-900">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">MECZ LIVE</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={handleStart} className="flex-1 sm:flex-none p-4 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Play size={20} /></button>
                    <button onClick={() => saveToDB({ status: 'break' })} className="flex-1 sm:flex-none p-4 bg-orange-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Pause size={20} /></button>
                    <button onClick={handleStop} className="flex-1 sm:flex-none p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Square size={20} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-[28px] border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-400 ml-2">Wynik i Czas</p>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <input type="text" value={match.home} onChange={e => setMatch({ ...match, home: e.target.value })} className="p-3 rounded-xl border border-slate-200 font-bold text-xs bg-white outline-none" />
                        <input type="text" value={match.away} onChange={e => setMatch({ ...match, away: e.target.value })} className="p-3 rounded-xl border border-slate-200 font-bold text-xs bg-white outline-none" />
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 justify-center py-2 md:py-4 text-slate-900">
                        <input type="number" value={match.score_home} onChange={e => setMatch({ ...match, score_home: parseInt(e.target.value) || 0 })} className="w-16 md:w-20 text-center text-3xl font-black p-2 rounded-2xl bg-white border border-slate-200 outline-none" />
                        <div className="flex flex-col items-center bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-sm min-w-[60px]">
                            <Clock size={14} className="text-red-600 mb-1" />
                            <div className="flex items-center">
                                <input type="number" value={match.minute} onChange={e => setMatch({ ...match, minute: parseInt(e.target.value) || 0 })} className="w-8 text-center font-black text-sm outline-none bg-transparent" />
                                <span className="text-[10px] font-bold text-slate-400">'</span>
                            </div>
                        </div>
                        <input type="number" value={match.score_away} onChange={e => setMatch({ ...match, score_away: parseInt(e.target.value) || 0 })} className="w-16 md:w-20 text-center text-3xl font-black p-2 rounded-2xl bg-white border border-slate-200 outline-none" />
                    </div>
                </div>

                <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-[28px] border border-slate-100">
                    <div className="flex justify-between items-center">
                        <h4 className="font-black uppercase text-[10px] text-slate-400">Strzelcy bramek</h4>
                        <span className="text-[9px] font-black text-red-600 uppercase bg-white px-2 py-1 rounded-lg border">Dla: {newGoalTeam === 'home' ? match.home : match.away}</span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setNewGoalTeam('home')} className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${newGoalTeam === 'home' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400'}`}>{match.home}</button>
                        <button onClick={() => setNewGoalTeam('away')} className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase border transition-all ${newGoalTeam === 'away' ? 'bg-slate-900 text-white' : 'bg-white text-slate-400'}`}>{match.away}</button>
                    </div>
                    <input type="text" placeholder="Nazwisko strzelca" value={newGoalPlayer} onChange={e => setNewGoalPlayer(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 font-bold text-sm bg-white outline-none" />
                    <div className="flex gap-2">
                        <input type="number" placeholder="Min" value={newGoalMin} onChange={e => setNewGoalMin(e.target.value)} className="w-20 p-3 rounded-xl border border-slate-200 font-bold text-sm bg-white outline-none" />
                        <button onClick={addGoal} className="flex-1 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-lg"><Plus size={16} /> Dodaj Gol</button>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl flex items-center gap-3 shadow-inner">
                <MapPin size={18} className="text-red-600 shrink-0" />
                <input type="text" value={match.location} onChange={e => setMatch({ ...match, location: e.target.value })} className="flex-1 bg-transparent border-none font-bold text-xs text-white outline-none" placeholder="Lokalizacja" />
            </div>

            <button onClick={() => saveToDB(match)} className="w-full bg-slate-900 text-white font-[1000] uppercase italic py-4 rounded-[20px] shadow-xl hover:bg-red-600 transition-all flex items-center justify-center gap-3">
                <Save size={20} /> Aktualizuj mecz live
            </button>
        </div>
    );
};