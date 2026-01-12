'use client';
import React, { useState, useEffect } from 'react';
import { History, ChevronRight, Trophy, MapPin } from 'lucide-react';
import Link from 'next/link';

interface PastMatch {
    id: string;
    home: string;
    away: string;
    sH: number; 
    sA: number; 
    location?: string;
    date?: string;
}

export const LastMatchesWidget = () => {
    const [matches, setMatches] = useState<PastMatch[]>([]);

    useEffect(() => {
        const sync = () => {
            const saved = localStorage.getItem('iskra_history');
            if (saved) {
                const parsed = JSON.parse(saved);
                setMatches(parsed.slice(0, 3));
            }
        };
        sync();
        window.addEventListener('storage', sync);
        window.addEventListener('iskra_data_update', sync); // Dodatkowe odświeżanie
        return () => {
            window.removeEventListener('storage', sync);
            window.removeEventListener('iskra_data_update', sync);
        };
    }, []);

    return (
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 flex flex-col h-full text-slate-900">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-900 rounded-xl text-white shadow-lg shrink-0">
                        <Trophy size={18} />
                    </div>
                    <div>
                        <h3 className="text-lg md:text-xl font-[1000] uppercase italic tracking-tighter leading-none">Ostatnie wyniki</h3>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Ostatnie 3 mecze</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 md:space-y-4 flex-1">
                {matches.length > 0 ? (
                    matches.map((m) => (
                        <div key={m.id} className="group bg-slate-50 p-4 md:p-5 rounded-[24px] md:rounded-[28px] border border-slate-100 hover:border-iskra-red transition-all shadow-sm">
                            <div className="flex items-center justify-between gap-1 md:gap-2">
                                {/* Gospodarz */}
                                <span className="text-[9px] md:text-[10px] font-[1000] uppercase text-slate-900 truncate flex-1 text-right italic leading-tight">
                                    {m.home}
                                </span>

                                {/* Wynik */}
                                <div className="bg-white px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl border border-slate-200 shadow-sm flex gap-1.5 md:gap-2 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0 mx-1">
                                    <span className="font-black text-xs md:text-sm tabular-nums">{m.sH}</span>
                                    <span className="text-slate-300 font-black text-xs md:text-sm">:</span>
                                    <span className="font-black text-xs md:text-sm tabular-nums">{m.sA}</span>
                                </div>

                                {/* Gość */}
                                <span className="text-[9px] md:text-[10px] font-[1000] uppercase text-slate-900 truncate flex-1 text-left italic leading-tight">
                                    {m.away}
                                </span>
                            </div>

                            {/* Lokalizacja i Data */}
                            <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap items-center justify-between gap-y-1 text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
                                <div className="flex items-center gap-1 min-w-0">
                                    <MapPin size={10} className="text-iskra-red shrink-0" />
                                    <span className="truncate">{m.location || 'Stadion Zawarcie'}</span>
                                </div>
                                <span className="shrink-0">{m.date}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[24px] md:rounded-[32px] gap-2 min-h-[180px]">
                        <History className="text-slate-200" size={28} />
                        <span className="text-[9px] font-black text-slate-300 uppercase italic text-center px-4">Brak wyników w historii</span>
                    </div>
                )}
            </div>

            <Link 
                href="/admin/dashboard/matches" 
                className="mt-6 md:mt-8 group flex items-center justify-center gap-2 w-full py-3.5 md:py-4 bg-slate-900 text-white hover:bg-iskra-red rounded-xl md:rounded-[20px] transition-all text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]"
            >
                Pełna historia
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
};