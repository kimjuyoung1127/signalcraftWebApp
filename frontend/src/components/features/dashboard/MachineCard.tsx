import { MoreHorizontal, Brain, Zap, AlertTriangle, CalendarClock } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { motion } from 'framer-motion';
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
}

export function MachineCard({ machine, index, onClick }: MachineCardProps) {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100, damping: 20 }}
            className="px-4 py-2 cursor-pointer"
            onClick={() => onClick?.(machine)}
        >
            <Card className="p-0 overflow-hidden border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 group">
                <div className="p-6 flex gap-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-24 h-24 shrink-0 bg-slate-100 rounded-[1.5rem] bg-center bg-cover border border-slate-50 overflow-hidden"
                        style={{ backgroundImage: `url(${machine.imageUrl})` }}
                    />

                    <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-[17px] font-black text-slate-900 leading-tight tracking-tight mb-0.5 group-hover:text-signal-blue transition-colors">
                                    {machine.name}
                                </h4>
                                <p className="text-[13px] text-slate-400 font-bold tracking-tight">
                                    {machine.location}
                                </p>
                            </div>
                            <button className="text-slate-300 p-2 hover:bg-slate-50 rounded-2xl transition-all active:scale-90">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="flex items-center gap-2.5 mt-auto">
                            <Badge variant={getStatusVariant(machine.status)}>
                                {getStatusLabel(machine.status)}
                            </Badge>

                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                <Zap className={cn(
                                    "size-3.5",
                                    machine.health > 90 ? "text-signal-mint fill-signal-mint/20" : "text-signal-orange fill-signal-orange/20"
                                )} />
                                <span className="text-[12px] font-black text-slate-600">
                                    {machine.health}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cn(
                    "px-6 py-4 flex items-center gap-3 transition-all border-t border-slate-50",
                    machine.status === 'warning' ? "bg-signal-red/5 text-signal-red" : "bg-slate-50/50 text-slate-600"
                )}>
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
                </div>
            </Card>
        </motion.div>
    );
}
