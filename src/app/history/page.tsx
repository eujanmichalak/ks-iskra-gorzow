'use client';
import React from 'react';
import { History as HistoryIcon, Trophy, Star, Target } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function HistoryPage() {
    const events = [
        { 
            year: '2005', 
            title: 'ZAŁOŻENIE KLUBU', 
            desc: 'Wszystko zaczęło się na gorzowskim Zawarciu. Grupa pasjonatów powołała do życia Iskrę, która szybko stała się sercem lokalnej społeczności.', 
            icon: <Star />,
            img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200'
        },
        { 
            year: '2010', 
            title: 'PIERWSZY AWANS', 
            desc: 'Historyczny moment dla seniorskiej piłki. Iskra pnie się w górę ligowej tabeli, udowadniając swój charakter na boisku.', 
            icon: <Trophy />,
            img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200'
        },
        { 
            year: '2015', 
            title: 'MODERNIZACJA', 
            desc: 'Inwestujemy w przyszłość. Boiska przy ul. Strażackiej zyskują nowe zaplecze, stając się domem dla setek młodych talentów.', 
            icon: <Target />,
            img: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1200'
        },
        { 
            year: '2024', 
            title: 'NOWA ERA', 
            desc: 'Stawiamy na profesjonalizm. Odświeżona tożsamość klubu i nowoczesny system szkolenia w Akademii.', 
            icon: <HistoryIcon />,
            img: 'https://images.unsplash.com/photo-1526232761682-d26e4f9c8816?q=80&w=1200'
        },
    ];

    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION - Kopia stylu z KADRY */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-white z-10" />
                    <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2000" className="w-full h-full object-cover" alt="History" />
                </div>
                <div className="relative z-20 text-center px-6 italic font-[1000]">
                    <h1 className="text-[15vw] md:text-[9rem] text-white/90 leading-[0.7] tracking-tighter uppercase">NASZA</h1>
                    <h1 className="text-[15vw] md:text-[9rem] text-iskra-red leading-[0.7] tracking-tighter uppercase mt-2">HISTORIA</h1>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-32 relative">
                {/* Oś czasu - Cienki, ale widoczny border */}
                <div className="hidden md:block absolute left-1/2 top-40 bottom-40 w-[2px] bg-slate-100 -translate-x-1/2" />

                <div className="space-y-48 md:space-y-64">
                    {events.map((event, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
                                
                                {/* Punkt na osi czasu */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-[4px] border-iskra-red rounded-full z-20 items-center justify-center text-iskra-red shadow-[0_0_20px_rgba(255,0,0,0.2)]">
                                    {event.icon}
                                </div>

                                {/* Tekst */}
                                <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} space-y-4`}>
                                    {/* Data jako Outline Text - teraz ją widać! */}
                                    <span className="text-7xl md:text-9xl font-[1000] italic leading-none block tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #e2e8f0' }}>
                                        {event.year}
                                    </span>
                                    <h3 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter text-slate-950 leading-none">
                                        {event.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mx-auto md:mx-0 ${isEven ? 'md:ml-auto' : 'md:mr-auto'}">
                                        {event.desc}
                                    </p>
                                </div>

                                {/* Zdjęcie */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-slate-50 rounded-[40px] -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
                                        <div className="relative h-64 md:h-[400px] w-full overflow-hidden rounded-[32px] border border-slate-100 shadow-2xl">
                                            <img 
                                                src={event.img} 
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                                                alt={event.title} 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
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