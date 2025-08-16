'use client';

import { useState } from 'react';
import SystemIntegrationHub from '@/components/integration/SystemIntegrationHub';
import ProductionReady from '@/components/production/ProductionReady';
import DebugDataTest from '@/components/test/DebugDataTest';
import SimpleDataTest from '@/components/test/SimpleDataTest';

export default function ComprehensiveTestPage() {
  const [activeComponent, setActiveComponent] = useState('debug');

  const components = [
    { id: 'debug', name: 'Debug Components', component: <DebugDataTest /> },
    { id: 'simple', name: 'Simple Test', component: <SimpleDataTest /> },
    { id: 'integration', name: 'System Integration Hub', component: <SystemIntegrationHub /> },
    { id: 'production', name: 'Production Ready', component: <ProductionReady /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Comprehensive Component Test
          </h1>
          <p className="text-gray-600">
            Test tất cả components để debug data rendering issues
          </p>
        </div>

        {/* Component Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeComponent === comp.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Component Display */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {components.find(c => c.id === activeComponent)?.name}
            </h2>
            <p className="text-sm text-gray-600">
              Component ID: {activeComponent}
            </p>
          </div>
          
          <div className="border-t pt-4">
            {components.find(c => c.id === activeComponent)?.component}
          </div>
        </div>

        {/* Debug Instructions */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-800 mb-2">🔍 Hướng dẫn debug:</h3>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>Mở Developer Tools (F12)</li>
            <li>Chuyển sang tab Console</li>
            <li>Xem các log messages bắt đầu với 🔄</li>
            <li>Chuyển đổi giữa các components để test</li>
            <li>Kiểm tra xem data có được render không</li>
            <li>Test các buttons và interactions</li>
          </ol>
        </div>

        {/* Component Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {components.map((comp) => (
            <div
              key={comp.id}
              className={`p-4 rounded-lg border-2 ${
                activeComponent === comp.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <h4 className="font-medium text-gray-900 mb-2">{comp.name}</h4>
              <div className="text-sm text-gray-600">
                Status: {activeComponent === comp.id ? '🟢 Active' : '⚪ Inactive'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
