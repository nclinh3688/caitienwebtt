'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FaBell, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle,
  FaTimes,
  FaStar,
  FaTrophy,
  FaLightbulb
} from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: string;
}

interface AnalyticsNotificationsProps {
  userId: string;
}

export function AnalyticsNotifications({ userId }: AnalyticsNotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    fetchAchievements();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      // Mock data for demo
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'success',
          title: 'Hoàn thành bài học!',
          message: 'Bạn đã hoàn thành bài học "N5 Lesson 5" với điểm số 95%',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 phút trước
          read: false,
          actionUrl: '/courses/japanese/n5/lesson-5'
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Đạt được thành tích mới!',
          message: 'Chúc mừng! Bạn đã đạt được "Học viên chăm chỉ" - học liên tiếp 7 ngày',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 giờ trước
          read: false
        },
        {
          id: '3',
          type: 'warning',
          title: 'Cần cải thiện kỹ năng',
          message: 'Kỹ năng Kanji của bạn cần được cải thiện. Hãy luyện tập thêm!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 giờ trước
          read: true
        },
        {
          id: '4',
          type: 'info',
          title: 'Lịch học tuần mới',
          message: 'Tuần này bạn có 5 bài học mới để hoàn thành. Hãy lên kế hoạch học tập!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 giờ trước
          read: true
        }
      ];
      
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      // Mock data for demo
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'Học viên chăm chỉ',
          description: 'Học liên tiếp 7 ngày',
          icon: '🔥',
          unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
          category: 'Consistency'
        },
        {
          id: '2',
          title: 'Từ vựng xuất sắc',
          description: 'Học được 100 từ vựng mới',
          icon: '📚',
          unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
          category: 'Vocabulary'
        },
        {
          id: '3',
          title: 'Ngữ pháp vững vàng',
          description: 'Hoàn thành 20 bài tập ngữ pháp',
          icon: '📝',
          unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          category: 'Grammar'
        },
        {
          id: '4',
          title: 'Phát âm chuẩn xác',
          description: 'Đạt điểm phát âm trên 90%',
          icon: '🎯',
          unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          category: 'Pronunciation'
        }
      ];
      
      setAchievements(mockAchievements);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <FaCheckCircle className="text-green-500" />;
      case 'warning': return <FaExclamationTriangle className="text-yellow-500" />;
      case 'info': return <FaInfoCircle className="text-blue-500" />;
      case 'achievement': return <FaTrophy className="text-purple-500" />;
      default: return <FaBell className="text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      case 'achievement': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Vừa xong';
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ngày trước`;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin text-blue-500 text-2xl mb-2">⚡</div>
        <p>Đang tải thông báo...</p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Notifications Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaBell className="text-blue-600" />
          Thông báo & Cập nhật
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} mới
            </Badge>
          )}
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        >
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông báo gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaBell className="text-3xl mx-auto mb-2" />
                <p>Không có thông báo nào</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'ring-2 ring-blue-200' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">
                                Mới
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-2">
                          {notification.actionUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(notification.actionUrl, '_blank')}
                            >
                              Xem
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <FaTimes className="text-gray-400 hover:text-gray-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!notification.read && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Đánh dấu đã đọc
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FaTrophy className="text-yellow-600" />
            Thành tích đạt được
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(achievement.unlockedAt)}
                      </span>
                    </div>
                  </div>
                  <FaStar className="text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FaLightbulb className="text-orange-600" />
            Hành động nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-2 h-20"
              onClick={() => window.open('/courses/japanese/n5', '_blank')}
            >
              <span className="text-lg">📚</span>
              <span className="text-xs">Tiếp tục học</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-2 h-20"
              onClick={() => window.open('/test/mini', '_blank')}
            >
              <span className="text-lg">🧪</span>
              <span className="text-xs">Làm bài test</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-2 h-20"
              onClick={() => window.open('/practice/ai-generated', '_blank')}
            >
              <span className="text-lg">🤖</span>
              <span className="text-xs">AI Practice</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex flex-col items-center gap-2 h-20"
              onClick={() => window.open('/profile', '_blank')}
            >
              <span className="text-lg">👤</span>
              <span className="text-xs">Hồ sơ</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
