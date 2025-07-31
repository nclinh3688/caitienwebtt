# 🌍 Multi-Language Learning Platform

Một nền tảng học ngôn ngữ hiện đại được xây dựng với Next.js, hỗ trợ nhiều ngôn ngữ khác nhau với hệ thống cấp bậc hoàn chỉnh.

## ✨ Tính năng chính

### 🎯 Hệ thống khóa học hoàn chỉnh
- **5 ngôn ngữ**: Tiếng Nhật, Tiếng Anh, Tiếng Trung, Tiếng Hàn, Tiếng Việt
- **Cấp độ theo chuẩn quốc tế**: 
  - 🇯🇵 **Tiếng Nhật**: N5 → N4 → N3 → N2 → N1 (JLPT)
  - 🇬🇧 **Tiếng Anh**: A1 → A2 → B1 → B2 → C1 → C2 (CEFR)
  - 🇨🇳 **Tiếng Trung**: HSK1 → HSK2 → HSK3 → HSK4 → HSK5 → HSK6
  - 🇰🇷 **Tiếng Hàn**: Level 1 → Level 2 → Level 3 → Level 4 → Level 5 → Level 6 (TOPIK)
  - 🇻🇳 **Tiếng Việt**: A1 → A2 → B1 → B2 → C1 → C2 (CEFR)

### 📚 Nội dung học tập
- **800+ bài học** được tạo tự động với nội dung phù hợp từng cấp độ
- **Hệ thống theo dõi tiến độ** với progress bar trực quan
- **Navigation thông minh** giữa các bài học
- **Responsive design** hoạt động tốt trên mọi thiết bị

### 🛠️ Công nghệ sử dụng
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: SQLite với Prisma ORM
- **UI Components**: Custom components với shadcn/ui design system
- **Authentication**: NextAuth.js (sẵn sàng tích hợp)

## 🚀 Bắt đầu

### Cài đặt dependencies
```bash
npm install
```

### Khởi tạo database
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Seed dữ liệu khóa học
```bash
node scripts/seed.js
```

### Chạy development server
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📁 Cấu trúc project

```
src/
├── app/                    # Next.js App Router
│   ├── courses/           # Hệ thống khóa học
│   │   ├── page.tsx      # Danh sách ngôn ngữ
│   │   └── [language]/   # Dynamic routing cho từng ngôn ngữ
│   │       ├── page.tsx  # Danh sách cấp độ
│   │       └── [level]/  # Dynamic routing cho từng cấp độ
│   │           ├── page.tsx           # Danh sách bài học
│   │           └── lessons/[id]/     # Chi tiết bài học
│   ├── dashboard/         # Dashboard người dùng
│   ├── profile/          # Trang profile
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── data/                 # Static data
│   └── courses.json      # Cấu hình khóa học
├── lib/                  # Utilities
│   ├── prisma.ts        # Database connection
│   └── utils.ts         # Helper functions
└── types/               # TypeScript types
```

## 🎯 Các bước tiếp theo

### Đã hoàn thành ✅
- [x] Hệ thống cấp bậc khóa học theo chuẩn quốc tế
- [x] Database schema hoàn chỉnh với Prisma
- [x] Seed script tự động tạo 800+ bài học
- [x] Responsive UI với progress tracking
- [x] Dynamic routing cho tất cả ngôn ngữ và cấp độ

### Đang phát triển 🚧
- [ ] Hệ thống theo dõi tiến độ người dùng (UserProgress)
- [ ] Authentication và profile management
- [ ] Tính năng luyện tập (flashcards, quiz, listening)
- [ ] Improved UI/UX và animations

### Kế hoạch tương lai 📋
- [ ] AI-powered content generation
- [ ] Video lessons integration
- [ ] Social learning features
- [ ] Mobile app với React Native
- [ ] Real-time pronunciation scoring

## 🌟 Highlight Features

### 1. Hệ thống cấp bậc thông minh
Mỗi ngôn ngữ có hệ thống cấp độ riêng phù hợp với tiêu chuẩn quốc tế:
- **Progression logic**: Từ cơ bản đến nâng cao
- **Adaptive content**: Nội dung phù hợp với từng level
- **Visual indicators**: Màu sắc và badges phân biệt độ khó

### 2. Database-driven Content
- **Dynamic content loading** từ database
- **Scalable architecture** dễ mở rộng
- **Consistent data structure** across all languages

### 3. Modern UX/UI
- **Gradient progress bars** với animation smooth
- **Card-based design** dễ nhìn và tương tác
- **Responsive grid system** cho mọi screen size

## 📊 Thống kê dự án

- **5** ngôn ngữ được hỗ trợ
- **29** cấp độ khóa học (tổng cộng)
- **800+** bài học được tạo tự động
- **100%** responsive design
- **TypeScript** để đảm bảo type safety

## 🤝 Đóng góp

Dự án này đang trong giai đoạn phát triển. Mọi đóng góp và feedback đều được hoan nghênh!

## 📝 License

MIT License - xem file LICENSE để biết thêm chi tiết.
