interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };

export function ProgressBar({ value, max = 100, className = '', barClassName = '', label, showValue = false, size = 'md' }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          {label && <span className="font-medium text-navy-700">{label}</span>}
          {showValue && <span className="font-semibold text-navy-800">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div className={`h-full rounded-full bg-primary-500 transition-all duration-500 ${barClassName}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
