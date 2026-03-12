'use client';
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, Cookie } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white text-slate-950 font-sans flex flex-col">
            <Navbar />

            {/* HERO SECTION */}
            <section className="bg-slate-950 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-[1000] text-white uppercase italic tracking-tighter mb-4">
                        Polityka <span className="text-iskra-red text-outline-white" style={{ WebkitTextStroke: '1px #fff', color: 'transparent' }}>Prywatności</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                        Twoje dane są u nas bezpieczniejsze niż piłka w rękach bramkarza
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <main className="flex-1 max-w-4xl mx-auto px-6 py-20 leading-relaxed text-slate-600">
                <div className="space-y-16">

                    {/* SEKCJA 1 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-950">
                            <Shield className="text-iskra-red" size={24} />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">1. Administrator Danych</h2>
                        </div>
                        <p>
                            Administratorem Twoich danych osobowych jest <strong>KS Iskra Gorzów</strong> z siedzibą przy ul. Strażackiej 25, 66-400 Gorzów Wielkopolski. W sprawach dotyczących danych możesz pisać na adres: <em>klubsportowyiskragorzow@o2.pl</em>.
                        </p>
                    </section>

                    {/* SEKCJA 2 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-950">
                            <Lock className="text-iskra-red" size={24} />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">2. Jakie dane zbieramy?</h2>
                        </div>
                        <p>Zbieramy tylko te dane, które sam nam podasz:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Numer telefonu:</strong> Tylko jeśli korzystasz z formularza "Dołącz do Iskry".</li>
                            <li><strong>Dane logowania:</strong> Dotyczy wyłącznie administratorów systemu (panel CMS).</li>
                            <li><strong>Logi serwerowe:</strong> Standardowe informacje jak adres IP (bezpieczeństwo serwera).</li>
                        </ul>
                    </section>

                    {/* SEKCJA 3 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-950">
                            <Eye className="text-iskra-red" size={24} />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">3. Cel i Bezpieczeństwo</h2>
                        </div>
                        <p>
                            Twoje dane przetwarzamy wyłącznie w celu skontaktowania się z Tobą w sprawie dołączenia do klubu. Dane są przechowywane w bezpiecznej chmurze <strong>Supabase</strong>, która spełnia najwyższe standardy ochrony danych (RODO).
                        </p>
                    </section>

                    {/* SEKCJA 4 */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-950">
                            <Cookie className="text-iskra-red" size={24} />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">4. Pliki Cookies</h2>
                        </div>
                        <p>
                            Używamy plików cookies tylko do celów statystycznych oraz aby sesja administratora działała poprawnie. Możesz je wyłączyć w ustawieniach swojej przeglądarki w dowolnym momencie.
                        </p>
                    </section>

                    {/* STOPKA POLITYKI */}
                    <div className="pt-10 border-t border-slate-100 italic text-sm">
                        Ostatnia aktualizacja: 2026-03-12. Wszystkie prawa zastrzeżone dla Klub Sportowy Iskra Gorzów.
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}