'use client';

import DebugDataTest from '@/components/test/DebugDataTest';
import SimpleDataTest from '@/components/test/SimpleDataTest';

export default function DebugTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔍 Debug Test Page
          </h1>
          <p className="text-gray-600">
            Trang test để debug data rendering issues
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔍 Debug Component</h2>
            <DebugDataTest />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🧪 Simple Test</h2>
            <SimpleDataTest />
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">📋 Hướng dẫn debug:</h3>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Mở Developer Tools (F12)</li>
            <li>Chuyển sang tab Console</li>
            <li>Xem các log messages bắt đầu với 🔍</li>
            <li>Kiểm tra xem data có được render không</li>
            <li>Test các buttons để xem state changes</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
