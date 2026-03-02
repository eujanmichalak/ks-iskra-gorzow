'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, Upload, Minus, User, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const PlayerManager = () => {
    const [players, setPlayers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [newPlayer, setNewPlayer] = useState({ 
        name: '', 
        position: 'POMOCNIK', 
        number: '', 
        goals: '0', 
        image: '' 
    });

    const fetchPlayers = async () => {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .order('number', { ascending: true });
        
        if (error) {
            console.error("Błąd pobierania:", error.message);
            setErrorMsg("Nie udało się pobrać zawodników.");
        } else {
            setPlayers(data || []);
        }
    };

    useEffect(() => { fetchPlayers(); }, []);

    const addPlayer = async () => {
        if (!newPlayer.name || !newPlayer.number) {
            setErrorMsg("Imię i numer są wymagane!");
            return;
        }

        setLoading(true);
        setErrorMsg(null);

        // Przygotowanie danych - upewniamy się, że liczby to liczby
        const playerToInsert = {
            name: newPlayer.name.toUpperCase(),
            position: newPlayer.position,
            number: parseInt(newPlayer.number) || 0,
            goals: parseInt(newPlayer.goals) || 0,
            image: newPlayer.image || null
        };

        const { error } = await supabase
            .from('players')
            .insert([playerToInsert])
            .select();

        if (error) {
            console.error("BŁĄD DODAWANIA:", error.message);
            setErrorMsg(`Błąd bazy: ${error.message}`);
        } else {
            setNewPlayer({ name: '', position: 'POMOCNIK', number: '', goals: '0', image: '' });
            fetchPlayers();
        }
        setLoading(false);
    };

    const updateGoals = async (id: string, currentGoals: number, delta: number) => {
        const newGoals = Math.max(0, currentGoals + delta);
        const { error } = await supabase
            .from('players')
            .update({ goals: newGoals })
            .eq('id', id);
            
        if (error) console.error("Błąd goli:", error.message);
        else fetchPlayers();
    };

    const deletePlayer = async (id: string) => {
        if (!confirm("Na pewno usunąć tego zawodnika?")) return;
        const { error } = await supabase.from('players').delete().eq('id', id);
        if (error) console.error("Błąd usuwania:", error.message);
        else fetchPlayers();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Sprawdzanie rozmiaru (max 2MB dla Base64, żeby nie zabić bazy)
            if (file.size > 1024 * 1024 * 2) {
                alert("Zdjęcie jest za duże! Max 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPlayer(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white rounded-[32px] p-5 md:p-8 shadow-2xl border border-slate-100 space-y-6 text-slate-900">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-950 rounded-xl text-white shadow-lg"><Shield size={18} /></div>
                    <h3 className="text-lg md:text-xl font-[1000] uppercase italic tracking-tighter text-black">Zarządzanie Kadrą</h3>
                </div>
                {loading && <Loader2 className="animate-spin text-iskra-red" size={20} />}
            </div>

            {/* ALERT BŁĘDU */}
            {errorMsg && (
                <div className="bg-red-50 border-2 border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold uppercase tracking-tight">
                    <AlertCircle size={18} />
                    {errorMsg}
                </div>
            )}

            {/* FORMULARZ DODAWANIA */}
            <div className="bg-slate-50 p-4 md:p-6 rounded-[30px] border border-slate-100 space-y-4 shadow-inner">
                <input 
                    type="text" placeholder="IMIĘ I NAZWISKO" 
                    value={newPlayer.name} 
                    onChange={e => setNewPlayer({...newPlayer, name: e.target.value})} 
                    className="w-full p-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm outline-none focus:border-black transition-all"
                />
                <div className="grid grid-cols-3 gap-3">
                    <input 
                        type="number" placeholder="NR" 
                        value={newPlayer.number} 
                        onChange={e => setNewPlayer({...newPlayer, number: e.target.value})} 
                        className="p-3.5 rounded-xl border-2 border-slate-200 font-bold text-sm text-center focus:border-black outline-none"
                    />
                    <select 
                        value={newPlayer.position} 
                        onChange={e => setNewPlayer({...newPlayer, position: e.target.value})} 
                        className="col-span-2 p-3.5 rounded-xl border-2 border-slate-200 font-[1000] text-[11px] uppercase bg-white cursor-pointer focus:border-black outline-none"
                    >
                        <option value="BRAMKARZ">Bramkarz</option>
                        <option value="OBROŃCA">Obrońca</option>
                        <option value="POMOCNIK">Pomocnik</option>
                        <option value="NAPASTNIK">Napastnik</option>
                    </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 p-3.5 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-black bg-white transition-colors">
                        <Upload size={16} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase text-slate-500">
                            {newPlayer.image ? 'ZDJĘCIE GOTOWE ✓' : 'WGRAJ ZDJĘCIE'}
                        </span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <button 
                        onClick={addPlayer} disabled={loading}
                        className="bg-black text-white px-8 py-3.5 rounded-xl font-[1000] uppercase text-[11px] hover:bg-iskra-red transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />} DODAJ ZAWODNIKA
                    </button>
                </div>
            </div>

            {/* LISTA ZAWODNIKÓW */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {players.length === 0 && !loading && (
                    <div className="text-center py-10 text-slate-300 font-bold uppercase text-xs tracking-widest">Brak zawodników w kadrze</div>
                )}
                {players.map(player => (
                    <div key={player.id} className="flex items-center justify-between p-4 bg-white border-2 border-slate-50 rounded-2xl gap-4 hover:border-slate-200 transition-all shadow-sm">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                                {player.image ? (
                                    <img src={player.image} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-[1000] uppercase text-black truncate leading-tight">
                                    {player.name} <span className="text-iskra-red ml-1">#{player.number}</span>
                                </p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{player.position}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                                <button onClick={() => updateGoals(player.id, player.goals, -1)} className="p-1.5 hover:text-iskra-red transition-colors"><Minus size={14}/></button>
                                <div className="flex flex-col items-center px-1">
                                    <span className="text-[8px] font-black text-slate-400 leading-none">GOLE</span>
                                    <span className="text-sm font-black text-black leading-none">{player.goals}</span>
                                </div>
                                <button onClick={() => updateGoals(player.id, player.goals, 1)} className="p-1.5 hover:text-green-600 transition-colors"><Plus size={14}/></button>
                            </div>
                            <button 
                                onClick={() => deletePlayer(player.id)} 
                                className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};