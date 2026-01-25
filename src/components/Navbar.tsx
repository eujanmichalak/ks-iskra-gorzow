'use client';
import React, { useState, useEffect } from 'react';
import { UserCog, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logoUrl = "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/420048755_876503211141570_1870842103319874308_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hNIB1eW4zzsQ7kNvwETleDi&_nc_oc=AdlIgngstdCsYf_ofPw4u9AkfV7S4xG-uBse7NWdBgunz7a_5SOEvrTzj5n2OFlq90o5HqkTZWj4VftL-c83ugOm&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=1DC7xf588E0vuiD8D3E0zg&oh=00_Afr6Uzkm7v7uH64oAP5o-OPnlcZ4B1Nn1shwq5QxebUXmQ&oe=69676F0F";

    const navLinks = [
        { name: 'Strona Główna', href: '/' },
        { name: 'Zespół', href: '/players_page' },
        { name: 'Akademia', href: '/academy' },
        { name: 'Historia', href: '/history' },
    ];

    return (
        <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${scrolled || mobileMenu ? 'bg-white/95 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
                
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-iskra-red transition-transform group-hover:rotate-[10deg] group-hover:scale-110 shadow-lg bg-white">
                        <img src={logoUrl} alt="Logo Iskra Gorzów" className="w-full h-full object-contain" />
                    </div>
                    <span className={`font-[1000] uppercase italic tracking-tighter text-base md:text-xl transition-colors ${scrolled || mobileMenu ? 'text-slate-900' : 'text-white'}`}>
                        Iskra <span className="text-iskra-red">Gorzów</span>
                    </span>
                </Link>

                {/* LINKS - DESKTOP */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href}
                            className={`text-[10px] font-[1000] uppercase tracking-[0.2em] transition-all hover:text-iskra-red relative group/link ${scrolled ? 'text-slate-600' : 'text-white/80'}`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-iskra-red transition-all group-hover/link:w-full"></span>
                        </Link>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                    <Link 
                        href="/admin" 
                        className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 border-2 ${
                            scrolled || mobileMenu
                            ? 'bg-slate-900 border-slate-900 text-white hover:bg-iskra-red hover:border-iskra-red' 
                            : 'bg-white/10 border-white/20 text-white hover:bg-white hover:text-slate-900'
                        }`}
                    >
                        <UserCog size={14} className="shrink-0" />
                        <span className="hidden sm:inline">Panel Zarządzania</span>
                    </Link>

                    {/* MOBILE TOGGLE */}
                    <button 
                        className={`md:hidden p-2 rounded-xl transition-all ${scrolled || mobileMenu ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`} 
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        {mobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU - DROPDOWN */}
            {mobileMenu && (
                <div className="absolute top-full inset-x-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 shadow-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.href} 
                            onClick={() => setMobileMenu(false)}
                            className="text-lg font-[1000] uppercase italic tracking-tighter text-slate-900 flex justify-between items-center p-2 group"
                        >
                            {link.name}
                            <ArrowRight size={18} className="text-iskra-red opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                    ))}
                    <Link 
                        href="/admin"
                        onClick={() => setMobileMenu(false)}
                        className="mt-4 bg-slate-900 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-center text-[10px] flex items-center justify-center gap-3 shadow-xl"
                    >
                        <ShieldCheck size={18} className="text-iskra-red" />
                        Zaloguj do Panelu Zarządzania
                    </Link>
                </div>
            )}
        </nav>
    );
};