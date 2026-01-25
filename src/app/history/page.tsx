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
            desc: 'Oficjalne założenie klubu KS Iskra Gorzów na gorzowskim Zawarciu. Początek wielkiej przygody.',
            img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop',
            icon: <Star size={20} />
        },
        {
            year: '2008',
            title: 'Pierwszy Awans',
            desc: 'Historyczny awans do wyższej klasy rozgrywkowej po bezbłędnym sezonie na własnym stadionie.',
            img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800&auto=format&fit=crop',
            icon: <Trophy size={20} />
        },
        {
            year: '2012',
            title: 'Modernizacja Strażackiej',
            desc: 'Remont murawy i zaplecza treningowego przy ul. Strażackiej. Stadion zyskał nowy blask.',
            img: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=800&auto=format&fit=crop',
            icon: <Target size={20} />
        },
        {
            year: '2015',
            title: '10-lecie Klubu',
            desc: 'Wielki festyn sportowy i mecz z oldbojami Ekstraklasy na uczczenie dekady istnienia.',
            img: 'https://images.unsplash.com/photo-1511406361295-0a5ff814c0ad?q=80&w=800&auto=format&fit=crop',
            icon: <HistoryIcon size={20} />
        },
        {
            year: '2018',
            title: 'Powstanie Akademii',
            desc: 'Uruchomienie oficjalnych struktur szkolenia młodzieży. Pierwsze roczniki Skrzatów i Żaków.',
            img: 'https://images.unsplash.com/photo-1526232761682-d26e4f9c8816?q=80&w=800&auto=format&fit=crop',
            icon: <Users size={20} />
        }
    ];

    return (
        <main className="bg-white min-h-screen">
            <Navbar />

            <section className="pt-32 pb-16 bg-slate-900 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-iskra-red opacity-5 transform -skew-y-6 translate-y-20"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <span className="text-iskra-red font-black text-xs uppercase tracking-[0.5em] mb-4 block underline decoration-2 underline-offset-8">Od 2005 Roku</span>
                    <h1 className="text-5xl md:text-8xl font-[1000] text-white uppercase italic tracking-tighter leading-none">
                        Historia <span className="text-iskra-red">Iskry</span>
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
                                            <div className="absolute -inset-2 bg-slate-100 rounded-[30px] rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                                            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-[24px] shadow-xl border-4 border-white">
                                                <img src={event.img} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                                                <div className="absolute inset-0 bg-gradient-t from-slate-900/60 to-transparent"></div>
                                                <div className="absolute bottom-6 left-6">
                                                    <span className="bg-iskra-red text-white px-4 py-1 rounded-full font-black italic text-xl shadow-lg">
                                                        {event.year}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-white rounded-full items-center justify-center text-iskra-red shadow-xl z-20">
                                        {event.icon}
                                    </div>

                                    <div className={`w-full md:w-1/2 ${isEven ? 'text-left' : 'md:text-right'} space-y-4`}>
                                        <h3 className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tighter text-slate-900 leading-none">
                                            {event.title}
                                        </h3>
                                        <p className={`text-slate-500 font-medium leading-relaxed max-w-md ${!isEven ? 'md:ml-auto' : ''}`}>
                                            {event.desc}
                                        </p>
                                        <div className={`flex ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                                            <div className="h-1 w-12 bg-iskra-red/20 rounded-full"></div>
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