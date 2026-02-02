import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Volume2, History, FileText } from 'lucide-react';
import { type Machine } from '../MachineCard';
import { cn } from '../../../../lib/utils';
import { AnalysisTab } from './AnalysisTab';
import { SmartLogTab } from './SmartLogTab';
import { MaintenanceTab } from './MaintenanceTab';
import { type MachineDetailModalProps, type TabType, type MaintenanceView } from './types';

export function MachineDetailModal({ machine, isOpen, onClose, initialView = 'analysis' }: MachineDetailModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>(initialView);
    const [maintenanceView, setMaintenanceView] = useState<MaintenanceView>('history');

    // Form States
    const [symptom, setSymptom] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');

    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialView);
            setMaintenanceView('history');
            if (machine) setSymptom(machine.prediction);
        }
    }, [isOpen, initialView, machine]);

    // Auto-close on success
    useEffect(() => {
        if (maintenanceView === 'success') {
            const timer = setTimeout(() => {
                onClose();
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [maintenanceView, onClose]);

    if (!machine) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        setMaintenanceView('success');
    };

    const getStatusTheme = (status: Machine['status']) => {
        if (status === 'running') return { color: 'text-signal-mint', bg: 'bg-signal-mint/10', border: 'border-signal-mint/20' };
        if (status === 'warning') return { color: 'text-signal-orange', bg: 'bg-signal-orange/10', border: 'border-signal-orange/20' };
        return { color: 'text-signal-red', bg: 'bg-signal-red/10', border: 'border-signal-red/20' };
    };

    const theme = getStatusTheme(machine.status);

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
                        className="fixed inset-x-0 bottom-0 top-[10%] bg-white rounded-t-[3rem] z-[101] overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Handle bar */}
                        <div className="w-full flex justify-center py-4">
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full" />
                        </div>

                        {/* Header & Tabs */}
                        <div className="px-6 border-b border-slate-50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-2xl", theme.bg)}>
                                        <Volume2 className={cn("size-6", theme.color)} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 leading-tight">{machine.name}</h2>
                                        <p className="text-sm text-slate-400 font-bold">{machine.location}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="size-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Custom Tabs */}
                            <div className="flex gap-8">
                                {[
                                    { id: 'analysis', label: '소리 분석', icon: Activity },
                                    { id: 'smartlog', label: '스마트 일지', icon: FileText },
                                    { id: 'maintenance', label: '유지보수 기록', icon: History },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id as TabType);
                                            if (tab.id === 'maintenance') setMaintenanceView('history');
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 pb-4 text-sm font-black transition-all relative",
                                            activeTab === tab.id ? "text-signal-blue" : "text-slate-400"
                                        )}
                                    >
                                        <tab.icon size={18} />
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-signal-blue rounded-t-full"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            <AnimatePresence mode="wait">
                                {activeTab === 'analysis' && (
                                    <AnalysisTab
                                        machine={machine}
                                        onViewMaintenance={() => setActiveTab('maintenance')}
                                    />
                                )}

                                {activeTab === 'smartlog' && (
                                    <SmartLogTab />
                                )}

                                {activeTab === 'maintenance' && (
                                    <MaintenanceTab
                                        maintenanceView={maintenanceView}
                                        setMaintenanceView={setMaintenanceView}
                                        symptom={symptom}
                                        setSymptom={setSymptom}
                                        visitDate={visitDate}
                                        setVisitDate={setVisitDate}
                                        urgency={urgency}
                                        setUrgency={setUrgency}
                                        onSubmit={handleSubmit}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
