'use client';
import React, { useState, useEffect } from 'react';
import { FULL_TABLE } from '@/lib/data';
import { Trophy, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Importujemy klienta

export const LeagueSection = () => {
    const [tableData, setTableData] = useState(FULL_TABLE);
    const [lastUpdate, setLastUpdate] = useState<string | null>(null);
    const [lastMatches, setLastMatches] = useState<any[]>([]); // Pusta tablica na start
    const [mounted, setMounted] = useState(false);

    // 1. Funkcja pobierająca historię z Supabase
    const fetchHistory = async () => {
        const { data } = await supabase
            .from('match_history')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);
        
        if (data) {
            const mapped = data.map(m => ({
                id: m.id,
                home: m.home,
                away: m.away,
                sH: m.score_home,
                sA: m.score_away,
                date: m.match_date
            }));
            setLastMatches(mapped);
        }
    };

    const loadTableData = () => {
        const savedTable = localStorage.getItem('iskra_table_data');
        if (savedTable) {
            try {
                const parsed = JSON.parse(savedTable);
                const rows = parsed.rows ? parsed.rows : parsed;
                setTableData(rows);
                if (parsed.lastUpdate) setLastUpdate(parsed.lastUpdate);
            } catch (e) { console.error(e); }
        }
    };

    useEffect(() => {
        setMounted(true);
        loadTableData();
        fetchHistory(); // Pobierz historię przy montowaniu

        const handleSync = () => {
            loadTableData();
            fetchHistory();
        };

        window.addEventListener('storage', handleSync);
        window.addEventListener('iskra_data_update', handleSync);

        // REALTIME: Jeśli dodasz mecz w adminie, prawa kolumna od razu się zaktualizuje
        const channel = supabase.channel('history-updates')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'match_history' }, () => {
                fetchHistory();
            })
            .subscribe();

        return () => {
            window.removeEventListener('storage', handleSync);
            window.removeEventListener('iskra_data_update', handleSync);
            supabase.removeChannel(channel);
        };
    }, []);

    if (!mounted) return null;

    return (
        <section id="table" className="py-12 md:py-24 bg-white px-2 sm:px-4 md:px-6 text-black overflow-hidden">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* LEWA KOLUMNA: TABELA */}
                <div className="lg:col-span-8 flex flex-col w-full">
                    <div className="mb-6 md:mb-10 text-center md:text-left">
                        <span className="text-black font-black text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 block">Sezon 2025/26</span>
                        <h2 className="text-3xl md:text-5xl font-[900] text-black italic uppercase tracking-tighter flex items-center justify-center md:justify-start gap-3 md:gap-4">
                            <Trophy className="text-black shrink-0 w-8 h-8 md:w-10 md:h-10" /> Tabela
                        </h2>
                        <div className="h-[3px] w-16 md:w-24 bg-slate-900 mt-4 rounded-full mx-auto md:ml-0"></div>
                    </div>

                    <div className="border-[3px] md:border-4 border-black rounded-[24px] md:rounded-[40px] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden">
                        <table className="w-full text-left table-fixed sm:table-auto">
                            <thead className="bg-black text-white text-[9px] md:text-[11px] font-black uppercase tracking-wider md:tracking-[0.2em]">
                                <tr>
                                    <th className="p-3 md:p-7 w-10 md:w-24 text-center">#</th>
                                    <th className="p-3 md:p-7">Klub</th>
                                    <th className="p-3 md:p-7 text-center hidden sm:table-cell">M</th>
                                    <th className="p-3 md:p-7 text-center w-20 md:w-32">Ostatni</th>
                                    <th className="p-3 md:p-7 text-right w-14 md:w-28">Pkt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-100">
                                {tableData.map((row: any, idx: number) => (
                                    <tr key={idx} className={`${row.isUs ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50 transition-colors'}`}>
                                        <td className="p-3 md:p-7 font-black italic text-slate-300 text-xs md:text-base text-center">{row.pos}</td>
                                        <td className="p-3 md:p-7 font-black uppercase italic text-black text-xs md:text-lg leading-tight break-words">
                                            {row.team}
                                        </td>
                                        <td className="p-3 md:p-7 text-center font-black text-xs md:text-base hidden sm:table-cell">{row.p}</td>
                                        <td className="p-3 md:p-7 text-center">
                                            <span className={`inline-block px-2 md:px-4 py-1 rounded-lg md:rounded-xl text-[9px] md:text-xs font-black border-2 ${row.isUs ? 'bg-black text-white border-black' : 'bg-white text-black border-black'}`}>
                                                {row.lastResult || '0:0'}
                                            </span>
                                        </td>
                                        <td className={`p-3 md:p-7 text-right font-[1000] text-lg md:text-2xl ${row.isUs ? 'text-black' : 'text-slate-900'}`}>{row.pts}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {lastUpdate && (
                        <div className="mt-4 md:mt-8 flex items-center justify-center md:justify-end gap-2 text-black font-black uppercase text-[9px] md:text-[10px] bg-slate-100 w-fit md:ml-auto mx-auto px-4 py-2 rounded-full border border-black/10">
                            <Clock size={12} /> Sync: {lastUpdate}
                        </div>
                    )}
                </div>

                {/* PRAWA KOLUMNA: OSTATNIE MECZE - TERAZ Z SUPABASE */}
                <div className="lg:col-span-4 lg:pt-[84px] w-full">
                    <h3 className="text-xl md:text-2xl font-black uppercase italic mb-6 border-b-4 border-black pb-2 inline-block">Ostatnie mecze</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
                        {lastMatches.length > 0 ? (
                            lastMatches.map((res: any, i: number) => (
                                <div key={i} className="bg-white p-4 md:p-6 rounded-[24px] md:rounded-[32px] border-2 border-black shadow-lg hover:-translate-y-1 transition-transform">
                                    <div className="flex justify-between text-[9px] font-black mb-4 uppercase tracking-widest text-slate-400">
                                        <span>{res.date}</span>
                                        <span className="text-black bg-slate-100 px-2 py-0.5 rounded">Final</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2">
                                        <span className="text-[10px] md:text-xs font-black uppercase truncate flex-1 leading-tight">{res.home}</span>
                                        <div className="bg-black text-white px-3 md:px-5 py-2 rounded-xl md:rounded-2xl font-black italic text-sm md:text-xl shrink-0 tabular-nums">
                                            {res.sH}:{res.sA}
                                        </div>
                                        <span className="text-[10px] md:text-xs font-black uppercase truncate flex-1 text-right leading-tight">{res.away}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] text-center text-slate-400 font-bold text-xs uppercase italic">
                                Brak wyników w bazie
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};