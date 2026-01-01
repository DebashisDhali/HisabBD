import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Sparkle, Target, Zap, LayoutDashboard, Settings } from 'lucide-react';

const CalculatorLayout = ({ children, title, description, schema, keywords, canonical }) => {
    const { lang, t } = useLanguage();
    const currentUrl = `https://hisabbd.com${canonical || window.location.pathname}`;

    // Dynamic Related Tools Logic
    const trendingTools = [
        { name: t('যাকাত ক্যালকুলেটর', 'Zakat Hub'), path: '/zakat-calculator-bangladesh', icon: <Target size={14} /> },
        { name: t('ভর্তি জিপিএ ক্যালকুলেটর', 'Admission Hub'), path: '/admission-gpa-marks-calculator', icon: <Sparkle size={14} /> },
        { name: t('স্বর্ণের দাম', 'Gold Price'), path: '/gold-price-calculator-bangladesh', icon: <Zap size={14} /> },
        { name: t('বয়স ক্যালকুলেটর', 'Age Hub'), path: '/age-calculator-bangladesh', icon: <Settings size={14} /> },
    ].filter(tool => !currentUrl.includes(tool.path));

    // Global Key Navigation Hook
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            const tagName = document.activeElement.tagName.toLowerCase();
            if (tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea') return;

            // Only handle Arrow Keys
            if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;

            const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])'));
            const currentIndex = inputs.indexOf(document.activeElement);
            if (currentIndex === -1) return;

            let nextIndex = currentIndex;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                // For Right Arrow, only move if cursor is at the end or it's a non-text input
                // But user requested "cursor goes the directed key pressed" (aggressive nav)
                // We will implement aggressive navigation for Up/Down.
                // For Left/Right, we'll check selection.
                // Actually, let's just make Up/Down move fields to satisfy the "vertical" feel of forms
                // And Right/Left move fields if text cursor is at boundary.

                const isVertical = e.key === 'ArrowDown';
                const isHorizontal = e.key === 'ArrowRight';

                let shouldMove = isVertical; // Up/Down always moves

                if (isHorizontal && (tagName === 'input' || tagName === 'textarea')) {
                    const el = document.activeElement;
                    // Move only if at end of value
                    if (el.selectionStart === el.value.length && el.selectionEnd === el.value.length) {
                        shouldMove = true;
                    }
                } else if (isHorizontal) {
                    shouldMove = true; // Selects, etc
                }

                if (shouldMove) {
                    e.preventDefault();
                    nextIndex = Math.min(currentIndex + 1, inputs.length - 1);
                    inputs[nextIndex].focus();
                    if (inputs[nextIndex].select) inputs[nextIndex].select();
                }

            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                const isVertical = e.key === 'ArrowUp';
                const isHorizontal = e.key === 'ArrowLeft';

                let shouldMove = isVertical;

                if (isHorizontal && (tagName === 'input' || tagName === 'textarea')) {
                    const el = document.activeElement;
                    // Move only if at start
                    if (el.selectionStart === 0 && el.selectionEnd === 0) {
                        shouldMove = true;
                    }
                } else if (isHorizontal) {
                    shouldMove = true;
                }

                if (shouldMove) {
                    e.preventDefault();
                    nextIndex = Math.max(currentIndex - 1, 0);
                    inputs[nextIndex].focus();
                    if (inputs[nextIndex].select) inputs[nextIndex].select();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#fafbfc]">
            {/* SEO & Meta Synchronization */}
            <Helmet>
                <title>{title} | HisabBD</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords || 'calculator, bangladesh, zakat, gpa, gold price, financial tools'} />
                <link rel="canonical" href={currentUrl} />

                {/* Open Graph / Social */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://hisabbd.com/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={currentUrl} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />

                {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
            </Helmet>

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[60rem] h-[60rem] bg-emerald-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[60rem] h-[60rem] bg-blue-500/5 blur-[120px] rounded-full"></div>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10 relative z-10">
                {/* NAVIGATION BAR - SLIM */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <nav className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-95"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('হোমে ফিরে যান', 'Back')}</span>
                        </Link>
                        <div className="h-4 w-[1px] bg-slate-200"></div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg">
                            <LayoutDashboard size={12} className="text-slate-400" />
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t('ইন্টারফেস', 'Terminal')}</span>
                        </div>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100/50 rounded-lg text-emerald-600">
                            <Zap size={12} className="fill-emerald-600" />
                            <span className="text-[9px] font-black uppercase tracking-widest">VERIFIED SYSTEM</span>
                        </div>
                    </div>
                </div>

                <div className="mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-8"
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-slate-950 mb-4 tracking-tight leading-tight">
                            {title}
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-2xl opacity-80">
                            {description}
                        </p>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <section className="flex-grow min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {children}
                        </motion.div>

                        <div className="mt-12 p-8 md:p-12 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -mr-32 -mt-32"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-xl shrink-0">
                                    <ShieldCheck size={32} />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl font-black mb-1 uppercase tracking-tight">{t('নির্ভরযোগ্য তথ্যের গ্যারান্টি', 'Guaranteed Precision')}</h3>
                                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed max-w-3xl">
                                        {t('আমাদের এলগরিদম বাংলাদেশের সর্বশেষ ব্যাংকিং ও সরকারি নীতিমালা অনুযায়ী ডিজাইন করা হয়েছে। আপনার কোনো তথ্যই আমাদের সার্ভারে জমা থাকে না।', 'Engineered to local statutory standards. Absolute user privacy via zero-persistence local logic.')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <aside className="w-full lg:w-[320px] shrink-0 space-y-8">
                        {/* FEATURED TOOLS SIDEBAR (INTERNAL LINKING) */}
                        <div className="rounded-[2.5rem] bg-white border border-slate-200/60 p-8 shadow-sm">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <div className="w-1 h-3 rounded-full bg-emerald-500"></div>
                                {t('জনপ্রিয় টুলস', 'TRENDING CALCULATORS')}
                            </h3>
                            <div className="grid gap-3">
                                {trendingTools.map((tool, idx) => (
                                    <Link
                                        key={idx}
                                        to={tool.path}
                                        className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                                                {tool.icon}
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900 group-hover:text-white uppercase tracking-tight transition-colors">
                                                {tool.name}
                                            </span>
                                        </div>
                                        <ArrowLeft size={14} className="text-slate-200 group-hover:text-white rotate-180 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* ENGAGEMENT CARD */}
                        <div className="rounded-[2.5rem] bg-blue-600 p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl -mr-16 -mt-16 rounded-full group-hover:scale-125 transition-transform"></div>
                            <h4 className="text-xl font-black mb-3 leading-tight">{t('সরাসরি সাপোর্ট', 'Need Custom Tool?')}</h4>
                            <p className="text-[10px] font-bold text-blue-100 mb-6 leading-relaxed opacity-80 uppercase tracking-widest">
                                {t('আপনার প্রয়োজনীয় ক্যালকুলেটরটি খুঁজে না পেলে আমাদের জানান।', 'If you need a specific calculation engine, our team can build it for you.')}
                            </p>
                            <Link to="/contact" className="block w-full py-3 text-center rounded-xl bg-white text-blue-600 font-black text-[9px] uppercase tracking-widest shadow-lg hover:shadow-2xl transition-all active:scale-95">
                                {t('নতুন টুল রিকোয়েস্ট করুন', 'REQUEST A FEATURE')}
                            </Link>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default CalculatorLayout;
