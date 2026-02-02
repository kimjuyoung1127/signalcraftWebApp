import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Search } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface HistoryViewProps {
    onSelectDate: (date: string) => void;
}

export function HistoryView({ onSelectDate }: HistoryViewProps) {
    const reports = [
        { date: '1월 30일', status: 'Optimal', health: 98, summary: '어제 가동 상태 완벽함' },
        { date: '1월 29일', status: 'Warning', health: 82, summary: '필터 청소 주기 도래' },
        { date: '1월 28일', status: 'Optimal', health: 95, summary: '안정적인 전력 소모' },
        { date: '1월 27일', status: 'Optimal', health: 96, summary: '제상 주기 정상' },
        { date: '1월 26일', status: 'Normal', health: 91, summary: '도어 개방 횟수 소폭 증가' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            {/* Search / Filter */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="날짜 또는 키워드 검색"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-signal-blue/20 font-bold text-sm text-slate-600"
                />
            </div>

            {/* List */}
            <div className="space-y-3">
                {reports.map((report, i) => (
                    <button
                        key={i}
                        onClick={() => onSelectDate(report.date)}
                        className="w-full flex items-center justify-between p-5 rounded-[2rem] bg-white border border-slate-100 hover:border-signal-blue/30 hover:shadow-lg hover:shadow-slate-200/50 transition-all active:scale-[0.98] group text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "size-14 rounded-2xl flex flex-col items-center justify-center font-black",
                                report.status === 'Optimal' ? "bg-emerald-50 text-emerald-600" :
                                    report.status === 'Warning' ? "bg-amber-50 text-amber-600" :
                                        "bg-blue-50 text-blue-600"
                            )}>
                                <span className="text-[10px] uppercase line-height-none mb-0.5">{report.health}%</span>
                                <Calendar size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 leading-tight">{report.date} 리포트</h4>
                                <p className="text-xs text-slate-400 font-bold mt-1">{report.summary}</p>
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-signal-blue transition-colors" />
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
