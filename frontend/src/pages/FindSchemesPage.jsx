import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SchemeCard } from '@/components/shared/SchemeCard';
import { Button } from '@/components/ui/Button';
import { categories, states, occupations, incomeBrackets } from '@/data/mockData';
import { useTranslation } from 'react-i18next';
import { getMe, getRecommendedSchemes } from '@/services/api';

export function FindSchemesPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [showFilters, setShowFilters] = useState(false);
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');

  const [dbSchemes, setDbSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const recommended = await getRecommendedSchemes();
        setDbSchemes(recommended);
        setLoading(false);
      } catch(e) {
        console.error(e);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  let filtered = dbSchemes;
  if (selectedCategory) filtered = filtered.filter((s) => s.category === selectedCategory);
  if (search) filtered = filtered.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.provider.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title={t('findSchemesTitle')} subtitle={t('findSchemesSubtitle')}>
      {/* Search bar */}
      <div className="mb-5 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <SlidersHorizontal className="h-4 w-4" /> {t('filters')}
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-card animate-slide-down">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label-base">{t('profile.state')}</label>
              <select value={state} onChange={(e) => setState(e.target.value)} className="input-base">
                <option value="">{t('allStates')}</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label-base">{t('profile.occupation')}</label>
              <select value={occupation} onChange={(e) => setOccupation(e.target.value)} className="input-base">
                <option value="">{t('allOccupations')}</option>
                {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="label-base">{t('profile.incomeBracket')}</label>
              <select value={income} onChange={(e) => setIncome(e.target.value)} className="input-base">
                <option value="">{t('allIncomeBrackets')}</option>
                {incomeBrackets.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Category chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${!selectedCategory ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-navy-600 hover:border-primary-300'}`}
        >
          {t('allCategories')}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${selectedCategory === cat.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-navy-600 hover:border-primary-300'}`}
          >
            {t(cat.name.toLowerCase().replace(/\s+/g, ''), { defaultValue: cat.name })}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm text-gray-500">{filtered.length} {t('schemesFound')}</p>
        {(selectedCategory || search) && (
          <button
            onClick={() => { setSelectedCategory(null); setSearch(''); }}
            className="flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            <X className="h-4 w-4" /> {t('clearFilters')}
          </button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-3 text-center text-gray-400 py-12">{t('loadingSchemes')}</p>
        ) : filtered.length === 0 ? (
          <p className="col-span-3 text-center text-gray-400 py-12">{t('noSchemes')}</p>
        ) : filtered.map((scheme) => (
          <SchemeCard key={scheme.schemeId || scheme._id} scheme={scheme} />
        ))}
      </div>
    </DashboardLayout>
  );
}
