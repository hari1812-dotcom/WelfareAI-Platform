const fs = require('fs');
let file = fs.readFileSync('C:/Users/user/Desktop/WelfareAI-Platform/frontend/src/data/mockData.js', 'utf8');

// Replace mock schemes with original
const newSchemes = [
  ...(file.match(/\{\s*id:\s*'pm-scholarship'[\s\S]*?  \},/g) || []),
  ...(file.match(/\{\s*id:\s*'ayushman-bharat'[\s\S]*?  \},/g) || []),
  ...(file.match(/\{\s*id:\s*'pm-kisan'[\s\S]*?  \},/g) || []),
  ...(file.match(/\{\s*id:\s*'pmay-housing'[\s\S]*?  \},/g) || []),
  `{
    id: 'atal-pension-yojana',
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
    shortExplanation: 'Pension scheme for unorganized sector workers.',
    overview: 'APY is a guaranteed pension scheme administered by PFRDA.',
    eligibility: ['Age 18-40 years', 'Savings bank account', 'Not an income taxpayer'],
    benefits: ['Guaranteed pension after 60', 'Tax benefits'],
    documentsRequired: ['Aadhaar Card', 'Bank Passbook'],
    applicationProcess: ['Visit Bank', 'Fill APY form', 'Auto-debit setup'],
    faqs: [], sources: [], reviews: [], matchReasons: []
  },`,
  `{
    id: 'mudra-loan',
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
    shortExplanation: 'Financial support for small businesses.',
    overview: 'Pradhan Mantri Mudra Yojana funding for micro-enterprises.',
    eligibility: ['Indian Citizen', 'Non-farm business plan'],
    benefits: ['No collateral', 'Low interest'],
    documentsRequired: ['Aadhaar Card', 'Business Plan', 'Income Proof'],
    applicationProcess: ['Visit Bank', 'Submit business plan', 'Loan sanction'],
    faqs: [], sources: [], reviews: [], matchReasons: []
  },`,
  `{
    id: 'stand-up-india',
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
    shortExplanation: 'Facilitates bank loans for SC/ST and women entrepreneurs.',
    overview: 'Stand Up India scheme facilitates bank loans to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.',
    eligibility: ['SC/ST or Woman Entrepreneur', 'Above 18 years of age'],
    benefits: ['Large loan amount', 'Credit guarantee'],
    documentsRequired: ['Aadhaar', 'Caste/Category certificate', 'Project report'],
    applicationProcess: ['Apply via Stand Up India portal', 'Bank evaluation'],
    faqs: [], sources: [], reviews: [], matchReasons: []
  },`
].join('\n');

file = file.replace(/export const schemes = \[[\s\S]*?\];\n/, 'export const schemes = [\n' + newSchemes + '\n];\n');
fs.writeFileSync('C:/Users/user/Desktop/WelfareAI-Platform/frontend/src/data/mockData.js', file);
console.log('done!');
