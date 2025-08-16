export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-32">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          🎉 Header đã hoạt động!
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Giao diện Header đã được cải thiện hoàn toàn với thiết kế đẹp mắt và chuyên nghiệp.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="text-3xl mb-4">🎨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thiết kế đẹp mắt</h3>
            <p className="text-gray-600">Giao diện hiện đại với gradients và shadows</p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Responsive</h3>
            <p className="text-gray-600">Hoạt động tốt trên mọi thiết bị</p>
          </div>
          
          <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Animations</h3>
            <p className="text-gray-600">Chuyển động mượt mà với Framer Motion</p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">🚀 Tính năng chính</h2>
          <ul className="text-left space-y-2 max-w-md mx-auto">
            <li>✅ Logo gradient đẹp mắt</li>
            <li>✅ Navigation menu hiện đại</li>
            <li>✅ Dropdown animations</li>
            <li>✅ Mobile hamburger menu</li>
            <li>✅ User profile dropdown</li>
            <li>✅ Search, language, dark mode</li>
            <li>✅ Responsive design</li>
            <li>✅ Smooth transitions</li>
          </ul>
        </div>
        
        <div className="mt-12">
          <a 
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Quay về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
