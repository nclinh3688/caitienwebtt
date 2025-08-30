'use client';

import React, { useState } from 'react';

export default function TestMultiModel() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState<any>(null);

  const testMultiModel = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setResponse('');
    setModelInfo(null);
    
    try {
      const res = await fetch('/api/ai/multi-model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: 'test' })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.response);
        setModelInfo({
          model: data.model,
          provider: data.provider,
          responseTime: data.responseTime,
          source: data.source
        });
      } else {
        setResponse(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      setResponse(`Lỗi kết nối: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testOllama = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    setResponse('');
    setModelInfo(null);
    
    try {
      const res = await fetch('/api/ai/ollama', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context: 'test' })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.response);
        setModelInfo({
          model: data.model,
          source: data.source
        });
      } else {
        setResponse(`Lỗi: ${data.message}`);
      }
    } catch (error) {
      setResponse(`Lỗi kết nối: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🚀 Test Multi-Model AI Assistant
          </h1>
          <p className="text-gray-600 mb-6">
            Test hệ thống AI đa model với fallback thông minh
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Câu hỏi:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={testMultiModel}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : '🚀 Test Multi-Model AI'}
              </button>
              
              <button
                onClick={testOllama}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Đang xử lý...' : '🚀 Test Ollama Local'}
              </button>
            </div>
          </div>
        </div>

        {response && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              💬 Phản hồi:
            </h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
            </div>
            
            {modelInfo && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-900 mb-2">📊 Thông tin Model:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Model:</span> {modelInfo.model}
                  </div>
                  {modelInfo.provider && (
                    <div>
                      <span className="font-medium">Provider:</span> {modelInfo.provider}
                    </div>
                  )}
                  {modelInfo.responseTime && (
                    <div>
                      <span className="font-medium">Thời gian phản hồi:</span> {modelInfo.responseTime}ms
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Nguồn:</span> {modelInfo.source}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔧 Hướng dẫn sử dụng:
          </h2>
          <div className="space-y-2 text-gray-600">
            <p>• <strong>Multi-Model AI:</strong> Sử dụng tất cả các model AI có sẵn với fallback thông minh</p>
            <p>• <strong>Ollama Local:</strong> Chỉ sử dụng model local (nhanh nhất cho từ vựng)</p>
            <p>• <strong>Từ vựng tiếng Nhật:</strong> Trả lời trực tiếp từ từ điển (100% chính xác)</p>
            <p>• <strong>Fallback:</strong> Tự động chuyển model khi gặp lỗi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
