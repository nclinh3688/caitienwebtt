# 🚀 HƯỚNG DẪN DEPLOY LÊN NETLIFY - TỪNG BƯỚC

## 📋 CHUẨN BỊ TRƯỚC KHI DEPLOY

### ✅ Kiểm tra dự án
- [x] Build thành công: `npm run build`
- [x] Có file `netlify.toml`
- [x] Có file `package.json`
- [x] Có file `.gitignore`

## 🌐 BƯỚC 1: TRUY CẬP NETLIFY

1. **Mở trình duyệt** và truy cập: [https://netlify.com](https://netlify.com)
2. **Đăng nhập/Đăng ký** tài khoản
3. **Click "New site from Git"**

## 🔗 BƯỚC 2: KẾT NỐI GITHUB

1. **Chọn GitHub** làm Git provider
2. **Chọn repository** `caitienwebtt`
3. **Authorize Netlify** truy cập GitHub

## ⚙️ BƯỚC 3: CẤU HÌNH BUILD

### Build settings:
- **Base directory:** (để trống)
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### Environment variables:
- **NODE_VERSION:** `18`
- **NPM_VERSION:** `9`

## 🚀 BƯỚC 4: DEPLOY

1. **Click "Deploy site"**
2. **Chờ build hoàn thành** (5-10 phút)
3. **Kiểm tra kết quả**

## 🔧 BƯỚC 5: CẤU HÌNH SAU DEPLOY

### Custom domain (tùy chọn):
1. **Site settings** → **Domain management**
2. **Add custom domain**
3. **Configure DNS**

### Environment variables:
1. **Site settings** → **Environment variables**
2. **Add variables** nếu cần

## 📱 BƯỚC 6: KIỂM TRA WEBSITE

1. **Mở URL** được cung cấp
2. **Test các trang chính:**
   - Home page: `/`
   - Advanced Dashboard: `/dashboard/advanced`
   - Testing Dashboard: `/test-advanced-dashboard`

## 🎯 TÍNH NĂNG ĐÃ DEPLOY

### ✅ Core Features:
- [x] Advanced Dashboard
- [x] AI Insights System
- [x] Study Schedule Management
- [x] Achievements System
- [x] Performance Monitor
- [x] Testing Dashboard

### ✅ API Endpoints:
- [x] AI Insights API
- [x] Schedule API
- [x] Achievements API
- [x] Public Testing APIs

### ✅ Database:
- [x] SQLite Database
- [x] Prisma ORM
- [x] Sample Data Seeding

## 🚨 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi Build:
- **Kiểm tra Node.js version** (cần 18+)
- **Kiểm tra dependencies** (`npm install`)
- **Kiểm tra TypeScript errors**

### Lỗi Runtime:
- **Kiểm tra environment variables**
- **Kiểm tra database connection**
- **Kiểm tra API endpoints**

## 📞 HỖ TRỢ

Nếu gặp vấn đề:
1. **Kiểm tra build logs** trong Netlify
2. **Kiểm tra console errors** trong browser
3. **Kiểm tra network requests**

## 🎉 CHÚC MỪNG!

Sau khi deploy thành công, website của bạn sẽ có:
- **URL:** `https://[random-name].netlify.app`
- **HTTPS:** Tự động
- **CDN:** Global distribution
- **Analytics:** Built-in
- **Forms:** Built-in

---

**Lưu ý:** Đây là hướng dẫn deploy qua Netlify Dashboard. Nếu bạn muốn deploy qua CLI, hãy cho tôi biết để tôi hướng dẫn cách khắc phục quyền truy cập.
