import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'glow' | 'aqua' | 'crimson';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10B981] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-[#10B981] hover:bg-[#059669] text-white shadow-lg shadow-[#10B981]/25 active:scale-[0.98]',
    glow: 'bg-gradient-to-r from-[#10B981] via-[#059669] to-[#34D399] hover:brightness-105 text-white shadow-xl shadow-[#10B981]/30 hover:scale-[1.02] active:scale-[0.98] border border-white/40',
    secondary: 'bg-[#059669] hover:bg-[#047857] text-white shadow-md shadow-[#059669]/20 active:scale-[0.98]',
    outline: 'border border-[#10B981]/40 hover:border-[#10B981] bg-[#E6F7F2] dark:bg-emerald-950/40 hover:bg-[#10B981]/15 text-[#059669] dark:text-[#34D399] font-bold shadow-sm active:scale-[0.98]',
    danger: 'bg-[#EE3E4C] hover:bg-[#A61221] text-white shadow-lg shadow-[#EE3E4C]/25 active:scale-[0.98]',
    ghost: 'hover:bg-[#E6F7F2] dark:hover:bg-emerald-950/60 text-[#0F172A] dark:text-slate-100 hover:text-[#059669] dark:hover:text-[#34D399] font-semibold',
    aqua: 'bg-[#34D399] hover:bg-[#10B981] text-[#0F172A] font-bold shadow-md shadow-[#34D399]/25 active:scale-[0.98]',
    crimson: 'bg-[#EE3E4C] hover:bg-[#A61221] text-white shadow-lg shadow-[#EE3E4C]/25 active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};
