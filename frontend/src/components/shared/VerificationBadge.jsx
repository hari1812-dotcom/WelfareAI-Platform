import { ShieldCheck, Building2, HandHeart, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const config = {
  government_verified: { labelKey: 'scheme.govVerified', icon: ShieldCheck, color: 'text-primary-700 bg-primary-50 border-primary-200' },
  ngo_verified: { labelKey: 'scheme.ngoVerified', icon: HandHeart, color: 'text-blue-700 bg-blue-50 border-blue-200' },
  csr_verified: { labelKey: 'scheme.csrVerified', icon: Building2, color: 'text-accent-700 bg-accent-50 border-accent-200' },
  source_verified: { labelKey: 'scheme.sourceVerified', icon: CheckCircle2, color: 'text-navy-700 bg-navy-50 border-navy-200' },
};

export function VerificationBadge({ status, showLabel = true, size = 'sm' }) {
  const { t } = useTranslation();
  const { labelKey, icon: Icon, color } = config[status];
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${color} ${sizeClass}`}>
      <Icon className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {showLabel && t(labelKey)}
    </span>
  );
}
