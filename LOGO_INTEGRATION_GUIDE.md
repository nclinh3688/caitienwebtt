# 🎨 HƯỚNG DẪN TÍCH HỢP LOGO PHÚC KHIÊM

## 📁 CÁCH THÊM LOGO VÀO DỰ ÁN

### **1. Tạo thư mục logo:**
```bash
mkdir -p public/images/logo
```

### **2. Thêm file logo vào:**
```
public/images/logo/
├── phuc-khiem-logo.png      # Logo chính (PNG)
├── phuc-khiem-logo.svg      # Logo vector (SVG) - khuyến nghị
├── phuc-khiem-favicon.ico   # Favicon
└── phuc-khiem-logo-white.png # Logo trắng cho dark mode
```

### **3. Cập nhật Logo component:**
Thay thế placeholder trong `src/components/ui/Logo.tsx`:

```tsx
// Thay thế phần placeholder này:
<div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center shadow-lg">
  {/* Lighthouse + Pen design inspired by logo */}
  <div className="relative w-6 h-6">
    // ... placeholder design
  </div>
</div>

// Bằng logo thật:
<Image
  src="/images/logo/phuc-khiem-logo.svg"
  alt="PHÚC KHIÊM Education"
  width={40}
  height={40}
  className="w-full h-full object-contain"
/>
```

### **4. Cập nhật favicon:**
Thêm vào `src/app/layout.tsx`:
```tsx
export const metadata = {
  icons: {
    icon: '/images/logo/phuc-khiem-favicon.ico',
    apple: '/images/logo/phuc-khiem-logo.png',
  },
}
```

## 🎨 COLOR PALETTE ĐÃ ĐƯỢC TÍCH HỢP

### **Primary Colors (Dark Blue từ Logo):**
- `primary-600`: #2563eb (Main)
- `primary-700`: #1d4ed8
- `primary-800`: #1e40af

### **Accent Colors (Orange từ Logo):**
- `accent-600`: #ea580c (Main)
- `accent-500`: #f97316
- `accent-400`: #fb923c

### **Secondary Colors (Light Blue từ Logo):**
- `secondary-600`: #0284c7
- `secondary-500`: #0ea5e9
- `secondary-400`: #38bdf8

## 🚀 CÁCH SỬ DỤNG

### **1. Trong Header:**
```tsx
import { LogoLink } from '@/components/ui/Logo';

<LogoLink size="md" className="text-white" />
```

### **2. Trong Footer:**
```tsx
import { Logo } from '@/components/ui/Logo';

<Logo size="lg" showText={true} />
```

### **3. Trong Email templates:**
```tsx
<Logo size="sm" showText={false} />
```

## 📱 RESPONSIVE DESIGN

Logo component tự động responsive:
- **Mobile**: Chỉ hiển thị icon
- **Tablet**: Icon + text ngắn
- **Desktop**: Icon + full text

## 🎯 KẾT QUẢ

Sau khi thêm logo:
- ✅ Brand identity nhất quán
- ✅ Professional appearance
- ✅ Responsive design
- ✅ Color palette phù hợp
- ✅ Scalable vector graphics

## 📋 CHECKLIST

- [ ] Tạo thư mục `public/images/logo/`
- [ ] Thêm logo files (PNG, SVG, ICO)
- [ ] Cập nhật Logo component
- [ ] Test trên mobile/desktop
- [ ] Kiểm tra favicon
- [ ] Verify color consistency

**Bạn chỉ cần thêm logo files vào thư mục và cập nhật component!** 🎨 