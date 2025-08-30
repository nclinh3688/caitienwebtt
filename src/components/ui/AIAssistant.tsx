'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Send,
  Bot,
  User,
  Wifi,
  WifiOff,
  Settings
} from 'lucide-react';
import { ollamaService } from '@/services/OllamaService';
import { multiModelService } from '@/services/MultiModelService';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  className?: string;
}

export default function AIAssistant({ className }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Xin chào! Tôi là AI Assistant của PHÚC KHIÊM Education. Tôi có thể giúp bạn học ngoại ngữ, giải đáp thắc mắc về ngữ pháp, từ vựng, và nhiều hơn nữa. Bạn cần hỗ trợ gì?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedModel, setSelectedModel] = useState('auto');
  const [ollamaStatus, setOllamaStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [hasInitialized, setHasInitialized] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

  // Auto-scroll xuống tin nhắn mới nhất
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-scroll khi streaming response
  useEffect(() => {
    if (isLoading) {
    const interval = setInterval(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Auto-scroll khi chat mở
  useEffect(() => {
    if (isOpen && !isMinimized) {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
      }
    }
  }, [isOpen, isMinimized]);

  // Kiểm tra Ollama status
  useEffect(() => {
    const checkOllamaStatus = async () => {
      try {
        const response = await fetch('/api/ai/ollama');
        if (response.ok) {
          setOllamaStatus('available');
        } else {
          setOllamaStatus('unavailable');
        }
      } catch (error) {
        setOllamaStatus('unavailable');
      }
    };

    if (!hasInitialized) {
      checkOllamaStatus();
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  // Auto-check mỗi 30 giây thay vì 5 giây để giảm nháy
  useEffect(() => {
    if (hasInitialized) {
      const interval = setInterval(() => {
        // Chỉ check nếu chat đang mở để tiết kiệm tài nguyên
        if (isOpen) {
      checkOllamaStatus();
      loadModelStatus();
        }
      }, 30000); // Từ 5 giây → 30 giây
    return () => clearInterval(interval);
    }
  }, [hasInitialized, isOpen]);

  const checkOllamaStatus = async () => {
    // Tránh check liên tục nếu đang check
    if (ollamaStatus === 'checking') return;
    
    console.log('🔍 Checking Ollama status...');
    setOllamaStatus('checking');
    try {
      const result = await ollamaService.testConnection();
      console.log('📡 Ollama test result:', result);
      if (result.success) {
        console.log('✅ Ollama available, model:', result.model);
        setOllamaStatus('available');
      } else {
        console.log('❌ Ollama test failed:', result.message);
        setOllamaStatus('unavailable');
      }
    } catch (error) {
      console.error('💥 Ollama check error:', error);
      setOllamaStatus('unavailable');
    }
  };

  const loadModelStatus = async () => {
    try {
      const status = multiModelService.getModelStatus();
      // setModelStatus(status); // This line was removed
      // setAvailableModels(status.filter(m => m.isAvailable)); // This line was removed
    } catch (error) {
      console.error('💥 Error loading model status:', error);
    }
  };

  const getCurrentContext = () => {
    if (typeof window === 'undefined') return 'Bạn đang ở trang chính';
    
      const path = window.location.pathname;
    const contextMap: Record<string, string> = {
      '/courses/japanese/n5/vocabulary': 'Bạn đang học từ vựng N5 tiếng Nhật',
      '/courses/japanese/n5/grammar': 'Bạn đang học ngữ pháp N5 tiếng Nhật',
      '/courses/japanese/n5/kanji': 'Bạn đang học Kanji N5 tiếng Nhật',
      '/courses/japanese/n5/listening': 'Bạn đang luyện nghe N5 tiếng Nhật'
    };
    
    return contextMap[path] || 'Bạn đang ở trang chính';
  };

  // Smart AI responses dựa trên context và câu hỏi
  const generateSmartResponse = (question: string, context: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Xử lý câu hỏi về từ vựng tiếng Trung
    if (lowerQuestion.includes('tiếng trung') || lowerQuestion.includes('tiếng hoa') || lowerQuestion.includes('chinese') || lowerQuestion.includes('trung quốc')) {
      // Xác định số lượng
      let count = 10; // Default
      if (lowerQuestion.includes('5')) count = 5;
      else if (lowerQuestion.includes('10')) count = 10;
      else if (lowerQuestion.includes('15')) count = 15;
      else if (lowerQuestion.includes('20')) count = 20;
      
      if (count === 10) {
        return `📚 **10 TỪ VỰNG TIẾNG TRUNG KHÓ NHẤT**

1. 复杂 (fuzá) - Phức tạp
2. 困难 (kùnnán) - Khó khăn
3. 模糊 (móhu) - Mơ hồ, không rõ ràng
4. 矛盾 (máodùn) - Mâu thuẫn
5. 细腻 (xìnì) - Tinh tế, tế nhị
6. 巧妙 (qiǎomiào) - Khéo léo, tinh xảo
7. 崇高 (chónggāo) - Cao cả, siêu việt
8. 哲学 (zhéxué) - Triết học
9. 虚无 (xūwú) - Vô nghĩa, hư vô
10. 悲观 (bēiguān) - Bi quan

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
      }
      
      if (count === 5) {
        return `📚 **5 TỪ VỰNG TIẾNG TRUNG KHÓ NHẤT**

1. 复杂 (fuzá) - Phức tạp
2. 困难 (kùnnán) - Khó khăn
3. 模糊 (móhu) - Mơ hồ, không rõ ràng
4. 矛盾 (máodùn) - Mâu thuẫn
5. 细腻 (xìnì) - Tinh tế, tế nhị

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
      }
      
      return `📚 **TỪ VỰNG TIẾNG TRUNG KHÓ NHẤT**

1. 复杂 (fuzá) - Phức tạp
2. 困难 (kùnnán) - Khó khăn
3. 模糊 (móhu) - Mơ hồ, không rõ ràng
4. 矛盾 (máodùn) - Mâu thuẫn

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng tiếng Trung?**`;
    }
    
    // Xử lý câu hỏi về từ vựng tiếng Anh
    if (lowerQuestion.includes('tiếng anh') || lowerQuestion.includes('english') || lowerQuestion.includes('anh')) {
      // Xác định số lượng
      let count = 10; // Default
      if (lowerQuestion.includes('5')) count = 5;
      else if (lowerQuestion.includes('10')) count = 10;
      else if (lowerQuestion.includes('15')) count = 15;
      else if (lowerQuestion.includes('20')) count = 20;
      
      if (count === 10) {
        return `📚 **10 TỪ VỰNG TIẾNG ANH KHÓ NHẤT**

1. **Serendipity** - Sự tình cờ may mắn
2. **Ephemeral** - Ngắn ngủi, tạm thời
3. **Ubiquitous** - Có mặt khắp nơi
4. **Mellifluous** - Ngọt ngào, du dương
5. **Ineffable** - Không thể diễn tả được
6. **Petrichor** - Mùi hương sau cơn mưa
7. **Iridescent** - Lấp lánh, óng ánh
8. **Serendipitous** - Tình cờ may mắn
9. **Melancholy** - Buồn bã, u sầu
10. **Serenity** - Sự bình yên, thanh thản

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
      }
      
      if (count === 5) {
        return `📚 **5 TỪ VỰNG TIẾNG ANH KHÓ NHẤT**

1. **Serendipity** - Sự tình cờ may mắn
2. **Ephemeral** - Ngắn ngủi, tạm thời
3. **Ubiquitous** - Có mặt khắp nơi
4. **Mellifluous** - Ngọt ngào, du dương
5. **Ineffable** - Không thể diễn tả được

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
      }
      
      return `📚 **TỪ VỰNG TIẾNG ANH KHÓ NHẤT**

1. **Serendipity** - Sự tình cờ may mắn
2. **Ephemeral** - Ngắn ngủi, tạm thời
3. **Ubiquitous** - Có mặt khắp nơi
4. **Mellifluous** - Ngọt ngào, du dương

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng tiếng Anh?**`;
    }
    
    // Xử lý câu hỏi về từ vựng tiếng Hàn
    if (lowerQuestion.includes('tiếng hàn') || lowerQuestion.includes('korean') || lowerQuestion.includes('hàn quốc')) {
      // Xác định số lượng
      let count = 10; // Default
      if (lowerQuestion.includes('5')) count = 5;
      else if (lowerQuestion.includes('10')) count = 10;
      else if (lowerQuestion.includes('15')) count = 15;
      else if (lowerQuestion.includes('20')) count = 20;
      
      if (count === 10) {
        return `📚 **10 TỪ VỰNG TIẾNG HÀN KHÓ NHẤT**

1. **복잡하다 (bokjapada)** - Phức tạp
2. **어렵다 (eoryeopda)** - Khó khăn
3. **모호하다 (mohohada)** - Mơ hồ, không rõ ràng
4. **모순되다 (mosundwida)** - Mâu thuẫn
5. **섬세하다 (seomseada)** - Tinh tế, tế nhị
6. **교묘하다 (gyomyohada)** - Khéo léo, tinh xảo
7. **숭고하다 (sunggohada)** - Cao cả, siêu việt
8. **철학 (cheolhak)** - Triết học
9. **허무하다 (heomuhada)** - Vô nghĩa, hư vô
10. **비관적 (bigwanjeok)** - Bi quan

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
      }
      
      if (count === 5) {
        return `📚 **5 TỪ VỰNG TIẾNG HÀN KHÓ NHẤT**

1. **복잡하다 (bokjapada)** - Phức tạp
2. **어렵다 (eoryeopda)** - Khó khăn
3. **모호하다 (mohohada)** - Mơ hồ, không rõ ràng
4. **모순되다 (mosundwida)** - Mâu thuẫn
5. **섬세하다 (seomseada)** - Tinh tế, tế nhị

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
      }
      
      return `📚 **TỪ VỰNG TIẾNG HÀN KHÓ NHẤT**

1. **복잡하다 (bokjapada)** - Phức tạp
2. **어렵다 (eoryeopda)** - Khó khăn
3. **모호하다 (mohohada)** - Mơ hồ, không rõ ràng
4. **모순되다 (mosundwida)** - Mâu thuẫn

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng tiếng Hàn?**`;
    }
    
    // Xử lý câu hỏi về từ vựng theo level
    if (lowerQuestion.includes('từ vựng') || lowerQuestion.includes('vocabulary')) {
      // Xác định level (N1, N2, N3, N4, N5)
      let level = 'N5'; // Default
      if (lowerQuestion.includes('n1')) level = 'N1';
      else if (lowerQuestion.includes('n2')) level = 'N2';
      else if (lowerQuestion.includes('n3')) level = 'N3';
      else if (lowerQuestion.includes('n4')) level = 'N4';
      else if (lowerQuestion.includes('n5')) level = 'N5';
      
      // Xác định số lượng
      let count = 10; // Default
      if (lowerQuestion.includes('5')) count = 5;
      else if (lowerQuestion.includes('10')) count = 10;
      else if (lowerQuestion.includes('15')) count = 15;
      else if (lowerQuestion.includes('20')) count = 20;
      
      // Trả lời theo level và số lượng
      if (level === 'N1') {
        if (count === 5) {
          return `📚 **5 TỪ VỰNG N1 PHỔ BIẾN NHẤT**

1. **経済 (keizai)** - Kinh tế
2. **政治 (seiji)** - Chính trị  
3. **社会 (shakai)** - Xã hội
4. **文化 (bunka)** - Văn hóa
5. **教育 (kyouiku)** - Giáo dục

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
        }
        return `📚 **TỪ VỰNG N1 QUAN TRỌNG**

1. **経済 (keizai)** - Kinh tế
2. **政治 (seiji)** - Chính trị
3. **社会 (shakai)** - Xã hội
4. **文化 (bunka)** - Văn hóa

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng N1?**`;
      }
      
      if (level === 'N2') {
        if (count === 5) {
          return `📚 **5 TỪ VỰNG N2 PHỔ BIẾN NHẤT**

1. **会社 (kaisha)** - Công ty
2. **仕事 (shigoto)** - Công việc
3. **家族 (kazoku)** - Gia đình
4. **友達 (tomodachi)** - Bạn bè
5. **学校 (gakkou)** - Trường học

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
        }
        return `📚 **TỪ VỰNG N2 QUAN TRỌNG**

1. **会社 (kaisha)** - Công ty
2. **仕事 (shigoto)** - Công việc
3. **家族 (kazoku)** - Gia đình
4. **友達 (tomodachi)** - Bạn bè

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng N2?**`;
      }
      
      if (level === 'N3') {
        if (count === 5) {
          return `📚 **5 TỪ VỰNG N3 PHỔ BIẾN NHẤT**

1. **映画 (eiga)** - Phim
2. **音楽 (ongaku)** - Âm nhạc
3. **料理 (ryouri)** - Nấu ăn
4. **旅行 (ryokou)** - Du lịch
5. **趣味 (shumi)** - Sở thích

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
        }
        return `📚 **TỪ VỰNG N3 QUAN TRỌNG**

1. **映画 (eiga)** - Phim
2. **音楽 (ongaku)** - Âm nhạc
3. **料理 (ryouri)** - Nấu ăn
4. **旅行 (ryokou)** - Du lịch

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng N3?**`;
      }
      
      if (level === 'N4') {
        if (count === 5) {
          return `📚 **5 TỪ VỰNG N4 PHỔ BIẾN NHẤT**

1. **新しい (atarashii)** - Mới
2. **古い (furui)** - Cũ
3. **大きい (ookii)** - Lớn
4. **小さい (chiisai)** - Nhỏ
5. **良い (yoi)** - Tốt

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
        }
        return `📚 **TỪ VỰNG N4 QUAN TRỌNG**

1. **新しい (atarashii)** - Mới
2. **古い (furui)** - Cũ
3. **大きい (ookii)** - Lớn
4. **小さい (chiisai)** - Nhỏ

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng N4?**`;
      }
      
      if (level === 'N5') {
        if (count === 5) {
          return `📚 **5 TỪ VỰNG N5 PHỔ BIẾN NHẤT**

1. **水 (mizu)** - Nước
2. **火 (hi)** - Lửa
3. **風 (kaze)** - Gió
4. **土 (tsuchi)** - Đất
5. **空 (sora)** - Bầu trời

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những từ này thường xuyên để nhớ lâu!`;
        }
        return `📚 **TỪ VỰNG N5 QUAN TRỌNG**

1. **水 (mizu)** - Nước
2. **火 (hi)** - Lửa
3. **風 (kaze)** - Gió
4. **土 (tsuchi)** - Đất

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu từ vựng N5?**`;
      }
    }
    
    // Xử lý câu hỏi về ngữ pháp
    if (lowerQuestion.includes('ngữ pháp') || lowerQuestion.includes('grammar')) {
      let level = 'N5';
      if (lowerQuestion.includes('n1')) level = 'N1';
      else if (lowerQuestion.includes('n2')) level = 'N2';
      else if (lowerQuestion.includes('n3')) level = 'N3';
      else if (lowerQuestion.includes('n4')) level = 'N4';
      else if (lowerQuestion.includes('n5')) level = 'N5';
      
      let count = 5;
      if (lowerQuestion.includes('5')) count = 5;
      else if (lowerQuestion.includes('10')) count = 10;
      
      if (level === 'N1') {
        if (count === 5) {
          return `📖 **5 NGỮ PHÁP N1 QUAN TRỌNG**

1. **〜に限らず (ni kagirazu)** - Không chỉ... mà còn
2. **〜に伴って (ni tomonatte)** - Cùng với, theo
3. **〜に基づいて (ni motozuite)** - Dựa trên, căn cứ vào
4. **〜に応じて (ni oujite)** - Tùy theo, phù hợp với
5. **〜に際して (ni saishite)** - Khi, lúc

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những cấu trúc này thường xuyên!`;
        }
        return `📖 **NGỮ PHÁP N1 QUAN TRỌNG**

1. **〜に限らず (ni kagirazu)** - Không chỉ... mà còn
2. **〜に伴って (ni tomonatte)** - Cùng với, theo

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu ngữ pháp N1?**`;
      }
      
      if (level === 'N2') {
        if (count === 5) {
          return `📖 **5 NGỮ PHÁP N2 QUAN TRỌNG**

1. **〜によって (ni yotte)** - Bởi, do, tùy theo
2. **〜に対して (ni taishite)** - Đối với, về phía
3. **〜について (ni tsuite)** - Về, liên quan đến
4. **〜として (toshite)** - Như là, với tư cách
5. **〜ながら (nagara)** - Trong khi, mặc dù

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những cấu trúc này thường xuyên!`;
        }
        return `📖 **NGỮ PHÁP N2 QUAN TRỌNG**

1. **〜によって (ni yotte)** - Bởi, do, tùy theo
2. **〜に対して (ni taishite)** - Đối với, về phía

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu ngữ pháp N2?**`;
      }
      
      if (level === 'N3') {
        if (count === 5) {
          return `📖 **5 NGỮ PHÁP N3 QUAN TRỌNG**

1. **〜てしまう (te shimau)** - Hoàn thành, xong
2. **〜ておく (te oku)** - Làm trước, chuẩn bị
3. **〜てみる (te miru)** - Thử làm
4. **〜てある (te aru)** - Đã được làm sẵn
5. **〜ている (te iru)** - Đang, đã

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những cấu trúc này thường xuyên!`;
        }
        return `📖 **NGỮ PHÁP N3 QUAN TRỌNG**

1. **〜てしまう (te shimau)** - Hoàn thành, xong
2. **〜ておく (te oku)** - Làm trước, chuẩn bị

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu ngữ pháp N3?**`;
      }
      
      if (level === 'N4') {
        if (count === 5) {
          return `📖 **5 NGỮ PHÁP N4 QUAN TRỌNG**

1. **〜たい (tai)** - Muốn
2. **〜ない (nai)** - Không
3. **〜た (ta)** - Quá khứ
4. **〜ている (te iru)** - Đang
5. **〜てください (te kudasai)** - Hãy làm

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những cấu trúc này thường xuyên!`;
        }
        return `📖 **NGỮ PHÁP N4 QUAN TRỌNG**

1. **〜たい (tai)** - Muốn
2. **〜ない (nai)** - Không

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu ngữ pháp N4?**`;
      }
      
      if (level === 'N5') {
        if (count === 5) {
          return `📖 **5 NGỮ PHÁP N5 QUAN TRỌNG**

1. **です (desu)** - Là
2. **ます (masu)** - Thể lịch sự
3. **〜が (ga)** - Chủ ngữ
4. **〜を (wo)** - Tân ngữ
5. **〜に (ni)** - Đến, tại

💡 **Lưu ý:** ${context}
🎯 **Mẹo học:** Hãy luyện tập những cấu trúc này thường xuyên!`;
        }
        return `📖 **NGỮ PHÁP N5 QUAN TRỌNG**

1. **です (desu)** - Là
2. **ます (masu)** - Thể lịch sự

💡 **Lưu ý:** ${context}
❓ **Bạn muốn học bao nhiêu ngữ pháp N5?**`;
      }
    }
    
    // Trả lời mặc định
    return `🤖 **AI Assistant PHÚC KHIÊM Education**

💡 **Tôi có thể giúp bạn:**
• Học từ vựng theo level (N1-N5)
• Học ngữ pháp tiếng Nhật
• Giải đáp thắc mắc về ngôn ngữ
• Tạo bài tập và quiz

❓ **Bạn muốn học gì hôm nay?**

${context}`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const context = getCurrentContext();
      
      // ƯU TIÊN 1: Multi-Model Service (Nhanh nhất và thông minh nhất)
      try {
        console.log('🚀 Sử dụng Multi-Model Service (Auto mode)');
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: '⏳ Đang xử lý...',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        
        // Gọi Multi-Model Service với model tốt nhất
        const response = await multiModelService.chat(inputValue, context);
        
        if (response.success) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiResponse.id 
                ? { ...msg, content: response.response || response.toString() }
                : msg
            )
          );
          setIsLoading(false);
          return; // Thoát nếu thành công
        } else {
          // API fail - báo lỗi rõ ràng
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiResponse.id 
                ? { ...msg, content: `❌ **API Error:** ${response.response}\n\n💡 **Giải pháp:** Bạn cần cấu hình API keys để sử dụng GPT-4o Mini và Gemini như ChatGPT thật.` }
                : msg
            )
          );
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('❌ Multi-Model Service failed:', error);
        // Báo lỗi rõ ràng
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `❌ **API Connection Error:** ${error}\n\n💡 **Giải pháp:** Bạn cần cấu hình API keys để sử dụng GPT-4o Mini và Gemini như ChatGPT thật.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        return;
      }
      
      // ƯU TIÊN 2: Ollama Local (Chỉ khi không phải auto mode)
      if (ollamaStatus === 'available' && selectedModel !== 'auto') {
        try {
          console.log('🏠 Sử dụng Ollama Local');
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: '',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiResponse]);
          
          // Streaming response từ Ollama
          // setIsStreaming(true); // This line was removed
          let fullResponse = '';
          
          for await (const chunk of ollamaService.streamChat(inputValue, context, selectedModel)) {
            fullResponse += chunk;
            setMessages(prev => 
              prev.map(msg => 
                msg.id === aiResponse.id 
                  ? { ...msg, content: fullResponse }
                  : msg
              )
            );
          }
          
          // setIsStreaming(false); // This line was removed
          setIsLoading(false);
          return; // Thoát nếu thành công
        } catch (error) {
          console.log('❌ Ollama failed:', error);
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: `❌ **Ollama Error:** ${error}\n\n💡 **Giải pháp:** Ollama local không khả dụng.`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsLoading(false);
          return;
        }
      }
      
      // Không có Smart Fallback - chỉ báo lỗi rõ ràng
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `❌ **Không có AI model nào khả dụng!**

💡 **Giải pháp để sử dụng như ChatGPT thật:**

1. **Cấu hình OpenAI API Key:**
   - Tạo file \`.env.local\` trong thư mục gốc
   - Thêm: \`OPENAI_API_KEY=sk-your-key-here\`
   - Lấy key tại: https://platform.openai.com/api-keys

2. **Cấu hình Google API Key:**
   - Thêm: \`GOOGLE_API_KEY=your-key-here\`
   - Lấy key tại: https://makersuite.google.com/app/apikey

3. **Restart ứng dụng** sau khi cấu hình

Sau đó AI sẽ hoạt động như ChatGPT và Gemini thật!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      
    } catch (error) {
      // Fallback cuối cùng nếu có lỗi nghiêm trọng
      console.error('💥 Tất cả services đều fail, sử dụng emergency fallback:', error);
      const context = getCurrentContext();
      const fallbackResponse = generateSmartResponse(inputValue, context);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: fallbackResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    // Shift+Enter sẽ xuống dòng (mặc định của textarea)
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatEndRef.current && !isMinimized) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        // Mobile breakpoint: < 768px (md), Tablet: 768px-1024px, Desktop: > 1024px
        const mobile = width < 768;
        const tablet = width >= 768 && width < 1024;
        const desktop = width >= 1024;
        
        setIsMobile(mobile);
        console.log('Window width:', width, 'isMobile:', mobile, 'isTablet:', tablet, 'isDesktop:', desktop);
      }
    };
    
    checkMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Close model selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isModelSelectorOpen && !(event.target as Element).closest('.model-selector')) {
        setIsModelSelectorOpen(false);
      }
    };

    if (isModelSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModelSelectorOpen]);

  return (
    <>
      {console.log('Render - isMobile:', isMobile, 'Window width:', typeof window !== 'undefined' ? window.innerWidth : 'N/A')}
      <motion.div
        className={`fixed bottom-6 right-6 z-[9999] ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          pointerEvents: 'auto'
        }}
      >
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 relative focus:outline-none focus:ring-0"
          title="AI Assistant"
          style={{
            position: 'relative',
            zIndex: 9999,
            pointerEvents: 'auto'
          }}
        >
          <MessageCircle size={17} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full border-2 border-white">
            AI
          </span>
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[500px] max-w-[90vw] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Model Selector Section - Không có header, chỉ có model selector và nút điều khiển */}
            {!isMinimized && (
              <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                  {/* Model Selector - Nút chính */}
                <button
                  onClick={() => {
                    console.log('Model selector clicked, current state:', isModelSelectorOpen);
                    setIsModelSelectorOpen(!isModelSelectorOpen);
                  }}
                  className="flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300 text-xs font-medium model-selector relative focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600"
                  title="Chọn AI Model"
                >
                  <span className="text-sm">🤖</span>
                  <span className="text-xs">Auto</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs transition-transform duration-200">
                    {isModelSelectorOpen ? '▲' : '▼'}
                  </span>

                  {/* Dropdown Menu */}
                  {isModelSelectorOpen && (
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50">
                      <div className="p-1 space-y-0.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Auto selected');
                            setSelectedModel('auto');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">🤖</span>
                          <span>Auto</span>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('GPT-4o Mini selected');
                            setSelectedModel('gpt-4o-mini');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">🚀</span>
                          <span>GPT-4o Mini</span>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('GPT-3.5 Turbo selected');
                            setSelectedModel('gpt-3.5-turbo');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">⚡</span>
                          <span>GPT-3.5 Turbo</span>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Gemini 1.5 Flash selected');
                            setSelectedModel('gemini-1.5-flash');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">🌟</span>
                          <span>Gemini 1.5 Flash</span>
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Gemini 1.5 Pro selected');
                            setSelectedModel('gemini-1.5-pro');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">💎</span>
                          <span>Gemini 1.5 Pro</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('DeepSeek Chat selected');
                            setSelectedModel('deepseek-chat');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">🔥</span>
                          <span>DeepSeek Chat</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Grok selected');
                            setSelectedModel('grok');
                            setIsModelSelectorOpen(false);
                          }}
                          className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center gap-2 focus:outline-none focus:ring-0"
                        >
                          <span className="text-sm">🤖</span>
                          <span>Grok (xAI)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </button>
                </div>
                  
                  {/* Nút điều khiển và Status indicator */}
                  <div className="flex items-center gap-3">
                    {/* Status indicator đơn giản */}
                    <div className="flex items-center gap-2">
                      {ollamaStatus === 'checking' && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" title="Đang kiểm tra..."></div>
                      )}
                      {ollamaStatus === 'available' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full" title="Sẵn sàng"></div>
                  )}
                  {ollamaStatus === 'unavailable' && (
                        <div className="w-2 h-2 bg-red-400 rounded-full" title="Không khả dụng"></div>
                      )}
                    </div>
                    
                    {/* Action Buttons - Minimize và Close */}
                    <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1.5 rounded transition-all duration-200 hover:scale-105 active:scale-95"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                        {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={toggleChat}
                        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1.5 rounded transition-all duration-200 hover:scale-105 active:scale-95"
                  title="Close"
                >
                        <X size={14} />
                </button>
              </div>
            </div>
                </div>
              </div>
            )}

            {!isMinimized && (
              <>
                {/* Chat Area - Height phù hợp để không bị che phần trên cùng */}
                <div className="h-[450px] overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth" ref={chatAreaRef}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300'
                            : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-600 transition-all duration-300'
                        }`}
                      >
                        <div className="flex items-start gap-1.5">
                          {message.type === 'ai' && (
                            <Bot size={12} className="mt-0 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                          )}
                          <div className="min-w-0 flex-1 break-words">
                            <div 
                              className="text-sm leading-tight prose prose-sm dark:prose-invert max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: message.type === 'ai' 
                                  ? message.content
                                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>')
                                      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700 dark:text-gray-300">$1</em>')
                                      .replace(/## (.*?)$/gm, '<h3 class="text-sm font-bold text-gray-800 dark:text-gray-200 mt-2 mb-0.5">$1</h3>')
                                      .replace(/### (.*?)$/gm, '<h4 class="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1.5 mb-0.5">$1</h4>')
                                      .replace(/^(\d+)\./gm, '<span class="inline-block w-4 text-blue-600 dark:text-blue-400 font-bold">$1.</span>')
                                      .replace(/^•/gm, '<span class="inline-block w-2.5 text-green-600 dark:text-green-400">•</span>')
                                      .replace(/\n/g, '<br>')
                                  : message.content
                              }}
                            />
                            <p className="text-xs opacity-70 mt-1 text-right">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading Indicator với height nhỏ gọn */}
                  {isLoading && (
                    <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg shadow-md max-w-[80%] hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-1.5">
                          <Bot size={12} className="text-blue-600 dark:text-blue-400" />
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {ollamaStatus === 'available' ? 'Đang xử lý...' : 'Đang chuẩn bị...'}
                            </span>
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area - Nằm dưới chat area, không che nội dung */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="relative">
                    {/* Input field với background riêng biệt */}
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập câu hỏi của bạn..."
                      className="w-full px-4 py-3 pr-6 sm:pr-20 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none min-h-[48px] max-h-[120px] overflow-y-auto shadow-xl"
                      disabled={isLoading}
                      rows={1}
                      style={{
                        height: 'auto',
                        minHeight: '48px',
                        maxHeight: '120px'
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                      }}
                    />
                    
                    {/* Character counter nhỏ gọn - BÊN TRONG input field */}
                    <div className="absolute bottom-3 right-8 sm:right-16 text-xs text-gray-500 dark:text-gray-400 pointer-events-none font-medium">
                      {inputValue.length}/1000
                    </div>
                    
                    {/* Nút gửi nằm BÊN TRONG input field - góc phải dưới */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="absolute bottom-2 right-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full hover:shadow-lg disabled:shadow-none transition-all duration-300 hover:scale-110 active:scale-95 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center z-10"
                      style={{
                        width: isMobile ? '16px' : '32px',
                        height: isMobile ? '16px' : '32px',
                        minWidth: isMobile ? '16px' : '32px',
                        minHeight: isMobile ? '16px' : '32px',
                        maxWidth: isMobile ? '16px' : '32px',
                        maxHeight: isMobile ? '16px' : '32px'
                      }}
                      title="Gửi tin nhắn"
                    >
                      <span 
                        className="font-bold"
                        style={{
                          fontSize: isMobile ? '10px' : '16px'
                        }}
                      >
                        ↑
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
