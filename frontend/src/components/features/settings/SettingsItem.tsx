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
        <motion.div
            onClick={type === 'toggle' ? onToggle : onClick}
            whileHover={{ x: type === 'link' ? 4 : 0 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
                    <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ChevronRight className="size-5 text-slate-300" />
                    </motion.div>
                )}

                {type === 'toggle' && (
                    <div className={cn(
                        "w-12 h-7 rounded-full px-0.5 flex items-center transition-colors duration-300",
                        isToggled ? "bg-signal-blue" : "bg-slate-200"
                    )}>
                        <motion.div
                            layout
                            className="size-6 bg-white rounded-full shadow-sm"
                            transition={{
                                type: "spring",
                                stiffness: 600,
                                damping: 30,
                                scale: {
                                    type: "spring",
                                    stiffness: 700,
                                    damping: 20
                                }
                            }}
                            initial={false}
                            animate={{
                                x: isToggled ? 20 : 0,
                                scale: isToggled ? [1, 1.1, 1] : [1, 0.9, 1]
                            }}
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
}
