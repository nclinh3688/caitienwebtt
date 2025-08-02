'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Using native textarea element
import { FaRobot, FaUser, FaPaperPlane, FaSpinner, FaLanguage, FaBook, FaQuestionCircle } from 'react-icons/fa';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  language?: string;
  topic?: string;
}

interface AIChatbotProps {
  className?: string;
}

export function AIChatbot({ className = '' }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Xin chào! 👋 Tôi là AI Assistant của PHÚC KHIÊM EDU. Tôi có thể giúp bạn:\n\n🗾 **Tiếng Nhật**: Ngữ pháp, từ vựng, kanji, văn hóa\n🇨🇳 **Tiếng Trung**: HSK, phát âm, hán tự\n🇬🇧 **Tiếng Anh**: Grammar, vocabulary, conversation\n🇰🇷 **Tiếng Hàn**: TOPIK, hangul, K-culture\n🇻🇳 **Tiếng Việt**: Dành cho người nước ngoài\n\nBạn muốn hỏi gì về việc học ngoại ngữ?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    { text: "Cách phân biệt は và が trong tiếng Nhật?", language: "japanese", topic: "grammar" },
    { text: "Tôn ngữ trong tiếng Nhật như thế nào?", language: "japanese", topic: "keigo" },
    { text: "Phát âm tiếng Trung khó ở chỗ nào?", language: "chinese", topic: "pronunciation" },
    { text: "Cách học từ vựng hiệu quả nhất?", language: "general", topic: "study-method" },
    { text: "Sự khác biệt giữa 的, 得, 地?", language: "chinese", topic: "grammar" },
    { text: "Làm sao để luyện speaking tự nhiên?", language: "general", topic: "speaking" }
  ];

  const sendMessage = async (message: string = inputMessage) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date(),
      language: selectedLanguage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          language: selectedLanguage,
          context: 'community-chat',
          previousMessages: messages.slice(-5) // Last 5 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response || 'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này. Hãy thử lại sau!',
        timestamp: new Date(),
        language: data.detectedLanguage,
        topic: data.topic
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: '❌ Đã có lỗi xảy ra. Vui lòng thử lại sau. Trong thời gian chờ đợi, bạn có thể:\n\n- Kiểm tra phần FAQ\n- Tham gia diễn đàn thảo luận\n- Liên hệ với giáo viên\n\nCảm ơn bạn đã thông cảm! 🙏',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <Card className={`w-full h-[600px] flex flex-col ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FaRobot className="text-blue-600" />
          AI Assistant - Cộng đồng học ngoại ngữ
        </CardTitle>
        
        {/* Language Filter */}
        <div className="flex flex-wrap gap-2 mt-2">
          {['japanese', 'chinese', 'english', 'korean', 'vietnamese'].map((lang) => (
            <Button
              key={lang}
              variant={selectedLanguage === lang ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage(selectedLanguage === lang ? '' : lang)}
            >
              <FaLanguage className="mr-1" size={12} />
              {lang === 'japanese' && 'Nhật'}
              {lang === 'chinese' && 'Trung'}
              {lang === 'english' && 'Anh'}
              {lang === 'korean' && 'Hàn'}
              {lang === 'vietnamese' && 'Việt'}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {/* Quick Questions */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">💡 Câu hỏi gợi ý:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.slice(0, 3).map((q, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleQuickQuestion(q.text)}
                className="text-xs text-blue-600 hover:bg-blue-50"
              >
                <FaQuestionCircle className="mr-1" size={10} />
                {q.text}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'ai' ? (
                    <FaRobot className="text-blue-600 mt-1 flex-shrink-0" size={16} />
                  ) : (
                    <FaUser className="text-white mt-1 flex-shrink-0" size={16} />
                  )}
                  <div className="flex-1">
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {message.language && (
                        <span className="ml-2">• {message.language}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-blue-600" size={16} />
                  <FaSpinner className="animate-spin text-gray-500" size={14} />
                  <span className="text-sm text-gray-600">AI đang suy nghĩ...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Hỏi về ngữ pháp, từ vựng, phương pháp học..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none min-h-[50px] max-h-[100px] pr-12 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isLoading}
            />
            <FaBook className="absolute right-3 top-3 text-gray-400" size={14} />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="px-4"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" size={16} />
            ) : (
              <FaPaperPlane size={16} />
            )}
          </Button>
        </form>

        {/* Footer Stats */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          💬 {messages.length - 1} tin nhắn • 🤖 AI được cung cấp bởi Google Gemini
        </div>
      </CardContent>
    </Card>
  );
}

export default AIChatbot;