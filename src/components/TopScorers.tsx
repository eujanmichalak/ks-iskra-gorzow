'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const TopScorers = () => {
    const [scorers, setScorers] = useState<any[]>([]);

    useEffect(() => {
        const fetchScorers = async () => {
            const { data } = await supabase
                .from('players')
                .select('*')
                .gt('goals', 0)
                .order('goals', { ascending: false })
                .limit(5);
            
            if (data) setScorers(data);
        };

        fetchScorers();
        
        // Realtime update: jeśli admin zmieni gole, tutaj też się zmienią same
        const channel = supabase.channel('scorer-updates')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, () => fetchScorers())
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    return (
        <section id="scorers" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <span className="text-white font-[1000] text-xs uppercase tracking-[0.4em] mb-2 block">Najlepsi Strzelcy</span>
                    <h2 className="text-5xl md:text-6xl font-[1000] text-white italic uppercase tracking-tighter">Liderzy <span className="text-iskra-red">Ataku</span></h2>
                    <div className="h-[3px] w-24 bg-white mt-6 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {scorers.length > 0 ? (
                        scorers.map((player, i) => (
                            <div key={player.id} className="group relative h-[450px] overflow-hidden rounded-[40px] border border-white/10 bg-slate-900 transition-all hover:border-iskra-red/50">
                                <div className="absolute inset-0 z-0">
                                    <img src={player.image || 'https://via.placeholder.com/400x600?text=Iskra+Gorzow'} className="h-full w-full object-cover opacity-60 group-hover:scale-110 transition-all duration-700" alt={player.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-8 z-20 text-white italic">
                                    <span className="text-4xl font-[1000] tracking-tighter leading-none">{player.goals} <small className="text-xs text-iskra-red not-italic uppercase ml-1">Goli</small></span>
                                    <h3 className="text-xl font-[1000] uppercase mt-2 leading-tight">{player.name}</h3>
                                </div>
                                <div className="absolute top-6 left-6 z-30 bg-white text-black font-black italic px-3 py-1 rounded-lg text-xs">#{i + 1}</div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                            <p className="text-white/20 font-black uppercase tracking-[0.3em]">Czekamy na pierwsze bramki w sezonie...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};