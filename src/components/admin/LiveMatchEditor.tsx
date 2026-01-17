'use client';
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Save, MapPin, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// DANE STARTOWE - Jeśli baza jest pusta, użyjemy tego formularza
const DEFAULT_FORM = {
    home_team: 'Iskra Głogów',
    away_team: 'Rywal',
    score_home: 0,
    score_away: 0,
    current_minute: 0,
    status: 'scheduled',
    location: 'Stadion Zawarcie'
};

export const LiveMatchEditor = () => {
    // Zawsze startujemy z danymi, nigdy z NULLem
    const [match, setMatch] = useState<any>(DEFAULT_FORM);
    const [newGoalPlayer, setNewGoalPlayer] = useState('');
    const [newGoalMin, setNewGoalMin] = useState('');
    const [newGoalTeam, setNewGoalTeam] = useState<'home' | 'away'>('home');

    // Pobieranie danych (zabezpieczone)
    const loadMatch = async () => {
        const { data } = await supabase
            .from('matches')
            .select('*, match_events(*)')
            .order('match_date', { ascending: false })
            .limit(1)
            .maybeSingle();
        
        if (data) setMatch(data);
    };

    useEffect(() => { loadMatch(); }, []);

    // TIMER - Odpala się TYLKO jeśli mamy ID meczu i status Live
    useEffect(() => {
        let interval: any;
        // Sprawdzamy czy match.id istnieje, żeby nie sypać błędami
        if (match?.id && match?.status === 'live' && match?.current_minute < 90) {
            interval = setInterval(async () => {
                const nextMin = match.current_minute + 1;
                await supabase
                    .from('matches')
                    .update({ current_minute: nextMin })
                    .eq('id', match.id);
                setMatch((p: any) => ({ ...p, current_minute: nextMin }));
            }, 60000);
        }
        return () => clearInterval(interval);
    }, [match?.status, match?.current_minute, match?.id]);

    // MAGICZNA FUNKCJA ZAPISU - Tworzy nowy mecz jeśli go nie ma!
    const handleSaveOrUpdate = async (updates: any) => {
        const fullData = { ...match, ...updates };

        if (match.id) {
            // Aktualizacja istniejącego
            const { error } = await supabase.from('matches').update(updates).eq('id', match.id);
            if (!error) setMatch(fullData);
        } else {
            // TWORZENIE NOWEGO (Jeśli baza pusta)
            const { data, error } = await supabase.from('matches').insert([fullData]).select().single();
            if (data) setMatch(data);
        }
    };

    const addGoal = async () => {
        if (!newGoalPlayer) return;
        // Jeśli mecz nie ma ID, najpierw go zapiszmy
        if (!match.id) {
            alert("Najpierw kliknij 'Zapisz Dane Meczowe', żeby utworzyć mecz w bazie!");
            return;
        }

        const min = parseInt(newGoalMin) || match.current_minute;
        
        const { error: evError } = await supabase.from('match_events').insert([{
            match_id: match.id,
            minute: min,
            player_name: newGoalPlayer,
            team: newGoalTeam,
            event_type: 'goal'
        }]);

        if (!evError) {
            const scoreKey = newGoalTeam === 'home' ? 'score_home' : 'score_away';
            const newVal = match[scoreKey] + 1;
            await handleSaveOrUpdate({ [scoreKey]: newVal });
            
            setNewGoalPlayer('');
            setNewGoalMin('');
            loadMatch(); 
        }
    };

    const handleStop = async () => {
        if(!confirm("Zakończyć mecz i zapisać wynik?")) return;
        await handleSaveOrUpdate({ status: 'finished' });
    };

    return (
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 md:space-y-8 text-slate-900">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">MECZ LIVE - STEROWANIE</h3>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => handleSaveOrUpdate({ status: 'live' })} className="flex-1 sm:flex-none p-4 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Play size={20}/></button>
                    <button onClick={() => handleSaveOrUpdate({ status: 'break' })} className="flex-1 sm:flex-none p-4 bg-orange-500 text-white rounded-2xl shadow-lg hover:scale-105 transition-all flex justify-center"><Pause size={20}/></button>
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
                        <input type="number" value={match.score_home} onChange={e => setMatch({...match, score_home: parseInt(e.target.value) || 0 })} className="w-16 md:w-20 text-center text-3xl md:text-4xl font-black p-2 rounded-2xl bg-white border border-slate-200 shadow-inner outline-none"/>
                        <div className="flex flex-col items-center bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-sm min-w-[60px]">
                             <Clock size={14} className="text-iskra-red mb-1" />
                             <div className="flex items-center">
                                <input type="number" value={match.current_minute} onChange={e => setMatch({...match, current_minute: parseInt(e.target.value) || 0 })} className="w-8 text-center font-black text-sm outline-none bg-transparent"/>
                                <span className="text-[10px] font-bold text-slate-400">'</span>
                             </div>
                        </div>
                        <input type="number" value={match.score_away} onChange={e => setMatch({...match, score_away: parseInt(e.target.value) || 0 })} className="w-16 md:w-20 text-center text-3xl md:text-4xl font-black p-2 rounded-2xl bg-white border border-slate-200 shadow-inner outline-none"/>
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
                <input type="text" value={match.location} onChange={e => setMatch({...match, location: e.target.value})} className="flex-1 bg-transparent border-none font-bold text-xs text-white outline-none" placeholder="Lokalizacja (np. Stadion Zawarcie)"/>
            </div>

            <button onClick={() => handleSaveOrUpdate(match)} className="w-full bg-slate-900 text-white font-[1000] uppercase italic py-4 rounded-[20px] shadow-xl hover:bg-iskra-red transition-all flex items-center justify-center gap-3">
                <Save size={20}/> Zapisz Dane Meczowe
            </button>
        </div>
    );
};