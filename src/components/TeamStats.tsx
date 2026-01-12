'use client';
import React from 'react';
import { Sword, ShieldAlert, Layers, Flame } from 'lucide-react';
import { TEAM_STATS } from '@/lib/data';

export const TeamStats = () => (
    <section id="stats" className="py-12 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

            {/* NAGŁÓWEK STATYSTYK */}
            <div className="mb-10 md:mb-16">
                <span className="text-slate-950 font-[1000] text-xs uppercase tracking-[0.4em] mb-2 block">
                    Sezon w liczbach
                </span>
                <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 italic uppercase tracking-tighter leading-tight">
                    Statystyki <span className="text-iskra-red">Zespołu</span>
                </h2>
                <div className="h-[3px] w-20 md:w-24 bg-slate-900 mt-4 md:mt-6 rounded-full"></div>
            </div>

            {/* GRID: 1 kolumna na mobile, 2 na tablet, 4 na desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                {/* GOLE STRZELONE */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:bg-slate-900 transition-all duration-500 cursor-default">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-white/10 group-hover:text-green-400 transition-all">
                            <Sword size={28} />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Ofensywa</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl md:text-6xl font-[1000] text-slate-900 italic tracking-tighter group-hover:text-white transition-colors">
                            {TEAM_STATS.goalsScored}
                        </span>
                        <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-slate-400">Gole Strzelone</span>
                    </div>
                </div>

                {/* GOLE STRACONE */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:bg-slate-900 transition-all duration-500 cursor-default">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-white/10 group-hover:text-blue-400 transition-all">
                            <ShieldAlert size={28} />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Defensywa</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl md:text-6xl font-[1000] text-slate-900 italic tracking-tighter group-hover:text-white transition-colors">
                            {TEAM_STATS.goalsConceded}
                        </span>
                        <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-slate-400">Gole Stracone</span>
                    </div>
                </div>

                {/* ŻÓŁTE KARTKI */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:bg-slate-900 transition-all duration-500 cursor-default">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-500 group-hover:bg-white/10 group-hover:text-yellow-400 transition-all">
                            <Layers size={28} />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Dyscyplina</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl md:text-6xl font-[1000] text-slate-900 italic tracking-tighter group-hover:text-white transition-colors">
                            {TEAM_STATS.yellowCards}
                        </span>
                        <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-slate-400">Żółte Kartki</span>
                    </div>
                </div>

                {/* CZERWONE KARTKI */}
                <div className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 group hover:bg-slate-900 transition-all duration-500 cursor-default">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-white/10 group-hover:text-red-400 transition-all">
                            <Flame size={28} />
                        </div>
                        <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kary</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl md:text-6xl font-[1000] text-slate-900 italic tracking-tighter group-hover:text-white transition-colors">
                            {TEAM_STATS.redCards}
                        </span>
                        <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-widest mt-2 group-hover:text-slate-400">Czerwone Kartki</span>
                    </div>
                </div>

            </div>
        </div>
    </section>
);