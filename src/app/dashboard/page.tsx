'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FaChartLine, 
  FaTrophy, 
  FaCalendarAlt, 
  FaBell, 
  FaRobot,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaStar,
  FaClock,
  FaLightbulb,
  FaExclamationTriangle
} from 'react-icons/fa';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [userProgress, setUserProgress] = useState({
    completedLessons: 12,
    totalLessons: 50,
    currentStreak: 7,
    totalStudyTime: 45,
    weakAreas: ['Ngữ pháp', 'Kanji'],
    achievements: [
      { id: 1, name: 'Học viên chăm chỉ', icon: '🏆', description: 'Hoàn thành 10 bài học đầu tiên' },
      { id: 2, name: 'Người nghe giỏi', icon: '🎧', description: 'Luyện nghe 5 giờ liên tiếp' },
      { id: 3, name: 'Master Kanji', icon: '✍️', description: 'Học thuộc 100 kanji cơ bản' }
    ],
    certificates: [
      { id: 1, name: 'JLPT N5', status: 'Đang học', progress: 60 },
      { id: 2, name: 'HSK 1', status: 'Chưa bắt đầu', progress: 0 }
    ],
    schedule: [
      { id: 1, type: 'Lớp học', title: 'Luyện phát âm với cô Mai', time: '14:00 - 15:30', date: 'Hôm nay' },
      { id: 2, type: 'Deadline', title: 'Nộp bài tập Bài 5', time: '23:59', date: 'Ngày mai' }
    ],
    notifications: [
      { id: 1, type: 'reminder', message: 'Đã đến giờ ôn tập từ vựng', time: '5 phút trước' },
      { id: 2, type: 'achievement', message: 'Chúc mừng! Bạn đã hoàn thành Bài 3', time: '1 giờ trước' }
    ],
    aiSuggestions: [
      { id: 1, type: 'study', message: 'Dựa trên tiến trình, bạn nên ôn lại ngữ pháp Bài 2', priority: 'high' },
      { id: 2, type: 'practice', message: 'Thử làm bài test nghe để cải thiện kỹ năng', priority: 'medium' }
    ]
  });

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-12 text-center">Đang tải...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="container mx-auto px-4 py-12 text-center">Vui lòng đăng nhập để xem Dashboard</div>;
  }

  const progressPercentage = (userProgress.completedLessons / userProgress.totalLessons) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Xin chào, {session?.user?.name || session?.user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-gray-600">Theo dõi tiến trình học tập của bạn</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* B1: Tiến trình học */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FaChartLine className="text-green-600" />
                Tiến trình học
              </CardTitle>
              <Badge variant="secondary">{userProgress.completedLessons}/{userProgress.totalLessons} bài học</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* B1A: Tỷ lệ hoàn thành */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Tỷ lệ hoàn thành</span>
                    <span className="text-sm text-gray-600">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                
                {/* B1B: Điểm yếu cần cải thiện */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FaExclamationTriangle className="text-orange-500" />
                    Điểm yếu cần cải thiện
                  </h4>
                  <div className="flex gap-2">
                    {userProgress.weakAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="text-orange-600 border-orange-200">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userProgress.currentStreak}</div>
                    <div className="text-sm text-gray-600">Ngày liên tiếp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{userProgress.totalStudyTime}h</div>
                    <div className="text-sm text-gray-600">Tổng thời gian</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{userProgress.achievements.length}</div>
                    <div className="text-sm text-gray-600">Thành tích</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* B2: Thành tích */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                Thành tích
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* B2A: Chứng chỉ */}
                <div>
                  <h4 className="font-medium mb-3">Chứng chỉ</h4>
                  <div className="space-y-3">
                    {userProgress.certificates.map((cert) => (
                      <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-gray-600">{cert.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{cert.progress}%</div>
                          <Progress value={cert.progress} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* B2B: Huy hiệu */}
                <div>
                  <h4 className="font-medium mb-3">Huy hiệu</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {userProgress.achievements.map((achievement) => (
                      <div key={achievement.id} className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <div className="text-2xl mb-1">{achievement.icon}</div>
                        <div className="text-sm font-medium">{achievement.name}</div>
                        <div className="text-xs text-gray-600">{achievement.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* B3: Lịch học */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                Lịch học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProgress.schedule.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      item.type === 'Lớp học' ? 'bg-blue-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <FaClock className="text-gray-400" />
                        {item.time} - {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* B4: Thông báo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaBell className="text-red-500" />
                Thông báo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProgress.notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.type === 'reminder' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm">{notification.message}</div>
                      <div className="text-xs text-gray-600">{notification.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* B5: Coach AI cá nhân */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaRobot className="text-purple-600" />
                Coach AI cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProgress.aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-2">
                      <FaLightbulb className={`text-sm mt-0.5 ${
                        suggestion.priority === 'high' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{suggestion.message}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {suggestion.priority === 'high' ? 'Ưu tiên cao' : 'Gợi ý'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <FaRobot className="mr-2" />
                  Hỏi AI Coach
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
