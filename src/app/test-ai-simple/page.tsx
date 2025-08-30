'use client';

import { useState } from 'react';

export default function TestAISimplePage() {
  const [result, setResult] = useState<string>('Chưa test');
  const [loading, setLoading] = useState<boolean>(false);

  const testOllamaService = async () => {
    setLoading(true);
    setResult('Đang test...');
    
    try {
      // Test 1: API connection
      const response = await fetch('/api/ai/ollama');
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ API hoạt động!\nModels: ${data.models.map((m: any) => m.name).join(', ')}`);
      } else {
        setResult(`❌ API lỗi: ${data.message}`);
      }
    } catch (error) {
      setResult(`💥 Lỗi: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const testChat = async () => {
    setLoading(true);
    setResult('Đang test chat...');
    
    try {
      const response = await fetch('/api/ai/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Xin chào, hãy giúp tôi học tiếng Nhật',
          context: 'Test page'
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult(`✅ Chat thành công!\n\nPhản hồi: ${data.response}\n\nModel: ${data.model}`);
      } else {
        setResult(`❌ Chat lỗi: ${data.message}`);
      }
    } catch (error) {
      setResult(`💥 Lỗi chat: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🧪 Test AI Simple</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔌 Test Ollama Service</h2>
          <div className="space-x-4">
            <button
              onClick={testOllamaService}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Đang test...' : 'Test Connection'}
            </button>
            
            <button
              onClick={testChat}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Đang test...' : 'Test Chat'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Kết quả</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm whitespace-pre-wrap">
            {result}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">💡 Hướng dẫn</h2>
          <div className="space-y-2 text-sm">
            <p>1. Click "Test Connection" để kiểm tra kết nối Ollama</p>
            <p>2. Click "Test Chat" để kiểm tra chat với AI</p>
            <p>3. Nếu cả hai đều thành công, AI Assistant sẽ hoạt động</p>
            <p>4. Nếu vẫn lỗi, có thể cần restart ứng dụng</p>
          </div>
        </div>
      </div>
    </div>
  );
}
