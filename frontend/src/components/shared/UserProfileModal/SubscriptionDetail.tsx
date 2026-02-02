import { motion } from 'framer-motion';
import { ChevronLeft, CreditCard, Sparkles, Clock, BarChart3 } from 'lucide-react';
import { Button } from '../../ui/Button';

interface SubscriptionDetailProps {
    onBack: () => void;
}

export function SubscriptionDetail({ onBack }: SubscriptionDetailProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col h-full"
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-black text-sm mb-6 transition-colors"
            >
                <ChevronLeft size={18} />
                계정으로 돌아가기
            </button>

            <div className="flex-1 space-y-6">
                {/* Current Plan Card */}
                <div className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Sparkles size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-signal-blue rounded-full text-[10px] font-black uppercase">Active</span>
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Premium Plan</span>
                        </div>
                        <h4 className="text-3xl font-black mb-1">PRO 멤버십</h4>
                        <p className="text-slate-400 text-sm font-bold mb-6">모든 AI 정밀 분석 기능을 사용 중입니다</p>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <Clock size={16} className="text-signal-blue" />
                                <span>다음 결제일: 2026년 2월 21일</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold">
                                <CreditCard size={16} className="text-signal-blue" />
                                <span>결제 수단: 현대카드 (**** 1234)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Usage Stats */}
                <div className="space-y-4">
                    <h5 className="text-sm font-black text-slate-900 px-2 flex items-center gap-2">
                        <BarChart3 size={16} className="text-signal-blue" />
                        이번 달 사용량
                    </h5>
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-bold text-slate-500">AI 정밀 소리 분석</span>
                            <span className="text-sm font-black text-slate-900">142 / 500회</span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '28%' }}
                                className="h-full bg-signal-blue"
                            />
                        </div>
                        <p className="mt-4 text-xs text-slate-400 font-bold leading-relaxed bread-keep">
                            PRO 플랜은 매달 500회의 정밀 분석을 제공합니다. (현재 28% 사용 중)
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-3">
                <Button className="w-full h-14 rounded-2xl font-black">구독 플랜 변경</Button>
                <Button variant="secondary" className="w-full h-14 rounded-2xl font-black text-rose-500 border-none hover:bg-rose-50 bg-slate-50">구독 해지 예약</Button>
            </div>
        </motion.div>
    );
}
