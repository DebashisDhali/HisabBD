import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { calculateDPS, calculateFDR, calculateEMI } from '../calculators/finance';
import { Calculator, AlertTriangle, Banknote, Calendar, Percent, Car, Wallet, HelpCircle, CheckCircle2, RotateCcw, Fingerprint, Target, Zap, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const FinancePage = ({ type }) => {
    const { lang, t } = useLanguage();
    const initialInputs = {
        amount: '',
        rate: '',
        years: '',
        isIslamic: false
    };

    const [inputs, setInputs] = useState(initialInputs);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (type === 'dps') setResult(calculateDPS(inputs.amount, inputs.rate, inputs.years));
        else if (type === 'fdr') setResult(calculateFDR(inputs.amount, inputs.rate, inputs.years, inputs.isIslamic));
        else if (type === 'emi') setResult(calculateEMI(inputs.amount, inputs.rate, inputs.years));
    }, [inputs, type]);

    const handleReset = () => setInputs(initialInputs);

    const config = {
        dps: {
            title: t('ডিপিএস প্রফিট ক্যালকুলেটর (বাংলাদেশ)', 'Official BD DPS Hub'),
            desc: t('আপনার সঞ্চয় শেষে কত টাকা পাবেন তা জানুন।', 'Plan your wealth growth with institutional precision.'),
            label: t('মাসিক জমা', 'Monthly Deposit'),
            hint: t('প্রতি মাসে জমার পরিমাণ।', 'The exact liquid amount you save per month.'),
            icon: <Banknote className="text-emerald-500" />
        },
        fdr: {
            title: t('এফডিআর লাভ ক্যালকুলেটর', 'Official FDR Yield Tool'),
            desc: t('ফিক্সড ডিপোজিটের মোট মুনাফা হিসেব করুন।', 'Calculate banking yields for Fixed Deposits.'),
            label: t('এককালীন জমা', 'Principal Capital'),
            hint: t('একবারে ব্যাংকে জমার পরিমাণ।', 'The initial lump sum deposit.'),
            icon: <Wallet className="text-emerald-500" />
        },
        emi: {
            title: t('ইএমআই লোন ক্যালকুলেটর', 'Pro Loan EMI Architect'),
            desc: t('আপনার লোনের মাসিক কিস্তি হিসাব করুন।', 'Architect your debt repayment cycles with clarity.'),
            label: t('মোট ঋণ', 'Total Loan'),
            hint: t('ব্যাংক থেকে নেওয়া ঋণের মোট আসল অংক।', 'The total gross principal borrowed.'),
            icon: <Car className="text-emerald-500" />
        }
    };

    const current = config[type];

    const seoConfigs = {
        dps: {
            title: t('ডিপিএস প্রফিট ক্যালকুলেটর ২০২৬ - বিডি ব্যাংকিং', 'DPS Profit Calculator 2026 - Official BD Savings Hub'),
            desc: t('আপনার ডিপিএস শেষে কত টাকা পাবেন তা জানুন। বার্ষিক চক্রবৃদ্ধি মুনাফার নির্ভুল হিসাব। সকল ব্যাংকের জন্য প্রযোজ্য।', 'Calculate your DPS maturity value with compounded profits. Accurate savings tracker for all Bangladeshi banks.'),
            keywords: 'dps calculator bd, dps profit calculator, dps maturity calculator, bank savings bd, calculate dps profit online',
            canonical: '/dps-calculator-bangladesh'
        },
        fdr: {
            title: t('এফডিআর লাভ ক্যালকুলেটর - ফিক্সড ডিপোজিট রেট', 'FDR Yield Calculator - Fixed Deposit Market Rate'),
            desc: t('ফিক্সড ডিপোজিটের মোট মুনাফা ও মেয়াদ শেষে প্রাপ্তি হিসাব করুন। ভ্যাট ও ট্যাক্স পরবর্তী নির্ভুল হিসাব।', 'Calculate FDR profit and maturity returns for all BD banks. Supports both General and Islamic banking models.'),
            keywords: 'fdr calculator bd, fixed deposit calculator, fdr profit calculator, bank deposit calculator, calculate fdr returns',
            canonical: '/fdr-calculator-bangladesh'
        },
        emi: {
            title: t('ইএমআই লোন ক্যালকুলেটর - হোম ও কার লোন কিস্তি', 'EMI Loan Calculator - Home & Car Loan Installment Hub'),
            desc: t('আপনার লোনের মাসিক কিস্তি (EMI) দ্রুত হিসাব করুন। ব্যাংক ও এনবিএফআই এর নির্ভুল রি-পেমেন্ট ক্যালকুলেটর।', 'Professional EMI calculator for home, car, and personal loans in Bangladesh. Get accurate monthly installment breakdowns.'),
            keywords: 'emi calculator bd, loan calculator bangladesh, car loan emi, home loan emi, calculate monthly installment',
            canonical: '/emi-calculator-bangladesh'
        }
    };

    const currentSeo = seoConfigs[type] || seoConfigs.dps;

    const relatedCalculators = [
        { name: t('যাকাত ক্যালকুলেটর', 'Zakat Hub'), path: '/zakat-calculator-bangladesh', icon: <Target size={14} /> },
        { name: t('আয়কর ক্যালকুলেটর', 'Salary Tax'), path: '/salary-tax-calculator-bangladesh', icon: <Zap size={14} /> },
        { name: t('স্বর্ণের দাম', 'Gold Price'), path: '/gold-price-calculator-bangladesh', icon: <Settings size={14} /> },
    ];

    return (
        <CalculatorLayout
            title={currentSeo.title}
            description={currentSeo.desc}
            keywords={currentSeo.keywords}
            canonical={currentSeo.canonical}
            relatedTools={relatedCalculators}
        >
            <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {/* INPUT ZONE */}
                    <div className="input-zone-container !p-6 md:!p-10 space-y-12">
                        <div className="flex justify-between items-center mb-6 px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                {t('তথ্য প্রদান', 'STEP 1: CONFIG')}
                            </span>
                            <div className="h-px flex-grow mx-4 bg-slate-200/50"></div>
                            <Fingerprint size={14} className="text-slate-300" />
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                        <Calculator size={24} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tighter truncate">{t('প্যারামিটারস', 'Parameters')}</h3>
                                </div>
                                <button
                                    onClick={handleReset}
                                    className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 border border-slate-100 transition-all shrink-0"
                                    title={t('পুনরায় শুরু করুন', 'Reset')}
                                >
                                    <RotateCcw size={18} />
                                </button>
                            </div>

                            <div className="space-y-8">
                                <InputField
                                    label={current.label}
                                    value={inputs.amount}
                                    onChange={(v) => setInputs({ ...inputs, amount: v })}
                                    icon={current.icon}
                                    hint={current.hint}
                                />

                                <InputField
                                    label={t('বার্ষিক সুদের হার (%)', 'Annual Rate (%)')}
                                    value={inputs.rate}
                                    onChange={(v) => setInputs({ ...inputs, rate: v })}
                                    icon={<Percent className="text-emerald-500" />}
                                    hint={t('ব্যাংক কর্তৃক নির্ধারিত হার।', 'The official compounded annual rate.')}
                                    isPercent
                                />

                                <InputField
                                    label={t('সময়কাল (বছর)', 'Tenure (Years)')}
                                    value={inputs.years}
                                    onChange={(v) => setInputs({ ...inputs, years: v })}
                                    icon={<Calendar className="text-emerald-500" />}
                                    hint={t('স্কিমের সময়কাল।', 'The total lifecycle of the instrument.')}
                                    isYear
                                />
                            </div>

                            {type === 'fdr' && (
                                <div className="p-1 rounded-2xl bg-slate-50 border border-slate-100 transition-all">
                                    <label className="flex items-center gap-4 p-4 cursor-pointer group/label">
                                        <input
                                            type="checkbox"
                                            checked={inputs.isIslamic}
                                            onChange={(e) => setInputs({ ...inputs, isIslamic: e.target.checked })}
                                            className="w-10 h-10 accent-emerald-600 rounded-xl cursor-pointer shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <div className="text-lg font-black text-slate-950 truncate">{t('ইসলামিক ব্যাংকিং', 'Islamic Shariah')}</div>
                                            <div className="text-[8px] uppercase font-black text-emerald-600/40 tracking-widest truncate">Profit-Loss Model</div>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 flex gap-4">
                            <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                            <p className="text-[9px] font-black text-amber-800 uppercase tracking-widest leading-relaxed">
                                {t('সতর্কতা: এটি একটি প্রজেকশন। ব্যাংক ভেদে সুদের হার ভিন্ন হতে পারে।', 'LEGAL DISCLAIMER: BUSINESS APPROXIMATION. RATES MAY VARY.')}
                            </p>
                        </div>
                    </div>

                    {/* RESULT ZONE */}
                    <div className="result-zone-container relative !p-8 md:!p-12 min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
                            <span className="text-[10px] font-black text-blue-500/30 uppercase tracking-[0.4em]">{t('হিসাবের ফলাফল', 'STEP 2: OUTPUT')}</span>
                        </div>

                        <div className="w-full pt-10 overflow-hidden text-center">
                            <div className="flex items-center justify-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                                <CheckCircle2 size={14} />
                                {t('ফলাফল সামারি', 'FISCAL PROJECTION')}
                            </div>

                            <div className="space-y-8 w-full max-w-full">
                                {type === 'emi' ? (
                                    <>
                                        <ResultBlock label={t('মাসিক কিস্তি (EMI)', 'MONTHLY EMI DUE')} val={`৳${result?.emi?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}`} highlight />
                                        <div className="grid grid-cols-2 gap-4">
                                            <ResultBlock label={t('মোট সুদ', 'Interest')} val={`৳${result?.totalInterest?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}`} small />
                                            <ResultBlock label={t('সর্বমোট', 'Total')} val={`৳${result?.totalPayment?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}`} small />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <ResultBlock label={t('মেয়াদান্তে প্রাপ্তি', 'MATURITY VALUE')} val={`৳${result?.maturity?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}`} highlight />
                                        <div className="grid grid-cols-2 gap-4">
                                            <ResultBlock label={t('মোট জমা', 'Invested')} val={`৳${(inputs.amount * (inputs.years * (type === 'dps' ? 12 : 1))).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}`} small />
                                            <ResultBlock label={t('মুনাফা', 'Profit')} val={`৳${result?.profit?.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}`} small color="text-emerald-400" />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between opacity-40">
                                <span className="text-[8px] font-black uppercase tracking-widest">{t('কারেন্সি', 'CURRENCY')}</span>
                                <span className="text-[10px] font-black text-emerald-400 uppercase">BDT (৳)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB - SEO POWERHOUSE */}
            <div className="mt-20 space-y-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-emerald-600 text-white rounded-xl shadow-lg">
                        <Calculator size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {type === 'dps' ? t('ডিপিএস গাইড', 'DPS HUB') : type === 'fdr' ? t('এফডিআর গাইড', 'FDR HUB') : t('লোন গাইড', 'EMI HUB')}
                        </span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic underline decoration-emerald-500 decoration-4 underline-offset-8">
                                {type === 'dps'
                                    ? t('ডিপিএস বা সঞ্চয় প্রকল্পের মেয়াদ শেষে প্রাপ্তি হিসাব', 'Maximize Your Savings with DPS Calculation')
                                    : type === 'fdr'
                                        ? t('এফডিআর বা ফিক্সড ডিপোজিট মুনাফার হিসাব', 'Mastering FDR Profits & Banking Yields')
                                        : t('লোন বা ঋণের কিস্তি (EMI) হিসাব করার নিয়ম', 'Strategic Loan Management & EMI Analysis')
                                }
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-[1.8]">
                                {type === 'dps'
                                    ? t('ডিপিএস (Deposit Pension Scheme) হলো বাংলাদেশের মানুষের জনপ্রিয় সঞ্চয় মাধ্যম। প্রতি মাসে নির্দিষ্ট পরিমাণ টাকা সঞ্চয় করে দীর্ঘমেয়াদে বড় অংকের মূলধন গঠন করা সম্ভব। আমাদের ক্যালকুলেটরটি চক্রবৃদ্ধি হারে (Compounding) আপনার মুনাফা হিসাব করে সঠিক রিফান্ড ভ্যালু বের করতে সাহায্য করে।', 'DPS is a cornerstone of personal financial planning in Bangladesh. By committing to monthly contributions, savers can build substantial long-term capital. Our engine utilizes precise compounding algorithms to project your maturity value across various institutional rate benchmarks.')
                                    : type === 'fdr'
                                        ? t('ফিক্সড ডিপোজিট বা এফডিআর হলো ঝূঁকিমুক্ত ইনভেস্টমেন্টের সেরা উপায়। ব্যাংকে এককালীন টাকা জমা রেখে আপনি মাসভিত্তিক বা মেয়াদ শেষে মুনাফা তুলতে পারেন। ইনকাম ট্যাক্স বা ভ্যাট বাদ দিয়ে হাতে কত টাকা আসবে তা আমাদের টুলের মাধ্যমে দ্রুত জেনে নিন।', 'Fixed Deposits offer a secure path for capital preservation and stable returns. Whether you seek monthly payouts or maturity-end lump sums, calculating the exact yield after tax/VAT deductions is essential. Our tool provides a comprehensive net-profit breakdown.')
                                        : t('লোন নেওয়ার আগে মাসিক কিস্তি বা ইএমআই (Equated Monthly Installment) জানা অত্যন্ত জরুরি। এটি আপনার মাসিক বাজেটের ওপর লোনের প্রভাব বুঝতে সাহায্য করে। হোম লোন, কার লোন বা পার্সোনাল লোন— সব ক্ষেত্রেই আমাদের ক্যালকুলেটরটি আপনাকে ঋণ পরিশোধের সঠিক রোডম্যাপ দেবে।', 'Understanding your Equated Monthly Installment (EMI) is fundamental to debt management. It allows borrowers to assess the impact of a loan on their monthly cash flow. Whether it is a home, car, or personal loan, our architect provides a clear repayment roadmap.')
                                }
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 group">
                                <Percent className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('সুদ বনাম মুনাফা', 'Interest vs Profit')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('জেনারেল ব্যাংকিংয়ে এটি সুদ (Interest) হিসেবে গণ্য হয়, তবে ইসলামিক ব্যাংকিং মডেলে এটি মুনাফা বা লাভ হিসেবে বন্টন করা হয়।', 'General banking operates on interest models, whereas Islamic Shariah-compliant banking utilizes profit-loss sharing structures.')}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 group">
                                <Wallet className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('ট্যাক্স ও ভ্যাট', 'Tax & Deductions')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('মুনাফার ওপর টিন (TIN) থাকলে ১০% এবং না থাকলে ১৫% সোর্স ট্যাক্স কাটা হয়। হিসাব করার সময় এটি মাথায় রাখা জরুরি।', 'Profits are subject to Source Tax—10% with a valid TIN and 15% without. Factor these deductions for an accurate net-value projection.')}
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)', 'Frequently Asked Questions')}</h2>
                            <div className="space-y-4">
                                {(type === 'dps' ? [
                                    { q: t('ডিপিএস কি মাঝপথে বন্ধ করা যায়?', 'Can I close DPS mid-tenure?'), a: t('হ্যাঁ, তবে সেক্ষেত্রে ব্যাংক সাধারণত সেভিংস একাউন্টের হারে মুনাফা দেয়।', 'Yes, but banks usually penalize the rate and revert to standard savings interest.') },
                                    { q: t('চক্রবৃদ্ধি মুনাফা কীভাবে কাজ করে?', 'How does compounding work?'), a: t('আপনার জমানো টাকার ওপর অর্জিত মুনাফা যখন আসলের সাথে যোগ হয়ে আবার নতুন মুনাফা তৈরি করে, তাকে চক্রবৃদ্ধি বলে।', 'Compounding reinvests your earned profits back into the principal, accelerating wealth growth exponentially.') }
                                ] : type === 'fdr' ? [
                                    { q: t('এফডিআর এর সর্বনিম্ন মেয়াদ কত?', 'What is the minimum FDR tenure?'), a: t('সাধারণত ৩ মাস থেকে শুরু করে এফডিআর করা যায়।', 'Standard Fixed Deposits commonly start from a 3-month tenure minimum.') },
                                    { q: t('এককালীন জমার সুবিধা কী?', 'Benefits of lump sum deposit?'), a: t('এটি অলস টাকা কাজে লাগানোর সেরা উপায় এবং সঞ্চয়ী হিসাবের চেয়ে অনেক বেশি লাভ দেয়।', 'It is the most efficient way to utilize idle capital, offering significantly higher returns than standard savings accounts.') }
                                ] : [
                                    { q: t('অফ-পেমেন্ট বা ডাউন পেমেন্ট ইএমআই-তে কী প্রভাব ফেলে?', 'Impact of Down Payments?'), a: t('ডাউন পেমেন্ট বেশি দিলে প্রিলিপাল কমে যায়, ফলে মাসিক কিস্তি বা ইএমআই কম হয়।', 'Higher down payments reduce the principal amount, leading to lower monthly installments and total interest costs.') },
                                    { q: t('রি-পেমেন্ট মেথড কী?', 'What are Repayment Methods?'), a: t('র রিডিউসিং ব্যালেন্স মেথডে লোন শোর করার সাথে সাথে সুদের অংক কমতে থাকে।', 'The Reducing Balance Method ensures interest is only calculated on the remaining principal, saving you money over time.') }
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
                            <h3 className="text-xl font-black mb-6 italic">{t('ক্যালকুলেশন মেথড', 'Formula Logic')}</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t('ব্যবহৃত সূত্র', 'STANDARD FORMULA')}</span>
                                    <p className="mt-2 text-xs font-mono text-slate-300">
                                        {type === 'emi' ? 'E = P × r × (1+r)^n / ((1+r)^n - 1)' : 'A = P(1 + r/n)^nt'}
                                    </p>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                                    {t('আমাদের ক্যালকুলেটর আন্তর্জাতিক ব্যাংকিং স্ট্যান্ডার্ড (Standardized Compound Formula) অনুসরণ করে।', 'Our engine utilizes globally standardized compounding and amortization logic.')}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 text-center">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-4">{t('গুরুত্বপূর্ণ নোটিশ', 'OFFICIAL NOTICE')}</h4>
                            <p className="text-[10px] font-bold text-emerald-800 leading-relaxed uppercase tracking-tight">
                                {t('বাজার পরিবর্তনশীল। সঠিক রেট জানতে আপনার ব্যাংকের সাথে যোগাযোগ করুন।', 'Market rates are subject to change. Always verify current offerings with your banking partner.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

const InputField = ({ label, value, onChange, icon, hint, isPercent, isYear }) => {
    const inputRef = useRef(null);
    const { t } = useLanguage();

    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group/field">
            <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-emerald-600 transition-colors">
                    {React.cloneElement(icon, { size: 14, className: 'shrink-0' })}
                    <span className="truncate">{label}</span>
                </label>
                <div className="group/hint relative shrink-0">
                    <HelpCircle size={14} className="text-slate-300 cursor-help hover:text-emerald-500 transition-all opacity-40" />
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
                    className="w-full h-12 bg-slate-50/50 border border-slate-100 rounded-lg px-6 text-lg font-black text-slate-900 focus:bg-white focus:border-emerald-500 outline-none transition-all pr-12"
                    placeholder="0"
                />
                <span className="absolute right-4 font-black text-slate-300 text-xs uppercase opacity-40 pointer-events-none">
                    {isPercent ? '%' : isYear ? 'YRS' : 'BDT'}
                </span>
            </div>
        </div>
    );
};

const ResultBlock = ({ label, val, highlight, small, color }) => (
    <div className={`p-6 rounded-2xl transition-all duration-500 min-w-0 w-full overflow-hidden ${highlight ? 'bg-white/10 border border-white/10 ring-4 ring-white/5' : 'bg-white/5 border border-white/5'}`}>
        <div className={`text-[10px] font-black tracking-widest uppercase mb-2 truncate ${highlight ? 'text-emerald-400' : 'opacity-30'}`}>{label}</div>
        <div
            key={val}
            className={`font-black tracking-tighter truncate max-w-full px-2 ${highlight ? 'text-4xl md:text-5xl result-text-neon' : color || 'text-xl md:text-2xl result-text-white'}`}
        >
            {val}
        </div>
    </div>
);

export default FinancePage;
