import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusHero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 pb-6"
        >
            <div className="w-full bg-linear-to-br from-signal-blue to-[#1c64f2] rounded-[2.5rem] p-10 shadow-2xl shadow-blue-500/30 text-white flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Animated Background blobs for depth */}
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                    className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"
                />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <div className="p-4 bg-white/20 rounded-full backdrop-blur-md border border-white/30">
                            <CheckCircle2 className="size-12 text-white fill-white/20" />
                        </div>
                    </motion.div>

                    <div className="space-y-2">
                        <h1 className="text-4xl font-black tracking-tight leading-tight">설비가 안전하게<br />보호되고 있어요</h1>
                        <p className="text-blue-50 font-semibold opacity-80 text-lg">현재 모든 시스템이 정상입니다</p>
                    </div>

                    <div className="flex items-center gap-2 bg-black/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10">
                        <div className="size-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-blue-50">AI Live Monitoring</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
