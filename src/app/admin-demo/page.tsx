'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaBook, 
  FaUsers, 
  FaChartBar, 
  FaPlus, 
  FaEdit, 
  FaEye,
  FaUpload,
  FaDownload,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaFire,
  FaTrophy,
  FaRocket,
  FaCrown
} from 'react-icons/fa';

export default function AdminDemoPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCrown className="text-yellow-600" />
            Admin Dashboard Demo
          </h1>
          <p className="text-gray-600 mt-1">
            Demo hoàn chỉnh hệ thống quản lý PHÚC KHIÊM EDU
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket />
            Khởi chạy
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaDownload />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Tổng bài học</p>
                <p className="text-3xl font-bold text-blue-700">156</p>
                <p className="text-xs text-blue-600 mt-1">
                  142 đã xuất bản, 14 bản nháp
                </p>
              </div>
              <div className="text-blue-500 text-3xl">📚</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Tổng khóa học</p>
                <p className="text-3xl font-bold text-green-700">12</p>
                <p className="text-xs text-green-600 mt-1">
                  Đang hoạt động
                </p>
              </div>
              <div className="text-green-500 text-3xl">🎓</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Tổng người dùng</p>
                <p className="text-3xl font-bold text-purple-700">2,847</p>
                <p className="text-xs text-purple-600 mt-1">
                  1,893 đang hoạt động
                </p>
              </div>
              <div className="text-purple-500 text-3xl">👥</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Tình trạng hệ thống</p>
                <div className="flex items-center gap-2 mt-2">
                  <FaCheckCircle className="text-green-500" />
                  <span className="text-lg font-bold text-green-600">Xuất sắc</span>
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  Tất cả dịch vụ OK
                </p>
              </div>
              <div className="text-green-500 text-3xl">✅</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaFire className="text-orange-600" />
            Hành động nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
              onClick={() => window.open('/admin/lessons/create', '_blank')}
            >
              <FaBook className="text-2xl text-blue-600" />
              <span className="text-sm font-medium">Tạo bài học</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-green-50 hover:border-green-300 transition-all"
              onClick={() => window.open('/admin/lessons', '_blank')}
            >
              <FaEdit className="text-2xl text-green-600" />
              <span className="text-sm font-medium">Quản lý bài học</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-purple-50 hover:border-purple-300 transition-all"
              onClick={() => window.open('/admin/users', '_blank')}
            >
              <FaUsers className="text-2xl text-purple-600" />
              <span className="text-sm font-medium">Quản lý người dùng</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-orange-50 hover:border-orange-300 transition-all"
              onClick={() => window.open('/analytics-demo', '_blank')}
            >
              <FaChartBar className="text-2xl text-orange-600" />
              <span className="text-sm font-medium">Xem phân tích</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy className="text-yellow-600" />
            Trạng thái hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">✅</div>
              <h4 className="font-medium text-green-800">Database</h4>
              <p className="text-sm text-green-600">Hoạt động bình thường</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">✅</div>
              <h4 className="font-medium text-blue-800">API Services</h4>
              <p className="text-sm text-blue-600">Tất cả endpoints OK</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">✅</div>
              <h4 className="font-medium text-purple-800">File Storage</h4>
              <p className="text-sm text-purple-600">Upload/Download OK</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tính năng đã hoàn thành</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FaCheckCircle className="text-green-600" />
                Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Dashboard quản lý hoàn chỉnh với thống kê, hoạt động gần đây và trạng thái hệ thống
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                <span className="text-sm text-green-600">100%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FaCheckCircle className="text-green-600" />
                Lesson Creator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Công cụ tạo bài học hoàn chỉnh với 4 bước: thông tin cơ bản, nội dung, từ vựng & ngữ pháp, bài tập
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                <span className="text-sm text-green-600">100%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FaCheckCircle className="text-green-600" />
                Lessons Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Quản lý danh sách bài học với search, filter, sort và CRUD operations
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                <span className="text-sm text-green-600">100%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FaCheckCircle className="text-green-600" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Dashboard phân tích học tập với charts, notifications và insights
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
                <span className="text-sm text-green-600">100%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tính năng sắp tới</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FaClock className="text-blue-600" />
                AI Exercise Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                Tự động tạo bài tập từ nội dung bài học sử dụng AI
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 2</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FaClock className="text-blue-600" />
                Enhanced Gamification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                Hệ thống gamification nâng cao với leaderboards, achievements và study groups
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'features', label: 'Tính năng', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🎓</div>
              <h1 className="text-xl font-bold text-gray-900">PHÚC KHIÊM EDU Admin</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <FaDownload className="mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <FaRocket className="mr-2" />
                Launch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'features' && renderFeatures()}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 PHÚC KHIÊM EDU. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Hệ thống quản lý giáo dục thông minh với AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
