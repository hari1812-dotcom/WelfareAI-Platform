import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface DashboardCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'primary' | 'accent' | 'success' | 'navy' | 'warning';
}

const colorMap = {
  primary: 'bg-primary-50 text-primary-600',
  accent: 'bg-accent-50 text-accent-600',
  success: 'bg-success-50 text-success-600',
  navy: 'bg-navy-50 text-navy-600',
  warning: 'bg-warning-50 text-warning-600',
};

export function DashboardCard({ label, value, icon: Icon, trend, color = 'primary' }: DashboardCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && <span className="text-xs font-semibold text-success-600">{trend}</span>}
      </div>
      <p className="mt-3 text-2xl font-bold text-navy-900">{value}</p>
      <p className="mt-0.5 text-sm text-gray-500">{label}</p>
    </Card>
  );
}
