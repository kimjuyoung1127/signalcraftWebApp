import { MoreHorizontal, Brain, Zap, AlertTriangle, CalendarClock } from 'lucide-react';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { motion } from 'framer-motion';

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
}

export function MachineCard({ machine, index }: MachineCardProps) {
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
        >
            <Card className="p-0 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-5 flex gap-5">
                    <div
                        className="w-24 h-24 shrink-0 bg-slate-100 rounded-2xl bg-center bg-cover border border-slate-100 dark:border-slate-800"
                        style={{ backgroundImage: `url(${machine.imageUrl})` }}
                    />
                    <div className="flex flex-col flex-1 py-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-bold text-slate-900 leading-tight">{machine.name}</h4>
                                <p className="text-sm text-slate-500 font-medium">{machine.location}</p>
                            </div>
                            <button className="text-slate-400 p-1 hover:bg-slate-50 rounded-full transition-colors">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <div className="mt-auto flex items-center gap-2">
                            <Badge variant={getStatusVariant(machine.status)}>
                                {getStatusLabel(machine.status)}
                            </Badge>
                            <div className="w-1 h-1 bg-slate-300 rounded-full" />
                            <div className="flex items-center gap-1">
                                <Zap className="size-3 text-amber-500 fill-amber-500" />
                                <span className="text-xs font-bold text-slate-600 font-mono">건강도 {machine.health}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cn(
                    "px-5 py-3.5 flex items-center gap-2.5 transition-colors",
                    machine.status === 'warning' ? "bg-amber-50 text-amber-900" : "bg-slate-50 text-slate-600"
                )}>
                    <PredictionIcon className={cn(
                        "size-4 shrink-0",
                        machine.status === 'warning' ? "text-amber-600" : "text-signal-blue"
                    )} />
                    <p className="text-[13px] font-semibold tracking-tight">
                        {machine.prediction}
                    </p>
                </div>
            </Card>
        </motion.div>
    );
}

import { cn } from '../../../lib/utils';
