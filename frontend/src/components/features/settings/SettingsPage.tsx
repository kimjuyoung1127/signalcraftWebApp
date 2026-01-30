import { useState } from 'react';
import { Bell, Lock, HelpCircle, FileText, LogOut, Moon } from 'lucide-react';
import { BottomNav } from '../../shared/BottomNav';
import { ProfileCard } from './ProfileCard';
import { SettingsGroup } from './SettingsGroup';
import { SettingsItem } from './SettingsItem';

export function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            {/* Header Override for Settings Title */}
            <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight ml-2">설정</h2>
            </div>

            <main className="flex-1 overflow-y-auto px-4 pt-2">
                <section className="mb-8">
                    <ProfileCard />
                </section>

                <SettingsGroup title="앱 설정">
                    <SettingsItem
                        icon={<Bell size={20} />}
                        title="알림 설정"
                        type="toggle"
                        isToggled={notifications}
                        onToggle={() => setNotifications(!notifications)}
                    />
                    <SettingsItem
                        icon={<Moon size={20} />}
                        title="다크 모드"
                        type="toggle"
                        isToggled={darkMode}
                        onToggle={() => setDarkMode(!darkMode)}
                    />
                </SettingsGroup>

                <SettingsGroup title="일반">
                    <SettingsItem
                        icon={<Lock size={20} />}
                        title="보안 및 개인정보"
                        type="link"
                    />
                    <SettingsItem
                        icon={<HelpCircle size={20} />}
                        title="고객센터"
                        type="link"
                    />
                </SettingsGroup>

                <SettingsGroup title="정보">
                    <SettingsItem
                        icon={<FileText size={20} />}
                        title="약관 및 정책"
                        type="link"
                    />
                    <SettingsItem
                        title="앱 버전"
                        type="info"
                        value="1.0.2 (Beta)"
                    />
                </SettingsGroup>

                <div className="mt-8 px-4">
                    <button className="w-full py-4 text-slate-400 font-bold text-sm bg-slate-100 rounded-2xl hover:bg-slate-200 hover:text-slate-500 transition-colors flex items-center justify-center gap-2">
                        <LogOut size={16} />
                        로그아웃
                    </button>
                    <p className="text-center text-slate-300 text-xs mt-4 font-medium">
                        SignalCraft Biz for Enterprise
                    </p>
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
