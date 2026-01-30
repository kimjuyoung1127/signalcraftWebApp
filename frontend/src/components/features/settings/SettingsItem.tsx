import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

interface SettingsItemProps {
    icon?: ReactNode;
    title: string;
    value?: string;
    type?: 'link' | 'toggle' | 'info';
    isToggled?: boolean;
    onToggle?: () => void;
    onClick?: () => void;
    className?: string;
}

export function SettingsItem({
    icon,
    title,
    value,
    type = 'link',
    isToggled,
    onToggle,
    onClick,
    className
}: SettingsItemProps) {
    return (
        <div
            onClick={type === 'toggle' ? onToggle : onClick}
            className={cn(
                "flex items-center justify-between p-4 bg-white active:bg-slate-50 transition-colors cursor-pointer first:rounded-t-[1.5rem] last:rounded-b-[1.5rem] border-b border-slate-50 last:border-b-0",
                className
            )}
        >
            <div className="flex items-center gap-3">
                {icon && <div className="text-slate-400">{icon}</div>}
                <span className="text-[15px] font-medium text-slate-700">{title}</span>
            </div>

            <div className="flex items-center gap-2">
                {value && <span className="text-sm font-medium text-signal-blue">{value}</span>}

                {type === 'link' && (
                    <ChevronRight className="size-5 text-slate-300" />
                )}

                {type === 'toggle' && (
                    <div className={cn(
                        "w-12 h-7 rounded-full px-0.5 flex items-center transition-colors duration-300",
                        isToggled ? "bg-signal-blue" : "bg-slate-200"
                    )}>
                        <motion.div
                            layout
                            className="size-6 bg-white rounded-full shadow-sm"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            initial={false}
                            animate={{ x: isToggled ? 20 : 0 }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
