import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface UserProfile {
    user: {
        email: string;
        full_name: string;
        role: string;
    };
    device_count: number;
    plan: string;
}

export function ProfileCard() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/shared/user-profile/me`);
                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm animate-pulse border border-slate-100">
                <div className="size-16 rounded-full bg-slate-100" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-24" />
                    <div className="h-3 bg-slate-100 rounded w-32" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex items-center gap-4 p-4 bg-white rounded-[1.5rem] shadow-sm cursor-pointer border border-transparent hover:border-slate-100 transition-colors"
        >
            <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                className="size-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-50 overflow-hidden"
            >
                <User className="size-8 text-slate-300" />
            </motion.div>

            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    {profile?.user.full_name || '사용자'} 님
                </h3>
                <p className="text-sm text-slate-400 font-medium mt-0.5">
                    {profile?.user.role} • 연결 기기 {profile?.device_count}대
                </p>
                <p className="text-[10px] text-slate-300 mt-0.5">{profile?.user.email}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-500 rounded text-[10px] font-bold">
                    {profile?.plan}
                </span>
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#f1f5f9' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 transition-colors"
                >
                    내 정보
                </motion.button>
            </div>
        </motion.div>
    );
}
