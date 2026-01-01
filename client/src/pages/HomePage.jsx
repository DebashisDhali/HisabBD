import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Banknote,
    Coins,
    Car,
    GraduationCap,
    Calendar,
    Wallet,
    Calculator,
    Percent,
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe,
    Sparkles,
    MousePointer2,
    Search,
    LayoutGrid,
    Flame,
    RotateCcw,
    Fingerprint,
    Target,
    Activity
} from 'lucide-react';

const HomePage = () => {
    const { lang, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        {
            id: 'finance',
            title: t('ব্যাংকিং ও লোন', 'Banking & Finance'),
            desc: t('লোন, ডিপিএস এবং এফডিআর এর সঠিক হিসাব', 'Bank interest & debt calculations'),
            color: 'bg-blue-600',
            lightColor: 'bg-blue-50',
            borderColor: 'group-hover:border-blue-500/30',
            items: [
                { id: 'dps', name: t('ডিপিএস প্রফিট', 'DPS Profit'), path: '/dps-profit-calculator', icon: <Banknote />, trending: true },
                { id: 'fdr', name: t('এফডিআর লভ্যাংশ', 'FDR Dividends'), path: '/fdr-profit-calculator', icon: <Calculator /> },
                { id: 'emi', name: t('লোন ইএমআই', 'Loan EMI'), path: '/emi-loan-calculator', icon: <Car />, trending: true },
            ]
        },
        {
            id: 'islamic',
            title: t('ধর্মীয় ও শরীয়াহ', 'Islamic & Religious'),
            desc: t('শরীয়াহ ভিত্তিক যাকাত ক্যালকুলেটর', 'Shariah-compliant Zakat engine'),
            color: 'bg-emerald-600',
            lightColor: 'bg-emerald-50',
            borderColor: 'group-hover:border-emerald-500/30',
            items: [
                { id: 'zakat', name: t('যাকাত ক্যালকুলেটর', 'Zakat Calculator'), path: '/zakat-calculator-bangladesh', icon: <Coins />, trending: true },
            ]
        },
        {
            id: 'education',
            title: t('শিক্ষা ও ক্যারিয়ার', 'Education & Career'),
            desc: t('জিপিএ এবং সিজিপিএ এর নির্ভুল ফলাফল', 'GPA/CGPA institutional metrics'),
            color: 'bg-indigo-600',
            lightColor: 'bg-indigo-50',
            borderColor: 'group-hover:border-indigo-500/30',
            items: [
                { id: 'gpa', name: t('এসএসসি/এইচএসসি জিপিএ', 'SSC/HSC GPA'), path: '/ssc-hsc-gpa-calculator', icon: <GraduationCap />, trending: true },
                { id: 'cgpa', name: t('ইউনিভার্সিটি সিজিপিএ', 'University CGPA'), path: '/university-cgpa-calculator', icon: <GraduationCap /> },
                { id: 'admission', name: t('ভর্তি জিপিএ', 'Admission GPA'), path: '/admission-gpa-marks-calculator', icon: <Target />, trending: true },
                { id: 'tax', name: t('আয়কর ক্যালকুলেটর', 'Salary Tax'), path: '/salary-tax-calculator-bangladesh', icon: <Wallet /> },
            ]
        },
        {
            id: 'fitness',
            title: t('স্বাস্থ্য ও ফিটনেস', 'Health & Fitness'),
            desc: t('বিএমআই এবং স্বাস্থ্য সূচক', 'BMI & Health Metrics'),
            color: 'bg-rose-600',
            lightColor: 'bg-rose-50',
            borderColor: 'group-hover:border-rose-500/30',
            items: [
                { id: 'bmi', name: t('বিএমআই ক্যালকুলেটর', 'BMI Calculator'), path: '/bmi-calculator-bangladesh', icon: <Activity />, trending: true },
            ]
        },
        {
            id: 'utility',
            title: t('দৈনন্দিন ও অন্যান্য', 'Daily Utilities'),
            desc: t('স্বর্ণের দাম ও বয়স ক্যালকুলেটর', 'Spot gold and temporal tracking'),
            color: 'bg-amber-600',
            lightColor: 'bg-amber-50',
            borderColor: 'group-hover:border-amber-500/30',
            items: [
                { id: 'age', name: t('বয়স ক্যালকুলেটর', 'Pro Age Tracker'), path: '/age-calculator-bangladesh', icon: <Calendar />, trending: true },
                { id: 'gold', name: t('স্বর্ণের দাম', 'Gold Valuation'), path: '/gold-price-calculator-bangladesh', icon: <Sparkles />, trending: true },
                { id: 'percent', name: t('মার্ক রূপান্তর', 'Mark Analytics'), path: '/percentage-to-gpa-converter', icon: <Percent /> },
            ]
        }
    ];

    const allCalculators = categories.flatMap(cat => cat.items.map(item => ({ ...item, catColor: cat.color, catLight: cat.lightColor })));
    const filteredCalculators = allCalculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-[#fafbfc]">
            <Helmet>
                <title>{t('হিসাব বিডি - বাংলাদেশের এক নম্বর স্মার্ট ক্যালকুলেটর হাব', 'HisabBD - Bangladesh\'s #1 Smart Calculator Hub')}</title>
                <meta name="description" content={t('ব্যাংকিং, লোন, যাকাত, জিপিএ এবং স্বর্ণের দাম— সব কিছুর নির্ভুল হিসেব পান হিসাব বিডি-তে। বাংলাদেশের জন্য তৈরি সব স্মার্ট ক্যালকুলেটর এখন এক জায়গায়।', 'Get accurate calculations for Banking, Loans, Zakat, GPA, and Gold prices. The most trusted and precise all-in-one calculator hub for Bangladesh.')} />
                <meta name="keywords" content="hisabbd, bangla calculator, zakat calculator bd, gpa calculator ssc hsc, gold price calculator, income tax calculator bd, loan emi calculator bangladesh" />
                <link rel="canonical" href="https://hisabbd.com" />
            </Helmet>
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[60rem] h-[60rem] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[60rem] h-[60rem] bg-blue-500/5 blur-[120px] rounded-full"></div>
            </div>

            {/* SEARCH SPOTLIGHT BACKDROP */}
            <AnimatePresence>
                {searchQuery && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSearchQuery('')}
                        className="fixed inset-0 bg-slate-950/20 backdrop-blur-[2px] z-40 transition-all cursor-pointer"
                    />
                )}
            </AnimatePresence>

            {/* HIGH-CONVERSION HERO (Everything Above the Fold) */}
            <section className="relative pt-10 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* LEFT CONTENT: Title + Search */}
                        <div className="w-full lg:w-[45%] space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
                                    <Zap size={12} className="text-emerald-600 fill-emerald-600" />
                                    <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">{t('বাংলাদেশে এক নম্বর হাব', "BD'S #1 PRECISION HUB")}</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-950 mb-4 tracking-tighter leading-[1.1]">
                                    {t('সঠিক হিসেব এখন', 'All Metrics')}<br />
                                    <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent italic">
                                        {t('মুহূর্তেই।', 'Simplified.')}
                                    </span>
                                </h1>
                                <p className="text-base text-slate-500 font-medium leading-relaxed max-w-md">
                                    {t('ব্যাংকিং থেকে যাকাত— বাংলাদেশের জন্য তৈরি সব স্মার্ট ক্যালকুলেটর এখন এক জায়গায়।', 'The only professional computational engine you need for local statutory calculations.')}
                                </p>
                            </motion.div>

                            {/* INTEGRATED SEARCH HUB */}
                            <div className="relative group z-50">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors pointer-events-none">
                                    <Search size={20} strokeWidth={2.5} />
                                </div>
                                <input
                                    type="text"
                                    placeholder={t('যে কোনো কিছু খুঁজুন...', 'Instant Discovery...')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-16 pl-16 pr-32 bg-white border-2 border-slate-100 rounded-2xl shadow-xl shadow-slate-200/40 outline-none focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/5 transition-all font-black text-slate-800 placeholder:text-slate-300"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"><RotateCcw size={14} /></button>
                                    )}
                                    <div className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${searchQuery ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                                        {searchQuery ? `${filteredCalculators.length} Match` : 'Search'}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {searchQuery && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute top-[110%] left-0 w-full bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-2xl p-4 overflow-hidden z-50 transition-all"
                                        >
                                            <div className="max-h-[350px] overflow-y-auto custom-scrollbar space-y-1">
                                                <div className="px-4 py-2 border-b border-slate-50 mb-2">
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SYSTEM OVERVIEW</span>
                                                </div>
                                                {filteredCalculators.length > 0 ? (
                                                    filteredCalculators.map((item) => (
                                                        <Link key={item.id} to={item.path} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                                                            <div className={`w-10 h-10 ${item.catLight} rounded-xl flex items-center justify-center`}>{React.cloneElement(item.icon, { size: 18, className: "text-slate-900" })}</div>
                                                            <div className="flex-grow"><h4 className="text-xs font-black text-slate-900 group-hover/item:text-emerald-600 transition-colors uppercase tracking-tight">{item.name}</h4></div>
                                                            <ArrowRight size={12} className="text-slate-200 group-hover/item:text-emerald-500 transition-all" />
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="py-10 text-center"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No match found</p></div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* TRUST BADGES (Visible immediately) */}
                            <div className="flex gap-6 items-center pt-2">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Privacy Secured</span>
                                </div>
                                <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <Sparkles size={14} className="text-amber-500" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified Logic</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT: QUICK HUB (No Scroll Needed) */}
                        <div className="w-full lg:w-[55%] grid grid-cols-2 md:grid-cols-3 gap-4">
                            {allCalculators.filter(c => c.trending).slice(0, 6).map((item, idx) => (
                                <Link
                                    key={item.id}
                                    to={item.path}
                                    className="group p-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-center relative overflow-hidden"
                                >
                                    <div className={`absolute top-0 right-0 w-8 h-8 ${item.catLight} opacity-20 -mr-4 -mt-4 rounded-full`}></div>
                                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${item.catLight} flex items-center justify-center text-slate-900 group-hover:${item.catColor} group-hover:text-white transition-all duration-500 shadow-sm shrink-0`}>
                                        {React.cloneElement(item.icon, { size: 22 })}
                                    </div>
                                    <h3 className="text-[10px] font-black text-slate-900 leading-tight uppercase tracking-tight mb-3 h-8 flex items-center justify-center p-1">{item.name}</h3>
                                    <div className="flex justify-center">
                                        <div className="px-2 py-0.5 bg-emerald-50 text-[7px] font-black text-emerald-600 rounded-md flex items-center gap-1">
                                            <Flame size={8} className="fill-emerald-600" />
                                            TRENDING
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN PORTAL AREA (Now follows immediately) */}
            <main className="max-w-7xl mx-auto px-6 py-10 pb-40">
                <div className="space-y-24">
                    {/* BROWSE ALL SECTION (Reduced Margin) */}
                    <div className="flex items-center gap-6 mb-12">
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-950 text-white rounded-xl shadow-lg">
                            <LayoutGrid size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t('লাইব্রেরি', 'Library')}</span>
                        </div>
                        <div className="h-px flex-grow bg-slate-100"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-1 h-8 ${cat.color} rounded-full`}></div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-950 uppercase tracking-tight">{cat.title}</h2>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cat.desc}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {cat.items.map((item) => (
                                        <Link
                                            key={item.id}
                                            to={item.path}
                                            className={`group relative overflow-hidden bg-white border border-slate-200/60 rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${cat.borderColor}`}
                                        >
                                            <div className={`w-10 h-10 ${cat.lightColor} rounded-xl flex items-center justify-center mb-4 group-hover:${cat.color} group-hover:text-white transition-all shadow-sm`}>
                                                {React.cloneElement(item.icon, { size: 18 })}
                                            </div>
                                            <div className="relative z-10">
                                                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight mb-2 uppercase">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                                    <span>LAUNCH SYSTEM</span>
                                                    <ArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* TRUST FOOTER */}
            <section className="bg-slate-950 pt-20 pb-32 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                                {t('নিরাপদ এবং নির্ভুল।', 'Accurate. Secure.')}
                            </h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                                {t('আমাদের প্রতিটি ক্যালকুলেটর বাংলাদেশের ব্যাংকিং ও সরকারি নীতিমালা অনুযায়ী ডিজাইন করা হয়েছে।', 'Precision-engineered to local statutes. Privacy by design.')}
                            </p>
                            <div className="flex items-center gap-10">
                                <div className="flex flex-col">
                                    <span className="text-white text-3xl font-black">100%</span>
                                    <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest mt-1">Accuracy</span>
                                </div>
                                <div className="h-8 w-[1px] bg-white/10"></div>
                                <div className="flex flex-col">
                                    <span className="text-white text-3xl font-black">256B</span>
                                    <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest mt-1">Local Logic</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                            {[
                                { title: 'SHARIAH COMPLIANT', icon: <Coins className="text-emerald-500" /> },
                                { title: 'BANKING STANDARDS', icon: <Banknote className="text-blue-500" /> },
                                { title: 'REAL-TIME VALUE', icon: <Sparkles className="text-amber-500" /> },
                                { title: 'ZERO DATA LOG', icon: <Target className="text-emerald-500" /> },
                            ].map((pill, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-white transition-all duration-700">
                                    <div className="mb-4 group-hover:scale-110 transition-transform">{pill.icon}</div>
                                    <span className="text-[8px] font-black text-white group-hover:text-slate-900 uppercase tracking-widest">{pill.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DOMAIN KNOWLEDGE HUB - SEO ANCHOR */}
            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className="lg:w-2/3 space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl font-black text-slate-950 tracking-tight leading-tight uppercase underline decoration-emerald-500 decoration-8 underline-offset-[12px]">
                                    {t('হিসাব বিডি - বাংলাদেশের ডিজিটাল ক্যালকুলেটর ইকোসিস্টেম', 'HisabBD - The Digital Calculator Ecosystem for Bangladesh')}
                                </h2>
                                <p className="text-lg text-slate-600 font-medium leading-[1.8]">
                                    {t('হিসাব বিডি একটি আধুনিক ও স্মার্ট অনলাইন প্ল্যাটফর্ম যা বাংলাদেশের মানুষের প্রাত্যহিক জীবনের সকল গাণিতিক চাহিদা পূরণ করতে তৈরি করা হয়েছে। আমাদের মূল লক্ষ্য হলো জটিল আর্থিক ও একাডেমিক হিসাবগুলোকে সহজ ও নির্ভুলভাবে ব্যবহারকারীদের সামনে তুলে ধরা। ব্যাংকিং ইন্টারেস্ট থেকে শুরু করে যাকাতের শরিয়াহ ভিত্তিক হিসাব কিংবা পাবলিক পরীক্ষার জিপিএ— সবকিছুই এখন এক জায়গায়।', 'HisabBD is a state-of-the-art digital ecosystem engineered to streamline the mathematical complexities of daily life in Bangladesh. Our vision is to democratize accurate financial and academic analytics. From banking compounding to Shariah-compliant Zakat audits and board-standardized GPA computations—we provide a unified, precision-driven hub for the nation.')}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section className="space-y-4">
                                    <h3 className="text-xl font-black text-slate-900 border-l-4 border-emerald-500 pl-4">{t('কেন আমাদের ক্যালকুলেটর সেরা?', 'Why HisabBD Stands Out?')}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {t('আমাদের প্রতিটি টুল ন্যাশনাল কারিকুলাম, ব্যাংকিং গেজেট এবং এনবিআর (NBR) এর সর্বশেষ নীতিমালা অনুসরণ করে নিয়মিত আপডেট করা হয়। এতে করে ব্যবহারকারীরা পান ১০০% নির্ভুল হিসেব।', 'Consistency is our code. Every tool is calibrated against the latest National Curriculum, Banking statutory codes, and NBR directives, ensuring 100% audit-ready precision.')}
                                    </p>
                                </section>
                                <section className="space-y-4">
                                    <h3 className="text-xl font-black text-slate-900 border-l-4 border-blue-500 pl-4">{t('নিরাপত্তা ও গোপনীয়তা', 'Privacy & Integrity')}</h3>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {t('আমরা ব্যবহারকারীর কোনো ডাটা বা ইনপুট আমাদের সার্ভারে সংরক্ষণ করি না। আপনার হিসাব সম্পূর্ণ আপনার ব্রাউজারে প্রসেস হয়, যা আপনাকে দেয় নিশ্চিন্ত নিরাপত্তা।', 'Privacy isn\'t a feature; it\'s our foundation. We operate on a zero-log policy, meaning all calculations are processed locally on your device, ensuring maximum data integrity.')}
                                    </p>
                                </section>
                            </div>

                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                                <h4 className="text-base font-black text-slate-900 mb-4 uppercase tracking-tight">{t('আমাদের ক্যাটাগরিগুলো (Key Categories)', 'Key Domains We Cover')}</h4>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        t('ব্যাংকিং ও ফাইন্যান্স', 'Banking & Finance'),
                                        t('ইসলামিক শরিয়াহ ফাইন্যান্স', 'Islamic Shariah Finance'),
                                        t('একাডেমিক গ্রেডিং ও জিপিএ', 'Academic GPA & Analytics'),
                                        t('গভর্নমেন্ট ট্যাক্স গেজেট', 'Statutory Tax Hub'),
                                        t('ইউটিলিটি ও ডেইলি লাইফ', 'Daily Life Utilities')
                                    ].map((tag, i) => (
                                        <span key={i} className="px-5 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/3 space-y-8">
                            <div className="p-10 rounded-[3rem] bg-indigo-950 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                                <h3 className="text-xl font-black mb-6 italic">{t('মিশন ও ভিশন', 'Our Mission')}</h3>
                                <p className="text-xs font-bold leading-[1.8] text-indigo-100 uppercase tracking-wider">
                                    {t('১. ডিজিটাল বাংলাদেশ বিনির্মাণে স্মার্ট টুলস প্রদান।', '1. Providing smart assets for a Digital Bangladesh.')}
                                    <br />
                                    {t('২. সকল আর্থিক হিসেবে স্বচ্ছতা আনা।', '2. Democratizing financial transparency.')}
                                    <br />
                                    {t('৩. বিনামূল্যে প্রিমিয়াম ক্যালকুলেটর এক্সেস।', '3. Universal access to premium analytics.')}
                                </p>
                            </div>

                            <div className="text-center p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
                                <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest leading-loose">
                                    {t('হিসাব বিডি ডট কম - বাংলাদেশের ১ নম্বর গাণিতিক ওয়েবসাইট', 'HISABBD.COM - BANGLADESH\'S PREMIER CALCULATOR HUB')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
