'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Upload, User, Tag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export const ArticleManager = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [newArticle, setNewArticle] = useState({
        title: '', author: '', category: 'mecz', description: '', image: ''
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
        setArticles(data || []);
    };

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
            setNewArticle({ title: '', author: '', category: 'mecz', description: '', image: '' });
            fetchArticles();
        }
        setLoading(false);
    };

    const deleteArticle = async (id: string) => {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if (!error) fetchArticles();
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Formularz - Twój oryginalny design */}
            <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 text-slate-900">
                {/* ... Twoje inputy ... */}
                <button 
                    onClick={addArticle} 
                    disabled={loading}
                    className="w-full mt-4 bg-slate-950 text-white py-4 md:py-5 rounded-xl md:rounded-[24px] font-[1000] uppercase italic tracking-widest hover:bg-slate-900 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {loading ? "Publikowanie..." : <><Plus size={20} strokeWidth={3}/> <span className="text-sm md:text-base">Opublikuj artykuł</span></>}
                </button>
            </div>

            {/* Lista artykułów - Twój oryginalny design */}
            <div className="bg-white rounded-[32px] md:rounded-[40px] p-5 md:p-8 shadow-2xl border border-slate-100 text-slate-900">
                <h4 className="text-[10px] md:text-xs font-[1000] uppercase tracking-[0.2em] mb-6 italic">OSTATNIO DODANE</h4>
                <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {articles.map(art => (
                        <div key={art.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 md:p-4 bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            {/* ... Content Twojej karty ... */}
                            <button onClick={() => deleteArticle(art.id)} className="p-2.5 text-slate-300 hover:text-red-500 transition-all">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};