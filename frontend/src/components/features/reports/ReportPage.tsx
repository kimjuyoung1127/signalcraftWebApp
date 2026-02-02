import { useState } from 'react';
import { StatRow } from './StatRow';
import { AINote } from './AINote';
import { HistoryView } from './HistoryView';
import { ShareModal } from './ShareModal';
import { CheckCircle2, ChevronDown, History, Share2, TrendingUp, Zap } from 'lucide-react';
import { Button } from '../../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { BottomNav } from '../../shared/BottomNav';
import { Header } from '../../shared/Header';

type ViewMode = 'report' | 'history';

export function ReportPage() {
    const [viewMode, setViewMode] = useState<ViewMode>('report');
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('1월 30일');

    const trendData = [
        { day: '월', health: 95 },
        { day: '화', health: 92 },
        { day: '수', health: 88 },
        { day: '목', health: 94 },
        { day: '금', health: 98 },
        { day: '토', health: 96 },
        { day: '일', health: 98 },
    ];

    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            <Header />

            <main className="flex-1 overflow-y-auto px-5 pt-6 space-y-8">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        {viewMode === 'report' ? "오늘의 리포트" : "히스토리"}
                    </h2>
                    <button
                        onClick={() => setIsShareOpen(true)}
                        className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm text-signal-blue active:scale-90 transition-all font-bold"
                    >
                        <Share2 size={20} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'report' ? (
                        <motion.div
                            key="report-content"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-8"
                        >
                            {/* Date Selector */}
                            <section className="space-y-4">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Report</p>
                                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedDate}</h1>
                                    </div>
                                    <span className="text-sm text-slate-300 font-bold mb-1">2026</span>
                                </div>

                                <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 border border-slate-100 active:scale-95 transition-all shadow-sm">
                                    <span className="text-signal-blue font-bold">워크인 냉동고 A</span>
                                    <ChevronDown size={18} className="text-slate-400" />
                                </button>
                            </section>

                            {/* Weekly Trend Chart */}
                            <section className="space-y-4">
                                <h3 className="section-label flex items-center gap-2">
                                    <TrendingUp size={18} className="text-signal-blue" />
                                    주간 건강 트렌드
                                </h3>
                                <div className="h-48 w-full p-4 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData}>
                                            <defs>
                                                <linearGradient id="reportTrend" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                labelStyle={{ fontWeight: 900 }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="health"
                                                stroke="#3B82F6"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#reportTrend)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>

                            {/* Executive Summary */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative overflow-hidden rounded-[2rem] bg-emerald-50/50 p-6 border border-emerald-100"
                            >
                                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-400" />
                                <div className="flex items-start gap-4">
                                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm shadow-emerald-200/50">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600/70">상태 요약</h3>
                                        <p className="text-xl font-black text-slate-900 leading-tight">어제 설비 상태는 완벽했습니다.</p>
                                        <p className="text-sm text-slate-500 font-bold">정상 가동 범위 내에서 안정적으로 작동함</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Energy Insight Card */}
                            <section className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                                <div className="absolute -right-4 -top-4 opacity-10">
                                    <Zap size={100} />
                                </div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Energy Saving</p>
                                        <h4 className="text-xl font-black italic">어제보다 15% 아꼈어요!</h4>
                                        <p className="text-sm text-slate-400 font-bold">에너지 최적화로 예상 전기료 <span className="text-signal-blue">₩12,400</span> 절감</p>
                                    </div>
                                    <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <Zap size={24} className="text-amber-400" />
                                    </div>
                                </div>
                            </section>

                            {/* Statistics Section */}
                            <section className="space-y-4">
                                <h3 className="section-label flex items-center gap-2">
                                    <div className="size-2 bg-signal-blue rounded-full" />
                                    핵심 통계
                                </h3>
                                <div className="divide-y divide-slate-50 border border-slate-100 rounded-[2rem] px-6 bg-white shadow-sm">
                                    <StatRow
                                        label="총 가동 시간"
                                        value="18시간 30분"
                                        status="Normal"
                                        progress={75}
                                    />
                                    <StatRow
                                        label="휴식 시간"
                                        value="5시간 30분"
                                        status="Optimal"
                                        progress={25}
                                        color="bg-emerald-400"
                                        subtext="(컴프레서가 충분히 휴식함)"
                                    />
                                </div>
                            </section>

                            <AINote />
                        </motion.div>
                    ) : (
                        <HistoryView onSelectDate={(date) => {
                            setSelectedDate(date);
                            setViewMode('report');
                        }} />
                    )}
                </AnimatePresence>

                {/* Footer Actions */}
                <div className="flex gap-3 pt-4 sticky bottom-5 z-30 pb-4">
                    <Button
                        variant="secondary"
                        onClick={() => setViewMode(viewMode === 'report' ? 'history' : 'report')}
                        className="flex-1 py-4 bg-white/80 backdrop-blur-md border border-slate-100 shadow-xl"
                    >
                        {viewMode === 'report' ? (
                            <>
                                <History size={18} />
                                히스토리
                            </>
                        ) : (
                            <>
                                <CheckCircle2 size={18} />
                                현재 리포트
                            </>
                        )}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setIsShareOpen(true)}
                        className="flex-1 py-4 shadow-blue-500/20 shadow-lg"
                    >
                        <Share2 size={18} />
                        공유하기
                    </Button>
                </div>
            </main>

            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                reportDate={selectedDate}
            />

            <BottomNav />
        </div>
    );
}
