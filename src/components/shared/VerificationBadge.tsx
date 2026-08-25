import { ShieldCheck, Building2, HandHeart, CheckCircle2 } from 'lucide-react';
import type { VerificationStatus } from '@/types';

interface VerificationBadgeProps {
  status: VerificationStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const config: Record<VerificationStatus, { label: string; icon: typeof ShieldCheck; color: string }> = {
  government_verified: { label: 'Government Verified', icon: ShieldCheck, color: 'text-primary-700 bg-primary-50 border-primary-200' },
  ngo_verified: { label: 'NGO Verified', icon: HandHeart, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  csr_verified: { label: 'CSR Verified', icon: Building2, color: 'text-accent-700 bg-accent-50 border-accent-200' },
  source_verified: { label: 'Source Verified', icon: CheckCircle2, color: 'text-navy-700 bg-navy-50 border-navy-200' },
};

export function VerificationBadge({ status, showLabel = true, size = 'sm' }: VerificationBadgeProps) {
  const { label, icon: Icon, color } = config[status];
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${color} ${sizeClass}`}>
      <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {showLabel && label}
    </span>
  );
}
