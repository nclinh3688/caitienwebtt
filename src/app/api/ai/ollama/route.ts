import { NextRequest, NextResponse } from 'next/server';
import { multiModelService } from '@/services/MultiModelService';

// Từ điển từ vựng tiếng Nhật mở rộng
const JAPANESE_VOCAB: { [key: string]: string } = {
  // Chào hỏi cơ bản
  'xin chào': 'こんにちは (konnichiwa)',
  'cảm ơn': 'ありがとう (arigatou)',
  'tôi yêu bạn': '愛してる (aishiteru)',
  'chúc ngủ ngon': 'おやすみなさい (oyasuminasai)',
  'tạm biệt': 'さようなら (sayounara)',
  
  // Tính từ
  'quan trọng': '重要 (juuyou)',
  'quý báu': '貴重 (kichou)',
  'đẹp': '美しい (utsukushii)',
  'xấu': '醜い (minikui)',
  'tốt': '良い (yoi)',
  'lớn': '大きい (ookii)',
  'nhỏ': '小さい (chiisai)',
  'nhanh': '速い (hayai)',
  'chậm': '遅い (osoi)',
  'nóng': '熱い (atsui)',
  'lạnh': '冷たい (tsumetai)',
  'mới': '新しい (atarashii)',
  'cũ': '古い (furui)',
  'dễ': '易しい (yasashii)',
  'khó': '難しい (muzukashii)',
  
  // Động từ cơ bản
  'ăn': '食べる (taberu)',
  'uống': '飲む (nomu)',
  'ngủ': '寝る (neru)',
  'đi': '行く (iku)',
  'đến': '来る (kuru)',
  'làm': 'する (suru)',
  'nói': '話す (hanasu)',
  'nghe': '聞く (kiku)',
  'nhìn': '見る (miru)',
  'đọc': '読む (yomu)',
  'viết': '書く (kaku)',
  'học': '勉強する (benkyou suru)',
  'dạy': '教える (oshieru)',
  'mua': '買う (kau)',
  'bán': '売る (uru)',
  
  // Danh từ cơ bản
  'nước': '水 (mizu)',
  'cơm': 'ご飯 (gohan)',
  'sách': '本 (hon)',
  'nhà': '家 (ie)',
  'xe': '車 (kuruma)',
  'tiền': 'お金 (okane)',
  'thời gian': '時間 (jikan)',
  'người': '人 (hito)',
  'bạn': '友達 (tomodachi)',
  'gia đình': '家族 (kazoku)',
  
  // Phương tiện giao thông
  'máy bay': '飛行機 (hikouki)',
  'tàu hỏa': '電車 (densha)',
  'xe buýt': 'バス (basu)',
  'xe máy': 'バイク (baiku)',
  'tàu thủy': '船 (fune)',
  
  // Động vật
  'chó': '犬 (inu)',
  'mèo': '猫 (neko)',
  'chim': '鳥 (tori)',
  'cá': '魚 (sakana)',
  'bò': '牛 (ushi)',
  
  // Thực phẩm
  'bánh': 'パン (pan)',
  'sữa': '牛乳 (gyuunyuu)',
  'trứng': '卵 (tamago)',
  'thịt': '肉 (niku)',
  'rau': '野菜 (yasai)',
  
  // Màu sắc
  'đỏ': '赤 (aka)',
  'xanh': '青 (ao)',
  'vàng': '黄色 (kiiro)',
  'trắng': '白 (shiro)',
  'đen': '黒 (kuro)'
};

export async function POST(request: NextRequest) {
  try {
    const { message, context, model } = await request.json();
    
    console.log('🤖 Ollama API request:', { message, context, model });
    
    // Kiểm tra xem có phải câu hỏi về từ vựng tiếng Nhật không
    const isJapaneseVocabQuestion = message.includes('tiếng nhật') && 
                                   (message.includes('là gì') || message.includes('nghĩa là'));
    
    if (isJapaneseVocabQuestion) {
      // Tìm từ tiếng Việt trong câu hỏi
      let vietnameseWord = '';
      for (const [viet, japan] of Object.entries(JAPANESE_VOCAB)) {
        if (message.toLowerCase().includes(viet.toLowerCase())) {
          vietnameseWord = viet;
          break;
        }
      }
      
      if (vietnameseWord && JAPANESE_VOCAB[vietnameseWord]) {
        // Trả lời trực tiếp từ từ điển
        const response = `${vietnameseWord.charAt(0).toUpperCase() + vietnameseWord.slice(1)} trong tiếng Nhật là ${JAPANESE_VOCAB[vietnameseWord]}.`;
        
        console.log('📚 Vocabulary lookup response:', response);
        
        return NextResponse.json({
          success: true,
          response: response,
          model: model || 'qwen2:7b',
          source: 'vocabulary_dictionary'
        });
      }
    }
    
    // Nếu không phải câu hỏi từ vựng, sử dụng AI
    const systemPrompt = `Bạn là AI Assistant chuyên gia ngôn ngữ của PHÚC KHIÊM Education. 

**QUY TẮC TRẢ LỜI THÔNG MINH:**
- Trả lời ĐÚNG NGAY LẦN ĐẦU, không cần hỏi lại
- LUÔN tương tác với người dùng sau khi trả lời chính
- Hỏi người dùng muốn gì thêm

**FORMAT TƯƠNG TÁC:**
1. Trả lời chính xác câu hỏi của người dùng
2. Hỏi người dùng có muốn thêm gì không
3. Đưa ra các lựa chọn cụ thể

**VÍ DỤ TƯƠNG TÁC:**
- "Đây là 20 từ vựng N1 bạn cần. Bạn có muốn tôi lấy ví dụ câu cho từng từ không?"
- "Tôi đã chuẩn bị 20 từ vựng N1. Bạn muốn: 1) Chỉ xem từ vựng, 2) Có thêm ví dụ câu, 3) Có thêm audio đọc?"

**FORMAT TỪ VỰNG TIẾNG NHẬT:**
- Sử dụng format: "1. 漢字 (ひらがな) - Nghĩa tiếng Việt"
- KHÔNG có romaji, KHÔNG có phần mở đầu dài
- KHÔNG có bảng markdown phức tạp

**FORMAT NGỮ PHÁP:**
- Liệt kê đơn giản: "1. [Cấu trúc] - [Giải thích]"

**LUÔN NHỚ:** Tương tác thông minh, trả lời đúng ngay lần đầu, hỏi người dùng muốn gì thêm!`;

    // Nếu không phải câu hỏi từ vựng, sử dụng Multi-Model AI
    console.log('🚀 Using Multi-Model AI Service');
    
    try {
      const aiResponse = await multiModelService.chat(message, context);
      
      if (aiResponse.success) {
        console.log(`✅ AI Response from ${aiResponse.provider} (${aiResponse.model}): ${aiResponse.responseTime}ms`);
        
        return NextResponse.json({
          success: true,
          response: aiResponse.response,
          model: aiResponse.model,
          provider: aiResponse.provider,
          responseTime: aiResponse.responseTime,
          source: 'multi_model_ai'
        });
      } else {
        console.error('❌ All AI models failed:', aiResponse.error);
        
        return NextResponse.json({
          success: false,
          message: aiResponse.response,
          error: aiResponse.error
        }, { status: 500 });
      }
      
    } catch (error) {
      console.error('💥 Multi-Model AI error:', error);
      
      return NextResponse.json({
        success: false,
        message: 'Không thể kết nối với bất kỳ AI model nào. Vui lòng thử lại sau.',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('💥 Ollama API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Không thể kết nối với Ollama. Vui lòng kiểm tra Ollama đã chạy chưa.'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Test connection với timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('http://127.0.0.1:11434/api/tags', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        return NextResponse.json({
          success: false,
          message: 'Ollama không khả dụng'
        });
      }

      const data = await response.json();
      return NextResponse.json({
        success: true,
        models: data.models,
        message: 'Ollama kết nối thành công'
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json({
          success: false,
          message: 'Ollama connection timeout'
        }, { status: 408 });
      }
      
      throw fetchError;
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Không thể kết nối với Ollama'
    }, { status: 500 });
  }
}
