'use client';
import React, { useState, useEffect } from 'react';
import { Shield, Target, Footprints, Trophy, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface Player {
    id: string;
    name: string;
    position: 'GK' | 'DEF' | 'MID' | 'ATT';
    number: number;
    goals: number;
    image: string;
}

export default function SquadPage() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const loadPlayers = () => {
            const saved = localStorage.getItem('iskra_players');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setPlayers(parsed.sort((a: Player, b: Player) => a.number - b.number));
                } catch (e) {
                    console.error("Błąd odczytu zawodników:", e);
                }
            }
        };

        loadPlayers();
        window.addEventListener('storage', loadPlayers);
        return () => window.removeEventListener('storage', loadPlayers);
    }, []);

    const sections = [
        { title: 'Bramkarze', code: 'GK', icon: <Trophy size={16} className="text-slate-950" /> },
        { title: 'Obrońcy', code: 'DEF', icon: <Shield size={16} className="text-slate-950" /> },
        { title: 'Pomocnicy', code: 'MID', icon: <Footprints size={16} className="text-slate-950" /> },
        { title: 'Napastnicy', code: 'ATT', icon: <Target size={16} className="text-slate-950" /> },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION - Twoje teksty, dodana responsywność wielkości */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white z-10" />
                    <div className="absolute inset-0 bg-black/40 z-[5]" /> 
                    <img 
                        src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000" 
                        className="w-full h-full object-cover"
                        alt="Stadion"
                    />
                </div>

                <div className="relative z-20 text-center px-6">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[2px] w-6 md:w-10 bg-iskra-red" />
                        <span className="text-white font-[1000] text-[10px] md:text-xs uppercase tracking-[0.5em]">Iskra Gorzów</span>
                        <div className="h-[2px] w-6 md:w-10 bg-iskra-red" />
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="text-[15vw] md:text-[9rem] font-[1000] uppercase italic tracking-tighter leading-[0.7] text-white/90"
                            style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                            NASZA
                        </h1>
                        <h1 className="text-[15vw] md:text-[9rem] font-[1000] text-iskra-red uppercase italic tracking-tighter leading-[0.7] mt-2"
                            style={{ textShadow: '6px 6px 0px rgba(0,0,0,0.4)' }}>
                            KADRA
                        </h1>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="space-y-16 md:space-y-24">
                    {sections.map((section) => {
                        const filteredPlayers = players.filter(p => p.position === section.code);
                        if (filteredPlayers.length === 0) return null;

                        return (
                            <div key={section.title}>
                                {/* HEADER SEKCJI */}
                                <div className="flex items-center gap-4 mb-8 md:mb-10 border-l-[8px] border-iskra-red pl-4 md:pl-6">
                                    <h2 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter leading-none">
                                        {section.title}
                                    </h2>
                                    <div className="bg-slate-50 p-2 rounded-lg shrink-0">
                                        {section.icon}
                                    </div>
                                </div>

                                {/* GRID ZAWODNIKÓW - Responsywne kolumny */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {filteredPlayers.map((player) => (
                                        <div 
                                            key={player.id} 
                                            className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:border-iskra-red hover:shadow-xl transition-all duration-500"
                                        >
                                            {/* FOTO AREA */}
                                            <div className="relative h-[300px] md:h-[320px] bg-slate-50 overflow-hidden">
                                                {player.image ? (
                                                    <img 
                                                        src={player.image} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                                        alt={player.name}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                                        <User size={60} className="text-slate-200" />
                                                    </div>
                                                )}
                                                
                                                <div className="absolute top-5 left-5 bg-slate-950 text-white px-3.5 py-1.5 rounded-xl shadow-xl z-20">
                                                    <span className="text-lg font-[1000] italic tracking-tighter">
                                                        # {player.number}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* INFO AREA */}
                                            <div className="p-6">
                                                <div className="flex items-center gap-2 mb-3 text-slate-400">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-iskra-red">
                                                        {player.position}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-[1000] uppercase italic tracking-tighter text-slate-950 leading-tight mb-5 group-hover:text-iskra-red transition-colors truncate">
                                                    {player.name}
                                                </h3>
                                                
                                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                    <div className="flex flex-col">
                                                        <span className="text-[9px] font-black uppercase text-slate-400">Statystyki</span>
                                                        <span className="text-lg font-[1000] italic text-slate-950">
                                                            {player.goals} <span className="text-[10px] not-italic text-slate-400 ml-1 uppercase">Goli</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-1.5 w-full bg-iskra-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <Footer />
        </div>
    );
}