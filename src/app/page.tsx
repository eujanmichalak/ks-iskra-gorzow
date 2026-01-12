import { Navbar } from '@/components/Navbar';
import { LiveHero } from '@/components/LiveHero';
import { TeamStats } from '@/components/TeamStats';
import { LeagueSection } from '@/components/LeagueSection';
import { Footer } from '@/components/Footer';
import { TopScorers } from '@/components/TopScorers';
import { ClubHero } from '@/components/ClubHero';
import { ClubNews } from '@/components/ClubNews';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ClubHero />
        <LiveHero />
        <ClubNews />
        <TeamStats />
        <TopScorers />
        <LeagueSection />
      </main>
      <Footer />
    </div>
  );
}