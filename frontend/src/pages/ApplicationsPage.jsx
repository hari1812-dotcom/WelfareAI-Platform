import { Calendar, FileText } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { useApplicationTracking } from '@/contexts/useApplicationTracking';
import { useTranslation } from 'react-i18next';

export function ApplicationsPage() {
  const { t } = useTranslation();
  const { applications, applicationLimit } = useApplicationTracking();

  return (
    <DashboardLayout title={t('myApplicationsTitle')} subtitle={t('myApplicationsSubtitle')}>
      <div className="mb-4 rounded-xl border border-primary-100 bg-primary-50 p-4 text-sm text-primary-900">
        {applications.length} of {applicationLimit} application slots used.
      </div>
      {applications.length ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {applications.map((application) => (
            <Card key={application.schemeId} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-bold text-navy-900">{application.schemeName}</h2>
                  {application.provider && <p className="mt-1 text-sm text-gray-500">{application.provider}</p>}
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">{application.status}</span>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                Applied {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : ''}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                Benefit received: ₹{(Number(application.benefitReceived) || 0).toLocaleString('en-IN')}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
          No applications recorded yet. After applying on a scheme website, return here and confirm the application.
        </p>
      )}
    </DashboardLayout>
  );
}
