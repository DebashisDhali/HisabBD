import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { calculateAge, calculateSalaryTax } from '../calculators/utilities';
import { Calendar, Wallet, Banknote, AlertTriangle, HelpCircle, User, Briefcase, Fingerprint, Clock, ShieldCheck, Zap, RotateCcw, ArrowRightCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const UtilityPage = ({ type }) => {
    const { lang, t } = useLanguage();
    const initialInputs = { dob: '', salary: '' };
    const [inputs, setInputs] = useState(initialInputs);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (type === 'age') setResult(calculateAge(inputs.dob));
        else if (type === 'tax') setResult(calculateSalaryTax(inputs.salary));
    }, [inputs, type]);

    const handleReset = () => setInputs(initialInputs);

    const config = {
        age: {
            title: t('বয়স ক্যালকুলেটর (বাংলাদেশ)', 'Pro Age Analytics'),
            desc: t('আপনার জন্ম তারিখ থেকে বর্তমান বয়সের সঠিক হিসেব বের করুন।', 'Official tracking system for NID, Passport or Official use.'),
            icon: <Clock className="text-emerald-600" />
        },
        tax: {
            title: t('ইনকাম ট্যাক্স ক্যালকুলেটর (বাংলাদেশ)', 'Official BD Tax Architect'),
            desc: t('বাংলাদেশি আয়কর নীতিমালা ২০২৪-২৫ অনুযায়ী আপনার বেতনের ট্যাক্স নিমিষেই বের করুন।', 'Official Bangladesh income tax statutory codes.'),
            icon: <ShieldCheck className="text-emerald-600" />
        }
    };

    const seoConfigs = {
        age: {
            title: t('বয়স ক্যালকুলেটর ২০২৬ - জন্ম তারিখ থেকে হিসেব করুন', 'Age Calculator 2026 - Official Birth Date Analytics'),
            desc: t('আপনার জন্ম তারিখ থেকে বর্তমান বয়স, মাস ও দিন নির্ভুলভাবে বের করুন। এনআইডি ও সরকারি কাজের জন্য আদর্শ।', 'Calculate your exact age in years, months, and days from your date of birth. Perfect for NID, Passport, and official applications in Bangladesh.'),
            keywords: 'age calculator bd, calculate age online, birthday calculator, age tracker bangladesh, exact age calculator',
            canonical: '/age-calculator-bangladesh'
        },
        tax: {
            title: t('ইনকাম ট্যাক্স ক্যালকুলেটর ২০২৪-২৫ - সেলারি ট্যাক্স বিডি', 'Income Tax Calculator 2024-25 - Official BD Salary Tax Hub'),
            desc: t('বাংলাদেশি বাজেট ২০২৪-২৫ অনুযায়ী আপনার বেতনের ট্যাক্স নির্ভুলভাবে হিসেব করুন। ৩.৫ লক্ষ টাকা করমুক্ত সীমা বিবেচনা করে।', 'Calculate your salary income tax according to the latest 2024-25 Bangladesh budget. Supports tax slabs and deductions accurately.'),
            keywords: 'income tax calculator bd, salary tax calculator bangladesh, income tax slabs 2024-25, tax calculator bd online',
            canonical: '/income-tax-calculator-bangladesh'
        }
    };

    const currentSeo = seoConfigs[type] || seoConfigs.age;

    return (
        <CalculatorLayout
            title={currentSeo.title}
            description={currentSeo.desc}
            keywords={currentSeo.keywords}
            canonical={currentSeo.canonical}
        >
            <div className="space-y-6">
                {type === 'age' && (
                    <div className="card-premium">
                        <div className="input-zone-container !p-6 md:!p-8">
                            <div className="flex justify-between items-center mb-6 px-4">
                                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    {t('তথ্য প্রদান', '1. SETUP')}
                                </span>
                                <div className="h-px flex-grow mx-4 bg-slate-200/50"></div>
                                <Clock size={12} className="text-slate-300" />
                            </div>

                            <div className="max-w-xl mx-auto">
                                <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                                                <Calendar size={16} />
                                            </div>
                                            <h3 className="text-base font-black text-slate-900 leading-none">{t('জন্ম তারিখ', 'Date of Birth')}</h3>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 border border-slate-100 transition-all"
                                            title={t('রিসেট', 'Reset')}
                                        >
                                            <RotateCcw size={14} />
                                        </button>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="date"
                                            value={inputs.dob}
                                            onChange={(e) => setInputs({ ...inputs, dob: e.target.value })}
                                            className={`w-full p-4 text-xl md:text-2xl font-black rounded-xl border bg-slate-50/50 focus:bg-white focus:border-emerald-500 outline-none text-center transition-all ${new Date(inputs.dob) > new Date() ? 'border-red-500 text-red-500' : 'border-slate-200 text-slate-900'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {result && (
                            <div className="mt-8">
                                <div className="result-zone-container !p-4 md:!p-6">
                                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                                        {[
                                            { label: t('বছর', 'Years'), val: result.years, color: 'result-text-white' },
                                            { label: t('মাস', 'Months'), val: result.months, color: 'result-text-neon' },
                                            { label: t('দিন', 'Days'), val: result.days, color: 'result-text-white opacity-60' }
                                        ].map((item, i) => (
                                            <div key={i} className={`bg-white/5 p-4 md:p-6 rounded-2xl border border-white/5 flex flex-col items-center`}>
                                                <div className={`text-2xl md:text-4xl font-black mb-1 tracking-tighter ${item.color}`}>
                                                    {item.val.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}
                                                </div>
                                                <div className="text-[8px] font-black uppercase tracking-widest text-blue-400/60">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {type === 'tax' && (
                    <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                            {/* INPUT PANEL */}
                            <div className="input-zone-container !p-6 md:!p-10 flex flex-col">
                                <div className="mb-6 flex items-center gap-4">
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                        {t('ইনপুট', 'STEP 1: REVENUE')}
                                    </span>
                                    <div className="h-px flex-grow bg-slate-200/50"></div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-center shrink-0">
                                                <Briefcase size={24} />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-xl font-black text-slate-900 tracking-tighter truncate">
                                                    {t('মাসিক সেলারি', 'Gross Salary')}
                                                </h3>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 transition-all border border-slate-100 shrink-0"
                                            title={t('পুনরায় শুরু করুন', 'Reset')}
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                    </div>

                                    <div className="bg-slate-50/80 p-6 rounded-2xl border border-slate-200/50">
                                        <div className="flex justify-between items-center mb-2 px-1">
                                            <label className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                                                <Banknote size={14} />
                                                {t('মাসিক মোট বেতন', 'TOTAL MONTHLY')}
                                            </label>
                                            <Tooltip hint={t('আপনার মোট মাসিক আয়।', 'Gross monthly revenue.')} />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={inputs.salary}
                                                onChange={(e) => setInputs({ ...inputs, salary: e.target.value })}
                                                className="w-full h-16 bg-white border border-slate-200 rounded-xl px-6 text-2xl font-black text-slate-900 focus:border-emerald-500 outline-none transition-all pr-20"
                                                placeholder="0"
                                            />
                                            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xs">BDT</span>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4 items-start">
                                        <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={20} />
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-amber-900 truncate">{t('৩.৫ লক্ষ টাকা করমুক্ত।', '3.5L Threshold')}</p>
                                            <p className="text-[8px] text-amber-700/60 font-bold uppercase tracking-widest">{t('বাংলাদেশ গেজেট ২০২৪-২৫', 'OFFICIAL GAZETTE 24-25')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RESULT PANEL */}
                            <div className="result-zone-container !p-8 md:!p-12 relative flex flex-col justify-center min-h-[400px]">
                                <div className="absolute top-8 left-8 flex items-center gap-3">
                                    <span className="text-[9px] font-black text-blue-500/40 uppercase tracking-[0.4em]">{t('ফলাফল', 'STEP 2: OUTPUT')}</span>
                                    <div className="h-px w-12 bg-blue-500/10"></div>
                                </div>

                                <div className="w-full overflow-hidden text-center py-8">
                                    <div className="text-[9px] font-black tracking-[0.5em] text-blue-400 mb-6 uppercase opacity-60">
                                        {t('বাৎসরিক প্রদেয় আয়কর', 'TOTAL ANNUAL TAX')}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mb-10 overflow-hidden">
                                        <span className="text-xl font-bold text-emerald-500/40 italic">৳</span>
                                        <div className="text-4xl md:text-6xl font-black tracking-tighter result-text-neon truncate max-w-full px-2">
                                            {result?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US') || '০'}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
                                        <div className="min-w-0 flex flex-col items-center">
                                            <div className="text-[8px] font-black opacity-30 uppercase tracking-widest mb-2 truncate max-w-full px-2">{t('মাসিক কিস্তি', 'Monthly Slab')}</div>
                                            <div className="text-xl md:text-2xl font-black text-emerald-400 tracking-tighter truncate max-w-full px-2 result-text-neon">
                                                ৳{Math.round(result / 12 || 0).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex flex-col items-center">
                                            <div className="text-[8px] font-black opacity-30 uppercase tracking-widest mb-2 truncate max-w-full px-2">{t('ট্যাক্স হার', 'Margin Rate')}</div>
                                            <div className="text-xl md:text-2xl font-black text-white tracking-widest result-text-white">5-25%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-10">
                                    <ShieldCheck size={10} />
                                    <span className="text-[7px] font-bold tracking-[0.4em]">OFFICIAL ALGORITHM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-8 md:p-12 rounded-[2.5rem] bg-emerald-600 text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left min-w-0">
                            <h3 className="text-xl md:text-3xl font-black tracking-tighter truncate">{t('ট্যাক্স পরামর্শ প্রয়োজন?', 'Need Solutions?')}</h3>
                            <p className="text-emerald-50 text-sm md:text-base font-medium opacity-80">{t('বিশেষজ্ঞদের সহযোগিতা নিন।', 'Consult our panel today.')}</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-emerald-600 font-black rounded-2xl hover:bg-slate-50 transition-all text-[10px] uppercase tracking-widest shadow-lg shrink-0 flex items-center gap-2">
                            {t('বুক করুন', 'BOOK NOW')}
                            <ArrowRightCircle size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB - SEO POWERHOUSE */}
            <div className="mt-20 space-y-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-lg">
                        <Zap size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {type === 'age' ? t('বয়স গাইড', 'AGE HUB') : t('ট্যাক্স গাইড', 'TAX HUB')}
                        </span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic underline decoration-emerald-500 decoration-4 underline-offset-8">
                                {type === 'age'
                                    ? t('বয়স হিসাব করার সঠিক ও দ্রুত পদ্ধতি', 'Official Professional Age Analytics in BD')
                                    : t('আয়কর বা ইনকাম ট্যাক্স ২০২৪-২৫ হিসাব করার নিয়ম', 'Advanced Income Tax Strategy 2024-25')
                                }
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-[1.8]">
                                {type === 'age'
                                    ? t('বাংলাদেশের সরকারি চাকরি, পাসপোর্ট বা এনআইডি আবেদনের জন্য নিখুঁত বয়স জানা জরুরি। অনেক সময় আমরা বছর বা মাস মনে রাখলেও দিন হিসাব করতে ভুল করি। আমাদের অটোমেটেড অ্যালগরিদম লিপ ইয়ার (Leap Year) এবং মাসের দিনের পার্থক্য মাথায় রেখে সেকেন্ডের মধ্যে আপনার সঠিক বয়স বের করে দেয়।', 'Calculating exact age is critical for NID registration, passport applications, and civil service recruitment in Bangladesh. While tracking years is simple, computing exact months and days requires specialized algorithms. Our engine accounts for leap years and varying month lengths to deliver verified results instantly.')
                                    : t('২০২৪-২৫ অর্থবছরের নতুন বাজেট অনুযায়ী আয়কর হিসাব করা বেশ জটিল। ৩.৫ লক্ষ টাকা পর্যন্ত করমুক্ত সীমা থেকে শুরু করে উচ্চবিত্তদের জন্য ২৫% পর্যন্ত ট্যাক্স স্ল্যাব রয়েছে। আমাদের ট্যাক্স ক্যালকুলেটরটি সর্বশেষ গেজেট অনুযায়ী ডিজাইন করা হয়েছে, যা আপনাকে স্যালারি থেকে প্রদেয় ট্যাক্সের নির্ভুল ধারণা দেবে।', 'Income tax compliance for the 2024-25 fiscal year involves complex multi-slab calculations. Starting from the 3.5 Lakh tax-free threshold to high-earner 25% brackets, manual tracking often leads to errors. Our precision-engineered hub integrates the latest NBR regulations to ensure your salary projections are audit-ready.')
                                }
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 group">
                                <ShieldCheck className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{type === 'age' ? t('এনআইডি ভেরিফাইড', 'NID Verification Ready') : t('স্ল্যাব ভিত্তিক হিসাব', 'Slab-Based Precision')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {type === 'age'
                                        ? t('নির্বাচন কমিশনের ভোটার তালিকা বা পাসপোর্টের জন্য এই হিসাবটি স্ট্যান্ডার্ড হিসেবে ব্যবহৃত হয়।', 'Our outputs align with the standard protocols used by the EC and Passport authorities for date validation.')
                                        : t('৫%, ১০%, ১৫% থেকে শুরু করে ২৫% পর্যন্ত স্ল্যাবগুলোর প্রগতিশীল হিসাব আমাদের সিস্টেমে অটোমেটেড।', 'Our algorithmic engine automates the progression across 5%, 10%, 15%, and 25% slabs seamlessly.')}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 group">
                                <RotateCcw className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{type === 'age' ? t('পরবর্তী জন্মদিন', 'Birthday Tracking') : t('করমুক্ত সীমা', 'Zero-Tax Threshold')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {type === 'age'
                                        ? t('আপনার পরবর্তী জন্মদিন আসতে কত দিন বাকি তাও এই টুলের মাধ্যমে জেনে নিতে পারেন।', 'Instantly track the remaining days until your next anniversary or professional milestone.')
                                        : t('পুরুষদের জন্য ৩.৫ লক্ষ এবং মহিলাদের জন্য ৪ লক্ষ টাকা পর্যন্ত বাৎসরিক আয় সম্পূর্ণ করমুক্ত।', 'Enjoy 3.5 Lakh exemption for general male taxpayers and 4 Lakh for female/senior citizens annually.')}
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)', 'Frequently Asked Questions')}</h2>
                            <div className="space-y-4">
                                {(type === 'age' ? [
                                    { q: t('অফিসিয়াল কাজের জন্য কোন ক্যালকুলেটর সঠিক?', 'Which calculator is official?'), a: t('অধিকাংশ ক্ষেত্রে জন্মদিন থেকে আজকের তারিখ বিয়োগ করার সাধারণ সূত্রই কাজ করে, যা আমাদের সাইট অনুসরণ করে।', 'Standard subtraction models from current system time are universally accepted for official BD applications.') },
                                    { q: t('লিপ ইয়ার বা ৩০-৩১ দিনের মাস কীভাবে হিসাব হয়?', 'How are leap years handled?'), a: t('আমাদের কোড প্রতিটি মাস এবং বছরের ডেটা চেক করে গাণিতিকভাবে সঠিক দিন বের করে।', 'Our backend validates chronological data point-by-point, adjusting for Gregorian calendar variability.') }
                                ] : [
                                    { q: t('টিন (TIN) সার্টিফিকেট থাকলে কি ট্যাক্স দিতেই হবে?', 'Is TIN mandatory for tax payment?'), a: t('টিন থাকা মানেই ট্যাক্স দেওয়া নয়, তবে বার্ষিক রিটার্ন সাবমিট করা বাধ্যতামূলক যদি আয় করমুক্ত সীমার ওপরে হয়।', 'Having a TIN mandates return filing, but zero-tax returns are standard if income is below the statutory threshold.') },
                                    { q: t('ট্যাক্স রিবেট বা ছাড় কীভাবে পাওয়া যায়?', 'How to get tax rebates?'), a: t('ডিপিএস, সঞ্চয়পত্র বা সরকারি ফান্ডে ইনভেস্টমেন্ট থাকলে আপনি ট্যাক্সে ছাড় পেতে পারেন।', 'Strategic investments in DPS, Sanchaypatra, or recognized insurance funds qualify for significant rebates.') }
                                ]).map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100">
                                        <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">{item.q}</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                            <h3 className="text-xl font-black mb-6 italic">{t('অফিসিয়াল স্ট্যান্ডার্ড', 'Official Metric')}</h3>
                            <div className="space-y-6">
                                {[
                                    type === 'age' ? t('১. সঠিক জন্ম তারিখ নির্বাচন করুন।', '1. Select accurate birth date.') : t('১. মাসিক মোট বেতন ইনপুট দিন।', '1. Input gross monthly revenue.'),
                                    type === 'age' ? t('২. আজকের তারিখ সিস্টেম থেকে নেওয়া হয়।', '2. System auto-sets today\'s date.') : t('২. অটোমেটেড স্ল্যাব চেক করা হয়।', '2. Engine auto-checks tax slabs.'),
                                    type === 'age' ? t('৩. নির্ভুল বছর, মাস ও দিন দেখুন।', '3. View verified Y/M/D metrics.') : t('৩. বাৎসরিক ট্যাক্স সামারি দেখুন।', '3. View annual liability summary.'),
                                    type === 'age' ? t('৪. সরকারি কাজে ব্যবহারযোগ্য।', '4. Valid for official procedures.') : t('৪. এনবিআর গাইডলাইন সমর্থিত।', '4. NBR guidelines compliant.')
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</div>
                                        <p className="text-[11px] font-bold text-emerald-100 leading-relaxed uppercase tracking-wider">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 text-center">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4">{t('প্রিমিয়াম সাপোর্ট', 'EXPERT ADVICE')}</h4>
                            <p className="text-[10px] font-bold text-emerald-800 leading-relaxed uppercase tracking-tight">
                                {type === 'age'
                                    ? t('পাসপোর্টে নামের ভুল থাকলে আইনি সাহায্য নিন।', 'For discrepancies in DOB, consult legal aid immediately.')
                                    : t('ট্যাক্স রিটার্ন সাবমিশনে ভুলের জন্য জরিমানা হতে পারে।', 'Inaccurate filing can lead to penalties from the NBR.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

const Tooltip = ({ hint }) => (
    <div className="group/hint relative shrink-0">
        <HelpCircle size={14} className="text-slate-300 cursor-help hover:text-emerald-500 transition-all opacity-40 hover:opacity-100" />
        <div className="absolute bottom-full right-0 mb-4 w-48 p-4 bg-slate-900 text-white text-[9px] font-bold rounded-2xl opacity-0 translate-y-3 group-hover/hint:opacity-100 group-hover/hint:translate-y-0 transition-all z-50 pointer-events-none shadow-xl border border-white/10 uppercase tracking-wider text-center">
            {hint}
        </div>
    </div>
);

export default UtilityPage;
