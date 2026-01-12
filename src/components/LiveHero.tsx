'use client';
import React, { useState, useEffect } from 'react';
import { Goal, MapPin, Activity } from 'lucide-react';
import { LIVE_MATCH as DEFAULT_MATCH } from '@/lib/data';

export const LiveHero = () => {
    const [match, setMatch] = useState({ ...DEFAULT_MATCH });
    const logoIskra = "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/420048755_876503211141570_1870842103319874308_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hNIB1eW4zzsQ7kNvwETleDi&_nc_oc=AdlIgngstdCsYf_ofPw4u9AkfV7S4xG-uBse7NWdBgunz7a_5SOEvrTzj5n2OFlq90o5HqkTZWj4VftL-c83ugOm&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=1DC7xf588E0vuiD8D3E0zg&oh=00_Afr6Uzkm7v7uH64oAP5o-OPnlcZ4B1Nn1shwq5QxebUXmQ&oe=69676F0F";
    const logoPlaceholder = "https://via.placeholder.com/150/f1f5f9/94a3b8?text=FC";

    useEffect(() => {
        const syncData = () => {
            try {
                const saved = localStorage.getItem('iskra_live_match');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed && parsed.home) {
                        setMatch(parsed);
                    }
                }
            } catch (error) {
                console.error("Błąd synchronizacji LiveHero:", error);
            }
        };

        syncData();
        window.addEventListener('storage', syncData);
        const interval = setInterval(syncData, 2000);

        return () => {
            window.removeEventListener('storage', syncData);
            clearInterval(interval);
        };
    }, []);

    const getLogo = (teamName: string) => teamName.toLowerCase().includes('iskra') ? logoIskra : logoPlaceholder;

    return (
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-slate-50 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-8 md:mb-10">
                    <span className="text-slate-900 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-3 block">Centrum Meczowe</span>
                    <h1 className="text-3xl md:text-6xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-none">
                        Śledź nasz mecz <span className="text-iskra-red">na żywo</span>
                    </h1>
                    <p className="text-slate-400 font-medium mt-4 max-w-lg mx-auto text-xs md:text-base px-4">
                        Bądź na bieżąco z każdym golem i kluczową akcją. Relacja aktualizowana w czasie rzeczywistym.
                    </p>
                </div>

                <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
                    {/* STATUS LIVE */}
                    <div className="flex justify-center pt-6 md:pt-8">
                        <div className={`px-4 py-1 rounded-full flex items-center gap-2 ${match.status === 'live' ? 'bg-red-600 animate-pulse' : 'bg-slate-400'}`}>
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            <span className="text-[10px] text-white font-[1000] uppercase tracking-widest">
                                {match.status === 'live' ? `Live ${match.minute}'` : match.status === 'break' ? 'Przerwa' : 'Mecz zakończony'}
                            </span>
                        </div>
                    </div>

                    {/* WYNIK - POPRAWIONY FLEX DLA MOBILE */}
                    <div className="flex flex-row items-center justify-between md:justify-center gap-2 md:gap-12 py-8 md:py-10 px-4 md:px-10">
                        {/* Gospodarz */}
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 justify-center md:justify-end text-center md:text-right">
                            <h2 className="text-[10px] md:text-2xl font-[1000] uppercase italic text-slate-900 order-2 md:order-1 leading-tight">{match.home}</h2>
                            <img src={getLogo(match.home)} className="w-12 h-12 md:w-24 md:h-24 rounded-full border shadow-md object-contain order-1 md:order-2" />
                        </div>

                        {/* Rezultat */}
                        <div className="bg-slate-900 px-4 md:px-8 py-3 md:py-4 rounded-[18px] md:rounded-[24px] text-white flex items-center shadow-xl">
                            <span className="text-3xl md:text-7xl font-[1000] tabular-nums">{match.scoreHome}</span>
                            <span className="text-xl md:text-5xl font-black text-white/20 px-2 md:px-4">:</span>
                            <span className="text-3xl md:text-7xl font-[1000] tabular-nums">{match.scoreAway}</span>
                        </div>

                        {/* Gość */}
                        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 justify-center md:justify-start text-center md:text-left">
                            <img src={getLogo(match.away)} className="w-12 h-12 md:w-24 md:h-24 rounded-full border shadow-md object-contain" />
                            <h2 className="text-[10px] md:text-2xl font-[1000] uppercase italic text-slate-900 leading-tight">{match.away}</h2>
                        </div>
                    </div>

                    {/* TIMELINE ZDARZEŃ - DOSTOSOWANY DO WĄSKICH EKRANÓW */}
                    <div className="bg-slate-50/50 border-t border-slate-100 py-8 md:py-10 px-4 md:px-6">
                        <div className="max-w-md mx-auto relative">
                            {match.events && match.events.length > 0 ? (
                                <>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-200"></div>
                                    <div className="space-y-6 md:space-y-8 relative">
                                        {match.events.map((e, i) => (
                                            <div key={i} className={`flex items-center gap-2 md:gap-4 ${e.team === 'home' ? 'flex-row' : 'flex-row-reverse'}`}>
                                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                                    <div className="bg-white border-2 border-slate-200 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center z-10 shadow-sm">
                                                        <Goal size={12} className="text-slate-900" />
                                                    </div>
                                                </div>
                                                <div className={`w-1/2 ${e.team === 'home' ? 'text-right pr-6 md:pr-10' : 'text-left pl-6 md:pl-10'}`}>
                                                    <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase block">{e.min}'</span>
                                                    <span className="text-[11px] md:text-sm font-[1000] uppercase italic text-slate-900 leading-none">{e.player}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4 flex flex-col items-center gap-3">
                                    <Activity size={24} className="text-slate-200 animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 italic">Brak wydarzeń meczowych</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white py-4 px-6 md:px-10 border-t border-slate-100 flex justify-center items-center gap-3 md:gap-4">
                        <MapPin size={10} className="text-iskra-red shrink-0" />
                        <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">
                            {match.location || 'Stadion Zawarcie'}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};