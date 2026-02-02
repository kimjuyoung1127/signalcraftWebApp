import { useState } from 'react';
import { Bell, Lock, HelpCircle, FileText, LogOut, Moon } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { BottomNav } from '../../shared/BottomNav';
import { ProfileCard } from './ProfileCard';
import { SettingsGroup } from './SettingsGroup';
import { SettingsItem } from './SettingsItem';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
};

import { Header } from '../../shared/Header';

export function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="flex flex-col min-h-screen pb-24 bg-slate-50">
            <Header />

            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto px-4 pt-6"
            >
                <motion.div variants={itemVariants} className="px-2 mb-6">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">설정</h2>
                </motion.div>

                <motion.section variants={itemVariants} className="mb-8">
                    <ProfileCard />
                </motion.section>

                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 px-4">
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#f1f5f9' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 text-slate-400 font-bold text-sm bg-slate-100 rounded-2xl transition-colors flex items-center justify-center gap-2"
                    >
                        <LogOut size={16} />
                        로그아웃
                    </motion.button>
                    <p className="text-center text-slate-300 text-xs mt-4 font-medium">
                        SignalCraft Biz for Enterprise
                    </p>
                </motion.div>
            </motion.main>

            <BottomNav />
        </div>
    );
}
