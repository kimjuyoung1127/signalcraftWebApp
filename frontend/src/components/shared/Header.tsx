import { useState } from 'react';
import { Bell, User, Factory } from 'lucide-react';
import { NotificationModal } from './NotificationModal';
import { UserProfileModal } from './UserProfileModal';

export function Header() {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            <header className="flex items-center bg-slate-50 p-4 justify-between sticky top-0 z-40 backdrop-blur-md bg-opacity-80 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="text-white flex size-10 items-center justify-center rounded-2xl bg-signal-blue shadow-lg shadow-blue-500/20">
                        <Factory size={22} />
                    </div>
                    <h2 className="text-slate-900 text-xl font-extrabold leading-tight tracking-tight">SignalCraft</h2>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsNotifOpen(true)}
                        className="p-2.5 text-slate-500 hover:bg-white rounded-xl transition-colors relative active:scale-90"
                    >
                        <Bell size={22} />
                        <span className="absolute top-2.5 right-2.5 size-2 bg-rose-500 rounded-full border-2 border-slate-50" />
                    </button>
                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="size-10 flex items-center justify-center overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm transition-all active:scale-90"
                    >
                        <User size={20} className="text-slate-400" />
                    </button>
                </div>
            </header>

            {/* Modals - Moved outside <header> to avoid z-index stacking context restrictions */}
            <NotificationModal
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
            />
            <UserProfileModal
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
            />
        </>
    );
}
