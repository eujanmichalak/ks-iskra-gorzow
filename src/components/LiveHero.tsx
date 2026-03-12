'use client';
import React, { useState, useEffect } from 'react';
import { Goal, MapPin, Activity } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const LiveHero = () => {
    const [match, setMatch] = useState<any>(null);
    const [displayMinute, setDisplayMinute] = useState(0);

    const logoIskra = "/photos/iskra.png";
    const logoPlaceholder = "https://via.placeholder.com/150/f1f5f9/94a3b8?text=FC";

    const fetchMatch = async () => {
        const { data } = await supabase.from('live_match').select('*').eq('id', 1).single();
        if (data) setMatch(data);
    };

    useEffect(() => {
        if (match?.status === 'live' && match?.start_time) {
            const calculate = () => {
                const start = new Date(match.start_time).getTime();
                const now = new Date().getTime();
                const diff = Math.floor((now - start) / 60000) + 1;
                setDisplayMinute(diff > 95 ? 95 : diff);
            };
            calculate();
            const interval = setInterval(calculate, 10000);
            return () => clearInterval(interval);
        } else if (match) {
            setDisplayMinute(match.minute || 0);
        }
    }, [match]);

    useEffect(() => {
        fetchMatch();
        const channel = supabase
            .channel('live-updates')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'live_match' }, (payload) => {
                setMatch(payload.new);
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, []);

    if (!match) return null;
    const getLogo = (teamName: string) => teamName?.toLowerCase().includes('iskra') ? logoIskra : logoPlaceholder;

    return (
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-8 md:mb-10">
                    {/* ZMIANA: slate-900 na czarny i bold */}
                    <span className="text-black font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-3 block">Centrum Meczowe</span>
                    <h1 className="text-3xl md:text-6xl font-[1000] text-black uppercase italic tracking-tighter leading-none">
                        Śledź nasz mecz <span className="text-iskra-red">na żywo</span>
                    </h1>
                </div>

                <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
                    <div className="flex justify-center pt-6 md:pt-8">
                        <div className={`px-4 py-1 rounded-full flex items-center gap-2 ${match.status === 'live' ? 'bg-red-600 animate-pulse' : 'bg-black'}`}>
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            <span className="text-[10px] text-white font-[1000] uppercase tracking-widest">
                                {match.status === 'live' ? `Live ${displayMinute}'` : match.status === 'break' ? 'Przerwa' : 'Mecz zakończony'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row items-center justify-between md:justify-center gap-2 md:gap-12 py-8 md:py-10 px-4 md:px-10">
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 justify-center md:justify-end text-center md:text-right">
                            {/* ZMIANA: text-black font-1000 */}
                            <h2 className="text-[11px] md:text-2xl font-[1000] uppercase italic text-black order-2 md:order-1 leading-tight">{match.home}</h2>
                            <img src={getLogo(match.home)} className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-slate-200 shadow-md object-contain order-1 md:order-2 bg-white p-1" />
                        </div>

                        <div className="bg-black px-4 md:px-8 py-3 md:py-4 rounded-[18px] md:rounded-[24px] text-white flex items-center shadow-2xl">
                            <span className="text-3xl md:text-7xl font-[1000] tabular-nums">{match.score_home}</span>
                            <span className="text-xl md:text-5xl font-black text-white/30 px-2 md:px-4">:</span>
                            <span className="text-3xl md:text-7xl font-[1000] tabular-nums">{match.score_away}</span>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 justify-center md:justify-start text-center md:text-left">
                            <img src={getLogo(match.away)} className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-slate-200 shadow-md object-contain bg-white p-1" />
                            <h2 className="text-[11px] md:text-2xl font-[1000] uppercase italic text-black leading-tight">{match.away}</h2>
                        </div>
                    </div>

                    <div className="bg-slate-50 border-t border-slate-200 py-8 md:py-10 px-4 md:px-6">
                        <div className="max-w-md mx-auto relative">
                            {match.events && match.events.length > 0 ? (
                                <>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-300"></div>
                                    <div className="space-y-6 md:space-y-8 relative">
                                        {match.events.map((e: any, i: number) => (
                                            <div key={i} className={`flex items-center gap-2 md:gap-4 ${e.team === 'home' ? 'flex-row' : 'flex-row-reverse'}`}>
                                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                                    <div className="bg-white border-2 border-black w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 shadow-sm">
                                                        <Goal size={12} className="text-black" />
                                                    </div>
                                                </div>
                                                <div className={`w-1/2 ${e.team === 'home' ? 'text-right pr-6 md:pr-10' : 'text-left pl-6 md:pl-10'}`}>
                                                    {/* ZMIANA: minuty na czarny slate-950 */}
                                                    <span className="text-[9px] md:text-[10px] font-black text-black uppercase block">{e.min}'</span>
                                                    <span className="text-[11px] md:text-sm font-[1000] uppercase italic text-black leading-none">{e.player}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4 flex flex-col items-center gap-3">
                                    <Activity size={24} className="text-slate-400 animate-pulse" />
                                    {/* ZMIANA: Napis o braku wydarzeń na wyraźniejszy */}
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 italic">Oczekiwanie na wydarzenia...</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white py-4 px-6 md:px-10 border-t border-slate-200 flex justify-center items-center gap-3 md:gap-4">
                        <MapPin size={10} className="text-black shrink-0" />
                        {/* ZMIANA: Lokalizacja na czarną */}
                        <span className="text-[9px] md:text-[10px] font-[1000] text-black uppercase tracking-[0.2em] text-center">
                            {match.location || 'Stadion Zawarcie'}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};