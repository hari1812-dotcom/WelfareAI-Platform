import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ApplicationTimeline({ application }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-0">
      {application.timeline.map((step, i) => {
        const isLast = i === application.timeline.length - 1;
        const Icon = step.status === 'completed' ? CheckCircle2 : step.status === 'current' ? Clock : Circle;
        const iconColor = step.status === 'completed'
          ? 'text-success-500 bg-success-50 border-success-200'
          : step.status === 'current'
          ? 'text-primary-600 bg-primary-50 border-primary-200 ring-4 ring-primary-100'
          : 'text-gray-300 bg-gray-50 border-gray-200';
        return (
          <div key={step.stage} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${iconColor}`}>
                <Icon className="h-5 w-5" />
              </div>
              {!isLast && <div className={`w-0.5 flex-1 ${step.status === 'completed' ? 'bg-success-300' : 'bg-gray-200'} my-1`} style={{ minHeight: '2rem' }} />}
            </div>
            <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
              <p className={`text-sm font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-navy-800'}`}>
                {t(step.stage.charAt(0).toLowerCase() + step.stage.slice(1).replace(/\s+(.)/g, (_, c) => c.toUpperCase()), { defaultValue: step.stage })}
              </p>
              {step.date && <p className="text-xs text-gray-500 mt-0.5">{step.date}</p>}
              {step.status === 'current' && (
                <>
                  <span className="mt-1 block text-xs text-gray-500">{t('inProgress')}</span>
                  <span className="mt-1 inline-block text-xs font-semibold text-primary-600">{t('currentlyInProgress')}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
