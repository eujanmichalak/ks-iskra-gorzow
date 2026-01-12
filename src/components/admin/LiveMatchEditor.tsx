'use client';
import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Plus, Save, MapPin, Clock } from 'lucide-react';
import { LIVE_MATCH } from '@/lib/data';

interface MatchEvent {
    team: 'home' | 'away';
    min: number;
    player: string;
}

interface MatchState {
    home: string;
    away: string;
    scoreHome: number;
    scoreAway: number;
    minute: number;
    status: string;
    location: string;
    events: MatchEvent[];
}

export const LiveMatchEditor = () => {
    const [match, setMatch] = useState<MatchState>({ ...LIVE_MATCH });
    const [newGoalPlayer, setNewGoalPlayer] = useState('');
    const [newGoalMin, setNewGoalMin] = useState('');
    const [newGoalTeam, setNewGoalTeam] = useState<'home' | 'away'>('home');

    useEffect(() => {
        const saved = localStorage.getItem('iskra_live_match');
        if (saved) setMatch(JSON.parse(saved));
    }, []);

    const save = (updatedMatch: MatchState) => {
        const cleanMatch = {
            ...updatedMatch,
            minute: updatedMatch.minute > 90 ? 90 : updatedMatch.minute
        };
        localStorage.setItem('iskra_live_match', JSON.stringify(cleanMatch));
        setMatch(cleanMatch);
        window.dispatchEvent(new Event('iskra_data_update'));
    };

    useEffect(() => {
        let interval: any;
        if (match.status === 'live' && match.minute < 90) {
            interval = setInterval(() => {
                const currentSaved = localStorage.getItem('iskra_live_match');
                const latestData = currentSaved ? JSON.parse(currentSaved) : match;
                
                if (latestData.minute < 90) {
                    const updated = { 
                        ...latestData, 
                        minute: latestData.minute + 1 
                    };
                    save(updated);
                }
            }, 60000);
        }
        return () => clearInterval(interval);
    }, [match.status, match.minute]); 

    const saveToHistory = () => {
        const savedHistory = localStorage.getItem('iskra_history');
        const history = savedHistory ? JSON.parse(savedHistory) : [];

        const newEntry = {
            id: Date.now().toString(),
            home: match.home,
            away: match.away,
            sH: match.scoreHome,
            sA: match.scoreAway,
            location: match.location || 'Stadion Zawarcie',
            date: new Date().toLocaleDateString('pl-PL', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        };

        localStorage.setItem('iskra_history', JSON.stringify([newEntry, ...history]));
    };

    const handleStop = () => {
        if(!confirm("Zakończyć mecz? Wynik zostanie zapisany w historii i sekcji ligowej.")) return;
        saveToHistory();
        const resetMatch: MatchState = {
            ...match,
            status: 'finished',
            minute: 0,
            scoreHome: 0,
            scoreAway: 0,
            events: []
        };
        save(resetMatch);
        alert("Mecz zapisany pomyślnie!");
    };

    const addGoal = () => {
        if (!newGoalPlayer) return;
        const currentSaved = localStorage.getItem('iskra_live_match');
        const latestData = currentSaved ? JSON.parse(currentSaved) : match;

        const goalMin = Number(newGoalMin) || latestData.minute;
        const newEvent: MatchEvent = { team: newGoalTeam, min: goalMin, player: newGoalPlayer };
        
        const updatedMatch: MatchState = {
            ...latestData,
            scoreHome: newGoalTeam === 'home' ? latestData.scoreHome + 1 : latestData.scoreHome,
            scoreAway: newGoalTeam === 'away' ? latestData.scoreAway + 1 : latestData.scoreAway,
            events: [newEvent, ...(latestData.events || [])]
        };
        
        save(updatedMatch);
        setNewGoalPlayer('');
        setNewGoalMin('');
    };

    return (
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 md:space-y-8 text-slate-900">
            {/* Header Kontrolny */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">MECZ LIVE</h3>
                
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => save({ ...match, status: 'live' })} className="flex-1 sm:flex-none p-4 bg-green-500 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex justify-center"><Play size={20}/></button>
                    <button onClick={() => save({ ...match, status: 'break' })} className="flex-1 sm:flex-none p-4 bg-orange-500 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex justify-center"><Pause size={20}/></button>
                    <button onClick={handleStop} title="Zakończ i Zapisz" className="flex-1 sm:flex-none p-4 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all flex justify-center"><Square size={20}/></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Panel Drużyn */}
                <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-[28px] md:rounded-[32px] border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-400 ml-2">Wynik i Czas</p>
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <input type="text" value={match.home} onChange={e => setMatch({...match, home: e.target.value})} className="p-3 rounded-xl border border-slate-200 font-bold text-xs md:text-sm bg-white outline-none focus:border-slate-950" placeholder="Gospodarz"/>
                        <input type="text" value={match.away} onChange={e => setMatch({...match, away: e.target.value})} className="p-3 rounded-xl border border-slate-200 font-bold text-xs md:text-sm bg-white outline-none focus:border-slate-950" placeholder="Gość"/>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 justify-center py-2 md:py-4 text-slate-900">
                        <input type="number" value={match.scoreHome} onChange={e => setMatch({...match, scoreHome: parseInt(e.target.value) || 0})} className="w-16 md:w-20 text-center text-3xl md:text-4xl font-black p-2 rounded-2xl bg-white border border-slate-200 shadow-inner outline-none"/>
                        <div className="flex flex-col items-center bg-white px-3 md:px-4 py-2 rounded-2xl border border-slate-200 shadow-sm min-w-[60px]">
                             <Clock size={14} className="text-iskra-red mb-1" />
                             <div className="flex items-center">
                                <input type="number" value={match.minute} onChange={e => setMatch({...match, minute: parseInt(e.target.value) || 0})} className="w-8 text-center font-black text-sm outline-none bg-transparent"/>
                                <span className="text-[10px] font-bold text-slate-400">'</span>
                             </div>
                        </div>
                        <input type="number" value={match.scoreAway} onChange={e => setMatch({...match, scoreAway: parseInt(e.target.value) || 0})} className="w-16 md:w-20 text-center text-3xl md:text-4xl font-black p-2 rounded-2xl bg-white border border-slate-200 shadow-inner outline-none"/>
                    </div>
                </div>

                {/* Panel Wydarzeń */}
                <div className="space-y-4 bg-slate-50 p-4 md:p-6 rounded-[28px] md:rounded-[32px] border border-slate-100">
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
                        <h4 className="font-black uppercase text-[10px] md:text-xs tracking-widest text-slate-400">Strzelcy bramek</h4>
                        <span className="text-[9px] font-black text-iskra-red uppercase italic bg-white px-2 py-1 rounded-lg border border-slate-100">
                            Dla: {newGoalTeam === 'home' ? (match.home || 'Gosp.') : (match.away || 'Gość')}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setNewGoalTeam('home')} 
                            className={`flex-1 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase border transition-all truncate px-2
                                ${newGoalTeam === 'home' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-900'}`}
                        >
                            {match.home || 'Gospodarz'}
                        </button>
                        <button 
                            onClick={() => setNewGoalTeam('away')} 
                            className={`flex-1 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase border transition-all truncate px-2
                                ${newGoalTeam === 'away' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-900'}`}
                        >
                            {match.away || 'Gość'}
                        </button>
                    </div>
                    <input type="text" placeholder="Nazwisko strzelca" value={newGoalPlayer} onChange={e => setNewGoalPlayer(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 font-bold text-sm bg-white text-slate-900 outline-none focus:border-slate-950"/>
                    <div className="flex gap-2">
                        <input type="number" placeholder="Min" value={newGoalMin} onChange={e => setNewGoalMin(e.target.value)} className="w-20 md:w-24 p-3 rounded-xl border border-slate-200 font-bold text-sm bg-white text-slate-900 outline-none focus:border-slate-950"/>
                        <button onClick={addGoal} className="flex-1 bg-slate-900 text-white rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-iskra-red active:scale-95 transition-all shadow-lg">
                            <Plus size={16}/> <span className="hidden xs:inline">Dodaj Gol</span><span className="xs:hidden">Gol</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Miejsce spotkania */}
            <div className="p-4 bg-slate-950 rounded-2xl flex items-center gap-3 shadow-inner">
                <MapPin size={18} className="text-iskra-red shrink-0" />
                <input type="text" value={match.location} onChange={e => setMatch({...match, location: e.target.value})} className="flex-1 bg-transparent border-none font-bold text-xs text-white outline-none placeholder:text-slate-600" placeholder="Lokalizacja (np. Stadion Zawarcie)"/>
            </div>

            <button onClick={() => save(match)} className="w-full bg-slate-900 text-white font-[1000] uppercase italic py-4 md:py-5 rounded-[20px] md:rounded-[24px] shadow-xl hover:bg-iskra-red active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                <Save size={20}/> Aktualizuj mecz live
            </button>
        </div>
    );
};