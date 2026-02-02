import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Zap, AlertCircle, CheckCircle2, Settings2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NotificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
    const notifications = [
        {
            id: 1,
            type: 'alert',
            title: '설비 이상 감지',
            message: '워크인 냉동고 A에서 미세 마찰음이 증가했습니다.',
            time: '5분 전',
            isRead: false,
            icon: AlertCircle,
            color: 'text-rose-500 bg-rose-50'
        },
        {
            id: 2,
            type: 'report',
            title: '일간 리포트 발행',
            message: '어제자 건강 리포트가 생성되었습니다.',
            time: '2시간 전',
            isRead: false,
            icon: Zap,
            color: 'text-signal-blue bg-blue-50'
        },
        {
            id: 3,
            type: 'maintenance',
            title: '정기 점검 완료',
            message: '쇼케이스 B의 가스 보충 작업이 완료되었습니다.',
            time: '1일 전',
            isRead: true,
            icon: CheckCircle2,
            color: 'text-emerald-500 bg-emerald-50'
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed inset-x-0 bottom-0 bg-white rounded-t-[2.5rem] z-[101] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-900">알림</h3>
                                    <p className="text-xs text-slate-400 font-bold">새로운 소식을 확인하세요</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Notification List */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 pb-12">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={cn(
                                        "p-5 rounded-[1.5rem] border transition-all active:scale-[0.98] relative",
                                        notif.isRead ? "bg-white border-slate-100 opacity-70" : "bg-slate-50 border-slate-100 shadow-sm"
                                    )}
                                >
                                    {!notif.isRead && (
                                        <div className="absolute top-5 right-5 size-2 bg-rose-500 rounded-full" />
                                    )}
                                    <div className="flex gap-4">
                                        <div className={cn("size-12 shrink-0 rounded-2xl flex items-center justify-center", notif.color)}>
                                            <notif.icon size={24} />
                                        </div>
                                        <div className="flex-1 pr-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-black text-slate-900">{notif.title}</h4>
                                                <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{notif.time}</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-500 leading-relaxed bread-keep">
                                                {notif.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Quick Actions */}
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                            <button className="text-sm font-black text-slate-400 hover:text-slate-600">모두 읽음으로 표시</button>
                            <button className="flex items-center gap-1.5 text-sm font-black text-signal-blue">
                                <Settings2 size={16} />
                                알림 설정
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
