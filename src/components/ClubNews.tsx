'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, X, Clock, User, Tag, FileText } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    author: string;
    category: string;
    description: string;
    image: string | null;
    timestamp: string;
}

export const ClubNews = () => {
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [newsList, setNewsList] = useState<Article[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [isAllNewsOpen, setIsAllNewsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const loadNews = () => {
            const saved = localStorage.getItem('iskra_articles');
            if (saved) {
                try {
                    const parsed: Article[] = JSON.parse(saved);
                    const sanitized = parsed.map(a => ({
                        ...a,
                        image: a.image && a.image.trim() !== "" ? a.image : null
                    }));
                    setAllArticles(sanitized);
                    setNewsList(sanitized.slice(0, 3));
                } catch (e) {
                    console.error("Błąd parsowania", e);
                }
            }
        };

        loadNews();
        window.addEventListener('storage', loadNews);
        window.addEventListener('iskra_data_update', loadNews);
        return () => {
            window.removeEventListener('storage', loadNews);
            window.removeEventListener('iskra_data_update', loadNews);
        };
    }, []);

    if (!mounted) return null;

    return (
        <section id="news" className="py-16 md:py-24 bg-white text-slate-900">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                
                {/* NAGŁÓWEK SEKCJI */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-12 border-b border-slate-100 pb-8 gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-slate-950 font-[1000] text-[10px] md:text-xs uppercase tracking-[0.4em] mb-2 block">
                            Aktualności
                        </span>
                        <h2 className="text-4xl md:text-6xl font-[1000] text-slate-900 italic uppercase tracking-tighter">
                            Z życia <span className="text-iskra-red">klubu</span>
                        </h2>
                    </div>
                    
                    <button 
                        onClick={() => setIsAllNewsOpen(true)}
                        className="mx-auto md:mx-0 flex items-center gap-2 text-slate-900 hover:text-iskra-red font-black text-xs uppercase tracking-widest transition-all pb-2 border-b-2 border-slate-900 hover:border-iskra-red w-fit"
                    >
                        Wszystkie wpisy <ArrowRight size={16} />
                    </button>
                </div>

                {/* LISTA AKTUALNOŚCI */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {newsList.length > 0 ? newsList.map((news) => (
                        <article 
                            key={news.id} 
                            className="group cursor-pointer"
                            onClick={() => setSelectedArticle(news)}
                        >
                            <div className="relative h-64 md:h-72 mb-6 overflow-hidden rounded-[32px] md:rounded-[40px] bg-slate-200 shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                                {news.image ? (
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                        <FileText size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-slate-950 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    {news.category}
                                </div>
                            </div>
                            <div className="px-2 md:px-0">
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">{news.timestamp}</span>
                                <h3 className="text-xl md:text-2xl font-[1000] text-slate-950 uppercase italic tracking-tighter mb-3 group-hover:text-iskra-red transition-colors leading-tight">{news.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 font-bold opacity-70">{news.description}</p>
                            </div>
                        </article>
                    )) : (
                        <div className="col-span-full py-16 text-center border-4 border-dashed border-slate-100 rounded-[32px]">
                            <p className="text-slate-300 font-black uppercase tracking-widest">Brak nowych wpisów</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL TREŚCI ARTYKUŁU */}
            {selectedArticle && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-950/98 md:backdrop-blur-xl" onClick={() => setSelectedArticle(null)}></div>
                    
                    <div className="relative bg-white w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] md:rounded-[50px] shadow-2xl overflow-hidden flex flex-col">
                        
                        <button onClick={() => setSelectedArticle(null)} className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 md:p-4 bg-slate-950 text-white rounded-xl md:rounded-2xl hover:bg-iskra-red transition-all active:scale-95 shadow-xl">
                            <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                        </button>

                        <div className="flex-1 overflow-y-auto scroll-smooth">
                            <div className="relative h-[300px] md:h-[450px] shrink-0">
                                {selectedArticle.image ? (
                                    <img src={selectedArticle.image} className="w-full h-full object-cover" alt="" />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                        <FileText size={64} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
                            </div>

                            <div className="p-6 md:p-16 -mt-20 md:-mt-32 relative z-10 bg-white rounded-t-[40px] md:rounded-t-[50px]">
                                <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
                                    <span className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-slate-950 text-white rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">
                                        <Tag size={12} /> {selectedArticle.category}
                                    </span>
                                    <span className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-slate-100 text-slate-950 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">
                                        <Clock size={12} /> {selectedArticle.timestamp}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-6xl font-[1000] text-slate-950 uppercase italic tracking-tighter mb-6 md:mb-10 leading-[0.95]">
                                    {selectedArticle.title}
                                </h2>

                                <div className="h-1.5 md:h-2 w-20 md:w-32 bg-iskra-red mb-8 md:mb-10 rounded-full"></div>

                                <p className="text-slate-700 text-lg md:text-2xl leading-relaxed font-bold whitespace-pre-wrap pb-10">
                                    {selectedArticle.description}
                                </p>
                                
                                <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                        <User size={18} className="text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-black">Autor wpisu</p>
                                        <p className="text-sm font-black uppercase italic">{selectedArticle.author}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* MODAL ARCHIWUM */}
            {isAllNewsOpen && (
                <div className="fixed inset-0 z-[140] flex items-center justify-center">
                    <div className="absolute inset-0 bg-slate-950/95 md:backdrop-blur-md" onClick={() => setIsAllNewsOpen(false)} />
                    <div className="relative w-full h-full md:h-auto md:max-w-5xl md:max-h-[85vh] bg-white md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col">
                        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <h2 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter text-slate-950">Archiwum <span className="text-iskra-red">Newsów</span></h2>
                            <button onClick={() => setIsAllNewsOpen(false)} className="p-3 bg-slate-100 rounded-xl hover:bg-iskra-red hover:text-white transition-all">
                                <X className="w-5 h-5" strokeWidth={3} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {allArticles.map(art => (
                                    <div key={art.id} onClick={() => { setSelectedArticle(art); setIsAllNewsOpen(false); }} className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-[24px] md:rounded-[30px] bg-slate-50 hover:bg-white border-2 border-transparent hover:border-iskra-red transition-all cursor-pointer group shadow-sm">
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-[16px] md:rounded-[20px] overflow-hidden shrink-0 shadow-md">
                                            {art.image ? <img src={art.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" /> : <div className="w-full h-full flex items-center justify-center bg-slate-200"><FileText className="text-slate-400" /></div>}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5 text-slate-400 font-bold text-[8px] md:text-[9px] uppercase tracking-widest">
                                                <span className="bg-slate-950 text-white px-1.5 py-0.5 rounded-md">{art.category}</span>
                                                <span className="truncate">{art.timestamp}</span>
                                            </div>
                                            <h4 className="font-[1000] uppercase italic text-sm md:text-base leading-tight text-slate-950 group-hover:text-iskra-red transition-colors line-clamp-2">{art.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};