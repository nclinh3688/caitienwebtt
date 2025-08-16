'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaRobot, 
  FaLightbulb, 
  FaCog, 
  FaPlay, 
  FaStop, 
  FaSave, 
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaStar,
  FaBrain,
  FaMagic,
  FaRocket,
  FaGraduationCap,
  FaBook,
  FaPuzzlePiece,
  FaQuestionCircle,
  FaClipboardList,
  FaCrown,
  FaClock
} from 'react-icons/fa';

export default function AIExerciseDemoPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCrown className="text-yellow-600" />
            AI Exercise Generator Demo
          </h1>
          <p className="text-gray-600 mt-1">
            Demo hệ thống AI tự động tạo bài tập thông minh
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket />
            Khởi chạy AI
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaDownload />
            Export
          </Button>
        </div>
      </div>

      {/* AI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Bài tập đã tạo</p>
                <p className="text-3xl font-bold text-blue-700">1,247</p>
                <p className="text-xs text-blue-600 mt-1">
                  Trong 30 ngày qua
                </p>
              </div>
              <div className="text-blue-500 text-3xl">🧩</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Chất lượng trung bình</p>
                <p className="text-3xl font-bold text-green-700">94.2%</p>
                <p className="text-xs text-green-600 mt-1">
                  AI Score
                </p>
              </div>
              <div className="text-green-500 text-3xl">⭐</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Ngôn ngữ hỗ trợ</p>
                <p className="text-3xl font-bold text-purple-700">5</p>
                <p className="text-xs text-purple-600 mt-1">
                  Tiếng Nhật, Trung, Anh, Hàn, Việt
                </p>
              </div>
              <div className="text-purple-500 text-3xl">🌍</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Thời gian tạo</p>
                <p className="text-3xl font-bold text-orange-700">2.3s</p>
                <p className="text-xs text-orange-600 mt-1">
                  Trung bình mỗi bài tập
                </p>
              </div>
              <div className="text-orange-500 text-3xl">⚡</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMagic className="text-purple-600" />
            Tính năng AI nổi bật
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl text-blue-600">🧠</div>
                <div>
                  <h4 className="font-medium text-gray-900">Content Analysis</h4>
                  <p className="text-sm text-gray-600">
                    AI tự động phân tích nội dung bài học, trích xuất từ vựng, ngữ pháp và chủ đề
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-green-600">🎯</div>
                <div>
                  <h4 className="font-medium text-gray-900">Smart Generation</h4>
                  <p className="text-sm text-gray-600">
                    Tạo bài tập thông minh dựa trên độ khó, loại bài tập và ngôn ngữ
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-purple-600">🔍</div>
                <div>
                  <h4 className="font-medium text-gray-900">Quality Control</h4>
                  <p className="text-sm text-gray-600">
                    Kiểm soát chất lượng tự động với AI scoring và validation
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl text-orange-600">📚</div>
                <div>
                  <h4 className="font-medium text-gray-900">Multiple Types</h4>
                  <p className="text-sm text-gray-600">
                    Hỗ trợ 5 loại bài tập: trắc nghiệm, điền từ, dịch, nối từ, sắp xếp câu
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-red-600">⚡</div>
                <div>
                  <h4 className="font-medium text-gray-900">Fast Processing</h4>
                  <p className="text-sm text-gray-600">
                    Tạo 10 bài tập trong vòng 20 giây với AI optimization
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-indigo-600">🎨</div>
                <div>
                  <h4 className="font-medium text-gray-900">Customizable</h4>
                  <p className="text-sm text-gray-600">
                    Tùy chỉnh độ khó, số lượng và loại bài tập theo nhu cầu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRocket className="text-orange-600" />
            Hành động nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
              onClick={() => window.open('/ai-exercise-demo/generate', '_blank')}
            >
              <FaMagic className="text-2xl text-blue-600" />
              <span className="text-sm font-medium">Tạo bài tập</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-green-50 hover:border-green-300 transition-all"
              onClick={() => window.open('/ai-exercise-demo/templates', '_blank')}
            >
              <FaClipboardList className="text-2xl text-green-600" />
              <span className="text-sm font-medium">Mẫu bài tập</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-purple-50 hover:border-purple-300 transition-all"
              onClick={() => window.open('/ai-exercise-demo/analytics', '_blank')}
            >
              <FaBrain className="text-2xl text-purple-600" />
              <span className="text-sm font-medium">Phân tích AI</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-orange-50 hover:border-orange-300 transition-all"
              onClick={() => window.open('/ai-exercise-demo/settings', '_blank')}
            >
              <FaCog className="text-2xl text-orange-600" />
              <span className="text-sm font-medium">Cài đặt AI</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tính năng AI đã hoàn thành</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FaCheck className="text-green-600" />
                AI Exercise Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Component hoàn chỉnh với AI integration, exercise generation và quality control
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
                <FaCheck className="text-green-600" />
                Content Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                AI tự động phân tích nội dung, trích xuất từ vựng, ngữ pháp và chủ đề
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
                <FaCheck className="text-green-600" />
                Exercise Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Hỗ trợ 5 loại bài tập: trắc nghiệm, điền từ, dịch, nối từ, sắp xếp câu
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
                <FaCheck className="text-green-600" />
                Quality Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Hệ thống kiểm soát chất lượng với AI scoring và validation
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
                Advanced AI Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                Tích hợp GPT-4, Gemini Pro và Claude để tạo bài tập chất lượng cao hơn
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 2.1</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FaClock className="text-blue-600" />
                Adaptive Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                AI tự động điều chỉnh độ khó bài tập dựa trên performance của học viên
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 2.2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaRocket },
    { id: 'features', label: 'Tính năng', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🤖</div>
              <h1 className="text-xl font-bold text-gray-900">AI Exercise Generator</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <FaDownload className="mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <FaRocket className="mr-2" />
                Launch AI
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
        {activeTab === 'overview' && renderOverview()}
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
              Hệ thống AI thông minh cho giáo dục
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
