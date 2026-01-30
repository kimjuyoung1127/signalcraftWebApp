import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function AINote() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-50 p-0.5 border border-blue-100 shadow-sm"
        >
            <div className="rounded-[1.4rem] bg-white/60 p-6 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2 text-signal-blue">
                    <Sparkles size={18} className="animate-pulse" />
                    <h3 className="text-xs font-black uppercase tracking-widest">SignalCraft AI Note</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-700 font-bold">
                    "새벽 <span className="text-slate-900 font-extrabold underline decoration-blue-200 decoration-4">오전 3:00</span>경, 일시적으로 큰 진동이 감지되었으나 곧 안정화되었습니다. 현재 조치가 필요한 사항은 없습니다."
                </p>
            </div>
        </motion.div>
    );
}
