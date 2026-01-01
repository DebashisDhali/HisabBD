import React, { useState, useEffect, useRef } from 'react';
import CalculatorLayout from '../components/CalculatorLayout';
import { useLanguage } from '../context/LanguageContext';
import { calculateGPA, calculateCGPA, percentageToGPA, gpaToPercentage } from '../calculators/education';
import { GraduationCap, Plus, Trash2, BookOpen, ScrollText, Percent, HelpCircle, LayoutGrid, Award, RotateCcw, Fingerprint, AlertTriangle, Edit3, Activity, Layers, ArrowRight, CheckCircle2, Target, Globe, Zap, Settings, Sparkle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EducationPage = ({ type }) => {
    const { lang, t } = useLanguage();

    // Initializer for GPA (SSC/HSC)
    const getInitialSubjects = () => Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: '', marks: '' }));

    // Initializer for CGPA (University)
    const getInitialCourses = () => Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: '', grade: '', credit: '' }));

    const [subjects, setSubjects] = useState(getInitialSubjects());
    const [courses, setCourses] = useState(getInitialCourses());
    const [converterValue, setConverterValue] = useState('');
    const [result, setResult] = useState('0.00');

    // AUTO-CALCULATION ENGINE
    useEffect(() => {
        if (type === 'gpa') {
            setResult(calculateGPA(subjects));
        } else if (type === 'cgpa') {
            setResult(calculateCGPA(courses));
        } else if (type === 'percent-to-gpa') {
            setResult(percentageToGPA(converterValue));
        } else if (type === 'gpa-to-percent') {
            setResult(gpaToPercentage(converterValue));
        }
    }, [subjects, courses, converterValue, type]);

    const addSubject = () => setSubjects([...subjects, { id: Date.now(), name: '', marks: '' }]);
    const removeSubject = (id) => setSubjects(subjects.filter(s => s.id !== id));

    const addCourse = () => setCourses([...courses, { id: Date.now(), name: '', grade: '', credit: '' }]);
    const removeCourse = (id) => setCourses(courses.filter(c => c.id !== id));

    const handleReset = () => {
        setSubjects(getInitialSubjects());
        setCourses(getInitialCourses());
        setConverterValue('');
        setResult('0.00');
    };

    const config = {
        gpa: {
            title: t('জিপিএ ক্যালকুলেটর (SSC/HSC)', 'Official BD GPA Hub'),
            desc: t('আপনার পরীক্ষার নম্বর অনুযায়ী জিপিএ হিসেব করুন।', 'Analytical GPA computation engine.'),
            icon: <ScrollText size={20} className="text-blue-600" />
        },
        cgpa: {
            title: t('সিজিপিএ ক্যালকুলেটর', 'University CGPA Port'),
            desc: t('ক্রেডিট এবং গ্রেড পয়েন্ট অনুযায়ী সিজিপিএ বের করুন।', 'Performance tracking for university excellence.'),
            icon: <GraduationCap size={20} className="text-blue-600" />
        },
        'percent-to-gpa': {
            title: t('গ্রেড কনভার্টার', 'Grade Mapping Matrix'),
            desc: t('শতকরা নম্বর থেকে জিপিএ রূপান্তর করুন।', 'Cross-matrix grade conversions.'),
            icon: <Percent size={20} className="text-blue-600" />
        }
    };

    const gpaGrading = [
        { range: '80-100', gpa: '5.00', grade: 'A+', color: 'bg-emerald-500' },
        { range: '70-79', gpa: '4.00', grade: 'A', color: 'bg-blue-500' },
        { range: '60-69', gpa: '3.50', grade: 'A-', color: 'bg-indigo-500' },
        { range: '50-59', gpa: '3.00', grade: 'B', color: 'bg-slate-600' },
        { range: '40-49', gpa: '2.00', grade: 'C', color: 'bg-amber-600' },
        { range: '33-39', gpa: '1.00', grade: 'D', color: 'bg-orange-600' },
        { range: '00-32', gpa: '0.00', grade: 'F', color: 'bg-red-500' },
    ];

    const universityGrading = [
        { range: '80-100', gpa: '4.00', grade: 'A+', color: 'bg-emerald-500' },
        { range: '75-79', gpa: '3.75', grade: 'A', color: 'bg-blue-600' },
        { range: '70-74', gpa: '3.50', grade: 'A-', color: 'bg-blue-400' },
        { range: '65-69', gpa: '3.25', grade: 'B+', color: 'bg-indigo-600' },
        { range: '60-64', gpa: '3.00', grade: 'B', color: 'bg-indigo-400' },
        { range: '55-59', gpa: '2.75', grade: 'B-', color: 'bg-slate-500' },
        { range: '50-54', gpa: '2.50', grade: 'C+', color: 'bg-amber-500' },
        { range: '45-49', gpa: '2.25', grade: 'C', color: 'bg-amber-400' },
        { range: '40-44', gpa: '2.00', grade: 'D', color: 'bg-orange-500' },
        { range: '00-39', gpa: '0.00', grade: 'F', color: 'bg-red-500' },
    ];

    const currentScale = type === 'cgpa' ? universityGrading : gpaGrading;
    const current = config[type];

    const seoConfigs = {
        gpa: {
            title: t('জিপিএ ক্যালকুলেটর ২০২৬ - এসএসসি ও এইচএসসি', 'GPA Calculator 2026 - Official SSC & HSC Tool'),
            desc: t('মাধ্যমিক ও উচ্চ মাধ্যমিক পরীক্ষার জিপিএ মার্কস নির্ভুলভাবে হিসাব করুন। সকল শিক্ষা বোর্ডের জন্য প্রযোজ্য।', 'Calculate SSC and HSC GPA accurately for all Bangladesh education boards. Updated 2026 grading rules.'),
            keywords: 'gpa calculator, ssc gpa calculator, hsc gpa marks, bd education board gpa, calculate gpa online bd',
            canonical: '/gpa-calculator-bangladesh'
        },
        cgpa: {
            title: t('সিজিপিএ ক্যালকুলেটর - ভার্সিটি ও ৪.০০ স্কেল', 'CGPA Calculator - University 4.00 Scale Tracking'),
            desc: t('বিশ্ববিদ্যালয়ের সেমিস্টার অনুযায়ী সিজিপিএ হিসাব করুন। ৪.০০ স্কেলে ক্রেডিট ও গ্রেড পয়েন্টের নির্ভুল হিসাব।', 'Track your university semester performance with our 4.00 scale CGPA calculator. Support for all private & public universities.'),
            keywords: 'cgpa calculator, university cgpa bd, calculate cgpa 4.00 scale, semester gpa calculator, academic performance tracker',
            canonical: '/cgpa-calculator-bangladesh'
        },
        'percent-to-gpa': {
            title: t('গ্রেড কনভার্টার - পার্সেন্টেজ টু জিপিএ রূপান্তর', 'Grade Mapping Matrix - Percentage to GPA Converter'),
            desc: t('শতকরা নম্বর থেকে দ্রুত জিপিএ ও লেটার গ্রেডে রূপান্তর করুন। বোর্ড ও ভার্সিটি উভয় স্ট্যান্ডার্ড সাপোর্ট।', 'Convert your marks percentage to GPA and letter grades instantly. Supports both Board 5.0 and University 4.0 scales.'),
            keywords: 'percentage to gpa converter, grade mapping bd, marks to grade point, academic converter, gpa translation',
            canonical: '/grade-converter-bangladesh'
        }
    };

    const currentSeo = seoConfigs[type] || seoConfigs.gpa;

    const relatedCalculators = [
        { name: t('ভর্তি জিপিএ', 'Admission GPA'), path: '/admission-gpa-marks-calculator', icon: <Target size={14} /> },
        { name: t('আয়কর ক্যালকুলেটর', 'Salary Tax'), path: '/salary-tax-calculator-bangladesh', icon: <Zap size={14} /> },
        { name: t('বয়স ক্যালকুলেটর', 'Age Hub'), path: '/age-calculator-bangladesh', icon: <Settings size={14} /> },
    ];

    return (
        <CalculatorLayout
            title={currentSeo.title}
            description={currentSeo.desc}
            keywords={currentSeo.keywords}
            canonical={currentSeo.canonical}
            relatedTools={relatedCalculators}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                    <div className="card-premium !p-0 overflow-hidden border-none shadow-none bg-transparent">
                        <div className="input-zone-container !p-6 md:!p-10 mb-8">
                            <div className="flex justify-between items-center mb-8 px-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                    {t('ইনপুট এরিয়া', 'INPUT PARAMETERS')}
                                </span>
                                <div className="h-px flex-grow mx-4 bg-slate-200/50"></div>
                                <Fingerprint size={14} className="text-slate-300" />
                            </div>

                            {type === 'gpa' && (
                                <div className="space-y-12">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                                <LayoutGrid size={24} />
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter truncate">{t('বিষয় সমূহ', 'Course Load')}</h3>
                                        </div>
                                        <button
                                            onClick={handleReset}
                                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 border border-slate-100 transition-all shrink-0"
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                    </div>

                                    <div className="grid gap-4">
                                        <AnimatePresence>
                                            {subjects.map((sub, idx) => (
                                                <motion.div
                                                    key={sub.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="grid grid-cols-12 gap-3 items-center"
                                                >
                                                    <div className="col-span-12 md:col-span-7 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group/name">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Edit3 size={10} className="text-slate-400 group-focus-within/name:text-blue-500" />
                                                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('বিষয়ের নাম', 'Subject Name')}</label>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={sub.name}
                                                            onChange={(e) => {
                                                                const newSubs = [...subjects];
                                                                newSubs[idx].name = e.target.value;
                                                                setSubjects(newSubs);
                                                            }}
                                                            className="w-full h-8 bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-200"
                                                            placeholder={t('যেমন: বাংলা', 'e.g. Mathematics')}
                                                        />
                                                    </div>

                                                    <div className="col-span-12 md:col-span-4 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group/marks">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <div className="flex items-center gap-2">
                                                                <ScrollText size={10} className="text-slate-400 group-focus-within/marks:text-blue-500" />
                                                                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('নম্বর', 'Marks')}</label>
                                                            </div>
                                                            <span className="text-[7px] font-bold text-slate-200 uppercase tracking-widest">0-100</span>
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                type="number"
                                                                value={sub.marks}
                                                                onChange={(e) => {
                                                                    const newSubs = [...subjects];
                                                                    newSubs[idx].marks = e.target.value;
                                                                    setSubjects(newSubs);
                                                                }}
                                                                className="w-full h-8 bg-transparent text-sm font-black text-slate-900 outline-none"
                                                                placeholder="00"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 md:col-span-1 flex justify-center">
                                                        <button
                                                            onClick={() => removeSubject(sub.id)}
                                                            className="w-10 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shrink-0 active:scale-90"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <button
                                        onClick={addSubject}
                                        className="w-full h-12 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all flex items-center justify-center gap-2 text-[10px]"
                                    >
                                        <Plus size={16} />
                                        {t('নতুন বিষয় যোগ করুন', 'ADD NEW SUBJECT')}
                                    </button>
                                </div>
                            )}

                            {type === 'cgpa' && (
                                <div className="space-y-12">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                                <Award size={24} />
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tighter truncate">{t('একাডেমিক ডাটা', 'Semester Logs')}</h3>
                                        </div>
                                        <button onClick={handleReset} className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 border border-slate-100 transition-all shrink-0"><RotateCcw size={18} /></button>
                                    </div>

                                    <div className="grid gap-4">
                                        <AnimatePresence>
                                            {courses.map((course, idx) => (
                                                <motion.div
                                                    key={course.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    className="grid grid-cols-12 gap-3 items-center"
                                                >
                                                    {/* Course Name */}
                                                    <div className="col-span-12 md:col-span-5 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group/name">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <BookOpen size={10} className="text-slate-400 group-focus-within/name:text-blue-500" />
                                                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('কোর্সের নাম', 'Course/Semester')}</label>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={course.name}
                                                            onChange={(e) => {
                                                                const newCourses = [...courses];
                                                                newCourses[idx].name = e.target.value;
                                                                setCourses(newCourses);
                                                            }}
                                                            className="w-full h-8 bg-transparent text-sm font-bold text-slate-800 outline-none placeholder:text-slate-200"
                                                            placeholder={t('যেমন: সেমিস্টার ১', 'e.g. Algorithms')}
                                                        />
                                                    </div>

                                                    {/* GPA Input */}
                                                    <div className="col-span-6 md:col-span-3 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group/grade">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Layers size={10} className="text-slate-400 group-focus-within/grade:text-blue-500" />
                                                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('জিপিএ', 'GPA')}</label>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={course.grade}
                                                            onChange={(e) => {
                                                                const newCourses = [...courses];
                                                                newCourses[idx].grade = e.target.value;
                                                                setCourses(newCourses);
                                                            }}
                                                            className="w-full h-8 bg-transparent text-sm font-black text-slate-900 outline-none"
                                                            placeholder="4.00"
                                                        />
                                                    </div>

                                                    {/* Credit Input */}
                                                    <div className="col-span-4 md:col-span-3 bg-white p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-all group/credit">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Percent size={10} className="text-slate-400 group-focus-within/credit:text-blue-500" />
                                                            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t('ক্রেডিট', 'Credit')}</label>
                                                        </div>
                                                        <input
                                                            type="number"
                                                            value={course.credit}
                                                            onChange={(e) => {
                                                                const newCourses = [...courses];
                                                                newCourses[idx].credit = e.target.value;
                                                                setCourses(newCourses);
                                                            }}
                                                            className="w-full h-8 bg-transparent text-sm font-black text-slate-900 outline-none"
                                                            placeholder="3"
                                                        />
                                                    </div>

                                                    <div className="col-span-2 md:col-span-1 flex justify-center">
                                                        <button
                                                            onClick={() => removeCourse(course.id)}
                                                            className="w-10 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shrink-0 active:scale-90 border border-red-100"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                    <button
                                        onClick={addCourse}
                                        className="w-full h-12 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2 text-[10px]"
                                    >
                                        <Plus size={16} />
                                        {t('নতুন কোর্স যোগ করুন', 'ADD NEW COURSE')}
                                    </button>
                                </div>
                            )}

                            {type === 'percent-to-gpa' && (
                                <div className="py-12 flex flex-col items-center">
                                    <div className="max-w-xl w-full p-2 bg-blue-600 rounded-[3rem]">
                                        <div className="bg-white rounded-[2.8rem] p-10 text-center relative overflow-hidden group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 block mb-10">{t('শতকরা নম্বর', 'RATIO (%)')}</label>
                                            <div className="relative z-10">
                                                <input
                                                    type="number"
                                                    value={converterValue}
                                                    onChange={(e) => setConverterValue(e.target.value)}
                                                    className="w-full h-24 text-6xl md:text-7xl font-black text-center bg-transparent outline-none tracking-tighter text-slate-900"
                                                    placeholder="80"
                                                />
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                    <Percent size={120} />
                                                </div>
                                            </div>
                                            <p className="mt-8 text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('শতকরা নম্বর থেকে জিপিএ', '% TO GPA CONVERTER')}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RESULTS ZONE */}
                        <div className="result-zone-container !p-8 md:!p-12 min-h-[400px] flex flex-col justify-center relative shadow-2xl overflow-hidden">
                            <div className="absolute top-8 right-8 flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-500/30">
                                <Activity size={10} className="text-blue-400 animate-pulse" />
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">{t('লাইভ ক্যালকুলেশন', 'LIVE AUTO-SYNC')}</span>
                            </div>

                            <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
                                <span className="text-[10px] font-black text-blue-500/30 uppercase tracking-[0.4em]">{t('ফলাফল', 'STEP 2: OUTPUT')}</span>
                            </div>

                            <div className="w-full pt-10 text-center overflow-hidden">
                                <div className="text-[10px] font-black tracking-[0.6em] text-blue-400 mb-10 uppercase opacity-60">
                                    {type === 'percent-to-gpa' ? t('রূপান্তরিত জিপিএ', 'CONVERTED GPA') : t('চূড়ান্ত রেজাল্ট', 'FINAL GRADE INDEX')}
                                </div>

                                <div key={result} className="flex items-center justify-center gap-4 mb-10 overflow-hidden px-4">
                                    <Award size={32} className="text-blue-500 opacity-40 shrink-0" />
                                    <div className="text-6xl md:text-8xl font-black tracking-tighter result-text-neon truncate max-w-full">
                                        {Number(result || 0).toFixed(2).toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US')}
                                    </div>
                                </div>

                                <div className="text-[9px] font-black opacity-30 uppercase tracking-widest mb-12">
                                    {type === 'cgpa' ? t('ইউনিভার্সিটি স্ট্যান্ডার্ড ৪.০০ স্কেল', 'Compliance: University 4.00 Scale') : t('বাংলাদেশ বোর্ড ৫.০০ স্কেল', 'Compliance Index: Board 5.00 Scale')}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/5">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-3xl font-black text-emerald-400 mb-1">100%</div>
                                        <div className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">Accuracy</div>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="text-3xl font-black text-blue-400 mb-1">PRO</div>
                                        <div className="text-[8px] font-bold opacity-30 uppercase tracking-[0.2em]">Algorithm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR: SMART REFERENCE MATRIX */}
                <div className="lg:col-span-4 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <LayoutGrid size={24} className="text-blue-400" />
                                <h3 className="text-lg font-black uppercase tracking-tight">{t('গ্রেড ম্যাট্রিক্স', 'Grading Matrix')}</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-12 px-4 py-2 text-[8px] font-black text-white/30 uppercase tracking-widest border-b border-white/5 mb-2">
                                    <div className="col-span-5">{t('নম্বর রেঞ্জ', 'Range')}</div>
                                    <div className="col-span-4">{t('গ্রেড পয়েন্ট', 'Points')}</div>
                                    <div className="col-span-3 text-right">{t('গ্রেড', 'Grade')}</div>
                                </div>
                                {currentScale.map((g, i) => (
                                    <div key={i} className="grid grid-cols-12 items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                                        <div className="col-span-5 flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${g.color}`}></div>
                                            <span className="text-[10px] font-bold text-white/60">{g.range}%</span>
                                        </div>
                                        <div className="col-span-4">
                                            <span className="text-[10px] font-black text-white">{g.gpa}</span>
                                        </div>
                                        <div className="col-span-3 text-right">
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black text-white ${g.color} shadow-lg shadow-${g.color.split('-')[1]}-500/20`}>{g.grade}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[9px] font-medium text-white/40 leading-relaxed italic">
                                    {t(
                                        'বি.দ্র. একেক ইউনিভার্সিটি বা বোর্ডের গ্রেডিং পলিসি ভিন্ন হতে পারে। এটি স্ট্যান্ডার্ড হিসেবে গণ্য হবে।',
                                        'Note: Grading policies may vary across boards or universities. This matrix represents standard UGC/Board criteria.'
                                    )}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Pro Tips Card */}
                    <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                        <CheckCircle2 size={32} className="text-emerald-500 mb-4" />
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-2">{t('টিপস', 'Pro Analysis')}</h4>
                        <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-6 italic opacity-80">
                            {t('উচ্চশিক্ষার ক্ষেত্রে সিজিপিএ ৩.৫০ এর ওপরে রাখা আন্তর্জাতিকভাবে স্ট্যান্ডার্ড হিসেবে ধরা হয়।', 'Maintaining a CGPA above 3.50 is globally recognized as a high-tier academic achievement.')}
                        </p>
                        <div className="h-px bg-slate-100 w-full mb-6"></div>
                        <div className="flex items-center justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                            <span>Status: Verified</span>
                            <ArrowRight size={12} />
                        </div>
                    </div>
                </div>
            </div>

            {/* KNOWLEDGE HUB - SEO POWERHOUSE */}
            <div className="mt-20 space-y-20">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg">
                        <GraduationCap size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">{t('একাডেমিক গাইড', 'ACADEMIC HUB')}</span>
                    </div>
                    <div className="h-px flex-grow bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-tight uppercase italic underline decoration-indigo-500 decoration-4 underline-offset-8">
                                {t('জিপিএ ও সিজিপিএ হিসাব করার সঠিক পদ্ধতি', 'Official Guide to GPA & CGPA Calculation in BD')}
                            </h2>
                            <p className="text-base text-slate-500 font-medium leading-[1.8]">
                                {t('বাংলাদেশের শিক্ষা ব্যবস্থায় জিপিএ (GPA) এবং সিজিপিএ (CGPA) একাডেমিক সাফল্যের প্রধান মানদণ্ড। মাধ্যমিক ও উচ্চমাধ্যমিক পর্যায়ে ৫.০ স্কেল এবং স্নাতক পর্যায়ে ৪.০ স্কেলে এই হিসাব করা হয়। আমাদের এই অটোমেটেড ক্যালকুলেটরটি আপনাকে সরাসরি গ্রেড পয়েন্ট এভারেজ বের করতে সাহায্য করবে। সঠিক ফলাফল পেতে প্রতিটি সাবজেক্টের ক্রেডিট এবং মার্কস নির্ভুলভাবে ইনপুট দিন।', 'GPA (Grade Point Average) and CGPA (Cumulative GPA) are the primary metrics for academic evaluation in Bangladesh. While SSC and HSC follow a 5.0 scale, undergraduate and graduate levels utilize a 4.0 scale. Our precision engine automates these complex weighted averages, ensuring you get accurate merit rankings for college admissions and career applications.')}
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100 group">
                                <Target className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('SSC ও HSC জিপিএ ৫.০', 'The 5.0 Scale Hub')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('বোর্ড পরীক্ষায় চতুর্থ বিষয়সহ (Optional Subject) জিপিএ হিসাব করা হয়। জিপিএ ৫ হলো সর্বোচ্চ রেজাল্ট যাকে "গোল্ডেন" বলা হয়।', 'Board examinations include the 4th optional subject for GPA calculations. A perfect score of 5.0 is the highest merit achievable in the secondary education system.')}
                                </p>
                            </div>
                            <div className="p-8 rounded-[2rem] bg-indigo-50 border border-indigo-100 group">
                                <Globe className="text-indigo-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                                <h3 className="text-xl font-black text-slate-900 mb-4">{t('ইউনিভার্সিটি সিজিপিএ ৪.০', 'University CGPA Matrix')}</h3>
                                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider opacity-70">
                                    {t('বিশ্ববিদ্যালয়ের সিজিপিএ হিসাব করা হয় ক্রেডিট আওয়ার অনুযায়ী। প্রতিটি সাবজেক্টের ক্রেডিট এবং সংশ্লিষ্ট গ্রেড গুণ করে মোট ক্রেডিট দিয়ে ভাগ করতে হয়।', 'Tertiary education metrics are weighted by Credit Hours. CGPA is calculated by dividing total quality points earned by the sum of credits attempted.')}
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{t('প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)', 'Frequently Asked Questions')}</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        q: t('৪র্থ বিষয় কীভাবে যোগ করা হয়?', 'How is the 4th subject included?'),
                                        a: t('বোর্ড পরীক্ষায় ৪র্থ বিষয়ের জিপিএ থেকে ২ পয়েন্ট বাদ দিয়ে বাকি পয়েন্ট মূল জিপিএর সাথে যোগ করা হয়।', 'In SSC/HSC, points earned above 2.0 in the optional subject are added to the main GPA (up to a maximum cap of 5.0).')
                                    },
                                    {
                                        q: t('সিজিপিএ থেকে শতাংশ (%) বের করার নিয়ম কী?', 'How to convert CGPA to Percentage?'),
                                        a: t('বাংলাদেশের বেশিরভাগ ইউনিভার্সিটিতে (CGPA × 20) বা একটি নির্দিষ্ট সূত্র কাজ করে। আমাদের কনভার্টারটি ব্যবহার করে আপনি সঠিক ফলাফল পেতে পারেন।', 'Most institutions in BD use (CGPA x 20) as a rough estimate, though formulas vary. Our integrated converter handles these transitions automatically.')
                                    },
                                    {
                                        q: t('ইম্প্রুভমেন্ট এক্সাম দিলে জিপিএ কীভাবে বদলে যায়?', 'How do improvement exams impact GPA?'),
                                        a: t('উন্নত গ্রেডটি আগের গ্রেডকে প্রতিস্থাপন করে এবং সেই অনুযায়ী নতুন জিপিএ রি-ক্যালকুলেট করা হয়।', 'The improved grade replaces the previous entry, and the overall GPA is recalculated via the credit-weighting engine.')
                                    }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white border border-slate-100">
                                        <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">{item.q}</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="p-10 rounded-[3rem] bg-indigo-950 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/20 blur-3xl -mr-16 -mt-16 rounded-full"></div>
                            <h3 className="text-xl font-black mb-6 italic">{t('ক্যালকুলেশন মেথড', 'Calculation Engine')}</h3>
                            <div className="space-y-6">
                                {[
                                    t('১. প্রতিটি বিষয়ের প্রাপ্ত গ্রেড ইনপুট দিন।', '1. Input the grade earned for each subject.'),
                                    t('২. ইউনিভার্সিটির ক্ষেত্রে ক্রেডিট আওয়ার উল্লেখ করুন।', '2. For University, specify credit hours per course.'),
                                    t('৩. ক্যালকুলেটর অটোমেটিক এভারেজ বের করবে।', '3. The engine automatically computes the weighted average.'),
                                    t('৪. ৪র্থ বিষয়ের পয়েন্ট স্বয়ংক্রিয়ভাবে অ্যাডজাস্ট হবে।', '4. Optional subject points are adjusted automatically.')
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black shrink-0">{i + 1}</div>
                                        <p className="text-[11px] font-bold text-indigo-100 leading-relaxed uppercase tracking-wider">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-200 text-center">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{t('গুরুত্বপূর্ণ নোটিশ', 'OFFICIAL NOTICE')}</h4>
                            <p className="text-[10px] font-bold text-slate-600 leading-relaxed uppercase tracking-tight">
                                {t('ভর্তি পরীক্ষার জন্য জিপিএ অত্যন্ত স্পর্শকাতর। সঠিক তথ্যের মাধ্যমে হিসাব করতে আমাদের "ভর্তি জিপিএ" টুলটি ব্যবহার করুন।', 'GPA is sensitive for university admissions. For specific merit calculations, use our specialized "Admission GPA" hub.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </CalculatorLayout>
    );
};

export default EducationPage;
