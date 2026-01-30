import { LayoutDashboard, Zap, Settings, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export function BottomNav() {
    const location = useLocation();

    const tabs = [
        { id: 'dashboard', icon: LayoutDashboard, label: '대시보드', path: '/dashboard' },
        { id: 'machines', icon: Zap, label: '설비관리', path: '/machines' },
        { id: 'reports', icon: BarChart3, label: '리포트', path: '/report' },
        { id: 'settings', icon: Settings, label: '설정', path: '/settings' },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 pb-safe z-50">
            <div className="flex justify-around items-center h-20 px-4">
                {tabs.map((tab) => {
                    const isActive = location.pathname === tab.path;
                    return (
                        <Link
                            key={tab.id}
                            to={tab.path}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full gap-1.5 transition-all duration-300",
                                isActive ? "text-signal-blue" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            <div className="relative">
                                <tab.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                {tab.id === 'alerts' && (
                                    <span className="absolute -top-0.5 -right-0.5 size-2.5 bg-rose-500 rounded-full border-2 border-white" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold tracking-tighter uppercase",
                                isActive ? "opacity-100" : "opacity-70"
                            )}>
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
