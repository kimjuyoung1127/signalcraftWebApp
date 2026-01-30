import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Code Splitting: Lazy load pages for better performance
const DashboardPage = lazy(() => import('./components/features/dashboard/DashboardPage').then(module => ({ default: module.DashboardPage })));
const ReportPage = lazy(() => import('./components/features/reports/ReportPage').then(module => ({ default: module.ReportPage })));
const NotFoundPage = lazy(() => import('./components/shared/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

// Loading Component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 border-4 border-signal-blue/30 border-t-signal-blue rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">SignalCraft 로딩 중...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/machines" element={<NotFoundPage />} />
          <Route path="/settings" element={<NotFoundPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
