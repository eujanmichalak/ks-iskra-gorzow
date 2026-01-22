'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Upload, User, Tag, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Article {
    id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    image: string;
    timestamp: string;
}

export const ArticleManager = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);

    const [newArticle, setNewArticle] = useState({
        title: '', author: '', category: 'klub', description: '', image: ''
    });

    const fetchArticles = async () => {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setArticles(data);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewArticle(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const addArticle = async () => {
        if (!newArticle.title || !newArticle.author) return;
        setLoading(true);

        const now = new Date();
        const articleToSave = {
            ...newArticle,
            timestamp: `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        };

        const { error } = await supabase.from('articles').insert([articleToSave]);

        if (!error) {
            setNewArticle({ title: '', author: '', category: 'klub', description: '', image: '' });
            fetchArticles();
        }
        setLoading(false);
    };

    const deleteArticle = async (id: string) => {
        if (!confirm('Na pewno usunąć ten artykuł?')) return;
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) fetchArticles();
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* SEKCJA 1: NOWY ARTYKUŁ - PEŁNY FORMULARZ */}
            <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 text-slate-900">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="p-2.5 md:p-3 bg-slate-950 rounded-xl md:rounded-2xl text-white shadow-lg shrink-0">
                        <FileText size={20} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-[1000] uppercase italic tracking-tighter">Nowy Artykuł</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Tytuł Artykułu</label>
                            <input type="text" value={newArticle.title} onChange={e => setNewArticle({ ...newArticle, title: e.target.value })} className="w-full p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-slate-100 font-bold focus:border-slate-900 outline-none transition-all text-sm md:text-base" placeholder="Np. Wielkie zwycięstwo Iskry!" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Autor</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <input type="text" value={newArticle.author} onChange={e => setNewArticle({ ...newArticle, author: e.target.value })} className="w-full p-3 md:p-4 pl-12 rounded-xl md:rounded-2xl border-2 border-slate-100 font-bold focus:border-slate-900 outline-none transition-all text-sm" placeholder="Imię Nazwisko" />
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Kategoria</label>
                                <div className="relative">
                                    <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <select value={newArticle.category} onChange={e => setNewArticle({ ...newArticle, category: e.target.value })} className="w-full p-3 md:p-4 pl-12 rounded-xl md:rounded-2xl border-2 border-slate-100 font-bold focus:border-slate-900 outline-none transition-all text-sm appearance-none uppercase tracking-tighter bg-white">
                                        <option value="inne">Inne</option>
                                        <option value="mecz">Mecz</option>
                                        <option value="klub">Klub</option>
                                        <option value="akademia">Akademia</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Zdjęcie wyróżniające</label>
                            <label className="flex items-center justify-center gap-3 p-6 md:p-8 border-2 border-dashed border-slate-200 rounded-xl md:rounded-2xl cursor-pointer hover:border-slate-950 transition-all bg-slate-50 overflow-hidden relative min-h-[120px]">
                                {newArticle.image ? (
                                    <img src={newArticle.image} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Preview" />
                                ) : null}
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <Upload size={24} className="text-slate-400 mb-2" />
                                    <span className="text-[10px] font-black uppercase text-slate-500">{newArticle.image ? 'Zmień zdjęcie' : 'Wybierz plik (JPG/PNG)'}</span>
                                </div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col">
                        <div className="flex-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2 mb-1 block">Treść / Opis</label>
                            <textarea rows={6} value={newArticle.description} onChange={e => setNewArticle({ ...newArticle, description: e.target.value })} className="w-full h-full min-h-[150px] p-3 md:p-4 rounded-xl md:rounded-2xl border-2 border-slate-100 font-bold focus:border-slate-900 outline-none transition-all resize-none text-sm" placeholder="O czym chcesz napisać..."></textarea>
                        </div>

                        <button
                            onClick={addArticle}
                            disabled={loading}
                            className="w-full mt-4 bg-slate-950 text-white py-4 md:py-5 rounded-xl md:rounded-[24px] font-[1000] uppercase italic tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? "Publikowanie..." : <><Plus size={20} strokeWidth={3} /> <span className="text-sm md:text-base">Opublikuj artykuł</span></>}
                        </button>
                    </div>
                </div>
            </div>

            {/* SEKCJA 2: LISTA ARTYKUŁÓW - WSZYSTKIE ELEMENTY */}
            <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 text-slate-900">
                <h4 className="text-[10px] md:text-xs font-[1000] uppercase tracking-[0.2em] mb-6 italic">OSTATNIO DODANE</h4>

                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {articles.length > 0 ? (
                        articles.map(art => (
                            <div key={art.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 md:p-4 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-full sm:w-16 h-32 sm:h-16 bg-slate-100 rounded-xl md:rounded-2xl overflow-hidden shrink-0">
                                    {art.image ? (
                                        <img src={art.image} className="w-full h-full object-cover" alt={art.title} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-slate-300">FOTO</div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="bg-slate-950 text-white text-[8px] md:text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest shrink-0">
                                            {art.category}
                                        </span>
                                        <span className="text-[9px] md:text-[10px] font-black text-slate-400">{art.timestamp}</span>
                                    </div>
                                    <h5 className="font-[1000] uppercase italic text-sm md:text-base leading-tight mb-1 truncate">{art.title}</h5>
                                    <p className="text-[10px] font-bold text-slate-400 line-clamp-1 uppercase leading-none">{art.description}</p>
                                </div>

                                <div className="flex sm:block justify-end pt-2 sm:pt-0 border-t sm:border-none border-slate-50">
                                    <button onClick={() => deleteArticle(art.id)} className="p-2.5 text-slate-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-xl">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed border-slate-50 rounded-3xl text-slate-300 font-black uppercase italic text-xs">
                            Brak dodanych artykułów
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};