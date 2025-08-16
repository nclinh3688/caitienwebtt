'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaLink, 
  FaCog, 
  FaRocket, 
  FaChartLine, 
  FaUsers, 
  FaRobot,
  FaTrophy,
  FaBook,
  FaBrain,
  FaMagic,
  FaCheck,
  FaExclamationTriangle,
  FaClock,
  FaStar,
  FaCrown,
  FaSync,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
  FaDownload
} from 'react-icons/fa';
import SystemIntegrationHub from '@/components/integration/SystemIntegrationHub';

export default function SystemIntegrationDemoPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCrown className="text-yellow-600" />
            System Integration Hub Demo
          </h1>
          <p className="text-gray-600 mt-1">
            Demo hệ thống tích hợp hoàn chỉnh tất cả 4 phases PHÚC KHIÊM EDU
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
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
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Content Management</p>
                <p className="text-3xl font-bold text-blue-700">95%</p>
                <p className="text-xs text-blue-600 mt-1">
                  Health Score
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
                <p className="text-sm font-medium text-green-600">AI Exercise Generator</p>
                <p className="text-3xl font-bold text-green-700">92%</p>
                <p className="text-xs text-green-600 mt-1">
                  Health Score
                </p>
              </div>
              <div className="text-green-500 text-3xl">🤖</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Enhanced Gamification</p>
                <p className="text-3xl font-bold text-purple-700">98%</p>
                <p className="text-xs text-purple-600 mt-1">
                  Health Score
                </p>
              </div>
              <div className="text-purple-500 text-3xl">🏆</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Advanced AI Tutor</p>
                <p className="text-3xl font-bold text-orange-700">90%</p>
                <p className="text-xs text-orange-600 mt-1">
                  Health Score
                </p>
              </div>
              <div className="text-orange-500 text-3xl">🧠</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Status */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <FaCheck className="text-green-600" />
            Trạng thái tích hợp hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">Content Management ↔ AI Exercise</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">AI Exercise ↔ AI Tutor</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">Gamification ↔ Analytics</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">AI Tutor ↔ Gamification</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">Content ↔ Analytics</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-medium">All Systems ↔ Database</span>
                <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            Chỉ số hiệu suất tích hợp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4,800</div>
              <div className="text-sm text-gray-600">Total Requests/phút</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">625ms</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">93.8%</div>
              <div className="text-sm text-gray-600">System Health</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Tính năng tích hợp đã hoàn thành</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <FaCheck className="text-green-600" />
                System Integration Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Trung tâm tích hợp và quản lý tất cả 4 systems với real-time monitoring
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
                Data Flow Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Quản lý luồng dữ liệu giữa các systems với real-time sync và error handling
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
                Performance Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Theo dõi hiệu suất real-time với health checks, response time và throughput
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
                Unified Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-3">
                Dashboard thống nhất để quản lý và monitor tất cả systems từ một nơi
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
                Auto-scaling
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                Tự động scale systems dựa trên load và performance metrics
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 5.1</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <FaClock className="text-blue-600" />
                Advanced Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 mb-3">
                AI-powered analytics và predictive maintenance cho systems
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Kế hoạch</Badge>
                <span className="text-sm text-blue-600">Phase 5.2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'features', label: 'Tính năng', icon: FaStar }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl mr-3">🔗</div>
              <h1 className="text-xl font-bold text-gray-900">System Integration Hub</h1>
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'features' && renderFeatures()}
      </div>

      {/* System Integration Hub Component */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SystemIntegrationHub />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 PHÚC KHIÊM EDU. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Hệ thống tích hợp hoàn chỉnh với AI và gamification
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
