import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
    children: React.ReactNode;
}

export function Badge({ children, className, variant = 'neutral', ...props }: BadgeProps) {
    const variants = {
        success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        warning: 'bg-orange-50 text-orange-600 border-orange-100',
        error: 'bg-red-50 text-red-600 border-red-100',
        info: 'bg-blue-50 text-blue-600 border-blue-100',
        neutral: 'bg-slate-50 text-slate-500 border-slate-100',
    };

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black border uppercase tracking-wider",
                variants[variant],
                className
            )}
            {...props}
        >
            {variant === 'success' && (
                <span className="relative flex size-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
            )}
            {children}
        </span>
    );
}
