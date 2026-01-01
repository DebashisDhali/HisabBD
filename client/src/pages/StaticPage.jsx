import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import CalculatorLayout from '../components/CalculatorLayout';
import { motion } from 'framer-motion';
import { Shield, Info, FileText, Mail, Send, MessageSquare, Heart, Headphones } from 'lucide-react';

const StaticPage = ({ type }) => {
    const { t } = useLanguage();

    const content = {
        about: {
            title: t('আমাদের সম্পর্কে', 'About HisabBD'),
            desc: t('হিসাববিডি এর লক্ষ্য এবং উদ্দেশ্য।', 'The vision behind HisabBD.'),
            icon: <Info size={18} className="text-emerald-500" />,
            text: t(
                'হিসাববিডি বাংলাদেশের জনগণের জন্য একটি ওয়ান-স্টপ সল্যুশন। আমরা বিশ্বাস করি সঠিক হিসেব জীবনকে সহজ করে। আমাদের প্রতিটি টুলস বাংলাদেশের সরকারি নীতিমালা এবং ধর্মীয় মূল্যবোধ অনুযায়ী তৈরি করা হয়েছে।',
                'HisabBD is a one-stop solution for the citizens of Bangladesh. We believe accurate calculations make life simpler. Every tool on our platform is built following official Bangladesh guidelines and religious values.'
            )
        },
        privacy: {
            title: t('গোপনীয়তা নীতি', 'Privacy Policy'),
            desc: t('আপনার ডাটা সুরক্ষা আমাদের সর্বোচ্চ অগ্রাধিকার।', 'Protecting your data is our top priority.'),
            icon: <Shield size={18} className="text-emerald-500" />,
            text: t(
                'เรา আপনার কোনো ব্যক্তিগত তথ্য বা ক্যালকুলেশন ডাটা সেভ করি না। আপনার গোপনীয়তা আমাদের কাছে পবিত্র।',
                'We do not save any of your personal information or calculation data. Your privacy is sacred to us.'
            )
        },
        terms: {
            title: t('শর্তাবলী', 'Terms of Service'),
            desc: t('আমাদের প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী।', 'Guidelines for using our platform.'),
            icon: <FileText size={18} className="text-emerald-500" />,
            text: t(
                'এই ক্যালকুলেটরগুলো শুধুমাত্র আপনাকে সাহায্য করার জন্য। যেকোনো আর্থিক বা ধর্মীয় গুরুত্বপুর্ণ সিদ্ধান্তের ক্ষেত্রে ওফিশিয়াল কোনো প্রতিষ্ঠানের সাথে পরামর্শ করুন।',
                'These calculators are intended for help only. For any critical financial or religious decisions, please consult official institutions.'
            )
        },
        contact: {
            title: t('যোগাযোগ', 'Contact Us'),
            desc: t('যেকোনো জিজ্ঞাসা বা সাহায্যের জন্য আমাদের সাথে যোগাযোগ করুন।', 'Reach out to us for any queries or support.'),
            icon: <Mail size={18} className="text-emerald-500" />,
            text: t(
                'আপনার কোনো পরামর্শ বা অভিযোগ থাকলে আমাদের ইমেইল করতে পারেন: support@bdcalculator.com',
                'If you have any suggestions or complaints, please email us at: support@bdcalculator.com'
            )
        }
    };

    const current = content[type];

    if (type === 'contact') {
        return (
            <CalculatorLayout title={current.title} description={current.desc}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Main Support Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 space-y-6"
                    >
                        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-6 md:p-10 shadow-xl shadow-slate-200/30 group">
                            {/* Decorative elements (reduced blur and opacity) */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl -mr-24 -mt-24 rounded-full"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                                        <Mail size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-950 tracking-tight leading-tight uppercase">
                                            {t('সরাসরি যোগাযোগ', 'Direct Support')}
                                        </h2>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t('আমরা আপনার কথা শুনতে আগ্রহী', 'WE ARE LISTENING')}</span>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="p-6 md:p-8 rounded-[1.5rem] bg-slate-50 border border-slate-100/50">
                                        <p className="text-base text-slate-600 font-bold leading-relaxed mb-8 opacity-80">
                                            {t(
                                                'আপনার যদি কোনো নতুন ক্যালকুলেটরের আইডিয়া থাকে অথবা আমাদের সার্ভিসে কোনো ভুল খুঁজে পান, নির্দ্বিধায় আমাদের জানান।',
                                                'Whether you have a suggestion for a new feature or found an error in our system, we want to hear from you.'
                                            )}
                                        </p>

                                        <a
                                            href="mailto:support@bdcalculator.com"
                                            className="inline-flex items-center gap-4 p-4 md:p-6 bg-white border border-emerald-100 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all duration-300 group/mail"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover/mail:bg-emerald-600 group-hover/mail:text-white transition-all">
                                                <Send size={18} />
                                            </div>
                                            <div>
                                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{t('অফিশিয়াল ইমেইল', 'OFFICIAL CHANNEL')}</span>
                                                <span className="block text-xl font-black text-slate-900 tracking-tight group-hover/mail:text-emerald-600 transition-colors">support@bdcalculator.com</span>
                                            </div>
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                                                <MessageSquare size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-tight">{t('পরামর্শ', 'Suggestions')}</h4>
                                                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{t('আপনার আইডিয়া আমাদের প্ল্যাটফর্মকে সমৃদ্ধ করতে পারে।', 'Help us grow by sharing your ideas.')}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100/50 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                                                <Headphones size={18} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-tight">{t('অভিযোগ', 'Complaints')}</h4>
                                                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{t('কোনো ভুল পেলে জানান, আমরা ২৪ ঘণ্টার মধ্যে সমাধানের চেষ্টা করবো।', 'Report a bug and we fix it within 24h.')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar Trust Card */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-8 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
                            <Heart className="text-emerald-500 mb-4" size={32} />
                            <h3 className="text-lg font-black mb-3 uppercase tracking-tight">{t('ধন্যবাদ', 'Gratitude')}</h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                                {t('আমাদের প্ল্যাটফর্মটি সম্পূর্ণ ফ্রি। আপনার ফিডব্যাক আমাদের আরও ডেভেলপ করতে উৎসাহিত করে।', 'Our platform is free. Your feedback fuels our continuous innovation.')}
                            </p>
                            <div className="h-px bg-white/10 w-full mb-6"></div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Response &lt; 24h</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">Global Coverage</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </CalculatorLayout>
        );
    }

    return (
        <CalculatorLayout title={current.title} description={current.desc}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
                        {current.icon}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{current.title}</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-600 leading-relaxed font-bold opacity-80">
                        {current.text}
                    </p>
                </div>
            </motion.div>
        </CalculatorLayout>
    );
};

export default StaticPage;
