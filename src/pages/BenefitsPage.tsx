import { Wallet, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BenefitCard } from '@/components/shared/BenefitCard';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { benefits } from '@/data/mockData';

export function BenefitsPage() {
  const totalExpected = benefits.reduce((s, b) => s + b.expectedAmount, 0);
  const totalReceived = benefits.reduce((s, b) => s + b.receivedAmount, 0);
  const totalRemaining = totalExpected - totalReceived;

  return (
    <DashboardLayout title="My Benefits" subtitle="Track your welfare benefits and disbursements">
      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardCard label="Total Expected" value={`₹${totalExpected.toLocaleString('en-IN')}`} icon={Wallet} color="primary" />
        <DashboardCard label="Total Received" value={`₹${totalReceived.toLocaleString('en-IN')}`} icon={TrendingUp} color="success" />
        <DashboardCard label="Remaining" value={`₹${totalRemaining.toLocaleString('en-IN')}`} icon={Wallet} color="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </DashboardLayout>
  );
}
