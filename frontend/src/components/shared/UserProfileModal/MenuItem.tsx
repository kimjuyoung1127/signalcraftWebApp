import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface MenuItemProps {
    id: string;
    label: string;
    icon: LucideIcon;
    color: string;
    right?: string;
    onClick: () => void;
}

export function MenuItem({ label, icon: Icon, color, right, onClick }: MenuItemProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-5 rounded-[1.5rem] bg-white border border-slate-50 hover:bg-slate-50 transition-all active:scale-[0.98] group"
        >
            <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl transition-transform group-hover:scale-110", color)}>
                    <Icon size={20} />
                </div>
                <span className="text-base font-black text-slate-700">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {right && <span className="text-xs font-bold text-slate-400">{right}</span>}
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
        </button>
    );
}
