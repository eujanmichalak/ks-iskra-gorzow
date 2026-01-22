'use client';
import React, { useState, useEffect } from 'react';
import { Trophy, Save, ArrowUp, ArrowDown, CheckCircle2, RefreshCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const LeagueTableEditor = () => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchTable = async () => {
        const { data } = await supabase.from('league_table').select('data').eq('id', 1).single();
        if (data) setTableData(data.data || []);
        setLoading(false);
    };

    useEffect(() => { fetchTable(); }, []);

    const updateRow = (index: number, field: string, value: any) => {
        const newData = [...tableData];
        newData[index] = { ...newData[index], [field]: value };
        setTableData(newData);
        setSaved(false);
    };

    const moveRow = (index: number, direction: 'up' | 'down') => {
        const newData = [...tableData];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newData.length) return;
        
        [newData[index], newData[targetIndex]] = [newData[targetIndex], newData[index]];
        
        const finalData = newData.map((row, i) => ({ ...row, pos: i + 1 }));
        setTableData(finalData);
        setSaved(false);
    };

    const handleSave = async () => {
        setLoading(true);
        const timestamp = new Date().toLocaleString('pl-PL', { 
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' 
        });

        const { error } = await supabase
            .from('league_table')
            .update({ data: tableData, last_update: timestamp })
            .eq('id', 1);

        if (!error) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
        setLoading(false);
    };

    if (loading && tableData.length === 0) return <div className="p-10 text-center font-black animate-pulse uppercase">Ładowanie tabeli...</div>;

    return (
        <div className="bg-white p-4 md:p-8 rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 md:mb-10 px-2 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-black rounded-2xl text-white">
                        <Trophy size={20} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter text-black">Edytor Tabeli</h2>
                </div>
                {saved && (
                    <div className="flex items-center gap-2 text-green-600 font-black uppercase text-[10px] md:text-xs tracking-widest bg-green-50 px-4 py-2 rounded-full border-2 border-green-500">
                        <CheckCircle2 size={16} /> Opublikowano!
                    </div>
                )}
            </div>

            <div className="overflow-x-auto pb-4 -mx-2 px-2 custom-scrollbar">
                <div className="min-w-[700px] space-y-3">
                    <div className="grid grid-cols-12 gap-4 px-12 text-[11px] font-black uppercase text-black tracking-[0.2em] mb-4 opacity-30">
                        <div className="col-span-1 text-center">Poz</div>
                        <div className="col-span-5 ml-4">Klub</div>
                        <div className="col-span-2 text-center">Mecze</div>
                        <div className="col-span-2 text-center">Ostatni</div>
                        <div className="col-span-2 text-center">Pkt</div>
                    </div>

                    {tableData.map((row, idx) => (
                        <div key={idx} className={`flex items-center gap-4 p-3 md:p-4 rounded-2xl md:rounded-3xl border-2 transition-all ${row.isUs ? 'bg-black border-black shadow-lg' : 'bg-white border-slate-100'}`}>
                            <div className="flex flex-col gap-1">
                                <button onClick={() => moveRow(idx, 'up')} className={`${row.isUs ? 'text-slate-400 hover:text-white' : 'text-slate-300 hover:text-black'}`}><ArrowUp size={14} /></button>
                                <button onClick={() => moveRow(idx, 'down')} className={`${row.isUs ? 'text-slate-400 hover:text-white' : 'text-slate-300 hover:text-black'}`}><ArrowDown size={14} /></button>
                            </div>
                            
                            <div className="w-8 shrink-0">
                                <input type="number" value={row.pos} readOnly className={`w-full bg-transparent font-black text-center outline-none ${row.isUs ? 'text-white' : 'text-black'}`}/>
                            </div>

                            <div className="flex-1 ml-4 min-w-[150px]">
                                <input type="text" value={row.team} onChange={(e) => updateRow(idx, 'team', e.target.value)} className={`bg-transparent font-black uppercase italic text-sm outline-none w-full ${row.isUs ? 'text-white' : 'text-black'}`}/>
                            </div>

                            <div className="w-16 md:w-20 shrink-0">
                                <input type="number" value={row.p} onChange={(e) => updateRow(idx, 'p', parseInt(e.target.value))} className={`w-full text-center rounded-xl py-2 font-black text-sm border-2 outline-none ${row.isUs ? 'bg-white text-black border-white' : 'bg-white text-black border-slate-200 focus:border-black'}`}/>
                            </div>

                            <div className="w-20 md:w-24 shrink-0">
                                <input type="text" value={row.lastResult || ''} onChange={(e) => updateRow(idx, 'lastResult', e.target.value)} placeholder="0:0" className={`w-full text-center rounded-xl py-2 font-black text-sm border-2 outline-none ${row.isUs ? 'bg-white text-black border-white' : 'bg-white text-black border-slate-200 focus:border-black'}`}/>
                            </div>

                            <div className="w-16 md:w-20 shrink-0">
                                <input type="number" value={row.pts} onChange={(e) => updateRow(idx, 'pts', parseInt(e.target.value))} className={`w-full text-center rounded-xl py-2 font-black text-sm border-2 outline-none ${row.isUs ? 'bg-white text-black border-white shadow-inner' : 'bg-black text-white border-black'}`}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={handleSave} 
                disabled={loading}
                className="w-full mt-6 md:mt-10 bg-black text-white font-black uppercase italic py-5 md:py-6 rounded-2xl md:rounded-3xl hover:bg-slate-900 transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95 disabled:opacity-50"
            >
                {loading ? <RefreshCcw className="animate-spin" /> : <Save size={20} />} 
                Opublikuj zmiany w tabeli
            </button>
        </div>
    );
};