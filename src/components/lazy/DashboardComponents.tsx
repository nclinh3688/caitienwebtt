'use client';

import dynamic from 'next/dynamic';

// Lazy load dashboard components
export const AdvancedDashboard = dynamic(() => import('@/app/dashboard/advanced/page'), {
  loading: () => <div className="dashboard-loading">Loading Advanced Dashboard...</div>,
  ssr: false
});

export const AnalyticsDemo = dynamic(() => import('@/app/analytics-demo/page'), {
  loading: () => <div className="analytics-loading">Loading Analytics...</div>,
  ssr: false
});

export const AIExerciseDemo = dynamic(() => import('@/app/ai-exercise-demo/page'), {
  loading: () => <div className="ai-loading">Loading AI Exercise...</div>,
  ssr: false
});

export const GamificationDemo = dynamic(() => import('@/app/gamification-ai-demo/page'), {
  loading: () => <div className="gamification-loading">Loading Gamification...</div>,
  ssr: false
});
