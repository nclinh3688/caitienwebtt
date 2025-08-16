# 🎓 Content Management Tool - PHÚC KHIÊM EDU

## 📋 Tổng quan

**Content Management Tool** là hệ thống quản lý nội dung hoàn chỉnh cho PHÚC KHIÊM EDU, cho phép admin tạo, quản lý và xuất bản bài học một cách dễ dàng và chuyên nghiệp.

## ✨ Tính năng chính

### 🏠 **Admin Dashboard**
- **Thống kê tổng quan**: Tổng bài học, khóa học, người dùng, hoạt động gần đây
- **Trạng thái hệ thống**: Database, API Services, File Storage
- **Hành động nhanh**: Tạo bài học, quản lý người dùng, xem phân tích
- **Responsive design**: Hoạt động tốt trên mọi thiết bị

### 📚 **Lesson Creator**
- **4 bước tạo bài học**:
  1. **Thông tin cơ bản**: Tiêu đề, mô tả, ngôn ngữ, cấp độ, danh mục, độ khó
  2. **Nội dung**: Rich text editor với hỗ trợ media (hình ảnh, audio, video)
  3. **Từ vựng & Ngữ pháp**: Quản lý từ vựng và điểm ngữ pháp
  4. **Bài tập**: Tạo nhiều loại bài tập khác nhau
- **Preview mode**: Xem trước bài học trước khi xuất bản
- **Auto-save**: Tự động lưu bản nháp
- **Media upload**: Hỗ trợ upload hình ảnh, audio, video

### 🔍 **Lessons Management**
- **Search & Filter**: Tìm kiếm theo tiêu đề, mô tả, tags
- **Advanced filtering**: Lọc theo ngôn ngữ, cấp độ, danh mục, trạng thái
- **Sorting**: Sắp xếp theo ngày tạo, cập nhật, tiêu đề, lượt xem, đánh giá
- **CRUD operations**: Tạo, đọc, cập nhật, xóa bài học
- **Bulk operations**: Import/Export CSV, bulk actions
- **Status management**: Draft, Published, Archived

### 🎨 **UI/UX Features**
- **Modern design**: Sử dụng Shadcn/ui components
- **Responsive**: Mobile-first approach
- **Dark/Light mode**: Hỗ trợ theme switching
- **Accessibility**: WCAG 2.1 compliant
- **Internationalization**: Hỗ trợ đa ngôn ngữ

## 🚀 Cách sử dụng

### **1. Truy cập Admin Dashboard**
```
URL: /admin
```
- Đăng nhập với quyền admin
- Xem tổng quan hệ thống
- Truy cập các tính năng quản lý

### **2. Tạo bài học mới**
```
URL: /admin/lessons/create
```
**Bước 1: Thông tin cơ bản**
- Nhập tiêu đề bài học
- Chọn ngôn ngữ (Tiếng Nhật, Trung, Anh, Hàn, Việt)
- Chọn cấp độ (N5, N4, N3, N2, N1, HSK1, HSK2, Basic)
- Chọn danh mục (Từ vựng, Ngữ pháp, Luyện nghe, Đọc hiểu, Luyện nói, Luyện viết)
- Chọn độ khó (Cơ bản, Trung cấp, Nâng cao)
- Nhập mô tả và thời lượng
- Thêm tags

**Bước 2: Nội dung**
- Sử dụng rich text editor
- Thêm hình ảnh, audio, video
- Hỗ trợ định dạng văn bản

**Bước 3: Từ vựng & Ngữ pháp**
- Thêm từ vựng với phát âm, nghĩa, ví dụ
- Thêm điểm ngữ pháp với giải thích và ví dụ

**Bước 4: Bài tập**
- Tạo bài tập trắc nghiệm
- Tạo bài tập điền từ
- Tạo bài tập dịch
- Tạo bài tập nối từ

### **3. Quản lý bài học**
```
URL: /admin/lessons
```
- Xem danh sách tất cả bài học
- Sử dụng bộ lọc nâng cao
- Tìm kiếm theo từ khóa
- Sắp xếp theo tiêu chí
- Chỉnh sửa, xóa bài học

### **4. Demo System**
```
URL: /admin-demo
```
- Xem demo hoàn chỉnh hệ thống
- Test các tính năng
- Xem roadmap phát triển

## 🛠️ Công nghệ sử dụng

### **Frontend**
- **Next.js 14**: React framework với App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI components
- **React Icons**: Icon library

### **Backend**
- **Next.js API Routes**: Server-side API endpoints
- **Prisma**: Database ORM
- **NextAuth.js**: Authentication system

### **Database**
- **PostgreSQL**: Primary database
- **Redis**: Caching và session storage

### **Deployment**
- **Vercel**: Hosting platform
- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── admin/                    # Admin routes
│   │   ├── layout.tsx           # Admin layout
│   │   ├── page.tsx             # Admin dashboard
│   │   └── lessons/             # Lessons management
│   │       ├── page.tsx         # Lessons list
│   │       └── create/          # Lesson creator
│   │           └── page.tsx     # Create lesson form
│   └── admin-demo/              # Admin demo page
│       └── page.tsx             # Demo interface
├── components/
│   ├── ui/                      # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   └── progress.tsx
│   └── dashboard/               # Dashboard components
│       ├── AnalyticsDashboard.tsx
│       ├── AnalyticsCharts.tsx
│       └── AnalyticsNotifications.tsx
└── lib/
    ├── prisma.ts                # Database client
    └── auth.ts                  # Authentication config
```

## 🔧 Cài đặt và chạy

### **1. Clone repository**
```bash
git clone https://github.com/your-username/phuckhiem-edu.git
cd phuckhiem-edu
```

### **2. Cài đặt dependencies**
```bash
npm install
```

### **3. Cấu hình environment**
```bash
cp .env.example .env.local
```
Chỉnh sửa `.env.local` với thông tin database và API keys.

### **4. Chạy development server**
```bash
npm run dev
```

### **5. Build production**
```bash
npm run build
npm start
```

## 📊 API Endpoints

### **Admin APIs**
```
GET    /api/admin/dashboard      # Dashboard statistics
GET    /api/admin/lessons        # List lessons
POST   /api/admin/lessons        # Create lesson
PUT    /api/admin/lessons/:id    # Update lesson
DELETE /api/admin/lessons/:id    # Delete lesson
GET    /api/admin/users          # List users
POST   /api/admin/users          # Create user
```

### **Content APIs**
```
GET    /api/lessons              # Public lessons
GET    /api/lessons/:id          # Lesson details
GET    /api/courses              # Course list
GET    /api/courses/:id          # Course details
```

## 🎯 Roadmap phát triển

### **Phase 1: Content Management Tool ✅ HOÀN THÀNH**
- [x] Admin Dashboard
- [x] Lesson Creator
- [x] Lessons Management
- [x] Basic CRUD operations
- [x] Search & Filter
- [x] Media upload support

### **Phase 2: AI Exercise Generator 🚧 ĐANG PHÁT TRIỂN**
- [ ] AI-powered exercise generation
- [ ] Multiple exercise types
- [ ] Difficulty adjustment
- [ ] Content analysis
- [ ] Quality validation

### **Phase 3: Enhanced Gamification 📋 KẾ HOẠCH**
- [ ] Advanced achievement system
- [ ] Study groups
- [ ] Competition features
- [ ] Reward system
- [ ] Social interactions

### **Phase 4: Advanced AI Tutor 📋 KẾ HOẠCH**
- [ ] Voice recognition
- [ ] Personalized learning paths
- [ ] Real-time feedback
- [ ] Adaptive content
- [ ] Multi-language support

## 🧪 Testing

### **Unit Tests**
```bash
npm run test
```

### **Integration Tests**
```bash
npm run test:integration
```

### **E2E Tests**
```bash
npm run test:e2e
```

### **Build Test**
```bash
npm run build
```

## 📈 Performance

### **Bundle Size**
- **Admin Dashboard**: 2.73 kB
- **Lessons Management**: 3.99 kB
- **Lesson Creator**: 4.89 kB
- **Admin Demo**: 2.65 kB

### **Loading Time**
- **First Load JS**: ~200 kB
- **Page Load**: < 2s
- **API Response**: < 500ms

### **Optimization**
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Caching**: Redis + browser caching
- **CDN**: Global content delivery

## 🔒 Bảo mật

### **Authentication**
- **NextAuth.js**: Secure authentication
- **JWT Tokens**: Stateless authentication
- **Role-based Access**: Admin, Teacher, Student roles

### **Authorization**
- **API Protection**: Route guards
- **Input Validation**: Zod schema validation
- **SQL Injection**: Prisma ORM protection
- **XSS Protection**: Content sanitization

### **Data Privacy**
- **GDPR Compliance**: Data protection
- **Encryption**: Data at rest and in transit
- **Audit Logs**: User activity tracking

## 🚀 Deployment

### **Production Build**
```bash
npm run build
npm start
```

### **Environment Variables**
```bash
# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Authentication
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-domain.com

# AI Services
OPENAI_API_KEY=your-key
GEMINI_API_KEY=your-key
```

### **Docker Deployment**
```bash
docker build -t phuckhiem-edu .
docker run -p 3000:3000 phuckhiem-edu
```

## 📞 Hỗ trợ

### **Documentation**
- **API Docs**: `/api/docs`
- **Component Library**: Storybook
- **Design System**: Figma

### **Contact**
- **Email**: support@phuckhiem.edu
- **Discord**: PHÚC KHIÊM EDU Community
- **GitHub**: Issues & Discussions

## 📝 Changelog

### **v1.0.0 (2024-01-XX)**
- ✨ Initial release
- 🎯 Complete Content Management Tool
- 🏠 Admin Dashboard
- 📚 Lesson Creator
- 🔍 Lessons Management
- 🎨 Modern UI/UX design

### **v0.9.0 (2024-01-XX)**
- 🚧 Beta testing
- 🔧 Bug fixes
- 📱 Mobile optimization

### **v0.8.0 (2024-01-XX)**
- 🚧 Development phase
- 🏗️ Core architecture
- 🎨 UI components

## 🏆 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết.

### **Cách đóng góp**
1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Dự án này được cấp phép theo [MIT License](LICENSE).

---

**🎓 PHÚC KHIÊM EDU - Hệ thống quản lý giáo dục thông minh với AI**

*Được phát triển với ❤️ bởi đội ngũ PHÚC KHIÊM EDU*
