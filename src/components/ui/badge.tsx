import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'crimson' | 'aqua' | 'orange' | 'teal' | 'indigo' | 'emerald' | 'cyan' | 'amber' | 'rose' | 'slate';
}

export const Badge: React.FC<BadgeProps> = ({ children, className, variant = 'emerald', ...props }) => {
  const variants = {
    emerald: 'bg-[#E6F7F2] dark:bg-emerald-950/60 text-[#059669] dark:text-[#34D399] border-[#10B981]/30 shadow-sm',
    teal: 'bg-[#E6F7F2] dark:bg-teal-950/60 text-[#0D9488] dark:text-[#2DD4BF] border-[#0D9488]/30 shadow-sm',
    aqua: 'bg-[#E6F7F2] dark:bg-emerald-950/60 text-[#10B981] dark:text-[#34D399] border-[#10B981]/40 shadow-sm',
    indigo: 'bg-[#E6F7F2] dark:bg-emerald-950/60 text-[#059669] dark:text-[#34D399] border-[#10B981]/30 shadow-sm',
    cyan: 'bg-[#E6F7F2] dark:bg-teal-950/60 text-[#0D9488] dark:text-[#2DD4BF] border-[#0D9488]/30 shadow-sm',
    crimson: 'bg-[#FDF2F2] dark:bg-rose-950/60 text-[#EE3E4C] border-[#EE3E4C]/30 shadow-sm',
    orange: 'bg-[#FEF3C7] dark:bg-amber-950/60 text-[#D97706] dark:text-[#FBBF24] border-[#F59E0B]/30 shadow-sm',
    amber: 'bg-[#FEF3C7] dark:bg-amber-950/60 text-[#D97706] dark:text-[#FBBF24] border-[#F59E0B]/30 shadow-sm',
    rose: 'bg-[#FDF2F2] dark:bg-rose-950/60 text-[#EE3E4C] border-[#EE3E4C]/30 shadow-sm',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors',
          variants[variant],
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
};
