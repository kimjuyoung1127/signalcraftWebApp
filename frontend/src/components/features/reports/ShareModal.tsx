import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Share, Download, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportDate: string;
}

export function ShareModal({ isOpen, onClose, reportDate }: ShareModalProps) {
    const shareOptions = [
        { id: 'kakao', label: '카카오톡', icon: MessageCircle, color: 'bg-[#FEE500] text-[#3c1e1e]' },
        { id: 'image', label: '이미지로 저장', icon: ImageIcon, color: 'bg-emerald-50 text-emerald-600' },
        { id: 'pdf', label: 'PDF 내보내기', icon: Download, color: 'bg-rose-50 text-rose-600' },
        { id: 'link', label: '링크 복사', icon: Copy, color: 'bg-blue-50 text-blue-600' },
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
                        className="fixed inset-x-0 bottom-0 bg-white rounded-t-[2.5rem] z-[101] shadow-2xl p-6 pb-12"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 leading-tight">리포트 공유하기</h3>
                                <p className="text-sm text-slate-400 font-bold">{reportDate} 건강 리포트</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {shareOptions.map((option) => (
                                <button
                                    key={option.id}
                                    className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-all active:scale-95 group"
                                >
                                    <div className={`p-4 rounded-2xl ${option.color} group-hover:scale-110 transition-transform`}>
                                        <option.icon size={24} />
                                    </div>
                                    <span className="text-sm font-black text-slate-700">{option.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Direct Share Button */}
                        <Button className="w-full h-14 rounded-2xl text-lg font-black gap-2">
                            <Share size={20} />
                            시스템 공유창 열기
                        </Button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
