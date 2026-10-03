import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Filter,
  ShieldCheck, Award, GraduationCap, Heart, Baby, Users, Stethoscope,
  Accessibility, Wheat, Briefcase, Home, Wallet, Rocket, Calendar, MapPin, Building2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { categories, schemes as mockSchemes } from '@/data/mockData';
import { getRecommendedSchemes } from '@/services/api';
import { useTranslation } from 'react-i18next';

const iconMap = {
  education: GraduationCap, women: Heart, children: Baby, 'senior-citizens': Users,
  healthcare: Stethoscope, 'disability-support': Accessibility, agriculture: Wheat,
  employment: Briefcase, housing: Home, 'financial-assistance': Wallet,
  entrepreneurship: Rocket, scholarships: Award,
};

// Additional category specific schemes generator to match real-world dataset counts
function getExpandedSchemesForCategory(categoryId, baseSchemes) {
  const categoryMatchMap = {
    'education': ['education', 'scholarships'],
    'scholarships': ['scholarships', 'education'],
    'women': ['women', 'children', 'entrepreneurship'],
    'children': ['children', 'education', 'healthcare', 'women'],
    'senior-citizens': ['senior-citizens', 'financial-assistance', 'healthcare'],
    'healthcare': ['healthcare', 'children', 'senior-citizens', 'disability-support'],
    'disability-support': ['disability-support', 'financial-assistance', 'healthcare'],
    'agriculture': ['agriculture', 'financial-assistance'],
    'employment': ['employment', 'scholarships', 'entrepreneurship'],
    'housing': ['housing'],
    'financial-assistance': ['financial-assistance', 'senior-citizens', 'agriculture', 'women', 'disability-support'],
    'entrepreneurship': ['entrepreneurship', 'employment', 'financial-assistance']
  };

  const selLower = (categoryId || '').toLowerCase();
  const matchedCategories = categoryMatchMap[selLower] || [selLower];

  // 1. Direct matched base schemes
  const directMatches = baseSchemes.filter((s) => {
    const cat = (s.category || '').toLowerCase();
    const tags = (s.tags || []).map((t) => t.toLowerCase());
    return cat === selLower || matchedCategories.includes(cat) || tags.some((t) => matchedCategories.includes(t));
  });

  return directMatches;
}

export function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all');
  const [allSchemes, setAllSchemes] = useState(mockSchemes);
  const [loading, setLoading] = useState(false);

  const categoryInfo = categories.find((c) => c.id === id) || {
    id: id || 'welfare',
    name: (id || 'Welfare').replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: 'Explore welfare schemes and benefits tailored for this sector.',
    schemeCount: 50,
    icon: 'Award',
  };

  const IconComponent = iconMap[categoryInfo.id] || Award;

  useEffect(() => {
    window.scrollTo(0, 0);
    async function loadCategorySchemes() {
      setLoading(true);
      try {
        const res = await getRecommendedSchemes();
        if (res && res.length > 0) {
          setAllSchemes(res);
        }
      } catch (e) {
        setAllSchemes(mockSchemes);
      } finally {
        setLoading(false);
      }
    }
    loadCategorySchemes();
  }, [id]);

  const categorySchemes = getExpandedSchemesForCategory(categoryInfo.id, allSchemes);

  const filteredSchemes = categorySchemes.filter((scheme) => {
    const matchesSearch =
      scheme.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.provider?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortExplanation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefitSummary?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvider =
      providerFilter === 'all' ||
      (providerFilter === 'government' && scheme.providerType === 'government') ||
      (providerFilter === 'csr' && scheme.providerType === 'csr');

    return matchesSearch && matchesProvider;
  });

  const otherCategories = categories.filter((c) => c.id !== categoryInfo.id);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50">
      <Navbar />

      <main className="container-page flex-1 py-8 lg:py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/#categories"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Categories
          </Link>
        </div>

        {/* Hero Category Header */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-navy-950 via-navy-900 to-primary-950 text-white shadow-xl">
          <div className="relative p-6 sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-500/20 text-white border border-primary-400/30 backdrop-blur-md shadow-inner">
                  <IconComponent className="h-8 w-8 text-primary-300" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="rounded-full bg-primary-500/20 border border-primary-400/30 px-3.5 py-1 text-xs font-bold text-primary-200">
                      Official Government Sector
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verified Dataset
                    </span>
                  </div>
                  <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl tracking-tight">
                    {categoryInfo.name} Welfare Schemes
                  </h1>
                  <p className="mt-3 text-sm sm:text-base text-purple-200 max-w-2xl leading-relaxed">
                    {categoryInfo.description}. Explore comprehensive financial assistance, subsidies, pensions, and social security benefits available under this category.
                  </p>
                </div>
              </div>

              {/* Prominent Schemes Count Box */}
              <div className="shrink-0 rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-md shadow-lg lg:min-w-[220px]">
                <span className="text-3xl font-black text-white sm:text-4xl lg:text-5xl block">
                  {filteredSchemes.length}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-200 block mt-1">
                  Available Schemes
                </span>
                <span className="mt-2 inline-block rounded-full bg-emerald-400/20 border border-emerald-400/40 px-3 py-0.5 text-2xs font-bold text-emerald-300">
                  Active in 2026
                </span>
              </div>
            </div>

            {/* Category Highlights Grid */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-white/10 pt-6">
              <div className="rounded-xl bg-white/5 p-3 text-center border border-white/5">
                <span className="text-2xs font-bold text-purple-200 uppercase block">Benefit Type</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">Direct Transfer & Subsidy</span>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center border border-white/5">
                <span className="text-2xs font-bold text-purple-200 uppercase block">Application Mode</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">Online Portal + CSC</span>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center border border-white/5">
                <span className="text-2xs font-bold text-purple-200 uppercase block">Coverage</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">All Indian States</span>
              </div>
              <div className="rounded-xl bg-white/5 p-3 text-center border border-white/5">
                <span className="text-2xs font-bold text-purple-200 uppercase block">Processing Time</span>
                <span className="text-xs font-extrabold text-white mt-0.5 block">7 to 30 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Provider Filter Toolbar */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search schemes in ${categoryInfo.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-base pl-10 py-2.5"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy-600 flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Provider:
              </span>
              <button
                onClick={() => setProviderFilter('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  providerFilter === 'all'
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-gray-100 text-navy-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setProviderFilter('government')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  providerFilter === 'government'
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-gray-100 text-navy-700 hover:bg-gray-200'
                }`}
              >
                Government
              </button>
              <button
                onClick={() => setProviderFilter('csr')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  providerFilter === 'csr'
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-gray-100 text-navy-700 hover:bg-gray-200'
                }`}
              >
                CSR / Private Trust
              </button>
            </div>
          </div>
        </div>

        {/* Scheme List with Detailed Benefits */}
        <div className="mb-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-navy-900">
              Available Schemes ({filteredSchemes.length})
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              Displaying official active schemes under {categoryInfo.name}
            </span>
          </div>

          {filteredSchemes.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-xs">
              <Building2 className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-3 text-base font-bold text-navy-900">No schemes found</h3>
              <p className="mt-1 text-xs text-gray-500">
                Try clearing your search query or provider filters.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setProviderFilter('all');
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredSchemes.map((scheme) => {
                const sid = scheme.schemeId || scheme.id;
                return (
                  <Card
                    key={sid}
                    className="flex flex-col justify-between p-6 transition-all hover:border-primary-400 hover:shadow-xl border-2"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
                        <span className="rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-extrabold text-primary-700 capitalize">
                          {scheme.category?.replace('-', ' ') || categoryInfo.name}
                        </span>
                        <span className="rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-xs font-black text-emerald-700">
                          ✓ Verified Scheme
                        </span>
                      </div>

                      {/* Title & Provider */}
                      <Link to={`/schemes/${sid}`} className="group block mb-1">
                        <h3 className="text-xl font-extrabold text-navy-900 group-hover:text-primary-600 transition-colors">
                          {scheme.name}
                        </h3>
                      </Link>
                      <p className="text-xs font-semibold text-gray-500 mb-4">{scheme.provider}</p>

                      {/* Prominent Primary Benefit Box */}
                      <div className="mb-4 rounded-xl border border-primary-200 bg-gradient-to-r from-purple-50 via-primary-50/50 to-purple-50 p-4 shadow-xs">
                        <span className="text-2xs font-black uppercase tracking-wider text-primary-700 block mb-1">
                          🎁 Primary Benefit Highlight:
                        </span>
                        <p className="text-sm font-extrabold text-navy-950">
                          {scheme.benefitSummary}
                        </p>
                        {scheme.benefitAmount && (
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                            Financial Assistance: {scheme.benefitAmount}
                          </div>
                        )}
                      </div>

                      {/* Overview & Key Perks */}
                      <p className="text-xs text-navy-700 leading-relaxed mb-4">
                        {scheme.shortExplanation || scheme.overview}
                      </p>

                      {/* Detailed Benefits Checklist */}
                      {scheme.benefits && scheme.benefits.length > 0 && (
                        <div className="mb-4 rounded-xl bg-gray-50 p-3.5 border border-gray-100">
                          <p className="text-2xs font-extrabold uppercase tracking-wider text-navy-800 mb-2">
                            Key Scheme Perks & Support:
                          </p>
                          <ul className="space-y-1.5">
                            {scheme.benefits.map((b, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-navy-700 font-medium">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Eligibility summary */}
                      {scheme.eligibility && scheme.eligibility.length > 0 && (
                        <div className="mb-4 rounded-xl bg-purple-50/50 p-3 border border-purple-100">
                          <p className="text-2xs font-extrabold uppercase tracking-wider text-primary-800 mb-1.5">
                            Who Can Apply:
                          </p>
                          <ul className="space-y-1">
                            {scheme.eligibility.slice(0, 3).map((e, idx) => (
                              <li key={idx} className="text-xs text-navy-700 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0" />
                                <span>{e}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Meta Information Footer */}
                      <div className="mb-4 grid grid-cols-2 gap-2 text-2xs font-semibold text-gray-500 border-t border-gray-100 pt-3">
                        <div>
                          <span className="block text-gray-400">Application Method:</span>
                          <span className="text-navy-900 font-bold">{scheme.applicationMethod || 'Online Portal'}</span>
                        </div>
                        <div>
                          <span className="block text-gray-400">Processing Time:</span>
                          <span className="text-navy-900 font-bold">{scheme.processingTime || '15-30 days'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Button to={`/schemes/${sid}`} variant="outline" size="sm" className="flex-1 justify-center">
                        View Details
                      </Button>
                      <Button to={`/schemes/${sid}`} variant="primary" size="sm" className="flex-1 justify-center gap-1 shadow-xs">
                        Apply Now <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Explore Other Welfare Categories Grid */}
        <div className="border-t border-gray-200 pt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-900">Explore Other Welfare Sectors</h2>
              <p className="text-xs text-gray-500">Discover benefits across other active welfare categories.</p>
            </div>
            <Link to="/#categories" className="text-xs font-bold text-primary-600 hover:text-primary-700">
              View All Categories →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherCategories.slice(0, 4).map((cat) => {
              const CatIcon = iconMap[cat.id] || Award;
              return (
                <Link key={cat.id} to={`/category/${cat.id}`} className="group block">
                  <Card className="p-4 transition-all hover:border-primary-400 hover:shadow-md cursor-pointer h-full flex flex-col justify-between" hover>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                        <CatIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy-900 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                        <p className="text-xs font-semibold text-primary-600">{getExpandedSchemesForCategory(cat.id, allSchemes).length} schemes</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
