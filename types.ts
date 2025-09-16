export enum Language {
  EN = 'en',
  HI = 'hi',
  BN = 'bn', // Bengali
  TA = 'ta', // Tamil
  TE = 'te', // Telugu
  MR = 'mr', // Marathi
}

export enum RiskLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface ItineraryItem {
  location: string;
  date: string;
  riskLevel: RiskLevel;
}

export interface Tourist {
  id: string;
  name: string;
  photoUrl: string;
  country: string;
  passportNumber: string;
  aadhaarNumber?: string;
  itinerary: ItineraryItem[];
  emergencyContacts: string[];
  entryDate: string;
  departureDate: string;
  safetyScore: number;
  status: 'Active' | 'Inactive' | 'Distress';
  isTrackingEnabled: boolean;
}

export interface Anomaly {
    id: string;
    touristName: string;
    type: string;
    timestamp: string;
    location: string;
    severity: 'critical' | 'warning' | 'info';
}

export interface AIAnalysis {
  riskSummary: string;
  safetyTips: string[];
}
