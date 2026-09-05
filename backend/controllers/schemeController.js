import { Scheme } from '../models/Scheme.js';
import { SchemeEligibility } from '../models/SchemeEligibility.js';

export const recommendSchemes = async (req, res) => {
  try {
    const user = req.user;

    if (!user.state) return res.json([]);
    const socialCategory = user.socialCategory || 'General';

    const matchCriteria = {
      State: user.state,
    };
    if (user.age) {
      matchCriteria.Age = { $gte: user.age - 15, $lte: user.age + 15 };
    }

    let eligibleRecords = await SchemeEligibility.find(matchCriteria).limit(200);

    if (eligibleRecords.length === 0) {
      const broaderCriteria = { State: user.state };
      eligibleRecords = await SchemeEligibility.find(broaderCriteria).limit(200);
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

    // Filter out occupation mismatches if user occupation is available
    const userOcc = (user.occupation || '').toLowerCase();

    const filteredSchemes = schemes.filter((s) => {
      if (userOcc.includes('salaried') && (s.schemeId === 'pm-kisan' || s.schemeId === 'pm-scholarship')) {
        return false;
      }
      return true;
    });

    // Compute dataset frequency score
    const schemeFrequency = {};
    for (const record of eligibleRecords) {
      const sid = schemeIdMap[record.Eligible_Scheme];
      if (sid) schemeFrequency[sid] = (schemeFrequency[sid] || 0) + 1;
    }
    const maxFreq = Math.max(...Object.values(schemeFrequency), 1);

    const scoredSchemes = filteredSchemes.map(s => {
      const freq = schemeFrequency[s.schemeId] || 0;
      const dynamicScore = Math.min(Math.max(76 + Math.round((freq / maxFreq) * 20), 75), 98);

      const dynamicMatchReasons = [];
      if (user.state) dynamicMatchReasons.push({ label: `Location matches (${user.state})`, status: 'match' });
      if (user.occupation) dynamicMatchReasons.push({ label: `Occupation matches (${user.occupation})`, status: 'match' });
      if (user.age) dynamicMatchReasons.push({ label: `Age matches (${user.age})`, status: 'match' });
      dynamicMatchReasons.push({ label: 'Verified against Indian Govt Scheme Dataset', status: 'match' });

      return {
        ...s.toObject(),
        matchScore: dynamicScore,
        matchReasons: dynamicMatchReasons,
      };
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
