'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaChartLine, 
  FaBrain, 
  FaRocket, 
  FaUsers, 
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLightbulb,
  FaChartBar,
  FaChartPie,
  FaChartArea,
  FaDownload,
  FaSync,
  FaEye,
  FaCog,
  FaMagic,
  FaStar,
  FaTrophy,
  FaGraduationCap,
  FaBook,
  FaRobot
} from 'react-icons/fa';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  totalTime: number;
  aiInteractions: number;
  gamificationScore: number;
  trends: {
    users: number[];
    lessons: number[];
    scores: number[];
    time: number[];
  };
  insights: Insight[];
  predictions: Prediction[];
}

interface Insight {
  id: string;
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  timestamp: Date;
}

interface Prediction {
  id: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
}

export default function AdvancedAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      // Mock data for demo
      const mockData: AnalyticsData = {
        totalUsers: 1247,
        activeUsers: 892,
        totalLessons: 156,
        completedLessons: 142,
        averageScore: 87.5,
        totalTime: 2840,
        aiInteractions: 67,
        gamificationScore: 8750,
        trends: {
          users: [1200, 1220, 1240, 1250, 1260, 1270, 1247],
          lessons: [140, 142, 145, 148, 150, 153, 156],
          scores: [85, 86, 87, 88, 87.5, 87.8, 87.5],
          time: [2800, 2820, 2830, 2840, 2845, 2848, 2840]
        },
        insights: [
          {
            id: '1',
            type: 'positive',
            title: 'Tăng trưởng người dùng mạnh mẽ',
            description: 'Số lượng người dùng mới tăng 15% so với tuần trước',
            impact: 'high',
            category: 'growth',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
          },
          {
            id: '2',
            type: 'positive',
            title: 'AI Tutor được sử dụng nhiều',
            description: '67 phiên tương tác AI trong 24h qua, tăng 23%',
            impact: 'medium',
            category: 'ai-usage',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
          },
          {
            id: '3',
            type: 'neutral',
            title: 'Điểm số ổn định',
            description: 'Điểm trung bình duy trì ở mức 87.5%',
            impact: 'low',
            category: 'performance',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
          }
        ],
        predictions: [
          {
            id: '1',
            metric: 'Total Users',
            currentValue: 1247,
            predictedValue: 1350,
            confidence: 0.89,
            timeframe: '30 days',
            trend: 'up'
          },
          {
            id: '2',
            metric: 'Average Score',
            currentValue: 87.5,
            predictedValue: 89.2,
            confidence: 0.76,
            timeframe: '14 days',
            trend: 'up'
          },
          {
            id: '3',
            metric: 'AI Interactions',
            currentValue: 67,
            predictedValue: 85,
            confidence: 0.82,
            timeframe: '7 days',
            trend: 'up'
          }
        ]
      };

      setData(mockData);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return <FaArrowUp className="text-green-500" />;
      case 'negative': return <FaArrowDown className="text-red-500" />;
      case 'neutral': return <FaChartLine className="text-blue-500" />;
      default: return <FaChartLine className="text-gray-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'negative': return 'border-red-200 bg-red-50';
      case 'neutral': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPredictionTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <FaArrowUp className="text-green-500" />;
      case 'down': return <FaArrowDown className="text-red-500" />;
      case 'stable': return <FaChartLine className="text-blue-500" />;
      default: return <FaChartLine className="text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Tổng người dùng</p>
                <p className="text-3xl font-bold text-blue-700">{data?.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">
                  +{data?.trends?.users ? data.trends.users[data.trends.users.length - 1] - data.trends.users[0] : 0} tuần này
                </p>
              </div>
              <div className="text-blue-500 text-3xl">👥</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Bài học hoàn thành</p>
                <p className="text-3xl font-bold text-green-700">{data?.completedLessons}</p>
                <p className="text-xs text-green-600 mt-1">
                  {Math.round((data?.completedLessons || 0) / (data?.totalLessons || 1) * 100)}% tổng số
                </p>
              </div>
              <div className="text-green-500 text-3xl">📚</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Điểm trung bình</p>
                <p className="text-3xl font-bold text-purple-700">{data?.averageScore}%</p>
                <p className="text-xs text-purple-600 mt-1">
                  +{data?.trends?.scores ? data.trends.scores[data.trends.scores.length - 1] - data.trends.scores[0] : 0} tuần này
                </p>
              </div>
              <div className="text-purple-500 text-3xl">⭐</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">AI Interactions</p>
                <p className="text-3xl font-bold text-orange-700">{data?.aiInteractions}</p>
                <p className="text-xs text-orange-600 mt-1">
                  Trong 24h qua
                </p>
              </div>
              <div className="text-orange-500 text-3xl">🤖</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBrain className="text-purple-600" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.insights.map((insight) => (
              <div key={insight.id} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                      <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                        {insight.impact.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {insight.category}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{insight.description}</p>
                    <div className="text-xs text-gray-500">
                      {insight.timestamp.toLocaleTimeString('vi-VN')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMagic className="text-blue-600" />
            AI Predictions & Forecasting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.predictions.map((prediction) => (
              <div key={prediction.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{prediction.metric}</h4>
                  {getPredictionTrendIcon(prediction.trend)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Hiện tại:</span>
                    <span className="font-medium">{prediction.currentValue}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Dự đoán:</span>
                    <span className="font-medium text-blue-600">{prediction.predictedValue}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Độ tin cậy:</span>
                    <span className="font-medium text-green-600">{Math.round(prediction.confidence * 100)}%</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    {prediction.timeframe}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Trends & Patterns</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartLine className="text-blue-600" />
              User Growth Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tuần này</span>
                <span className="text-sm font-medium text-green-600">
                  +{data?.trends?.users ? data.trends.users[data.trends.users.length - 1] - data.trends.users[0] : 0} users
                </span>
              </div>
              
              <div className="space-y-2">
                {data?.trends?.users?.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-8">T{index + 1}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(value / Math.max(...(data?.trends?.users || []))) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium w-12">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartBar className="text-green-600" />
              Lesson Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((data?.completedLessons || 0) / (data?.totalLessons || 1) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Tỷ lệ hoàn thành</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Đã hoàn thành</span>
                  <span className="text-sm font-medium text-green-600">{data?.completedLessons}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tổng số</span>
                  <span className="text-sm font-medium text-gray-900">{data?.totalLessons}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Còn lại</span>
                  <span className="text-sm font-medium text-orange-600">
                    {(data?.totalLessons || 0) - (data?.completedLessons || 0)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'trends', label: 'Xu hướng', icon: FaChartLine }
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang tải dữ liệu analytics...</h2>
        <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-red-700 mb-2">Không thể tải dữ liệu</h2>
        <p className="text-gray-600">Vui lòng thử lại sau</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBrain className="text-purple-600" />
            Advanced Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Dashboard analytics nâng cao với AI insights và predictions
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
          </select>
          
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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
                    ? 'border-purple-500 text-purple-600'
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
      {activeTab === 'trends' && renderTrends()}
    </div>
  );
}
