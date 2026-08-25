export type ProviderType = 'government' | 'ngo' | 'csr' | 'private';

export type VerificationStatus =
  | 'government_verified'
  | 'ngo_verified'
  | 'csr_verified'
  | 'source_verified';

export type ApplicationStatus =
  | 'submitted'
  | 'document_verification'
  | 'eligibility_review'
  | 'department_review'
  | 'approved'
  | 'rejected'
  | 'benefit_disbursed';

export type BenefitStatus = 'processing' | 'received' | 'pending' | 'delayed';

export type DocumentStatus = 'verified' | 'pending' | 'expired' | 'expiring';

export type SchemeCategory =
  | 'education' | 'women' | 'children' | 'senior-citizens'
  | 'healthcare' | 'disability-support' | 'agriculture' | 'employment'
  | 'housing' | 'financial-assistance' | 'entrepreneurship' | 'scholarships';

export interface Scheme {
  id: string;
  name: string;
  provider: string;
  providerType: ProviderType;
  verification: VerificationStatus;
  category: SchemeCategory;
  matchScore: number;
  benefitSummary: string;
  benefitAmount: string;
  deadline: string;
  applicationMethod: string;
  processingTime: string;
  shortExplanation: string;
  overview: string;
  eligibility: string[];
  benefits: string[];
  documentsRequired: string[];
  applicationProcess: string[];
  faqs: { question: string; answer: string }[];
  sources: { name: string; url: string; verified: boolean; lastVerified: string }[];
  reviews: { author: string; rating: number; comment: string; date: string }[];
  matchReasons: { label: string; status: 'match' | 'partial' | 'missing' }[];
}

export interface EligibilityFactor {
  label: string;
  score: number;
  status: 'match' | 'partial' | 'missing';
}

export interface Application {
  id: string;
  schemeId: string;
  schemeName: string;
  provider: string;
  providerType: ProviderType;
  verification: VerificationStatus;
  status: ApplicationStatus;
  submittedDate: string;
  currentStage: string;
  deadline: string;
  timeline: { stage: string; status: 'completed' | 'current' | 'pending'; date?: string }[];
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'identity' | 'income' | 'education' | 'residence' | 'category' | 'other';
  uploadDate: string;
  expiryDate?: string;
  status: DocumentStatus;
}

export interface BenefitItem {
  id: string;
  schemeId: string;
  schemeName: string;
  expectedAmount: number;
  receivedAmount: number;
  expectedDate: string;
  status: BenefitStatus;
  installments: { date: string; amount: number; status: 'received' | 'pending' }[];
}

export interface CategoryInfo {
  id: SchemeCategory;
  name: string;
  description: string;
  icon: string;
  schemeCount: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isDemo?: boolean;
}
