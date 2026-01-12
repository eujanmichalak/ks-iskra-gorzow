'use client';
import React from 'react';
import { User, Activity } from 'lucide-react';

export const DashboardHome = ({ user = "Admin" }) => {
    const today = new Date().toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return (
        <div className="bg-slate-900 rounded-[32px] md:rounded-[40px] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl mb-6 md:mb-8">
            {/* Subtelny gradient w tle */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-iskra-red/10 rounded-full blur-3xl -mr-16 -mt-16 md:-mr-20 md:-mt-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 md:gap-5">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-iskra-red rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-iskra-red/20 shrink-0">
                        <User size={24} className="md:w-7 md:h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-[1000] italic uppercase tracking-tighter leading-tight">
                            Witaj, <span className="text-iskra-red">{user}</span>
                        </h1>
                        <p className="text-slate-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">
                            {today}
                        </p>
                    </div>
                </div>

                {/* POPRAWIONY STATUS: Idealnie wyśrodkowany */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 md:px-5 py-2.5 rounded-xl md:rounded-2xl self-start md:self-center">
                    <div className="relative w-4 h-4 flex items-center justify-center">
                        <Activity size={14} className="text-green-500 relative z-10" />
                        <span className="absolute inset-0 bg-green-500 blur-sm opacity-50 animate-pulse rounded-full"></span>
                    </div>
                    <span className="text-[9px] md:text-[10px] font-[1000] uppercase tracking-widest text-green-500 leading-none">
                        System Online
                    </span>
                </div>
            </div>
        </div>
    );
};