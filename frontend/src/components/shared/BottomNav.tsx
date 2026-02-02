import { LayoutDashboard, Zap, Settings, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BottomNav() {
    const location = useLocation();

    const tabs = [
        { id: 'dashboard', icon: LayoutDashboard, label: '홈', path: '/dashboard' },
        { id: 'machines', icon: Zap, label: '설비', path: '/machines' },
        { id: 'reports', icon: BarChart3, label: '리포트', path: '/report' },
        { id: 'settings', icon: Settings, label: '설정', path: '/settings' },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-white/90 backdrop-blur-2xl border-t border-slate-100/50 pb-safe z-50">
            <div className="flex justify-around items-center h-20 px-2 max-w-lg mx-auto">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.id}
                            to={tab.path}
                            className="relative flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300"
                        >
                            <motion.div
                                whileTap={{ scale: 0.85 }}
                                className={cn(
                                    "relative z-10 flex flex-col items-center gap-1",
                                    isActive ? "text-signal-blue" : "text-slate-400"
                                )}
                            >
                                <motion.div
                                    animate={isActive ? { y: -2 } : { y: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <tab.icon
                                        size={22}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className="transition-all"
                                    />
                                </motion.div>
                                <span className={cn(
                                    "text-[10px] font-black tracking-tight",
                                    isActive ? "opacity-100" : "opacity-60"
                                )}>
                                    {tab.label}
                                </span>
                            </motion.div>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-x-2 inset-y-2 bg-signal-blue/5 rounded-2xl z-0"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30
                                    }}
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
