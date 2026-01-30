import { ChevronLeft, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReportHeaderProps {
    title: string;
}

export function ReportHeader({ title }: ReportHeaderProps) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-4 border-b border-slate-100 flex items-center justify-between">
            <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-slate-50 text-slate-900 transition-colors active:scale-95"
            >
                <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">{title}</h2>
            <button className="p-2 rounded-xl hover:bg-slate-50 text-signal-blue transition-colors active:scale-95">
                <Share2 size={24} />
            </button>
        </header>
    );
}
