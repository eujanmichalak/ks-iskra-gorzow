'use client';
import React, { useState, useEffect } from 'react';
import { Trophy, Trash2, ArrowLeft, Calendar, History, MapPin } from 'lucide-react';
import Link from 'next/link';

interface PastMatch {
    id: string;
    home: string;
    away: string;
    sH: number; // Zmienione na sH
    sA: number; // Zmienione na sA
    date: string;
    location?: string;
}

export default function MatchesHistoryPage() {
    const [matches, setMatches] = useState<PastMatch[]>([]);

    useEffect(() => {
        const loadMatches = () => {
            const saved = localStorage.getItem('iskra_history');
            if (saved) {
                setMatches(JSON.parse(saved));
            }
        };
        loadMatches();
        window.addEventListener('storage', loadMatches);
        return () => window.removeEventListener('storage', loadMatches);
    }, []);

    const deleteMatch = (id: string) => {
        if (!confirm("Czy na pewno chcesz trwale usunąć ten wynik z historii?")) return;
        const updated = matches.filter(m => m.id !== id);
        setMatches(updated);
        localStorage.setItem('iskra_history', JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link 
                            href="/admin/dashboard" 
                            className="flex items-center gap-2 text-slate-400 hover:text-iskra-red transition-colors text-[10px] font-black uppercase tracking-widest mb-4"
                        >
                            <ArrowLeft size={14} /> Powrót do pulpitu
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
                            Archiwum <span className="text-iskra-red">Wyników</span>
                        </h1>
                    </div>
                    
                    <div className="bg-white px-6 py-4 rounded-[24px] shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zapisanych spotkań</p>
                            <p className="text-2xl font-[1000] text-slate-900 leading-none">{matches.length}</p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl text-white">
                            <Trophy size={20} />
                        </div>
                    </div>
                </div>

                {/* GRID MECZÓW */}
                {matches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matches.map((m) => (
                            <div 
                                key={m.id} 
                                className="group bg-white rounded-[35px] p-6 shadow-sm border border-slate-100 hover:shadow-2xl hover:border-iskra-red/20 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                            >
                                {/* Top Bar: Data i Usuwanie */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Calendar size={12} className="text-iskra-red" />
                                        {m.date}
                                    </div>
                                    <button 
                                        onClick={() => deleteMatch(m.id)}
                                        className="p-2 text-slate-200 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm"
                                        title="Usuń z historii"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>

                                {/* Main: Wynik */}
                                <div className="flex items-center justify-between gap-3 py-2">
                                    <span className="text-xs font-[1000] uppercase text-slate-900 truncate flex-1 text-right italic leading-tight">
                                        {m.home}
                                    </span>

                                    <div className="bg-slate-950 text-white px-4 py-2 rounded-2xl shadow-lg flex gap-2 items-center group-hover:scale-110 transition-transform">
                                        <span className="text-lg font-[1000] tabular-nums">{m.sH}</span>
                                        <span className="text-white/20 font-black italic">:</span>
                                        <span className="text-lg font-[1000] tabular-nums">{m.sA}</span>
                                    </div>

                                    <span className="text-xs font-[1000] uppercase text-slate-900 truncate flex-1 text-left italic leading-tight">
                                        {m.away}
                                    </span>
                                </div>
                                
                                {/* Bottom: Lokalizacja */}
                                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2">
                                    <MapPin size={12} className="text-slate-300" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">
                                        {m.location || 'Stadion Zawarcie'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-[40px] py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                        <div className="p-8 bg-slate-50 rounded-full mb-6 text-slate-200">
                            <History size={64} />
                        </div>
                        <h3 className="text-2xl font-[1000] text-slate-900 uppercase italic tracking-tighter">Brak historii</h3>
                        <p className="text-slate-400 font-medium mt-2">Wszystkie zakończone mecze pojawią się w tym miejscu.</p>
                        <Link 
                            href="/admin/dashboard" 
                            className="mt-8 px-8 py-4 bg-slate-950 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-iskra-red transition-colors"
                        >
                            Wróć do reżyserki
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}