import { Tourist, RiskLevel, Anomaly } from './types';

export const RISK_ZONES: { [key: string]: RiskLevel } = {
  'Himalayan High Pass': RiskLevel.HIGH,
  'Sundarbans Mangrove Forest': RiskLevel.HIGH,
  'Chandni Chowk, Delhi': RiskLevel.MEDIUM,
  'Varanasi Ghats': RiskLevel.MEDIUM,
  'Beaches of Goa': RiskLevel.LOW,
  'Backwaters of Kerala': RiskLevel.LOW,
};

export const SAMPLE_TOURISTS: Tourist[] = [
  {
    id: 'bcdb2a75-2d4d-4447-a720-75d5e2d6b38c',
    name: 'Rachana',
    photoUrl: 'https://picsum.photos/seed/rachana/200',
    country: 'India',
    passportNumber: 'R1234567',
    aadhaarNumber: '1234 5678 9012',
    itinerary: [
      { location: 'Beaches of Goa', date: '2024-07-20', riskLevel: RiskLevel.LOW },
      { location: 'Himalayan High Pass', date: '2024-07-22', riskLevel: RiskLevel.HIGH },
    ],
    emergencyContacts: ['+91-9876543210', '+91-9988776655'],
    entryDate: '2024-07-19',
    departureDate: '2024-07-26',
    safetyScore: 65,
    status: 'Active',
    isTrackingEnabled: true,
  },
  {
    id: 'f9d3b3c3-5a6b-4c8d-9a0e-1f2g3h4i5j6k',
    name: 'Adarsh',
    photoUrl: 'https://picsum.photos/seed/adarsh/200',
    country: 'USA',
    passportNumber: 'A87654321',
    itinerary: [
      { location: 'Chandni Chowk, Delhi', date: '2024-07-21', riskLevel: RiskLevel.MEDIUM },
      { location: 'Varanasi Ghats', date: '2024-07-23', riskLevel: RiskLevel.MEDIUM },
    ],
    emergencyContacts: ['+1-555-123-4567'],
    entryDate: '2024-07-20',
    departureDate: '2024-07-25',
    safetyScore: 92,
    status: 'Active',
    isTrackingEnabled: false,
  },
   {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Advith',
    photoUrl: 'https://picsum.photos/seed/advith/200',
    country: 'India',
    passportNumber: 'M55544433',
    aadhaarNumber: '9876 5432 1098',
    itinerary: [
      { location: 'Sundarbans Mangrove Forest', date: '2024-07-22', riskLevel: RiskLevel.HIGH },
    ],
    emergencyContacts: ['+91-8765432109'],
    entryDate: '2024-07-21',
    departureDate: '2024-07-24',
    safetyScore: 45,
    status: 'Distress',
    isTrackingEnabled: true,
  },
];

export const SAMPLE_ANOMALIES: Anomaly[] = [
    {
        id: '1',
        touristName: 'Advith',
        type: 'Sudden Location Drop-off',
        timestamp: '2024-07-22 14:30 UTC',
        location: 'Sundarbans Mangrove Forest',
        severity: 'critical',
    },
    {
        id: '2',
        touristName: 'Rachana',
        type: 'Prolonged Inactivity',
        timestamp: '2024-07-23 09:00 UTC',
        location: 'Himalayan High Pass',
        severity: 'warning',
    },
    {
        id: '3',
        touristName: 'Adarsh',
        type: 'Itinerary Deviation',
        timestamp: '2024-07-21 11:00 UTC',
        location: 'Unknown Village Area',
        severity: 'info',
    }
];

export const TOURIST_CLUSTERS_DATA = [
    { name: 'Goa (Beaches)', tourists: 450 },
    { name: 'Himalayas', tourists: 280 },
    { name: 'Golden Triangle', tourists: 780 },
    { name: 'Kerala (Backwaters)', tourists: 620 },
    { name: 'National Parks', tourists: 150 },
];

const commonTranslations = {
    appTitle: { en: 'Smart Tourist Safety Monitoring', hi: 'स्मार्ट पर्यटक सुरक्षा निगरानी', bn: 'স্মার্ট ট্যুরিস্ট সেফটি মনিটরিং', ta: 'ஸ்மார்ட் சுற்றுலாப் பயணி பாதுகாப்பு கண்காணிப்பு', te: 'స్మార్ట్ టూరిస్ట్ సేఫ్టీ మానిటరింగ్', mr: 'स्मार्ट पर्यटक सुरक्षा देखरेख' },
    authorityDashboard: { en: 'Authority Dashboard', hi: 'प्राधिकरण डैशबोर्ड', bn: 'কর্তৃপক্ষ ড্যাশবোর্ড', ta: 'அதிகார டாஷ்போர்டு', te: 'అధికార డాష్‌బోర్డ్', mr: 'प्राधिकरण डॅशबोर्ड' },
    registerTourist: { en: 'Register New Tourist', hi: 'नया पर्यटक पंजीकृत करें', bn: 'নতুন পর্যটক নিবন্ধন করুন', ta: 'புதிய சுற்றுலாப் பயணியைப் பதிவு செய்யுங்கள்', te: 'కొత్త పర్యాటకుడిని నమోదు చేయండి', mr: 'नवीन पर्यटक नोंदणी करा' },
    touristClusters: { en: 'Tourist Clusters', hi: 'पर्यटक क्लस्टर', bn: 'পর্যটক ক্লাস্টার', ta: 'சுற்றுலாப் பயணிகள் கிளஸ்டர்கள்', te: 'పర్యాటక క్లస్టర్‌లు', mr: 'पर्यटक क्लस्टर्स' },
    highRiskZones: { en: 'High-Risk Zone Heatmap', hi: 'उच्च जोखिम क्षेत्र हीटमैप', bn: 'উচ্চ-ঝুঁকিপূর্ণ অঞ্চল হিটম্যাপ', ta: 'அதிக ஆபத்துள்ள மண்டல வெப்ப வரைபடம்', te: 'అధిక-ప్రమాద జోన్ హీట్‌మ్యాప్', mr: 'उच्च-जोखीम क्षेत्र हीटमॅप' },
    aiAnomalyAlerts: { en: 'AI Anomaly Alerts', hi: 'एआई विसंगति अलर्ट', bn: 'এআই অ্যানোমালি সতর্কতা', ta: 'AI ஒழுங்கின்மை எச்சரிக்கைகள்', te: 'AI అసాధారణ హెచ్చరికలు', mr: 'एआय विसंगती सूचना' },
    registeredTourists: { en: 'Registered Tourists', hi: 'पंजीकृत पर्यटक', bn: 'নিবন্ধিত পর্যটক', ta: 'பதிவுசெய்யப்பட்ட சுற்றுலாப் பயணிகள்', te: 'నమోదిత పర్యాటకులు', mr: 'नोंदणीकृत पर्यटक' },
    name: { en: 'Name', hi: 'नाम', bn: 'নাম', ta: 'பெயர்', te: 'పేరు', mr: 'नाव' },
    country: { en: 'Country', hi: 'देश', bn: 'দেশ', ta: 'நாடு', te: 'దేశం', mr: 'देश' },
    status: { en: 'Status', hi: 'स्थिति', bn: 'স্ট্যাটাস', ta: 'நிலை', te: 'స్థితి', mr: 'स्थिती' },
    safetyScore: { en: 'Safety Score', hi: 'सुरक्षा स्कोर', bn: 'নিরাপত্তা স্কোর', ta: 'பாதுகாப்பு மதிப்பெண்', te: 'భద్రతా స్కోర్', mr: 'सुरक्षा गुण' },
    actions: { en: 'Actions', hi: 'कार्रवाई', bn: 'செயல்பாடுகள்', ta: 'நடவடிக்கைகள்', te: 'చర్యలు', mr: 'क्रिया' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें', bn: 'বিস্তারিত দেখুন', ta: 'விவரங்களைக் காண்க', te: 'వివరాలను వీక్షించండి', mr: 'तपशील पहा' },
    generateEFIR: { en: 'Generate E-FIR', hi: 'ई-एफआईआर उत्पन्न करें', bn: 'ই-এফআইআর তৈরি করুন', ta: 'E-FIR உருவாக்கவும்', te: 'E-FIRని రూపొందించండి', mr: 'ई-एफआयआर तयार करा' },
    active: { en: 'Active', hi: 'सक्रिय', bn: 'সক্রিয়', ta: 'செயலில்', te: 'క్రియాశీలం', mr: 'सक्रिय' },
    inactive: { en: 'Inactive', hi: 'निष्क्रिय', bn: 'নিষ্ক্রিয়', ta: 'செயலற்றது', te: 'క్రియారహితం', mr: 'निष्क्रिय' },
    distress: { en: 'Distress', hi: 'संकट', bn: 'দুর্দশা', ta: 'துன்பம்', te: 'ఆపద', mr: 'संकट' },
    critical: { en: 'Critical', hi: 'गंभीर', bn: 'সংকটজনক', ta: 'சிக்கலான', te: 'క్లిష్టమైనది', mr: 'गंभीर' },
    warning: { en: 'Warning', hi: 'चेतावनी', bn: 'সতর্কতা', ta: 'எச்சரிக்கை', te: 'హెచ్చరిక', mr: 'चेतावणी' },
    info: { en: 'Info', hi: 'सूचना', bn: 'তথ্য', ta: 'தகவல்', te: 'సమాచారం', mr: 'माहिती' },
    digitalId: { en: 'Digital Tourist ID', hi: 'डिजिटल पर्यटक आईडी', bn: 'ডিজিটাল ট্যুরিস্ট আইডি', ta: 'டிஜிட்டல் சுற்றுலா அடையாள அட்டை', te: 'డిజిటల్ టూరిస్ట్ ID', mr: 'डिजिटल पर्यटक ओळखपत्र' },
    passportNo: { en: 'Passport No.', hi: 'पासपोर्ट नंबर', bn: 'পাসপোর্ট নম্বর', ta: 'கடவுச்சீட்டு எண்', te: 'పాస్‌పోర్ట్ నెం.', mr: 'पासपोर्ट क्र.' },
    aadhaarNo: { en: 'Aadhaar No.', hi: 'आधार संख्या', bn: 'আধার নম্বর', ta: 'ஆதார் எண்', te: 'ఆధార్ నెం.', mr: 'आधार क्र.' },
    entryDate: { en: 'Entry Date', hi: 'प्रवेश तिथि', bn: 'প্রবেশের তারিখ', ta: 'நுழைவு தேதி', te: 'ప్రవేశ తేదీ', mr: 'प्रवेश तारीख' },
    departureDate: { en: 'Departure Date', hi: 'प्रस्थान तिथि', bn: 'প্রস্থানের তারিখ', ta: 'புறப்படும் தேதி', te: 'బయలుదేరే తేదీ', mr: 'प्रस्थान तारीख' },
    itinerary: { en: 'Itinerary', hi: 'यात्रा कार्यक्रम', bn: 'ভ্রমণসূচী', ta: 'பயணத்திட்டம்', te: 'ప్రయాణం', mr: 'प्रवासाचा कार्यक्रम' },
    emergencyContacts: { en: 'Emergency Contacts', hi: 'आपातकालीन संपर्क', bn: 'জরুরী যোগাযোগ', ta: 'அவசர தொடர்புகள்', te: 'అత్యవసర పరిచయాలు', mr: 'आपत्कालीन संपर्क' },
    blockchainVerified: { en: 'Blockchain Verified', hi: 'ब्लॉकचेन सत्यापित', bn: 'ব্লকচেন যাচাইকৃত', ta: 'பிளாக்செயின் சரிபார்க்கப்பட்டது', te: 'బ్లాక్‌చెయిన్ ధృవీకరించబడింది', mr: 'ब्लॉकचेन सत्यापित' },
    realTimeTracking: { en: 'Real-Time Tracking', hi: 'वास्तविक समय ट्रैकिंग', bn: 'রিয়েল-টাইম ট্র্যাকিং', ta: 'நிகழ்நேர கண்காணிப்பு', te: 'నిజ-సమయ ట్రాకింగ్', mr: 'वास्तविक-वेळ ट्रॅकिंग' },
    enabled: { en: 'Enabled', hi: 'सक्षम', bn: 'সক্ষম', ta: 'இயக்கப்பட்டது', te: 'ప్రారంభించబడింది', mr: 'सक्षम' },
    disabled: { en: 'Disabled', hi: 'अक्षम', bn: 'অক্ষম', ta: 'முடக்கப்பட்டது', te: 'నిలిపివేయబడింది', mr: 'अक्षम' },
    panicButton: { en: 'PANIC', hi: 'आपातकाल', bn: 'আতঙ্ক', ta: 'அவசரம்', te: 'భయం', mr: 'आतंक' },
    panicAlertTitle: { en: 'Panic Alert Activated!', hi: 'पैनिक अलर्ट सक्रिय!', bn: 'প্যানিক অ্যালার্ট সক্রিয়!', ta: 'அவசர எச்சரிக்கை செயல்படுத்தப்பட்டது!', te: 'పానిక్ హెచ్చరిక సక్రియం చేయబడింది!', mr: 'पॅनिक अलर्ट सक्रिय!' },
    panicAlertBody: { en: 'Your live location has been shared with the nearest police unit and your emergency contacts. Help is on the way.', hi: 'आपका लाइव स्थान निकटतम पुलिस इकाई और आपके आपातकालीन संपर्कों के साथ साझा किया गया है। मदद रास्ते में है।', bn: 'আপনার লাইভ অবস্থান নিকটতম পুলিশ ইউনিট এবং আপনার জরুরি পরিচিতিগুলির সাথে শেয়ার করা হয়েছে। সাহায্য আসছে।', ta: 'உங்கள் நேரடி இருப்பிடம் அருகிலுள்ள காவல் பிரிவு மற்றும் உங்கள் அவசர தொடர்புகளுடன் பகிரப்பட்டுள்ளது. உதவி வழியில் உள்ளது.', te: 'మీ ప్రత్యక్ష స్థానం సమీపంలోని పోలీసు యూనిట్ మరియు మీ అత్యవసర పరిచయాలతో భాగస్వామ్యం చేయబడింది. సహాయం మార్గంలో ఉంది.', mr: 'तुमचे थेट स्थान जवळच्या पोलीस युनिट आणि तुमच्या आपत्कालीन संपर्कांसह सामायिक केले गेले आहे. मदत मार्गावर आहे.' },
    close: { en: 'Close', hi: 'बंद करें', bn: 'বন্ধ করুন', ta: 'மூடு', te: 'మూసివేయండి', mr: 'बंद करा' },
    fullName: { en: 'Full Name', hi: 'पूरा नाम', bn: 'পুরো নাম', ta: 'முழு பெயர்', te: 'పూర్తి పేరు', mr: 'पूर्ण नाव' },
    countryOfOrigin: { en: 'Country of Origin', hi: 'मूल देश', bn: 'মূল দেশ', ta: 'பிறந்த நாடு', te: 'మూల దేశం', mr: 'मूळ देश' },
    passportNumber: { en: 'Passport Number', hi: 'पासपोर्ट संख्या', bn: 'পাসপোর্ট নম্বর', ta: 'கடவுச்சீட்டு எண்', te: 'పాస్‌పోర్ట్ సంఖ్య', mr: 'पासपोर्ट क्रमांक' },
    aadhaarNumber: { en: 'Aadhaar Number (Optional)', hi: 'आधार संख्या (वैकल्पिक)', bn: 'আধার নম্বর (ঐচ্ছিক)', ta: 'ஆதார் எண் (விருப்பத்தேர்வு)', te: 'ఆధార్ సంఖ్య (ఐచ్ఛికం)', mr: 'आधार क्रमांक (पर्यायी)' },
    addLocation: { en: 'Add Location', hi: 'स्थान जोड़ें', bn: 'অবস্থান যোগ করুন', ta: 'இடத்தைச் சேர்க்கவும்', te: 'స్థానాన్ని జోడించండి', mr: 'स्थान जोडा' },
    addContact: { en: 'Add Contact', hi: 'संपर्क जोड़ें', bn: 'যোগাযোগ যোগ করুন', ta: 'தொடர்பைச் சேர்க்கவும்', te: 'పరిచయాన్ని జోడించండి', mr: 'संपर्क जोडा' },
    submitRegistration: { en: 'Submit Registration', hi: 'पंजीकरण जमा करें', bn: 'নিবন্ধন জমা দিন', ta: 'பதிவைச் சமர்ப்பிக்கவும்', te: 'నమోదును సమర్పించండి', mr: 'नोंदणी सादर करा' },
    location: { en: 'Location', hi: 'स्थान', bn: 'অবস্থান', ta: 'இடம்', te: 'స్థానం', mr: 'स्थान' },
    date: { en: 'Date', hi: 'तारीख', bn: 'তারিখ', ta: 'தேதி', te: 'తేదీ', mr: 'तारीख' },
    contactNumber: { en: 'Contact Number', hi: 'संपर्क नंबर', bn: 'যোগাযোগ নম্বর', ta: 'தொடர்பு எண்', te: 'సంప్రదింపు సంఖ్య', mr: 'संपर्क क्रमांक' },
};

const buildTranslations = () => {
    const translations: { [lang: string]: { [key: string]: string } } = {};
    Object.keys(commonTranslations).forEach(key => {
        const keyTranslations = commonTranslations[key as keyof typeof commonTranslations];
        Object.keys(keyTranslations).forEach(lang => {
            if (!translations[lang]) {
                translations[lang] = {};
            }
            translations[lang][key] = keyTranslations[lang as keyof typeof keyTranslations];
        });
    });
    return translations;
};

export const TRANSLATIONS = buildTranslations();