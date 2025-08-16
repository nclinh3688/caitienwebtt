'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DebugDataTest() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    console.log('🔍 DebugDataTest: useEffect triggered');
    setRenderCount(prev => prev + 1);
    
    // Simulate data loading with delay
    const timer = setTimeout(() => {
      console.log('🔍 DebugDataTest: Setting data after timeout');
      try {
        const mockData = {
          message: "Dữ liệu debug đã load thành công!",
          timestamp: new Date().toLocaleString('vi-VN'),
          renderCount: renderCount + 1,
          systems: [
            { name: 'Content Management', status: 'Online', health: 95 },
            { name: 'AI Exercise', status: 'Online', health: 92 },
            { name: 'Gamification', status: 'Online', health: 98 },
            { name: 'AI Tutor', status: 'Online', health: 90 }
          ]
        };
        
        console.log('🔍 DebugDataTest: Mock data created:', mockData);
        setData(mockData);
        setLoading(false);
        setError(null);
      } catch (err) {
        console.error('🔍 DebugDataTest: Error setting data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }, 1000);

    return () => {
      console.log('🔍 DebugDataTest: Cleanup timeout');
      clearTimeout(timer);
    };
  }, []);

  console.log('🔍 DebugDataTest: Render called, state:', { data, loading, error, renderCount });

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang tải dữ liệu debug...</h2>
            <p className="text-gray-500">Render count: {renderCount}</p>
            <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-red-500 text-4xl mb-4">❌</div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">Lỗi khi tải dữ liệu</h2>
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Thử lại
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Debug Component - Dữ liệu đã load thành công!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-600">✅ Debug Info:</h3>
              <p className="text-blue-600">Render count: {renderCount}</p>
              <p className="text-blue-600">Data loaded at: {data.timestamp}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600">✅ Status: Hoạt động</h3>
              <p className="text-gray-600">{data.message}</p>
              <p className="text-sm text-gray-500">Thời gian: {data.timestamp}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Systems Status:</h4>
              <div className="grid grid-cols-2 gap-2">
                {data.systems.map((system: any, index: number) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{system.name}</div>
                    <div className="text-sm text-gray-600">
                      Status: <span className="text-green-600">{system.status}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Health: <span className="text-blue-600">{system.health}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">🔍 Debug Actions:</h4>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => console.log('🔍 DebugDataTest: Current state:', { data, loading, error, renderCount })}
                >
                  Log State to Console
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setRenderCount(prev => prev + 1)}
                >
                  Force Re-render
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
