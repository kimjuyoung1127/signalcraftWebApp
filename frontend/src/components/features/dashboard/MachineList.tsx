import { type Machine, MachineCard } from './MachineCard';

const MOCK_MACHINES: Machine[] = [
    {
        id: '1',
        name: '워크인 냉동고 01',
        location: 'A구역 • 후면',
        status: 'running',
        health: 98,
        prediction: 'AI 예측: 향후 30일 내 고장 징후 없음',
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200',
        type: 'freezer'
    },
    {
        id: '2',
        name: '쇼케이스 냉장고 A',
        location: 'B구역 • 카운터 옆',
        status: 'warning',
        health: 76,
        prediction: '비정상 진동 감지: 베어링 점검을 권장합니다',
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200',
        type: 'refrigerator'
    },
    {
        id: '3',
        name: '메인 컨베이어 02',
        location: 'C구역 • 메인홀',
        status: 'running',
        health: 94,
        prediction: '정기 점검까지 14일 남았습니다',
        imageUrl: 'https://images.unsplash.com/photo-1565439386296-0884bbOvertime?auto=format&fit=crop&q=80&w=200',
        type: 'conveyor'
    }
];

export function MachineList() {
    return (
        <div className="px-4 space-y-4 pb-10">
            <div className="flex items-center justify-between py-2">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">설비 현황</h3>
                <button className="text-signal-blue text-sm font-bold p-2">전체 보기</button>
            </div>

            <div className="flex flex-col gap-4">
                {MOCK_MACHINES.map((machine, idx) => (
                    <MachineCard key={machine.id} machine={machine} index={idx} />
                ))}
            </div>
        </div>
    );
}
