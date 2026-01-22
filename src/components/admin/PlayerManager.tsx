'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, Upload, Minus, User, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const PlayerManager = () => {
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [newPlayer, setNewPlayer] = useState({ 
        name: '', 
        position: 'POMOCNIK', 
        number: '', 
        goals: '0', 
        image: '' 
    });

    const fetchPlayers = async () => {
        const { data } = await supabase.from('players').select('*').order('number', { ascending: true });
        if (data) setPlayers(data);
    };

    useEffect(() => { fetchPlayers(); }, []);

    const addPlayer = async () => {
        if (!newPlayer.name || !newPlayer.number) return;
        setLoading(true);
        const { error } = await supabase.from('players').insert([{
            name: newPlayer.name,
            position: newPlayer.position,
            number: parseInt(newPlayer.number),
            goals: parseInt(newPlayer.goals),
            image: newPlayer.image
        }]);

        if (!error) {
            setNewPlayer({ name: '', position: 'POMOCNIK', number: '', goals: '0', image: '' });
            fetchPlayers();
        }
        setLoading(false);
    };

    const updateGoals = async (id: string, currentGoals: number, delta: number) => {
        const newGoals = Math.max(0, currentGoals + delta);
        const { error } = await supabase.from('players').update({ goals: newGoals }).eq('id', id);
        if (!error) fetchPlayers();
    };

    const deletePlayer = async (id: string) => {
        if (!confirm("Usunąć zawodnika?")) return;
        const { error } = await supabase.from('players').delete().eq('id', id);
        if (!error) fetchPlayers();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setNewPlayer(prev => ({ ...prev, image: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white rounded-[32px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 text-slate-900">
            <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl text-white shadow-lg"><Shield size={18} /></div>
                <h3 className="text-lg md:text-xl font-[1000] uppercase italic tracking-tighter">Zarządzanie Kadrą</h3>
            </div>

            <div className="bg-slate-50 p-4 md:p-6 rounded-[30px] border border-slate-100 space-y-4">
                <input 
                    type="text" placeholder="Imię i Nazwisko" 
                    value={newPlayer.name} 
                    onChange={e => setNewPlayer({...newPlayer, name: e.target.value})} 
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm outline-none focus:border-slate-950"
                />
                <div className="grid grid-cols-3 gap-2">
                    <input 
                        type="number" placeholder="Nr" 
                        value={newPlayer.number} 
                        onChange={e => setNewPlayer({...newPlayer, number: e.target.value})} 
                        className="p-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm text-center"
                    />
                    <select 
                        value={newPlayer.position} 
                        onChange={e => setNewPlayer({...newPlayer, position: e.target.value})} 
                        className="col-span-2 p-3.5 rounded-xl border-2 border-slate-200 font-bold text-[11px] uppercase bg-white"
                    >
                        <option value="BRAMKARZ">Bramkarz</option>
                        <option value="OBROŃCA">Obrońca</option>
                        <option value="POMOCNIK">Pomocnik</option>
                        <option value="NAPASTNIK">Napastnik</option>
                    </select>
                </div>
                <div className="flex gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-iskra-red bg-white">
                        <Upload size={16} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-500">{newPlayer.image ? 'Zdjęcie ✓' : 'Wgraj zdjęcie'}</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <button 
                        onClick={addPlayer} disabled={loading}
                        className="bg-slate-950 text-white px-8 py-3.5 rounded-xl font-[1000] uppercase text-[11px] hover:bg-iskra-red transition-all flex items-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />} Dodaj
                    </button>
                </div>
            </div>

            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                {players.map(player => (
                    <div key={player.id} className="flex items-center justify-between p-4 bg-white border-2 border-slate-50 rounded-2xl gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                {player.image ? <img src={player.image} className="w-full h-full object-cover" /> : <User size={20} className="m-auto mt-3 text-slate-300"/>}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-[1000] uppercase text-slate-900 truncate">{player.name} <span className="text-iskra-red">#{player.number}</span></p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{player.position}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center bg-slate-50 rounded-xl p-1 gap-2">
                                <button onClick={() => updateGoals(player.id, player.goals, -1)} className="p-1.5 hover:text-iskra-red"><Minus size={14}/></button>
                                <span className="text-sm font-black w-4 text-center">{player.goals}</span>
                                <button onClick={() => updateGoals(player.id, player.goals, 1)} className="p-1.5 hover:text-green-500"><Plus size={14}/></button>
                            </div>
                            <button onClick={() => deletePlayer(player.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};