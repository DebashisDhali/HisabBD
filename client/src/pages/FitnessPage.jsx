import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { calculateBMI } from '../calculators/health';
import { Activity, Scale, Info, RotateCcw, HelpCircle, CheckCircle2, AlertTriangle, Fingerprint, Ruler, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

const FitnessPage = ({ type }) => {
    const { lang, t } = useLanguage();

    // Initial State
    const [unitSystem, setUnitSystem] = useState('ft'); // 'cm' or 'ft'
    const [inputs, setInputs] = useState({
        weight: '', // kg or lbs
        heightCm: '', // for metric
        heightFt: '', // for imperial
        heightIn: ''  // for imperial
    });
    const [result, setResult] = useState(null);

    // Calculation Effect
    useEffect(() => {
        if (type === 'bmi') {
            let bmiData = null;
            // First arg is always weight in KG (inputs.weight)
            // Second arg is height
            if (unitSystem === 'cm') {
                if (inputs.weight && inputs.heightCm) {
                    bmiData = calculateBMI(inputs.weight, inputs.heightCm, 'metric');
                }
            } else { // 'ft' case
                if (inputs.weight && (inputs.heightFt || inputs.heightIn)) {
                    // For our custom hybrid mode, we pass KG weight, but Imperial height logic
                    // calculateBMI supports this if we modify it, BUT currently it expects 'imperial' mode to mean LBS also.
                    // We need to modify calculateBMI or convert inputs here.
                    // Let's convert FT/IN to CM here and use 'metric' mode, simpler.
                    const totalInches = (parseFloat(inputs.heightFt) || 0) * 12 + (parseFloat(inputs.heightIn) || 0);
                    if (totalInches > 0) {
                        const cmFromFt = totalInches * 2.54;
                        bmiData = calculateBMI(inputs.weight, cmFromFt, 'metric');
                    }
                }
            }
            setResult(bmiData);
        }
    }, [inputs, unitSystem, type]);

    const handleReset = () => {
        setInputs({ weight: '', heightCm: '', heightFt: '', heightIn: '' });
        setResult(null);
    };

    const seoConfigs = {
        bmi: {
            title: t('বিএমআই ক্যালকুলেটর - বডি মাস ইনডেক্স', 'BMI Calculator - Body Mass Index (Official BD Standard)'),
            desc: t('আপনার উচ্চতা ও ওজন অনুযায়ী সঠিক বিএমআই (BMI) নির্ণয় করুন। সুস্বাস্থ্যের জন্য আদর্শ ওজন কত হওয়া উচিত তা জানুন।', 'Calculate your Body Mass Index (BMI) accurately. Check if you are underweight, normal, overweight or obese according to health standards.'),
            keywords: 'bmi calculator bd, body mass index bangladesh, ideal weight calculator, fitness calculator bd, health tools',
            canonical: '/bmi-calculator-bangladesh'
        }
    };

    const currentSeo = seoConfigs[type] || seoConfigs.bmi;

    return (
        <CalculatorLayout
            title={currentSeo.title}
            description={currentSeo.desc}
            keywords={currentSeo.keywords}
            canonical={currentSeo.canonical}
        >
            <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                    {/* INPUT ZONE */}
                    <div className="input-zone-container !p-6 md:!p-10 space-y-12">
                        <div className="flex justify-between items-center mb-6 px-4">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                                {t('শারীরিক তথ্য', 'BODY METRICS')}
                            </span>
                            <div className="h-px flex-grow mx-4 bg-slate-200/50"></div>
                            <Fingerprint size={14} className="text-slate-300" />
                        </div>

                        {/* Unit Toggle */}
                        <div className="bg-slate-50 p-1.5 rounded-2xl flex relative">
                            <div
                                className={`absolute inset-y-1.5 w-1/2 bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${unitSystem === 'ft' ? 'translate-x-0' : 'translate-x-[100%]'}`}
                            ></div>
                            <button
                                onClick={() => setUnitSystem('ft')}
                                className={`flex-1 relative z-10 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${unitSystem === 'ft' ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Feet / Inches
                            </button>
                            <button
                                onClick={() => setUnitSystem('cm')}
                                className={`flex-1 relative z-10 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${unitSystem === 'cm' ? 'text-rose-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Centimeters (CM)
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Weight Input - ALWAYS KG */}
                            <InputField
                                label={t('আপনার ওজন (KG)', 'Weight (KG)')}
                                value={inputs.weight}
                                onChange={(v) => setInputs({ ...inputs, weight: v })}
                                icon={<Scale className="text-rose-500" />}
                                hint={t('আপনার বর্তমান ওজন কেজিতে লিখুন', 'Enter your current body weight in KG')}
                                unit="KG"
                            />

                            {/* Height Input */}
                            {unitSystem === 'cm' ? (
                                <InputField
                                    label={t('উচ্চতা (CM)', 'Height (CM)')}
                                    value={inputs.heightCm}
                                    onChange={(v) => setInputs({ ...inputs, heightCm: v })}
                                    icon={<Ruler className="text-rose-500" />}
                                    hint={t('সেন্টিমিটারে উচ্চতা (যেমন: ১৬৫)', 'Height in centimeters')}
                                    unit="CM"
                                />
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField
                                        label={t('ফুট', 'Feet')}
                                        value={inputs.heightFt}
                                        onChange={(v) => setInputs({ ...inputs, heightFt: v })}
                                        icon={<Ruler className="text-rose-500" />}
                                        unit="FT"
                                    />
                                    <InputField
                                        label={t('ইঞ্চি', 'Inches')}
                                        value={inputs.heightIn}
                                        onChange={(v) => setInputs({ ...inputs, heightIn: v })}
                                        icon={<Maximize className="text-rose-500" />}
                                        unit="IN"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                            >
                                <RotateCcw size={14} />
                                {t('রিসেট করুন', 'RESET')}
                            </button>
                        </div>
                    </div>

                    {/* RESULT ZONE */}
                    <div className="result-zone-container relative !p-8 md:!p-12 min-h-[500px] flex flex-col justify-center">
                        <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
                            <span className="text-[10px] font-black text-blue-500/30 uppercase tracking-[0.4em]">{t('ফলাফল', 'ANALYSIS')}</span>
                        </div>

                        <div className="w-full text-center relative z-10">
                            {!result ? (
                                <div className="flex flex-col items-center justify-center opacity-30 space-y-4">
                                    <Activity size={48} className="text-white" />
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest leading-relaxed max-w-[200px]">
                                        {t('সঠিক তথ্য দিয়ে আপনার বিএমআই চেক করুন', 'Enter your metrics to reveal your health score')}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    <div>
                                        <div className="text-[9px] font-black tracking-[0.5em] text-blue-400 mb-6 uppercase opacity-60">
                                            {t('আপনার বিএমআই স্কোর', 'YOUR BMI SCORE')}
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mb-4 overflow-hidden">
                                            <div className={`text-6xl md:text-8xl font-black tracking-tighter ${result.color}`}>
                                                {result.score}
                                            </div>
                                        </div>
                                        <div className={`inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-black uppercase tracking-widest ${result.color}`}>
                                            {result.status}
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left">
                                        <div className="flex items-start gap-4">
                                            <Info className="text-blue-400 shrink-0 mt-1" size={20} />
                                            <div>
                                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">{t('পরামর্শ', 'RECOMMENDATION')}</h4>
                                                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                                                    {t(result.recommendation === 'Great job! Maintain your balanced diet and exercise routine.' ? 'চমৎকার! আপনার ওজন স্বাভাবিক আছে। নিয়মিত ব্যায়াম বজায় রাখুন।' :
                                                        result.recommendation === 'Consider consulting a nutritionist to gain weight healthily.' ? 'পুষ্টিবিদের পরামর্শ নিয়ে স্বাস্থ্যকরভাবে ওজন বাড়ানোর চেষ্টা করুন।' :
                                                            result.recommendation === 'Aim for regular physical activity and a balanced diet.' ? 'নিয়মিত ব্যায়াম এবং সুষম খাবারের মাধ্যমে ওজন স্বাভাবিক করার চেষ্টা করুন।' :
                                                                'দ্রুত একজন বা বিশেষজ্ঞ ডাক্তারের পরামর্শ নিন।', result.recommendation)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-rose-500/20 blur-[80px] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB */}
            <div className="mt-20 space-y-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-rose-600 text-white rounded-xl shadow-lg">
                        <Activity size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('স্বাস্থ্য গাইড', 'HEALTH HUB')}</span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic underline decoration-rose-500 decoration-4 underline-offset-8">
                                {t('বিএমআই (BMI) চার্ট ও তার অর্থ', 'Understanding BMI Categories')}
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-[1.8]">
                                {t('বডি মাস ইনডেক্স (BMI) হলো এমন একটি আন্তর্জাতিক মানদণ্ড যা আপনার উচ্চতার সাথে ওজনের সামঞ্জস্যতা যাচাই করে। এটি আপনাকে বুঝতে সাহায্য করে যে আপনি আন্ডারওয়েট, স্বাভাবিক, ওভারওয়েট নাকি ওবেসিটি বা স্থূলতার মধ্যে পড়ছেন।', 'Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.')}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
                                { label: 'Normal Weight', range: '18.5 – 24.9', color: 'bg-emerald-500' },
                                { label: 'Overweight', range: '25 – 29.9', color: 'bg-amber-500' },
                                { label: 'Obesity', range: '30 or greater', color: 'bg-red-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <div className={`w-3 h-12 rounded-full ${item.color}`}></div>
                                    <div>
                                        <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.label}</div>
                                        <div className="text-xs font-bold text-slate-400">{item.range}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                            <h3 className="text-xl font-black mb-6 italic">{t('সতর্কতা', 'Note')}</h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">
                                {t('BMI সবসময় সঠিক স্বাস্থ্য নির্দেশ করে না। যেমন অ্যাথলেটদের পেশীর ওজন বেশি থাকার কারণে তাদের BMI বেশি হতে পারে, কিন্তু তারা স্থূল নয়।', 'BMI is not a diagnostic tool. Muscle mass usually weights more than fat, so athletes might have a high BMI but not be overweight.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

const InputField = ({ label, value, onChange, icon, hint, unit }) => {
    const inputRef = useRef(null);
    const { t } = useLanguage();

    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 hover:border-rose-200 transition-all group/field">
            <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-rose-600 transition-colors">
                    {React.cloneElement(icon, { size: 14, className: 'shrink-0' })}
                    <span className="truncate">{label}</span>
                </label>
                <div className="group/hint relative shrink-0">
                    <HelpCircle size={14} className="text-slate-300 cursor-help hover:text-rose-500 transition-all opacity-40" />
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
                    className="w-full h-12 bg-slate-50/50 border border-slate-100 rounded-lg px-6 text-lg font-black text-slate-900 focus:bg-white focus:border-rose-500 outline-none transition-all pr-12"
                    placeholder="0"
                />
                <span className="absolute right-4 font-black text-slate-300 text-xs uppercase opacity-40 pointer-events-none">{unit}</span>
            </div>
        </div>
    );
};

export default FitnessPage;
