import React, { useState, useEffect } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { admissionSystems, calculateAdmissionMarks } from '../calculators/admission';
import { GraduationCap, Award, Target, AlertCircle, CheckCircle2, RotateCcw, Fingerprint, ArrowRight, ShieldAlert, Sparkles, Building2, Beaker, HardHat, School, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdmissionPage = () => {
    const { lang, t } = useLanguage();
    const [sscGpa, setSscGpa] = useState('');
    const [hscGpa, setHscGpa] = useState('');
    const [selectedSystem, setSelectedSystem] = useState('medical');
    const [options, setOptions] = useState({ isSecondTimer: false, isPrevAdmitted: false });
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (sscGpa && hscGpa) {
            const data = calculateAdmissionMarks(sscGpa, hscGpa, selectedSystem, options);
            setResult(data);
        } else {
            setResult(null);
        }
    }, [sscGpa, hscGpa, selectedSystem, options]);

    const handleReset = () => {
        setSscGpa('');
        setHscGpa('');
        setOptions({ isSecondTimer: false, isPrevAdmitted: false });
        setResult(null);
    };

    const groups = {
        'Medical': { icon: <ShieldAlert size={14} />, color: 'emerald' },
        'General': { icon: <School size={14} />, color: 'blue' },
        'Engineering': { icon: <HardHat size={14} />, color: 'amber' }
    };

    const seoTitle = t('ভর্তি জিপিএ ক্যালকুলেটর - মেডিকেল ও ভার্সিটি', 'Admission GPA Marks Calculator - Medical, DU, JU, CKRUET');
    const seoDescription = t('মেডিকেল ও বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার জিপিএ মার্কস হিসেব করুন। মেডিকেল, ডিইউ, জেইউ, জাস্ট ক্লাস্টার ও ইঞ্জিনিয়ারিং ভার্সিটির সঠিক হিসাব।', 'Calculate GPA merit marks for Medical, DU, JU, CU, RU, GST Cluster and Engineering admissions in Bangladesh. Most accurate and updated scoring matrix.');
    const seoKeywords = t('ভর্তি জিপিএ ক্যালকুলেটর, মেডিকেল ভর্তি জিপিএ হিসাব, ডিইউ ভর্তি জিপিএ, admission gpa calculator bd, medical admission gpa marks calculation, du gpa marks calculator', 'admission gpa calculator, medical admission gpa marks calculation, du gpa calculation, engineering admission eligibility bd');

    return (
        <CalculatorLayout
            title={seoTitle}
            description={seoDescription}
            keywords={seoKeywords}
            canonical="/admission-gpa-marks-calculator"
        >
            <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="input-zone-container !p-6 md:!p-10 mb-8">
                    <div className="flex justify-between items-center mb-8 px-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                            {t('সিস্টেম নির্বাচন', 'SYSTEM SELECTION')}
                        </span>
                        <Fingerprint size={14} className="text-slate-300" />
                    </div>

                    <div className="space-y-10">
                        {/* Grouped University Selection */}
                        <div className="space-y-8">
                            {Object.keys(groups).map((groupName) => (
                                <div key={groupName} className="space-y-3">
                                    <div className="flex items-center gap-3 px-2">
                                        <div className={`w-1 h-3 rounded-full bg-${groups[groupName].color}-500`}></div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{groupName} Hub</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {Object.entries(admissionSystems)
                                            .filter(([_, sys]) => sys.group === groupName)
                                            .map(([key, sys]) => (
                                                <button
                                                    key={key}
                                                    onClick={() => setSelectedSystem(key)}
                                                    className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 relative overflow-hidden group ${selectedSystem === key
                                                        ? `border-${groups[groupName].color}-500 bg-${groups[groupName].color}-50 shadow-lg`
                                                        : 'border-slate-100 bg-white hover:border-slate-200'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        {React.cloneElement(groups[groupName].icon, {
                                                            className: selectedSystem === key ? `text-${groups[groupName].color}-600` : 'text-slate-300'
                                                        })}
                                                        {selectedSystem === key && <CheckCircle2 size={12} className={`text-${groups[groupName].color}-500`} />}
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-tight leading-tight ${selectedSystem === key ? `text-${groups[groupName].color}-700` : 'text-slate-900'}`}>{sys.name}</span>
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* GPA Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">{t('এসএসসি জিপিএ', 'SSC GPA (Out of 5.0)')}</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={sscGpa}
                                        onChange={(e) => setSscGpa(e.target.value)}
                                        className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-2xl font-black text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="5.00"
                                    />
                                    <Award size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">{t('এইচএসসি জিপিএ', 'HSC GPA (Out of 5.0)')}</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={hscGpa}
                                        onChange={(e) => setHscGpa(e.target.value)}
                                        className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 text-2xl font-black text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="5.00"
                                    />
                                    <GraduationCap size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Special Options */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setOptions(prev => ({ ...prev, isSecondTimer: !prev.isSecondTimer }))}
                                className={`flex items-center gap-3 px-6 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${options.isSecondTimer
                                    ? 'bg-amber-500 border-amber-500 text-white shadow-lg'
                                    : 'bg-white border-slate-100 text-slate-500 hover:border-amber-200'
                                    }`}
                            >
                                <RotateCcw size={16} />
                                {t('আমি সেকেন্ড টাইমার', 'Second Timer')}
                            </button>
                            {selectedSystem === 'medical' && (
                                <button
                                    onClick={() => setOptions(prev => ({ ...prev, isPrevAdmitted: !prev.isPrevAdmitted }))}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${options.isPrevAdmitted
                                        ? 'bg-red-500 border-red-500 text-white shadow-lg'
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-red-200'
                                        }`}
                                >
                                    <ShieldAlert size={16} />
                                    {t('মেডিকেলে ভর্তি আছি', 'Already Admitted')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RESULT HUB */}
                <div className="result-zone-container !p-8 md:!p-12 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-10 right-10 flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-500/30">
                        <Target size={10} className="text-blue-400 animate-pulse" />
                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">{t('লাইভ এনালাইসিস', 'LIVE SCORE ENGINE')}</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Beaker size={40} className="text-white/20 animate-bounce" />
                                </div>
                                <h3 className="text-xl font-bold text-white/40">{t('জিপিএ ইনপুট দিন', 'Input GPA to see breakdown')}</h3>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={selectedSystem + result.finalGpaScore}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full space-y-12"
                            >
                                <div className="text-center">
                                    <div className="text-[10px] font-black text-white uppercase tracking-[0.5em] mb-4 opacity-80">{t('আপনার অর্জিত জিপিএ মার্কস', 'GPA MERIT CONTRIBUTION')}</div>
                                    <div className="flex items-center justify-center gap-4">
                                        <Sparkles size={32} className="text-amber-400 text-glow-amber-400" />
                                        <div className="text-7xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl truncate" style={{ fontSize: 'clamp(4rem, 15vw, 9rem)', lineHeight: '1' }}>
                                            {result.finalGpaScore}
                                        </div>
                                    </div>
                                    <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-6">
                                        {result.isEngineering ? t('এই বিশ্ববিদ্যালয়ে মেরিট লিস্ট শুধু পরীক্ষার নাম্বারের ওপর ভিত্তি করে হয়।', 'MERIT IS PURELY BASED ON ADMISSION TEST FOR THIS SYSTEM.') : t(`মোট ${result.max} মার্কস এর মধ্যে`, `Out of ${result.max} Reference scale`)}
                                    </div>
                                </div>

                                {!result.isEngineering && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Marks Earned */}
                                        <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center text-center">
                                            <CheckCircle2 size={24} className="text-emerald-400 mb-3" />
                                            <div className="text-2xl font-black text-emerald-400 mb-1">{result.earned}</div>
                                            <div className="text-[8px] font-bold text-emerald-500/60 uppercase tracking-widest">{t('অর্জিত নম্বর', 'Points Earned')}</div>
                                        </div>

                                        {/* Marks Lost */}
                                        <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 flex flex-col items-center text-center">
                                            <AlertCircle size={24} className="text-red-400 mb-3" />
                                            <div className="text-2xl font-black text-red-400 mb-1">-{result.lost}</div>
                                            <div className="text-[8px] font-bold text-red-500/60 uppercase tracking-widest">{t('হারানো নম্বর', 'GPA Deficit')}</div>
                                        </div>

                                        {/* Deduction */}
                                        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center text-center">
                                            <ShieldAlert size={24} className="text-amber-400 mb-3" />
                                            <div className="text-2xl font-black text-amber-400 mb-1">-{result.deduction}</div>
                                            <div className="text-[8px] font-bold text-amber-500/60 uppercase tracking-widest">{t('পেনাল্টি মার্কস', 'Penalty Deducted')}</div>
                                        </div>
                                    </div>
                                )}

                                {result.isEngineering && (
                                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 text-center">
                                        <HardHat size={32} className="text-amber-400 mx-auto mb-4" />
                                        <p className="text-white/60 text-sm font-bold leading-relaxed max-w-lg mx-auto italic">
                                            {t('বুয়েট ও অন্যান্য ইঞ্জিনিয়ারিং ভার্সিটিতে জিপিএ মার্কস যোগ হয় না। তবে আবেদন করার জন্য ফিজিক্স, কেমিস্ট্রি ও ম্যাথে উল্লেখযোগ্য নাম্বার প্রয়োজন।', 'Engineering universities (BUET/CKRUET) do not add GPA marks to final merit. GPA is strictly used as an eligibility hurdle and for preliminary shortlisting.')}
                                        </p>
                                    </div>
                                )}

                                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/5 border border-white/10 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-full bg-blue-500/5 -skew-x-12 translate-x-16"></div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                        <div className="space-y-4 flex-grow">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">
                                                        {result.isEngineering ? t('ভর্তি পরীক্ষার গুরুত্ব', 'ADMISSION TEST WEIGHTED') : t('জিপিএ ইম্প্যাক্ট', 'GPA EFFICIENCY INDEX')}
                                                    </span>
                                                </div>
                                                <span className="text-2xl font-black text-white tracking-tighter">{result.isEngineering ? "100" : result.percentage}%</span>
                                            </div>

                                            {/* Advanced Progress Bar */}
                                            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${result.isEngineering ? 100 : result.percentage}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                                                />
                                            </div>

                                            <div className="flex justify-between items-center text-[8px] font-bold text-white/20 uppercase tracking-widest">
                                                <span>{t('ন্যূনতম', 'Minimum Threshold')}</span>
                                                <span>{t('আপনার অবস্থান', 'Your Standing')}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 shrink-0 md:pl-8 md:border-l border-white/10">
                                            <div className="text-right">
                                                <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">
                                                    {Number(result.percentage) >= 95 ? t('এলিট স্ট্যাটাস', 'ELITE STATUS') :
                                                        Number(result.percentage) >= 80 ? t('সাফল্যের পথে', 'STRONG POSITION') :
                                                            t('উন্নতি প্রয়োজন', 'NEEDS FOCUS')}
                                                </div>
                                                <div className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">{t('মেরিট এনালাইসিস', 'MERIT SYNC ACTIVE')}</div>
                                            </div>
                                            <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center text-white/20 group-hover:text-blue-400 group-hover:border-blue-400/50 transition-all duration-500">
                                                <Target size={20} className="group-hover:rotate-45 transition-transform duration-700" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* SYSTEM GUIDE */}
            <div className="mt-20">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">{t('ইউনিভার্সিটি গাইডলাইন', 'Admission Matrix')}</h3>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-emerald-600">
                            <ShieldAlert size={18} />
                            <h4 className="text-xs font-black uppercase tracking-tight">{t('মেডিকেল ও ডেন্টাল', 'Medical Hub')}</h4>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic">
                            {t('মোট ৩০০ মার্কস এর মধ্যে ২০০ ই হলো জিপিএ। অর্থাৎ এখানে জিপিএ-র গুরুত্ব সবচেয়ে বেশি।', '200 out of 300 total score comes from GPA. Every decimal point counts heavily here.')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-blue-600">
                            <School size={18} />
                            <h4 className="text-xs font-black uppercase tracking-tight">{t('জেনারেল ভার্সিটি', 'General Varsity')}</h4>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic">
                            {t('DU, JU সহ অধিকাংশ ভার্সিটিতে ২০ মার্কস থাকে। RU তে শুধুমাত্র পরীক্ষার ১০০ মার্কস এ মেরিট হয়।', 'Most varsities like DU/JU count 20 marks. RU ignores GPA in merit, focusing on the 100 mark MCQ test.')}
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-amber-600">
                            <HardHat size={18} />
                            <h4 className="text-xs font-black uppercase tracking-tight">{t('ইঞ্জিনিয়ারিং হাব', 'Engineering Hub')}</h4>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic">
                            {t('এখানে জিপিএ স্কোর যোগ হয় না। তবে টপ ১০-৩০ হাজারে থাকার জন্য হায়ার ম্যাথ ও ফিজিক্স এ ভালো নাম্বার জরুরি।', 'GPA marks are not added to merit, but high H.Math/Phy marks are critical to pass the selection hurdle.')}
                        </p>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default AdmissionPage;
