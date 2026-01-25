'use client';
import React from 'react';
import { Star, Trophy, Target, History as HistoryIcon } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HistoryPage() {
    const events = [
        { year: '2005', title: 'Założenie Klubu', desc: 'Początek piłkarskiej drogi Iskry Gorzów na gorzowskim Zawarciu.' },
        { year: '2008', title: 'Pierwszy Sukces', desc: 'Awans do wyższej klasy rozgrywkowej po znakomitym sezonie.' },
        { year: '2012', title: 'Stadion', desc: 'Modernizacja murawy i zaplecza treningowego przy ul. Strażackiej.' },
        { year: '2018', title: 'Akademia', desc: 'Uruchomienie profesjonalnego systemu szkolenia dzieci i młodzieży.' }
    ];

    return (
        <main className="bg-white min-h-screen text-slate-900">
            <Navbar />

            {/* Nagłówek */}
            <section className="pt-32 pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Od 2005 Roku</span>
                    <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-none mb-6">
                        Nasza Historia
                    </h1>
                </div>
            </section>

            {/* Timeline - Spokojniejszy, cienkie linie */}
            <section className="py-20 relative">
                {/* Linia tła */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2"></div>

                <div className="max-w-5xl mx-auto px-4">
                    <div className="space-y-24">
                        {events.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 relative`}>
                                    
                                    {/* Rok jako punkt centralny */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full z-10"></div>

                                    {/* Treść */}
                                    <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className="text-2xl font-[1000] italic text-slate-300 block mb-2">{event.year}</span>
                                        <h3 className="text-2xl font-[1000] uppercase italic text-slate-900 mb-4">{event.title}</h3>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">
                                            {event.desc}
                                        </p>
                                    </div>

                                    {/* Dekoracyjny boks zamiast zdjęcia (dla spokoju) */}
                                    <div className="w-full md:w-1/2">
                                        <div className="h-48 md:h-64 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center justify-center group overflow-hidden">
                                            <HistoryIcon size={40} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}