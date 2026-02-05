import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Map, LayoutGrid, MapPin, Loader2 } from 'lucide-react';
import { Header } from '../../shared/Header';
import { BottomNav } from '../../shared/BottomNav';
import { MachineCard, Machine } from '../dashboard/MachineCard';
import { MachineDetailModal } from '../dashboard/MachineDetailModal';
import { MachineFilters, FilterType } from './MachineFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

export function MachinePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
    const [initialView, setInitialView] = useState<'analysis' | 'maintenance'>('analysis');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

    const { data, isPending, error } = useQuery<{ machines: Machine[] }>({
        queryKey: ['machines'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/machines/`);
            if (!response.ok) throw new Error('설비 목록을 불러오는데 실패했습니다.');
            return response.json();
        },
    });

    const machines = data?.machines || [];

    const filteredMachines = useMemo(() => {
        return machines.filter(machine => {
            const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                machine.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' ||
                (filter === 'stopped' ? machine.status === 'error' : machine.status === filter);
            return matchesSearch && matchesFilter;
        });
    }, [machines, searchTerm, filter]);

    const handleCardClick = (machine: Machine) => {
        setInitialView('analysis');
        setSelectedMachine(machine);
    };

    const handleManage = (machine: Machine) => {
        setInitialView('maintenance');
        setSelectedMachine(machine);
    };

    const handleDelete = (id: string) => {
        if (confirm('정말 이 설비를 삭제하시겠습니까?')) {
            console.log('Delete machine:', id);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            <Header />

            <main className="flex-1 overflow-y-auto">
                <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm pt-2 pb-2 transition-all">
                    {/* Search Bar */}
                    <div className="px-4 sm:px-6 py-2">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="설비 이름, 위치 검색"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-signal-blue/20 focus:border-signal-blue transition-all"
                            />
                        </div>
                    </div>

                    {/* Filters & View Toggle */}
                    <div className="flex items-center justify-between px-4 sm:px-6 pb-2">
                        <MachineFilters currentFilter={filter} onFilterChange={setFilter} />
                        <div className="flex p-1 bg-slate-200/50 rounded-xl">
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === 'list' ? "bg-white shadow-sm text-signal-blue" : "text-slate-400"
                                )}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={cn(
                                    "p-2 rounded-lg transition-all",
                                    viewMode === 'map' ? "bg-white shadow-sm text-signal-blue" : "text-slate-400"
                                )}
                            >
                                <Map size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Machines Content */}
                <div className="px-2 pt-2 pb-6 space-y-1">
                    {isPending ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="size-8 text-signal-blue animate-spin" />
                            <p className="text-slate-400 font-bold text-sm">설비 정보를 불러오고 있습니다...</p>
                        </div>
                    ) : error ? (
                        <div className="mx-6 p-8 bg-rose-50 rounded-[2rem] border border-rose-100 text-center">
                            <p className="text-rose-600 font-bold text-sm mb-4">데이터를 불러오는 중 오류가 발생했습니다.</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-rose-500 text-white rounded-full text-xs font-black"
                            >
                                다시 시도
                            </button>
                        </div>
                    ) : viewMode === 'list' ? (
                        <>
                            <div className="px-4 mb-3 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {filteredMachines.length} Machines Found
                                </span>
                            </div>

                            <AnimatePresence mode='popLayout'>
                                {filteredMachines.length > 0 ? (
                                    filteredMachines.map((machine, idx) => (
                                        <MachineCard
                                            key={machine.id}
                                            machine={machine}
                                            index={idx}
                                            onClick={handleCardClick}
                                            onManage={handleManage}
                                            onDelete={handleDelete}
                                        />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-20"
                                    >
                                        <p className="text-slate-400 font-medium">검색 결과가 없습니다.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <div className="px-4 pt-4">
                            <div className="aspect-[4/5] w-full bg-slate-100 rounded-[3rem] border-4 border-white shadow-inner relative overflow-hidden flex flex-col">
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    {/* Mock Map Texture */}
                                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                                </div>

                                {/* Map Controls */}
                                <div className="absolute top-6 right-6 flex flex-col gap-2">
                                    <div className="size-10 bg-white rounded-2xl shadow-lg flex flex-col divide-y divide-slate-100 overflow-hidden">
                                        <button className="flex-1 flex items-center justify-center text-slate-600 hover:bg-slate-50">+</button>
                                        <button className="flex-1 flex items-center justify-center text-slate-600 hover:bg-slate-50">-</button>
                                    </div>
                                </div>

                                {/* Map Pins (Multi-site) */}
                                <div className="flex-1 relative">
                                    {filteredMachines.map((machine, idx) => (
                                        <motion.button
                                            key={machine.id}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: idx * 0.1 }}
                                            onClick={() => handleCardClick(machine)}
                                            className="absolute group"
                                            style={{
                                                left: `${20 + (idx * 15) % 60}%`,
                                                top: `${20 + (idx * 20) % 60}%`
                                            }}
                                        >
                                            <div className="relative flex flex-col items-center">
                                                <div className={cn(
                                                    "size-10 rounded-2xl flex items-center justify-center shadow-xl transition-transform group-hover:scale-110",
                                                    machine.status === 'running' ? "bg-emerald-500 text-white" :
                                                        machine.status === 'warning' ? "bg-amber-500 text-white" :
                                                            "bg-rose-500 text-white"
                                                )}>
                                                    <MapPin size={20} fill="currentColor" fillOpacity={0.2} />
                                                </div>
                                                <div className="mt-2 px-3 py-1 bg-white rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all pointer-events-none">
                                                    <span className="text-[10px] font-black text-slate-900 whitespace-nowrap">{machine.name}</span>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Site Ranking Overlay */}
                                <div className="p-6 bg-white/80 backdrop-blur-md border-t border-white">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">전체 사이트 헬스 랭킹</h4>
                                    <div className="space-y-3">
                                        {filteredMachines.slice(0, 3).sort((a, b) => b.health - a.health).map((m, i) => (
                                            <div key={m.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm font-black text-slate-300">0{i + 1}</span>
                                                    <span className="text-sm font-bold text-slate-700">{m.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.health}%` }} />
                                                    </div>
                                                    <span className="text-xs font-black text-slate-900">{m.health}점</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <MachineDetailModal
                machine={selectedMachine}
                isOpen={!!selectedMachine}
                onClose={() => setSelectedMachine(null)}
                initialView={initialView}
            />

            <BottomNav />
        </div>
    );
}
