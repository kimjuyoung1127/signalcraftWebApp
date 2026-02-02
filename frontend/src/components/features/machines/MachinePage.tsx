import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '../../shared/Header';
import { BottomNav } from '../../shared/BottomNav';
import { MachineCard, Machine } from '../dashboard/MachineCard';
import { MachineDetailModal } from '../dashboard/MachineDetailModal';
import { MachineFilters, FilterType } from './MachineFilters';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data (DashBoard와 동일한 데이터 사용, 실제로는 API 연동 필요)
const MOCK_MACHINES: Machine[] = [
    {
        id: '1',
        name: '워크인 냉동고 A',
        location: '제1 물류창고',
        status: 'running',
        health: 98,
        prediction: '향후 7일간 특이사항 없음',
        imageUrl: 'https://placehold.co/200x200?text=Freezer',
        type: 'Freezer'
    },
    {
        id: '2',
        name: '산업용 컴프레서 B',
        location: '본관 기계실',
        status: 'warning',
        health: 72,
        prediction: '베어링 마모 징후 (96% 확률)',
        imageUrl: 'https://placehold.co/200x200?text=Compressor',
        type: 'Compressor'
    },
    {
        id: '3',
        name: '배기 공조 시스템 C',
        location: '옥상',
        status: 'running',
        health: 94,
        prediction: '효율 최적화 상태 유지 중',
        imageUrl: 'https://placehold.co/200x200?text=HVAC',
        type: 'HVAC'
    },
    {
        id: '4',
        name: '수화물 컨베이어 벨트',
        location: '제2 작업장',
        status: 'error',
        health: 45,
        prediction: '모터 과열 위험 감지됨',
        imageUrl: 'https://placehold.co/200x200?text=Conveyor',
        type: 'Conveyor'
    },
    {
        id: '5',
        name: '유압 프레스 3호기',
        location: '생산라인 B',
        status: 'running',
        health: 92,
        prediction: '정상 작동 중',
        imageUrl: 'https://placehold.co/200x200?text=Press',
        type: 'Press'
    }
];

export function MachinePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

    const filteredMachines = useMemo(() => {
        return MOCK_MACHINES.filter(machine => {
            const matchesSearch = machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                machine.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filter === 'all' ||
                (filter === 'stopped' ? machine.status === 'error' : machine.status === filter);
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filter]);

    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            <Header />

            <main className="flex-1 overflow-y-auto">
                <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm pt-2 pb-2 transition-all">
                    {/* Search Bar */}
                    <div className="px-6 py-2">
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

                    {/* Filters */}
                    <MachineFilters currentFilter={filter} onFilterChange={setFilter} />
                </div>

                {/* Machines List */}
                <div className="px-2 pt-2 pb-6 space-y-1">
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
                                    onClick={setSelectedMachine}
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
                </div>
            </main>

            <MachineDetailModal
                machine={selectedMachine}
                isOpen={!!selectedMachine}
                onClose={() => setSelectedMachine(null)}
            />

            <BottomNav />
        </div>
    );
}
