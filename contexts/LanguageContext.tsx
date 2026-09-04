import React, { createContext, useContext, useState, useEffect } from 'react';

type Translations = Record<string, string>;

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string, fallback?: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lya-language');
      return stored === 'ar' ? 'ar' : 'en';
    }
    return 'en';
  });

  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        const response = await fetch(`/translations/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${language} translations`);
        }
        const data = await response.json();
        if (isMounted) {
          setTranslations(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
        if (isMounted) {
          setTranslations({});
          setIsLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lya-language', language);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const getNestedValue = (obj: Record<string, unknown>, path: string): unknown => {
    return path.split('.').reduce((current: unknown, segment: string) => {
      if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, segment)) {
        return (current as Record<string, unknown>)[segment];
      }
      return undefined;
    }, obj);
  };

  const t = (key: string, fallback?: string, params?: Record<string, string>): string => {
    if (!key) return fallback ?? '';
    const rawValue = getNestedValue(translations, key);
    let value: string;
    if (typeof rawValue === 'string' && rawValue.trim()) {
      value = rawValue;
    } else {
      value = fallback ?? '';
    }
    if (params) {
      return value.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, segment) => params[segment] ?? '');
    }
    return value;
  };

  const value: LanguageContextType = {
    language,
    toggleLanguage,
    t
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F2EC] flex items-center justify-center">
        <div className="text-[#C8A882] font-serif text-xl">Loading LYA...</div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
