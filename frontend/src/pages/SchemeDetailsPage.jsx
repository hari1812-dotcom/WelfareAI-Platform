import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Building2, Wallet, FileText, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { MatchScore } from '@/components/shared/MatchScore';
import { schemes } from '@/data/mockData';
import { getAllSchemes } from '@/services/api';
import { getSchemeTranslation } from '@/data/schemeTranslations';

const schemeTranslationKeys = { 'pm-scholarship': 'pmScholarship', 'ayushman-bharat': 'ayushmanBharat', 'pm-kisan': 'pmKisan', 'pmay-housing': 'pmayHousing', 'atal-pension-yojana': 'atalPension', 'mudra-loan': 'mudraLoan', 'stand-up-india': 'standUpIndia', mgnrega: 'mgnrega', 'tata-skills': 'tataSkills' };

export function SchemeDetailsPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [scheme, setScheme] = useState(() => schemes.find((item) => item.id === id));

  useEffect(() => {
    if (scheme?.id === id || scheme?.schemeId === id) return;
    getAllSchemes()
      .then((items) => setScheme(items.find((item) => (item.schemeId || item._id) === id)))
      .catch((error) => console.error('Failed to load scheme details', error));
  }, [id, scheme?.id, scheme?.schemeId]);

  if (!scheme) {
    return <DashboardLayout backTo="/schemes"><p className="py-12 text-center text-gray-500">{t('noSchemes')}</p></DashboardLayout>;
  }

  const schemeId = scheme.schemeId || scheme.id;
  const translated = getSchemeTranslation(schemeId, i18n.language, scheme);
  const translateScheme = (value) => t(`schemeData.${value}`, { defaultValue: value || '' });
  const name = translated.name || t(`schemeNames.${schemeTranslationKeys[schemeId] || schemeId}`, { defaultValue: translateScheme(scheme.name) });

  return (
    <DashboardLayout backTo="/schemes">
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="mb-2"><VerificationBadge status={scheme.verification} size="md" /></div>
            <h1 className="text-2xl font-bold text-navy-900 lg:text-3xl">{name}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500"><Building2 className="h-4 w-4" /> {translated.provider || translateScheme(scheme.provider)}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-navy-700"><Wallet className="h-4 w-4 text-primary-600" /> {translated.benefit || translateScheme(scheme.benefitAmount || scheme.benefitSummary)}</span>
              <span className="flex items-center gap-1.5 text-navy-700"><Calendar className="h-4 w-4 text-accent-600" /> {t('scheme.deadline')}: {scheme.deadline}</span>
              <span className="flex items-center gap-1.5 text-navy-700"><FileText className="h-4 w-4 text-navy-500" /> {scheme.applicationMethod}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <MatchScore score={scheme.matchScore || 0} size="lg" />
            <span className="text-xs font-semibold text-primary-600">{t('scheme.potentiallyEligible')}</span>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button to={`/schemes/${schemeId}/eligibility`} size="lg" className="flex-1">{t('scheme.checkEligibility')} <ArrowRight className="h-5 w-5" /></Button>
          <Button variant="outline" size="lg" className="flex-1">{t('scheme.apply')}</Button>
        </div>
      </div>

      <Tabs items={[{
        id: 'overview',
        label: t('scheme.overview'),
        content: (
          <div className="space-y-6">
            <Card className="p-5">
              <h3 className="mb-2 text-base font-bold text-navy-900">{t('scheme.summary')}</h3>
              <p className="text-sm leading-relaxed text-navy-600">{translated.description || translateScheme(scheme.overview || scheme.shortExplanation)}</p>
            </Card>
            <Card className="p-5">
              <h3 className="text-base font-bold text-navy-900">{t('scheme.yourMatch')}: {scheme.matchScore || 0}%</h3>
            </Card>
          </div>
        ),
      }]} />
    </DashboardLayout>
  );
}
