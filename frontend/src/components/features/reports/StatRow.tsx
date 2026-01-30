import { Badge } from '../../ui/Badge';

interface StatRowProps {
    label: string;
    value: string;
    status: 'Normal' | 'Optimal' | 'Alert';
    progress: number;
    color?: string;
    subtext?: string;
}

export function StatRow({ label, value, status, progress, color = "bg-signal-blue", subtext }: StatRowProps) {
    const getBadgeVariant = (s: string) => {
        if (s === 'Normal' || s === 'Optimal') return 'success';
        return 'warning';
    };

    return (
        <div className="flex flex-col gap-3 py-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">{label}</span>
                <Badge variant={getBadgeVariant(status)}>{status}</Badge>
            </div>

            <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">{value}</span>
                {subtext && <span className="text-xs text-slate-400 font-medium italic">{subtext}</span>}
            </div>

            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-1000", color)}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

import { cn } from '../../../lib/utils';
