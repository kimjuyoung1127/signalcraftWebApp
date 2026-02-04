import { motion } from 'framer-motion';
import { Plus, TrendingDown, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../../ui/Button';
import { cn } from '../../../../lib/utils';
import { type Machine } from '../MachineCard';

interface SmartLogTabProps {
    machine: Machine;
}

export function SmartLogTab({ machine }: SmartLogTabProps) {
    const { data: logs, isPending, error } = useQuery<any[]>({
        queryKey: ['machine-smart-logs', machine.id],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/machine-detail/smart-log?machine_id=${machine.id}`);
            if (!response.ok) throw new Error('상세 로그를 불러오는데 실패했습니다.');
            return response.json();
        },
    });

    return (
        <motion.div
            key="smartlog"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 pb-10"
        >
            {/* Smart Log Header */}
            <section className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-black mb-4">기계 가동 요약</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-[10px] font-black text-blue-300 uppercase mb-1">사용 시간</div>
                            <div className="text-xl font-black">{Math.floor(Math.random() * 20 + 4)}시간 {Math.floor(Math.random() * 60)}분</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Defrost Cycles</div>
                            <div className="text-xl font-black">{Math.floor(Math.random() * 5 + 1)} Times</div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <TrendingDown size={120} />
                </div>
            </section>

            {/* 1-Minute Event Timeline */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">상세 가동 기록 (최근 로그)</h3>
                    <Button variant="ghost" size="sm" className="text-signal-blue font-black text-xs">
                        <Plus size={14} className="mr-1" />
                        PDF 내보내기
                    </Button>
                </div>

                <div className="rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-sm">
                    {isPending ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Loader2 className="size-6 text-signal-blue animate-spin" />
                            <p className="text-slate-400 font-bold text-xs">기록을 불러오고 있습니다...</p>
                        </div>
                    ) : error ? (
                        <div className="py-20 text-center">
                            <p className="text-rose-500 font-bold text-xs text-slate-400">데이터 로드 실패</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">시각</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">작동 상태</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">이벤트</th>
                                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">비고</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {logs && logs.length > 0 ? logs.map((log, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-xs font-black text-slate-900">
                                            {new Date(log.occurred_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                                                log.event_type === 'ON' ? "bg-blue-100 text-blue-600" :
                                                    log.event_type === 'DEF' ? "bg-amber-100 text-amber-600" :
                                                        "bg-rose-100 text-rose-600"
                                            )}>
                                                {log.event_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-500">{log.status}</td>
                                        <td className="px-6 py-4 text-xs font-black text-slate-900">{log.details || '-'}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-xs font-bold">
                                            표시할 최근 로그가 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </motion.div>
    );
}
