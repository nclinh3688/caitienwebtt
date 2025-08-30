import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, context } = await request.json();

    // Simulate local AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Use smart template responses based on context
    const response = generateLocalResponse(question, context);

    return NextResponse.json({
      content: response,
      confidence: 0.8,
      model: 'local-ai',
      note: 'This is a local fallback response. Consider setting up a real AI API for better responses.',
    });
  } catch (error) {
    console.error('Local AI error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}

function generateLocalResponse(question: string, context: any): string {
  const { pageType, currentItem, userLevel = 'N5' } = context;
  
  // Analyze question keywords
  const questionLower = question.toLowerCase();
  
  // Vocabulary responses
  if (pageType === 'vocabulary') {
    if (questionLower.includes('nghĩa') || questionLower.includes('meaning')) {
      return `Từ "${currentItem?.japanese || 'này'}" có nghĩa là "${currentItem?.meaning || '...'}" trong tiếng Việt. Đây là một từ rất quan trọng trong ${userLevel} mà bạn cần ghi nhớ.`;
    }
    
    if (questionLower.includes('phát âm') || questionLower.includes('đọc')) {
      return `Cách phát âm của từ "${currentItem?.japanese || 'này'}" là "${currentItem?.pronunciation || '...'}". Hãy luyện tập phát âm nhiều lần để quen thuộc.`;
    }
    
    if (questionLower.includes('ví dụ') || questionLower.includes('example')) {
      return `Ví dụ sử dụng từ "${currentItem?.japanese || 'này'}": "${currentItem?.example || 'Tôi sẽ tạo ví dụ cho bạn.'}" Hãy thử tạo thêm câu ví dụ khác để luyện tập.`;
    }
    
    if (questionLower.includes('mẹo') || questionLower.includes('tip')) {
      return `Mẹo ghi nhớ từ "${currentItem?.japanese || 'này'}": Hãy liên tưởng đến hình ảnh hoặc âm thanh tương tự. Bạn cũng có thể tạo câu chuyện ngắn để ghi nhớ.`;
    }
  }
  
  // Grammar responses
  if (pageType === 'grammar') {
    if (questionLower.includes('cấu trúc') || questionLower.includes('pattern')) {
      return `Cấu trúc ngữ pháp này là: "${currentItem?.pattern || 'Danh từ + は + Tính từ/Động từ'}". Hãy chú ý thứ tự các thành phần trong câu.`;
    }
    
    if (questionLower.includes('cách dùng') || questionLower.includes('usage')) {
      return `Cách dùng: ${currentItem?.usage || 'Ngữ pháp này dùng để biểu đạt ý nghĩa cụ thể.'} Hãy luyện tập với nhiều ví dụ khác nhau.`;
    }
    
    if (questionLower.includes('lỗi') || questionLower.includes('mistake')) {
      return `Lỗi thường gặp khi học ngữ pháp này: Đừng quên particle は, hãy chú ý thứ tự từ trong câu, và đảm bảo động từ được chia đúng thì.`;
    }
  }
  
  // Kanji responses
  if (pageType === 'kanji') {
    if (questionLower.includes('nghĩa') || questionLower.includes('meaning')) {
      return `Kanji "${currentItem?.character || 'này'}" có nghĩa là "${currentItem?.meaning || '...'}". Đây là một kanji cơ bản trong ${userLevel}.`;
    }
    
    if (questionLower.includes('đọc') || questionLower.includes('reading')) {
      return `Cách đọc kanji "${currentItem?.character || 'này'}": Onyomi "${currentItem?.onyomi || '...'}", Kunyomi "${currentItem?.kunyomi || '...'}". Hãy luyện tập cả hai cách đọc.`;
    }
    
    if (questionLower.includes('nét') || questionLower.includes('stroke')) {
      return `Kanji "${currentItem?.character || 'này'}" có ${currentItem?.strokeCount || '2'} nét. Thứ tự viết: từ trên xuống dưới, từ trái sang phải. Hãy luyện viết nhiều lần.`;
    }
    
    if (questionLower.includes('bộ thủ') || questionLower.includes('radical')) {
      return `Bộ thủ của kanji "${currentItem?.character || 'này'}": ${currentItem?.radicals?.join(', ') || 'Tôi sẽ giải thích bộ thủ cho bạn.'} Hiểu bộ thủ giúp ghi nhớ kanji dễ dàng hơn.`;
    }
  }
  
  // General responses
  if (questionLower.includes('khó') || questionLower.includes('hard')) {
    return `Đừng lo lắng! Học tiếng Nhật cần thời gian và kiên nhẫn. Hãy chia nhỏ bài học và luyện tập từng bước một. Bạn đang làm rất tốt!`;
  }
  
  if (questionLower.includes('mẹo') || questionLower.includes('tip')) {
    return `Mẹo học tập: Hãy luyện tập mỗi ngày, sử dụng flashcard, xem anime/phim Nhật, và đừng sợ mắc lỗi. Mỗi lỗi là một cơ hội học hỏi!`;
  }
  
  if (questionLower.includes('luyện tập') || questionLower.includes('practice')) {
    return `Để luyện tập hiệu quả: Viết lại nhiều lần, tạo câu ví dụ, sử dụng trong cuộc sống hàng ngày, và tham gia các bài kiểm tra định kỳ.`;
  }
  
  // Default response
  return `Cảm ơn câu hỏi của bạn! Đây là một chủ đề thú vị trong ${userLevel}. Hãy tiếp tục học tập và đừng ngại hỏi thêm nếu cần giải thích chi tiết hơn.`;
}
