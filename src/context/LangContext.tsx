import { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n/config';

type Lang = 'cs' | 'en';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: 'cs',
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'cs' || stored === 'en') return stored;
    return navigator.language.startsWith('cs') ? 'cs' : 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang(l => (l === 'cs' ? 'en' : 'cs'));

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
