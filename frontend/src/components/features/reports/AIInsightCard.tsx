import { useState } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AIInsightModal } from './AIInsightModal';

export function AIInsightCard() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="relative overflow-hidden rounded-[2rem] bg-slate-900 cursor-pointer group shadow-xl shadow-slate-200"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-signal-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-signal-blue/30 transition-colors duration-500" />

                <div className="relative p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="size-8 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                                <Sparkles size={16} className="text-signal-blue animate-pulse" />
                            </div>
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Insight</span>
                        </div>
                        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            <ChevronRight size={18} className="text-white" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-white leading-tight">
                            오늘의 설비는 <span className="text-signal-blue">안정적</span>입니다.
                        </h3>
                        <p className="text-sm font-bold text-slate-400">
                            특이사항 없음 • 효율 94% 달성
                        </p>
                    </div>
                </div>
            </motion.div>

            <AIInsightModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
