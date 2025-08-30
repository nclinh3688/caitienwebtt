'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Brain,
  Zap
} from 'lucide-react';
import { getAIResponse, AIContext } from '@/lib/ai-service';
import { motion } from 'framer-motion';

interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: {
    currentItem?: any;
    pageType: 'vocabulary' | 'grammar' | 'kanji' | 'listening';
    category?: string;
  };
}

interface AIChatWidgetProps {
  pageType: 'vocabulary' | 'grammar' | 'kanji' | 'listening';
  currentItem?: any;
  category?: string;
  className?: string;
}

export default function AIChatWidget({ 
  pageType, 
  currentItem, 
  category, 
  className = '' 
}: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage(pageType, currentItem);
      setMessages([welcomeMessage]);
    }
  }, [isOpen, pageType, currentItem]);

  const getWelcomeMessage = (type: string, item?: any): AIChatMessage => {
    const baseMessage = {
      id: 'welcome',
      role: 'assistant' as const,
      timestamp: new Date(),
      context: { pageType: type as any, currentItem: item, category }
    };

    switch (type) {
      case 'vocabulary':
        return {
          ...baseMessage,
          content: `Xin chào! Tôi là AI Assistant cho phần Từ vựng N5. Tôi có thể giúp bạn:
• Giải thích ý nghĩa và cách dùng từ vựng
• Tạo câu ví dụ với từ vựng
• Đưa ra mẹo ghi nhớ từ vựng
• Trả lời thắc mắc về từ vựng

Hãy hỏi tôi bất cứ điều gì về từ vựng N5!`
        };
      case 'grammar':
        return {
          ...baseMessage,
          content: `Xin chào! Tôi là AI Assistant cho phần Ngữ pháp N5. Tôi có thể giúp bạn:
• Giải thích ngữ pháp một cách dễ hiểu
• So sánh các mẫu câu tương tự
• Chỉ ra lỗi thường gặp và cách tránh
• Tạo câu ví dụ với ngữ pháp

Hãy hỏi tôi bất cứ điều gì về ngữ pháp N5!`
        };
      case 'kanji':
        return {
          ...baseMessage,
          content: `Xin chào! Tôi là AI Assistant cho phần Kanji N5. Tôi có thể giúp bạn:
• Giải thích ý nghĩa và cách đọc kanji
• Tạo câu chuyện để nhớ kanji
• Giải thích bộ thủ và thứ tự nét
• Đưa ra mẹo ghi nhớ kanji

Hãy hỏi tôi bất cứ điều gì về kanji N5!`
        };
      default:
        return {
          ...baseMessage,
          content: `Xin chào! Tôi là AI Assistant. Tôi có thể giúp bạn học tiếng Nhật hiệu quả hơn. Hãy hỏi tôi bất cứ điều gì!`
        };
    }
  };

  const getSuggestedQuestions = () => {
    const suggestions: Record<string, string[]> = {
      vocabulary: [
        "Giải thích từ này có nghĩa gì?",
        "Tạo câu ví dụ với từ này",
        "Có từ nào tương tự không?",
        "Mẹo ghi nhớ từ này?"
      ],
      grammar: [
        "Giải thích ngữ pháp này",
        "So sánh với ngữ pháp khác",
        "Lỗi thường gặp khi dùng?",
        "Tạo câu ví dụ"
      ],
      kanji: [
        "Giải thích ý nghĩa kanji này",
        "Tạo câu chuyện để nhớ",
        "Giải thích bộ thủ",
        "Thứ tự nét như thế nào?"
      ],
      listening: [
        "Giải thích nội dung audio",
        "Tạo câu hỏi về audio",
        "Dịch transcript",
        "Luyện phát âm"
      ]
    };

    return suggestions[pageType] || suggestions.vocabulary;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      context: { pageType, currentItem, category }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use real AI service with fallback
      const aiContext: AIContext = {
        pageType,
        currentItem,
        category,
        userLevel: 'N5', // TODO: Get from user profile
        previousMessages: messages.slice(-5).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      };

      const aiResponse = await getAIResponse(inputValue, aiContext);
      
      const assistantMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        context: { pageType, currentItem, category }
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Xin lỗi, tôi gặp lỗi khi xử lý câu hỏi của bạn. Vui lòng thử lại sau.',
        timestamp: new Date(),
        context: { pageType, currentItem, category }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (question: string, type: string, item?: any): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = {
      vocabulary: [
        `Từ "${item?.japanese || 'này'}" có nghĩa là "${item?.meaning || '...'}" trong tiếng Việt.`,
        `Đây là một từ rất quan trọng trong N5. Bạn có thể dùng nó trong các tình huống hàng ngày.`,
        `Mẹo ghi nhớ: Hãy liên tưởng đến hình ảnh hoặc âm thanh tương tự.`,
        `Ví dụ câu: "${item?.example || 'Tôi sẽ tạo ví dụ cho bạn.'}"`
      ],
      grammar: [
        `Ngữ pháp này dùng để ${item?.meaning || 'biểu đạt ý nghĩa cụ thể'}.`,
        `Cấu trúc: ${item?.pattern || 'Danh từ + は + Tính từ/Động từ'}`,
        `Lưu ý: Đây là lỗi thường gặp khi học ngữ pháp này.`,
        `Ví dụ: "${item?.examples?.[0]?.japanese || 'Tôi sẽ tạo ví dụ cho bạn.'}"`
      ],
      kanji: [
        `Kanji "${item?.character || 'này'}" có nghĩa là "${item?.meaning || '...'}"`,
        `Cách đọc: Onyomi "${item?.onyomi || '...'}", Kunyomi "${item?.kunyomi || '...'}"`,
        `Bộ thủ: ${item?.radicals?.join(', ') || 'Tôi sẽ giải thích bộ thủ cho bạn.'}`,
        `Thứ tự nét: ${item?.strokeCount || '2'} nét. Hãy viết theo thứ tự từ trên xuống dưới, từ trái sang phải.`
      ]
    };

    const typeResponses = responses[type as keyof typeof responses] || responses.vocabulary;
    return typeResponses[Math.floor(Math.random() * typeResponses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg relative group animate-pulse"
          >
            <Brain className="h-4 w-4 text-white" />
            {/* AI Badge */}
            <motion.div 
              className="absolute -top-1 -right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.div>
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                AI Assistant - Hỏi gì cũng được!
              </div>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </Button>
        </motion.div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
        >
          <Card className="w-96 h-[500px] shadow-xl border-0">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="relative">
                  <Brain className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold">
                    AI
                  </div>
                </div>
                <div>
                  <div className="text-lg">AI Assistant</div>
                  <div className="text-xs opacity-80">Hỏi gì cũng được!</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {pageType.toUpperCase()}
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 h-[400px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.role === 'assistant' && (
                        <Bot className="h-4 w-4 mt-0.5 text-blue-400" />
                      )}
                      {message.role === 'user' && (
                        <User className="h-4 w-4 mt-0.5 text-white" />
                      )}
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span className="text-sm text-white">AI đang suy nghĩ...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <motion.div 
                className="px-4 pb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-xs text-gray-300 mb-2 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  Gợi ý câu hỏi:
                </div>
                <div className="flex flex-wrap gap-2">
                  {getSuggestedQuestions().map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto py-1 px-2 hover:bg-gray-700 hover:border-gray-500 transition-colors text-white border-gray-600"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-700 bg-gray-900">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-gray-800 text-white placeholder-gray-400"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      )}
    </div>
  );
}
