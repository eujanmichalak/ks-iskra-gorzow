'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, Upload, Minus, User } from 'lucide-react';

interface Player {
    id: string;
    name: string;
    position: 'GK' | 'DEF' | 'MID' | 'ATT';
    number: number;
    goals: number;
    image: string;
}

export const PlayerManager = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayer, setNewPlayer] = useState({ 
        name: '', 
        position: 'MID', 
        number: '', 
        goals: '0', 
        image: '' 
    });

    useEffect(() => {
        const saved = localStorage.getItem('iskra_players');
        if (saved) setPlayers(JSON.parse(saved));
    }, []);

    const savePlayers = (updated: Player[]) => {
        setPlayers(updated);
        localStorage.setItem('iskra_players', JSON.stringify(updated));
        // Powiadomienie innych komponentów o zmianie danych
        window.dispatchEvent(new Event('iskra_data_update'));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPlayer(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addPlayer = () => {
        if (!newPlayer.name || !newPlayer.number) return;
        const player: Player = {
            id: Date.now().toString(),
            name: newPlayer.name,
            position: newPlayer.position as any,
            number: parseInt(newPlayer.number) || 0,
            goals: parseInt(newPlayer.goals) || 0,
            image: newPlayer.image || ''
        };
        savePlayers([...players, player].sort((a, b) => a.number - b.number));
        setNewPlayer({ name: '', position: 'MID', number: '', goals: '0', image: '' });
    };

    const updateGoals = (id: string, delta: number) => {
        const updated = players.map(p => {
            if (p.id === id) return { ...p, goals: Math.max(0, p.goals + delta) };
            return p;
        });
        savePlayers(updated);
    };

    return (
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 text-slate-900">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl text-white shadow-lg"><Shield size={18} /></div>
                <h3 className="text-lg md:text-xl font-[1000] uppercase italic tracking-tighter">Zarządzanie Kadrą</h3>
            </div>

            {/* FORMULARZ DODAWANIA */}
            <div className="bg-slate-50 p-4 md:p-6 rounded-[24px] md:rounded-[30px] border border-slate-100 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                    <input 
                        type="text" 
                        placeholder="Imię i Nazwisko" 
                        value={newPlayer.name} 
                        onChange={e => setNewPlayer({...newPlayer, name: e.target.value})} 
                        className="w-full p-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm outline-none focus:border-slate-950 transition-all"
                    />
                    
                    <div className="grid grid-cols-3 gap-2">
                        <input 
                            type="number" 
                            placeholder="Nr" 
                            value={newPlayer.number} 
                            onChange={e => setNewPlayer({...newPlayer, number: e.target.value})} 
                            className="p-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm outline-none focus:border-slate-950 text-center"
                        />
                        <select 
                            value={newPlayer.position} 
                            onChange={e => setNewPlayer({...newPlayer, position: e.target.value as any})} 
                            className="col-span-2 p-3.5 rounded-xl border-2 border-slate-200 font-bold text-[11px] uppercase outline-none focus:border-slate-950 bg-white"
                        >
                            <option value="GK">Bramkarz</option>
                            <option value="DEF">Obrońca</option>
                            <option value="MID">Pomocnik</option>
                            <option value="ATT">Napastnik</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full flex-1 flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-iskra-red transition-colors bg-white">
                        <Upload size={16} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-500 truncate">
                            {newPlayer.image ? 'Zdjęcie ✓' : 'Wgraj zdjęcie'}
                        </span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <button 
                        onClick={addPlayer} 
                        className="w-full sm:w-auto bg-slate-950 text-white px-8 py-3.5 rounded-xl font-[1000] uppercase text-[11px] tracking-widest hover:bg-iskra-red transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Plus size={16} strokeWidth={3}/> Dodaj
                    </button>
                </div>
            </div>

            {/* LISTA ZAWODNIKÓW */}
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                {players.length > 0 ? players.map(player => (
                    <div key={player.id} className="flex flex-col xs:flex-row items-center justify-between p-4 bg-white border-2 border-slate-50 rounded-2xl hover:border-slate-200 transition-all shadow-sm gap-4">
                        <div className="flex items-center gap-4 w-full">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-100 shrink-0">
                                {player.image ? (
                                    <img src={player.image} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-200"><User size={20} className="text-slate-400"/></div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-[1000] uppercase text-slate-900 leading-tight truncate">
                                    {player.name} <span className="text-iskra-red ml-1">#{player.number}</span>
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{player.position}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full xs:w-auto gap-4 border-t xs:border-none pt-3 xs:pt-0">
                            <div className="flex items-center bg-slate-50 rounded-xl p-1.5 gap-3">
                                <button 
                                    onClick={() => updateGoals(player.id, -1)} 
                                    className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-iskra-red transition-all active:scale-90"
                                >
                                    <Minus size={16}/>
                                </button>
                                <div className="flex flex-col items-center min-w-[20px]">
                                    <span className="text-[10px] font-black text-slate-400 leading-none mb-0.5">GOLE</span>
                                    <span className="text-sm font-black text-slate-950 leading-none">{player.goals}</span>
                                </div>
                                <button 
                                    onClick={() => updateGoals(player.id, 1)} 
                                    className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-green-500 transition-all active:scale-90"
                                >
                                    <Plus size={16}/>
                                </button>
                            </div>
                            <button 
                                onClick={() => { if(confirm("Usunąć zawodnika?")) savePlayers(players.filter(p => p.id !== player.id)) }} 
                                className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
                        <p className="text-slate-300 font-bold text-xs uppercase tracking-widest">Brak zawodników w kadrze</p>
                    </div>
                )}
            </div>
        </div>
    );
};