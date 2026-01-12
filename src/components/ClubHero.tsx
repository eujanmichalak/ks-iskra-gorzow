'use client';
import React from 'react';

export const ClubHero = () => {
  const imageUrl = "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/494059316_1237895048335716_5078420380830028903_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=bdiz6My8TNoQ7kNvwFP8iwG&_nc_oc=Adm9PnJNft-WUacmPgesQIIad2CNqUHarzB7R8oEVB1JlJdGDPwyVfRWD49UxeUeDG_nwHKUGUoAlrgBZxaQYBw6&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=3FpbY7JsBbbg5aGOKpKd7A&oh=00_AfoZPpGpulkqC3E6JA3tAHNHgTvnCNbNIwjbwgottVnpEg&oe=69676E7C";

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* TŁO */}
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt="Iskra Gorzów Drużyna" 
          className="w-full h-full object-cover object-center md:object-[center_20%] opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50 z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* TREŚĆ */}
      <div className="relative z-20 text-center px-4 md:px-6 w-full">
        <div className="inline-block px-4 py-1 border border-iskra-red/30 bg-iskra-red/10 rounded-full mb-6">
            <span className="text-iskra-red font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                Klub Sportowy
            </span>
        </div>
        
        <h1 className="text-[12vw] md:text-8xl font-[1000] text-white italic uppercase tracking-tighter leading-none mb-6">
          ISKRA <span className="text-iskra-red">GORZÓW</span>
        </h1>
        
        <div className="max-w-2xl mx-auto">
            <p className="text-lg md:text-2xl font-bold text-white/90 uppercase tracking-tight italic mb-2">
                "Więcej niż klub. <span className="text-iskra-red">To nasza historia.</span>"
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-white/40 font-bold text-[9px] md:text-xs tracking-[0.2em]">
                <span>KLUB ZAŁOŻONY W 2005</span>
                <span className="hidden md:block w-1 h-1 bg-iskra-red rounded-full"></span>
                <span className="md:block">GORZÓW WLKP.</span>
            </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-950 to-transparent z-20" />
    </section>
  );
};