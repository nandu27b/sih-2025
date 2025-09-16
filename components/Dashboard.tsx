import React, { useContext, useState, useCallback } from 'react';
import { AppContext } from '../App';
import { Tourist, Anomaly, AIAnalysis } from '../types';
import { SAMPLE_ANOMALIES, TOURIST_CLUSTERS_DATA } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangleIcon, UserIcon, MapPinIcon } from './icons/Icons';
import DigitalIdCard from './DigitalIdCard';
import { GoogleGenAI, Type } from "@google/genai";

const Dashboard: React.FC = () => {
  const context = useContext(AppContext);
  const [selectedTourist, setSelectedTourist] = useState<Tourist | null>(null);
  const [isFirModalOpen, setFirModalOpen] = useState(false);
  const [analysisCache, setAnalysisCache] = useState<{ [key: string]: AIAnalysis }>({});
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

  if (!context) return null;
  const { t, tourists } = context;

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Distress': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  const getSeverityClass = (severity: string) => {
      switch(severity) {
          case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
          case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
          default: return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      }
  }

  const handleGenerateFir = (tourist: Tourist) => {
      setSelectedTourist(tourist);
      setFirModalOpen(true);
  }

  const handleViewDetails = useCallback(async (tourist: Tourist) => {
    setSelectedTourist(tourist);
    if (analysisCache[tourist.id]) {
        return; // Already have analysis
    }

    setIsAnalyzing(tourist.id);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        const itineraryString = tourist.itinerary.map(item => `${item.location} on ${item.date}`).join(', ');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a travel safety expert for India. Analyze the following itinerary for a tourist named ${tourist.name} from ${tourist.country}. Provide a brief risk summary and 2-3 concise, actionable safety tips. Itinerary: ${itineraryString}.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        riskSummary: { type: Type.STRING },
                        safetyTips: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        
        const analysisText = response.text.trim();
        const analysis: AIAnalysis = JSON.parse(analysisText);

        setAnalysisCache(prev => ({ ...prev, [tourist.id]: analysis }));

    } catch (error) {
        console.error("Error generating AI analysis:", error);
        // Optionally set an error state to show in the UI
    } finally {
        setIsAnalyzing(null);
    }
  }, [analysisCache]);

  return (
    <div className="space-y-8">
      {/* Top Row Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tourist Clusters */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center"><UserIcon className="w-5 h-5 mr-2 text-orange-500"/>{t('touristClusters')}</h2>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={TOURIST_CLUSTERS_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)"/>
                <XAxis dataKey="name" tick={{ fill: '#9ca3af' }}/>
                <YAxis tick={{ fill: '#9ca3af' }}/>
                <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none' }}/>
                <Legend />
                <Bar dataKey="tourists" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High-Risk Zones */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center"><MapPinIcon className="w-5 h-5 mr-2 text-red-500"/>{t('highRiskZones')}</h2>
          <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-md bg-red-100 dark:bg-red-900/30"><span>Himalayan High Pass</span><span className="font-bold text-red-600 dark:text-red-400">HIGH</span></div>
              <div className="flex items-center justify-between p-3 rounded-md bg-red-100 dark:bg-red-900/30"><span>Sundarbans Mangrove Forest</span><span className="font-bold text-red-600 dark:text-red-400">HIGH</span></div>
              <div className="flex items-center justify-between p-3 rounded-md bg-yellow-100 dark:bg-yellow-900/30"><span>Chandni Chowk, Delhi</span><span className="font-bold text-yellow-600 dark:text-yellow-400">MEDIUM</span></div>
              <div className="flex items-center justify-between p-3 rounded-md bg-green-100 dark:bg-green-900/30"><span>Beaches of Goa</span><span className="font-bold text-green-600 dark:text-green-400">LOW</span></div>
          </div>
        </div>
        
        {/* AI Anomaly Alerts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center"><AlertTriangleIcon className="w-5 h-5 mr-2 text-yellow-500"/>{t('aiAnomalyAlerts')}</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {SAMPLE_ANOMALIES.map((anomaly: Anomaly) => (
              <div key={anomaly.id} className={`p-3 border-l-4 rounded-r-md ${getSeverityClass(anomaly.severity)}`}>
                  <p className="font-semibold text-sm">{anomaly.type}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{anomaly.touristName} at {anomaly.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 text-right">{anomaly.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registered Tourists Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">{t('registeredTourists')}</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">{t('name')}</th>
              <th scope="col" className="px-6 py-3">{t('country')}</th>
              <th scope="col" className="px-6 py-3">{t('status')}</th>
              <th scope="col" className="px-6 py-3">{t('safetyScore')}</th>
              <th scope="col" className="px-6 py-3">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {tourists.map((tourist) => (
              <tr key={tourist.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                    <img src={tourist.photoUrl} alt={tourist.name} className="w-8 h-8 rounded-full mr-3"/>
                    {tourist.name}
                </td>
                <td className="px-6 py-4">{tourist.country}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(tourist.status)}`}>
                    {t(tourist.status.toLowerCase())}
                  </span>
                </td>
                <td className="px-6 py-4">{tourist.safetyScore} / 100</td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleViewDetails(tourist)} className="font-medium text-orange-600 dark:text-orange-500 hover:underline">{t('viewDetails')}</button>
                  <button onClick={() => handleGenerateFir(tourist)} className="font-medium text-red-600 dark:text-red-500 hover:underline">{t('generateEFIR')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedTourist && !isFirModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setSelectedTourist(null)}>
            <div className="scale-in-center" onClick={(e) => e.stopPropagation()}>
                <DigitalIdCard 
                    tourist={selectedTourist}
                    isAnalyzing={isAnalyzing === selectedTourist.id}
                    aiAnalysis={analysisCache[selectedTourist.id] || null}
                />
            </div>
        </div>
      )}
      {isFirModalOpen && selectedTourist && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setFirModalOpen(false)}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Generate E-FIR for {selectedTourist.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">This will automatically file a First Information Report for a missing person. Please confirm.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm space-y-2">
                    <p><strong>Name:</strong> {selectedTourist.name}</p>
                    <p><strong>Passport:</strong> {selectedTourist.passportNumber}</p>
                    {selectedTourist.aadhaarNumber && <p><strong>Aadhaar:</strong> {selectedTourist.aadhaarNumber}</p>}
                    <p><strong>Last Known Location:</strong> {selectedTourist.itinerary[selectedTourist.itinerary.length - 1].location}</p>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={() => setFirModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                    <button onClick={() => {alert('E-FIR Generated!'); setFirModalOpen(false);}} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Confirm & Generate</button>
                </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Dashboard;