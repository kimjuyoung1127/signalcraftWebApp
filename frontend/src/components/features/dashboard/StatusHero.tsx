import { CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 25 }
    }
};

export function StatusHero() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="px-4 py-2 pb-6"
        >
            <div className="w-full bg-linear-to-br from-signal-blue to-[#1c64f2] rounded-[2.5rem] p-10 shadow-2xl shadow-blue-500/30 text-white flex flex-col items-center justify-center text-center relative overflow-hidden group">
                {/* Dynamic Background blobs */}
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
                    className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-white/10 rounded-full blur-[60px]"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 40, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-signal-mint/10 rounded-full blur-[60px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [0.8, 1, 0.8]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/5 rounded-full blur-[80px]"
                />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <div className="p-4 bg-white/20 rounded-full backdrop-blur-md border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
                            <CheckCircle2 className="size-12 text-white fill-white/20" />
                        </div>
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl font-black tracking-tight leading-tight"
                        >
                            설비가 안전하게<br />보호되고 있어요
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-blue-50 font-semibold opacity-80 text-lg"
                        >
                            현재 모든 시스템이 정상입니다
                        </motion.p>
                    </div>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center gap-2 bg-black/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 group-hover:bg-black/20 transition-colors"
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="size-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                            <div className="absolute size-4 border border-emerald-400/50 rounded-full animate-ping" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-blue-50">AI Live Monitoring</span>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
