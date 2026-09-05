import 'dotenv/config';
import mongoose from 'mongoose';
import { Scheme } from './models/Scheme.js';
import { SchemeEligibility } from './models/SchemeEligibility.js';
import { connectDB } from './config/db.js';
import fs from 'fs';

const originalSchemes = [
  {
    schemeId: 'pm-scholarship',
    name: 'Post-Matric Scholarship for SC Students',
    provider: 'Ministry of Social Justice',
    providerType: 'government',
    verification: 'government_verified',
    category: 'scholarships',
    eligibleCategories: ['SC'],
    matchScore: 92,
    benefitSummary: 'Up to ₹50,000 per year for tuition and maintenance',
    benefitAmount: '₹50,000/year',
    deadline: '31 Oct 2026',
    applicationMethod: 'Online portal',
    processingTime: '60-90 days',
    shortExplanation: 'Financial support for higher education of students from Scheduled Caste communities.'
  },
  {
    schemeId: 'ayushman-bharat',
    name: 'Ayushman Bharat PM-JAY',
    provider: 'National Health Authority',
    providerType: 'government',
    verification: 'government_verified',
    category: 'healthcare',
    matchScore: 88,
    benefitSummary: 'Health coverage up to ₹5 lakh per family per year',
    benefitAmount: '₹5 lakh/year',
    deadline: 'Rolling enrollment',
    applicationMethod: 'Online + CSC',
    processingTime: 'Same day',
    shortExplanation: 'Free health insurance coverage for eligible families at empaneled hospitals nationwide.'
  },
  {
    schemeId: 'pm-kisan',
    name: 'PM-KISAN Samman Nidhi',
    provider: 'Ministry of Agriculture',
    providerType: 'government',
    verification: 'government_verified',
    category: 'agriculture',
    matchScore: 85,
    benefitSummary: '₹6,000 per year in three installments for farmers',
    benefitAmount: '₹6,000/year',
    deadline: 'Rolling enrollment',
    applicationMethod: 'Online portal / CSC',
    processingTime: '30-45 days',
    shortExplanation: 'Direct income support for small and marginal farmers to supplement financial needs.'
  },
  {
    schemeId: 'pmay-housing',
    name: 'Pradhan Mantri Awas Yojana (Urban)',
    provider: 'Ministry of Housing and Urban Affairs',
    providerType: 'government',
    verification: 'government_verified',
    category: 'housing',
    matchScore: 76,
    benefitSummary: 'Subsidized home loan up to ₹2.67 lakh interest subsidy',
    benefitAmount: '₹2.67 lakh subsidy',
    deadline: '31 Dec 2026',
    applicationMethod: 'Online portal',
    processingTime: '90-120 days',
    shortExplanation: 'Interest subsidy on home loans for economically weaker and low-income groups to own a house.'
  },
  {
    schemeId: 'atal-pension-yojana',
    name: 'Atal Pension Yojana',
    provider: 'PFRDA',
    providerType: 'government',
    verification: 'government_verified',
    category: 'financial-assistance',
    matchScore: 89,
    benefitSummary: 'Guaranteed minimum pension of ₹1,000 to ₹5,000 per month',
    benefitAmount: '₹1,000 - ₹5,000/month',
    deadline: 'Rolling enrollment',
    applicationMethod: 'Bank Branch / Online',
    processingTime: '7-15 days',
    shortExplanation: 'Pension scheme for unorganized sector workers.'
  },
  {
    schemeId: 'mudra-loan',
    name: 'Mudra Loan',
    provider: 'Ministry of Finance',
    providerType: 'government',
    verification: 'government_verified',
    category: 'entrepreneurship',
    matchScore: 82,
    benefitSummary: 'Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises',
    benefitAmount: 'Up to ₹10 lakh',
    deadline: 'Rolling',
    applicationMethod: 'Bank / Online',
    processingTime: '15-30 days',
    shortExplanation: 'Financial support for small businesses.'
  },
  {
    schemeId: 'stand-up-india',
    name: 'Stand Up India',
    provider: 'Department of Financial Services',
    providerType: 'government',
    verification: 'government_verified',
    category: 'entrepreneurship',
    matchScore: 78,
    benefitSummary: 'Bank loans between ₹10 lakh and ₹1 Crore',
    benefitAmount: '₹10L - ₹1Cr',
    deadline: 'Rolling',
    applicationMethod: 'Online portal',
    processingTime: '30 days',
    shortExplanation: 'Facilitates bank loans for SC/ST and women entrepreneurs.'
  }
];

const seedData = async () => {
  try {
    await connectDB();
    await Scheme.deleteMany();
    await SchemeEligibility.deleteMany();

    await Scheme.insertMany(originalSchemes);
    console.log('Schemes inserted successfully');

    let rawData = fs.readFileSync('c:/Users/user/Desktop/WelfareAI-Platform/frontend/src/data/dataset.json');
    let dataset = JSON.parse(rawData);
    
    // cast numbers
    dataset = dataset.map(row => ({
      Age: Number(row.Age),
      Annual_Income_INR: Number(row.Annual_Income_INR),
      State: row.State,
      Category: row.Category,
      Eligible_Scheme: row.Eligible_Scheme
    }));

    await SchemeEligibility.insertMany(dataset);
    console.log('Dataset inserted successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
