import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Zap, Brain } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface AIInsightModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Period = 'daily' | 'weekly' | 'monthly';

export function AIInsightModal({ isOpen, onClose }: AIInsightModalProps) {
    const [period, setPeriod] = useState<Period>('daily');

    const periods = [
        { id: 'daily', label: '일간' },
        { id: 'weekly', label: '주간' },
        { id: 'monthly', label: '월간' },
    ];

    const getInsightData = (p: Period) => {
        // Mocking insufficient data for specific conditions (e.g., if we wanted to test it)
        // For now, let's assume data is always there, but we prepared the UI for null.
        // To demonstrate, you could uncomment the following line:
        // if (p === 'monthly') return null;

        switch (p) {
            case 'daily':
                return {
                    score: 98,
                    status: 'Excellent',
                    summary: "모든 설비가 안정적으로 가동되었습니다.",
                    metrics: [
                        { label: '가동률', value: '94%', change: '+2%', isGood: true },
                        { label: '에너지 효율', value: 'High', change: 'Optimal', isGood: true },
                        { label: '이상 감지', value: '0건', change: '-1', isGood: true },
                    ],
                    timeline: [
                        { time: '09:00', event: '가동 시작', type: 'info' },
                        { time: '14:30', event: '피크 부하 감지 (정상 범위)', type: 'warning' },
                        { time: '18:00', event: '안정 모드 전환', type: 'success' },
                    ],
                    aiAdvice: "현재 가동 패턴이 매우 이상적입니다. 내일도 이 패턴을 유지하면 약 5%의 추가 에너지 절감이 예상됩니다."
                };
            case 'weekly':
                return {
                    score: 92,
                    status: 'Good',
                    summary: "전반적으로 양호하나 화요일에 짧은 과부하가 있었습니다.",
                    metrics: [
                        { label: '평균 가동률', value: '88%', change: '-1%', isGood: false },
                        { label: '누적 절감액', value: '₩45,200', change: '+12%', isGood: true },
                        { label: '이상 감지', value: '2건', change: '+1', isGood: false },
                    ],
                    timeline: [
                        { time: '월요일', event: '정기 점검 완료', type: 'success' },
                        { time: '화요일', event: '냉동고 B 일시적 온도 상승', type: 'alert' },
                        { time: '목요일', event: '펌프 진동 패턴 안정화', type: 'info' },
                    ],
                    aiAdvice: "화요일 오후 2시경 발생한 온도 상승은 도어 개방 빈도와 관련이 있습니다. 피크 타임 도어 관리에 유의해주세요."
                };
            case 'monthly':
                // Triggering empty state for demonstration if needed, or keeping it populated.
                // User asked to "add exception handling".
                // I will return null here to show the "insufficient data" state as requested.
                return null;
            default: return null;
        }
    };

    const data = getInsightData(period);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[10%] bottom-[10%] max-w-lg mx-auto bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-slate-50 border-b border-slate-100 p-6 pb-0">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-signal-blue">
                                    <Brain size={24} className="fill-signal-blue/20" />
                                    <h2 className="text-lg font-black tracking-tight">AI Insight Analysis</h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="size-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-500 hover:bg-slate-200 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex p-1 bg-slate-200/50 rounded-2xl mb-6">
                                {periods.map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setPeriod(p.id as Period)}
                                        className={cn(
                                            "flex-1 py-2.5 text-sm font-bold rounded-xl transition-all",
                                            period === p.id
                                                ? "bg-white text-slate-900 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {data ? (
                                <>
                                    {/* Summary Section */}
                                    <section className="text-center space-y-2">
                                        <div className="inline-flex items-center justify-center size-24 rounded-full bg-signal-blue/5 mb-2 relative">
                                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#e2e8f0"
                                                    strokeWidth="3"
                                                />
                                                <motion.path
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: data.score / 100 }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="#3b82f6"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                <span className="text-3xl font-black text-slate-900">{data.score}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900">{data.status}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">{data.summary}</p>
                                    </section>

                                    {/* Metrics Grid */}
                                    <section className="grid grid-cols-3 gap-3">
                                        {data.metrics.map((metric, idx) => (
                                            <div key={idx} className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100">
                                                <p className="text-[11px] font-bold text-slate-400 mb-1">{metric.label}</p>
                                                <p className="text-base font-black text-slate-900 mb-1">{metric.value}</p>
                                                <p className={cn(
                                                    "text-[10px] font-bold",
                                                    metric.isGood ? "text-emerald-500" : "text-rose-500"
                                                )}>
                                                    {metric.change}
                                                </p>
                                            </div>
                                        ))}
                                    </section>

                                    {/* Timeline */}
                                    <section>
                                        <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            주요 이벤트
                                        </h4>
                                        <div className="space-y-4 pl-2 border-l-2 border-slate-100 ml-2">
                                            {data.timeline.map((item, idx) => (
                                                <div key={idx} className="relative pl-6">
                                                    <div className={cn(
                                                        "absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-white shadow-sm",
                                                        item.type === 'info' ? "bg-slate-300" :
                                                            item.type === 'warning' ? "bg-amber-400" :
                                                                item.type === 'alert' ? "bg-rose-500" : "bg-emerald-500"
                                                    )} />
                                                    <p className="text-xs font-bold text-slate-400 mb-0.5">{item.time}</p>
                                                    <p className="text-sm font-bold text-slate-700">{item.event}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* AI Advice */}
                                    <section className="bg-gradient-to-br from-signal-blue to-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden">

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 mb-3 opacity-90">
                                                <Zap size={16} fill="currentColor" />
                                                <span className="text-xs font-black uppercase tracking-widest">AI Action Item</span>
                                            </div>
                                            <p className="text-lg font-bold leading-relaxed opacity-95">
                                                "{data.aiAdvice}"
                                            </p>
                                        </div>
                                    </section>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-10 space-y-4 text-center"
                                >
                                    <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center">
                                        <Brain size={32} className="text-slate-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-slate-900">데이터가 부족합니다</h3>
                                        <p className="text-sm text-slate-500 font-medium">
                                            아직 충분한 데이터가 수집되지 않았습니다.<br />
                                            조금 더 설비를 가동한 후 다시 확인해주세요.
                                        </p>
                                    </div>
                                    <div className="px-4 py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-400 border border-slate-100 mt-4">
                                        💡 Tip: 정확한 분석을 위해 최소 24시간의 가동 데이터가 필요합니다.
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
