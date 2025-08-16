'use client';

import DataTest from '@/components/test/DataTest';

export default function TestDataPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🧪 Test Data Loading
        </h1>
        <DataTest />
      </div>
    </div>
  );
}
