import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load heavy components
export const AdvancedDashboard = dynamic(() => import('@/app/dashboard/advanced/page'), {
  loading: () => React.createElement('div', { className: 'loading-spinner' }, 'Loading...'),
  ssr: false,
});


