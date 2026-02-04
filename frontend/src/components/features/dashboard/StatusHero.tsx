import { useState } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { AIInsightModal } from '../reports/AIInsightModal';

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

interface DashboardSummary {
    GOOD: number;
    WARNING: number;
    DANGER: number;
}

interface StatusHeroProps {
    summary?: DashboardSummary;
    isLoading?: boolean;
}

export function StatusHero({ summary, isLoading }: StatusHeroProps) {
    const [isInsightOpen, setIsInsightOpen] = useState(false);

    const hasDanger = (summary?.DANGER || 0) > 0;
    const hasWarning = (summary?.WARNING || 0) > 0;

    const getStatusInfo = () => {
        if (isLoading) {
            return {
                title: "설비 상태를\n확인하는 중입니다",
                subtitle: "잠시만 기다려 주세요...",
                color: "from-slate-400 to-slate-500",
                shadow: "shadow-slate-400/20",
                icon: <Loader2 className="size-12 text-white animate-spin" />,
                isInitial: true
            };
        }
        if (hasDanger) {
            return {
                title: "즉시 점검이 필요한\n설비가 있어요",
                subtitle: `위험 ${summary?.DANGER}건 / 주의 ${summary?.WARNING}건 감지`,
                color: "from-rose-500 to-rose-600",
                shadow: "shadow-rose-500/30",
                icon: <AlertCircle className="size-12 text-white fill-white/20" />
            };
        }
        if (hasWarning) {
            return {
                title: "설비 상태를\n확인해 주세요",
                subtitle: `주의 ${summary?.WARNING}건이 발생했어요`,
                color: "from-amber-400 to-amber-500",
                shadow: "shadow-amber-500/30",
                icon: <AlertTriangle className="size-12 text-white fill-white/20" />
            };
        }
        return {
            title: "설비가 안전하게\n보호되고 있어요",
            subtitle: "현재 모든 시스템이 정상입니다",
            color: "from-signal-blue to-[#1c64f2]",
            shadow: "shadow-blue-500/30",
            icon: <CheckCircle2 className="size-12 text-white fill-white/20" />
        };
    };

    const status = getStatusInfo();

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-4 py-2 pb-6"
            >
                <div className={`w-full bg-linear-to-br ${status.color} rounded-[2.5rem] p-10 shadow-2xl ${status.shadow} text-white flex flex-col items-center justify-center text-center relative overflow-hidden group transition-colors duration-500`}>
                    {/* Dynamic Background blobs */}
                    {!isLoading && (
                        <>
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
                        </>
                    )}

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
                            whileHover={isLoading ? {} : { scale: 1.05, rotate: [0, -5, 5, 0] }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className={`p-4 ${isLoading ? 'bg-white/10' : 'bg-white/20'} rounded-full backdrop-blur-md border border-white/30 shadow-lg transition-colors`}>
                                {status.icon}
                            </div>
                        </motion.div>

                        <div className="space-y-2">
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl font-black tracking-tight leading-tight whitespace-pre-line"
                            >
                                {status.title}
                            </motion.h1>
                            <motion.p
                                variants={itemVariants}
                                className="text-blue-50 font-semibold opacity-80 text-lg"
                            >
                                {status.subtitle}
                            </motion.p>
                        </div>

                        {!isLoading && (
                            <motion.button
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsInsightOpen(true)}
                                className="flex items-center gap-2 bg-black/10 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 group-hover:bg-black/20 transition-all cursor-pointer"
                            >
                                <div className="relative flex items-center justify-center">
                                    <div className="size-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                    <div className="absolute size-4 border border-emerald-400/50 rounded-full animate-ping" />
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-blue-50">AI Live Monitoring</span>
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>

            <AIInsightModal
                isOpen={isInsightOpen}
                onClose={() => setIsInsightOpen(false)}
            />
        </>
    );
}
