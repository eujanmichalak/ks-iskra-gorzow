'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const router = useRouter();

    const logoUrl = "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/420048755_876503211141570_1870842103319874308_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=hNIB1eW4zzsQ7kNvwETleDi&_nc_oc=AdlIgngstdCsYf_ofPw4u9AkfV7S4xG-uBse7NWdBgunz7a_5SOEvrTzj5n2OFlq90o5HqkTZWj4VftL-c83ugOm&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=1DC7xf588E0vuiD8D3E0zg&oh=00_Afr6Uzkm7v7uH64oAP5o-OPnlcZ4B1Nn1shwq5QxebUXmQ&oe=69676F0F";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TYMCZASOWE HASŁO: root / root
        if (login === 'root' && password === 'root') {
            router.push('/admin/dashboard');
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1d] flex items-center justify-center p-6 relative overflow-hidden">

            {/* TŁO Z POŚWIATĄ */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-iskra-red/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px]" />

            <div className="max-w-md w-full relative z-10">

                {/* NAGŁÓWEK */}
                <div className="text-center mb-10">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-iskra-red mx-auto mb-6 shadow-2xl shadow-iskra-red/30 p-1 bg-white">
                        <img src={logoUrl} alt="Logo Iskra" className="w-full h-full object-contain rounded-full" />
                    </div>
                    <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em] mb-2 block">System Zarządzania Klubem</span>
                    <h1 className="text-4xl font-[1000] text-white uppercase italic tracking-tighter">
                        Logowanie <span className="text-iskra-red">CMS</span>
                    </h1>
                    {/* TWOJA FIRMOWA BELECZKA */}
                    <div className="h-[3px] w-16 bg-iskra-red mt-4 mx-auto rounded-full"></div>
                </div>

                {/* KARTA LOGOWANIA */}
                <div className={`bg-white/5 backdrop-blur-2xl border ${error ? 'border-iskra-red' : 'border-white/10'} p-10 rounded-[48px] shadow-2xl transition-all duration-300`}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">Login</label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-iskra-red transition-all font-bold"
                                    placeholder="Wpisz login..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">Hasło</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-iskra-red transition-all font-bold"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-iskra-red text-[10px] font-black uppercase tracking-widest text-center animate-bounce">
                                Odmowa dostępu! Błędne dane.
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-iskra-red hover:bg-red-700 text-white font-[1000] uppercase italic tracking-widest py-5 rounded-2xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-3 group active:scale-95"
                        >
                            Wjedź do panelu
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-slate-600">
                    <ShieldCheck size={14} />
                    <p className="text-[9px] font-bold uppercase tracking-widest">Weryfikacja tożsamości TS Iskra</p>
                </div>
            </div>
        </div>
    );
}