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
        <main className="bg-white min-h-screen text-slate-900">
            <Navbar />
            
            {/* Nagłówek w stylu strony głównej */}
            <section className="pt-32 pb-16 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Szkolenie Młodzieży</span>
                    <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 uppercase italic tracking-tighter leading-none mb-6">
                        Akademia Piłkarska
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base">
                        Budujemy sportowe fundamenty na gorzowskim Zawarciu. Dołącz do drużyny Iskry.
                    </p>
                </div>
            </section>

            {/* Grupy treningowe - Czyste karty */}
            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {groups.map((g, i) => (
                        <div key={i} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:shadow-xl hover:bg-white transition-all duration-300">
                            <span className="text-slate-400 font-black text-[10px] uppercase block mb-2">{g.age}</span>
                            <h3 className="text-2xl font-[1000] uppercase italic text-slate-900 mb-6">{g.name}</h3>
                            <div className="space-y-3 pt-4 border-t border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Dni</span>
                                    <span className="text-xs font-bold">{g.days}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Godzina</span>
                                    <span className="text-xs font-bold">{g.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Informacje - Ikony w kółkach */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        { icon: <Shield size={24} />, title: "Certyfikacja", desc: "Zajęcia prowadzone przez wykwalifikowanych trenerów." },
                        { icon: <Target size={24} />, title: "Rozwój", desc: "Indywidualne podejście do każdego młodego zawodnika." },
                        { icon: <Trophy size={24} />, title: "Turnieje", desc: "Udział w rozgrywkach ligowych i turniejach ogólnopolskich." }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-slate-200">
                                {item.icon}
                            </div>
                            <h4 className="font-[1000] uppercase italic text-lg mb-2">{item.title}</h4>
                            <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Zapisy - Prosty boks */}
            <section className="py-24 max-w-4xl mx-auto px-4 text-center">
                <div className="bg-white border border-slate-200 rounded-[40px] p-10 md:p-16 shadow-sm">
                    <h2 className="text-3xl md:text-4xl font-[1000] uppercase italic tracking-tighter mb-6">Pierwszy Trening Bezpłatny</h2>
                    <p className="text-slate-500 font-medium mb-10 max-w-md mx-auto text-sm">
                        Chcesz sprawdzić czy piłka nożna jest dla Twojego dziecka? Zapraszamy na niezobowiązujący trening próbny.
                    </p>
                    <button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-slate-900 text-white font-black uppercase italic px-10 py-4 rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto"
                    >
                        Zapisz się teraz <ArrowRight size={18} />
                    </button>
                </div>
            </section>
            
            <Footer />
        </main>
    );
}