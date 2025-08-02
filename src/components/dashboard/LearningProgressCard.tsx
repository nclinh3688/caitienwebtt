'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

interface UserProgressData {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
  currentStreak: number;
  totalStudyTimeHours: number;
}

interface AIProgressAnalysis {
  weaknesses?: string[];
  overallAssessment?: string;
  strengths?: string[];
  recommendations?: string[];
  reviewReminders?: string[];
  lessonRecommendations?: Array<{
    title: string;
    course: string;
  }>;
}

interface LearningProgressCardProps {
  overallProgress: UserProgressData;
  aiProgressAnalysis: AIProgressAnalysis;
  achievementsLength: number;
}

export function LearningProgressCard({ overallProgress, aiProgressAnalysis, achievementsLength }: LearningProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FaChartLine className="text-green-600" />
          Tiến trình học
        </CardTitle>
        <Badge variant="secondary">{overallProgress.completedLessons}/{overallProgress.totalLessons} bài học</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* B1A: Tỷ lệ hoàn thành */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Tỷ lệ hoàn thành</span>
              <span className="text-sm text-gray-600">{overallProgress.percentage.toFixed(1)}%</span>
            </div>
            <Progress value={overallProgress.percentage} className="h-3" />
          </div>
          
          {/* B1B: Điểm yếu cần cải thiện */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <FaExclamationTriangle className="text-orange-500" />
              Điểm yếu cần cải thiện
            </h4>
            <div className="flex gap-2">
              {aiProgressAnalysis?.weaknesses && aiProgressAnalysis.weaknesses.length > 0 ? (
                aiProgressAnalysis.weaknesses.map((weakness: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-orange-600 border-orange-200">
                    {weakness}
                  </Badge>
                ))
              ) : (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  Chưa có dữ liệu
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{overallProgress.currentStreak}</div>
              <div className="text-sm text-gray-600">Ngày liên tiếp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress.totalStudyTimeHours.toFixed(1)}h</div>
              <div className="text-sm text-gray-600">Tổng thời gian</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{achievementsLength}</div>
              <div className="text-sm text-gray-600">Thành tích</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
