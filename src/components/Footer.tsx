'use client';
import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, ExternalLink, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const Footer = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Korzystamy z Twojego lokalnego herbu
    const logoUrl = "/photos/iskra.png";

    const handleJoinClub = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber || phoneNumber.length < 7) return;

        setStatus('loading');
        const { error } = await supabase
            .from('player_leads')
            .insert([{ phone_number: phoneNumber }]);

        if (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        } else {
            setStatus('success');
            setPhoneNumber('');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <footer id="contact" className="bg-[#0a0f1d] text-white pt-16 md:pt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* SEKCJA SPONSORÓW */}
                <div className="pb-12 md:pb-16 border-b border-white/5">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-center text-slate-500 mb-8 md:mb-10">
                        Sponsorzy i Partnerzy Klubu
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-lg md:text-xl font-black italic tracking-tighter hover:text-white cursor-default">IVOLT</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter hover:text-white cursor-default">RATISAN</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter hover:text-white cursor-default">KONMAR</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter hover:text-white cursor-default">AUTO-FAN MOTORSPORT</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter hover:text-white cursor-default">ALBAR wywóz odpadów</span>
                    </div>
                </div>

                {/* GŁÓWNY GRID FOOTERA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-16 md:py-20">

                    {/* Kolumna 1: O klubie */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            {/* HERB ISKRY */}
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0 p-1 bg-white">
                                <img src={logoUrl} alt="Logo Iskra" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-[1000] text-xl md:text-2xl uppercase italic tracking-tighter">
                                Iskra <span className="text-white opacity-50">Gorzów</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            Założony w 2005 roku klub z Gorzowskiego Zawarcia. Łączymy pasję do piłki z lokalną tożsamością. Duma miasta, serce dzielnicy.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/ksiskragorzow?locale=pl_PL" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-iskra-red hover:text-white transition-all border border-white/5">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/iskragorzow2005/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-iskra-red hover:text-white transition-all border border-white/5">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Kolumna 2: Szybkie Linki */}
                    <div>
                        <h4 className="font-black uppercase italic text-sm mb-4">Klub</h4>
                        <div className="h-[3px] w-12 bg-iskra-red mb-6 md:mb-8 rounded-full"></div>
                        <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-tight">
                            <li><a href="/players_page" className="hover:text-white transition flex items-center gap-2 tracking-widest hover:translate-x-1 duration-300"><ExternalLink size={12} className="text-iskra-red" /> Nasza Kadra</a></li>
                            <li><a href="/academy" className="hover:text-white transition flex items-center gap-2 tracking-widest hover:translate-x-1 duration-300"><ExternalLink size={12} className="text-iskra-red" /> Akademia Iskry</a></li>
                            <li><a href="/history" className="hover:text-white transition flex items-center gap-2 tracking-widest hover:translate-x-1 duration-300"><ExternalLink size={12} className="text-iskra-red" /> Historia Klubu</a></li>
                        </ul>
                    </div>

                    {/* Kolumna 3: Kontakt */}
                    <div>
                        <h4 className="font-black uppercase italic text-sm mb-4">KONTAKT</h4>
                        <div className="h-[3px] w-12 bg-iskra-red mb-6 md:mb-8 rounded-full"></div>
                        <ul className="space-y-5 text-slate-400 text-sm font-medium">
                            <li className="flex items-start gap-3 leading-snug">
                                <MapPin className="text-iskra-red shrink-0" size={18} />
                                <span>ul. Strażacka 25, 66-400 Gorzów Wlkp.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-iskra-red shrink-0" size={18} />
                                <span className="break-all md:break-normal">klubsportowyiskragorzow@o2.pl</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-iskra-red shrink-0" size={18} />
                                <span>+48 601 910 937</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolumna 4: Dołącz do Iskry (Z LOGO W TLE) */}
                    <div className="bg-white/[0.03] p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5 h-fit relative overflow-hidden">
                        {/* SUBTELNE LOGO W TLE KARTY */}
                        <img src={logoUrl} className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 grayscale pointer-events-none" alt="" />
                        
                        <h4 className="font-black uppercase italic text-xs mb-4 relative z-10">Dołącz do Iskry</h4>
                        <p className="text-xs text-slate-500 mb-6 font-bold leading-relaxed relative z-10">
                            Chcesz grać w naszych barwach? Zostaw swój numer telefonu, odezwiemy się!
                        </p>
                        <form onSubmit={handleJoinClub} className="relative z-10">
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                disabled={status === 'success'}
                                placeholder={status === 'success' ? "ZAPISANO!" : "Twój numer..."}
                                className={`w-full bg-slate-900 border ${status === 'success' ? 'border-green-500 text-green-500' : 'border-white/10 text-white'} rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-iskra-red transition-all`}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className={`absolute right-2 top-2 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-iskra-red text-white'} p-1.5 rounded-xl hover:scale-105 transition shadow-lg disabled:opacity-50`}
                            >
                                {status === 'success' ? <Check size={14} /> : <ExternalLink size={14} />}
                            </button>
                        </form>
                        {status === 'error' && <p className="text-[10px] text-red-500 mt-2 font-bold uppercase animate-pulse">Błąd zapisu. Spróbuj później.</p>}
                    </div>

                </div>

                {/* DOLNY PASEK - COPYRIGHT */}
                <div className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        &copy; 2026 KS ISKRA GORZÓW. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                        <a href="/privacy" className="hover:text-white transition">Polityka prywatności</a>
                        <p className="cursor-default">Design by <span className="text-slate-400">Jan Michalak</span></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};