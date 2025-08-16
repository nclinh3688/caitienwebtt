#!/bin/bash

# 🚀 NETLIFY DEPLOYMENT SCRIPT - TỰ ĐỘNG
# Tác giả: AI Assistant
# Ngày tạo: $(date)

echo "🚀 === NETLIFY DEPLOYMENT SCRIPT ==="
echo "📅 Thời gian: $(date)"
echo ""

# Kiểm tra Node.js
echo "🔍 Kiểm tra Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js chưa được cài đặt!"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

# Kiểm tra npm
echo "🔍 Kiểm tra npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm chưa được cài đặt!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm version: $NPM_VERSION"

# Kiểm tra Git
echo "🔍 Kiểm tra Git..."
if ! command -v git &> /dev/null; then
    echo "❌ Git chưa được cài đặt!"
    exit 1
fi

GIT_VERSION=$(git --version)
echo "✅ Git: $GIT_VERSION"

# Kiểm tra repository
echo "🔍 Kiểm tra Git repository..."
if [ ! -d ".git" ]; then
    echo "❌ Không phải Git repository!"
    exit 1
fi

REPO_URL=$(git remote get-url origin 2>/dev/null || echo "Local repository")
echo "✅ Repository: $REPO_URL"

# Cleanup
echo "🧹 Dọn dẹp build files..."
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "📦 Cài đặt dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generate Prisma client..."
npx prisma generate

# Build project
echo "🔨 Build dự án..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build thành công!"
else
    echo "❌ Build thất bại!"
    exit 1
fi

# Kiểm tra build output
echo "🔍 Kiểm tra build output..."
if [ -d ".next" ]; then
    echo "✅ Build output tồn tại"
    echo "📁 Build size: $(du -sh .next | cut -f1)"
else
    echo "❌ Build output không tồn tại!"
    exit 1
fi

# Tạo deployment package
echo "📦 Tạo deployment package..."
DEPLOY_DIR="deploy-$(date +%Y%m%d-%H%M%S)"
mkdir -p $DEPLOY_DIR

# Copy necessary files
cp -r .next $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp netlify.toml $DEPLOY_DIR/
cp next.config.mjs $DEPLOY_DIR/

echo "✅ Deployment package đã tạo: $DEPLOY_DIR"

# Tạo deployment instructions
cat > $DEPLOY_DIR/DEPLOYMENT-INSTRUCTIONS.md << 'EOF'
# 🚀 HƯỚNG DẪN DEPLOY NETLIFY

## 📋 CÁC BƯỚC DEPLOY:

### 1. Truy cập Netlify
- Mở: https://netlify.com
- Đăng nhập/Đăng ký

### 2. Tạo site mới
- Click "New site from Git"
- Chọn GitHub
- Chọn repository: caitienwebtt

### 3. Cấu hình build
- Build command: `npm run build`
- Publish directory: `.next`
- Base directory: (để trống)

### 4. Deploy
- Click "Deploy site"
- Chờ build hoàn thành

## ⚠️ LƯU Ý QUAN TRỌNG:

### Environment Variables (nếu cần):
- NODE_VERSION: 18
- NPM_VERSION: 9

### Build Settings:
- Node.js version: 18.x
- Build timeout: 30 minutes

## 🔧 SAU KHI DEPLOY:

1. Kiểm tra website hoạt động
2. Test các trang chính
3. Kiểm tra API endpoints
4. Cấu hình custom domain (tùy chọn)

## 📞 HỖ TRỢ:

Nếu gặp vấn đề:
- Kiểm tra build logs
- Kiểm tra console errors
- Kiểm tra network requests

---
**Deployment package được tạo tự động bởi AI Assistant**
**Thời gian: $(date)**
EOF

echo "✅ Deployment instructions đã tạo"

# Tạo quick deploy script
cat > $DEPLOY_DIR/quick-deploy.sh << 'EOF'
#!/bin/bash

# 🚀 QUICK DEPLOY SCRIPT
echo "🚀 === QUICK DEPLOY NETLIFY ==="

# Kiểm tra netlify-cli
if ! command -v netlify &> /dev/null; then
    echo "📦 Cài đặt netlify-cli..."
    npm install -g netlify-cli
fi

# Deploy
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=.next

echo "✅ Deployment hoàn thành!"
echo "🌐 Kiểm tra website tại URL được cung cấp"
EOF

chmod +x $DEPLOY_DIR/quick-deploy.sh

echo "✅ Quick deploy script đã tạo"

# Tạo summary
echo ""
echo "🎉 === DEPLOYMENT PACKAGE HOÀN THÀNH ==="
echo "📁 Package location: $DEPLOY_DIR"
echo "📋 Instructions: $DEPLOY_DIR/DEPLOYMENT-INSTRUCTIONS.md"
echo "🚀 Quick deploy: $DEPLOY_DIR/quick-deploy.sh"
echo ""
echo "📋 CÁC BƯỚC TIẾP THEO:"
echo "1. 📤 Upload package lên GitHub (nếu cần)"
echo "2. 🌐 Truy cập netlify.com"
echo "3. 🔗 Kết nối GitHub repository"
echo "4. ⚙️ Cấu hình build settings"
echo "5. 🚀 Deploy!"
echo ""
echo "💡 TIP: Sử dụng file DEPLOYMENT-INSTRUCTIONS.md để hướng dẫn chi tiết"
echo ""

# Kiểm tra netlify-cli
if command -v netlify &> /dev/null; then
    echo "🔍 Netlify CLI đã được cài đặt"
    echo "💡 Bạn có thể sử dụng: netlify deploy --prod --dir=.next"
else
    echo "⚠️ Netlify CLI chưa được cài đặt"
    echo "💡 Cài đặt: npm install -g netlify-cli"
fi

echo ""
echo "🎯 === DEPLOYMENT READY! ==="
echo "🚀 Dự án Advanced Dashboard đã sẵn sàng deploy!"
echo "📱 Tính năng: AI Insights, Study Schedule, Achievements, Performance Monitor"
echo "🗄️ Database: SQLite + Prisma ORM"
echo "🔧 Build: Next.js 14 + TypeScript"
echo ""
echo "🌟 Chúc bạn deploy thành công!"
