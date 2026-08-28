import { useState } from 'react';
import { GitCompare, X, Sparkles, Check } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MatchScore } from '@/components/shared/MatchScore';
import { VerificationBadge } from '@/components/shared/VerificationBadge';
import { schemes } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export function ComparePage() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState([schemes[0].id, schemes[1].id]);

  const toggleScheme = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const selectedSchemes = schemes.filter((s) => selected.includes(s.id));
  const availableSchemes = schemes.filter((s) => !selected.includes(s.id));

  const fields = [
    { label: t('matchScore'), render: (s) => <MatchScore score={s.matchScore} size="sm" showLabel={false} /> },
    { label: t('benefitStr'), render: (s) => <span className="text-sm font-semibold text-navy-800">{s.benefitAmount}</span> },
    { label: t('eligibilityStr'), render: (s) => <span className="text-xs text-navy-600">{s.eligibility[0]}</span> },
    { label: t('documentsStr'), render: (s) => <span className="text-xs text-navy-600">{s.documentsRequired.length} required</span> },
    { label: t('procTime'), render: (s) => <span className="text-xs text-navy-600">{s.processingTime}</span> },
    { label: t('deadlineStr'), render: (s) => <span className="text-xs text-navy-600">{s.deadline}</span> },
    { label: t('providerStr'), render: (s) => <span className="text-xs text-navy-600">{t(`schemeData.${s.provider}`, { defaultValue: s.provider })}</span> },
    { label: t('verifyStr'), render: (s) => <VerificationBadge status={s.verification} /> },
    { label: t('appMethod'), render: (s) => <span className="text-xs text-navy-600">{s.applicationMethod}</span> },
  ];

  return (
    <DashboardLayout title={t('compareTitle')} subtitle={t('compareSub')}>
      {selectedSchemes.length === 0 ? (
        <Card className="p-8 text-center">
          <GitCompare className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">{t('selectStart')}</p>
        </Card>
      ) : (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-40 p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{t('comparison')}</th>
                {selectedSchemes.map((s) => (
                  <th key={s.id} className="min-w-[200px] p-3 text-left align-top">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{t(`schemeData.${s.name}`, { defaultValue: s.name })}</p>
                        <p className="mt-0.5 text-xs text-gray-500">{t(`schemeData.${s.provider}`, { defaultValue: s.provider })}</p>
                      </div>
                      <button onClick={() => toggleScheme(s.id)} aria-label="Remove scheme" className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-error-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => (
                <tr key={field.label} className={i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                  <td className="p-3 text-xs font-semibold text-gray-500">{field.label}</td>
                  {selectedSchemes.map((s) => (
                    <td key={s.id} className="p-3 align-top">{field.render(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedSchemes.length >= 2 && (
        <Card className="mb-6 p-5">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-navy-900">{t('aiTradeoff')}</h3>
            <Badge variant="warning" className="ml-1">{t('demoBadge')}</Badge>
          </div>
          <p className="text-sm text-navy-600 leading-relaxed">
            {t(`schemeData.${selectedSchemes[0].name}`, { defaultValue: selectedSchemes[0].name })} {t('offers')} {selectedSchemes[0].benefitAmount} {t('withText')} {selectedSchemes[0].matchScore}% {t('match')} {t('and')} {selectedSchemes[0].processingTime} {t('processingTimeText')}.
            {' '}{t(`schemeData.${selectedSchemes[1].name}`, { defaultValue: selectedSchemes[1].name })} {t('offers')} {selectedSchemes[1].benefitAmount} {t('withText')} {selectedSchemes[1].matchScore}% {t('match')} {t('and')} {selectedSchemes[1].processingTime} {t('processingTimeText')}.
            {selectedSchemes.length === 3 && ` ${t(`schemeData.${selectedSchemes[2].name}`, { defaultValue: selectedSchemes[2].name })} ${t('offers')} ${selectedSchemes[2].benefitAmount} ${t('withText')} ${selectedSchemes[2].matchScore}% ${t('match')}.`}
            {' '}{t('considerApp')}
          </p>
        </Card>
      )}

      {availableSchemes.length > 0 && selected.length < 3 && (
        <div>
          <h3 className="mb-3 text-sm font-bold text-navy-900">{t('addScheme')} ({selected.length}/3 {t('selectedStr')})</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"></div>
        </div>
      )}
    </DashboardLayout>
  );
}
