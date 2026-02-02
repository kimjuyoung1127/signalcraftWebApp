import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, History, Plus, CheckCircle2, Settings2, X, Clock } from 'lucide-react';
import { Button } from '../../../ui/Button';
import { cn } from '../../../../lib/utils';
import { type MaintenanceView } from './types';

interface MaintenanceTabProps {
    maintenanceView: MaintenanceView;
    setMaintenanceView: (view: MaintenanceView) => void;
    symptom: string;
    setSymptom: (s: string) => void;
    visitDate: string;
    setVisitDate: (d: string) => void;
    urgency: 'normal' | 'urgent';
    setUrgency: (u: 'normal' | 'urgent') => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function MaintenanceTab({
    maintenanceView,
    setMaintenanceView,
    symptom,
    setSymptom,
    visitDate,
    setVisitDate,
    urgency,
    setUrgency,
    onSubmit
}: MaintenanceTabProps) {
    return (
        <motion.div
            key="maintenance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 pb-10"
        >
            <AnimatePresence mode="wait">
                {maintenanceView === 'history' ? (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-8"
                    >
                        {/* Smart Advice Card */}
                        <section>
                            <div className="p-6 rounded-[2.5rem] bg-amber-50 border border-amber-100 relative overflow-hidden">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                                        <AlertCircle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">점검이 필요해 보여요</h3>
                                        <p className="text-sm text-slate-500 font-bold leading-relaxed">
                                            마지막 필터 청소 이후 <span className="text-amber-600">32일</span>이 경과했습니다. 현재 기기 소음 패턴에서 미세한 가열 징후가 감지됩니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Timeline */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                    <History size={20} className="text-signal-blue" />
                                    최근 관리 이력
                                </h3>
                                <Button variant="secondary" className="h-10 px-4 rounded-xl text-xs gap-1.5 bg-slate-50 border-none">
                                    <Plus size={16} />
                                    기록 추가
                                </Button>
                            </div>

                            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100">
                                {[
                                    { date: '2026. 01. 15', action: '필터 물세척 및 성에 제거', type: 'CLEANING', provider: '사장님' },
                                    { date: '2025. 12. 01', action: '정기 점검 및 가스 충전', type: 'CHECK', provider: '나이스 냉동' },
                                    { date: '2025. 11. 15', action: '도어 개스킷 교체', type: 'PART_REPLACE', provider: '사장님' },
                                ].map((log, i) => (
                                    <div key={i} className="relative flex items-start gap-6 pl-2">
                                        <div className="mt-1.5 size-6 shrink-0 rounded-full border-4 border-white bg-signal-blue shadow-sm z-10" />
                                        <div className="flex-1 p-5 rounded-[1.5rem] bg-white border border-slate-100 shadow-sm">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{log.date}</span>
                                                <span className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-500 rounded-full font-bold">{log.provider}</span>
                                            </div>
                                            <h4 className="text-[15px] font-black text-slate-800 mb-2">{log.action}</h4>
                                            <div className="flex items-center gap-1.5">
                                                <CheckCircle2 size={14} className="text-emerald-500" />
                                                <span className="text-xs font-bold text-emerald-500">완료됨</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Call Technician (Service Ticket Bridge) */}
                        <section>
                            <div className="p-6 rounded-[2rem] bg-slate-900 text-white flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-2xl">
                                        <Settings2 size={24} className="text-signal-blue" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg">전문 기사님이 필요하신가요?</h4>
                                        <p className="text-xs text-slate-400 font-bold">SignalCraft 전문 수리팀이 대기 중입니다</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setMaintenanceView('request')}
                                    className="bg-signal-blue hover:bg-blue-600 rounded-xl px-5 h-12 font-black transition-all active:scale-95 shrink-0 whitespace-nowrap"
                                >
                                    호출하기
                                </Button>
                            </div>
                        </section>
                    </motion.div>
                ) : maintenanceView === 'request' ? (
                    <motion.div
                        key="request"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <button
                                onClick={() => setMaintenanceView('history')}
                                className="p-2 -ml-2 text-slate-400 hover:text-slate-600"
                            >
                                <X size={20} className="rotate-90" /> {/* Back icon hack */}
                            </button>
                            <h3 className="text-xl font-black text-slate-900">서비스 신청서</h3>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-black text-slate-700">고장 증상 및 요청사항</label>
                                <textarea
                                    value={symptom}
                                    onChange={(e) => setSymptom(e.target.value)}
                                    className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue text-sm font-bold text-slate-600 resize-none"
                                    placeholder="구체적인 증상을 적어주세요."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">방문 희망 일시</label>
                                    <input
                                        type="datetime-local"
                                        value={visitDate}
                                        onChange={(e) => setVisitDate(e.target.value)}
                                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue text-sm font-bold text-slate-600"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black text-slate-700">긴급도</label>
                                    <div className="flex p-1 bg-slate-100 rounded-2xl h-[54px]">
                                        <button
                                            type="button"
                                            onClick={() => setUrgency('normal')}
                                            className={cn(
                                                "flex-1 rounded-xl text-xs font-black transition-all",
                                                urgency === 'normal' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                                            )}
                                        >
                                            일반
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUrgency('urgent')}
                                            className={cn(
                                                "flex-1 rounded-xl text-xs font-black transition-all",
                                                urgency === 'urgent' ? "bg-rose-500 text-white shadow-sm shadow-rose-200" : "text-slate-400"
                                            )}
                                        >
                                            긴급
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-signal-blue hover:bg-blue-600 text-white rounded-[1.5rem] font-black text-lg transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                                >
                                    서비스 신청하기
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setMaintenanceView('history')}
                                    className="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-600"
                                >
                                    취소하고 돌아가기
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="size-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            >
                                <CheckCircle2 size={48} />
                            </motion.div>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">신청이 완료되었습니다!</h3>
                        <p className="text-slate-500 font-bold leading-relaxed">
                            담당 기사님이 배정되는 대로<br />알림톡으로 안내해 드리겠습니다.
                        </p>
                        <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 animate-pulse">
                            <Clock size={16} />
                            <span>곧 화면이 닫힙니다...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
