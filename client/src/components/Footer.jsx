import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-100 pt-32 pb-20 mt-auto">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                    <div className="md:col-span-5 space-y-10">
                        <Link to="/" className="flex items-center gap-4">
                            <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20">
                                <Calculator className="text-white" size={24} />
                            </div>
                            <span className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                                Hisab<span className="text-emerald-500">BD</span>
                            </span>
                        </Link>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            {t(
                                'বাংলাদেশের একমাত্র রিলাইয়াবল ক্যালকুলেশন প্ল্যাটফর্ম। আধুনিক গাণিতিক সমাধান নিয়ে আমরা আছি আপনার পাশে।',
                                "Bangladesh's #1 primary source for accurate and modern mathematical calculations for everyone."
                            )}
                        </p>
                        <div className="flex gap-6">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all shadow-sm">
                                    <Icon size={22} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{t('পণ্য', 'Product')}</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('হোম', 'Home')}</Link></li>
                            <li><Link to="/zakat-calculator-bangladesh" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('যাকাত', 'Zakat')}</Link></li>
                            <li><Link to="/about" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('আমাদের সম্পর্কে', 'About')}</Link></li>
                            <li><Link to="/contact" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('যোগাযোগ', 'Contact')}</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{t('আইনী তথ্য', 'Legal')}</h4>
                        <ul className="space-y-4">
                            <li><Link to="/privacy-policy" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('প্রাইভেসি পলিসি', 'Privacy')}</Link></li>
                            <li><Link to="/terms-of-service" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('শর্তাবলী', 'Terms')}</Link></li>
                            <li><Link to="/contact" className="text-sm font-black text-slate-900 hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{t('সাহায্য', 'Support')}</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <div className="p-10 rounded-[3rem] bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl -mr-16 -mt-16 rounded-full group-hover:scale-125 transition-transform"></div>
                            <h5 className="text-2xl font-black mb-4 leading-tight">{t('প্রশ্ন আছে?', 'Need Help?')}</h5>
                            <p className="text-emerald-50 text-xs font-bold mb-8 opacity-80 leading-relaxed">
                                {t('আপনার প্রাইভেসির সুরক্ষা নিশ্চিত করেই আমরা কাজ করি। কোনো জিজ্ঞাসায় আমাদের জানান।', 'Every bit of your data stays private and anonymous by design.')}
                            </p>
                            <Link to="/contact" className="block w-full py-4 text-center rounded-xl bg-white text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:shadow-2xl transition-all">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-32 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        © {year} HisabBD. Built with <Heart size={12} className="text-emerald-500 fill-emerald-500" /> in BD.
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">All Systems 100% Online</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
