import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Calculator, Plus } from 'lucide-react';

const Navbar = () => {
    const { lang, toggleLang, t } = useLanguage();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex justify-between items-center h-24">
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="bg-emerald-500 p-3 rounded-[1.25rem] shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-all">
                            <Calculator className="text-white" size={26} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-slate-900 group-hover:text-emerald-600 transition-colors leading-none">
                                Hisab<span className="text-emerald-500">BD</span>
                            </span>
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-emerald-600 mt-1">HISABBD.COM</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-8">
                        <Link
                            to="/about"
                            className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors"
                        >
                            {t('আমাদের সম্পর্কে', 'About')}
                        </Link>

                        <button
                            onClick={toggleLang}
                            className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-500/30 hover:bg-white transition-all shadow-sm"
                        >
                            <Globe size={18} className="text-emerald-500" />
                            <span className="text-slate-900 font-black tracking-widest text-[10px] uppercase">
                                {lang === 'bn' ? 'ENGLISH' : 'বাংলা'}
                            </span>
                        </button>

                        <Link
                            to="/contact"
                            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10"
                        >
                            <Plus size={16} />
                            {t('যোগাযোগ', 'Support')}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
