'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Phone, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const LeadManager = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLeads = async () => {
        const { data } = await supabase
            .from('player_leads')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setLeads(data);
        setLoading(false);
    };

    useEffect(() => { fetchLeads(); }, []);

    const deleteLead = async (id: number) => {
        await supabase.from('player_leads').delete().eq('id', id);
        fetchLeads();
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-2xl text-slate-900">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-black rounded-2xl text-white shadow-lg">
                    <Phone size={20} />
                </div>
                <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">
                    Zgłoszenia zawodników
                </h3>
            </div>

            <div className="space-y-3">
                {leads.length === 0 && !loading && (
                    <p className="text-center py-10 text-slate-400 font-bold uppercase text-xs tracking-widest">Brak nowych zgłoszeń</p>
                )}

                {leads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-black transition-colors group">
                        <div className="flex flex-col">
                            <span className="text-lg font-[1000] italic text-black">{lead.phone_number}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1">
                                <Clock size={10} /> {new Date(lead.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        
                        <button 
                            onClick={() => deleteLead(lead.id)}
                            className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};