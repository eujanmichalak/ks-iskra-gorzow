'use client';
import React, { useState, useEffect } from 'react';
import { Shield, Target, Footprints, Trophy, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';

interface Player {
    id: string;
    name: string;
    position: string;
    number: number;
    goals: number;
    image: string;
}

export default function SquadPage() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPlayers = async () => {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .order('number', { ascending: true });
        
        if (!error && data) setPlayers(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    const sections = [
        { title: 'Bramkarze', filter: 'BRAMKARZ', icon: <Trophy size={16} className="text-slate-950" /> },
        { title: 'Obrońcy', filter: 'OBROŃCA', icon: <Shield size={16} className="text-slate-950" /> },
        { title: 'Pomocnicy', filter: 'POMOCNIK', icon: <Footprints size={16} className="text-slate-950" /> },
        { title: 'Napastnicy', filter: 'NAPASTNIK', icon: <Target size={16} className="text-slate-950" /> },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden">
            <Navbar />
            {/* HERO SECTION - BEZ ZMIAN */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white z-10" />
                    <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000" className="w-full h-full object-cover" alt="Stadion" />
                </div>
                <div className="relative z-20 text-center px-6 italic font-[1000]">
                    <h1 className="text-[15vw] md:text-[9rem] text-white/90 leading-[0.7] tracking-tighter uppercase">NASZA</h1>
                    <h1 className="text-[15vw] md:text-[9rem] text-iskra-red leading-[0.7] tracking-tighter uppercase mt-2">KADRA</h1>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
                {loading ? (
                    <div className="text-center font-black uppercase animate-pulse">Ładowanie składu...</div>
                ) : (
                    <div className="space-y-16 md:space-y-24">
                        {sections.map((section) => {
                            const filteredPlayers = players.filter(p => p.position === section.filter);
                            if (filteredPlayers.length === 0) return null;

                            return (
                                <div key={section.title}>
                                    <div className="flex items-center gap-4 mb-8 md:mb-10 border-l-[8px] border-iskra-red pl-4 md:pl-6">
                                        <h2 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter leading-none">{section.title}</h2>
                                        <div className="bg-slate-50 p-2 rounded-lg shrink-0">{section.icon}</div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {filteredPlayers.map((player) => (
                                            <div key={player.id} className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:border-iskra-red transition-all duration-500">
                                                <div className="relative h-[300px] md:h-[320px] bg-slate-50 overflow-hidden">
                                                    {player.image ? (
                                                        <img src={player.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={player.name} />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-slate-100"><User size={60} className="text-slate-200" /></div>
                                                    )}
                                                    <div className="absolute top-5 left-5 bg-slate-950 text-white px-3.5 py-1.5 rounded-xl z-20 font-[1000] italic"># {player.number}</div>
                                                </div>
                                                <div className="p-6">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-iskra-red">{player.position}</span>
                                                    <h3 className="text-xl font-[1000] uppercase italic tracking-tighter text-slate-950 mb-5 truncate group-hover:text-iskra-red transition-colors">{player.name}</h3>
                                                    <div className="flex flex-col pt-4 border-t border-slate-50">
                                                        <span className="text-[9px] font-black uppercase text-slate-400">Statystyki</span>
                                                        <span className="text-lg font-[1000] italic text-slate-950">{player.goals} <span className="text-[10px] not-italic text-slate-400 ml-1 uppercase">Goli</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}