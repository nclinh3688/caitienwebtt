# 🚀 HƯỚNG DẪN TÍCH HỢP OLLAMA VỚI AI ASSISTANT

## **📋 Yêu cầu hệ thống:**

- **macOS**: 10.15+ (Catalina)
- **RAM**: Tối thiểu 4GB (khuyến nghị 8GB+)
- **Storage**: 2GB trống cho model
- **Ollama**: Version 0.11.6+ (đã cài đặt ✅)

## **🔧 Cài đặt Ollama:**

### **1. Cài đặt Ollama:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### **2. Khởi động Ollama:**
```bash
ollama serve
```

### **3. Pull model phù hợp:**
```bash
# Model nhẹ, nhanh (khuyến nghị cho MacBook Air)
ollama pull qwen2:0.5b

# Hoặc model đa ngôn ngữ tốt hơn
ollama pull mistral:7b

# Model chuyên tiếng Nhật
ollama pull qwen2.5:3b
```

## **🎯 Model được khuyến nghị:**

| Model | Size | RAM | Tốc độ | Độ chính xác | Đa ngôn ngữ |
|-------|------|-----|--------|--------------|-------------|
| `qwen2:0.5b` | 0.5B | 1-2GB | ⚡⚡⚡ | ⭐⭐ | ⭐⭐⭐ |
| `llama3.2:3b` | 3B | 2-3GB | ⚡⚡ | ⭐⭐⭐ | ⭐⭐⭐ |
| `mistral:7b` | 7B | 4-5GB | ⚡ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| `qwen2.5:3b` | 3B | 2-3GB | ⚡⚡ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## **🚀 Sử dụng AI Assistant:**

### **1. Khởi động Ollama:**
```bash
# Terminal 1: Khởi động Ollama service
ollama serve

# Terminal 2: Test model
ollama run qwen2:0.5b "Xin chào, bạn có thể giúp tôi học tiếng Nhật không?"
```

### **2. Mở AI Assistant:**
- Click vào nút tròn màu xanh-tím (góc phải dưới)
- Kiểm tra trạng thái Ollama:
  - 🟡 **Checking**: Đang kiểm tra kết nối
  - 🟢 **Available**: Ollama hoạt động + tên model
  - 🔴 **Offline**: Ollama không khả dụng

### **3. Chat với AI:**
```
User: "Giải thích cách sử dụng は (wa) trong tiếng Nhật"
AI: "Trợ từ は (wa) được sử dụng để đánh dấu chủ ngữ trong câu..."
```

## **⚙️ Cấu hình nâng cao:**

### **1. Tùy chỉnh model:**
```bash
# Tạo model tùy chỉnh
ollama create japanese-tutor -f Modelfile

# Modelfile nội dung:
FROM qwen2:0.5b
SYSTEM "Bạn là AI tutor chuyên dạy tiếng Nhật..."
```

### **2. Tối ưu hiệu suất:**
```bash
# Sử dụng GPU (nếu có)
OLLAMA_HOST=0.0.0.0:11434 ollama serve

# Giới hạn RAM
OLLAMA_GPU_LAYERS=0 ollama serve
```

### **3. Model switching:**
```typescript
// Trong OllamaService.ts
const getOptimalModel = (language: string) => {
  switch(language) {
    case 'japanese': return 'qwen2.5:3b';
    case 'chinese': return 'qwen2.5:3b';
    case 'english': return 'llama3.2:3b';
    default: return 'mistral:7b';
  }
};
```

## **🔍 Troubleshooting:**

### **1. Ollama không khả dụng:**
```bash
# Kiểm tra service
ps aux | grep ollama

# Khởi động lại
ollama serve

# Kiểm tra port
lsof -i :11434
```

### **2. Model không load:**
```bash
# Xóa model cũ
ollama rm qwen2:0.5b

# Pull lại
ollama pull qwen2:0.5b

# Kiểm tra models
ollama list
```

### **3. RAM không đủ:**
```bash
# Sử dụng model nhẹ hơn
ollama pull qwen2:0.5b

# Hoặc giới hạn RAM
OLLAMA_GPU_LAYERS=0 ollama serve
```

## **📊 Monitoring:**

### **1. Kiểm tra hiệu suất:**
```bash
# Xem thông tin model
ollama show qwen2:0.5b

# Kiểm tra RAM usage
top -pid $(pgrep ollama)
```

### **2. Logs:**
```bash
# Xem logs
tail -f ~/.ollama/logs/ollama.log

# Debug mode
OLLAMA_DEBUG=1 ollama serve
```

## **🎯 Lợi ích của Ollama:**

- ✅ **Offline hoạt động**: Không cần internet
- ✅ **Bảo mật**: Dữ liệu không gửi ra ngoài
- ✅ **Hiệu suất cao**: Chạy trực tiếp trên MacBook Air
- ✅ **Miễn phí**: Không tốn phí API calls
- ✅ **Tùy chỉnh**: Có thể fine-tune cho học ngoại ngữ
- ✅ **Đa ngôn ngữ**: Hỗ trợ 5 ngôn ngữ chính

## **🚀 Roadmap:**

### **Phase 1: ✅ Hoàn thành**
- [x] Tích hợp Ollama cơ bản
- [x] Streaming responses
- [x] Context-aware prompts
- [x] Fallback system

### **Phase 2: 🔄 Đang phát triển**
- [ ] Model switching tự động
- [ ] Memory system
- [ ] Voice input/output
- [ ] Multi-language support

### **Phase 3: 📋 Kế hoạch**
- [ ] Fine-tuned models cho từng ngôn ngữ
- [ ] Advanced grammar checking
- [ ] Pronunciation guide
- [ ] Learning progress tracking

---

**🎉 Chúc mừng! AI Assistant của bạn đã sẵn sàng hoạt động với Ollama!**
