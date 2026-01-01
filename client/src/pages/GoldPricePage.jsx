import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { calculateGoldPrice } from '../calculators/gold';
import { Coins, AlertTriangle, HelpCircle, Weight, Scaling, Sparkles, Compass, RotateCcw, Fingerprint, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const GoldPricePage = () => {
    const { lang, t } = useLanguage();
    const initialInputs = {
        price24k: '',
        grams: '',
        karat: '22'
    };

    const [inputs, setInputs] = useState(initialInputs);
    const [result, setResult] = useState(0);

    useEffect(() => {
        setResult(calculateGoldPrice(inputs.price24k, inputs.grams, inputs.karat));
    }, [inputs]);

    const handleReset = () => setInputs(initialInputs);

    const seoTitle = t('স্বর্ণের দাম ক্যালকুলেটর ২০২৬ - বিডি গোল্ড প্রাইস', 'Gold Price Calculator 2026 - Official BD Market Rate');
    const seoDescription = t('আজকের স্বর্ণের দাম অনুযায়ী আপনার সোনার বাজারমূল্য হিসেব করুন। ১৮, ২১, ২২ ও ২৪ ক্যারেট স্বর্ণের সঠিক হিসাব করার টুল। ভরি ও গ্রামের নির্ভুল মান।', 'Calculate gold price in Bangladesh based on latest market rates. Accurate weight conversion and purity pricing for 18K, 21K, 22K, and 24K gold. Best BD gold tools.');
    const seoKeywords = t('স্বর্ণের দাম ক্যালকুলেটর, সোনার দাম কত, gold price calculator bangladesh, today gold price bd, 22 karat gold price bangladesh, gold purity calculator', 'gold price calculator, gold price bangladesh, calculate gold value bd, 22k gold price, gold unit converter');

    return (
        <CalculatorLayout
            title={seoTitle}
            description={seoDescription}
            keywords={seoKeywords}
            canonical="/gold-price-calculator-bangladesh"
        >
            <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* INPUT ZONE */}
                    <div className="input-zone-container !p-6 md:!p-10 space-y-12 md:space-y-16">
                        <div className="flex justify-between items-center mb-6 px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                                {t('তথ্য প্রদান', 'STEP 1: QUALITY')}
                            </span>
                            <div className="h-px flex-grow mx-4 bg-slate-200/50"></div>
                            <Fingerprint size={14} className="text-slate-300" />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Compass size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tighter truncate">
                                        {t('এসেট ভ্যালুয়েশন', 'Asset Valuation')}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 border border-slate-100 transition-all shrink-0"
                                title={t('পুনরায় শুরু করুন', 'Reset')}
                            >
                                <RotateCcw size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-10">
                            <InputField
                                label={t('২৪ ক্যারেট স্বর্ণের দাম', '24k Gold Reference')}
                                value={inputs.price24k}
                                onChange={(v) => setInputs({ ...inputs, price24k: v })}
                                icon={<Scaling />}
                                hint={t('বর্তমান বাজারে ২৪ ক্যারেট ১ গ্রাম স্বর্ণের দাম।', 'Baseline 24k market price per gram.')}
                                unit="BDT/G"
                                symbol="৳"
                            />

                            <InputField
                                label={t('স্বর্ণের ওজন', 'Gold Weight')}
                                value={inputs.grams}
                                onChange={(v) => setInputs({ ...inputs, grams: v })}
                                icon={<Weight />}
                                hint={t('আপনার কাছে থাকা স্বর্ণের মোট ওজন (গ্রাম)।', 'Total mass in grams for valuation.')}
                                unit="GRAMS"
                            />

                            <div className="bg-white p-6 rounded-3xl border border-slate-100/60 shadow-sm space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
                                    <div className="flex items-center gap-2">
                                        <Coins size={14} className="text-amber-500" />
                                        {t('স্বর্ণের মান', 'PURITY STANDARD')}
                                    </div>
                                    <Tooltip hint={t('ক্যারেট অনুযায়ী স্বর্ণের বিশুদ্ধতা নির্বাচন করুন।', 'Select the hallmarked purity level.')} highlightColor="text-amber-500" />
                                </div>
                                <div className="grid grid-cols-4 gap-3">
                                    {['18', '21', '22', '24'].map((k) => (
                                        <button
                                            key={k}
                                            onClick={() => setInputs({ ...inputs, karat: k })}
                                            className={`py-3 rounded-xl text-sm font-black transition-all border ${inputs.karat === k
                                                ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20 scale-105'
                                                : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-amber-200'
                                                }`}
                                        >
                                            {k}K
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-amber-50/50 border border-amber-100/50 flex items-start gap-4">
                            <AlertTriangle className="text-amber-600 shrink-0 mt-1" size={18} />
                            <p className="text-[10px] font-bold text-amber-800/60 leading-relaxed uppercase tracking-tight italic">
                                {t('বাজার দর পরিবর্তনশীল। ক্রয়-বিক্রয়ের পূর্বে স্থানীয় জুয়েলারি মার্কেট যাচাই করুন।', 'Market rates are subject to change. Verify with local jeweler before transaction.')}
                            </p>
                        </div>
                    </div>

                    {/* RESULT ZONE */}
                    <div className="result-zone-container relative !p-8 md:!p-12 min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
                            <span className="text-[10px] font-black text-blue-500/30 uppercase tracking-[0.4em]">{t('হিসাবের ফলাফল', 'STEP 2: TOTAL VALUE')}</span>
                        </div>

                        <div className="w-full pt-10 overflow-hidden text-center">
                            <div className="flex items-center justify-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                                <Sparkles size={14} />
                                {t('বাজার মূল্যায়ন', 'MARKET VALUATION')}
                            </div>

                            <div className="text-[9px] font-black tracking-[0.6em] text-blue-400 mb-6 uppercase opacity-60 leading-loose">
                                {t('মোট বাজার মূল্য', 'NET LIQUID VALUE')}
                            </div>

                            <div key={result} className="flex items-center justify-center gap-3 mb-10 overflow-hidden px-4">
                                <span className="text-xl font-bold text-amber-500 opacity-40 italic shrink-0">৳</span>
                                <div className="text-5xl md:text-7xl font-black tracking-tighter result-text-neon truncate max-w-full">
                                    {result?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US') || '০'}
                                </div>
                            </div>

                            <div className="mt-12 px-8 py-3 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.4em] inline-block opacity-40">
                                Real-time Reference
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB - SEO POWERHOUSE */}
            <div className="mt-20 space-y-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-amber-500 text-white rounded-xl shadow-lg">
                        <Sparkles size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('স্বর্ণ গাইড', 'GOLD HUB')}</span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic underline decoration-amber-500 decoration-4 underline-offset-8">
                                {t('বাংলাদেশে স্বর্ণের দাম ও হিসাব করার নিয়ম', 'Official Guide to Gold Prices in Bangladesh')}
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-[1.8]">
                                {t('স্বর্ণের দাম মূলত আন্তর্জাতিক বাজারের ওপর নির্ভর করে এবং বাজুস (BAJUS) বাংলাদেশে স্বর্ণের দাম নির্ধারণ করে। আমাদের এই ক্যালকুলেটরটি আপনাকে সরাসরি বর্তমান বাজারমূল্য এবং ক্যারেট (Purity) অনুযায়ী সঠিক দাম বের করতে সাহায্য করবে। গয়না কেনার আগে বা ইনভেস্ট করার আগে নির্ভুল হিসাব জানা অত্যন্ত জরুরি।', 'Gold prices are primarily driven by international spot rates, with BAJUS (Bangladesh Jewellers Association) setting local benchmarks. Our real-time calculator allows you to derive precise valuations across purity levels (18k-24k). Understanding the exact market value is critical before making any retail purchases or investment decisions.')}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all group">
                                <Scaling className="text-amber-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('ভরি ও গ্রাম রূপান্তর', 'Bhori to Gram Matrix')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('বাংলাদেশে মূলত ভরি হিসেবে স্বর্ণ মাপা হয়। ১ ভরি = ১১.৬৬৪ গ্রাম। এই কনভার্সনটি গয়নার দোকানে দাম যাচাই করার জন্য সবচেয়ে গুরুত্বপূর্ণ।', 'In the local BD market, Gold is measured in Bhori/Vhori. 1 Bhori equals exactly 11.664 Grams. This ratio is fundamental for price verification at jewelry outlets.')}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all group">
                                <Briefcase className="text-amber-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('ইনভেস্টমেন্ট টিপস', 'Investment Analysis')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('দীর্ঘমেয়াদী ইনভেস্টমেন্টের জন্য ২৪ ক্যারেট স্বর্ণের বার বা কয়েন সবচেয়ে উপযোগী কারণ এতে মেকিং চার্জ বা খাদ থাকে না।', 'For long-term capital preservation, 24k bars or bullion coins are ideal as they avoid retail making charges and maintain maximum intrinsic purity.')}
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)', 'Frequently Asked Questions')}</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        q: t('১৮, ২১ ও ২২ ক্যারেটের মধ্যে পার্থক্য কী?', 'Difference between 18k, 21k, and 22k?'),
                                        a: t('২২ ক্যারেটে ৯১.৬% খাঁটি সোনা থাকে, ২১ ক্যারেটে ৮৭.৫% এবং ১৮ ক্যারেটে ৭৫.০% সোনা থাকে। ক্যারেট যত বেশি, স্বর্ণের বিশুদ্ধতা তত বেশি।', '22k contains 91.6% pure gold, 21k contains 87.5%, and 18k contains 75% gold. Higher karat denotes higher purity and liquid market value.')
                                    },
                                    {
                                        q: t('ক্যাডমিয়াম (Cadmium) স্বর্ণ কী?', 'What is Cadmium Gold?'),
                                        a: t('ক্যাডমিয়াম বা হলমার্ক করা সোনা মানে এর বিশুদ্ধতা একটি নির্দিষ্ট ল্যাবে যাচাই করা হয়েছে। কেনার সময় সবসময় হলমার্ক দেখে কেনা উচিত।', 'Cadmium refers to modern hallmarking where the purity is laboratory-certified. Always insist on hallmarked gold to ensure resale value protection.')
                                    },
                                    {
                                        q: t('গয়নার দাম কীভাবে হিসাব করা হয়?', 'How is jewelry price calculated?'),
                                        a: t('গয়নার দাম = (স্বর্ণের দাম + মেকিং চার্জ) + ৫% ভ্যাট। সবসময় মেকিং চার্জ এবং ভ্যাট আলাদাভাবে বুঝে নিন।', 'Jewelry Price = (Gold Value + Making Charges) + 5% VAT. Ensure these components are itemized individually on your invoice.')
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                        <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">{item.q}</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                            <h3 className="text-xl font-black mb-6 italic">{t('বিশুদ্ধতা মানদণ্ড', 'Purity Scale')}</h3>
                            <div className="space-y-4">
                                {[
                                    { label: '24 Karat', val: '99.9%' },
                                    { label: '22 Karat', val: '91.6%' },
                                    { label: '21 Karat', val: '87.5%' },
                                    { label: '18 Karat', val: '75.0%' }
                                ].map((row, i) => (
                                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 group">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-amber-400 transition-colors">{row.label}</span>
                                        <span className="text-lg font-black text-white">{row.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 text-center">
                            <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 mb-2">{t('বাজার আপডেট', 'MARKET INTEL')}</h4>
                            <p className="text-[9px] font-bold text-amber-800 leading-relaxed opacity-70 uppercase tracking-tight italic">
                                {t('স্বর্ণের বাজার অত্যন্ত অস্থির হতে পারে। যেকোনো বড় লেনদেনের আগে আমাদের ক্যালকুলেটর ব্যবহার করে যাচাই করে নিন।', "Gold markets are volatile. Use our calibration engine for verification before any major transaction.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

const InputField = ({ label, value, onChange, icon, hint, symbol, unit }) => {
    const inputRef = useRef(null);
    const { t } = useLanguage();

    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-amber-200 transition-all group/field">
            <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-amber-600 transition-colors">
                    {React.cloneElement(icon, { size: 14, className: 'shrink-0' })}
                    <span className="truncate">{label}</span>
                </label>
                <div className="group/hint relative shrink-0">
                    <HelpCircle size={14} className="text-slate-300 cursor-help hover:text-amber-500 transition-all opacity-40" />
                    <div className="absolute bottom-full right-0 mb-4 w-48 p-4 bg-slate-900 text-white text-[9px] font-bold rounded-xl opacity-0 translate-y-3 group-hover/hint:opacity-100 group-hover/hint:translate-y-0 transition-all z-50 pointer-events-none shadow-xl border border-white/10 uppercase tracking-wider text-center">
                        {hint}
                    </div>
                </div>
            </div>
            <div className="relative flex items-center">
                <input
                    ref={inputRef}
                    type="number"
                    value={value}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-12 bg-slate-50/50 border border-slate-100 rounded-lg px-8 text-lg font-black text-slate-900 focus:bg-white focus:border-amber-500 outline-none transition-all pr-12"
                    placeholder="0"
                />
                <span className="absolute left-3 font-black text-amber-500/20 text-lg group-focus-within/field:text-amber-500 transition-all pointer-events-none shrink-0">{symbol}</span>
                <span className="absolute right-4 text-[9px] font-black text-slate-300 uppercase shrink-0">{unit}</span>
            </div>
        </div>
    );
};

const Tooltip = ({ hint, highlightColor }) => (
    <div className="group/hint relative shrink-0">
        <HelpCircle size={14} className={`text-slate-300 cursor-help transition-colors ${highlightColor ? `hover:${highlightColor}` : 'hover:text-amber-500'}`} />
        <div className="absolute bottom-full right-0 mb-4 w-48 p-4 bg-slate-900 text-white text-[9px] font-bold rounded-xl opacity-0 translate-y-3 group-hover/hint:opacity-100 group-hover/hint:translate-y-0 transition-all z-50 pointer-events-none shadow-xl border border-white/10 text-center uppercase tracking-wider">
            {hint}
        </div>
    </div>
);

const InfoBox = ({ title, text }) => (
    <div className="p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm group hover:shadow-lg transition-all">
        <h4 className="text-xl font-black text-amber-600 mb-4 tracking-tighter uppercase">{title}</h4>
        <p className="text-base text-slate-500 font-medium leading-relaxed">
            {text}
        </p>
    </div>
);

export default GoldPricePage;
