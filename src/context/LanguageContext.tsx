import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('lang');
    return (saved === 'id' || saved === 'en') ? saved : 'id';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = React.useCallback((key: string) => {
    return (translations[lang] as any)[key] || key;
  }, [lang]);

  const setLanguage = React.useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  const value = React.useMemo(() => ({ lang, t, setLanguage }), [lang, t, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
