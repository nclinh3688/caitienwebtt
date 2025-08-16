'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaTrophy, 
  FaMedal, 
  FaStar, 
  FaFire, 
  FaUsers, 
  FaCrown,
  FaGift,
  FaChartLine,
  FaBullseye,
  FaRocket,
  FaGem,
  FaHeart,
  FaLightbulb,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaCalendar,
  FaGraduationCap,
  FaBook,
  FaBrain,
  FaMagic
} from 'react-icons/fa';

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  rank: string;
  streak: number;
  achievements: Achievement[];
  studyGroups: StudyGroup[];
  rewards: Reward[];
  stats: UserStats;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'challenge' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  progress: number;
  maxProgress: number;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  level: string;
  subject: string;
  isPublic: boolean;
  joinDate: Date;
  role: 'leader' | 'moderator' | 'member';
}

interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'title' | 'item' | 'bonus';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
  isActive: boolean;
}

interface UserStats {
  totalLessons: number;
  completedLessons: number;
  totalTime: number;
  averageScore: number;
  perfectScores: number;
  challengesCompleted: number;
  friendsInvited: number;
  studySessions: number;
}

interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  category: string;
  period: 'daily' | 'weekly' | 'monthly' | 'allTime';
}

export default function EnhancedGamification() {
  const [user, setUser] = useState<User | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGamificationData();
  }, []);

  const fetchGamificationData = async () => {
    try {
      // Mock data for demo
      const mockUser: User = {
        id: 'user-001',
        name: 'Nguyễn Văn A',
        avatar: '👨‍🎓',
        level: 15,
        experience: 8750,
        rank: 'Gold',
        streak: 7,
        achievements: [
          {
            id: '1',
            name: 'First Steps',
            description: 'Hoàn thành bài học đầu tiên',
            icon: '🌱',
            category: 'learning',
            rarity: 'common',
            unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
            progress: 1,
            maxProgress: 1
          },
          {
            id: '2',
            name: 'Streak Master',
            description: 'Duy trì streak 7 ngày liên tiếp',
            icon: '🔥',
            category: 'challenge',
            rarity: 'rare',
            unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            progress: 7,
            maxProgress: 7
          },
          {
            id: '3',
            name: 'Perfect Score',
            description: 'Đạt điểm tuyệt đối 10 lần',
            icon: '⭐',
            category: 'learning',
            rarity: 'epic',
            unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
            progress: 10,
            maxProgress: 10
          }
        ],
        studyGroups: [
          {
            id: '1',
            name: 'N5 Study Group',
            description: 'Nhóm học tiếng Nhật N5',
            members: 24,
            maxMembers: 30,
            level: 'N5',
            subject: 'Japanese',
            isPublic: true,
            joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
            role: 'leader'
          },
          {
            id: '2',
            name: 'Grammar Masters',
            description: 'Chuyên sâu ngữ pháp tiếng Nhật',
            members: 12,
            maxMembers: 20,
            level: 'N4-N3',
            subject: 'Japanese Grammar',
            isPublic: false,
            joinDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
            role: 'member'
          }
        ],
        rewards: [
          {
            id: '1',
            name: 'Gold Badge',
            description: 'Huy hiệu vàng cho thành tích xuất sắc',
            type: 'badge',
            rarity: 'rare',
            earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
            isActive: true
          },
          {
            id: '2',
            name: 'Study Champion',
            description: 'Danh hiệu nhà vô địch học tập',
            type: 'title',
            rarity: 'epic',
            earnedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
            isActive: true
          }
        ],
        stats: {
          totalLessons: 156,
          completedLessons: 142,
          totalTime: 2840,
          averageScore: 87.5,
          perfectScores: 23,
          challengesCompleted: 45,
          friendsInvited: 8,
          studySessions: 67
        }
      };

      const mockLeaderboard: LeaderboardEntry[] = [
        {
          rank: 1,
          user: mockUser,
          score: 8750,
          category: 'Overall',
          period: 'monthly'
        },
        {
          rank: 2,
          user: { ...mockUser, id: 'user-002', name: 'Trần Thị B', avatar: '👩‍🎓' },
          score: 8200,
          category: 'Overall',
          period: 'monthly'
        },
        {
          rank: 3,
          user: { ...mockUser, id: 'user-003', name: 'Lê Văn C', avatar: '👨‍🎓' },
          score: 7850,
          category: 'Overall',
          period: 'monthly'
        }
      ];

      setUser(mockUser);
      setLeaderboard(mockLeaderboard);
    } catch (error) {
      console.error('Failed to fetch gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '🥉';
      case 'rare': return '🥈';
      case 'epic': return '🥇';
      case 'legendary': return '👑';
      default: return '🥉';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return '📚';
      case 'social': return '👥';
      case 'challenge': return '🎯';
      case 'special': return '✨';
      default: return '📚';
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-blue-600 bg-blue-100';
      case 'Diamond': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* User Profile & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="text-6xl mb-4">{user?.avatar}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{user?.name}</h2>
            <Badge className={`mb-3 ${getRankColor(user?.rank || '')}`}>
              {user?.rank} Rank
            </Badge>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Level</span>
                <span className="font-bold text-blue-600">{user?.level}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Experience</span>
                <span className="font-bold text-green-600">{user?.experience?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Streak</span>
                <span className="font-bold text-orange-600 flex items-center gap-1">
                  <FaFire className="text-orange-500" />
                  {user?.streak} ngày
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartLine className="text-blue-600" />
              Tiến độ học tập
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {user?.stats.totalLessons}
                </div>
                <div className="text-sm text-gray-600">Tổng bài học</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {user?.stats.completedLessons}
                </div>
                <div className="text-sm text-gray-600">Đã hoàn thành</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {user?.stats.averageScore}%
                </div>
                <div className="text-sm text-gray-600">Điểm trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {user?.stats.totalTime}h
                </div>
                <div className="text-sm text-gray-600">Tổng thời gian</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Tiến độ level</span>
                <span className="text-sm text-gray-600">
                  {Math.floor((user?.experience || 0) % 1000)} / 1000 XP
                </span>
              </div>
              <Progress 
                value={((user?.experience || 0) % 1000) / 10} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRocket className="text-orange-600" />
            Hành động nhanh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <FaUsers className="text-2xl text-blue-600" />
              <span className="text-sm font-medium">Tìm nhóm học</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-green-50 hover:border-green-300 transition-all"
            >
              <FaTrophy className="text-2xl text-green-600" />
              <span className="text-sm font-medium">Tham gia thi đua</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <FaGift className="text-2xl text-purple-600" />
              <span className="text-sm font-medium">Nhận phần thưởng</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-24 p-4 hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <FaBullseye className="text-2xl text-orange-600" />
              <span className="text-sm font-medium">Đặt mục tiêu</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCrown className="text-yellow-600" />
            Bảng xếp hạng tháng này
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div key={entry.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  entry.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                  entry.rank === 2 ? 'bg-gray-100 text-gray-600' :
                  entry.rank === 3 ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                </div>
                
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-2xl">{entry.user.avatar}</div>
                  <div>
                    <div className="font-medium text-gray-900">{entry.user.name}</div>
                    <div className="text-sm text-gray-500">Level {entry.user.level}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-gray-900">{entry.score.toLocaleString()} XP</div>
                  <Badge className={`text-xs ${getRankColor(entry.user.rank)}`}>
                    {entry.user.rank}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Thành tích & Huy hiệu</h2>
        <Badge className="bg-green-100 text-green-800">
          {user?.achievements.length} / 50 đã mở khóa
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.achievements.map((achievement) => (
          <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-2">{achievement.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                    {getRarityIcon(achievement.rarity)} {achievement.rarity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getCategoryIcon(achievement.category)} {achievement.category}
                  </Badge>
                </div>
                
                <div className="text-xs text-gray-500">
                  Mở khóa: {achievement.unlockedAt.toLocaleDateString('vi-VN')}
                </div>
                
                {achievement.maxProgress > 1 && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Tiến độ</span>
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2" 
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStudyGroups = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Nhóm học tập</h2>
        <Button>
          <FaUsers className="mr-2" />
          Tạo nhóm mới
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user?.studyGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <Badge className={group.isPublic ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                  {group.isPublic ? 'Công khai' : 'Riêng tư'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{group.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Môn học:</span>
                  <div className="font-medium">{group.subject}</div>
                </div>
                <div>
                  <span className="text-gray-500">Cấp độ:</span>
                  <div className="font-medium">{group.level}</div>
                </div>
                <div>
                  <span className="text-gray-500">Thành viên:</span>
                  <div className="font-medium">{group.members}/{group.maxMembers}</div>
                </div>
                <div>
                  <span className="text-gray-500">Vai trò:</span>
                  <div className="font-medium capitalize">{group.role}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">
                  Tham gia: {group.joinDate.toLocaleDateString('vi-VN')}
                </span>
                <Button size="sm" variant="outline">
                  <FaUsers className="mr-1" />
                  Quản lý
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Phần thưởng & Danh hiệu</h2>
        <Badge className="bg-purple-100 text-purple-800">
          {user?.rewards.filter(r => r.isActive).length} đang hoạt động
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user?.rewards.map((reward) => (
          <Card key={reward.id} className={`hover:shadow-lg transition-shadow ${
            reward.isActive ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
          }`}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">
                {reward.type === 'badge' ? '🏆' : 
                 reward.type === 'title' ? '👑' : 
                 reward.type === 'item' ? '🎁' : '⭐'}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Badge className={`text-xs ${getRarityColor(reward.rarity)}`}>
                    {getRarityIcon(reward.rarity)} {reward.rarity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {reward.type}
                  </Badge>
                </div>
                
                <div className="text-xs text-gray-500">
                  Nhận: {reward.earnedAt.toLocaleDateString('vi-VN')}
                </div>
                
                <Badge className={reward.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                  {reward.isActive ? 'Đang hoạt động' : 'Đã hết hạn'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'achievements', label: 'Thành tích', icon: FaTrophy },
    { id: 'studyGroups', label: 'Nhóm học', icon: FaUsers },
    { id: 'rewards', label: 'Phần thưởng', icon: FaGift }
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang tải hệ thống gamification...</h2>
        <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  if (!user) {
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaTrophy className="text-yellow-600" />
            Enhanced Gamification
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống gamification nâng cao với thành tích, nhóm học và phần thưởng
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaGift className="mr-2" />
            Nhận phần thưởng
          </Button>
          <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
            <FaRocket className="mr-2" />
            Khởi chạy
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'achievements' && renderAchievements()}
      {activeTab === 'studyGroups' && renderStudyGroups()}
      {activeTab === 'rewards' && renderRewards()}
    </div>
  );
}
