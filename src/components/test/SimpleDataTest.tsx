'use client';

import { useState, useEffect } from 'react';

export default function SimpleDataTest() {
  const [data, setData] = useState<string>('Chưa có dữ liệu');
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('🔄 SimpleDataTest: useEffect triggered, count:', count);
    
    const timer = setTimeout(() => {
      const newData = `Dữ liệu đã load lúc ${new Date().toLocaleTimeString('vi-VN')} (lần ${count + 1})`;
      console.log('🔄 SimpleDataTest: Setting data:', newData);
      setData(newData);
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  console.log('🔄 SimpleDataTest: Render called, data:', data, 'count:', count);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <h2 className="Text-xl font-bold mb-4">🧪 Simple Data Test</h2>
      
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-blue-800">
            <strong>Data:</strong> {data}
          </p>
        </div>
        
        <div className="p-4 bg-green-50 rounded">
          <p className="text-green-800">
            <strong>Count:</strong> {count}
          </p>
        </div>
        
        <div className="p-3 bg-yellow-50 rounded">
          <p className="text-yellow-800">
            <strong>Status:</strong> {data === 'Chưa có dữ liệu' ? 'Loading...' : 'Loaded!'}
          </p>
        </div>
        
        <button
          onClick={() => setCount(prev => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Force Update
        </button>
      </div>
    </div>
  );
}
