import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm',
  secondary: 'bg-navy-900 text-white hover:bg-navy-800 active:bg-navy-950 shadow-sm',
  outline: 'border-2 border-primary-600 text-primary-700 hover:bg-primary-50 active:bg-primary-100',
  ghost: 'text-navy-700 hover:bg-gray-100 active:bg-gray-200',
  danger: 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800 shadow-sm',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

const baseClass = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, className = '', to, ...props }, ref) => {
    const classes = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    if (to) {
      return <Link to={to} className={classes}>{children}</Link>;
    }
    return <button ref={ref} className={classes} {...props}>{children}</button>;
  }
);
Button.displayName = 'Button';
