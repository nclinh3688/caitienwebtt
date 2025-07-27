'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaGraduationCap, 
  FaHeadphones, 
  FaBookOpen, 
  FaPen, 
  FaRobot,
  FaChartBar,
  FaClock,
  FaStar,
  FaPlay,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb
} from 'react-icons/fa';

export default function TestPage() {
  const [selectedLevel, setSelectedLevel] = useState('n5');
  const [selectedSkill, setSelectedSkill] = useState('all');

  const testData = {
    levels: [
      { id: 'n5', name: 'JLPT N5', progress: 75, totalTests: 20, completedTests: 15 },
      { id: 'n4', name: 'JLPT N4', progress: 45, totalTests: 25, completedTests: 11 },
      { id: 'n3', name: 'JLPT N3', progress: 20, totalTests: 30, completedTests: 6 },
      { id: 'n2', name: 'JLPT N2', progress: 0, totalTests: 35, completedTests: 0 },
      { id: 'n1', name: 'JLPT N1', progress: 0, totalTests: 40, completedTests: 0 }
    ],
    skills: [
      { id: 'listening', name: 'Luyện nghe', icon: FaHeadphones, color: 'text-blue-600', progress: 80 },
      { id: 'reading', name: 'Đọc hiểu', icon: FaBookOpen, color: 'text-green-600', progress: 65 },
      { id: 'grammar', name: 'Ngữ pháp', icon: FaPen, color: 'text-purple-600', progress: 70 }
    ],
    miniTests: [
      { id: 1, lesson: 'Bài 1: Giới thiệu bản thân', status: 'completed', score: 85, time: '5 phút trước' },
      { id: 2, lesson: 'Bài 2: Gia đình', status: 'completed', score: 92, time: '1 giờ trước' },
      { id: 3, lesson: 'Bài 3: Công việc', status: 'pending', score: null, time: 'Chưa làm' },
      { id: 4, lesson: 'Bài 4: Sở thích', status: 'locked', score: null, time: 'Khóa' }
    ],
    aiRecommendations: [
      { id: 1, type: 'personalized', message: 'Dựa trên kết quả, bạn nên tập trung vào ngữ pháp Bài 3', priority: 'high' },
      { id: 2, type: 'practice', message: 'Thử làm bài test nghe để cải thiện kỹ năng', priority: 'medium' }
    ],
    recentResults: [
      { id: 1, testName: 'Mini Test - Bài 2', score: 92, totalQuestions: 10, correctAnswers: 9, time: '15 phút trước' },
      { id: 2, testName: 'Full Test N5 - Nghe', score: 78, totalQuestions: 25, correctAnswers: 19, time: '2 giờ trước' }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Kiểm tra & Đánh giá</h1>
        <p className="text-gray-600">Luyện tập và kiểm tra kiến thức của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* D1: Theo cấp độ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaGraduationCap className="text-green-600" />
                D1: Theo cấp độ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testData.levels.map((level) => (
                  <div key={level.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{level.name}</h3>
                      <Badge variant={level.progress > 0 ? "default" : "secondary"}>
                        {level.completedTests}/{level.totalTests}
                      </Badge>
                    </div>
                    <Progress value={level.progress} className="mb-3" />
                    <div className="flex justify-between text-sm text-gray-600 mb-3">
                      <span>Tiến độ: {level.progress}%</span>
                      <span>{level.completedTests} bài đã làm</span>
                    </div>
                    <Button 
                      className="w-full" 
                      variant={level.progress > 0 ? "default" : "outline"}
                      disabled={level.progress === 0}
                    >
                      <FaPlay className="mr-2" />
                      Làm bài test
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* D2: Theo kỹ năng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaChartBar className="text-blue-600" />
                D2: Theo kỹ năng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testData.skills.map((skill) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={skill.id} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                      <IconComponent className={`text-2xl mx-auto mb-3 ${skill.color}`} />
                      <h3 className="font-semibold mb-2">{skill.name}</h3>
                      <Progress value={skill.progress} className="mb-3" />
                      <div className="text-sm text-gray-600 mb-3">
                        Tiến độ: {skill.progress}%
                      </div>
                      <Button className="w-full" variant="outline">
                        Luyện tập
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* D3: Mini test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaClock className="text-orange-600" />
                D3: Mini test (Sau mỗi bài học)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testData.miniTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {test.status === 'completed' ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : test.status === 'pending' ? (
                        <FaExclamationTriangle className="text-orange-500" />
                      ) : (
                        <FaClock className="text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium">{test.lesson}</div>
                        <div className="text-sm text-gray-600">{test.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {test.score && (
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{test.score}%</div>
                          <div className="text-xs text-gray-600">Điểm số</div>
                        </div>
                      )}
                      <Button 
                        variant={test.status === 'completed' ? "outline" : "default"}
                        disabled={test.status === 'locked'}
                      >
                        {test.status === 'completed' ? 'Xem lại' : 
                         test.status === 'pending' ? 'Làm bài' : 'Khóa'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* D4: AI tạo đề kiểm tra cá nhân hóa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaRobot className="text-purple-600" />
                D4: AI tạo đề kiểm tra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testData.aiRecommendations.map((rec) => (
                  <div key={rec.id} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-2">
                      <FaLightbulb className={`text-sm mt-0.5 ${
                        rec.priority === 'high' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm">{rec.message}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {rec.priority === 'high' ? 'Ưu tiên cao' : 'Gợi ý'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <FaRobot className="mr-2" />
                  Tạo đề tùy chỉnh
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* D5 & D6: AI chấm bài & Phân tích kết quả */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaChartBar className="text-green-600" />
                D5 & D6: Kết quả gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testData.recentResults.map((result) => (
                  <div key={result.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-sm">{result.testName}</div>
                      <Badge variant={result.score >= 80 ? "default" : result.score >= 60 ? "secondary" : "destructive"}>
                        {result.score}%
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Đúng: {result.correctAnswers}/{result.totalQuestions}</div>
                      <div>Thời gian: {result.time}</div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2">
                      Xem chi tiết
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="default">
                <FaPlay className="mr-2" />
                Làm bài test mới
              </Button>
              <Button className="w-full" variant="outline">
                <FaChartBar className="mr-2" />
                Xem báo cáo
              </Button>
              <Button className="w-full" variant="outline">
                <FaRobot className="mr-2" />
                Hỏi AI Coach
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}