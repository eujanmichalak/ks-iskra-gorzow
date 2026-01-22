'use client';
import React from 'react';
import { DashboardHome } from '@/components/admin/DashboardHome';
import { LiveMatchEditor } from '@/components/admin/LiveMatchEditor';
import { LastMatchesWidget } from '@/components/admin/LastMatchesWidget';
import { PlayerManager } from '@/components/admin/PlayerManager';
import { ArticleManager } from '@/components/admin/ArticleManager';
import { LeagueTableEditor } from '@/components/admin/LeagueTableEditor';
import { StatsEditor } from '@/components/admin/StatsEditor';
import { LeadManager } from '@/components/admin/LeadManager';


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Pasek górny opcjonalnie, lub zostawiamy czysto */}
      <main className="max-w-5xl mx-auto py-12 px-6 space-y-12">
        
        
        <DashboardHome user="Admin"/>
        <LiveMatchEditor/>
        <LastMatchesWidget/>
        <LeagueTableEditor/>
        <StatsEditor/>
        <PlayerManager/>
        <ArticleManager/>
        <LeadManager/>

     

      </main>
    </div>
  );
}