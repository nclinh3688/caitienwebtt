'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaBook, 
  FaUsers, 
  FaChartBar, 
  FaPlus, 
  FaEdit, 
  FaEye,
  FaUpload,
  FaDownload,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaFire,
  FaTrophy
} from 'react-icons/fa';

interface DashboardStats {
  totalLessons: number;
  totalCourses: number;
  totalUsers: number;
  activeUsers: number;
  lessonsPublished: number;
  lessonsDraft: number;
  recentActivity: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

interface RecentActivity {
  id: string;
  type: 'lesson_created' | 'lesson_updated' | 'user_registered' | 'course_published';
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data for demo
      const mockStats: DashboardStats = {
        totalLessons: 156,
        totalCourses: 12,
        totalUsers: 2847,
        activeUsers: 1893,
        lessonsPublished: 142,
        lessonsDraft: 14,
        recentActivity: 23,
        systemHealth: 'excellent'
      };

      const mockActivities: RecentActivity[] = [
        {
          id: '1',
          type: 'lesson_created',
          title: 'Bài học mới được tạo',
          description: 'N5 Lesson 15 - Ngữ pháp cơ bản',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          user: 'Admin User',
          status: 'completed'
        },
        {
          id: '2',
          type: 'user_registered',
          title: 'Người dùng mới đăng ký',
          description: 'Nguyễn Văn A - nguyenvana@email.com',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          user: 'System',
          status: 'completed'
        },
        {
          id: '3',
          type: 'course_published',
          title: 'Khóa học được xuất bản',
          description: 'JLPT N4 Complete Course',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          user: 'Admin User',
          status: 'completed'
        },
        {
          id: '4',
          type: 'lesson_updated',
          title: 'Bài học được cập nhật',
          description: 'N5 Lesson 8 - Từ vựng mới',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          user: 'Admin User',
          status: 'completed'
        }
      ];

      setStats(mockStats);
      setRecentActivities(mockActivities);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSystemHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent': return <FaCheckCircle className="text-green-500" />;
      case 'good': return <FaCheckCircle className="text-blue-500" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
      case 'critical': return <FaExclamationTriangle className="text-red-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson_created': return <FaBook className="text-blue-500" />;
      case 'lesson_updated': return <FaEdit className="text-green-500" />;
      case 'user_registered': return <FaUsers className="text-purple-500" />;
      case 'course_published': return <FaStar className="text-yellow-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang tải dữ liệu...</h2>
        <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  if (!stats) {
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Quản lý toàn bộ hệ thống PHÚC KHIÊM EDU
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex items-center gap-2">
            <FaPlus />
            Tạo bài học mới
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <FaUpload />
            Import dữ liệu
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng bài học</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalLessons}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.lessonsPublished} đã xuất bản, {stats.lessonsDraft} bản nháp
                </p>
              </div>
              <div className="text-blue-500 text-3xl">📚</div>
            </div>
            <Progress 
              value={(stats.lessonsPublished / stats.totalLessons) * 100} 
              className="mt-4" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng khóa học</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalCourses}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Đang hoạt động
                </p>
              </div>
              <div className="text-green-500 text-3xl">🎓</div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <FaCheckCircle className="mr-1 h-3 w-3" />
                Hoạt động tốt
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.activeUsers} đang hoạt động
                </p>
              </div>
              <div className="text-purple-500 text-3xl">👥</div>
            </div>
            <Progress 
              value={(stats.activeUsers / stats.totalUsers) * 100} 
              className="mt-4" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tình trạng hệ thống</p>
                <div className="flex items-center gap-2 mt-2">
                  {getSystemHealthIcon(stats.systemHealth)}
                  <span className={`text-lg font-bold ${getSystemHealthColor(stats.systemHealth)}`}>
                    {stats.systemHealth === 'excellent' ? 'Xuất sắc' :
                     stats.systemHealth === 'good' ? 'Tốt' :
                     stats.systemHealth === 'warning' ? 'Cảnh báo' : 'Kritisk'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Tất cả dịch vụ hoạt động bình thường
                </p>
              </div>
              <div className="text-green-500 text-3xl">✅</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaFire className="text-orange-600" />
              Hành động nhanh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24 p-4"
                onClick={() => window.open('/admin/lessons/create', '_blank')}
              >
                <FaBook className="text-2xl text-blue-600" />
                <span className="text-sm font-medium">Tạo bài học</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24 p-4"
                onClick={() => window.open('/admin/courses/create', '_blank')}
              >
                <FaStar className="text-2xl text-green-600" />
                <span className="text-sm font-medium">Tạo khóa học</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24 p-4"
                onClick={() => window.open('/admin/users', '_blank')}
              >
                <FaUsers className="text-2xl text-purple-600" />
                <span className="text-sm font-medium">Quản lý người dùng</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 h-24 p-4"
                onClick={() => window.open('/admin/analytics', '_blank')}
              >
                <FaChartBar className="text-2xl text-orange-600" />
                <span className="text-sm font-medium">Xem phân tích</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaClock className="text-blue-600" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">
                        {activity.timestamp.toLocaleString('vi-VN')}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{activity.user}</span>
                    </div>
                  </div>
                  
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status === 'completed' ? 'Hoàn thành' :
                     activity.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" className="w-full">
                Xem tất cả hoạt động
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy className="text-yellow-600" />
            Trạng thái hệ thống
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">✅</div>
              <h4 className="font-medium text-green-800">Database</h4>
              <p className="text-sm text-green-600">Hoạt động bình thường</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">✅</div>
              <h4 className="font-medium text-blue-800">API Services</h4>
              <p className="text-sm text-blue-600">Tất cả endpoints OK</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">✅</div>
              <h4 className="font-medium text-purple-800">File Storage</h4>
              <p className="text-sm text-purple-600">Upload/Download OK</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
