import { ReactNode } from 'react';

interface SettingsGroupProps {
    title?: string;
    children: ReactNode;
}

export function SettingsGroup({ title, children }: SettingsGroupProps) {
    return (
        <div className="mb-6">
            {title && (
                <h4 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                    {title}
                </h4>
            )}
            <div className="bg-white rounded-[1.5rem] shadow-sm overflow-hidden border border-slate-50/50">
                {children}
            </div>
        </div>
    );
}
