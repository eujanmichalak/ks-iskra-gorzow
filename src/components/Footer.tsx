'use client';
import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const Footer = () => {
    const logoUrl = "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/420048755_876503211141570_1870842103319874308_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hNIB1eW4zzsQ7kNvwETleDi&_nc_oc=AdlIgngstdCsYf_ofPw4u9AkfV7S4xG-uBse7NWdBgunz7a_5SOEvrTzj5n2OFlq90o5HqkTZWj4VftL-c83ugOm&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=1DC7xf588E0vuiD8D3E0zg&oh=00_Afr6Uzkm7v7uH64oAP5o-OPnlcZ4B1Nn1shwq5QxebUXmQ&oe=69676F0F";

    return (
        <footer id="contact" className="bg-[#0a0f1d] text-white pt-16 md:pt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* SEKCJA SPONSORÓW */}
                <div className="pb-12 md:pb-16 border-b border-white/5">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-center text-slate-500 mb-8 md:mb-10">Sponsorzy i Partnerzy Klubu</p>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-lg md:text-xl font-black italic tracking-tighter transition-colors hover:text-white cursor-default">GORZÓW.PL</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter transition-colors hover:text-white cursor-default">BUD-MIX</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter transition-colors hover:text-white cursor-default">HURTOWNIA ISKRA</span>
                        <span className="text-lg md:text-xl font-black italic tracking-tighter transition-colors hover:text-white cursor-default">ZAWARCIE-TEAM</span>
                    </div>
                </div>

                {/* GŁÓWNY GRID FOOTERA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 py-16 md:py-20">

                    {/* Kolumna 1: O klubie */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-iskra-red shrink-0">
                                <img src={logoUrl} alt="Logo" className="w-full h-full object-contain bg-white" />
                            </div>
                            <span className="font-[1000] text-xl md:text-2xl uppercase italic tracking-tighter">Iskra <span className="text-iskra-red">Gorzów</span></span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                            Założony w 2005 roku klub z Gorzowskiego Zawarcia. Łączymy pasję do piłki z lokalną tożsamością.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-iskra-red transition-all border border-white/5"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-iskra-red transition-all border border-white/5"><Instagram size={18} /></a>
                        </div>
                    </div>

                    {/* Kolumna 2: Szybkie Linki */}
                    <div>
                        <h4 className="font-black uppercase italic text-sm mb-4">Klub</h4>
                        <div className="h-[3px] w-12 bg-white mb-6 md:mb-8 rounded-full"></div>
                        <ul className="space-y-4 text-slate-400 text-sm font-bold uppercase tracking-tight">
                            <li><a href="#" className="hover:text-white transition flex items-center gap-2 tracking-widest"><ExternalLink size={12} /> Nasza Kadra</a></li>
                            <li><a href="#" className="hover:text-white transition flex items-center gap-2 tracking-widest"><ExternalLink size={12} /> Akademia Iskry</a></li>
                            <li><a href="#" className="hover:text-white transition flex items-center gap-2 tracking-widest"><ExternalLink size={12} /> Historia Klubu</a></li>
                        </ul>
                    </div>

                    {/* Kolumna 3: Kontakt */}
                    <div>
                        <h4 className="font-black uppercase italic text-sm mb-4">KONTAKT</h4>
                        <div className="h-[3px] w-12 bg-white mb-6 md:mb-8 rounded-full"></div>
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
                                <span>+48 663 087 848</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolumna 4: Dołącz do Iskry */}
                    <div className="bg-white/[0.03] p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/5 h-fit">
                        <h4 className="font-black uppercase italic text-xs mb-4">Dołącz do Iskry</h4>
                        <p className="text-xs text-slate-500 mb-6 font-bold leading-relaxed">Chcesz grać w naszych barwach? Zostaw swój numer telefonu, odezwiemy się!</p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Twój numer..."
                                className="w-full bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:border-iskra-red transition-all"
                            />
                            <button className="absolute right-2 top-2 bg-iskra-red text-white p-1.5 rounded-xl hover:bg-red-700 transition shadow-lg">
                                <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* DOLNY PASEK - COPYRIGHT */}
                <div className="py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
                    <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        &copy; 2026 KS ISKRA GORZÓW. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                        <a href="#" className="hover:text-white transition">Polityka prywatności</a>
                        <a href="#" className="hover:text-white transition whitespace-nowrap">Design by Jan Michalak</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};