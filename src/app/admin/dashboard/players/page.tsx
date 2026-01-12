'use client';
import React, { useState, useEffect } from 'react';
import { Shield, ArrowLeft, Users, Trophy, User } from 'lucide-react'; // Dodano User
import Link from 'next/link';

interface Player {
    id: string;
    name: string;
    position: string;
    number: number;
    goals: number;
    image: string;
}

export default function PlayersPage() {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const load = () => {
            try {
                const saved = localStorage.getItem('iskra_players');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // Zabezpieczenie: upewniamy się, że każdy gracz ma domyślne wartości
                    const sanitized = parsed.map((p: any) => ({
                        ...p,
                        goals: p.goals || 0,
                        name: p.name || 'Nieznany Zawodnik',
                        number: p.number || 0
                    }));
                    setPlayers(sanitized);
                }
            } catch (err) {
                console.error("Błąd ładowania graczy:", err);
            }
        };
        load();
        window.addEventListener('storage', load);
        return () => window.removeEventListener('storage', load);
    }, []);

    const posLabels = { 
        GK: 'Bramkarze', 
        DEF: 'Obrońcy', 
        MID: 'Pomocnicy', 
        ATT: 'Napastniki' 
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                    <div>
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-iskra-red transition-colors text-[10px] font-black uppercase mb-4">
                            <ArrowLeft size={14} /> Pulpit sterowniczy
                        </Link>
                        <h1 className="text-5xl font-[1000] text-slate-900 uppercase italic tracking-tighter">
                            KADRA <span className="text-iskra-red italic">ISKRA GORZÓW</span>
                        </h1>
                    </div>
                    <div className="bg-white px-8 py-4 rounded-[28px] shadow-sm border border-slate-100 flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bramki sezon</p>
                            <p className="text-2xl font-[1000] text-iskra-red">
                                {players.reduce((acc, curr) => acc + (Number(curr.goals) || 0), 0)}
                            </p>
                        </div>
                        <div className="h-10 w-[1px] bg-slate-100"></div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kadra</p>
                            <p className="text-2xl font-[1000] text-slate-900">{players.length}</p>
                        </div>
                    </div>
                </div>

                {/* Sekcje pozycji */}
                {Object.entries(posLabels).map(([key, label]) => {
                    const filtered = players.filter(p => p.position === key);
                    if (filtered.length === 0) return null;
                    return (
                        <div key={key} className="mb-16">
                            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-8 flex items-center gap-4">
                                {label} <div className="h-px flex-1 bg-slate-200"></div>
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                                {filtered.map(player => (
                                    <div key={player.id} className="group relative">
                                        <div className="aspect-[3/4] rounded-[35px] overflow-hidden bg-white border-2 border-slate-100 shadow-sm transition-all duration-500 group-hover:border-iskra-red group-hover:-translate-y-2">
                                            {player.image ? (
                                                <img src={player.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={player.name} />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                                    <User size={48} />
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-slate-950 text-white w-10 h-10 rounded-xl flex items-center justify-center font-[1000] italic text-lg shadow-xl">
                                                {player.number}
                                            </div>
                                            {Number(player.goals) > 0 && (
                                                <div className="absolute top-4 right-4 bg-iskra-red text-white px-3 py-1 rounded-lg flex items-center gap-1 shadow-lg scale-0 group-hover:scale-100 transition-transform">
                                                    <Trophy size={10} fill="currentColor" />
                                                    <span className="text-[10px] font-[1000]">{player.goals}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <h3 className="text-sm font-[1000] uppercase italic text-slate-900">{player.name}</h3>
                                            <p className="text-[9px] font-black text-slate-300 uppercase mt-1 tracking-widest">{player.goals || 0} GOLI</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}