'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaTrophy, 
  FaRobot, 
  FaStar, 
  FaFire, 
  FaUsers, 
  FaCrown,
  FaGift,
  FaChartLine,
  FaBullseye,
  FaRocket,
  FaGem,
  FaHeart,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaCalendar,
  FaGraduationCap,
  FaBook,
  FaBrain,
  FaMagic,
  FaMicrophone,
  FaBrain as FaBrainIcon,
  FaDownload,
  FaCheck
} from 'react-icons/fa';

export default function GamificationAIDemoPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCrown className="text-yellow-600" />
            Gamification & AI Tutor Demo
          </h1>
          <p className="text-gray-600 mt-1">
            Demo hoàn chỉnh hệ thống gamification nâng cao và AI Tutor thông minh
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
            <FaRocket />
            Khởi chạy hệ thống
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaDownload />
            Export
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Gamification Score</p>
                <p className="text-3xl font-bold text-yellow-700">8,750</p>
                <p className="text-xs text-yellow-600 mt-1">
                  Gold Rank
                </p>
              </div>
              <div className="text-yellow-500 text-3xl">🏆</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">AI Tutor Sessions</p>
                <p className="text-3xl font-bold text-blue-700">67</p>
                <p className="text-xs text-blue-600 mt-1">
                  Trong tháng này
                </p>
              </div>
              <div className="text-blue-500 text-3xl">🤖</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Study Groups</p>
                <p className="text-3xl font-bold text-purple-700">3</p>
                <p className="text-xs text-purple-600 mt-1">
                  Đang tham gia
                </p>
              </div>
              <div className="text-purple-500 text-3xl">👥</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Achievements</p>
                <p className="text-3xl font-bold text-green-700">23</p>
                <p className="text-xs text-green-600 mt-1">
                  Đã mở khóa
                </p>
              </div>
              <div className="text-green-500 text-3xl">⭐</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMagic className="text-purple-600" />
            Tính năng nổi bật
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl text-yellow-600">🏆</div>
                <div>
                  <h4 className="font-medium text-gray-900">Enhanced Gamification</h4>
                  <p className="text-sm text-gray-600">
                    Hệ thống gamification nâng cao với leaderboards, achievements, study groups và reward system
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-blue-600">🤖</div>
                <div>
                  <h4 className="font-medium text-gray-900">Advanced AI Tutor</h4>
                  <p className="text-sm text-gray-600">
                    AI Tutor thông minh với voice recognition, personalized learning paths và real-time feedback
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-green-600">👥</div>
                <div>
                  <h4 className="font-medium text-gray-900">Study Groups</h4>
                  <p className="text-sm text-gray-600">
                    Tạo và tham gia nhóm học tập, thi đua và hỗ trợ lẫn nhau
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl text-purple-600">🎯</div>
                <div>
                  <h4 className="font-medium text-gray-900">Personalized Learning</h4>
                  <p className="text-sm text-gray-600">
                    Lộ trình học tập cá nhân hóa dựa trên AI và performance tracking
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-orange-600">🎁</div>
                <div>
                  <h4 className="font-medium text-gray-900">Reward System</h4>
                  <p className="text-sm text-gray-600">
                    Hệ thống phần thưởng đa dạng: badges, titles, items và bonuses
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-2xl text-red-600">📊</div>
                <div>
                  <h4 className="font-medium text-gray-900">Progress Analytics</h4>
                  <p className="text-sm text-gray-600">
                    Theo dõi tiến độ chi tiết với charts, insights và recommendations
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
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-yellow-50 hover:border-yellow-300 transition-all"
              onClick={() => window.open('/gamification-ai-demo/gamification', '_blank')}
            >
              <FaTrophy className="text-2xl text-yellow-600" />
              <span className="text-sm font-medium">Gamification</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
              onClick={() => window.open('/gamification-ai-demo/ai-tutor', '_blank')}
            >
              <FaRobot className="text-2xl text-blue-600" />
              <span className="text-sm font-medium">AI Tutor</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-purple-50 hover:border-purple-300 transition-all"
              onClick={() => window.open('/gamification-ai-demo/study-groups', '_blank')}
            >
              <FaUsers className="text-2xl text-purple-600" />
              <span className="text-sm font-medium">Study Groups</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-green-50 hover:border-green-300 transition-all"
              onClick={() => window.open('/gamification-ai-demo/analytics', '_blank')}
            >
              <FaChartLine className="text-2xl text-green-600" />
              <span className="text-sm font-medium">Analytics</span>
            </Button>
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
                <FaCheck className="text-green-600" />
                Enhanced Gamification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Hệ thống gamification hoàn chỉnh với leaderboards, achievements, study groups và reward system
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
                Advanced AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                AI Tutor thông minh với voice recognition, personalized learning và real-time feedback
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
                Study Groups System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Quản lý nhóm học tập với roles, permissions và collaboration features
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
                Reward & Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Hệ thống thành tích và phần thưởng đa dạng với rarity levels và progress tracking
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
                Social Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                Tính năng xã hội: chat, forums, peer-to-peer learning và mentorship
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 3.1</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FaClock className="text-blue-600" />
                Advanced AI Models
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                Tích hợp GPT-4, Gemini Pro Vision và Claude 3 cho AI Tutor nâng cao
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 4.1</span>
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
              <div className="text-2xl mr-3">🎮</div>
              <h1 className="text-xl font-bold text-gray-900">Gamification & AI Tutor</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <FaDownload className="mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-yellow-600 to-orange-600">
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
              Hệ thống gamification và AI Tutor thông minh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
