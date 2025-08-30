# 🤖 HƯỚNG DẪN SETUP AI ASSISTANT

## **📋 Tổng quan**
Website đã được tích hợp AI Assistant với nhiều provider khác nhau:
- **OpenAI GPT-4** (Khuyến nghị - chất lượng cao nhất)
- **Anthropic Claude** (Chất lượng cao, phù hợp giáo dục)
- **xAI Grok** (Elon Musk's AI - Hài hước, trực tiếp, real-time)
- **Google Gemini** (Thay thế tốt)
- **Local AI** (Fallback - không cần API key)

## **🔑 Setup API Keys**

### **1. Tạo file .env.local**
```bash
# Tạo file environment variables
touch .env.local
```

### **2. Thêm API Keys vào .env.local**
```env
# AI API Keys
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GROK_API_KEY=your_grok_api_key_here

# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Other configurations
NODE_ENV=development
```

## **🔧 Cách lấy API Keys**

### **OpenAI API Key**
1. Truy cập: https://platform.openai.com/
2. Đăng ký/Đăng nhập
3. Vào "API Keys" → "Create new secret key"
4. Copy key và paste vào `OPENAI_API_KEY`

### **Google Gemini API Key**
1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập Google
3. Click "Create API Key"
4. Copy key và paste vào `GEMINI_API_KEY`

### **Anthropic Claude API Key**
1. Truy cập: https://console.anthropic.com/
2. Đăng ký/Đăng nhập
3. Vào "API Keys" → "Create Key"
4. Copy key và paste vào `ANTHROPIC_API_KEY`

### **xAI Grok API Key** (Coming Soon)
1. Truy cập: https://x.ai/ (khi API được release)
2. Đăng ký/Đăng nhập với X (Twitter) account
3. Vào "API" → "Create API Key"
4. Copy key và paste vào `GROK_API_KEY`
5. **Lưu ý**: Hiện tại Grok API chưa public, đang dùng simulation

## **🚀 Cách hoạt động**

### **Fallback Strategy**
AI Assistant sẽ thử các provider theo thứ tự:
1. **OpenAI** → Nếu lỗi
2. **Claude** → Nếu lỗi  
3. **Grok** → Nếu lỗi (simulation hiện tại)
4. **Gemini** → Nếu lỗi
5. **Local AI** → Luôn hoạt động (fallback)

### **Context-Aware Responses**
AI sẽ hiểu context của trang:
- **Vocabulary**: Giải thích từ vựng, ví dụ, mẹo ghi nhớ
- **Grammar**: Cấu trúc ngữ pháp, lỗi thường gặp
- **Kanji**: Ý nghĩa, cách đọc, bộ thủ, thứ tự nét

## **💡 Tính năng AI**

### **1. AI Chat Widget**
- **Icon mới**: Brain icon với badge "AI"
- **Tooltip**: "AI Assistant - Hỏi gì cũng được!"
- **Context-aware**: Hiểu nội dung trang hiện tại
- **Suggested questions**: Gợi ý câu hỏi phù hợp

### **2. AI Practice Generator**
- **Dynamic questions**: Tạo câu hỏi dựa trên nội dung
- **Multiple types**: Trắc nghiệm, điền từ, ghép cặp
- **Adaptive learning**: Điều chỉnh độ khó

### **3. Smart Responses**
- **Vietnamese language**: Trả lời bằng tiếng Việt
- **Educational focus**: Tập trung vào giảng dạy
- **Encouraging tone**: Khuyến khích học viên
- **Grok style**: Hài hước, trực tiếp, real-time aware

## **🔍 Test AI**

### **1. Start development server**
```bash
yarn dev
```

### **2. Test các trang**
- `/courses/japanese/n5/vocabulary` - Test từ vựng
- `/courses/japanese/n5/grammar` - Test ngữ pháp  
- `/courses/japanese/n5/kanji` - Test kanji

### **3. Test AI Chat**
- Click vào icon AI (Brain icon)
- Hỏi các câu như:
  - "Giải thích từ này"
  - "Cho ví dụ sử dụng"
  - "Mẹo ghi nhớ"
  - "Lỗi thường gặp"

## **💰 Chi phí API**

### **OpenAI**
- GPT-4: ~$0.03/1K tokens
- GPT-3.5: ~$0.002/1K tokens

### **Google Gemini**
- Gemini Pro: Miễn phí (có giới hạn)
- Gemini Pro Vision: Miễn phí

### **Anthropic Claude**
- Claude 3 Sonnet: ~$0.003/1K tokens
- Claude 3 Haiku: ~$0.00025/1K tokens

### **xAI Grok** (Coming Soon)
- Grok Beta: Miễn phí (với giới hạn)
- Grok Pro: ~$0.01/1K tokens (dự đoán)

## **🛠️ Troubleshooting**

### **Lỗi API Key**
```
Error: Failed to get AI response
```
**Giải pháp:**
1. Kiểm tra API key trong `.env.local`
2. Đảm bảo key có credit/quota
3. Kiểm tra internet connection

### **Lỗi Rate Limit**
```
Error: Rate limit exceeded
```
**Giải pháp:**
1. Đợi vài phút
2. Upgrade plan API
3. Sử dụng provider khác

### **Local AI Fallback**
Nếu tất cả API đều lỗi, hệ thống sẽ dùng Local AI với:
- Smart template responses
- Context-aware answers
- Vietnamese language support

## **🎯 Tối ưu hóa**

### **Performance**
- **Caching**: Cache responses để giảm API calls
- **Debouncing**: Tránh spam requests
- **Error handling**: Graceful fallback

### **Cost Optimization**
- **Token limits**: Giới hạn max tokens
- **Model selection**: Dùng model rẻ hơn khi cần
- **Batch requests**: Gộp nhiều câu hỏi

### **User Experience**
- **Loading states**: Hiển thị "AI đang suy nghĩ..."
- **Error messages**: Thông báo lỗi thân thiện
- **Suggestions**: Gợi ý câu hỏi tiếp theo

## **🔮 Tương lai**

### **Planned Features**
- **Voice input**: Nhận diện giọng nói
- **Image analysis**: Phân tích hình ảnh kanji
- **Personalization**: Học từ user behavior
- **Offline mode**: Local AI models

### **Integration Ideas**
- **Duolingo API**: Import progress
- **Anki integration**: Sync flashcards
- **YouTube API**: Video lessons
- **Spotify API**: Japanese music

---

**🎉 Chúc mừng! AI Assistant đã sẵn sàng!**
