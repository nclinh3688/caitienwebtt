import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { question, context, model = 'gpt-3.5-turbo', maxTokens = 150, temperature = 0.7 } = await request.json();

    // Create context-aware system prompt
    const systemPrompt = createSystemPrompt(context);
    
    // Create user message with context
    const userMessage = createUserMessage(question, context);

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: maxTokens,
      temperature: temperature,
    });

    const response = completion.choices[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời câu hỏi này.';

    return NextResponse.json({
      content: response,
      confidence: 0.9,
      model: model,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

function createSystemPrompt(context: any): string {
  const { pageType, userLevel = 'N5' } = context;
  
  const basePrompt = `Bạn là một AI Assistant chuyên gia dạy tiếng Nhật cho người Việt Nam. 
Bạn đang hỗ trợ học viên học ${userLevel} tiếng Nhật.

Hướng dẫn:
1. Trả lời bằng tiếng Việt
2. Giải thích rõ ràng, dễ hiểu
3. Đưa ra ví dụ cụ thể
4. Chỉ ra lỗi thường gặp
5. Đưa ra mẹo học tập hữu ích
6. Luôn khuyến khích và động viên học viên

`;

  switch (pageType) {
    case 'vocabulary':
      return basePrompt + `
Chuyên môn: Từ vựng tiếng Nhật
- Giải thích ý nghĩa từ vựng
- Tạo câu ví dụ sử dụng từ
- Đưa ra từ đồng nghĩa/trái nghĩa
- Mẹo ghi nhớ từ vựng
- Cách phát âm chính xác
- Ngữ cảnh sử dụng phù hợp
`;
    
    case 'grammar':
      return basePrompt + `
Chuyên môn: Ngữ pháp tiếng Nhật
- Giải thích cấu trúc ngữ pháp
- So sánh với ngữ pháp tương tự
- Chỉ ra lỗi thường gặp
- Tạo câu ví dụ đa dạng
- Cách sử dụng trong thực tế
- Lưu ý quan trọng khi học
`;
    
    case 'kanji':
      return basePrompt + `
Chuyên môn: Kanji tiếng Nhật
- Giải thích ý nghĩa kanji
- Cách đọc Onyomi và Kunyomi
- Bộ thủ và cấu trúc kanji
- Thứ tự nét viết
- Tạo câu chuyện ghi nhớ
- Ví dụ từ ghép với kanji
`;
    
    default:
      return basePrompt;
  }
}

function createUserMessage(question: string, context: any): string {
  const { currentItem, category } = context;
  
  let contextInfo = '';
  
  if (currentItem) {
    if (context.pageType === 'vocabulary') {
      contextInfo = `
Thông tin từ vựng hiện tại:
- Từ: ${currentItem.japanese || 'N/A'}
- Nghĩa: ${currentItem.meaning || 'N/A'}
- Phát âm: ${currentItem.pronunciation || 'N/A'}
- Ví dụ: ${currentItem.example || 'N/A'}
`;
    } else if (context.pageType === 'grammar') {
      contextInfo = `
Thông tin ngữ pháp hiện tại:
- Pattern: ${currentItem.pattern || 'N/A'}
- Nghĩa: ${currentItem.meaning || 'N/A'}
- Cách dùng: ${currentItem.usage || 'N/A'}
`;
    } else if (context.pageType === 'kanji') {
      contextInfo = `
Thông tin kanji hiện tại:
- Kanji: ${currentItem.character || 'N/A'}
- Nghĩa: ${currentItem.meaning || 'N/A'}
- Onyomi: ${currentItem.onyomi || 'N/A'}
- Kunyomi: ${currentItem.kunyomi || 'N/A'}
- Số nét: ${currentItem.strokeCount || 'N/A'}
`;
    }
  }
  
  return `Câu hỏi của học viên: ${question}

${contextInfo}

Chủ đề: ${category || 'N/A'}

Hãy trả lời câu hỏi một cách chi tiết và hữu ích.`;
}
