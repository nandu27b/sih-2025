
import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Language } from '../types';
import { GlobeIcon, AshokaChakraIcon } from './icons/Icons';

const Header: React.FC = () => {
  const context = useContext(AppContext);

  if (!context) return null;

  const { language, setLanguage, t } = context;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <AshokaChakraIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {t('appTitle')}
            </h1>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value={Language.EN}>English</option>
                <option value={Language.HI}>हिंदी (Hindi)</option>
                <option value={Language.BN}>বাংলা (Bengali)</option>
                <option value={Language.TA}>தமிழ் (Tamil)</option>
                <option value={Language.TE}>తెలుగు (Telugu)</option>
                <option value={Language.MR}>मराठी (Marathi)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;