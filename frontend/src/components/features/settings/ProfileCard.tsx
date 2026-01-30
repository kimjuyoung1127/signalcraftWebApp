import { User } from 'lucide-react';

export function ProfileCard() {
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm active:scale-[0.98] transition-all duration-200">
            <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-50 overflow-hidden">
                <User className="size-8 text-slate-300" />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">김주영 님</h3>
                <p className="text-sm text-slate-400 font-medium mt-0.5">SignalCraft 관리자</p>
            </div>

            <button className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                내 정보
            </button>
        </div>
    );
}
