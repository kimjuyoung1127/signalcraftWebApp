import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wrench, FileText, Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cn } from '../../../../../lib/utils';
import { Button } from '../../../../ui/Button';

interface MaintenanceRecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    machineId: string;
    machineName: string;
}

type ActionType = 'CLEANING' | 'CHECK' | 'PART_REPLACE';

const actionTypes: { id: ActionType; label: string; icon: any; color: string }[] = [
    { id: 'CLEANING', label: '청소/세척', icon: Wrench, color: 'text-signal-blue bg-signal-blue/10' },
    { id: 'CHECK', label: '정기 점검', icon: FileText, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'PART_REPLACE', label: '부품 교체', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
];

export function MaintenanceRecordModal({ isOpen, onClose, machineId, machineName }: MaintenanceRecordModalProps) {
    const [actionType, setActionType] = useState<ActionType>('CHECK');
    const [description, setDescription] = useState('');
    const [performedAt, setPerformedAt] = useState(new Date().toISOString().slice(0, 16));
    const [isSuccess, setIsSuccess] = useState(false);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/machine-detail/maintenance`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('저장에 실패했습니다.');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenance-history', machineId] });
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
                setDescription('');
            }, 2000);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({
            device_id: machineId,
            action_type: actionType,
            description,
            performed_at: performedAt
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-x-4 top-[15%] max-w-lg mx-auto bg-white rounded-[2.5rem] shadow-2xl z-[111] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-slate-50 border-b border-slate-100 p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-2xl bg-signal-blue/10 flex items-center justify-center">
                                        <Wrench size={20} className="text-signal-blue" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black tracking-tight text-slate-900">유지보수 기록 추가</h2>
                                        <p className="text-xs font-bold text-slate-400">{machineName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="size-8 flex items-center justify-center rounded-full bg-slate-200/50 text-slate-500 hover:bg-slate-200 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="size-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-2">저장 완료!</h3>
                                    <p className="text-slate-500 font-bold">기록이 안전하게 보관되었습니다.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Action Type Selection */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-black text-slate-700 block ml-1">작업 유형</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {actionTypes.map((type) => (
                                                <button
                                                    key={type.id}
                                                    type="button"
                                                    onClick={() => setActionType(type.id)}
                                                    className={cn(
                                                        "flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all",
                                                        actionType === type.id
                                                            ? "bg-white border-signal-blue shadow-lg shadow-blue-500/10 scale-[1.02]"
                                                            : "bg-slate-50 border-transparent text-slate-400 opacity-60 grayscale"
                                                    )}
                                                >
                                                    <div className={cn("size-10 rounded-xl flex items-center justify-center", type.color)}>
                                                        <type.icon size={20} />
                                                    </div>
                                                    <span className={cn(
                                                        "text-[11px] font-black tracking-tight",
                                                        actionType === type.id ? "text-slate-900" : "text-slate-400"
                                                    )}>
                                                        {type.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Performed At */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-700 block ml-1">수행 일시</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="datetime-local"
                                                value={performedAt}
                                                onChange={(e) => setPerformedAt(e.target.value)}
                                                max="9999-12-31T23:59"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-slate-700 block ml-1">상세 내용</label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="w-full h-32 p-5 rounded-3xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue text-sm font-bold text-slate-900 placeholder:text-slate-400 leading-relaxed transition-all resize-none"
                                            placeholder="점검 내용이나 교체한 부품 정보를 입력해주세요."
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-3xl font-black text-base shadow-xl transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {mutation.isPending ? (
                                            <Loader2 size={20} className="animate-spin" />
                                        ) : (
                                            "기록 저장하기"
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
