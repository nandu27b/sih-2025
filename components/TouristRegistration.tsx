
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { ItineraryItem, RiskLevel, Tourist } from '../types';
import { RISK_ZONES } from '../constants';
import { PlusCircleIcon, TrashIcon } from './icons/Icons';

const TouristRegistration: React.FC = () => {
    const context = useContext(AppContext);
    
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [passport, setPassport] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
    const [departureDate, setDepartureDate] = useState('');
    const [itinerary, setItinerary] = useState<Partial<ItineraryItem>[]>([{ location: '', date: '' }]);
    const [contacts, setContacts] = useState<string[]>(['']);

    if (!context) return null;
    const { t, addTourist } = context;

    const handleItineraryChange = (index: number, field: keyof ItineraryItem, value: string) => {
        const newItinerary = [...itinerary];
        newItinerary[index] = { ...newItinerary[index], [field]: value };
        setItinerary(newItinerary);
    };

    const addItineraryItem = () => setItinerary([...itinerary, { location: '', date: '' }]);
    const removeItineraryItem = (index: number) => setItinerary(itinerary.filter((_, i) => i !== index));

    const handleContactChange = (index: number, value: string) => {
        const newContacts = [...contacts];
        newContacts[index] = value;
        setContacts(newContacts);
    };

    const addContactItem = () => setContacts([...contacts, '']);
    const removeContactItem = (index: number) => setContacts(contacts.filter((_, i) => i !== index));

    const calculateSafetyScore = (items: ItineraryItem[]): number => {
        if (items.length === 0) return 100;
        let totalRisk = 0;
        items.forEach(item => {
            if (item.riskLevel === RiskLevel.HIGH) totalRisk += 100;
            else if (item.riskLevel === RiskLevel.MEDIUM) totalRisk += 50;
            else totalRisk += 10;
        });
        const avgRisk = totalRisk / items.length;
        return Math.max(0, 100 - Math.round(avgRisk));
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalItinerary: ItineraryItem[] = itinerary
            .filter(item => item.location && item.date)
            .map(item => ({
                location: item.location!,
                date: item.date!,
                riskLevel: RISK_ZONES[item.location!] || RiskLevel.LOW
            }));

        const newTourist: Tourist = {
            id: crypto.randomUUID(),
            name,
            country,
            passportNumber: passport,
            aadhaarNumber: aadhaar,
            entryDate,
            departureDate,
            itinerary: finalItinerary,
            emergencyContacts: contacts.filter(c => c),
            photoUrl: `https://picsum.photos/seed/${name.split(' ').join('')}/200`,
            safetyScore: calculateSafetyScore(finalItinerary),
            status: 'Active',
            isTrackingEnabled: true,
        };
        addTourist(newTourist);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('registerTourist')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder={t('fullName')} value={name} onChange={e => setName(e.target.value)} required className="input-field"/>
                    <input type="text" placeholder={t('countryOfOrigin')} value={country} onChange={e => setCountry(e.target.value)} required className="input-field"/>
                    <input type="text" placeholder={t('passportNumber')} value={passport} onChange={e => setPassport(e.target.value)} required className="input-field"/>
                    <input type="text" placeholder={t('aadhaarNumber')} value={aadhaar} onChange={e => setAadhaar(e.target.value)} className="input-field"/>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">{t('entryDate')}</label>
                        <input type="date" value={entryDate} onChange={e => setEntryDate(e.target.value)} required className="input-field"/>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">{t('departureDate')}</label>
                        <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} required className="input-field"/>
                    </div>
                </div>

                {/* Itinerary */}
                <div className="space-y-3">
                    <h3 className="font-semibold">{t('itinerary')}</h3>
                    {itinerary.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input list="locations" placeholder={t('location')} value={item.location} onChange={e => handleItineraryChange(index, 'location', e.target.value)} className="input-field flex-grow"/>
                            <datalist id="locations">
                                {Object.keys(RISK_ZONES).map(zone => <option key={zone} value={zone} />)}
                            </datalist>
                            <input type="date" value={item.date} onChange={e => handleItineraryChange(index, 'date', e.target.value)} className="input-field"/>
                            <button type="button" onClick={() => removeItineraryItem(index)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon/></button>
                        </div>
                    ))}
                    <button type="button" onClick={addItineraryItem} className="flex items-center text-sm text-orange-600 hover:underline"><PlusCircleIcon className="mr-1"/>{t('addLocation')}</button>
                </div>

                {/* Emergency Contacts */}
                <div className="space-y-3">
                    <h3 className="font-semibold">{t('emergencyContacts')}</h3>
                    {contacts.map((contact, index) => (
                         <div key={index} className="flex items-center gap-2">
                            <input type="text" placeholder={t('contactNumber')} value={contact} onChange={e => handleContactChange(index, e.target.value)} className="input-field flex-grow"/>
                            <button type="button" onClick={() => removeContactItem(index)} className="p-2 text-red-500 hover:text-red-700"><TrashIcon/></button>
                        </div>
                    ))}
                    <button type="button" onClick={addContactItem} className="flex items-center text-sm text-orange-600 hover:underline"><PlusCircleIcon className="mr-1"/>{t('addContact')}</button>
                </div>

                <style>{`.input-field { background-color: #f3f4f6; color: #1f2937; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.75rem 1rem; width: 100%;} .dark .input-field { background-color: #374151; color: #f9fafb; border-color: #4b5563; }`}</style>

                <button type="submit" className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">{t('submitRegistration')}</button>
            </form>
        </div>
    );
};

export default TouristRegistration;