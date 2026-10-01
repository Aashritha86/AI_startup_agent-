import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'glass-card rounded-2xl p-6 text-[#0F172A] dark:text-slate-100 relative overflow-hidden',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={twMerge(clsx('flex flex-col space-y-1.5 pb-4 border-b border-slate-200 dark:border-emerald-950/60 mb-4', className))} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h3 className={twMerge(clsx('text-xl font-bold tracking-tight text-[#0F172A] dark:text-white flex items-center gap-2', className))} {...props}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, children, ...props }) => {
  return (
    <p className={twMerge(clsx('text-sm text-slate-600 dark:text-slate-300 leading-relaxed', className))} {...props}>
      {children}
    </p>
  );
};
