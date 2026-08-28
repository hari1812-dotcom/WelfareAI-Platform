import {
  FileText, CheckCircle2, Clock, XCircle, Wallet, Smile,
  TrendingUp, MapPin, BarChart3,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardCard } from '@/components/shared/DashboardCard';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { adminStats, adminCharts } from '@/data/mockData';

export function AdminPage() {
  const maxBottleneck = Math.max(...adminCharts.applicationBottlenecks.map((b) => b.count));
  const maxRegional = Math.max(...adminCharts.regionalUptake.map((r) => r.applications));

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform analytics and oversight (demo data)">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard label="Total Applications" value={adminStats.totalApplications.toLocaleString('en-IN')} icon={FileText} color="primary" />
        <DashboardCard label="Approved" value={adminStats.approvedApplications.toLocaleString('en-IN')} icon={CheckCircle2} color="success" />
        <DashboardCard label="Pending" value={adminStats.pendingApplications.toLocaleString('en-IN')} icon={Clock} color="accent" />
        <DashboardCard label="Rejected" value={adminStats.rejectedApplications.toLocaleString('en-IN')} icon={XCircle} color="warning" />
        <DashboardCard label="Benefits Disbursed" value={`₹${(adminStats.totalBenefitsDisbursed / 10000000).toFixed(1)} Cr`} icon={Wallet} color="navy" />
        <DashboardCard label="Satisfaction" value={`${adminStats.beneficiarySatisfaction}%`} icon={Smile} color="success" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary-600" />
            <h3 className="text-base font-bold text-navy-900">Application Bottlenecks</h3>
          </div>
          <div className="space-y-3">
            {adminCharts.applicationBottlenecks.map((item) => (
              <div key={item.stage}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{item.stage}</span>
                  <span className="font-semibold text-navy-800">{item.count.toLocaleString('en-IN')}</span>
                </div>
                <ProgressBar value={item.count} max={maxBottleneck} size="sm" barClassName="bg-primary-500" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-600" />
            <h3 className="text-base font-bold text-navy-900">Regional Uptake</h3>
          </div>
          <div className="space-y-3">
            {adminCharts.regionalUptake.map((item) => (
              <div key={item.region}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{item.region}</span>
                  <span className="font-semibold text-navy-800">{item.applications.toLocaleString('en-IN')}</span>
                </div>
                <ProgressBar value={item.applications} max={maxRegional} size="sm" barClassName="bg-accent-500" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary-600" />
            <h3 className="text-base font-bold text-navy-900">Recommendation Accuracy</h3>
          </div>
          <div className="space-y-3">
            {adminCharts.recommendationAccuracy.map((item) => (
              <div key={item.month}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{item.month}</span>
                  <span className="font-semibold text-navy-800">{item.accuracy}%</span>
                </div>
                <ProgressBar value={item.accuracy} max={100} size="sm" barClassName="bg-success-500" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <Smile className="h-5 w-5 text-primary-600" />
            <h3 className="text-base font-bold text-navy-900">Satisfaction Scores</h3>
          </div>
          <div className="space-y-3">
            {adminCharts.satisfactionScores.map((item) => (
              <div key={item.category}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-navy-700">{item.category}</span>
                  <span className="font-semibold text-navy-800">{item.score.toFixed(1)}/5.0</span>
                </div>
                <ProgressBar value={item.score} max={5} size="sm" barClassName="bg-navy-500" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border border-accent-200 bg-accent-50 p-4"></div>
    </DashboardLayout>
  );
}
