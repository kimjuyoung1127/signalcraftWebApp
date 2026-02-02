import { User } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfileCard() {
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
                <h3 className="text-lg font-bold text-slate-900 leading-tight">김주영 님</h3>
                <p className="text-sm text-slate-400 font-medium mt-0.5">SignalCraft 관리자</p>
            </div>

            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#f1f5f9' }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 transition-colors"
            >
                내 정보
            </motion.button>
        </motion.div>
    );
}
