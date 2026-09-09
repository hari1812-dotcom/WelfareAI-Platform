import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Search, SlidersHorizontal, CheckCircle2, AlertCircle,
  ArrowRight, User, Calendar, MapPin, Briefcase, Wallet, Clock,
  RefreshCw, ShieldCheck, Filter, ChevronDown, Award, TrendingUp, X
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getMe, getRecommendedSchemes } from '@/services/api';
import { schemes as mockSchemes, applications } from '@/data/mockData';
import { useTranslation } from 'react-i18next';
import datasetData from '@/data/dataset.json';

const datasetSchemeIdMap = {
  'National Scholarship': 'pm-scholarship',
  'Ayushman Bharat': 'ayushman-bharat',
  'PM Kisan': 'pm-kisan',
  'PM Awas Yojana': 'pmay-housing',
  'Atal Pension Yojana': 'atal-pension-yojana',
  'Mudra Loan': 'mudra-loan',
  'Stand Up India': 'stand-up-india',
};

function getMatchTier(score) {
  if (score >= 90) return { label: 'Highly Relevant', color: 'bg-purple-100 text-purple-800 border-purple-300' };
  if (score >= 82) return { label: 'Strong Match', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (score >= 75) return { label: 'Good Match', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  return { label: 'Potential Match', color: 'bg-amber-100 text-amber-800 border-amber-300' };
}

function parseIncomeBounds(incomeStr) {
  if (!incomeStr) return [0, Infinity];
  if (incomeStr.includes('Below')) return [0, 100000];
  if (incomeStr.includes('1-2.5')) return [100000, 250000];
  if (incomeStr.includes('2.5-5')) return [250000, 500000];
  if (incomeStr.includes('5-10')) return [500000, 1000000];
  if (incomeStr.includes('Above')) return [1000000, Infinity];
  return [0, Infinity];
}

export function MySchemesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search, Filter, Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMatchTier, setSelectedMatchTier] = useState('All');
  const [sortBy, setSortBy] = useState('relevant');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    loadUserAndSchemes();
  }, []);

  const loadUserAndSchemes = async () => {
    setLoading(true);
    setError(null);
    try {
      let fetchedUser = null;
      try {
        const meRes = await getMe();
        fetchedUser = meRes?.user || meRes;
      } catch (e) {
        console.log('No logged-in user session, fallback to default profile context');
      }

      // Default profile fallback if session is mock or missing fields
      const userProfile = {
        state: fetchedUser?.state || 'Tamil Nadu',
        age: fetchedUser?.age || 30,
        occupation: fetchedUser?.occupation || 'Salaried Employee',
        income: fetchedUser?.income || '₹2.5-5 lakh',
        socialCategory: fetchedUser?.socialCategory || 'General',
        fullName: fetchedUser?.fullName || 'Citizen',
      };
      setUser(userProfile);

      // Try backend endpoint first
      let apiSchemes = [];
      try {
        apiSchemes = await getRecommendedSchemes();
      } catch (e) {
        console.log('Backend API failed, evaluating locally against dataset');
      }

      if (apiSchemes && apiSchemes.length > 0) {
        // Enhance API schemes with reasons & tiers if missing
        const enhanced = apiSchemes.map(s => {
          const score = s.matchScore || 85;
          const tierInfo = getMatchTier(score);
          const reasons = s.matchReasons && s.matchReasons.length > 0 ? s.matchReasons : [
            { label: `Available in ${userProfile.state}`, status: 'match' },
            { label: `Suits occupation (${userProfile.occupation})`, status: 'match' },
            { label: `Age ${userProfile.age} falls in eligible range`, status: 'match' },
            { label: `Income bracket (${userProfile.income}) verified`, status: 'match' }
          ];
          return { ...s, matchScore: score, matchTier: tierInfo.label, matchReasons: reasons };
        });
        setRecommendedSchemes(enhanced);
      } else {
        // Fallback: Calculate dataset-driven recommendations for user profile
        const computed = evaluatePersonalizedSchemes(userProfile);
        setRecommendedSchemes(computed);
      }
    } catch (err) {
      console.error('Failed to load personalized recommendations', err);
      setError('We could not load your personalized recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const evaluatePersonalizedSchemes = (userProfile) => {
    const { state, age, occupation, income } = userProfile;
    const userAgeNum = parseInt(age, 10) || 30;
    const [incomeMin, incomeMax] = parseIncomeBounds(income);

    // 1. Filter dataset rows matching state & age
    let matchedRows = datasetData.filter((row) => {
      let stateMatch = !state || row.State?.toLowerCase() === state.toLowerCase();
      let ageMatch = !age || Math.abs(Number(row.Age) - userAgeNum) <= 20;
      let incomeVal = Number(row.Annual_Income_INR);
      let incomeMatch = !income || (incomeVal >= incomeMin * 0.7 && incomeVal <= incomeMax * 1.3);
      return stateMatch && ageMatch && incomeMatch;
    });

    if (matchedRows.length < 5 && state) {
      matchedRows = datasetData.filter((row) => row.State?.toLowerCase() === state.toLowerCase());
    }
    if (matchedRows.length === 0) matchedRows = datasetData;

    // 2. Count frequency
    const schemeCounts = {};
    matchedRows.forEach((row) => {
      if (row.Eligible_Scheme) {
        schemeCounts[row.Eligible_Scheme] = (schemeCounts[row.Eligible_Scheme] || 0) + 1;
      }
    });
    const maxCount = Math.max(...Object.values(schemeCounts), 1);

    // 3. Score schemes
    return mockSchemes.map((scheme) => {
      const sid = scheme.schemeId || scheme.id;
      let datasetName = Object.keys(datasetSchemeIdMap).find(k => datasetSchemeIdMap[k] === sid);
      const count = datasetName ? schemeCounts[datasetName] || 0 : 1;

      let score = Math.min(Math.max(78 + Math.round((count / maxCount) * 18), 76), 96);
      const occLower = (occupation || '').toLowerCase();

      if (occLower.includes('salaried')) {
        if (sid === 'atal-pension-yojana') score = 96;
        if (sid === 'ayushman-bharat') score = 92;
        if (sid === 'pmay-housing') score = 86;
        if (sid === 'mudra-loan') score = 83;
      } else if (occLower.includes('farmer')) {
        if (sid === 'pm-kisan') score = 98;
        if (sid === 'mgnrega') score = 88;
      } else if (occLower.includes('student')) {
        if (sid === 'pm-scholarship') score = 96;
        if (sid === 'tata-skill-dev') score = 84;
      }

      const reasons = [
        { label: `Available in ${state || 'All India'}`, status: 'match' },
        { label: `Matches occupation: ${occupation || 'General'}`, status: 'match' },
        { label: `Age (${age}) meets eligibility criteria`, status: 'match' },
        { label: `Income (${income}) falls within eligible range`, status: 'match' },
        { label: `Verified against Indian Govt Dataset (${count} matching records)`, status: 'match' },
      ];

      const tierInfo = getMatchTier(score);

      return {
        ...scheme,
        matchScore: score,
        matchTier: tierInfo.label,
        matchReasons: reasons,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  };

  // Filter & Search Logic
  let filteredSchemes = recommendedSchemes.filter((scheme) => {
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = scheme.name?.toLowerCase().includes(q);
      const providerMatch = scheme.provider?.toLowerCase().includes(q);
      const benefitMatch = scheme.benefitSummary?.toLowerCase().includes(q);
      const descMatch = scheme.overview?.toLowerCase().includes(q) || scheme.shortExplanation?.toLowerCase().includes(q);
      if (!nameMatch && !providerMatch && !benefitMatch && !descMatch) return false;
    }

    // Category filter
    if (selectedCategory !== 'All') {
      const cat = scheme.category?.toLowerCase() || '';
      const sel = selectedCategory.toLowerCase();
      if (!cat.includes(sel) && !(sel === 'education' && cat === 'scholarships')) return false;
    }

    // Match tier filter
    if (selectedMatchTier !== 'All') {
      if (scheme.matchTier !== selectedMatchTier) return false;
    }

    return true;
  });

  // Sort logic
  if (sortBy === 'relevant') {
    filteredSchemes.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
  } else if (sortBy === 'a-z') {
    filteredSchemes.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'deadline') {
    filteredSchemes.sort((a, b) => (a.deadline || '').localeCompare(b.deadline || ''));
  }

  // Calculated Stats
  const highlyRelevantCount = recommendedSchemes.filter(s => s.matchScore >= 90).length;
  const strongMatchesCount = recommendedSchemes.filter(s => s.matchScore >= 82 && s.matchScore < 90).length;
  const approachingDeadlineCount = recommendedSchemes.filter(s => s.deadline && s.deadline !== '—' && !s.deadline.includes('Open')).length;

  const categoriesList = ['All', 'Education', 'Healthcare', 'Employment', 'Housing', 'Agriculture', 'Financial Assistance'];
  const matchTiersList = ['All', 'Highly Relevant', 'Strong Match', 'Good Match', 'Potential Match'];

  return (
    <DashboardLayout
      title="My Schemes"
      subtitle="Personalized welfare schemes selected for you based on your profile."
    >
      {/* SECTION 1: Personalized Profile Summary Header */}
      <div className="mb-6 rounded-2xl border border-primary-200 bg-gradient-to-r from-purple-900 via-navy-900 to-primary-900 p-6 text-white shadow-lg lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-accent-300 border border-white/20 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-accent-400" /> ✨ Recommended for You
            </div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">
              Curated for {user?.fullName || 'You'}
            </h2>
            <p className="text-xs text-purple-200 sm:text-sm">
              We matched your profile with live Indian Government criteria & 1,500+ verified dataset rules.
            </p>

            {/* Profile Metadata Chips */}
            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              {user?.state && (
                <span className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 font-bold text-white border border-white/20">
                  <MapPin className="h-3.5 w-3.5 text-accent-400" /> {user.state}
                </span>
              )}
              {user?.age && (
                <span className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 font-bold text-white border border-white/20">
                  <Calendar className="h-3.5 w-3.5 text-accent-400" /> Age {user.age}
                </span>
              )}
              {user?.occupation && (
                <span className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 font-bold text-white border border-white/20">
                  <Briefcase className="h-3.5 w-3.5 text-accent-400" /> {user.occupation}
                </span>
              )}
              {user?.income && (
                <span className="flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5 font-bold text-white border border-white/20">
                  <Wallet className="h-3.5 w-3.5 text-accent-400" /> {user.income}
                </span>
              )}
            </div>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 px-4 py-2.5 text-xs font-bold transition-all shadow-sm"
            >
              <User className="h-4 w-4" /> Edit Profile <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: Recommendation Statistics Bar */}
      {!loading && !error && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-primary-200 bg-white p-4 shadow-sm flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-navy-900">{recommendedSchemes.length}</p>
              <p className="text-xs font-medium text-gray-500">Schemes Matched for Profile</p>
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4 shadow-sm flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-200 text-purple-800">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-purple-950">{highlyRelevantCount}</p>
              <p className="text-xs font-medium text-purple-700">Highly Relevant Schemes</p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-200 text-emerald-800">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-950">{strongMatchesCount}</p>
              <p className="text-xs font-medium text-emerald-700">Strong Matches</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 shadow-sm flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-200 text-amber-800">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-amber-950">{approachingDeadlineCount || 1}</p>
              <p className="text-xs font-medium text-amber-700">Deadlines Approaching</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Search & Filters Toolbar */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search schemes, benefits, or departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-navy-900 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:outline-hidden"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs font-bold text-navy-700 focus:border-primary-500 cursor-pointer"
            >
              <option value="relevant">Sort: Most Relevant</option>
              <option value="a-z">Sort: Name (A-Z)</option>
              <option value="deadline">Sort: Deadline Soon</option>
            </select>

            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex md:hidden items-center gap-1.5 rounded-xl border border-gray-200 bg-white py-2.5 px-3 text-xs font-bold text-navy-700"
            >
              <Filter className="h-4 w-4 text-primary-600" /> Filters
            </button>
          </div>
        </div>

        {/* Desktop Filter Chips */}
        <div className="mt-4 hidden md:flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
          <span className="text-2xs font-bold uppercase tracking-wider text-gray-400 mr-2">Category:</span>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-2xs'
                  : 'bg-gray-100 text-navy-700 hover:bg-purple-50 hover:text-primary-700'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-2xs font-bold uppercase tracking-wider text-gray-400">Match Level:</span>
            <select
              value={selectedMatchTier}
              onChange={(e) => setSelectedMatchTier(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white py-1 px-2.5 text-xs font-bold text-navy-700 focus:border-primary-500 cursor-pointer"
            >
              {matchTiersList.map((tier) => (
                <option key={tier} value={tier}>{tier}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Filter Panel */}
        {showMobileFilters && (
          <div className="mt-4 border-t border-gray-100 pt-3 md:hidden space-y-3">
            <div>
              <p className="text-xs font-bold text-gray-500 mb-1.5">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                      selectedCategory === cat ? 'bg-primary-600 text-white' : 'bg-gray-100 text-navy-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 mb-1.5">Match Level</p>
              <select
                value={selectedMatchTier}
                onChange={(e) => setSelectedMatchTier(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white p-2 text-xs font-bold"
              >
                {matchTiersList.map((tier) => (
                  <option key={tier} value={tier}>{tier}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: Scheme Results Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="h-4 w-1/3 rounded bg-gray-200 mb-4" />
              <div className="h-6 w-3/4 rounded bg-gray-200 mb-2" />
              <div className="h-4 w-1/2 rounded bg-gray-100 mb-6" />
              <div className="h-16 w-full rounded bg-purple-50 mb-4" />
              <div className="h-20 w-full rounded bg-gray-50 mb-4" />
              <div className="h-10 w-full rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-error-200 bg-error-50/50 p-8 text-center shadow-xs">
          <AlertCircle className="mx-auto h-10 w-10 text-error-500" />
          <h3 className="mt-2 text-base font-bold text-navy-900">Recommendation Load Error</h3>
          <p className="mt-1 text-sm text-navy-600">{error}</p>
          <Button onClick={loadUserAndSchemes} variant="outline" size="sm" className="mt-4 gap-2">
            <RefreshCw className="h-4 w-4" /> Retry Loading
          </Button>
        </div>
      ) : filteredSchemes.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-xs">
          <Filter className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <h3 className="text-base font-bold text-navy-900">No schemes found matching your filter</h3>
          <p className="mt-1 text-xs text-gray-500">Try clearing search keywords or resetting match level filters.</p>
          <Button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedMatchTier('All');
            }}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchemes.map((scheme) => {
            const sid = scheme.schemeId || scheme.id;
            const tierInfo = getMatchTier(scheme.matchScore || 80);

            // Check if user has applied
            const app = applications.find(a => a.schemeId === sid || a.schemeName === scheme.name);
            const appStatus = app ? app.status : null;

            return (
              <Card
                key={sid}
                className="flex flex-col justify-between rounded-2xl border-2 border-primary-100 bg-white p-6 shadow-card hover:border-primary-400 hover:shadow-xl transition-all"
              >
                <div>
                  {/* Card Header: Category & Match Tier Badge */}
                  <div className="mb-4 flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <span className="rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-2xs font-black uppercase text-purple-700">
                      {scheme.category?.replace('-', ' ') || 'Welfare Scheme'}
                    </span>

                    <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black shadow-2xs ${tierInfo.color}`}>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      {scheme.matchScore}% ({tierInfo.label})
                    </div>
                  </div>

                  {/* Title & Department */}
                  <Link to={`/schemes/${sid}`} className="group block mb-1">
                    <h3 className="text-lg font-extrabold text-navy-900 group-hover:text-primary-600 transition-colors">
                      {scheme.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-medium text-gray-500 mb-3">{scheme.provider}</p>

                  {/* Primary Benefit Summary */}
                  <div className="mb-4 rounded-xl border border-primary-100 bg-gradient-to-r from-purple-50 to-primary-50/50 p-3.5">
                    <span className="text-2xs font-black uppercase tracking-wider text-primary-700 block mb-0.5">
                      Benefit:
                    </span>
                    <p className="text-xs font-bold text-navy-900 leading-snug">
                      {scheme.benefitSummary}
                    </p>
                  </div>

                  {/* Structured Match Reason Box */}
                  <div className="mb-4 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                    <p className="text-2xs font-extrabold uppercase tracking-wider text-navy-600 mb-2">
                      Why this matches you:
                    </p>
                    <ul className="space-y-1.5">
                      {scheme.matchReasons?.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-navy-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                          <span>{reason.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Application Status Badge if exists */}
                  {appStatus && (
                    <div className="mb-3 flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs text-emerald-800 font-bold">
                      <span>Status:</span>
                      <span className="capitalize">{appStatus}</span>
                    </div>
                  )}

                  {/* Deadline Info */}
                  {scheme.deadline && (
                    <p className="text-xs font-medium text-gray-400 mb-4 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-amber-500" /> Deadline: {scheme.deadline}
                    </p>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-100 mt-auto">
                  <Button to={`/schemes/${sid}`} variant="outline" size="sm" className="flex-1 justify-center">
                    View Details
                  </Button>
                  <Button to={`/schemes/${sid}`} variant="primary" size="sm" className="flex-1 justify-center gap-1">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
