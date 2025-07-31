# Minna no Nihongo Template Structure

## 📚 Giới thiệu
Template này được thiết kế dựa trên cấu trúc chuẩn của giáo trình **Minna no Nihongo**, giúp bạn dễ dàng điền dữ liệu chi tiết cho từng bài học.

## 🏗️ Cấu trúc JSON Template

### 1. **Thông tin cơ bản**
```json
{
  "id": "B02",
  "title": "Bài 2: Tên bài học",
  "description": "Mô tả ngắn gọn về nội dung bài",
}
```

### 2. **Vocabulary (Từ vựng)**
```json
"vocabulary": [
  {
    "content": "これ",           // Từ bằng hiragana/katakana
    "kanji": "",              // Kanji (để trống nếu không có)
    "reading": "これ",        // Cách đọc
    "meaning": "cái này"      // Nghĩa tiếng Việt
  }
]
```

**Lưu ý:**
- Sắp xếp từ vựng theo thứ tự trong sách MNN
- Katakana words: kanji để trống
- Hiragana words có kanji: điền đầy đủ

### 3. **Grammar Patterns (Mẫu câu ngữ pháp)**
```json
"grammar_patterns": [
  {
    "pattern": "これ/それ/あれは～です",
    "meaning": "Cái này/đó/kia là ~",
    "explanation": "Dùng để chỉ và giới thiệu đồ vật",
    "examples": [
      "これはほんです。(Cái này là sách.)"
    ]
  }
]
```

### 4. **Conversation Examples (Hội thoại mẫu)**
```json
"conversation_examples": [
  {
    "title": "Giới thiệu đồ vật",
    "dialogue": [
      {"speaker": "A", "text": "これはなんですか。"},
      {"speaker": "B", "text": "それはほんです。"}
    ]
  }
]
```

### 5. **Cultural Notes (Ghi chú văn hóa)**
```json
"cultural_notes": [
  "Trong tiếng Nhật, việc phân biệt khoảng cách rất quan trọng"
]
```

### 6. **Exercises (Bài tập)**
```json
"exercises": {
  "exercise_a": {
    "title": "Luyện tập mẫu câu",
    "instructions": "Điền từ vào chỗ trống",
    "questions": [
      {
        "question": "____はほんです。",
        "answer": "これ",
        "explanation": "Chỉ đồ vật gần người nói"
      }
    ]
  }
}
```

### 7. **Kanji Introduced (Kanji được giới thiệu)**
```json
"kanji_introduced": [
  {
    "kanji": "本",
    "readings": ["ほん", "ボン"],
    "meaning": "sách, gốc",
    "examples": ["ほん（本）- sách"]
  }
]
```

## 📝 Hướng dẫn điền dữ liệu

### Bước 1: Chuẩn bị
1. Có sách Minna no Nihongo bên cạnh
2. Mở file template (B02.json, B03.json)
3. Kiểm tra lesson structure trong MNN

### Bước 2: Điền từ vựng
- **Theo đúng thứ tự** trong sách MNN
- Chú ý **phân biệt** hiragana/katakana/kanji
- **Dịch chính xác** sang tiếng Việt

### Bước 3: Điền ngữ pháp
- Copy **chính xác** pattern từ sách
- Giải thích **rõ ràng** cách sử dụng
- Ví dụ **đa dạng** và thực tế

### Bước 4: Điền hội thoại
- Sử dụng **từ vựng và ngữ pháp** đã học
- Tình huống **thực tế** và hữu ích
- **Cân bằng** độ khó

### Bước 5: Kiểm tra
- **Đối chiếu** với sách gốc
- **Test** với UI hiện tại
- **Đảm bảo** format JSON đúng

## 🎯 Các bài học cần hoàn thiện

### ✅ Đã hoàn thành:
- **B01**: Tự giới thiệu (PUBLISHED)

### 🔄 Cần điền dữ liệu:
- **B02**: Đồ vật, địa điểm (TEMPLATE_READY)
- **B03**: Địa điểm, số đếm (TEMPLATE_READY)

### 📋 Kế hoạch mở rộng:
- B04-B25: Các bài tiếp theo N5
- N4: Tổng cộng 25 bài
- N3: Tổng cộng 25 bài

## 🚀 Tích hợp với UI

Template đã được tích hợp sẵn với:
- `/src/app/courses/japanese/n5/[lessonId]/page.tsx`
- Hiển thị từ vựng, ngữ pháp, kanji
- Audio integration ready
- Exercise system ready

## 📞 Hỗ trợ

Khi điền dữ liệu:
1. **Tuân thủ** cấu trúc template
2. **Đối chiếu** với sách gốc MNN
3. **Test** trên UI trước khi submit
4. **Báo lỗi** nếu có vấn đề với format

---

**Lưu ý quan trọng**: Template này đảm bảo tương thích 100% với giáo trình Minna no Nihongo chính thức. Vui lòng điền dữ liệu chính xác theo sách để đảm bảo chất lượng học tập tốt nhất.