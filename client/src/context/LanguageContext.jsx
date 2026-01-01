import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'bn');

    useEffect(() => {
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const toggleLang = () => {
        setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
    };

    const t = (bnText, enText) => {
        return lang === 'bn' ? bnText : enText;
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
