export default function TestHeaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-32">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          🧪 Test Header Layout
        </h1>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Header Layout Test
          </h2>
          
          <div className="text-left space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">✅ Expected Layout:</h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Logo ở bên trái</li>
                <li>• Navigation menu ngang ở giữa</li>
                <li>• User actions ở bên phải</li>
                <li>• Header cố định ở đầu trang</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">🎯 Current Status:</h3>
              <ul className="text-green-800 space-y-1">
                <li>• Header component đã được sửa</li>
                <li>• CSS horizontal đã được thêm</li>
                <li>• Layout ngang đã được force</li>
                <li>• Responsive design hoạt động</li>
              </ul>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">📱 Responsive:</h3>
              <ul className="text-orange-800 space-y-1">
                <li>• Desktop: Menu ngang</li>
                <li>• Mobile: Hamburger menu</li>
                <li>• Tablet: Adaptive layout</li>
                <li>• Breakpoints: 768px, 1024px</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Desktop View</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Logo + Text hiển thị</p>
              <p>• Navigation menu ngang</p>
              <p>• All user actions visible</p>
              <p>• Hover effects active</p>
            </div>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Mobile View</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Logo + Text hiển thị</p>
              <p>• Hamburger menu button</p>
              <p>• Vertical mobile menu</p>
              <p>• Touch-friendly buttons</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-3">🚀 Test Instructions</h2>
          <ol className="text-left space-y-2 max-w-md mx-auto">
            <li>1. Kiểm tra header hiển thị ngang</li>
            <li>2. Test responsive bằng resize browser</li>
            <li>3. Test mobile view trong DevTools</li>
            <li>4. Kiểm tra dropdown menus</li>
            <li>5. Test hover effects</li>
          </ol>
        </div>
        
        <div className="mt-8 space-x-4">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Trang chủ
          </a>
          <a 
            href="/demo"
            className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Demo Page
          </a>
        </div>
      </div>
    </div>
  );
}
