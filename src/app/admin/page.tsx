'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react'; // Usunąłem User, dodajemy img
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Ścieżka do Twojego loga
    const logoUrl = "/photos/iskra.png";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) {
            setError(authError.message === 'Invalid login credentials' 
                ? 'Błędny email lub hasło!' 
                : authError.message
            );
            setLoading(false);
            setTimeout(() => setError(null), 3000);
        } else {
            router.push('/admin/dashboard');
            router.refresh();
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
                        <img src={logoUrl} alt="Logo Iskra" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em] mb-2 block">System Zarządzania Klubem</span>
                    <h1 className="text-4xl font-[1000] text-white uppercase italic tracking-tighter">
                        Logowanie
                    </h1>
                    <div className="h-[3px] w-16 bg-iskra-red mt-4 mx-auto rounded-full"></div>
                </div>

                {/* KARTA LOGOWANIA */}
                <div className={`bg-white/5 backdrop-blur-2xl border ${error ? 'border-iskra-red' : 'border-white/10'} p-10 rounded-[48px] shadow-2xl transition-all duration-300`}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">Email Administratora</label>
                            <div className="relative">
                                {/* IKONKA ISKRY ZAMIAST USER */}
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50">
                                    <img src={logoUrl} alt="" className="w-full h-full object-contain grayscale brightness-200" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-iskra-red transition-all font-bold placeholder:text-slate-600"
                                    placeholder="admin@iskra.pl"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">Hasło</label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:border-iskra-red transition-all font-bold placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-iskra-red text-[10px] font-black uppercase tracking-widest text-center animate-bounce">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-iskra-red hover:bg-red-700 text-white font-[1000] uppercase italic tracking-widest py-5 rounded-2xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Wejdź do panelu
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-slate-600">
                    <ShieldCheck size={14} />
                    <p className="text-[9px] font-bold uppercase tracking-widest">Weryfikacja tożsamości KS Iskra Gorzów</p>
                </div>
            </div>
        </div>
    );
}