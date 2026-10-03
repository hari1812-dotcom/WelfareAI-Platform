export const extraSchemes = [
  // Education & Scholarships
  {
    id: "national-means-cum-merit",
    schemeId: "national-means-cum-merit",
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    provider: "Ministry of Education",
    providerType: "government",
    verification: "government_verified",
    category: "education",
    tags: ["education", "scholarships"],
    matchScore: 92,
    benefitSummary: "Award of 1,00,000 scholarships at ₹12,000 per annum for meritorious students",
    benefitAmount: "₹12,000 / year",
    deadline: "31 Oct 2026",
    applicationMethod: "National Scholarship Portal (NSP)",
    processingTime: "60-90 days",
    shortExplanation: "Provides financial assistance to meritorious students of economically weaker sections to arrest their drop out at class VIII and encourage them to continue study.",
    overview: "Under this scheme, scholarships are awarded to gifted or meritorious students whose parental income is not more than ₹3,50,000 per annum from all sources.",
    eligibility: [
      "Minimum of 55% marks or equivalent grade in Class VII examination (Relaxable by 5% for SC/ST)",
      "Parental income from all sources should not exceed ₹3,50,000 per annum"
    ],
    benefits: [
      "₹12,000 per annum (₹1,000 per month) for classes IX to XII",
      "Direct Benefit Transfer (DBT) into bank accounts"
    ],
    documentsRequired: ["Income Certificate", "Caste Certificate (if applicable)", "Mark sheet of Class VII", "Aadhaar Card", "Bank Passbook"],
    applicationProcess: ["Register and apply on National Scholarship Portal", "Institute level verification", "District/State level verification"],
    matchReasons: [{ label: "Income matches EWS criteria", status: "match" }, { label: "Student age matches", status: "match" }]
  },
  {
    id: "pragati-scholarship",
    schemeId: "pragati-scholarship",
    name: "AICTE Pragati Scholarship for Girls",
    provider: "All India Council for Technical Education",
    providerType: "government",
    verification: "government_verified",
    category: "scholarships",
    tags: ["scholarships", "women", "education"],
    matchScore: 88,
    benefitSummary: "₹50,000 per annum for maximum 4 years for newly admitted girl students",
    benefitAmount: "₹50,000 / year",
    deadline: "30 Nov 2026",
    applicationMethod: "National Scholarship Portal (NSP)",
    processingTime: "45-60 days",
    shortExplanation: "Empowering women through technical education. The scheme provides financial assistance to girls pursuing technical degree/diploma.",
    overview: "Pragati is a MHRD Scheme being implemented by AICTE aimed at providing assistance for Advancement of Girls pursuing Technical Education.",
    eligibility: [
      "Girl student admitted to First year or Second year (lateral entry) of Degree/Diploma course in AICTE approved institution",
      "Maximum two girls per family",
      "Family income less than ₹8 lakh per annum"
    ],
    benefits: [
      "₹50,000 per annum for every year of study",
      "Amount covers college fee, purchase of computer, stationeries, books, etc."
    ],
    documentsRequired: ["Aadhaar Card", "Income Certificate", "Admission Letter", "10th/12th Marksheet", "Bank Mandate Form"],
    applicationProcess: ["Online application via NSP", "Verification by the admitted institution", "Final approval by AICTE"],
    matchReasons: [{ label: "Gender: Female", status: "match" }, { label: "Pursuing Technical Education", status: "match" }]
  },

  // Healthcare
  {
    id: "janani-suraksha-yojana",
    schemeId: "janani-suraksha-yojana",
    name: "Janani Suraksha Yojana (JSY)",
    provider: "Ministry of Health and Family Welfare",
    providerType: "government",
    verification: "government_verified",
    category: "healthcare",
    tags: ["healthcare", "women"],
    matchScore: 96,
    benefitSummary: "Cash assistance of up to ₹1400 for institutional delivery to reduce maternal and neonatal mortality",
    benefitAmount: "Up to ₹1,400 + ASHA incentive",
    deadline: "Rolling",
    applicationMethod: "Local ASHA Worker / Public Health Centre",
    processingTime: "At discharge",
    shortExplanation: "JSY is a safe motherhood intervention under the National Health Mission (NHM).",
    overview: "The scheme integrates cash assistance with delivery and post-delivery care focused on poor pregnant women, primarily in low performing states.",
    eligibility: [
      "Pregnant women belonging to BPL families",
      "Delivering in a government or accredited private health facility"
    ],
    benefits: [
      "Cash assistance of ₹1400 in rural areas and ₹1000 in urban areas",
      "Free delivery and post-natal care under JSSK"
    ],
    documentsRequired: ["MCH (Mother & Child Health) Card", "Aadhaar Card", "Bank Account Details", "BPL Ration Card"],
    applicationProcess: ["Register pregnancy with ASHA worker/ANM", "Get at least 3 ANC checkups", "Deliver at public health facility"],
    matchReasons: [{ label: "Income matches BPL criteria", status: "match" }]
  },
  {
    id: "cgsh-central-govt",
    schemeId: "cgsh-central-govt",
    name: "Central Government Health Scheme (CGHS)",
    provider: "Ministry of Health and Family Welfare",
    providerType: "government",
    verification: "government_verified",
    category: "healthcare",
    tags: ["healthcare", "employment"],
    matchScore: 75,
    benefitSummary: "Comprehensive health care facilities for central govt employees and pensioners",
    benefitAmount: "Cashless Treatment",
    deadline: "N/A",
    applicationMethod: "CGHS Wellness Centres",
    processingTime: "Immediate",
    shortExplanation: "Providing comprehensive medical care to the Central Government employees and pensioners enrolled under the scheme.",
    overview: "CGHS provides comprehensive health care facilities for the Central Govt. employees and pensioners and their dependents residing in CGHS covered cities.",
    eligibility: [
      "All Central Government employees drawing pay from Central Civil Estimates and their dependent family members",
      "Central Govt Pensioners routing their pension through Central Civil Estimate"
    ],
    benefits: [
      "OPD Treatment and medication",
      "Indoor treatment at Government and empanelled hospitals",
      "Cashless facility for pensioners at empanelled centers"
    ],
    documentsRequired: ["CGHS Card", "Proof of employment/pension", "Aadhaar Card"],
    applicationProcess: ["Fill CGHS form through department", "Submit photographs and dependent details", "Collect CGHS Plastic Card"],
    matchReasons: [{ label: "Occupation: Govt Employee", status: "match" }]
  },

  // Employment & Entrepreneurship
  {
    id: "pmegp-employment",
    schemeId: "pmegp-employment",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    provider: "Ministry of MSME",
    providerType: "government",
    verification: "government_verified",
    category: "employment",
    tags: ["employment", "entrepreneurship"],
    matchScore: 89,
    benefitSummary: "Margin money subsidy up to 35% on bank loans for setting up micro-enterprises",
    benefitAmount: "Up to ₹50 Lakh Loan + 35% Subsidy",
    deadline: "Rolling",
    applicationMethod: "KVIC Online Portal",
    processingTime: "30-45 days",
    shortExplanation: "Credit-linked subsidy programme aiming to generate employment opportunities through establishment of micro-enterprises.",
    overview: "PMEGP is a major credit-linked subsidy scheme meant for generating employment opportunities in rural as well as urban areas.",
    eligibility: [
      "Any individual above 18 years of age",
      "Passed VIII standard (for manufacturing projects above ₹10 lakh and business/service above ₹5 lakh)",
      "Only new projects are considered for sanction under PMEGP"
    ],
    benefits: [
      "Maximum project cost: ₹50 lakh in manufacturing sector and ₹20 lakh in service sector",
      "Subsidy of 25% in urban and 35% in rural areas for special categories (SC/ST/OBC/Women)"
    ],
    documentsRequired: ["Project Report", "Aadhaar Card", "Education Qualification Certificate", "Caste Certificate (if applicable)"],
    applicationProcess: ["Submit online application on KVIC portal", "Interview by District Level Task Force (DLTFC)", "Bank sanctions the loan and claims subsidy"],
    matchReasons: [{ label: "Age 18+ verified", status: "match" }, { label: "Seeking Business Loan", status: "match" }]
  },
  {
    id: "nrlm-livelihood",
    schemeId: "nrlm-livelihood",
    name: "Deendayal Antyodaya Yojana-National Rural Livelihoods Mission (DAY-NRLM)",
    provider: "Ministry of Rural Development",
    providerType: "government",
    verification: "government_verified",
    category: "women",
    tags: ["women", "financial-assistance", "employment"],
    matchScore: 91,
    benefitSummary: "Organizing poor rural women into Self Help Groups (SHGs) and providing capital subsidy",
    benefitAmount: "Community Investment Support Fund",
    deadline: "Rolling",
    applicationMethod: "Gram Panchayat / Block Office",
    processingTime: "Varies",
    shortExplanation: "Aims at creating efficient institutional platforms of the rural poor enabling them to increase household income.",
    overview: "DAY-NRLM seeks to mobilize about 9-10 crore rural poor households into Self Help Groups (SHGs) and link them to sustainable livelihood opportunities.",
    eligibility: [
      "Women belonging to rural poor households",
      "Must be willing to join a Self Help Group (SHG) in their village"
    ],
    benefits: [
      "Revolving Fund (RF) of ₹10,000 to ₹15,000 per SHG",
      "Community Investment Support Fund (CISF) up to ₹2.5 lakh per SHG",
      "Interest subvention on bank loans"
    ],
    documentsRequired: ["Aadhaar Card", "BPL/Ration Card", "Bank Account in the name of SHG"],
    applicationProcess: ["Form an SHG of 10-20 women", "Register SHG at Block level", "Open bank account and undergo grading process"],
    matchReasons: [{ label: "Gender: Female", status: "match" }, { label: "Location: Rural", status: "match" }]
  },

  // Housing
  {
    id: "pm-awas-urban",
    schemeId: "pm-awas-urban",
    name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
    provider: "Ministry of Housing and Urban Affairs",
    providerType: "government",
    verification: "government_verified",
    category: "housing",
    tags: ["housing", "financial-assistance"],
    matchScore: 84,
    benefitSummary: "Interest subsidy up to ₹2.67 lakh for buying or constructing a house in urban areas",
    benefitAmount: "Up to ₹2.67 Lakh Subsidy",
    deadline: "31 Dec 2026",
    applicationMethod: "Online / CSC Centers",
    processingTime: "60-90 days",
    shortExplanation: "Housing for All. Provides central assistance to Urban Local Bodies (ULBs) and other implementing agencies for housing.",
    overview: "PMAY-U aims to provide pucca houses with basic amenities to all eligible urban households by the end of the Mission period.",
    eligibility: [
      "Beneficiary family should not own a pucca house anywhere in India",
      "Annual income between ₹3 lakh to ₹18 lakh (depending on EWS/LIG/MIG category)",
      "Property must be co-owned by a female member of the family"
    ],
    benefits: [
      "Credit Linked Subsidy Scheme (CLSS) up to ₹2.67 lakh",
      "Affordable Housing in Partnership (AHP)",
      "Beneficiary-led Construction (BLC) assistance of ₹1.5 lakh"
    ],
    documentsRequired: ["Aadhaar Card", "Income Proof (ITR/Salary Slip)", "Property Documents", "Affidavit declaring no pucca house ownership"],
    applicationProcess: ["Apply online on PMAY MIS portal", "Or approach a lending institution for housing loan (for CLSS)", "Verification by ULB"],
    matchReasons: [{ label: "Income matches LIG criteria", status: "match" }, { label: "No pucca house owned", status: "match" }]
  },
  
  // Agriculture
  {
    id: "pm-fby-crop-insurance",
    schemeId: "pm-fby-crop-insurance",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    provider: "Ministry of Agriculture & Farmers Welfare",
    providerType: "government",
    verification: "government_verified",
    category: "agriculture",
    tags: ["agriculture", "financial-assistance"],
    matchScore: 97,
    benefitSummary: "Comprehensive crop insurance with uniform low premium across seasons",
    benefitAmount: "Crop Loss Compensation",
    deadline: "Kharif: July / Rabi: Dec",
    applicationMethod: "Bank / CSC / PMFBY Portal",
    processingTime: "Post Crop Cutting Experiments",
    shortExplanation: "Provides a comprehensive insurance cover against failure of the crop thus helping in stabilizing the income of farmers.",
    overview: "PMFBY is a crop insurance scheme that integrates multiple stakeholders on a single IT platform to ensure better administration and transparency.",
    eligibility: [
      "All farmers growing notified crops in a notified area",
      "Sharecroppers and tenant farmers are also eligible"
    ],
    benefits: [
      "Maximum premium paid by farmers is 2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops",
      "Coverage for prevented sowing, standing crop loss, post-harvest losses, and localized calamities"
    ],
    documentsRequired: ["Land record (Khasra/Khatauni)", "Aadhaar Card", "Bank passbook", "Sowing certificate issued by Patwari"],
    applicationProcess: ["Apply via PMFBY portal or local bank", "Pay farmer share of premium", "Claim is automatically settled if yield is less than threshold"],
    matchReasons: [{ label: "Occupation: Farmer", status: "match" }]
  },
  {
    id: "kcc-kisan-credit",
    schemeId: "kcc-kisan-credit",
    name: "Kisan Credit Card (KCC) Scheme",
    provider: "NABARD / Banks",
    providerType: "government",
    verification: "government_verified",
    category: "agriculture",
    tags: ["agriculture", "financial-assistance"],
    matchScore: 94,
    benefitSummary: "Provides farmers with timely and adequate credit support for agricultural expenses",
    benefitAmount: "Short-term Credit Limit up to ₹3L at 4%",
    deadline: "Rolling",
    applicationMethod: "Commercial Banks / Co-op Banks",
    processingTime: "14 days",
    shortExplanation: "A credit delivery mechanism that provides adequate and timely credit to farmers under a single window.",
    overview: "The KCC scheme aims to meet the short-term credit requirements for cultivation, post-harvest expenses, consumption requirements, and maintenance of farm assets.",
    eligibility: [
      "Individual farmers/Joint borrowers who are owner cultivators",
      "Tenant farmers, oral lessees and sharecroppers",
      "SHGs or Joint Liability Groups of farmers including tenant farmers"
    ],
    benefits: [
      "Flexible limit to purchase seeds, fertilizers, pesticides",
      "Interest subvention of 2% and prompt repayment incentive of 3% (Effective rate: 4%)",
      "No collateral required for loans up to ₹1.6 lakh"
    ],
    documentsRequired: ["Aadhaar/PAN/Voter ID", "Land documents", "Recent passport size photographs"],
    applicationProcess: ["Fill KCC application form at nearest bank branch", "Submit land details", "Bank issues loan limit and KCC card"],
    matchReasons: [{ label: "Occupation: Farmer", status: "match" }]
  },
  
  // Senior Citizens
  {
    id: "igoaps-pension",
    schemeId: "igoaps-pension",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    provider: "Ministry of Rural Development",
    providerType: "government",
    verification: "government_verified",
    category: "senior-citizens",
    tags: ["senior-citizens", "financial-assistance"],
    matchScore: 85,
    benefitSummary: "Monthly pension of ₹200 to ₹500 for senior citizens below poverty line",
    benefitAmount: "₹200 - ₹500 / month",
    deadline: "Rolling",
    applicationMethod: "Gram Panchayat / Municipality",
    processingTime: "30-60 days",
    shortExplanation: "Non-contributory pension scheme offering financial security to destitute elderly persons.",
    overview: "IGNOAPS is a core component of the National Social Assistance Programme (NSAP) supporting the elderly from BPL households.",
    eligibility: [
      "Applicant must be 60 years or older",
      "Must belong to a Below Poverty Line (BPL) household according to Government of India criteria"
    ],
    benefits: [
      "₹200 per month for persons aged 60-79 years",
      "₹500 per month for persons aged 80 years and above",
      "Many state governments add their own contribution, raising the total pension amount"
    ],
    documentsRequired: ["Age Proof (Aadhaar/Voter ID)", "BPL Card / Income Certificate", "Bank Account Details", "Passport size photograph"],
    applicationProcess: ["Obtain application form from Block Development Office or Gram Panchayat", "Submit completed form with documents", "Amount credited directly via DBT"],
    matchReasons: [{ label: "Age 60+ verified", status: "match" }, { label: "Income matches BPL criteria", status: "match" }]
  }
];
