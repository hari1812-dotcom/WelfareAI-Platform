import { Scheme } from '../models/Scheme.js';
import { SchemeEligibility } from '../models/SchemeEligibility.js';

export const recommendSchemes = async (req, res) => {
  try {
    const user = req.user;

    if (!user.state) return res.json([]);
    const socialCategory = user.socialCategory || 'General';

    const matchCriteria = {
      State: user.state,
      Category: socialCategory,
    };
    if (user.age) {
      matchCriteria.Age = { $gte: user.age - 10, $lte: user.age + 10 };
    }
    const annualIncome = user.annualIncomeINR || Number.parseInt(user.income, 10);
    if (annualIncome) {
      matchCriteria.Annual_Income_INR = {
        $gte: Math.round(annualIncome * 0.5),
        $lte: Math.round(annualIncome * 1.5),
      };
    }

    let eligibleRecords = await SchemeEligibility.find(matchCriteria).limit(100);

    if (eligibleRecords.length === 0) {
      const broaderCriteria = { State: user.state, Category: socialCategory };
      eligibleRecords = await SchemeEligibility.find(broaderCriteria).limit(100);
    }

    // Get unique scheme names from matched rows
    const eligibleSchemeNames = [...new Set(eligibleRecords.map(r => r.Eligible_Scheme))];

    const schemeIdMap = {
      'National Scholarship': 'pm-scholarship',
      'Ayushman Bharat': 'ayushman-bharat',
      'PM Kisan': 'pm-kisan',
      'PM Awas Yojana': 'pmay-housing',
      'Atal Pension Yojana': 'atal-pension-yojana',
      'Mudra Loan': 'mudra-loan',
      'Stand Up India': 'stand-up-india',
    };

    const matchedSchemeIds = eligibleSchemeNames.map(n => schemeIdMap[n]).filter(Boolean);
    const uniqueSchemeIds = [...new Set(matchedSchemeIds)];

    const schemes = await Scheme.find({ schemeId: { $in: uniqueSchemeIds } });
    const categoryRules = {
      'pm-scholarship': ['SC'],
    };
    const categoryMatchedSchemes = schemes.filter((scheme) => {
      const allowedCategories = scheme.eligibleCategories?.length
        ? scheme.eligibleCategories
        : categoryRules[scheme.schemeId];
      return !allowedCategories || allowedCategories.includes(socialCategory);
    });

    // Compute a per-user match score: boost schemes that appear more in eligible records
    const schemeFrequency = {};
    for (const record of eligibleRecords) {
      const sid = schemeIdMap[record.Eligible_Scheme];
      if (sid) schemeFrequency[sid] = (schemeFrequency[sid] || 0) + 1;
    }
    const maxFreq = Math.max(...Object.values(schemeFrequency), 1);

    const scoredSchemes = categoryMatchedSchemes.map(s => {
      const freq = schemeFrequency[s.schemeId] || 0;
      const dynamicScore = Math.round(60 + (freq / maxFreq) * 35);
      return { ...s.toObject(), matchScore: dynamicScore };
    }).sort((a, b) => b.matchScore - a.matchScore);

    res.json(scoredSchemes);
  } catch (error) {
    console.error('Error recommending schemes:', error);
    res.status(500).json({ message: 'Failed to recommend schemes' });
  }
};

export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get schemes' });
  }
};
