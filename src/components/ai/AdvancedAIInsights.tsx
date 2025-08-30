'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaBrain, 
  FaLightbulb, 
  FaRocket, 
  FaChartLine, 
  FaBullseye,
  FaClock,
  FaStar,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaPlay,
  FaPause,
  FaRedo,
  FaDownload,
  FaShare,
  FaEye,
  FaEyeSlash,
  FaCog,
  FaMagic,
  FaRobot,
  FaGraduationCap,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaTrophy,
  FaFire,
  FaUsers,
  FaCalendar,
  FaBell,
  FaHeart,
  FaGift,
  FaCrown,
  FaMedal,
  FaAward,
  FaCertificate,
  FaFlag,
  FaMap,
  FaCompass,
  FaRoute,
  FaSign,
  FaTrafficLight,
  FaStop,
  FaPauseCircle,
  FaPlayCircle,
  FaStopCircle,
  FaCircle,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiTrendingUp, HiTrendingDown } from 'react-icons/hi';

interface AIInsight {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: string;
  actionRequired: boolean;
  estimatedTime: number;
  priority: number;
  createdAt: Date;
  expiresAt?: Date;
}

interface LearningPattern {
  id: string;
  name: string;
  description: string;
  strength: number;
  weakness: number;
  recommendation: string;
  estimatedImprovement: number;
}

interface AIPrediction {
  id: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  timeframe: string;
  confidence: number;
  factors: string[];
}

export default function AdvancedAIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [patterns, setPatterns] = useState<LearningPattern[]>([]);
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [activeTab, setActiveTab] = useState('insights');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);

  useEffect(() => {
    initializeAIInsights();
  }, []);

  // Debug state changes
  useEffect(() => {
    console.log('🔄 State updated:');
    console.log('🤖 Insights:', insights);
    console.log('📈 Patterns:', patterns);
    console.log('🔮 Predictions:', predictions);
  }, [insights, patterns, predictions]);

  const initializeAIInsights = async () => {
    try {
      console.log('🔍 Fetching AI insights from API...');
      const response = await fetch('/api/dashboard/advanced/insights/public');
      if (response.ok) {
        const data = await response.json();
        console.log('📊 API Response:', data);
        console.log('🤖 Insights count:', data.insights?.length || 0);
        console.log('📈 Patterns count:', data.patterns?.length || 0);
        console.log('🔮 Predictions count:', data.predictions?.length || 0);
        setInsights(data.insights || []);
        setPatterns(data.patterns || []);
        setPredictions(data.predictions || []);
      } else {
        console.error('❌ Failed to fetch insights');
        // Fallback to mock data if API fails
        initializeMockData();
      }
    } catch (error) {
      console.error('❌ Error fetching insights:', error);
      // Fallback to mock data if API fails
      initializeMockData();
    }
  };

  const initializeMockData = () => {
    // Mock AI Insights Data (fallback)
    const mockInsights: AIInsight[] = [
      {
        id: '1',
        type: 'recommendation',
        title: 'Tăng cường luyện tập Kanji',
        description: 'Dựa trên phân tích, bạn cần tập trung vào việc học Kanji N5. Độ chính xác hiện tại chỉ đạt 65%, thấp hơn mức trung bình 15%.',
        confidence: 92,
        impact: 'high',
        category: 'Kanji Learning',
        actionRequired: true,
        estimatedTime: 30,
        priority: 1,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        type: 'warning',
        title: 'Giảm thời gian học liên tục',
        description: 'Thời gian học liên tục trung bình 2.5 giờ có thể gây mệt mỏi. Khuyến nghị chia nhỏ thành các phiên 45 phút với nghỉ ngơi 15 phút.',
        confidence: 87,
        impact: 'medium',
        category: 'Study Habits',
        actionRequired: true,
        estimatedTime: 15,
        priority: 2,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    ];

    const mockPatterns: LearningPattern[] = [
      {
        id: '1',
        name: 'Học buổi sáng hiệu quả hơn',
        description: 'Bạn học hiệu quả nhất vào buổi sáng (7-9h) với độ tập trung cao và khả năng ghi nhớ tốt.',
        strength: 85,
        weakness: 15,
        recommendation: 'Tập trung học các bài khó vào buổi sáng, ôn tập vào buổi tối.',
        estimatedImprovement: 25
      }
    ];

    const mockPredictions: AIPrediction[] = [
      {
        id: '1',
        metric: 'Vocabulary Size',
        currentValue: 1200,
        predictedValue: 1800,
        timeframe: '30 days',
        confidence: 82,
        factors: ['Consistent daily practice', 'Spaced repetition', 'Context learning']
      }
    ];

    setInsights(mockInsights);
    setPatterns(mockPatterns);
    setPredictions(mockPredictions);
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return <FaLightbulb className="text-blue-500" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
      case 'achievement': return <FaTrophy className="text-green-500" />;
      case 'prediction': return <FaCrystalBall className="text-purple-500" />;
      default: return <FaBrain className="text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-500 bg-red-50 text-red-700';
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'low': return 'border-green-500 bg-green-50 text-green-700';
      default: return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Add new insights
      const newInsight: AIInsight = {
        id: Date.now().toString(),
        type: 'recommendation',
        title: 'Phân tích mới từ AI',
        description: 'AI đã phân tích dữ liệu học tập của bạn và đưa ra khuyến nghị mới.',
        confidence: 88,
        impact: 'medium',
        category: 'AI Analysis',
        actionRequired: true,
        estimatedTime: 20,
        priority: 5,
        createdAt: new Date()
      };
      setInsights(prev => [newInsight, ...prev]);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FaBrain className="text-2xl text-blue-500" />
            <div>
              <span className="text-2xl">AI Learning Insights</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <HiSparkles className="mr-1" />
                  Powered by AI
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <FaRobot className="mr-1" />
                  Real-time Analysis
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              AI phân tích dữ liệu học tập của bạn để đưa ra insights và khuyến nghị cá nhân hóa
            </p>
            <Button 
              onClick={runAIAnalysis} 
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang phân tích...
                </>
              ) : (
                <>
                  <FaBrain className="mr-2" />
                  Chạy AI Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'insights'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaLightbulb className="inline mr-2" />
          AI Insights
        </button>
        <button
          onClick={() => setActiveTab('patterns')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'patterns'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaChartLine className="inline mr-2" />
          Learning Patterns
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'predictions'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaCrystalBall className="inline mr-2" />
          AI Predictions
        </button>
      </div>

      {/* AI Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card 
              key={insight.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedInsight?.id === insight.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedInsight(insight)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{insight.title}</CardTitle>
                      <p className="text-gray-600 text-sm leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getImpactColor(insight.impact)}>
                      {insight.impact === 'high' ? 'Cao' : insight.impact === 'medium' ? 'Trung bình' : 'Thấp'}
                    </Badge>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${getConfidenceColor(insight.confidence)}`}>
                        {insight.confidence}% confidence
                      </div>
                      <div className="text-xs text-gray-500">
                        Priority: {insight.priority}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span>Category: {insight.category}</span>
                    {insight.actionRequired && (
                      <Badge variant="destructive" className="text-xs">
                        Action Required
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {insight.estimatedTime > 0 && (
                      <span>⏱️ {insight.estimatedTime} min</span>
                    )}
                    <span>📅 {insight.createdAt.toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Learning Patterns Tab */}
      {activeTab === 'patterns' && (
        <div className="space-y-4">
          {patterns.map((pattern) => (
            <Card key={pattern.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaChartLine className="text-blue-500" />
                  {pattern.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{pattern.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{pattern.strength}%</div>
                    <div className="text-sm text-gray-500">Strength</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{pattern.weakness}%</div>
                    <div className="text-sm text-gray-500">Weakness</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Recommendation:</h4>
                  <p className="text-blue-700">{pattern.recommendation}</p>
                  <div className="mt-2 text-sm text-blue-600">
                    Estimated improvement: +{pattern.estimatedImprovement}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AI Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="space-y-4">
          {predictions.map((prediction) => (
            <Card key={prediction.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaCrystalBall className="text-purple-500" />
                  {prediction.metric}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-600">Current</div>
                    <div className="text-2xl font-bold text-blue-600">{prediction.currentValue}</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <FaArrowUp className="text-2xl text-green-500" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-600">Predicted</div>
                    <div className="text-2xl font-bold text-green-600">{prediction.predictedValue}</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-800">Confidence: {prediction.confidence}%</span>
                    <span className="text-sm text-purple-600">in {prediction.timeframe}</span>
                  </div>
                  <Progress value={prediction.confidence} className="w-full" />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Key Factors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {prediction.factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-100">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Selected Insight Details */}
      {selectedInsight && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>📋 Insight Details</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedInsight(null)}
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Type:</span> {selectedInsight.type}
              </div>
              <div>
                <span className="font-semibold">Category:</span> {selectedInsight.category}
              </div>
              <div>
                <span className="font-semibold">Priority:</span> {selectedInsight.priority}
              </div>
              <div>
                <span className="font-semibold">Created:</span> {selectedInsight.createdAt.toLocaleString('vi-VN')}
              </div>
              {selectedInsight.expiresAt && (
                <div>
                  <span className="font-semibold">Expires:</span> {selectedInsight.expiresAt.toLocaleString('vi-VN')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper component for crystal ball icon
const FaCrystalBall = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);
