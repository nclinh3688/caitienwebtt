'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCamera,
  FaEdit,
  FaBook,
  FaBookmark,
  FaTrophy,
  FaStar,
  FaCog,
  FaRobot,
  FaChartLine,
  FaLightbulb,
  FaDownload,
  FaShare,
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    basic: {
      name: session?.user?.name || 'Nguyễn Văn A',
      email: session?.user?.email || 'nguyenvana@email.com',
      phone: '0901234567',
      location: 'TP.HCM, Việt Nam',
      avatar: '👤',
      joinDate: '15/03/2024',
      lastActive: '2 giờ trước',
      bio: 'Học viên chăm chỉ, đam mê học ngoại ngữ và văn hóa Nhật Bản.'
    },
    learning: {
      enrolledCourses: [
        {
          id: 1,
          name: 'JLPT N5 Cơ bản',
          language: 'Tiếng Nhật',
          progress: 75,
          totalLessons: 20,
          completedLessons: 15,
          startDate: '01/03/2024',
          estimatedCompletion: '15/04/2024'
        },
        {
          id: 2,
          name: 'HSK 1 Cơ bản',
          language: 'Tiếng Trung',
          progress: 45,
          totalLessons: 15,
          completedLessons: 7,
          startDate: '10/03/2024',
          estimatedCompletion: '25/04/2024'
        }
      ],
      savedLessons: [
        {
          id: 1,
          title: 'Bài 3: Gia đình',
          course: 'JLPT N5',
          savedDate: '2 ngày trước',
          tags: ['Ngữ pháp', 'Từ vựng']
        },
        {
          id: 2,
          title: 'Bài 5: Công việc',
          course: 'JLPT N5',
          savedDate: '1 tuần trước',
          tags: ['Hội thoại', 'Luyện nghe']
        },
        {
          id: 3,
          title: 'Bài 2: Chào hỏi',
          course: 'HSK 1',
          savedDate: '3 ngày trước',
          tags: ['Phát âm', 'Giao tiếp']
        }
      ]
    },
    achievements: {
      certificates: [
        {
          id: 1,
          name: 'JLPT N5',
          status: 'Đang học',
          progress: 75,
          issueDate: null,
          expiryDate: null
        },
        {
          id: 2,
          name: 'HSK 1',
          status: 'Chưa bắt đầu',
          progress: 45,
          issueDate: null,
          expiryDate: null
        }
      ],
      scores: [
        {
          id: 1,
          testName: 'Mini Test - Bài 1',
          score: 92,
          totalQuestions: 10,
          correctAnswers: 9,
          date: '10/03/2024'
        },
        {
          id: 2,
          testName: 'Full Test N5 - Nghe',
          score: 78,
          totalQuestions: 25,
          correctAnswers: 19,
          date: '08/03/2024'
        },
        {
          id: 3,
          testName: 'HSK 1 - Từ vựng',
          score: 85,
          totalQuestions: 20,
          correctAnswers: 17,
          date: '05/03/2024'
        }
      ],
      badges: [
        {
          id: 1,
          name: 'Học viên chăm chỉ',
          icon: '🏆',
          description: 'Hoàn thành 10 bài học đầu tiên',
          earnedDate: '05/03/2024'
        },
        {
          id: 2,
          name: 'Người nghe giỏi',
          icon: '🎧',
          description: 'Luyện nghe 5 giờ liên tiếp',
          earnedDate: '08/03/2024'
        },
        {
          id: 3,
          name: 'Master Kanji',
          icon: '✍️',
          description: 'Học thuộc 100 kanji cơ bản',
          earnedDate: '12/03/2024'
        }
      ]
    },
    aiAnalysis: {
      learningBehavior: {
        studyTime: '45 phút/ngày',
        preferredTime: '19:00 - 21:00',
        weakAreas: ['Ngữ pháp', 'Kanji'],
        strongAreas: ['Từ vựng', 'Luyện nghe'],
        learningStyle: 'Visual + Auditory'
      },
      recommendations: [
        {
          id: 1,
          type: 'study',
          message: 'Tập trung ôn lại ngữ pháp Bài 3 để cải thiện điểm yếu',
          priority: 'high'
        },
        {
          id: 2,
          type: 'practice',
          message: 'Thử làm thêm bài test nghe để phát huy thế mạnh',
          priority: 'medium'
        },
        {
          id: 3,
          type: 'schedule',
          message: 'Học vào buổi tối 19:00-21:00 sẽ hiệu quả hơn',
          priority: 'low'
        }
      ],
      portfolio: {
        totalStudyHours: 45,
        completedLessons: 22,
        averageScore: 85,
        currentStreak: 7,
        totalAchievements: 3
      }
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-12 text-center">Đang tải...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="container mx-auto px-4 py-12 text-center">Vui lòng đăng nhập để xem hồ sơ</div>;
  }

  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* G1A: Thông tin liên hệ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FaUser className="text-blue-600" />
            G1A: Thông tin liên hệ
          </CardTitle>
          <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <FaEdit className="mr-2" />
            {isEditing ? 'Lưu' : 'Chỉnh sửa'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Họ và tên</label>
                <div className="flex items-center gap-2 mt-1">
                  <FaUser className="text-gray-400" />
                  <span className="font-medium">{profileData.basic.name}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <div className="flex items-center gap-2 mt-1">
                  <FaEnvelope className="text-gray-400" />
                  <span>{profileData.basic.email}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Số điện thoại</label>
                <div className="flex items-center gap-2 mt-1">
                  <FaPhone className="text-gray-400" />
                  <span>{profileData.basic.phone}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Địa chỉ</label>
                <div className="flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>{profileData.basic.location}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Ngày tham gia</label>
                <div className="flex items-center gap-2 mt-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{profileData.basic.joinDate}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Hoạt động cuối</label>
                <div className="flex items-center gap-2 mt-1">
                  <FaClock className="text-gray-400" />
                  <span>{profileData.basic.lastActive}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Giới thiệu</label>
                <p className="mt-1 text-gray-600">{profileData.basic.bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* G1B: Ảnh đại diện */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCamera className="text-green-600" />
            G1B: Ảnh đại diện
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="text-6xl">{profileData.basic.avatar}</div>
            <div className="space-y-3">
              <Button variant="outline">
                <FaCamera className="mr-2" />
                Thay đổi ảnh đại diện
              </Button>
              <p className="text-sm text-gray-600">
                Hỗ trợ định dạng: JPG, PNG, GIF (Tối đa 5MB)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLearning = () => (
    <div className="space-y-6">
      {/* G2A: Khóa học đã đăng ký */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBook className="text-blue-600" />
            G2A: Khóa học đã đăng ký
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profileData.learning.enrolledCourses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-blue-600">{course.name}</h3>
                    <p className="text-sm text-gray-600">{course.language}</p>
                  </div>
                  <Badge variant="outline">{course.completedLessons}/{course.totalLessons} bài</Badge>
                </div>
                <Progress value={course.progress} className="mb-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tiến độ: {course.progress}%</span>
                  <span>Dự kiến hoàn thành: {course.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* G2B: Bài học đã lưu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBookmark className="text-green-600" />
            G2B: Bài học đã lưu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileData.learning.savedLessons.map((lesson) => (
              <div key={lesson.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-600 mb-1">{lesson.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{lesson.course}</p>
                <div className="flex gap-1 mb-2">
                  {lesson.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-gray-500">Lưu: {lesson.savedDate}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* G3A: Chứng chỉ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaGraduationCap className="text-purple-600" />
            G3A: Chứng chỉ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.achievements.certificates.map((cert) => (
              <div key={cert.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <Badge variant={cert.status === 'Đang học' ? 'default' : 'secondary'}>
                    {cert.status}
                  </Badge>
                </div>
                <Progress value={cert.progress} className="mb-3" />
                <div className="text-sm text-gray-600">
                  Tiến độ: {cert.progress}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* G3B: Điểm số */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaStar className="text-yellow-600" />
            G3B: Điểm số
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profileData.achievements.scores.map((score) => (
              <div key={score.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{score.testName}</div>
                  <div className="text-sm text-gray-600">
                    {score.correctAnswers}/{score.totalQuestions} câu đúng
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{score.score}%</div>
                  <div className="text-sm text-gray-600">{score.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Huy hiệu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy className="text-orange-600" />
            Huy hiệu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profileData.achievements.badges.map((badge) => (
              <div key={badge.id} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-medium mb-1">{badge.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                <div className="text-xs text-gray-500">Đạt được: {badge.earnedDate}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-gray-600" />
            G4: Cài đặt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Thông báo email</div>
                <div className="text-sm text-gray-600">Nhận thông báo qua email</div>
              </div>
              <Button variant="outline" size="sm">Bật</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Thông báo push</div>
                <div className="text-sm text-gray-600">Nhận thông báo trên trình duyệt</div>
              </div>
              <Button variant="outline" size="sm">Tắt</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Chế độ riêng tư</div>
                <div className="text-sm text-gray-600">Hiển thị hồ sơ công khai</div>
              </div>
              <Button variant="outline" size="sm">Bật</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAIAnalysis = () => (
    <div className="space-y-6">
      {/* G5: AI phân tích hành vi học tập */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRobot className="text-purple-600" />
            G5: AI phân tích hành vi học tập
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Thống kê học tập</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Tổng thời gian học:</span>
                  <span className="font-semibold">{profileData.aiAnalysis.portfolio.totalStudyHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span>Bài học đã hoàn thành:</span>
                  <span className="font-semibold">{profileData.aiAnalysis.portfolio.completedLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Điểm trung bình:</span>
                  <span className="font-semibold">{profileData.aiAnalysis.portfolio.averageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày liên tiếp:</span>
                  <span className="font-semibold">{profileData.aiAnalysis.portfolio.currentStreak}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Phân tích hành vi</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Thời gian học ưa thích:</div>
                  <div className="font-medium">{profileData.aiAnalysis.learningBehavior.preferredTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Điểm mạnh:</div>
                  <div className="flex gap-1">
                    {profileData.aiAnalysis.learningBehavior.strongAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Cần cải thiện:</div>
                  <div className="flex gap-1">
                    {profileData.aiAnalysis.learningBehavior.weakAreas.map((area, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* G5A: Lời khuyên cá nhân hóa AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaLightbulb className="text-yellow-600" />
            G5A: Lời khuyên cá nhân hóa AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {profileData.aiAnalysis.recommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <FaLightbulb className={`text-sm mt-0.5 ${
                    rec.priority === 'high' ? 'text-orange-500' : rec.priority === 'medium' ? 'text-blue-500' : 'text-green-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm">{rec.message}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {rec.priority === 'high' ? 'Ưu tiên cao' : rec.priority === 'medium' ? 'Ưu tiên trung bình' : 'Gợi ý'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* G5B: Portfolio tự động AI */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaDownload className="text-green-600" />
            G5B: Portfolio tự động AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Portfolio được tạo tự động dựa trên tiến trình học tập và thành tích của bạn.
            </p>
            <div className="flex gap-3">
              <Button>
                <FaDownload className="mr-2" />
                Tải PDF
              </Button>
              <Button variant="outline">
                <FaShare className="mr-2" />
                Chia sẻ
              </Button>
              <Button variant="outline">
                <FaEdit className="mr-2" />
                Chỉnh sửa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ cá nhân</h1>
        <p className="text-gray-600">Quản lý thông tin và theo dõi tiến trình học tập</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'basic' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('basic')}
          className="flex-1"
        >
          <FaUser className="mr-2" />
          Thông tin cơ bản
        </Button>
        <Button
          variant={activeTab === 'learning' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('learning')}
          className="flex-1"
        >
          <FaBook className="mr-2" />
          Học tập
        </Button>
        <Button
          variant={activeTab === 'achievements' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('achievements')}
          className="flex-1"
        >
          <FaTrophy className="mr-2" />
          Thành tích
        </Button>
        <Button
          variant={activeTab === 'settings' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('settings')}
          className="flex-1"
        >
          <FaCog className="mr-2" />
          Cài đặt
        </Button>
        <Button
          variant={activeTab === 'ai' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('ai')}
          className="flex-1"
        >
          <FaRobot className="mr-2" />
          AI Phân tích
        </Button>
      </div>

      {/* Content */}
      {activeTab === 'basic' && renderBasicInfo()}
      {activeTab === 'learning' && renderLearning()}
      {activeTab === 'achievements' && renderAchievements()}
      {activeTab === 'settings' && renderSettings()}
      {activeTab === 'ai' && renderAIAnalysis()}
    </div>
  );
}