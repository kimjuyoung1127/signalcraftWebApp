import { useState } from 'react';
import { MoreHorizontal, Brain, Zap, AlertTriangle, CalendarClock, Trash2, Settings2, Snowflake, Thermometer, Wind, Box } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface Machine {
    id: string;
    name: string;
    location: string;
    status: 'running' | 'warning' | 'error';
    health: number;
    prediction: string;
    imageUrl: string;
    type: string;
}

interface MachineCardProps {
    machine: Machine;
    index: number;
    onClick?: (machine: Machine) => void;
    onManage?: (machine: Machine) => void;
    onDelete?: (id: string) => void;
}

export function MachineCard({ machine, index, onClick, onManage, onDelete }: MachineCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getStatusVariant = (status: Machine['status']) => {
        if (status === 'running') return 'success';
        if (status === 'warning') return 'warning';
        return 'error';
    };

    const getStatusLabel = (status: Machine['status']) => {
        if (status === 'running') return '가동 중';
        if (status === 'warning') return '점검 필요';
        return '정지됨';
    };

    const PredictionIcon = machine.status === 'warning' ? AlertTriangle : machine.id.includes('2') ? CalendarClock : Brain;

    const getMachineIcon = (type: string) => {
        const t = type?.toUpperCase() || '';
        if (t.includes('FREEZER') || t.includes('BLAST')) return <Snowflake className="size-9 sm:size-10 text-blue-500" />;
        if (t.includes('REFRIGERATOR')) return <Thermometer className="size-9 sm:size-10 text-cyan-500" />;
        if (t.includes('SHOWCASE')) return <Wind className="size-9 sm:size-10 text-indigo-500" />;
        if (t.includes('COLD') || t.includes('STORAGE')) return <Box className="size-9 sm:size-10 text-slate-500" />;
        return <Snowflake className="size-9 sm:size-10 text-blue-500" />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 20 }}
            className="px-2 sm:px-4 py-2 cursor-pointer relative"
        >
            <Card
                className="p-0 overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 group relative"
                onClick={() => onClick?.(machine)}
            >
                {/* Background Sparkle Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-signal-blue/0 via-signal-blue/[0.02] to-signal-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="p-4 sm:p-6 flex gap-4 sm:gap-6 relative z-10">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[1.25rem] sm:rounded-[1.5rem] border border-blue-100/50 overflow-hidden shadow-sm flex items-center justify-center"
                    >
                        {getMachineIcon(machine.type)}
                    </motion.div>

                    <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <motion.h4
                                    layout
                                    className="text-[16px] sm:text-[17px] font-black text-slate-900 leading-tight tracking-tight mb-0.5 group-hover:text-signal-blue transition-colors truncate"
                                >
                                    {machine.name}
                                </motion.h4>
                                <p className="text-[12px] sm:text-[13px] text-slate-400 font-bold tracking-tight truncate">
                                    {machine.location}
                                </p>
                            </div>
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsMenuOpen(!isMenuOpen);
                                    }}
                                    className="text-slate-300 p-2 hover:bg-slate-50 rounded-2xl transition-all active:scale-90"
                                >
                                    <MoreHorizontal size={20} />
                                </motion.button>

                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(4px)" }}
                                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(4px)" }}
                                            className="absolute right-0 top-12 w-32 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden"
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onManage?.(machine);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                                            >
                                                <Settings2 size={16} />
                                                관리
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete?.(machine.id);
                                                    setIsMenuOpen(false);
                                                }}
                                                className="w-full px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                                삭제
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-auto">
                            <motion.div
                                animate={machine.status === 'running' ? {
                                    scale: [1, 1.05, 1],
                                    opacity: [1, 0.9, 1]
                                } : {}}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            >
                                <Badge variant={getStatusVariant(machine.status)}>
                                    {getStatusLabel(machine.status)}
                                </Badge>
                            </motion.div>

                            <motion.div
                                animate={machine.health > 90 ? {
                                    boxShadow: ["0 0 0px rgba(16, 185, 129, 0)", "0 0 12px rgba(16, 185, 129, 0.2)", "0 0 0px rgba(16, 185, 129, 0)"]
                                } : {}}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100"
                            >
                                <Zap className={cn(
                                    "size-3.5",
                                    machine.health > 90 ? "text-signal-mint fill-signal-mint/20" : "text-signal-orange fill-signal-orange/20"
                                )} />
                                <span className="text-[12px] font-black text-slate-600">
                                    {machine.health}%
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={false}
                    animate={{ backgroundColor: machine.status === 'warning' ? "rgba(239, 68, 68, 0.05)" : "rgba(248, 250, 252, 0.5)" }}
                    className={cn(
                        "px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 transition-all border-t border-slate-50",
                        machine.status === 'warning' ? "text-signal-red" : "text-slate-600"
                    )}
                >
                    <div className={cn(
                        "p-2 rounded-xl backdrop-blur-sm",
                        machine.status === 'warning' ? "bg-signal-red/10" : "bg-signal-blue/10"
                    )}>
                        <PredictionIcon className={cn(
                            "size-4",
                            machine.status === 'warning' ? "text-signal-red" : "text-signal-blue"
                        )} />
                    </div>
                    <p className="text-[13px] font-bold tracking-tight leading-snug">
                        {machine.prediction}
                    </p>
                </motion.div>
            </Card>
        </motion.div>
    );
}
