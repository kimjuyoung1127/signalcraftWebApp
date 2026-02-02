import { motion } from 'framer-motion';
import { Activity, Volume2, ShieldCheck, Zap, AlertCircle, Settings2, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type Machine } from '../MachineCard';
import { Badge } from '../../../ui/Badge';
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
                    {/* Pulse Metaphor Layer */}
                    <div className="absolute inset-x-0 bottom-0 h-32 opacity-20 pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
                            <motion.path
                                d="M0 60 Q 20 60, 40 60 T 80 60 T 120 60 T 160 30 T 180 90 T 200 60 T 240 60 T 280 60 T 320 60 T 360 60 T 400 60"
                                fill="none"
                                stroke={machine.status === 'running' ? '#3B82F6' : machine.status === 'warning' ? '#F59E0B' : '#EF4444'}
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                    x: [0, -40, 0]
                                }}
                                transition={{
                                    duration: machine.status === 'running' ? 2 : 1,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </svg>
                    </div>

                    {/* EHI Gauge */}
                    <div className="relative size-48 flex items-center justify-center mb-4">
                        <svg className="size-full -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke="#F1F5F9"
                                strokeWidth="12"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke={machine.status === 'running' ? '#3B82F6' : machine.status === 'warning' ? '#F59E0B' : '#EF4444'}
                                strokeWidth="12"
                                strokeDasharray="502.4"
                                initial={{ strokeDashoffset: 502.4 }}
                                animate={{ strokeDashoffset: 502.4 - (502.4 * machine.health) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-sm font-black text-slate-400 uppercase tracking-widest">EHI</span>
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-5xl font-black text-slate-900 tracking-tighter"
                            >
                                {machine.health}
                            </motion.span>
                            <span className="text-xs font-bold text-slate-400 mt-1">Equipment Health</span>
                        </div>
                    </div>

                    <Badge variant={machine.status === 'running' ? 'success' : machine.status === 'warning' ? 'warning' : 'error'} className="relative z-10">
                        {machine.status === 'running' ? '기계 맥박 안정적' : machine.status === 'warning' ? '맥박 불규칙 감지' : '맥박 정지 및 이상'}
                    </Badge>
                </div>
            </section>

            {/* Semantic Diagnostics (Part Status Bars) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <Settings2 size={20} className="text-slate-400" />
                        부품별 건강 상태
                    </h3>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase">Semantic AI</span>
                </div>
                <div className="p-6 rounded-[2rem] bg-white border border-slate-100 grid gap-6">
                    {[
                        { label: '컴프레서 (Compressor)', score: 98, detail: '60Hz 위상 무결성 우수' },
                        { label: '응축기 팬 (Condenser Fan)', score: 85, detail: '110Hz 진동 임계치 근접' },
                        { label: '팽창 밸브 (Expansion Valve)', score: 92, detail: '정상 유동 흐름 포착' },
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

            {/* Predictive Engine (72H Forecast) */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <TrendingDown size={20} className="text-signal-red" />
                        72시간 고장 예보 엔진
                    </h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-rose-600 uppercase">Golden Time</span>
                    </div>
                </div>

                <div className="p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm space-y-6">
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={[
                                    { time: '7일 전', value: 95, range: [92, 98], isFuture: false },
                                    { time: '3일 전', value: 92, range: [88, 96], isFuture: false },
                                    { time: '현재', value: 85, range: [80, 90], isFuture: false },
                                    { time: '+24h', value: 78, range: [65, 88], isFuture: true },
                                    { time: '+48h', value: 72, range: [55, 85], isFuture: true },
                                    { time: '+72h', value: 65, range: [40, 80], isFuture: true },
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
                                                    <p className="text-sm">건강도: {data.value}%</p>
                                                    <p className="text-[10px] text-blue-400">신뢰 구간: {data.range[0]}% ~ {data.range[1]}%</p>
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
                            <div className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-0.5">Estimated Failure</div>
                            <div className="text-2xl font-black text-rose-600 tracking-tighter">64h 12m Left</div>
                        </div>
                        <div className="text-right">
                            <div className="text-[11px] font-black text-rose-400 uppercase tracking-widest mb-0.5">Prediction Confidence</div>
                            <div className="text-sm font-black text-rose-500">85% (GP Model V6)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Virtual ROI & Smart Sensors */}
            <section className="space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Zap size={20} className="text-amber-500" />
                    가상 센서 리포트 (Virtual ROI)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Virtual Watt-meter */}
                    <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                <Activity size={18} />
                            </div>
                            <span className="text-sm font-black text-slate-700">가상 전력량계</span>
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
                            <span className="text-sm font-black text-slate-700">가상 도어 센서</span>
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
                            <h4 className="text-sm font-black text-emerald-900">스마트 제상 권고</h4>
                            <p className="text-xs font-bold text-emerald-600">지금 제상 시 전기료 15% 절감 가능</p>
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
                        <p className="text-lg font-bold leading-snug tracking-tight">
                            {machine.prediction}
                        </p>
                        <div className="mt-3 p-3 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-[11px] font-medium text-blue-100 flex items-start gap-2">
                                <span className="shrink-0 mt-0.5">•</span>
                                1820Hz 마찰음 증가 및 480Hz 위상 지연 포착 {'->'} 베어링 유격 85% 의심
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
