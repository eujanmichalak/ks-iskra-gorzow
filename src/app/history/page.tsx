'use client';
import React from 'react';
import { Trophy, Star, Target, Users, History as HistoryIcon } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HistoryPage() {
    const events = [
        {
            year: '2005',
            title: 'Narodziny Legendy',
            desc: 'Oficjalne założenie klubu KS Iskra Gorzów na gorzowskim Zawarciu.',
            img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
            icon: <Star size={20} />
        },
        {
            year: '2008',
            title: 'Pierwszy Awans',
            desc: 'Historyczny awans do wyższej klasy rozgrywkowej po bezbłędnym sezonie.',
            img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop',
            icon: <Trophy size={20} />
        },
        {
            year: '2012',
            title: 'Modernizacja Stadionu',
            desc: 'Remont murawy i zaplecza treningowego przy ul. Strażackiej.',
            img: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=800&auto=format&fit=crop',
            icon: <Target size={20} />
        },
        {
            year: '2018',
            title: 'Powstanie Akademii',
            desc: 'Uruchomienie oficjalnych struktur szkolenia młodzieży.',
            img: 'https://images.unsplash.com/photo-1526232761682-d26e4f9c8816?q=80&w=800&auto=format&fit=crop',
            icon: <Users size={20} />
        }
    ];

    return (
        <main className="bg-white min-h-screen text-slate-900">
            <Navbar />

            <section className="pt-32 pb-16 bg-slate-950 text-center relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <span className="text-white opacity-40 font-black text-xs uppercase tracking-[0.5em] mb-4 block underline decoration-2 underline-offset-8">Od 2005 Roku</span>
                    <h1 className="text-5xl md:text-8xl font-[1000] text-white uppercase italic tracking-tighter leading-none">
                        Historia <span className="bg-white text-slate-950 px-4">Iskry</span>
                    </h1>
                </div>
            </section>

            <section className="py-20 bg-white relative overflow-hidden">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 z-0"></div>

                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="space-y-20 md:space-y-32">
                        {events.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}>
                                    <div className="w-full md:w-1/2">
                                        <div className="relative group">
                                            <div className="absolute -inset-2 bg-slate-950 rounded-[30px] rotate-1 transition-transform duration-500 group-hover:rotate-0"></div>
                                            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-[24px] shadow-xl border-4 border-white bg-slate-200">
                                                <img src={event.img} alt={event.title} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                                                <div className="absolute bottom-6 left-6">
                                                    <span className="bg-white text-slate-950 px-6 py-2 font-black italic text-2xl shadow-2xl">
                                                        {event.year}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-slate-950 rounded-full items-center justify-center text-slate-950 shadow-2xl z-20">
                                        {event.icon}
                                    </div>

                                    <div className={`w-full md:w-1/2 ${isEven ? 'text-left' : 'md:text-right'} space-y-4`}>
                                        <h3 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter text-slate-950 leading-none">
                                            {event.title}
                                        </h3>
                                        <p className={`text-slate-500 font-medium leading-relaxed max-w-md ${!isEven ? 'md:ml-auto' : ''}`}>
                                            {event.desc}
                                        </p>
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