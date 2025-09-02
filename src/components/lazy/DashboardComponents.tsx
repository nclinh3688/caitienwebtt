'use client';

import dynamic from 'next/dynamic';

// Lazy load dashboard components
export const AdvancedDashboard = dynamic(() => import('@/app/dashboard/advanced/page'), {
  loading: () => <div className="dashboard-loading">Loading Advanced Dashboard...</div>,
  ssr: false
});


