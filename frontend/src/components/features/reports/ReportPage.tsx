import { ReportHeader } from './ReportHeader';
import { StatRow } from './StatRow';
import { AINote } from './AINote';
import { CheckCircle2, ChevronDown, History, Share2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { motion } from 'framer-motion';

export function ReportPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <ReportHeader title="일간 건강 리포트" />

            <main className="flex-1 p-5 space-y-8 pb-20">
                {/* Date Selector */}
                <section className="space-y-4">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Daily Report</p>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">1월 30일</h1>
                        </div>
                        <span className="text-sm text-slate-300 font-bold mb-1">2026</span>
                    </div>

                    <button className="flex items-center gap-2 rounded-2xl bg-slate-50 px-5 py-3 border border-slate-100 active:scale-95 transition-all">
                        <span className="text-signal-blue font-bold">워크인 냉동고 A</span>
                        <ChevronDown size={18} className="text-slate-400" />
                    </button>
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

                {/* Statistics Section */}
                <section className="space-y-4">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
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

                {/* Footer Actions */}
                <div className="flex gap-3 pt-4">
                    <Button variant="secondary" className="flex-1 py-4 bg-slate-50 border-none">
                        <History size={18} />
                        히스토리
                    </Button>
                    <Button variant="primary" className="flex-1 py-4 shadow-blue-500/20 shadow-lg">
                        <Share2 size={18} />
                        공유하기
                    </Button>
                </div>
            </main>
        </div>
    );
}
