import dynamic from 'next/dynamic';
import React from 'react';

// Lazy load heavy components
export const AdvancedDashboard = dynamic(() => import('@/app/dashboard/advanced/page'), {
  loading: () => React.createElement('div', { className: 'loading-spinner' }, 'Loading...'),
  ssr: false,
});

export const AnalyticsDemo = dynamic(() => import('@/app/analytics-demo/page'), {
  loading: () => React.createElement('div', { className: 'loading-spinner' }, 'Loading...'),
  ssr: false,
});

export const AIExerciseDemo = dynamic(() => import('@/app/ai-exercise-demo/page'), {
  loading: () => React.createElement('div', { className: 'loading-spinner' }, 'Loading...'),
  ssr: false,
});

export const GamificationDemo = dynamic(() => import('@/app/gamification-ai-demo/page'), {
  loading: () => React.createElement('div', { className: 'loading-spinner' }, 'Loading...'),
  ssr: false,
});
