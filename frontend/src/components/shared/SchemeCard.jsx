import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MatchScore } from './MatchScore';
import { VerificationBadge } from './VerificationBadge';
import { useTranslation } from 'react-i18next';

const reasonIcon = {
  match: <CheckCircle2 className="h-4 w-4 text-success-500 shrink-0" />,
  partial: <AlertTriangle className="h-4 w-4 text-warning-500 shrink-0" />,
  missing: <AlertCircle className="h-4 w-4 text-error-400 shrink-0" />,
};

export function SchemeCard({ scheme, showMatchReasons = true }) {
  const { t } = useTranslation();
  return (
    <Card className="flex flex-col gap-4 p-5" hover>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Link to={`/schemes/${scheme.id}`} className="group">
            <h3 className="text-base font-bold text-navy-900 group-hover:text-primary-700 transition-colors">
              {t(`schemeData.${scheme.name}`, { defaultValue: scheme.name })}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">{t(`schemeData.${scheme.provider}`, { defaultValue: scheme.provider })}</p>
          <div className="mt-2"><VerificationBadge status={scheme.verification} /></div>
        </div>
        <MatchScore score={scheme.matchScore} size="md" />
      </div>

      <p className="text-sm text-navy-600">{t(`schemeData.${scheme.benefitSummary}`, { defaultValue: scheme.benefitSummary })}</p>
      <p className="text-xs text-gray-400">{t('scheme.deadline')}: {scheme.deadline}</p>

      {showMatchReasons && scheme.matchReasons.length > 0 && (
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">{t('scheme.whyMatches')}</p>
          <ul className="space-y-1.5">
            {scheme.matchReasons.map((reason, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-navy-600">
                {reasonIcon[reason.status]}
                {t(`schemeData.${reason.label}`, { defaultValue: reason.label })}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        <Button to={`/schemes/${scheme.id}`} variant="outline" size="sm">{t('scheme.viewDetails')}</Button>
        <Button to={`/schemes/${scheme.id}`} variant="primary" size="sm">{t('scheme.apply')} <ArrowRight className="h-4 w-4" /></Button>
      </div>
    </Card>
  );
}
