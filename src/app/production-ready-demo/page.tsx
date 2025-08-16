'use client';

import ProductionReady from '@/components/production/ProductionReady';

export default function ProductionReadyDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🚀 Production Ready Demo
        </h1>
        <ProductionReady />
      </div>
    </div>
  );
}
