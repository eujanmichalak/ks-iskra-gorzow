'use client';
import React from 'react';
import { Users, Trophy, Target, Shield, ArrowRight, Star } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function AkademiaPage() {
    const groups = [
        { name: 'Skrzaty', age: '4-6 lat', days: 'Wtorek, Czwartek', time: '16:30' },
        { name: 'Żaki', age: '7-8 lat', days: 'Poniedziałek, Środa', time: '17:00' },
        { name: 'Orliki', age: '9-10 lat', days: 'Poniedziałek, Środa, Piątek', time: '17:00' },
        { name: 'Młodziki', age: '11-13 lat', days: 'Wtorek, Czwartek, Piątek', time: '18:30' },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION - Styl jak w Nasza Kadra */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white z-10" />
                    <img src="https://images.unsplash.com/photo-1526232761682-d26e4f9c8816?q=80&w=2000" className="w-full h-full object-cover" alt="Trening" />
                </div>
                <div className="relative z-20 text-center px-6 italic font-[1000]">
                    <h1 className="text-[15vw] md:text-[9rem] text-white/90 leading-[0.7] tracking-tighter uppercase">MŁODA</h1>
                    <h1 className="text-[15vw] md:text-[9rem] text-iskra-red leading-[0.7] tracking-tighter uppercase mt-2">ISKRA</h1>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
                {/* Grupy Treningowe */}
                <div className="flex items-center gap-4 mb-12 border-l-[8px] border-iskra-red pl-4 md:pl-6">
                    <h2 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter leading-none">GRUPY NABOROWE</h2>
                    <div className="bg-slate-50 p-2 rounded-lg"><Star size={24} className="text-iskra-red" fill="currentColor" /></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {groups.map((g, i) => (
                        <div key={i} className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:border-iskra-red transition-all duration-500 p-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-iskra-red">{g.age}</span>
                            <h3 className="text-3xl font-[1000] uppercase italic tracking-tighter text-slate-950 mt-2 mb-6 group-hover:text-iskra-red transition-colors">{g.name}</h3>
                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Terminy</span>
                                    <span className="text-sm font-bold uppercase italic">{g.days}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Godzina</span>
                                    <span className="text-sm font-bold uppercase italic">{g.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA BOX */}
                <div className="relative bg-slate-950 rounded-[40px] p-8 md:p-16 overflow-hidden">
                    <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
                        <Trophy size={400} className="text-white" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-[1000] text-white uppercase italic tracking-tighter leading-none mb-6">
                            PIERWSZY TRENING <span className="text-iskra-red">GRATIS</span>
                        </h2>
                        <p className="text-slate-400 font-medium text-lg mb-8">Nie czekaj, aż talent sam się odkryje. Przyprowadź dziecko na trening i poczuj atmosferę Iskry Gorzów.</p>
                        <button 
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-iskra-red text-white font-[1000] uppercase italic px-10 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
                        >
                            ZAPISZ DZIECKO TERAZ <ArrowRight size={24} />
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}