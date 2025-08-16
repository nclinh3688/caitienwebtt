'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaChartLine, 
  FaUsers, 
  FaBook, 
  FaClock, 
  FaStar, 
  FaTrophy,
  FaRocket,
  FaCrown,
  FaEye,
  FaDownload,
  FaShare,
  FaSync,
  FaBolt,
  FaBrain,
  FaMagic,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';

interface AnalyticsData {
  id: string;
  metric: string;
  value: number;
  change: number;
  unit: string;
  status: 'up' | 'down' | 'stable';
  target: number;
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  activity: string;
  timestamp: Date;
  duration: number;
  score?: number;
}

interface ContentPerformance {
  id: string;
  title: string;
  type: string;
  views: number;
  completionRate: number;
  averageScore: number;
  engagement: number;
}

export default function AdvancedAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [contentPerformance, setContentPerformance] = useState<ContentPerformance[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  useEffect(() => {
    console.log('🔄 AdvancedAnalyticsDashboard: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedAnalyticsDashboard: Initializing data');
    
    // Analytics Data
    const mockAnalyticsData: AnalyticsData[] = [
      {
        id: '1',
        metric: 'Total Users',
        value: 2847,
        change: 12.5,
        unit: 'users',
        status: 'up',
        target: 3000
      },
      {
        id: '2',
        metric: 'Active Users',
        value: 1893,
        change: 8.2,
        unit: 'users',
        status: 'up',
        target: 2000
      },
      {
        id: '3',
        metric: 'Lessons Completed',
        value: 15642,
        change: -2.1,
        unit: 'lessons',
        status: 'down',
        target: 20000
      },
      {
        id: '4',
        metric: 'Average Score',
        value: 87.3,
        change: 5.4,
        unit: '%',
        status: 'up',
        target: 90
      },
      {
        id: '5',
        metric: 'Study Time',
        value: 2847,
        change: 15.7,
        unit: 'hours',
        status: 'up',
        target: 3000
      },
      {
        id: '6',
        metric: 'Retention Rate',
        value: 78.5,
        change: 3.2,
        unit: '%',
        status: 'up',
        target: 80
      }
    ];

    // User Activities
    const mockUserActivities: UserActivity[] = [
      {
        id: '1',
        userId: 'user-001',
        userName: 'Nguyễn Văn A',
        activity: 'Completed N5 Lesson 15',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        duration: 45,
        score: 92
      },
      {
        id: '2',
        userId: 'user-002',
        userName: 'Trần Thị B',
        activity: 'Took N4 Practice Test',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        duration: 60,
        score: 85
      },
      {
        id: '3',
        userId: 'user-003',
        userName: 'Lê Văn C',
        activity: 'Started AI Exercise Session',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        duration: 30
      },
      {
        id: '4',
        userId: 'user-004',
        userName: 'Phạm Thị D',
        activity: 'Unlocked Achievement: Grammar Master',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        duration: 0
      }
    ];

    // Content Performance
    const mockContentPerformance: ContentPerformance[] = [
      {
        id: '1',
        title: 'N5 Grammar Basics',
        type: 'Lesson',
        views: 1247,
        completionRate: 89.2,
        averageScore: 87.5,
        engagement: 92.1
      },
      {
        id: '2',
        title: 'N4 Vocabulary Builder',
        type: 'Exercise',
        views: 892,
        completionRate: 76.8,
        averageScore: 82.3,
        engagement: 85.7
      },
      {
        id: '3',
        title: 'Listening Practice N5',
        type: 'Audio',
        views: 1567,
        completionRate: 94.1,
        averageScore: 91.2,
        engagement: 88.9
      },
      {
        id: '4',
        title: 'AI Generated Quiz',
        type: 'Test',
        views: 634,
        completionRate: 68.5,
        averageScore: 79.8,
        engagement: 76.4
      }
    ];

    setAnalyticsData(mockAnalyticsData);
    setUserActivities(mockUserActivities);
    setContentPerformance(mockContentPerformance);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analyticsData.map((item) => (
          <Card key={item.id} className={`border-2 ${
            item.status === 'up' ? 'border-green-200 bg-green-50' :
            item.status === 'down' ? 'border-red-200 bg-red-50' :
            'border-gray-200 bg-gray-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{item.metric}</h3>
                <div className={`text-sm ${
                  item.status === 'up' ? 'text-green-600' :
                  item.status === 'down' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {item.status === 'up' ? '↗' : item.status === 'down' ? '↘' : '→'}
                  {Math.abs(item.change)}%
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{item.value.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">{item.unit}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Target</span>
                    <span className="font-medium">{item.target.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(item.value / item.target) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Overall Performance</h3>
              <p className="text-gray-600">System health and user engagement metrics</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">A+</div>
              <div className="text-sm text-blue-600">Grade</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <div className="text-sm text-gray-600">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">87.3%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">78.5%</div>
              <div className="text-sm text-gray-600">Retention Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderUserActivity = () => (
    <div className="space-y-6">
      {/* Activity Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">User Activity</h3>
              <p className="text-gray-600">Real-time user engagement and learning progress</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {userActivities.length}
              </div>
              <div className="text-sm text-green-600">Recent Activities</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaEye className="text-blue-600" />
            Recent User Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaUsers className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.userName}</div>
                    <div className="text-sm text-gray-600">{activity.activity}</div>
                    <div className="text-xs text-gray-500">
                      {activity.timestamp.toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {activity.duration > 0 && (
                    <div className="text-sm text-gray-600">
                      {activity.duration} min
                    </div>
                  )}
                  {activity.score && (
                    <Badge className="bg-green-100 text-green-800">
                      {activity.score}%
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContentPerformance = () => (
    <div className="space-y-6">
      {/* Content Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Content Performance</h3>
              <p className="text-gray-600">Analytics for lessons, exercises, and learning materials</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {contentPerformance.length}
              </div>
              <div className="text-sm text-purple-600">Content Items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBook className="text-green-600" />
            Content Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Content</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Views</th>
                  <th className="text-left p-3 font-medium">Completion</th>
                  <th className="text-left p-3 font-medium">Score</th>
                  <th className="text-left p-3 font-medium">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {contentPerformance.map((content) => (
                  <tr key={content.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="font-medium">{content.title}</div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{content.type}</Badge>
                    </td>
                    <td className="p-3">{content.views.toLocaleString()}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={content.completionRate} className="w-20 h-2" />
                        <span className="text-sm">{content.completionRate}%</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={
                        content.averageScore >= 90 ? 'bg-green-100 text-green-800' :
                        content.averageScore >= 80 ? 'bg-blue-100 text-blue-800' :
                        content.averageScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {content.averageScore}%
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Progress value={content.engagement} className="w-20 h-2" />
                        <span className="text-sm">{content.engagement}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'user-activity', label: 'Hoạt động người dùng', icon: FaUsers },
    { id: 'content-performance', label: 'Hiệu suất nội dung', icon: FaBook }
  ];

  const timeframes = [
    { value: 'week', label: 'Tuần' },
    { value: 'month', label: 'Tháng' },
    { value: 'quarter', label: 'Quý' },
    { value: 'year', label: 'Năm' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaChartLine className="text-blue-600" />
            Advanced Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Dashboard phân tích nâng cao với AI và real-time data
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.value}
                onClick={() => setSelectedTimeframe(timeframe.value)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedTimeframe === timeframe.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
          
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaSync className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
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

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'user-activity' && renderUserActivity()}
      {activeTab === 'content-performance' && renderContentPerformance()}
    </div>
  );
}
