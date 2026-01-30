import { Header } from '../../shared/Header';
import { BottomNav } from '../../shared/BottomNav';
import { StatusHero } from './StatusHero';
import { QuickActions } from './QuickActions';
import { MachineList } from './MachineList';

export function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            <Header />
            <main className="flex-1 overflow-y-auto pt-4">
                <div className="px-6 mb-6">
                    <p className="text-slate-400 text-sm font-bold tracking-tight mb-1">안녕하세요, 김주영 님</p>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">좋은 아침입니다 👋</h2>
                </div>

                <StatusHero />

                <div className="mt-8">
                    <span className="px-6 section-label">Quick Actions</span>
                    <QuickActions />
                </div>

                <div className="mt-6 mb-4 px-6 flex items-center justify-between">
                    <span className="section-label mb-0">My Machines</span>
                    <button className="text-[13px] font-black text-signal-blue px-3 py-1 bg-signal-blue/5 rounded-full">전체보기</button>
                </div>
                <MachineList />
            </main>
            <BottomNav />
        </div>
    );
}
