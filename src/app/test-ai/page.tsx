'use client';

import { useState } from 'react';
import { ollamaService } from '@/services/OllamaService';

export default function TestAIPage() {
  const [status, setStatus] = useState<string>('Chưa kiểm tra');
  const [models, setModels] = useState<string[]>([]);
  const [testMessage, setTestMessage] = useState<string>('Xin chào, hãy giúp tôi học tiếng Nhật');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const testConnection = async () => {
    setLoading(true);
    setStatus('Đang kiểm tra...');
    
    try {
      const result = await ollamaService.testConnection();
      console.log('Test result:', result);
      
      if (result.success) {
        setStatus('✅ Kết nối thành công!');
        setModels(await ollamaService.getAvailableModels());
      } else {
        setStatus(`❌ Lỗi: ${result.message}`);
      }
    } catch (error) {
      console.error('Test error:', error);
      setStatus(`💥 Lỗi: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const testChat = async () => {
    if (!testMessage.trim()) return;
    
    setLoading(true);
    setResponse('Đang xử lý...');
    
    try {
      const result = await ollamaService.chat(testMessage, 'Test page');
      setResponse(result);
    } catch (error) {
      setResponse(`Lỗi: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">🧪 Test AI Assistant</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">🔌 Kiểm tra kết nối</h2>
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
          </button>
          
          <div className="mt-4">
            <p className="font-medium">Trạng thái: {status}</p>
            {models.length > 0 && (
              <div className="mt-4">
                <p className="font-medium">Models có sẵn:</p>
                <ul className="list-disc list-inside">
                  {models.map((model, index) => (
                    <li key={index} className="text-sm text-gray-600">{model}</li>
                ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">💬 Test Chat</h2>
          <div className="mb-4">
            <textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Nhập tin nhắn test..."
              className="w-full p-3 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          
          <button
            onClick={testChat}
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : 'Gửi tin nhắn'}
          </button>
          
          {response && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p className="font-medium">Phản hồi:</p>
            <p className="mt-2 text-gray-700">{response}</p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
