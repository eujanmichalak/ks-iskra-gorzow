'use client';
import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans overflow-x-hidden flex flex-col">
            <Navbar />

            {/* MAIN CONTENT */}
            <main className="flex-1 flex items-center justify-center relative py-20 px-6">

                {/* TŁO W TLE (Delikatne napisy) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none select-none flex items-center justify-center">
                    <h2 className="text-[25vw] font-[1000] text-slate-50 uppercase italic leading-none tracking-tighter opacity-50">
                        ISKRA
                    </h2>
                </div>

                <div className="relative z-10 text-center space-y-8 max-w-2xl">
                    {/* IKONA */}
                    <div className="inline-flex p-6 bg-slate-950 rounded-[32px] text-white shadow-2xl shadow-iskra-red/20 rotate-3">
                        <Construction size={48} className="text-iskra-red animate-pulse" />
                    </div>

                    {/* TEKST */}
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-[1000] uppercase italic tracking-tighter leading-[0.8]">
                            STRONA W <br />
                            <span className="text-iskra-red text-outline-black" style={{ WebkitTextStroke: '2px #000', color: 'transparent' }}>BUDOWIE</span>
                        </h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-sm">
                            AKADEMIA DUMY ZAWARCIA WKRÓTCE TUTAJ SIĘ POJAWI
                        </p>
                    </div>

                    {/* DESYGNACJA */}
                    <div className="h-[2px] w-24 bg-iskra-red mx-auto"></div>

                    {/* BUTTON POWROTU */}
                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase italic tracking-widest hover:bg-iskra-red transition-all active:scale-95 shadow-xl"
                        >
                            <ArrowLeft size={20} />
                            Wróć na stronę główną
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}