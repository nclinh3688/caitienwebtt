'use client';

import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard';

export default function AnalyticsDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎯 Analytics Dashboard Demo
        </h1>
        <p className="text-gray-600">
          Trang demo để test Analytics Dashboard với dữ liệu mẫu
        </p>
      </div>
      
      <AnalyticsDashboard 
        userId="demo-user-123"
        timeframe="month"
        showAdvanced={true}
      />
    </div>
  );
}
