import { motion } from 'framer-motion';
import { Plus, TrendingDown } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { cn } from '../../../../lib/utils';

export function SmartLogTab() {
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
                            <div className="text-xl font-black">18시간 42분</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-[10px] font-black text-blue-300 uppercase mb-1">Defrost Cycles</div>
                            <div className="text-xl font-black">4 Times</div>
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
                    <h3 className="text-lg font-black text-slate-900">상세 가동 기록 (1분 단위)</h3>
                    <Button variant="ghost" size="sm" className="text-signal-blue font-black text-xs">
                        <Plus size={14} className="mr-1" />
                        PDF 내보내기
                    </Button>
                </div>

                <div className="rounded-[2rem] border border-slate-100 bg-white overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">시각</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">작동 상태</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">이벤트</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">소모량</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {[
                                { time: '14:00', status: '가동', event: '기계 가동 시작', energy: '0.42kWh' },
                                { time: '14:01', status: '가동', event: '-', energy: '0.41kWh' },
                                { time: '14:02', status: '제상', event: '성에 제거 중', energy: '1.20kWh' },
                                { time: '14:03', status: '제상', event: '히터 가열 중', energy: '1.25kWh' },
                                { time: '14:04', status: '열림', event: '문 열림 감지', energy: '1.30kWh' },
                            ].map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 text-xs font-black text-slate-900">{log.time}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                                            log.status === '가동' ? "bg-blue-100 text-blue-600" :
                                                log.status === '제상' ? "bg-amber-100 text-amber-600" :
                                                    "bg-rose-100 text-rose-600"
                                        )}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-500">{log.event}</td>
                                    <td className="px-6 py-4 text-xs font-black text-slate-900">{log.energy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </motion.div>
    );
}
