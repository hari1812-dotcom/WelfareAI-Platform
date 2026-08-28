import { Wallet, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { benefits } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export function BenefitsPage() {
  const { t } = useTranslation();
  const totalExpected = benefits.reduce((s, b) => s + b.expectedAmount, 0);
  const totalReceived = benefits.reduce((s, b) => s + b.receivedAmount, 0);
  const totalRemaining = totalExpected - totalReceived;

  return (
    <DashboardLayout title={t('myBenefitsTitle')} subtitle={t('myBenefitsSubtitle')}>
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardCard label={t('totalExpected')} value={`₹${totalExpected.toLocaleString('en-IN')}`} icon={Wallet} color="primary" />
        <DashboardCard label={t('totalReceived')} value={`₹${totalReceived.toLocaleString('en-IN')}`} icon={TrendingUp} color="success" />
        <DashboardCard label={t('remaining')} value={`₹${totalRemaining.toLocaleString('en-IN')}`} icon={Wallet} color="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </DashboardLayout>
  );
}
