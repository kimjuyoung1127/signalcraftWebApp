import { PlusCircle, BarChart3, BellOff, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function QuickActions() {
    const actions = [
        { id: 'add', icon: PlusCircle, label: '기기 추가', color: 'text-signal-blue', path: '#' },
        { id: 'report', icon: BarChart3, label: '리포트 보기', color: 'text-emerald-500', path: '/report' },
        { id: 'silence', icon: BellOff, label: '알림 일시정지', color: 'text-slate-500', path: '#' },
        { id: 'settings', icon: Settings2, label: '고급 설정', color: 'text-slate-500', path: '#' },
    ];

    return (
        <div className="flex gap-4 overflow-x-auto px-4 py-4 no-scrollbar">
            {actions.map((action, idx) => (
                <motion.div
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex-shrink-0"
                >
                    <Link
                        to={action.path}
                        className="flex items-center gap-2.5 rounded-2xl h-14 px-6 bg-white shadow-sm border border-slate-100 text-slate-900 text-sm font-bold hover:border-blue-100 transition-colors active:scale-95 flex"
                    >
                        <action.icon className={action.color} size={18} />
                        <span className="whitespace-nowrap">{action.label}</span>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
