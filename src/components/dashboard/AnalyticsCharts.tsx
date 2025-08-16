'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie,
  FaArrowUp,
  FaArrowDown,
  FaMinus
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

interface AnalyticsChartsProps {
  skillAnalysis: SkillAnalysis;
  learningVelocity: LearningVelocity;
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
}

export function AnalyticsCharts({
  skillAnalysis,
  learningVelocity,
  totalLessons,
  completedLessons,
  averageScore
}: AnalyticsChartsProps) {
  
  const getSkillColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSkillStatus = (score: number) => {
    if (score >= 80) return { icon: <FaArrowUp className="text-green-500" />, text: 'Xuất sắc', color: 'text-green-600' };
    if (score >= 60) return { icon: <FaMinus className="text-yellow-500" />, text: 'Tốt', color: 'text-yellow-600' };
    return { icon: <FaArrowDown className="text-red-500" />, text: 'Cần cải thiện', color: 'text-red-600' };
  };

  const getCompletionRate = () => {
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (score >= 80) return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (score >= 70) return { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    return { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  };

  return (
    <div className="space-y-6">
      {/* Skills Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartPie className="text-blue-600" />
            Phân tích kỹ năng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skillAnalysis).map(([skill, score]) => {
              const status = getSkillStatus(score);
              return (
                <div key={skill} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium capitalize text-gray-700">
                      {skill === 'vocabulary' ? 'Từ vựng' :
                       skill === 'grammar' ? 'Ngữ pháp' :
                       skill === 'kanji' ? 'Kanji' :
                       skill === 'listening' ? 'Nghe' :
                       skill === 'pronunciation' ? 'Phát âm' :
                       skill === 'reading' ? 'Đọc' : skill}
                    </span>
                    <div className="flex items-center gap-2">
                      {status.icon}
                      <Badge variant="outline" className={status.color}>
                        {status.text}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Điểm số</span>
                      <span className={`text-lg font-bold ${getSkillColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <Progress value={score} className="h-3" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Learning Velocity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartLine className="text-green-600" />
            Tốc độ học tập
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-3xl font-bold text-green-700 mb-2">
                {learningVelocity.wordsPerDay}
              </div>
              <div className="text-sm font-medium text-green-800 mb-1">Từ vựng/ngày</div>
              <div className="text-xs text-green-600">
                {learningVelocity.wordsPerDay >= 15 ? '🎯 Mục tiêu đạt được!' : 
                 learningVelocity.wordsPerDay >= 10 ? '📈 Tiến bộ tốt' : '💪 Cần cải thiện'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">
                {learningVelocity.lessonsPerWeek.toFixed(1)}
              </div>
              <div className="text-sm font-medium text-blue-800 mb-1">Bài học/tuần</div>
              <div className="text-xs text-blue-600">
                {learningVelocity.lessonsPerWeek >= 5 ? '🚀 Xuất sắc!' : 
                 learningVelocity.lessonsPerWeek >= 3 ? '📚 Ổn định' : '⏰ Cần tăng cường'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-3xl font-bold text-purple-700 mb-2">
                {learningVelocity.practiceTime}m
              </div>
              <div className="text-sm font-medium text-purple-800 mb-1">Phút/ngày</div>
              <div className="text-xs text-purple-600">
                {learningVelocity.practiceTime >= 60 ? '⏰ Rất tốt!' : 
                 learningVelocity.practiceTime >= 30 ? '📖 Hợp lý' : '⚡ Tăng thời gian'}
              </div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <div className="text-3xl font-bold text-orange-700 mb-2 flex items-center justify-center gap-1">
                🔥 {learningVelocity.consistencyScore}%
              </div>
              <div className="text-sm font-medium text-orange-800 mb-1">Tính nhất quán</div>
              <div className="text-xs text-orange-600">
                {learningVelocity.consistencyScore >= 80 ? '🌟 Tuyệt vời!' : 
                 learningVelocity.consistencyScore >= 60 ? '👍 Tốt' : '📅 Cần ổn định hơn'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartBar className="text-purple-600" />
            Tổng quan tiến độ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Completion Rate */}
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">
                {getCompletionRate()}%
              </div>
              <div className="text-lg font-medium text-blue-800 mb-3">Tỷ lệ hoàn thành</div>
              <Progress value={getCompletionRate()} className="h-3 mb-3" />
              <div className="text-sm text-blue-600">
                {completedLessons} / {totalLessons} bài học
              </div>
            </div>

            {/* Average Score */}
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-4xl font-bold text-green-700 mb-2">
                {averageScore}%
              </div>
              <div className="text-lg font-medium text-green-800 mb-3">Điểm trung bình</div>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getScoreStatus(averageScore).bg} ${getScoreStatus(averageScore).border} ${getScoreStatus(averageScore).color}`}>
                {averageScore >= 90 ? '🎯 Xuất sắc' :
                 averageScore >= 80 ? '🌟 Tốt' :
                 averageScore >= 70 ? '👍 Khá' : '💪 Cần cải thiện'}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="text-4xl font-bold text-orange-700 mb-2 flex items-center justify-center gap-2">
                🔥 <span className="text-5xl">{Math.floor(learningVelocity.consistencyScore / 10)}</span>
              </div>
              <div className="text-lg font-medium text-orange-800 mb-3">Ngày học liên tiếp</div>
              <div className="text-sm text-orange-600">
                {learningVelocity.consistencyScore >= 80 ? '🎉 Duy trì xuất sắc!' :
                 learningVelocity.consistencyScore >= 60 ? '📚 Tiếp tục phát huy' : '💪 Xây dựng thói quen'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartBar className="text-indigo-600" />
            So sánh kỹ năng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(skillAnalysis)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .map(([skill, score], index) => (
                <div key={skill} className="flex items-center gap-4">
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium capitalize text-gray-600">
                      {skill === 'vocabulary' ? 'Từ vựng' :
                       skill === 'grammar' ? 'Ngữ pháp' :
                       skill === 'kanji' ? 'Kanji' :
                       skill === 'listening' ? 'Nghe' :
                       skill === 'pronunciation' ? 'Phát âm' :
                       skill === 'reading' ? 'Đọc' : skill}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 text-center">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                      <Progress value={score} className="flex-1 h-4" />
                      <div className="w-16 text-right">
                        <span className="text-sm font-bold text-gray-700">{score}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <strong>Gợi ý:</strong> Tập trung vào các kỹ năng có điểm số thấp để cân bằng trình độ tổng thể.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
