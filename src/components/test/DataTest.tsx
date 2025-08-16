'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DataTest() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData({
        message: "Dữ liệu test đã load thành công!",
        timestamp: new Date().toLocaleString('vi-VN'),
        systems: [
          { name: 'Content Management', status: 'Online', health: 95 },
          { name: 'AI Exercise', status: 'Online', health: 92 },
          { name: 'Gamification', status: 'Online', health: 98 },
          { name: 'AI Tutor', status: 'Online', health: 90 }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang tải dữ liệu...</h2>
            <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Component - Dữ liệu đã load thành công!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
