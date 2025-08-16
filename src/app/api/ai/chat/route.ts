import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { message, language, context, previousMessages } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build conversation context
    const conversationHistory = previousMessages?.slice(-3)?.map((msg: any) => 
      `${msg.type === 'user' ? 'Học viên' : 'AI'}: ${msg.content}`
    ).join('\n') || '';

    // Enhanced AI prompt for language learning
    const systemPrompt = `Bạn là AI Assistant chuyên nghiệp của PHÚC KHIÊM EDU - trung tâm học ngoại ngữ hàng đầu.

🎯 NHIỆM VỤ:
- Hỗ trợ học viên học 5 ngôn ngữ: Tiếng Nhật, Trung, Anh, Hàn, Việt
- Trả lời câu hỏi về ngữ pháp, từ vựng, phát âm, văn hóa
- Đưa ra lời khuyên học tập hiệu quả và động lực
- Tạo môi trường học tập tích cực

📚 CHUYÊN MÔN:
- Tiếng Nhật: N5-N1, Keigo, Kanji, Bunpou
- Tiếng Trung: HSK 1-6, Pinyin, Hanzi, Văn hóa
- Tiếng Anh: Grammar, Vocabulary, IELTS, TOEIC
- Tiếng Hàn: TOPIK, Hangul, K-culture
- Tiếng Việt: Dành cho người nước ngoài

💡 PHONG CÁCH:
- Thân thiện, nhiệt tình, khuyến khích
- Giải thích rõ ràng với ví dụ cụ thể
- Sử dụng emoji phù hợp
- Gợi ý bài tập thực hành

${language ? `\n🔍 NGÔN NGỮ FOCUS: ${language}` : ''}
${conversationHistory ? `\n📝 LỊCH SỬ HỘI THOẠI:\n${conversationHistory}` : ''}

HỌC VIÊN HỎI: "${message}"

HÃY TRỢ GIÚP HỌC VIÊN:`;

    // Call AI service (Google Gemini)
    const aiResponse = await generateAIResponse(systemPrompt, message, language);

    // Enhanced response with metadata
    const response = {
      response: aiResponse,
      detectedLanguage: detectLanguage(message),
      topic: detectTopic(message),
      suggestions: generateSuggestions(message, language),
      timestamp: new Date().toISOString()
    };

    // Log for analytics (optional) - Already optimized ✅

    return NextResponse.json(response);

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('AI Chat Error:', error);
    }
    return NextResponse.json({ 
      error: 'Internal server error',
      response: '❌ Xin lỗi, hệ thống AI tạm thời gặp sự cố. Hãy thử lại sau vài phút hoặc liên hệ support để được hỗ trợ nhanh nhất! 🙏'
    }, { status: 500 });
  }
}

async function generateAIResponse(prompt: string, message: string, language?: string): Promise<string> {
  try {
    // Use Google Gemini API (replace with your actual implementation)
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GOOGLE_AI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 
           generateFallbackResponse(message, language);

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Gemini API Error:', error);
    return generateFallbackResponse(message, language);
  }
}

function generateFallbackResponse(message: string, language?: string): string {
  // Smart fallback responses based on keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('ngữ pháp') || lowerMessage.includes('grammar')) {
    return `📚 Câu hỏi về ngữ pháp rất hay! 

Để trả lời chính xác, tôi cần AI service hoạt động ổn định. Trong thời gian chờ đợi:

✨ **Gợi ý học ngữ pháp hiệu quả:**
1. **Học theo context** - đặt trong câu cụ thể
2. **Thực hành daily** - 15 phút mỗi ngày  
3. **Xem ví dụ thực tế** - từ anime, drama, news
4. **Làm bài tập** - consolidate kiến thức

💡 Hãy thử lại sau vài phút hoặc post câu hỏi lên forum để cộng đồng hỗ trợ nhé! 🤝`;
  }

  if (lowerMessage.includes('từ vựng') || lowerMessage.includes('vocabulary')) {
    return `📖 Học từ vựng là nền tảng quan trọng!

🎯 **Phương pháp học từ vựng hiệu quả:**
1. **Flashcard** - Anki, Quizlet 
2. **Spaced repetition** - ôn lại theo chu kỳ
3. **Học theo chủ đề** - nhóm từ liên quan
4. **Sử dụng trong câu** - practice context

📱 **Tools hữu ích:**
- Jisho (tiếng Nhật)
- Pleco (tiếng Trung) 
- Cambridge Dictionary (tiếng Anh)

Bạn đang học ngôn ngữ nào? Tôi sẽ gợi ý cụ thể hơn! 😊`;
  }

  if (lowerMessage.includes('phát âm') || lowerMessage.includes('pronunciation')) {
    return `🎤 Phát âm chuẩn là chìa khóa giao tiếp!

🗣️ **Tips luyện phát âm:**
1. **Nghe nhiều** - podcast, music, drama
2. **Shadow technique** - nói theo audio
3. **Record voice** - so sánh với native
4. **IPA learning** - hiểu ký hiệu phiên âm

🏆 **Practice tools:**
- Forvo (pronunciation dictionary)
- Google Translate (voice feature)
- PHÚC KHIÊM EDU pronunciation trainer

Keep practicing! Perfect pronunciation takes time! 💪`;
  }

  return `🤖 Cảm ơn bạn đã sử dụng AI Assistant!

AI service đang được bảo trì để phục vụ bạn tốt hơn. Trong thời gian này:

🔍 **Có thể tìm câu trả lời tại:**
- 📚 Thư viện bài học PHÚC KHIÊM EDU
- 💬 Diễn đàn cộng đồng 
- 👨‍🏫 Hỏi trực tiếp giáo viên
- 📖 FAQ section

Hệ thống sẽ sớm hoạt động trở lại. Cảm ơn sự kiên nhẫn! 🙏

*Powered by PHÚC KHIÊM EDU* ✨`;
}

function detectLanguage(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('nhật') || lowerMessage.includes('japanese') || 
      lowerMessage.includes('kanji') || lowerMessage.includes('hiragana')) {
    return 'japanese';
  }
  if (lowerMessage.includes('trung') || lowerMessage.includes('chinese') || 
      lowerMessage.includes('hsk') || lowerMessage.includes('pinyin')) {
    return 'chinese';
  }
  if (lowerMessage.includes('anh') || lowerMessage.includes('english') || 
      lowerMessage.includes('ielts') || lowerMessage.includes('toeic')) {
    return 'english';
  }
  if (lowerMessage.includes('hàn') || lowerMessage.includes('korean') || 
      lowerMessage.includes('topik') || lowerMessage.includes('hangul')) {
    return 'korean';
  }
  if (lowerMessage.includes('việt') || lowerMessage.includes('vietnamese')) {
    return 'vietnamese';
  }
  
  return 'general';
}

function detectTopic(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('ngữ pháp') || lowerMessage.includes('grammar')) return 'grammar';
  if (lowerMessage.includes('từ vựng') || lowerMessage.includes('vocabulary')) return 'vocabulary';
  if (lowerMessage.includes('phát âm') || lowerMessage.includes('pronunciation')) return 'pronunciation';
  if (lowerMessage.includes('kanji') || lowerMessage.includes('hán tự')) return 'writing';
  if (lowerMessage.includes('văn hóa') || lowerMessage.includes('culture')) return 'culture';
  if (lowerMessage.includes('phương pháp') || lowerMessage.includes('method')) return 'study-method';
  
  return 'general';
}

function generateSuggestions(message: string, language?: string): string[] {
  const topic = detectTopic(message);
  
  const suggestions: { [key: string]: string[] } = {
    grammar: [
      "Ví dụ cụ thể về cách sử dụng",
      "Bài tập thực hành ngữ pháp này",
      "Ngữ pháp tương tự khó phân biệt"
    ],
    vocabulary: [
      "Từ đồng nghĩa và trái nghĩa", 
      "Cách nhớ từ vựng hiệu quả",
      "Collocations với từ này"
    ],
    pronunciation: [
      "Audio phát âm chuẩn",
      "Luyện tập với tongue twisters",
      "So sánh phát âm với ngôn ngữ khác"
    ]
  };
  
  return suggestions[topic] || [
    "Câu hỏi liên quan khác",
    "Tips học tập hiệu quả", 
    "Resources bổ sung"
  ];
}