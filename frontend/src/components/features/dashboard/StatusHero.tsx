import { CheckCircle2, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 pb-6"
        >
            <div className="w-full bg-signal-blue rounded-[2rem] p-8 shadow-xl shadow-blue-500/25 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <CheckCircle2 className="size-16 text-white fill-white/20" />
                    </motion.div>

                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold tracking-tight">모든 설비 정상</h1>
                        <p className="text-blue-100 font-medium opacity-90">현재 이상 징후가 발견되지 않았습니다</p>
                    </div>

                    <div className="mt-2 flex items-center gap-2 bg-white/15 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                        <RefreshCcw className="size-3 animate-spin-slow" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">AI 실시간 감시 중</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
