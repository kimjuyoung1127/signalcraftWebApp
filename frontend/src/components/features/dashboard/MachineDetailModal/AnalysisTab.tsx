import { motion } from 'framer-motion';
import { Activity, Volume2, ShieldCheck, Zap, AlertCircle, Settings2, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type Machine } from '../MachineCard';
import { Button } from '../../../ui/Button';
import { cn } from '../../../../lib/utils';

interface AnalysisTabProps {
    machine: Machine;
    onViewMaintenance: () => void;
}

export function AnalysisTab({ machine, onViewMaintenance }: AnalysisTabProps) {
    return (
        <motion.div
            key="analysis"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8 pb-10"
        >
            {/* Health Score Hero */}
            <section className="relative">
                <div className="flex flex-col items-center justify-center py-6 px-4 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm overflow-hidden relative">
                    {/* EHI Gauge */}
                    <div className="relative size-64 flex items-center justify-center mb-6">
                        <svg className="size-full" viewBox="0 0 240 240">
                            <defs>
                                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={machine.status === 'running' ? '#3B82F6' : machine.status === 'warning' ? '#F59E0B' : '#EF4444'} />
                                    <stop offset="100%" stopColor={machine.status === 'running' ? '#60A5FA' : machine.status === 'warning' ? '#FCD34D' : '#FCA5A5'} />
                                </linearGradient>
                            </defs>

                            {/* Ticks Ring */}
                            {Array.from({ length: 40 }).map((_, i) => {
                                const angle = (i / 40) * 360;
                                const isMajor = i % 5 === 0;
                                return (
                                    <line
                                        key={i}
                                        x1="120"
                                        y1="20"
                                        x2="120"
                                        y2={isMajor ? "35" : "28"}
                                        stroke={isMajor ? "#E2E8F0" : "#F1F5F9"}
                                        strokeWidth={isMajor ? "2" : "1"}
                                        transform={`rotate(${angle} 120 120)`}
                                    />
                                );
                            })}

                            {/* Background Arc */}
                            <circle
                                cx="120"
                                cy="120"
                                r="88"
                                fill="none"
                                stroke="#F8FAFC"
                                strokeWidth="16"
                                strokeLinecap="round"
                            />

                            {/* Active Arc */}
                            <motion.circle
                                cx="120"
                                cy="120"
                                r="88"
                                fill="none"
                                stroke="url(#gaugeGradient)"
                                strokeWidth="16"
                                strokeLinecap="round"
                                strokeDasharray={2 * Math.PI * 88}
                                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                                animate={{
                                    strokeDashoffset: (2 * Math.PI * 88) * (1 - machine.health / 100)
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 60,
                                    damping: 15,
                                    mass: 1
                                }}
                                transform="rotate(-90 120 120)"
                            />

                            {/* Inner Decorative Ring */}
                            <circle
                                cx="120"
                                cy="120"
                                r="70"
                                fill="none"
                                stroke="#F1F5F9"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                        </svg>

                        {/* Center Text */}
                        <div className="absolute flex flex-col items-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Health</span>
                            <div className="flex items-baseline">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                    className="text-6xl font-black text-slate-900 tracking-tighter"
                                >
                                    {machine.health}
                                </motion.span>
                                <span className="text-xl font-bold text-slate-300 ml-1">%</span>
                            </div>
                            <div className={cn(
                                "flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full text-[11px] font-bold",
                                machine.status === 'running' ? "bg-blue-50 text-blue-600" :
                                    machine.status === 'warning' ? "bg-amber-50 text-amber-600" :
                                        "bg-rose-50 text-rose-600"
                            )}>
                                <div className={cn(
                                    "size-1.5 rounded-full animate-pulse",
                                    machine.status === 'running' ? "bg-blue-500" :
                                        machine.status === 'warning' ? "bg-amber-500" :
                                            "bg-rose-500"
                                )} />
                                {machine.status === 'running' ? 'Optimal' : machine.status === 'warning' ? 'Check Required' : 'Critical'}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Semantic Diagnostics (Part Status Bars) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Settings2 size={20} className="text-slate-400" />
                        부품 건강 상태
                    </h3>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase">AI 분석</span>
                </div>
                <div className="p-6 rounded-[2rem] bg-white border border-slate-100 grid gap-6">
                    {[
                        { label: '엔진 (Compressor)', score: 98, detail: '진동 및 상태 아주 좋음' },
                        { label: '냉각 팬 (Condenser Fan)', score: 85, detail: '미세 진동 감지 (주의)' },
                        { label: '순환 밸브 (Expansion Valve)', score: 92, detail: '냉매 흐름 정상' },
                    ].map((part, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-sm font-black text-slate-700">{part.label}</div>
                                    <div className="text-[11px] font-bold text-slate-400">{part.detail}</div>
                                </div>
                                <div className="text-sm font-black text-slate-900">{part.score}%</div>
                            </div>
                            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${part.score}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className={cn(
                                        "h-full rounded-full",
                                        part.score > 90 ? "bg-signal-blue" : part.score > 80 ? "bg-signal-orange" : "bg-signal-red"
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sound Spectrum Visualizer */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Volume2 size={20} className="text-signal-blue" />
                        실시간 기계 소음
                    </h3>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Listening</span>
                </div>
                <div className="h-40 flex items-end gap-1.5 px-4 py-8 bg-slate-900 rounded-[2rem] overflow-hidden">
                    {[...Array(32)].map((_, i) => {
                        const healthThreshold = (machine.health / 100) * 32;
                        const isHealthy = i < healthThreshold;
                        const alertColor = machine.health < 50 ? "bg-signal-red" : "bg-signal-orange";

                        return (
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
                                    isHealthy ? "bg-signal-blue" : alertColor
                                )}
                            />
                        );
                    })}
                </div>
            </section>

            {/* Key Frequency Analysis */}
            <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Zap size={20} className="text-signal-orange" />
                    소리 정밀 분석
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { hz: '60Hz', label: '엔진 구동음', status: '정상', value: 98 },
                        { hz: '120Hz', label: '회전 상태', status: '안정', value: 99 },
                        { hz: '180Hz', label: '미세 마찰음', status: machine.status === 'warning' ? '관찰' : '정상', value: machine.status === 'warning' ? 72 : 94 },
                        { hz: '535Hz', label: '울림 현상', status: '정상', value: 96 },
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

            {/* Predictive Engine (72H Forecast) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <TrendingDown size={20} className="text-signal-red" />
                        72시간 고장 예보
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-rose-600 uppercase">점검 권장</span>
                    </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm space-y-6">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={[
                                    { time: '1주 전', value: 95, range: [92, 98], isFuture: false },
                                    { time: '3일 전', value: 92, range: [88, 96], isFuture: false },
                                    { time: '현재', value: 85, range: [80, 90], isFuture: false },
                                    { time: '내일', value: 78, range: [65, 88], isFuture: true },
                                    { time: '모레', value: 72, range: [55, 85], isFuture: true },
                                    { time: '3일 뒤', value: 65, range: [40, 80], isFuture: true },
                                ]}
                            >
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 700 }}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold border border-slate-800 shadow-xl">
                                                    <p className="opacity-60 mb-1">{data.time}</p>
                                                    <p className="text-sm">예상 건강: {data.value}%</p>
                                                    <p className="text-[10px] text-blue-400">오차 범위: ±{Math.round((data.range[1] - data.range[0]) / 2)}%</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="range"
                                    stroke="none"
                                    fill="#3B82F6"
                                    fillOpacity={0.05}
                                    connectNulls
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-rose-50 rounded-[1.5rem] border border-rose-100">
                        <div>
                            <div className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-0.5">고장 예상 시점</div>
                            <div className="text-2xl font-black text-rose-600 tracking-tighter">약 2일 16시간 뒤</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-0.5">예측 정확도</div>
                            <div className="text-sm font-black text-rose-500">85% (매우 높음)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Virtual ROI & Smart Sensors */}
            <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Zap size={20} className="text-amber-500" />
                    절약 도움 리포트
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Virtual Watt-meter */}
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                <Activity size={18} />
                            </div>
                            <span className="text-sm font-black text-slate-700">전력 사용량</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-2xl font-black text-slate-900">42.5</span>
                            <span className="text-sm font-bold text-slate-400">kWh</span>
                        </div>
                        <p className="text-xs font-bold text-emerald-500">전주 대비 12% 절감 중</p>
                    </div>

                    {/* Acoustic Door Guard */}
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                <ShieldCheck size={18} />
                            </div>
                            <span className="text-sm font-black text-slate-700">문 열림 분석</span>
                        </div>
                        <div className="flex items-baseline gap-1 mb-1">
                            <span className="text-2xl font-black text-slate-900">12</span>
                            <span className="text-sm font-bold text-slate-400">회 오픈</span>
                        </div>
                        <p className="text-xs font-bold text-amber-500">새벽 02:14 미세 누기 주의</p>
                    </div>
                </div>

                {/* Defrost AI Banner */}
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                            <Zap size={20} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-emerald-900">절전 제상 알림</h4>
                            <p className="text-xs font-bold text-emerald-600">지금 성에를 제거하면 전기료가 절감됩니다</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-100 h-9 px-4 rounded-xl text-xs font-black">
                        실행하기
                    </Button>
                </div>
            </section>

            {/* AI Insights Card */}
            <section>
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
                        <p className="text-lg font-bold leading-snug tracking-tight break-keep">
                            {machine.prediction}
                        </p>
                        <div className="mt-3 p-3 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-[11px] font-medium text-blue-100 flex items-start gap-2 break-keep">
                                <span className="shrink-0 mt-0.5">•</span>
                                정밀 분석 결과: 내부 부품 마찰음이 증가하여 점검을 추천합니다.
                            </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertCircle size={14} className="text-blue-100" />
                                <span className="text-xs font-medium text-blue-100">최근 업데이트: 5분 전</span>
                            </div>
                            <button
                                onClick={onViewMaintenance}
                                className="text-xs font-black px-4 py-2 bg-white text-signal-blue rounded-xl"
                            >
                                유지보수 기록
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
