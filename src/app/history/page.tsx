'use client';
import React from 'react';
import { History as HistoryIcon, Trophy, Star, Target } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HistoryPage() {
    const events = [
        { year: '2005', title: 'ZAŁOŻENIE KLUBU', desc: 'Początek wielkiej historii Iskry Gorzów na Zawarciu.', icon: <Star /> },
        { year: '2010', title: 'AWANS DO KLASY O', desc: 'Pierwszy wielki sukces sportowy seniorskiej drużyny.', icon: <Trophy /> },
        { year: '2015', title: 'ROZWÓJ INFRASTRUKTURY', desc: 'Modernizacja boisk przy ulicy Strażackiej.', icon: <Target /> },
        { year: '2024', title: 'NOWA ERA', desc: 'Uruchomienie nowoczesnego systemu szkolenia i nowej tożsamości.', icon: <HistoryIcon /> },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION - Styl jak w Nasza Kadra */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white z-10" />
                    <img src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2000" className="w-full h-full object-cover" alt="Stadion Historycznie" />
                </div>
                <div className="relative z-20 text-center px-6 italic font-[1000]">
                    <h1 className="text-[15vw] md:text-[9rem] text-white/90 leading-[0.7] tracking-tighter uppercase">NASZA</h1>
                    <h1 className="text-[15vw] md:text-[9rem] text-iskra-red leading-[0.7] tracking-tighter uppercase mt-2">HISTORIA</h1>
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-4 md:px-6 py-20 relative">
                {/* Oś czasu */}
                <div className="hidden md:block absolute left-1/2 top-20 bottom-20 w-[2px] bg-slate-100 -translate-x-1/2" />

                <div className="space-y-24">
                    {events.map((event, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                                {/* Punkt na osi */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-iskra-red rounded-full z-20 items-center justify-center text-iskra-red shadow-xl">
                                    {event.icon}
                                </div>

                                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                    <span className="text-4xl md:text-6xl font-[1000] italic text-slate-100 block leading-none mb-2">{event.year}</span>
                                    <h3 className="text-2xl md:text-4xl font-[1000] uppercase italic tracking-tighter text-slate-950 mb-4 leading-tight">{event.title}</h3>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed">{event.desc}</p>
                                </div>
                                <div className="w-full md:w-1/2 h-1 md:h-0" />
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
}