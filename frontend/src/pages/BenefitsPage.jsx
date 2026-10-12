import { useEffect, useState } from 'react';
import { Wallet, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useApplicationTracking } from '@/contexts/useApplicationTracking';
import { useTranslation } from 'react-i18next';

export function BenefitsPage() {
  const { t } = useTranslation();
  const { applications, updateReceivedBenefit } = useApplicationTracking();
  const [amounts, setAmounts] = useState({});
  const [savingSchemeId, setSavingSchemeId] = useState(null);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    setAmounts(Object.fromEntries(applications.map((application) => [
      application.schemeId,
      String(application.benefitReceived ?? 0),
    ])));
  }, [applications]);

  const totalReceived = applications.reduce(
    (total, application) => total + (Number(application.benefitReceived) || 0),
    0,
  );
  const handleSaveAmount = async (application) => {
    setSavingSchemeId(application.schemeId);
    setFeedback((current) => ({ ...current, [application.schemeId]: '' }));
    try {
      await updateReceivedBenefit(application.schemeId, Number(amounts[application.schemeId]));
      setFeedback((current) => ({ ...current, [application.schemeId]: 'Amount received updated.' }));
    } catch (error) {
      setFeedback((current) => ({ ...current, [application.schemeId]: error.message || 'Could not update the amount received.' }));
    } finally {
      setSavingSchemeId(null);
    }
  };

  return (
    <DashboardLayout title={t('myBenefitsTitle')} subtitle="Track amounts you have actually received from your recorded scheme applications.">
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardCard label={t('totalReceived')} value={`₹${totalReceived.toLocaleString('en-IN')}`} icon={TrendingUp} color="success" />
        <DashboardCard label="Schemes tracked" value={applications.length} icon={Wallet} color="primary" />
        <DashboardCard label="Application limit" value="2 schemes" icon={Wallet} color="warning" />
      </div>

      {applications.length ? (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {applications.map((application) => (
            <Card key={application.schemeId} className="p-5">
              <h2 className="font-bold text-navy-900">{application.schemeName}</h2>
              {application.provider && <p className="mt-1 text-sm text-gray-500">{application.provider}</p>}
              <label className="mt-4 block text-sm font-semibold text-navy-800">
                Amount actually received (₹)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amounts[application.schemeId] ?? '0'}
                  onChange={(event) => setAmounts((current) => ({ ...current, [application.schemeId]: event.target.value }))}
                  className="input-base mt-1"
                />
              </label>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-xs text-gray-500">
                  Applied {application.appliedAt ? new Date(application.appliedAt).toLocaleDateString() : ''}
                </p>
                <Button
                  size="sm"
                  disabled={savingSchemeId === application.schemeId}
                  onClick={() => handleSaveAmount(application)}
                >
                  {savingSchemeId === application.schemeId ? 'Saving…' : 'Save amount'}
                </Button>
              </div>
              {feedback[application.schemeId] && (
                <p role={feedback[application.schemeId].includes('Could not') ? 'alert' : 'status'} className="mt-2 text-sm text-gray-600">
                  {feedback[application.schemeId]}
                </p>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-600">
          No applications or benefits have been recorded yet. Apply to an eligible scheme, then confirm your application when you return.
        </p>
      )}
    </DashboardLayout>
  );
}
