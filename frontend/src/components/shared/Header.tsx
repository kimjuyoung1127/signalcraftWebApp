import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, Factory, Download } from 'lucide-react';
import { NotificationModal } from './NotificationModal';
import { UserProfileModal } from './UserProfileModal';
import { usePWAInstall } from '@/lib/usePWAInstall';
import { useQuery } from '@tanstack/react-query';

export function Header() {
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isInstallable, isInstalled, isIOS, installPWA } = usePWAInstall();

    const { data } = useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications/`);
            if (!response.ok) throw new Error('알림 로딩 실패');
            return response.json();
        },
    });

    const unreadCount = data?.notifications?.filter((n: any) => !n.isRead).length || 0;

    // Show button if it's installable OR if it's iOS and not yet installed
    const showInstallButton = (isInstallable || (isIOS && !isInstalled)) && !isInstalled;

    return (
        <>
            <header className="flex items-center bg-slate-50 p-4 justify-between sticky top-0 z-40 backdrop-blur-md bg-opacity-80 border-b border-slate-100">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity active:scale-95">
                    <div className="text-white flex size-10 items-center justify-center rounded-2xl bg-signal-blue shadow-lg shadow-blue-500/20">
                        <Factory size={22} />
                    </div>
                    <h2 className="text-slate-900 text-xl font-extrabold leading-tight tracking-tight">SignalCraft</h2>
                </Link>

                <div className="flex items-center gap-2">
                    {showInstallButton && (
                        <button
                            onClick={() => {
                                if (isIOS) {
                                    alert('아이폰에서는 공유 버튼 -> "홈 화면에 추가"를 눌러 설치해 주세요!');
                                } else {
                                    installPWA();
                                }
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-signal-blue bg-blue-50 hover:bg-blue-100 rounded-xl transition-all font-bold text-sm active:scale-90"
                        >
                            <Download size={18} />
                            <span>앱 설치</span>
                        </button>
                    )}
                    <button
                        onClick={() => setIsNotifOpen(true)}
                        className="p-2.5 text-slate-500 hover:bg-white rounded-xl transition-colors relative active:scale-90"
                    >
                        <Bell size={22} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2.5 right-2.5 size-4 bg-rose-500 text-[10px] text-white font-black flex items-center justify-center rounded-full border-2 border-slate-50 animate-in zoom-in duration-300">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="size-10 flex items-center justify-center overflow-hidden rounded-xl bg-white border border-slate-100 shadow-sm transition-all active:scale-90"
                    >
                        <User size={20} className="text-slate-400" />
                    </button>
                </div>
            </header>

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
