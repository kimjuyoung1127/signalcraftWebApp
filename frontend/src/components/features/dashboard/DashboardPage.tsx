import { Header } from '../../shared/Header';
import { BottomNav } from '../../shared/BottomNav';
import { StatusHero } from './StatusHero';
import { QuickActions } from './QuickActions';
import { MachineList } from './MachineList';

export function DashboardPage() {
    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            <Header />
            <main className="flex-1 overflow-y-auto">
                <StatusHero />
                <QuickActions />
                <MachineList />
            </main>
            <BottomNav />
        </div>
    );
}
