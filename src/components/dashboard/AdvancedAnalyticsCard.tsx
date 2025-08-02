'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FaChartBar, 
  FaChartLine, 
  FaBrain, 
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaBullseye,
  FaClock,
  FaFire,
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';

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
  improvement: number; // Progress in last 7 days
  recommendedAction: string;
}

interface AdvancedAnalyticsProps {
  userId: string;
  overallProgress?: any;
  aiProgressAnalysis?: any;
}

export function AdvancedAnalyticsCard({ userId, overallProgress, aiProgressAnalysis }: AdvancedAnalyticsProps) {
  const [skillAnalysis, setSkillAnalysis] = useState<SkillAnalysis | null>(null);
  const [learningVelocity, setLearningVelocity] = useState<LearningVelocity | null>(null);
  const [weakPoints, setWeakPoints] = useState<WeakPointDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'skills' | 'velocity' | 'weakpoints'>('skills');

  useEffect(() => {
    fetchAdvancedAnalytics();
  }, [userId]);

  const fetchAdvancedAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/advanced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSkillAnalysis(data.skillAnalysis);
        setLearningVelocity(data.learningVelocity);
        setWeakPoints(data.weakPoints);
      }
    } catch (error) {
      console.error('Failed to fetch advanced analytics:', error);
      // Fallback với mock data cho demo
      setSkillAnalysis({
        vocabulary: 75,
        grammar: 65,
        kanji: 45,
        listening: 80,
        pronunciation: 70,
        reading: 55
      });
      setLearningVelocity({
        wordsPerDay: 12,
        lessonsPerWeek: 3.5,
        practiceTime: 45,
        consistencyScore: 85
      });
      setWeakPoints([
        {
          category: 'Kanji',
          specific: 'N5 Kanji Reading',
          severity: 'high',
          improvement: -5,
          recommendedAction: 'Luyện tập đọc kanji 15 phút/ngày với flashcards'
        },
        {
          category: 'Grammar',
          specific: 'Particle Usage (は/が)',
          severity: 'medium',
          improvement: 2,
          recommendedAction: 'Làm thêm bài tập về particles'
        },
        {
          category: 'Reading',
          specific: 'Reading Speed',
          severity: 'medium',
          improvement: 8,
          recommendedAction: 'Đọc truyện ngắn N5 mỗi ngày'
        }
      ]);
    } finally {
      setLoading(false);
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartBar className="text-blue-600" />
            Phân tích học tập nâng cao
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin text-blue-500 text-2xl mb-2">⚡</div>
            <p>Đang phân tích dữ liệu học tập...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaChartBar className="text-blue-600" />
          Phân tích học tập nâng cao
        </CardTitle>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => setActiveTab('skills')}
            variant={activeTab === 'skills' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaChartLine />
            Kỹ năng
          </Button>
          <Button
            onClick={() => setActiveTab('velocity')}
            variant={activeTab === 'velocity' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaArrowUp />
            Tiến độ
          </Button>
          <Button
            onClick={() => setActiveTab('weakpoints')}
            variant={activeTab === 'weakpoints' ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
          >
            <FaBullseye />
            Điểm yếu
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Skills Analysis Tab */}
        {activeTab === 'skills' && skillAnalysis && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FaChartLine className="text-blue-500" />
              Radar kỹ năng
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(skillAnalysis).map(([skill, score]) => (
                <div key={skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">
                      {skill === 'vocabulary' ? 'Từ vựng' :
                       skill === 'grammar' ? 'Ngữ pháp' :
                       skill === 'kanji' ? 'Kanji' :
                       skill === 'listening' ? 'Nghe' :
                       skill === 'pronunciation' ? 'Phát âm' :
                       skill === 'reading' ? 'Đọc' : skill}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${getSkillColor(score as number)}`}>
                      {score}%
                    </span>
                  </div>
                  <Progress value={score as number} className="h-2" />
                </div>
              ))}
            </div>

            {/* Overall Assessment */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2">Đánh giá tổng quan</h5>
              <p className="text-blue-700 text-sm">
                {aiProgressAnalysis?.overallAssessment || 
                 "Bạn đang có tiến bộ tốt trong luyện nghe và từ vựng. Cần tập trung cải thiện Kanji và đọc hiểu."}
              </p>
            </div>
          </div>
        )}

        {/* Learning Velocity Tab */}
        {activeTab === 'velocity' && learningVelocity && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FaArrowUp className="text-green-500" />
              Tốc độ học tập
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {learningVelocity.wordsPerDay}
                </div>
                <div className="text-sm text-green-700">Từ/ngày</div>
                <div className="text-xs text-gray-500 mt-1">
                  {learningVelocity.wordsPerDay >= 15 ? 'Tuyệt vời!' : 
                   learningVelocity.wordsPerDay >= 10 ? 'Tốt' : 'Cần cải thiện'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {learningVelocity.lessonsPerWeek}
                </div>
                <div className="text-sm text-blue-700">Bài/tuần</div>
                <div className="text-xs text-gray-500 mt-1">
                  {learningVelocity.lessonsPerWeek >= 5 ? 'Xuất sắc!' : 
                   learningVelocity.lessonsPerWeek >= 3 ? 'Ổn định' : 'Cần tăng cường'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {learningVelocity.practiceTime}m
                </div>
                <div className="text-sm text-purple-700">Phút/ngày</div>
                <div className="text-xs text-gray-500 mt-1">
                  {learningVelocity.practiceTime >= 60 ? 'Rất tốt!' : 
                   learningVelocity.practiceTime >= 30 ? 'Hợp lý' : 'Tăng thời gian'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 flex items-center justify-center gap-1">
                  <FaFire />
                  {learningVelocity.consistencyScore}%
                </div>
                <div className="text-sm text-orange-700">Tính nhất quán</div>
                <div className="text-xs text-gray-500 mt-1">
                  {learningVelocity.consistencyScore >= 80 ? 'Tuyệt vời!' : 
                   learningVelocity.consistencyScore >= 60 ? 'Tốt' : 'Cần ổn định hơn'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weak Points Tab */}
        {activeTab === 'weakpoints' && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <FaBullseye className="text-red-500" />
              Điểm cần cải thiện
            </h4>
            
            <div className="space-y-3">
              {weakPoints.map((point, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${getSeverityColor(point.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getSeverityIcon(point.severity)}
                        <span className="font-medium">{point.category}</span>
                        <Badge variant="outline" className="text-xs">
                          {point.specific}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {point.recommendedAction}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span>Tiến bộ 7 ngày qua:</span>
                        {point.improvement > 0 ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <FaArrowUp />
                            +{point.improvement}%
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}