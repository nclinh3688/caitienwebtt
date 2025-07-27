'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaUserTie, 
  FaCalendarAlt, 
  FaClock, 
  FaRobot,
  FaStar,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaVideo,
  FaBook,
  FaUsers,
  FaChartLine,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlay,
  FaPause
} from 'react-icons/fa';

export default function TeachersPage() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [filterLevel, setFilterLevel] = useState('all');

  const teachersData = {
    teachers: [
      {
        id: 1,
        name: 'Cô Nguyễn Thị Mai',
        avatar: '👩‍🏫',
        specialization: 'Tiếng Nhật N5-N3',
        experience: '8 năm',
        rating: 4.9,
        students: 156,
        lessons: 89,
        location: 'TP.HCM',
        languages: ['Tiếng Nhật', 'Tiếng Việt'],
        certificates: ['JLPT N1', 'Chứng chỉ sư phạm'],
        hourlyRate: 500000,
        availability: [
          { day: 'Thứ 2', time: '09:00 - 17:00' },
          { day: 'Thứ 3', time: '09:00 - 17:00' },
          { day: 'Thứ 4', time: '09:00 - 17:00' },
          { day: 'Thứ 5', time: '09:00 - 17:00' },
          { day: 'Thứ 6', time: '09:00 - 17:00' }
        ],
        description: 'Giáo viên có kinh nghiệm giảng dạy tiếng Nhật cho người Việt, chuyên về luyện thi JLPT và giao tiếp thực tế.',
        strengths: ['Ngữ pháp', 'Luyện thi JLPT', 'Giao tiếp'],
        contact: {
          phone: '0901234567',
          email: 'mai.nguyen@phuckhiem.edu.vn',
          zoom: 'mai.nguyen.zoom'
        }
      },
      {
        id: 2,
        name: 'Thầy Trần Văn Nam',
        avatar: '👨‍🏫',
        specialization: 'Tiếng Trung HSK 1-4',
        experience: '6 năm',
        rating: 4.8,
        students: 98,
        lessons: 67,
        location: 'Hà Nội',
        languages: ['Tiếng Trung', 'Tiếng Việt'],
        certificates: ['HSK 6', 'Chứng chỉ sư phạm'],
        hourlyRate: 450000,
        availability: [
          { day: 'Thứ 2', time: '14:00 - 21:00' },
          { day: 'Thứ 3', time: '14:00 - 21:00' },
          { day: 'Thứ 4', time: '14:00 - 21:00' },
          { day: 'Thứ 5', time: '14:00 - 21:00' },
          { day: 'Thứ 6', time: '14:00 - 21:00' },
          { day: 'Thứ 7', time: '09:00 - 17:00' }
        ],
        description: 'Giáo viên tiếng Trung chuyên nghiệp, có kinh nghiệm giảng dạy cho người đi làm và sinh viên.',
        strengths: ['Phát âm', 'Luyện thi HSK', 'Văn hóa Trung Quốc'],
        contact: {
          phone: '0909876543',
          email: 'nam.tran@phuckhiem.edu.vn',
          zoom: 'nam.tran.zoom'
        }
      },
      {
        id: 3,
        name: 'Cô Sarah Johnson',
        avatar: '👩‍🏫',
        specialization: 'Tiếng Anh IELTS/TOEIC',
        experience: '10 năm',
        rating: 4.9,
        students: 203,
        lessons: 145,
        location: 'TP.HCM',
        languages: ['Tiếng Anh', 'Tiếng Việt'],
        certificates: ['IELTS 8.5', 'TESOL', 'CELTA'],
        hourlyRate: 600000,
        availability: [
          { day: 'Thứ 2', time: '08:00 - 16:00' },
          { day: 'Thứ 3', time: '08:00 - 16:00' },
          { day: 'Thứ 4', time: '08:00 - 16:00' },
          { day: 'Thứ 5', time: '08:00 - 16:00' },
          { day: 'Thứ 6', time: '08:00 - 16:00' }
        ],
        description: 'Giáo viên bản ngữ có chứng chỉ quốc tế, chuyên luyện thi IELTS và TOEIC với tỷ lệ đạt mục tiêu cao.',
        strengths: ['Speaking', 'Writing', 'Luyện thi IELTS'],
        contact: {
          phone: '0905555666',
          email: 'sarah.johnson@phuckhiem.edu.vn',
          zoom: 'sarah.johnson.zoom'
        }
      }
    ],
    aiSupport: {
      suggestions: [
        {
          id: 1,
          type: 'assignment',
          message: 'Gợi ý bài tập ngữ pháp cho học viên N5 dựa trên tiến độ học',
          priority: 'high'
        },
        {
          id: 2,
          type: 'analysis',
          message: 'Phân tích tiến độ lớp N4 - 3 học viên cần hỗ trợ thêm',
          priority: 'medium'
        }
      ],
      classAnalytics: [
        {
          classId: 'N5-001',
          className: 'Lớp N5 Cơ bản',
          totalStudents: 15,
          averageProgress: 75,
          weakStudents: 3,
          strongStudents: 8,
          recentActivity: '2 giờ trước'
        },
        {
          classId: 'N4-002',
          className: 'Lớp N4 Trung cấp',
          totalStudents: 12,
          averageProgress: 68,
          weakStudents: 4,
          strongStudents: 6,
          recentActivity: '1 ngày trước'
        }
      ]
    },
    schedule: {
      upcoming: [
        {
          id: 1,
          teacher: 'Cô Mai',
          student: 'Nguyễn Văn A',
          subject: 'Tiếng Nhật N5',
          time: '14:00 - 15:30',
          date: 'Hôm nay',
          type: 'online',
          status: 'confirmed'
        },
        {
          id: 2,
          teacher: 'Thầy Nam',
          student: 'Trần Thị B',
          subject: 'Tiếng Trung HSK 2',
          time: '16:00 - 17:30',
          date: 'Ngày mai',
          type: 'offline',
          status: 'pending'
        }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Giáo viên & Lịch học</h1>
        <p className="text-gray-600">Kết nối với giáo viên chất lượng và quản lý lịch học</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* F1: Danh sách giáo viên */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaUserTie className="text-blue-600" />
                F1: Danh sách giáo viên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teachersData.teachers.map((teacher) => (
                  <Card key={teacher.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{teacher.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-blue-600">{teacher.name}</h3>
                            <div className="flex items-center gap-2">
                              <FaStar className="text-yellow-500" />
                              <span className="font-medium">{teacher.rating}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <div className="text-sm text-gray-600">Chuyên môn</div>
                              <div className="font-medium">{teacher.specialization}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Kinh nghiệm</div>
                              <div className="font-medium">{teacher.experience}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Học viên</div>
                              <div className="font-medium">{teacher.students}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Học phí/giờ</div>
                              <div className="font-medium">{teacher.hourlyRate.toLocaleString()}đ</div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{teacher.description}</p>
                          
                          <div className="flex gap-2 mb-3">
                            {teacher.strengths.map((strength, index) => (
                              <Badge key={index} variant="outline">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <FaCalendarAlt className="mr-2" />
                              Xem lịch
                            </Button>
                            <Button size="sm">
                              <FaPhone className="mr-2" />
                              Liên hệ
                            </Button>
                            <Button size="sm" variant="default">
                              <FaVideo className="mr-2" />
                              F2: Đặt lịch học
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* F3: Lịch dạy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-600" />
                F3: Lịch dạy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teachersData.schedule.upcoming.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        lesson.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="font-medium">{lesson.teacher} - {lesson.student}</div>
                        <div className="text-sm text-gray-600">{lesson.subject}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{lesson.time}</div>
                      <div className="text-sm text-gray-600">{lesson.date}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={lesson.type === 'online' ? 'default' : 'secondary'}>
                        {lesson.type}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <FaPlay className="mr-1" />
                        Tham gia
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
          {/* F4: AI hỗ trợ giáo viên */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaRobot className="text-purple-600" />
                F4: AI hỗ trợ giáo viên
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teachersData.aiSupport.suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="flex items-start gap-2">
                      <FaLightbulb className={`text-sm mt-0.5 ${
                        suggestion.priority === 'high' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm">{suggestion.message}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {suggestion.priority === 'high' ? 'Ưu tiên cao' : 'Gợi ý'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* F4A: Gợi ý bài tập AI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaBook className="text-green-600" />
                F4A: Gợi ý bài tập AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FaBook className="mr-2" />
                  Tạo bài tập tự động
                </Button>
                <Button className="w-full" variant="outline">
                  <FaChartLine className="mr-2" />
                  Phân tích độ khó
                </Button>
                <Button className="w-full" variant="outline">
                  <FaUsers className="mr-2" />
                  Điều chỉnh theo nhóm
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* F4B: Phân tích tiến độ lớp AI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaChartLine className="text-blue-600" />
                F4B: Phân tích tiến độ lớp AI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teachersData.aiSupport.classAnalytics.map((classData) => (
                  <div key={classData.classId} className="p-3 border rounded-lg">
                    <div className="font-medium text-sm mb-2">{classData.className}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Tổng học viên:</span>
                        <span>{classData.totalStudents}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Tiến độ TB:</span>
                        <span>{classData.averageProgress}%</span>
                      </div>
                      <Progress value={classData.averageProgress} className="h-2" />
                      <div className="flex justify-between text-xs">
                        <span>Cần hỗ trợ:</span>
                        <span className="text-orange-600">{classData.weakStudents}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Xuất sắc:</span>
                        <span className="text-green-600">{classData.strongStudents}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* F4C: Phát hiện học viên cần hỗ trợ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaExclamationTriangle className="text-orange-600" />
                F4C: Học viên cần hỗ trợ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="text-orange-500" />
                    <span className="font-medium text-sm">Nguyễn Văn A</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Tiến độ chậm 20% so với lớp, cần ôn lại ngữ pháp Bài 3
                  </div>
                </div>
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="text-orange-500" />
                    <span className="font-medium text-sm">Trần Thị B</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Vắng 3 buổi liên tiếp, cần liên hệ kiểm tra
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <FaPhone className="mr-2" />
                  Liên hệ hỗ trợ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}