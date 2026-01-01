import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { calculateZakat } from '../calculators/zakat';
import {
    Calculator,
    Download,
    History,
    Wallet,
    Banknote,
    Coins,
    ShoppingBag,
    HelpCircle,
    TrendingDown,
    Sparkles,
    RotateCcw,
    Fingerprint,
    AlertTriangle,
    Weight,
    Scaling,
    Compass,
    BookOpen // Added BookOpen as it's used in the file
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ZakatPage = () => {
    const { lang, t } = useLanguage();
    const initialInputs = {
        cashHand: '',
        cashBank: '',
        goldValue: '',
        silverValue: '',
        investmentValue: '',
        businessGoods: '',
        debtsRecievable: '',
        liabilities: '',
        nisabValue: 110000,
    };

    const [inputs, setInputs] = useState(initialInputs);
    const [result, setResult] = useState(null);

    useEffect(() => {
        setResult(calculateZakat(inputs));
    }, [inputs]);

    const handleReset = () => {
        setInputs(initialInputs);
    };

    const seoTitle = t('যাকাত ক্যালকুলেটর ২০২৬ - নির্ভুল যাকাত হিসাব', 'Zakat Calculator 2026 - Official Shariah Compliant Tool');
    const seoDescription = t('ইসলামী শরীয়াহ সম্মত যাকাত ক্যালকুলেটর। আপনার নগদ টাকা, স্বর্ণ, ও ব্যবসায়িক সম্পদের সঠিক যাকাত নির্ণয় করুন। ১ মিনিটে আপনার যাকাত হিসাব করুন।', 'Calculate your Zakat accurately according to Shariah rules. The most trusted Zakat tool for Bangladesh with 2026 nisab rates. Easy 1-minute calculation.');
    const seoKeywords = t('যাকাত ক্যালকুলেটর, যাকাত হিসাব করার নিয়ম, zakat calculator bangladesh, zakat nisab 2026, islamic zakat calculator, shariah zakat calculator', 'zakat calculator, zakat calculator bangladesh, zakat nisab 2026, calculate zakat online, islamic financial tools');

    return (
        <CalculatorLayout
            title={seoTitle}
            description={seoDescription}
            keywords={seoKeywords}
            canonical="/zakat-calculator-bangladesh"
        >
            <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* INPUT ZONE */}
                    <div className="input-zone-container space-y-12 md:space-y-16 !p-6 md:!p-10">
                        <div className="flex justify-between items-center mb-8 px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                {t('তথ্য প্রদানের স্থান', 'STEP 1: ASSETS')}
                            </span>
                            <div className="h-px flex-grow mx-4 md:mx-8 bg-slate-200/50"></div>
                            <Fingerprint size={14} className="text-slate-300" />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 text-white rounded-xl shadow-lg flex items-center justify-center shrink-0">
                                    <Calculator size={24} />
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter truncate">
                                        {t('সম্পদের বিবরণ', 'Inventory')}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={handleReset}
                                className="p-3 md:p-4 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 border border-slate-100 transition-all shrink-0"
                                title={t('রিসেট', 'Reset All')}
                            >
                                <RotateCcw size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-10">
                            <SectionGroup title={t('নগদ ও সেভিংস', 'Liquid Assets')}>
                                <InputField
                                    label={t('হাতে নগদ টাকা', 'Cash in Hand')}
                                    value={inputs.cashHand}
                                    onChange={(v) => setInputs({ ...inputs, cashHand: v })}
                                    icon={<Wallet />}
                                    hint={t('আপনার কাছে বর্তমানে থাকা নগদ টাকা', 'Physical cash currently in your possession')}
                                />
                                <InputField
                                    label={t('ব্যাংক ব্যালেন্স', 'Bank Balance')}
                                    value={inputs.cashBank}
                                    onChange={(v) => setInputs({ ...inputs, cashBank: v })}
                                    icon={<Banknote />}
                                    hint={t('সেভিংস বা কারেন্ট অ্যাকাউন্টের ব্যালেন্স', 'Combined balance across all global & local accounts')}
                                />
                            </SectionGroup>

                            <SectionGroup title={t('স্থাবর সম্পদ', 'Hard Assets')}>
                                <InputField
                                    label={t('স্বর্ণের বাজারমূল্য', 'Market Gold Value')}
                                    value={inputs.goldValue}
                                    onChange={(v) => setInputs({ ...inputs, goldValue: v })}
                                    icon={<Coins />}
                                    hint={t('ব্যবহার্য বা গচ্ছিত স্বর্ণের বাজারদর', 'Current valuation of personal & ornamental gold')}
                                />
                                <InputField
                                    label={t('ব্যবসার মাল', 'Business Stock')}
                                    value={inputs.businessGoods}
                                    onChange={(v) => setInputs({ ...inputs, businessGoods: v })}
                                    icon={<ShoppingBag />}
                                    hint={t('বিক্রির জন্য রাখা স্টকের মূল্য', 'Wholesale value of goods intended for resale')}
                                />
                            </SectionGroup>

                            <SectionGroup title={t('ঋণ ও দয়', 'Liabilities')}>
                                <div className={`field-container transition-all ${Number(inputs.liabilities) < 0 ? 'border-red-500' : ''}`} onClick={() => document.getElementById('liabilities-input').focus()}>
                                    <div className="field-inner !bg-red-50/5 p-6 rounded-xl border border-red-100/30">
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                                                <TrendingDown size={14} />
                                                {t('ঋণ বা দায়ের পরিমাণ', 'Deduct Liabilities')}
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                id="liabilities-input"
                                                type="number"
                                                value={inputs.liabilities}
                                                onChange={(e) => setInputs({ ...inputs, liabilities: e.target.value })}
                                                className="w-full h-14 bg-white border border-red-100 rounded-xl px-12 text-xl font-black text-red-600 focus:border-red-500 outline-none pr-16"
                                                placeholder="0"
                                            />
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-red-400 font-black text-xl">−</span>
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-red-300">BDT</span>
                                        </div>
                                    </div>
                                </div>
                            </SectionGroup>
                        </div>
                    </div>

                    {/* RESULT ZONE */}
                    <div className="result-zone-container relative !p-8 md:!p-12 min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
                            <span className="text-[10px] font-black text-blue-500/40 uppercase tracking-[0.4em]">{t('হিসাবের ফলাফল', 'STEP 2: TOTAL DUTY')}</span>
                            <div className="h-px w-12 bg-blue-500/10"></div>
                        </div>

                        <div className="text-center py-10 w-full overflow-hidden">
                            <div className="text-[11px] font-black tracking-[0.6em] text-blue-400 mb-8 uppercase opacity-60">
                                {t('আপনার প্রদেয় যাকাত', 'YOUR TOTAL ZAKAT DUE')}
                            </div>

                            <div key={result?.zakatPayable} className="flex items-center justify-center gap-3 mb-12 overflow-hidden px-4">
                                <span className="text-2xl font-bold text-emerald-500 opacity-40 italic shrink-0">৳</span>
                                <div className="text-5xl md:text-7xl font-black tracking-tighter result-text-neon truncate max-w-full">
                                    {result?.zakatPayable?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US') || '০'}
                                </div>
                            </div>

                            <div className="space-y-6 pt-8 border-t border-white/5 w-full">
                                <StatRow label={t('নিট সম্পদের পরিমাণ', 'Net Qualified')} val={`৳${result?.totalAssets?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US') || '০'}`} />
                                <StatRow label={t('নিসাব থ্রেশহোল্ড', 'Minimum Nisab')} val={`৳${inputs.nisabValue?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US') || '০'}`} />

                                <div className="flex justify-between items-center p-6 rounded-2xl bg-white/5 border border-white/5 mt-10 transition-all hover:bg-white/10 group/status min-w-0 gap-4">
                                    <div className="flex flex-col items-start min-w-0">
                                        <span className="text-[8px] font-black uppercase tracking-widest opacity-30 truncate w-full">{t('যোগ্যতা স্ট্যাটাস', 'Status')}</span>
                                        <span className="text-[11px] font-black text-slate-400 group-hover/status:text-white transition-colors truncate w-full">SHARIAH CODE</span>
                                    </div>
                                    <span className={`px-5 py-2 rounded-lg text-[9px] font-black tracking-widest uppercase shrink-0 ${result?.isZakatEligible ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-red-500/20 text-red-500 border border-red-500/20'}`}>
                                        {result?.isZakatEligible ? t('যাকাত ফরজ', 'ZAKAT DUE') : t('প্রয়োজন নেই', 'NOT DUE')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB - SEO POWERHOUSE */}
            <div className="mt-20 space-y-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-lg">
                        <BookOpen size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('যাকাত গাইড', 'ZAKAT HUB')}</span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Core Explanation */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic underline decoration-emerald-500 decoration-4 underline-offset-8">
                                {t('যাকাত ক্যালকুলেটর ও হিসাব করার নিয়ম', 'Comprehensive Guide to Zakat Calculation')}
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-[1.8]">
                                {t('যাকাত ইসলামের পঞ্চস্তম্ভের অন্যতম একটি স্তম্ভ। প্রত্যেক সামর্থ্যবান মুসলিমের জন্য পূর্ণ এক বছর নিসাব পরিমাণ সম্পদ মালিকানাধীন থাকলে তার নির্দিষ্ট অংশ (২.৫%) যাকাত দেওয়া ফরজ। আমাদের এই ক্যালকুলেটরটি আধুনিক এবং শরিয়াহ সম্মত উপায়ে আপনার যাকাত হিসাব করতে সাহায্য করবে।', 'Zakat is a fundamental pillar of Islam. It is a mandatory charitable contribution for every qualifying Muslim who possesses wealth above the Nisab threshold for a full lunar year. Our precision tool helps you navigate these requirements with Shariah-compliant accuracy.')}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all group">
                                <Coins className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('নিসাব (Nisab) কী?', 'Understanding Nisab')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('নিসাব হলো যাকাত ফরজ হওয়ার ন্যূনতম সম্পদের পরিমাণ। সোনার ক্ষেত্রে ৭.৫ ভরি (৮৭.৪৮ গ্রাম) এবং রুপার ক্ষেত্রে ৫২.৫ ভরি (৬১২.৩৬ গ্রাম)।', 'Nisab is the minimum wealth threshold. For Gold, it is 87.48g (7.5 Bhori/Tola) and for Silver, it is 612.36g (52.5 Bhori).')}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-xl transition-all group">
                                <Sparkles className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('যাকাত হার (২.৫%)', 'The 2.5% Rule')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('আপনার নিট যাকাতযোগ্য সম্পদের মোট মূল্যের ১/৪০ অংশ বা ২.৫ শতাংশ যাকাত দিতে হয়।', 'You must contribute 2.5% (or 1/40th) of your total qualifying net assets after deducting liabilities.')}
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)', 'Frequently Asked Questions')}</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        q: t('স্বর্ণের যাকাত কি বর্তমান বাজার মূল্যে দিতে হবে?', 'Should I pay Zakat based on current gold price?'),
                                        a: t('হ্যাঁ, যাকাত হিসাব করার দিন বাজারে স্বর্ণের যে বাজারমূল্য (Market Price) থাকবে, সেই অনুযায়ী যাকাত দিতে হবে। ভরি বা গ্রাম হিসেবে হিসাব করতে পারেন।', 'Yes, Zakat must be calculated based on the prevailing market rate on the day of your valuation. You can calculate by Gram or Bhori.')
                                    },
                                    {
                                        q: t('ব্যবসায়িক পণ্যের যাকাত কীভাবে দিতে হয়?', 'How to calculate Zakat on business assets?'),
                                        a: t('ব্যবসায়িক পণ্যের বিক্রয়মূল্য (Selling Price) অনুযায়ী যাকাত দিতে হবে, ক্রয়মূল্য অনুযায়ী নয়।', 'Zakat should be calculated based on the current resale value (Selling Price) of the inventory, not the cost price.')
                                    },
                                    {
                                        q: t('পেনশন বা প্রভিডেন্ট ফান্ডের কি যাকাত হবে?', 'Is Zakat due on Pension or Provident Funds?'),
                                        a: t('হ্যাঁ, এই অর্থ আপনার আয়ত্তে আসলে এবং নিসাব পরিমাণ হলে যাকাত দিতে হবে।', 'Yes, once the funds are fully accessible to you and exceed the Nisab threshold, they become zakatable assets.')
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

                    {/* Sidebar: Quick Calculation Guide */}
                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                            <h3 className="text-xl font-black mb-6 italic">{t('হিসাবের ৪ ধাপ', '4-Step Formula')}</h3>
                            <div className="space-y-6">
                                {[
                                    t('১. মোট ক্যাশ ও ব্যাংক ব্যালেন্স যোগ করুন।', '1. Sum your total cash and bank balances.'),
                                    t('২. স্বর্ণ ও রুপার বর্তমান বাজার দর যোগ করুন।', '2. Add current market value of gold/silver.'),
                                    t('৩. ব্যবসায়িক পণ্যের মোট মূল্য হিসাব করুন।', '3. Calculate total value of business inventory.'),
                                    t('৪. ঋণ ও খরচ বাদ দিয়ে অবশিষ্ট্যের ২.৫% যাকাত দিন।', '4. Deduct liabilities and pay 2.5% of the remainder.')
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</div>
                                        <p className="text-[11px] font-bold text-slate-300 leading-relaxed uppercase tracking-wider">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100">
                            <div className="flex items-center gap-3 text-emerald-600 mb-4">
                                <AlertTriangle size={20} />
                                <h4 className="text-xs font-black uppercase tracking-widest">{t('জরুরি নোট', 'Important Note')}</h4>
                            </div>
                            <p className="text-[10px] font-bold text-emerald-800 leading-relaxed opacity-70 uppercase tracking-tight italic">
                                {t('যাকাত নির্দিষ্ট ৮টি খাতে ব্যয় করা ফরজ। বিস্তারিত জানার জন্য আপনার নিকটস্থ বিজ্ঞ আলেমের পরামর্শ নিন।', "Zakat must be distributed among the eight specific categories. We recommend consulting a local scholar for precise distribution rules.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

const SectionGroup = ({ title, children }) => (
    <div className="space-y-6 group/section min-w-0">
        <div className="flex items-center gap-3">
            <h3 className="text-[10px] font-black text-slate-400 group-hover/section:text-emerald-500 uppercase tracking-widest transition-colors shrink-0">
                {title}
            </h3>
            <div className="h-px flex-grow bg-slate-100 group-hover/section:bg-emerald-500/10 transition-colors"></div>
        </div>
        <div className="grid grid-cols-1 gap-6">{children}</div>
    </div>
);

const InputField = ({ label, value, onChange, icon, hint }) => {
    const inputRef = useRef(null);
    const { t } = useLanguage();

    return (
        <div className="bg-slate-50 p-4 md:p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group/field">
            <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-hover/field:text-emerald-600 transition-colors">
                    {React.cloneElement(icon, { size: 14, className: 'shrink-0' })}
                    <span className="truncate">{label}</span>
                </label>
                <div className="group/hint relative shrink-0">
                    <HelpCircle size={14} className="text-slate-300 cursor-help hover:text-emerald-500 transition-all opacity-40" />
                    <div className="absolute bottom-full right-0 mb-4 w-48 p-4 bg-slate-900 text-white text-[9px] font-bold rounded-xl opacity-0 translate-y-3 group-hover/hint:opacity-100 group-hover/hint:translate-y-0 transition-all z-50 pointer-events-none shadow-xl text-center uppercase tracking-wider">
                        {hint}
                    </div>
                </div>
            </div>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="number"
                    value={value}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-12 bg-white border border-slate-200 rounded-lg px-10 text-lg font-black text-slate-900 focus:border-emerald-500 outline-none transition-all pr-12"
                    placeholder="0"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-300 text-lg opacity-40 group-focus-within/field:opacity-100 group-focus-within/field:text-emerald-500 transition-all shrink-0">৳</span>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300 uppercase shrink-0">BDT</span>
            </div>
        </div>
    );
};

const StatRow = ({ label, val }) => (
    <div className="flex justify-between items-center group/row py-2 border-b border-white/5 hover:border-emerald-500/20 transition-all min-w-0 gap-4">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/row:text-emerald-400 transition-colors truncate shrink-0">{label}</span>
        <span className="text-lg font-black text-white group-hover/row:scale-105 transition-transform truncate">{val}</span>
    </div>
);

export default ZakatPage;
