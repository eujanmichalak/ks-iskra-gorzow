'use client';
import React from 'react';
import { Users, Trophy, Target, Shield, ArrowRight, Star } from 'lucide-react';
import { Footer } from '@/components/Footer';

export const AkademiaPage = () => {
    const groups = [
        { name: 'Skrzaty', age: '4-6 lat', days: 'Wtorek, Czwartek', time: '16:30' },
        { name: 'Żaki', age: '7-8 lat', days: 'Poniedziałek, Środa', time: '17:00' },
        { name: 'Orliki', age: '9-10 lat', days: 'Poniedziałek, Środa, Piątek', time: '17:00' },
        { name: 'Młodziki', age: '11-13 lat', days: 'Wtorek, Czwartek, Piątek', time: '18:30' },
    ];

    const features = [
        { icon: <Shield className="text-iskra-red" />, title: "Certyfikowana Kadra", desc: "Trenerzy z licencjami UEFA dbający o rozwój Twojego dziecka." },
        { icon: <Target className="text-iskra-red" />, title: "Nowoczesny Trening", desc: "Autorski program szkolenia skupiony na technice i kreatywności." },
        { icon: <Trophy className="text-iskra-red" />, title: "Turnieje i Mecze", desc: "Regularna rywalizacja w ligach wojewódzkich i ogólnopolskich." }
    ];

    return (
        <main className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
                    <span className="text-iskra-red font-black text-xs uppercase tracking-[0.5em] mb-4 block">Przyszłość Iskry Gorzów</span>
                    <h1 className="text-4xl md:text-7xl font-[1000] text-white uppercase italic tracking-tighter leading-none mb-6">
                        Akademia Piłkarska <br /> <span className="text-iskra-red">Iskra Gorzów</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium text-sm md:text-base mb-10">
                        Budujemy charaktery i sportowe talenty na gorzowskim Zawarciu. Dołącz do rodziny Iskry i zacznij swoją piłkarską przygodę pod okiem profesjonalistów.
                    </p>
                </div>
            </section>

            {/* DLACZEGO MY? */}
            <section className="py-20 max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                                {f.icon}
                            </div>
                            <h3 className="font-[1000] uppercase italic text-lg mb-3 italic tracking-tight">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* GRUPY TRENINGOWE */}
            <section className="py-20 bg-slate-900 rounded-[40px] md:rounded-[80px] mx-2 md:mx-6 my-10 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-[1000] text-white uppercase italic tracking-tighter mb-4">Nasze Drużyny</h2>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Wybierz odpowiednią grupę wiekową</p>
                        </div>
                        <div className="bg-iskra-red text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                           <Star size={14} fill="white" /> Nabór Trwa 2026
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {groups.map((g, i) => (
                            <div key={i} className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-white hover:text-slate-900 transition-all duration-500 cursor-default">
                                <span className="text-iskra-red group-hover:text-slate-900 font-black text-xs uppercase block mb-2">{g.age}</span>
                                <h4 className="text-2xl font-[1000] uppercase italic mb-6 tracking-tighter text-white group-hover:text-slate-900">{g.name}</h4>
                                <div className="space-y-2 border-t border-white/10 group-hover:border-slate-200 pt-6">
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span className="text-slate-500">Dni:</span>
                                        <span className="text-white group-hover:text-slate-900">{g.days}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span className="text-slate-500">Godzina:</span>
                                        <span className="text-white group-hover:text-slate-900">{g.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - ZAPISY */}
            <section className="py-24 max-w-4xl mx-auto px-4 text-center">
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] p-10 md:p-16">
                    <Users className="mx-auto text-iskra-red mb-6" size={48} />
                    <h2 className="text-3xl md:text-5xl font-[1000] uppercase italic tracking-tighter mb-6">Pierwszy Trening <br /><span className="text-iskra-red">Gratis!</span></h2>
                    <p className="text-slate-500 font-medium mb-10">
                        Nie wymagamy od razu profesjonalnego sprzętu. Przynieś dziecku wodę, buty sportowe i dużo dobrego humoru. Resztę zapewniamy my!
                    </p>
                    <button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-slate-900 text-white font-[1000] uppercase italic px-10 py-5 rounded-2xl hover:bg-iskra-red hover:scale-105 transition-all shadow-xl flex items-center gap-3 mx-auto"
                    >
                        Zapisz dziecko teraz <ArrowRight size={20} />
                    </button>
                </div>
            </section>
            <Footer />
        </main>
    );
};