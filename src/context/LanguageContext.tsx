import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Translations } from '../i18n/translations';
import type { Language } from '../types';

interface LanguageContextValue {
  language: Language;
  dir: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  t: Translations;
}
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }): JSX.Element {
  const [language, setLanguage] = useState<Language>(() => {
    return (window.localStorage.getItem('language') as Language | null) ?? 'en';
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      window.localStorage.setItem('language', next);
      return next;
    });
  };

  const value: LanguageContextValue = {
    language,
    dir: language === 'ar' ? 'rtl' : 'ltr',
    toggleLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
