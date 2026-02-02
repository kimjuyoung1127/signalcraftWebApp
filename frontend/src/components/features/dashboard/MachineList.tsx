import { useState } from 'react';
import { type Machine, MachineCard } from './MachineCard';
import { MachineDetailModal } from './MachineDetailModal';

const MOCK_MACHINES: Machine[] = [
    {
        id: '1',
        name: '워크인 냉동고 01',
        location: 'A구역 • 후면',
        status: 'running',
        health: 98,
        prediction: 'AI 예측: 향후 30일 내 고장 징후 없음',
        imageUrl: 'https://placehold.co/200x200?text=Freezer',
        type: 'freezer'
    },
    {
        id: '2',
        name: '쇼케이스 냉장고 A',
        location: 'B구역 • 카운터 옆',
        status: 'warning',
        health: 76,
        prediction: '공진 노이즈 감지: 팬 베어링 점검을 권장합니다',
        imageUrl: 'https://placehold.co/200x200?text=Fridge',
        type: 'refrigerator'
    },
    {
        id: '3',
        name: '메인 컨베이어 02',
        location: 'C구역 • 메인홀',
        status: 'running',
        health: 94,
        prediction: '정기 점검까지 14일 남았습니다',
        imageUrl: 'https://placehold.co/200x200?text=Conveyor',
        type: 'conveyor'
    }
];

export function MachineList() {
    const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
    const [initialView, setInitialView] = useState<'analysis' | 'maintenance'>('analysis');

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
            // In a real app, you would call an API here
        }
    };

    return (
        <div className="px-4 space-y-4 pb-10">
            <div className="flex items-center justify-between py-2">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">설비 현황</h3>
                <button className="text-signal-blue text-sm font-bold p-2">전체 보기</button>
            </div>

            <div className="flex flex-col gap-4">
                {MOCK_MACHINES.map((machine, idx) => (
                    <MachineCard
                        key={machine.id}
                        machine={machine}
                        index={idx}
                        onClick={handleCardClick}
                        onManage={handleManage}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <MachineDetailModal
                machine={selectedMachine}
                isOpen={!!selectedMachine}
                onClose={() => setSelectedMachine(null)}
                initialView={initialView}
            />
        </div>
    );
}
