import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { Tourist, RiskLevel, AIAnalysis } from '../types';
import { ShieldCheckIcon, ToggleLeftIcon, ToggleRightIcon, AlertTriangleIcon, BrainCircuitIcon } from './icons/Icons';

interface DigitalIdCardProps {
  tourist: Tourist;
  isAnalyzing: boolean;
  aiAnalysis: AIAnalysis | null;
}

const DigitalIdCard: React.FC<DigitalIdCardProps> = ({ tourist, isAnalyzing, aiAnalysis }) => {
  const context = useContext(AppContext);
  const [panicActivated, setPanicActivated] = useState(false);

  if (!context) return null;
  const { t } = context;

  const getRiskColor = (level: RiskLevel) => {
    if (level === RiskLevel.HIGH) return 'text-red-500';
    if (level === RiskLevel.MEDIUM) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSafetyScoreColor = (score: number) => {
    if (score < 50) return 'text-red-500';
    if (score < 75) return 'text-yellow-500';
    return 'text-green-500';
  }

  const AnalysisSection: React.FC = () => (
    <div className="mt-4 p-3 bg-orange-50 dark:bg-gray-700/50 rounded-lg">
        <h4 className="font-semibold mb-2 text-sm flex items-center">
            <BrainCircuitIcon className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400"/>
            AI Safety Analysis
        </h4>
        {isAnalyzing ? (
            <div className="space-y-2 animate-pulse">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full w-full"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full w-2/3"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded-full w-1/2 mt-2"></div>
            </div>
        ) : aiAnalysis ? (
            <div className="text-xs space-y-2 text-gray-700 dark:text-gray-300">
                <p>{aiAnalysis.riskSummary}</p>
                <ul className="list-disc list-inside pl-1">
                    {aiAnalysis.safetyTips.map((tip, i) => <li key={i}>{tip}</li>)}
                </ul>
            </div>
        ) : <p className="text-xs text-gray-500">No analysis available.</p>}
    </div>
  );

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden font-sans border-4 border-orange-500">
      <div className="bg-orange-600 dark:bg-orange-700 text-white p-4 text-center">
        <h2 className="text-xl font-bold">{t('digitalId')}</h2>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <img className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-600" src={tourist.photoUrl} alt={tourist.name} />
          <div>
            <h3 className="text-2xl font-bold">{tourist.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{tourist.country}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400">{t('passportNo')}</p>
            <p className="font-semibold">{tourist.passportNumber}</p>
          </div>
          <div className="text-right">
              <p className="text-gray-500 dark:text-gray-400">{t('safetyScore')}</p>
              <p className={`font-bold text-2xl ${getSafetyScoreColor(tourist.safetyScore)}`}>{tourist.safetyScore}</p>
          </div>
          {tourist.aadhaarNumber && (
            <div>
              <p className="text-gray-500 dark:text-gray-400">{t('aadhaarNo')}</p>
              <p className="font-semibold">{tourist.aadhaarNumber}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500 dark:text-gray-400">{t('entryDate')}</p>
            <p className="font-semibold">{tourist.entryDate}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">{t('departureDate')}</p>
            <p className="font-semibold">{tourist.departureDate}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">{t('itinerary')}</h4>
          <div className="space-y-2 text-sm max-h-24 overflow-y-auto pr-2">
            {tourist.itinerary.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                <span>{item.location}</span>
                <span className={`font-semibold ${getRiskColor(item.riskLevel)}`}>{t(item.riskLevel.toLowerCase())}</span>
              </div>
            ))}
          </div>
        </div>
        
        <AnalysisSection />
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2">{t('emergencyContacts')}</h4>
          <div className="text-sm space-y-1">
            {tourist.emergencyContacts.map((contact, index) => (
              <p key={index} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md">{contact}</p>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
            <span className="font-semibold text-green-600 dark:text-green-400">{t('blockchainVerified')}</span>
          </div>
           <div className="flex items-center space-x-2">
               {tourist.isTrackingEnabled ? <ToggleRightIcon className="w-10 h-10 text-green-500"/> : <ToggleLeftIcon className="w-10 h-10 text-gray-400"/>}
              <span className="text-xs">{t('realTimeTracking')} <br/> {tourist.isTrackingEnabled ? t('enabled') : t('disabled')}</span>
            </div>
        </div>
      </div>

       <div className="p-4 bg-gray-100 dark:bg-gray-900">
        <button onClick={() => setPanicActivated(true)} className="w-full bg-red-600 text-white font-bold py-4 rounded-lg text-xl tracking-wider hover:bg-red-700 active:bg-red-800 transition-all transform hover:scale-105 active:scale-100 flex items-center justify-center">
          <AlertTriangleIcon className="w-6 h-6 mr-2 animate-pulse"/>
          {t('panicButton')}
        </button>
      </div>

       {panicActivated && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 text-center max-w-sm">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <AlertTriangleIcon className="h-10 w-10 text-red-600 dark:text-red-400 animate-ping-slow"/>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('panicAlertTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('panicAlertBody')}</p>
            <div className="my-4">
                <img src="https://i.imgur.com/3Z0A2Bw.png" alt="Map with location" className="rounded-lg"/>
            </div>
            <button onClick={() => setPanicActivated(false)} className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">{t('close')}</button>
          </div>
           <style>{`@keyframes ping-slow { 75%, 100% { transform: scale(1.5); opacity: 0; } } .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }`}</style>
        </div>
      )}
    </div>
  );
};

export default DigitalIdCard;