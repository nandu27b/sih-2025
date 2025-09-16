
import React, { useState, createContext, useMemo, useCallback } from 'react';
import { Language, Tourist } from './types';
import { TRANSLATIONS, SAMPLE_TOURISTS } from './constants';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TouristRegistration from './components/TouristRegistration';

type AppContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  tourists: Tourist[];
  addTourist: (tourist: Tourist) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [view, setView] = useState<'dashboard' | 'register'>('dashboard');
  const [tourists, setTourists] = useState<Tourist[]>(SAMPLE_TOURISTS);

  const t = useCallback((key: string) => {
    return TRANSLATIONS[language][key] || key;
  }, [language]);

  const addTourist = (tourist: Tourist) => {
    setTourists(prev => [...prev, tourist]);
    setView('dashboard');
  };

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
    tourists,
    addTourist,
  }), [language, t, tourists]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md flex space-x-1">
              <button
                onClick={() => setView('dashboard')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'dashboard'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('authorityDashboard')}
              </button>
              <button
                onClick={() => setView('register')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'register'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('registerTourist')}
              </button>
            </div>
          </div>

          {view === 'dashboard' ? <Dashboard /> : <TouristRegistration />}
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;