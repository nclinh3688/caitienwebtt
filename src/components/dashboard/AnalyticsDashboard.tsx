'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie,
  FaDownload,
  FaCalendarAlt,
  FaClock,
  FaFire,
  FaBullseye,
  FaExclamationTriangle,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaEyeSlash,
  FaRedo,
  FaBell
} from 'react-icons/fa';
import { AnalyticsCharts } from './AnalyticsCharts';
import { AnalyticsNotifications } from './AnalyticsNotifications';

interface SkillAnalysis {
  vocabulary: number;
  grammar: number; 
  kanji: number;
  listening: number;
  pronunciation: number;
  reading: number;
}

interface LearningVelocity {
  wordsPerDay: number;
  lessonsPerWeek: number;
  practiceTime: number;
  consistencyScore: number;
}

interface WeakPointDetail {
  category: string;
  specific: string;
  severity: 'low' | 'medium' | 'high';
  improvement: number;
  recommendedAction: string;
}

interface AnalyticsData {
  skillAnalysis: SkillAnalysis;
  learningVelocity: LearningVelocity;
  weakPoints: WeakPointDetail[];
  totalLessons: number;
  completedLessons: number;
  totalTime: number;
  averageScore: number;
  streak: number;
  level: number;
  experience: number;
}

interface AnalyticsDashboardProps {
  userId: string;
  timeframe?: 'week' | 'month' | 'quarter' | 'year';
  showAdvanced?: boolean;
}

export function AnalyticsDashboard({ 
  userId, 
  timeframe = 'month',
  showAdvanced = true 
}: AnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(showAdvanced);

  useEffect(() => {
    fetchAnalyticsData();
  }, [userId, selectedTimeframe]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch basic progress
      const progressResponse = await fetch(`/api/progress?userId=${userId}`);
      const progressData = await progressResponse.json();

      // Fetch advanced analytics
      const analyticsResponse = await fetch('/api/analytics/advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, timeframe: selectedTimeframe }),
      });
      const analyticsResult = await analyticsResponse.json();

      // Combine all data
      const combinedData: AnalyticsData = {
        skillAnalysis: analyticsResult.skillAnalysis || generateMockSkillAnalysis(),
        learningVelocity: analyticsResult.learningVelocity || generateMockLearningVelocity(),
        weakPoints: analyticsResult.weakPoints || generateMockWeakPoints(),
        totalLessons: progressData.data?.totalLessons || 25,
        completedLessons: progressData.data?.completedLessons || 8,
        totalTime: progressData.data?.totalTimeSpent || 180,
        averageScore: progressData.data?.averageScore || 85,
        streak: progressData.data?.streak || 7,
        level: progressData.data?.level || 5,
        experience: progressData.data?.experience || 750
      };

      setAnalyticsData(combinedData);
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
      setError('Không thể tải dữ liệu phân tích. Vui lòng thử lại sau.');
      
      // Fallback to mock data
      setAnalyticsData(generateMockAnalyticsData());
    } finally {
      setLoading(false);
    }
  };

  const generateMockSkillAnalysis = (): SkillAnalysis => ({
    vocabulary: 75 + Math.floor(Math.random() * 20),
    grammar: 65 + Math.floor(Math.random() * 20),
    kanji: 45 + Math.floor(Math.random() * 30),
    listening: 80 + Math.floor(Math.random() * 15),
    pronunciation: 70 + Math.floor(Math.random() * 20),
    reading: 55 + Math.floor(Math.random() * 25)
  });

  const generateMockLearningVelocity = (): LearningVelocity => ({
    wordsPerDay: 10 + Math.floor(Math.random() * 10),
    lessonsPerWeek: 3 + Math.random() * 2,
    practiceTime: 30 + Math.floor(Math.random() * 30),
    consistencyScore: 70 + Math.floor(Math.random() * 25)
  });

  const generateMockWeakPoints = (): WeakPointDetail[] => [
    {
      category: 'Kanji',
      specific: 'N5 Kanji Reading',
      severity: 'high',
      improvement: -5 + Math.floor(Math.random() * 10),
      recommendedAction: 'Luyện tập đọc kanji 15 phút/ngày với flashcards'
    },
    {
      category: 'Grammar',
      specific: 'Particle Usage (は/が)',
      severity: 'medium',
      improvement: 2 + Math.floor(Math.random() * 8),
      recommendedAction: 'Làm thêm bài tập về particles'
    },
    {
      category: 'Reading',
      specific: 'Reading Speed',
      severity: 'medium',
      improvement: 8 + Math.floor(Math.random() * 12),
      recommendedAction: 'Đọc truyện ngắn N5 mỗi ngày'
    }
  ];

  const generateMockAnalyticsData = (): AnalyticsData => ({
    skillAnalysis: generateMockSkillAnalysis(),
    learningVelocity: generateMockLearningVelocity(),
    weakPoints: generateMockWeakPoints(),
    totalLessons: 25,
    completedLessons: 8,
    totalTime: 180,
    averageScore: 85,
    streak: 7,
    level: 5,
    experience: 750
  });

  const exportData = async () => {
    if (!analyticsData) return;

    try {
      const content = JSON.stringify(analyticsData, null, 2);
      const filename = `analytics-${userId}-${selectedTimeframe}.json`;
      
      const blob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Xuất dữ liệu thất bại. Vui lòng thử lại.');
    }
  };

  const getSkillColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <FaExclamationTriangle className="text-red-500" />;
      case 'medium': return <FaClock className="text-yellow-500" />;
      case 'low': return <FaCheckCircle className="text-green-500" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang phân tích dữ liệu học tập...</h2>
          <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-red-700 mb-2">Có lỗi xảy ra</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={fetchAnalyticsData} className="flex items-center gap-2">
          <FaRedo />
          Thử lại
        </Button>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-4xl mb-4">📊</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Không có dữ liệu</h2>
        <p className="text-gray-500">Vui lòng hoàn thành một số bài học để xem phân tích</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FaChartBar className="text-blue-600" />
            Dashboard Phân tích học tập
          </h1>
          <p className="text-gray-600 mt-1">
            Theo dõi tiến độ và cải thiện kỹ năng của bạn
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500" />
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>

          {/* Advanced Metrics Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
            className="flex items-center gap-2"
          >
            {showAdvancedMetrics ? <FaEyeSlash /> : <FaEye />}
            {showAdvancedMetrics ? 'Ẩn nâng cao' : 'Hiện nâng cao'}
          </Button>

          {/* Export Button */}
          <Button
            onClick={exportData}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaDownload />
            Xuất JSON
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round((analyticsData.completedLessons / analyticsData.totalLessons) * 100)}%
                </p>
              </div>
              <div className="text-blue-500 text-2xl">📚</div>
            </div>
            <Progress 
              value={(analyticsData.completedLessons / analyticsData.totalLessons) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Thời gian học</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(analyticsData.totalTime / 60)}h {analyticsData.totalTime % 60}m
                </p>
              </div>
              <div className="text-green-500 text-2xl">⏰</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Tổng cộng</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
                <p className="text-2xl font-bold text-purple-600">
                  {analyticsData.averageScore}%
                </p>
              </div>
              <div className="text-purple-500 text-2xl">🎯</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Tất cả bài học</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chuỗi học tập</p>
                <p className="text-2xl font-bold text-orange-600 flex items-center gap-1">
                  <FaFire />
                  {analyticsData.streak}
                </p>
              </div>
              <div className="text-orange-500 text-2xl">🔥</div>
            </div>
            <p className="text-xs text-gray-500 mt-1">ngày liên tiếp</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <FaChartBar />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <FaChartPie />
            Kỹ năng
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <FaBullseye />
            Gợi ý
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <FaBell />
            Thông báo
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <AnalyticsCharts
            skillAnalysis={analyticsData.skillAnalysis}
            learningVelocity={analyticsData.learningVelocity}
            totalLessons={analyticsData.totalLessons}
            completedLessons={analyticsData.completedLessons}
            averageScore={analyticsData.averageScore}
          />
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaChartPie className="text-blue-600" />
                Phân tích chi tiết kỹ năng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(analyticsData.skillAnalysis).map(([skill, score]) => (
                  <div key={skill} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">
                        {skill === 'vocabulary' ? 'Từ vựng' :
                         skill === 'grammar' ? 'Ngữ pháp' :
                         skill === 'kanji' ? 'Kanji' :
                         skill === 'listening' ? 'Nghe' :
                         skill === 'pronunciation' ? 'Phát âm' :
                         skill === 'reading' ? 'Đọc' : skill}
                      </span>
                      <Badge variant={score >= 80 ? 'default' : score >= 60 ? 'secondary' : 'destructive'}>
                        {score}%
                      </Badge>
                    </div>
                    <Progress value={score} className="h-3" />
                    <div className="text-sm text-gray-600">
                      {score >= 80 ? 'Xuất sắc! Bạn đã thành thạo kỹ năng này.' :
                       score >= 60 ? 'Tốt! Hãy tiếp tục luyện tập để cải thiện.' :
                       'Cần cải thiện! Hãy tập trung vào kỹ năng này.'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaBullseye className="text-red-600" />
                Điểm cần cải thiện & Gợi ý
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.weakPoints.map((point, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${getSeverityColor(point.severity)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityIcon(point.severity)}
                          <span className="font-medium text-lg">{point.category}</span>
                          <Badge variant="outline" className="text-xs">
                            {point.specific}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-3">
                          {point.recommendedAction}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">Tiến bộ 7 ngày qua:</span>
                          {point.improvement > 0 ? (
                            <span className="text-green-600 flex items-center gap-1 font-medium">
                              <FaArrowUp />
                              +{point.improvement}%
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1 font-medium">
                              <FaArrowDown />
                              {point.improvement}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <AnalyticsNotifications userId={userId} />
        </TabsContent>
      </Tabs>

      {/* Advanced Metrics (Conditional) */}
      {showAdvancedMetrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartBar className="text-purple-600" />
              Chỉ số nâng cao
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {analyticsData.level}
                </div>
                <div className="text-sm text-blue-600">Cấp độ hiện tại</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {analyticsData.experience}
                </div>
                <div className="text-sm text-green-600">Kinh nghiệm (XP)</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {Math.round((analyticsData.completedLessons / analyticsData.totalLessons) * 100)}%
                </div>
                <div className="text-sm text-purple-600">Tỷ lệ hoàn thành</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-700">
                  {Math.round(analyticsData.totalTime / analyticsData.completedLessons)}m
                </div>
                <div className="text-sm text-orange-600">TB thời gian/bài</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
