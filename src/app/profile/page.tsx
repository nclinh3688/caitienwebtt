'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  FaUser, 
  FaEnvelope, 
  FaCalendar, 
  FaCog, 
  FaBell,
  FaShieldAlt,
  FaLanguage,
  FaPalette,
  FaDownload,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaTrophy,
  FaChartLine,
  FaHeadphones
} from 'react-icons/fa';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: 'Học viên chăm chỉ tại PHÚC KHIÊM EDU',
    phone: '+84 123 456 789',
    dateOfBirth: '1990-01-01',
    location: 'Hà Nội, Việt Nam',
    nativeLanguage: 'Tiếng Việt',
    learningLanguages: ['Tiếng Nhật', 'Tiếng Anh'],
    studyGoal: 'JLPT N2',
    dailyStudyTime: 60,
    joinDate: '2024-01-15'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    weeklyReports: true,
    darkMode: false,
    autoPlayAudio: true,
    showProgress: true,
    publicProfile: false
  });

  const [achievements] = useState([
    { id: 1, name: 'Học viên chăm chỉ', icon: '🏆', date: '2024-01-20', description: 'Hoàn thành 10 bài học đầu tiên' },
    { id: 2, name: 'Người nghe giỏi', icon: '🎧', date: '2024-01-25', description: 'Luyện nghe 5 giờ liên tiếp' },
    { id: 3, name: 'Master Kanji', icon: '✍️', date: '2024-02-01', description: 'Học thuộc 100 kanji cơ bản' },
    { id: 4, name: 'Streak Master', icon: '🔥', date: '2024-02-10', description: 'Học liên tiếp 30 ngày' }
  ]);

  const [certificates] = useState([
    { id: 1, name: 'JLPT N5', status: 'Đã hoàn thành', date: '2024-01-30', score: '85/100' },
    { id: 2, name: 'HSK 1', status: 'Đang học', date: null, score: null },
    { id: 3, name: 'TOEIC', status: 'Chưa bắt đầu', date: null, score: null }
  ]);

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-12 text-center">Đang tải...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="container mx-auto px-4 py-12 text-center">Vui lòng đăng nhập để xem Profile</div>;
  }

  const handleSave = async () => {
    // TODO: Implement save to API
    setIsEditing(false);
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ cá nhân</h1>
        <p className="text-gray-600">Quản lý thông tin và cài đặt tài khoản</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FaUser className="text-blue-600" />
                Thông tin cá nhân
              </CardTitle>
              <Button
                variant={isEditing ? "outline" : "default"}
                size="sm"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <FaSave className="mr-2" />
                    Lưu
                  </>
                ) : (
                  <>
                    <FaEdit className="mr-2" />
                    Chỉnh sửa
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={session?.user?.image || '/default-avatar.png'}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                      <FaCamera size={12} />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{session?.user?.name}</h3>
                  <p className="text-gray-600">{session?.user?.email}</p>
                  <Badge variant="secondary">Thành viên từ {profileData.joinDate}</Badge>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Địa chỉ</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="studyGoal">Mục tiêu học tập</Label>
                  <Input
                    id="studyGoal"
                    value={profileData.studyGoal}
                    onChange={(e) => setProfileData(prev => ({ ...prev, studyGoal: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Giới thiệu</Label>
                <textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-md resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaTrophy className="text-yellow-600" />
                Thành tích
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-medium">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaShieldAlt className="text-green-600" />
                Chứng chỉ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-gray-600">
                        {cert.status} {cert.score && `- ${cert.score}`}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        cert.status === 'Đã hoàn thành' ? 'default' : 
                        cert.status === 'Đang học' ? 'secondary' : 'outline'
                      }
                    >
                      {cert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaCog className="text-gray-600" />
                Cài đặt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaBell className="text-gray-600" />
                    <span>Thông báo email</span>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaBell className="text-gray-600" />
                    <span>Thông báo push</span>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-gray-600" />
                    <span>Nhắc nhở học tập</span>
                  </div>
                  <Switch
                    checked={settings.studyReminders}
                    onCheckedChange={(checked) => handleSettingChange('studyReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaChartLine className="text-gray-600" />
                    <span>Báo cáo hàng tuần</span>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaPalette className="text-gray-600" />
                    <span>Chế độ tối</span>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaHeadphones className="text-gray-600" />
                    <span>Tự động phát âm thanh</span>
                  </div>
                  <Switch
                    checked={settings.autoPlayAudio}
                    onCheckedChange={(checked) => handleSettingChange('autoPlayAudio', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaShieldAlt className="text-red-600" />
                Tài khoản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FaDownload className="mr-2" />
                Xuất dữ liệu
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <FaTrash className="mr-2" />
                Xóa tài khoản
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}