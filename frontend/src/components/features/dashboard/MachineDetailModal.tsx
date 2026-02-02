import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Volume2, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { type Machine } from './MachineCard';
import { Badge } from '../../ui/Badge';
import { cn } from '../../../lib/utils';

interface MachineDetailModalProps {
    machine: Machine | null;
    isOpen: boolean;
    onClose: () => void;
}

export function MachineDetailModal({ machine, isOpen, onClose }: MachineDetailModalProps) {
    if (!machine) return null;

    const getStatusTheme = (status: Machine['status']) => {
        if (status === 'running') return { color: 'text-signal-mint', bg: 'bg-signal-mint/10', border: 'border-signal-mint/20' };
        if (status === 'warning') return { color: 'text-signal-orange', bg: 'bg-signal-orange/10', border: 'border-signal-orange/20' };
        return { color: 'text-signal-red', bg: 'bg-signal-red/10', border: 'border-signal-red/20' };
    };

    const theme = getStatusTheme(machine.status);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-[3rem] z-[101] overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Handle bar */}
                        <div className="w-full flex justify-center py-4">
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full" />
                        </div>

                        {/* Header */}
                        <div className="px-6 pb-6 flex items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-4">
                                <div className={cn("p-3 rounded-2xl", theme.bg)}>
                                    <Volume2 className={cn("size-6", theme.color)} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-slate-900 leading-tight">{machine.name}</h2>
                                    <p className="text-sm text-slate-400 font-bold">{machine.location}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                            {/* Health Score Hero */}
                            <section className="relative">
                                <div className="flex flex-col items-center justify-center py-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden">
                                    {/* Background Pulse Animation */}
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className={cn("absolute inset-0 rounded-full blur-3xl", theme.bg)}
                                    />

                                    <div className="relative flex flex-col items-center">
                                        <div className="text-[64px] font-black text-slate-900 tracking-tighter leading-none mb-2">
                                            {machine.health}<span className="text-2xl text-slate-300 ml-1">%</span>
                                        </div>
                                        <Badge variant={machine.status === 'running' ? 'success' : machine.status === 'warning' ? 'warning' : 'error'}>
                                            AI 분석: {machine.status === 'running' ? '정상 작동' : machine.status === 'warning' ? '주의 단계' : '이상 감지'}
                                        </Badge>
                                    </div>
                                </div>
                            </section>

                            {/* Sound Spectrum Visualizer (Interactive Mock) */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                        <Activity size={20} className="text-signal-blue" />
                                        실시간 소음 에너지
                                    </h3>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Listening</span>
                                </div>
                                <div className="h-40 flex items-end gap-1.5 px-4 py-8 bg-slate-900 rounded-[2rem] overflow-hidden">
                                    {[...Array(32)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 10 }}
                                            animate={{
                                                height: [
                                                    Math.random() * 60 + 20,
                                                    Math.random() * 80 + 20,
                                                    Math.random() * 40 + 20
                                                ]
                                            }}
                                            transition={{
                                                duration: 0.5 + Math.random(),
                                                repeat: Infinity,
                                                repeatType: "reverse"
                                            }}
                                            className={cn(
                                                "flex-1 rounded-t-full transition-colors",
                                                i % 10 === 0 ? "bg-signal-blue" : "bg-white/20"
                                            )}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Key Frequency Analysis */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                    <Zap size={20} className="text-signal-orange" />
                                    주요 주파수 분석
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { hz: '60Hz', label: '엔진 구동음', status: '정상', value: 98 },
                                        { hz: '120Hz', label: '모터 회전음', status: '안정', value: 99 },
                                        { hz: '180Hz', label: '서브 하모닉', status: machine.status === 'warning' ? '관찰' : '정상', value: machine.status === 'warning' ? 72 : 94 },
                                        { hz: '535Hz', label: '공진 대역', status: '정상', value: 96 },
                                    ].map((item, i) => (
                                        <div key={i} className="p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-xs font-black text-slate-400">{item.hz}</span>
                                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold",
                                                    item.status === '정상' || item.status === '안정' ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 text-signal-orange")}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="text-xl font-black text-slate-900 tracking-tight">{item.value}%</div>
                                            <div className="text-[11px] font-bold text-slate-400 mt-0.5">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* AI Insights Card */}
                            <section className="pb-10">
                                <div className="p-6 rounded-[2rem] bg-signal-blue text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute -top-20 -right-20 size-60 bg-white/10 rounded-full blur-3xl"
                                    />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <span className="text-sm font-black tracking-wide">AI 인사이트</span>
                                        </div>
                                        <p className="text-lg font-bold leading-snug tracking-tight">
                                            {machine.prediction}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle size={14} className="text-blue-100" />
                                                <span className="text-xs font-medium text-blue-100">최근 업데이트: 5분 전</span>
                                            </div>
                                            <button className="text-xs font-black px-4 py-2 bg-white text-signal-blue rounded-xl">상세 리포트</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
