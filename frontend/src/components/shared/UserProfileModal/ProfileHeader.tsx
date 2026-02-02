import { User, X } from 'lucide-react';

interface ProfileHeaderProps {
    onClose: () => void;
}

export function ProfileHeader({ onClose }: ProfileHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
                <div className="size-16 rounded-[2rem] bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden shadow-sm">
                    <User size={32} className="text-slate-300" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter">시그널 사장님</h3>
                        <span className="px-2 py-0.5 bg-signal-blue text-white text-[10px] font-black rounded-full uppercase shadow-sm shadow-blue-500/20">PRO</span>
                    </div>
                    <p className="text-sm text-slate-400 font-bold">signal_boss@example.com</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
                aria-label="Close"
            >
                <X size={20} />
            </button>
        </div>
    );
}
