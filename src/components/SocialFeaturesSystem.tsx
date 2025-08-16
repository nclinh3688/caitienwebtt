'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaTrophy, 
  FaCrown, 
  FaMedal, 
  FaStar, 
  FaBook, 
  FaFire, 
  FaQuestion,
  FaShare,
  FaHeart,
  FaComment,
  FaUserPlus,
  FaCheck,
  FaTimes,
  FaChartBar,
  FaUsers,
  FaEnvelope,
  FaUserCheck,
  FaGift
} from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// Imports cleaned up
// Imports cleaned up
// Imports cleaned up
// Imports cleaned up
// Icons imported as needed

// 🏆 LEADERBOARD SYSTEM
export function _LeaderboardSystem(_: unknown) {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'overall' | 'weekly' | 'monthly'>('overall');
  const [userRank, setUserRank] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, [selectedCategory]);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      // Mock data - in real implementation, fetch from API
      const mockData = [
        {
          id: '1',
          name: 'Nguyễn Văn A',
          avatar: undefined,
          points: 2840,
          level: 8,
          streak: 15,
          achievements: 12,
          rank: 1,
          category: 'overall'
        },
        {
          id: '2',
          name: 'Trần Thị B',
          avatar: undefined,
          points: 2650,
          level: 7,
          streak: 12,
          achievements: 10,
          rank: 2,
          category: 'overall'
        },
        {
          id: '3',
          name: 'Lê Văn C',
          avatar: undefined,
          points: 2480,
          level: 7,
          streak: 10,
          achievements: 9,
          rank: 3,
          category: 'overall'
        }
      ];

      setLeaderboardData(mockData);
      setUserRank(15); // Mock user rank
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FaCrown className="text-yellow-500 text-lg" />;
    if (rank === 2) return <FaMedal className="text-gray-400 text-lg" />;
    if (rank === 3) return <FaMedal className="text-amber-600 text-lg" />;
    return <FaStar className="text-blue-500 text-sm" />;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-br from-amber-400 to-amber-600';
    return 'bg-gradient-to-br from-blue-400 to-blue-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Leaderboard
        </CardTitle>
        <div className="flex gap-2">
          {(['overall', 'weekly', 'monthly'] as const).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'overall' ? 'Tổng thể' : category === 'weekly' ? 'Tuần' : 'Tháng'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <div key={user.id} className="text-center">
                <div className={`relative mx-auto w-20 h-20 rounded-full ${getRankColor(user.rank)} p-1 mb-2`}>
                  <Avatar className="w-full h-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2">
                    {getRankIcon(user.rank)}
                  </div>
                </div>
                <h4 className="font-semibold text-sm">{user.name}</h4>
                <p className="text-xs text-gray-600">{user.points} điểm</p>
                <p className="text-xs text-blue-600">Level {user.level}</p>
              </div>
            ))}
          </div>

          {/* Full Leaderboard */}
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 text-center">
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{user.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>Level {user.level}</span>
                      <span>•</span>
                      <span>{user.streak} ngày</span>
                      <span>•</span>
                      <span>{user.achievements} thành tích</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-blue-600">{user.points}</div>
                  <div className="text-xs text-gray-500">điểm</div>
                </div>
              </div>
            ))}
          </div>

          {/* User's Rank */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-800">Vị trí của bạn</h4>
                <p className="text-sm text-blue-600">Xếp hạng #{userRank} trên tổng số học viên</p>
              </div>
              <Button size="sm" variant="outline">
                <FaChartBar className="mr-2" />
                Xem chi tiết
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 👥 FRIEND SYSTEM
export function _FriendSystem(_: unknown) {
  const [friends, setFriends] = useState<any[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');

  useEffect(() => {
    fetchFriendData();
  }, []);

  const fetchFriendData = async () => {
    // Mock data
    const mockFriends = [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        avatar: undefined,
        status: 'online',
        lastActive: '2 phút trước',
        level: 8,
        studying: 'JLPT N4'
      },
      {
        id: '2',
        name: 'Trần Thị B',
        avatar: undefined,
        status: 'offline',
        lastActive: '1 giờ trước',
        level: 7,
        studying: 'HSK 3'
      }
    ];

    const mockRequests = [
      {
        id: '3',
        name: 'Lê Văn C',
        avatar: undefined,
        mutualFriends: 3,
        level: 6
      }
    ];

    const mockSuggestions = [
      {
        id: '4',
        name: 'Phạm Thị D',
        avatar: undefined,
        mutualFriends: 5,
        level: 7,
        studying: 'JLPT N3'
      }
    ];

    setFriends(mockFriends);
    setFriendRequests(mockRequests);
    setSuggestions(mockSuggestions);
  };

  const handleFriendRequest = (action: 'accept' | 'reject', friendId: string) => {
    const request = friendRequests.find(r => r.id === friendId);
    if (request) {
      if (action === 'accept') {
        // Add to friends
        setFriends(prev => [...prev, request]);
        // Remove from requests
        setFriendRequests(prev => prev.filter(r => r.id !== friendId));
      } else {
        // Remove from requests
        setFriendRequests(prev => prev.filter(r => r.id !== friendId));
      }
    }
  };

  const addFriend = (friendId: string) => {
    const suggestion = suggestions.find(s => s.id === friendId);
    if (suggestion) {
      setFriends(prev => [...prev, suggestion]);
      setSuggestions(prev => prev.filter(s => s.id !== friendId));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaUsers className="text-blue-500" />
          Bạn bè & Kết nối
        </CardTitle>
        <div className="flex gap-2">
          {(['friends', 'requests', 'suggestions'] as const).map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'friends' ? 'Bạn bè' : tab === 'requests' ? 'Lời mời' : 'Gợi ý'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'friends' && (
          <div className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{friend.name}</h4>
                    <Badge variant={friend.status === 'online' ? 'default' : 'secondary'}>
                      {friend.status === 'online' ? 'Trực tuyến' : 'Ngoại tuyến'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Level {friend.level} • Đang học {friend.studying}
                  </p>
                  <p className="text-xs text-gray-500">{friend.lastActive}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <FaEnvelope className="mr-1" />
                    Nhắn tin
                  </Button>
                  <Button size="sm" variant="outline">
                    <FaShare className="mr-1" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-3">
            {friendRequests.map((request) => (
              <div key={request.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={request.avatar} alt={request.name} />
                  <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{request.name}</h4>
                  <p className="text-sm text-gray-600">
                    Level {request.level} • {request.mutualFriends} bạn chung
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleFriendRequest('accept', request.id)}
                  >
                    <FaUserCheck className="mr-1" />
                    Chấp nhận
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleFriendRequest('reject', request.id)}
                  >
                    Từ chối
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                  <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{suggestion.name}</h4>
                  <p className="text-sm text-gray-600">
                    Level {suggestion.level} • {suggestion.mutualFriends} bạn chung
                  </p>
                  <p className="text-xs text-blue-600">Đang học {suggestion.studying || 'N/A'}</p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => addFriend(suggestion.id)}
                >
                  <FaUserPlus className="mr-1" />
                  Kết bạn
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// 🎁 ACHIEVEMENT SHARING
export function _AchievementSharing(_: unknown) {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [sharedAchievements, setSharedAchievements] = useState<any[]>([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    // Mock data
    const mockAchievements = [
      {
        id: '1',
        title: 'Perfect Score',
        description: 'Đạt điểm tối đa trong bài kiểm tra',
        icon: '🏆',
        points: 100,
        earnedAt: '2024-01-15',
        shared: false
      },
      {
        id: '2',
        title: 'Learning Streak',
        description: 'Học tập 7 ngày liên tiếp',
        icon: '🔥',
        points: 50,
        earnedAt: '2024-01-14',
        shared: true
      },
      {
        id: '3',
        title: 'Grammar Master',
        description: 'Hoàn thành tất cả bài ngữ pháp N5',
        icon: '📚',
        points: 75,
        earnedAt: '2024-01-13',
        shared: false
      }
    ];

    setAchievements(mockAchievements);
  };

  const shareAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
      setSharedAchievements(prev => [...prev, achievement]);
    }
  };

  const getShareMessage = (achievement: any) => {
    return `Tôi vừa đạt được thành tích ${achievement.title} trong khóa học tiếng Nhật! ${achievement.description} #PHUCKHIEMEDU #TiengNhat #ThanhTich`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaGift className="text-purple-500" />
          Chia sẻ Thành tích
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Achievements */}
          <div>
            <h4 className="font-semibold mb-3">Thành tích gần đây</h4>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h5 className="font-medium">{achievement.title}</h5>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{achievement.points} điểm</Badge>
                      <span className="text-xs text-gray-500">{achievement.earnedAt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!achievement.shared ? (
                      <Button 
                        size="sm" 
                        onClick={() => shareAchievement(achievement.id)}
                      >
                        <FaShare className="mr-1" />
                        Chia sẻ
                      </Button>
                    ) : (
                      <Badge variant="default" className="bg-green-500">
                        <FaShare className="mr-1" />
                        Đã chia sẻ
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Share Preview */}
          {sharedAchievements.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-3">Chia sẻ thành công!</h4>
              <div className="space-y-2">
                {sharedAchievements.map((achievement) => (
                  <div key={achievement.id} className="p-3 bg-white rounded border">
                    <p className="text-sm">{getShareMessage(achievement)}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">
                        <FaShare className="mr-1" />
                        Chia sẻ lại
                      </Button>
                      <Button size="sm" variant="outline">
                        <FaEnvelope className="mr-1" />
                        Gửi tin nhắn
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 🌟 SOCIAL ACTIVITY FEED
export function _SocialActivityFeed(_: unknown) {
  const [activities, setActivities] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'friends' | 'achievements' | 'study'>('all');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    // Mock data
    const mockActivities = [
      {
        id: '1',
        type: 'achievement',
        user: {
          name: 'Nguyễn Văn A',
          avatar: undefined
        },
        content: 'vừa đạt được thành tích Perfect Score! 🏆',
        timestamp: '2 phút trước',
        likes: 5,
        comments: 2,
        shared: false
      },
      {
        id: '2',
        type: 'study',
        user: {
          name: 'Trần Thị B',
          avatar: undefined
        },
        content: 'đã hoàn thành bài học JLPT N5 - Bài 10 📚',
        timestamp: '15 phút trước',
        likes: 3,
        comments: 1,
        shared: false
      },
      {
        id: '3',
        type: 'streak',
        user: {
          name: 'Lê Văn C',
          avatar: undefined
        },
        content: 'đã duy trì chuỗi học tập 15 ngày liên tiếp! 🔥',
        timestamp: '1 giờ trước',
        likes: 8,
        comments: 3,
        shared: true
      }
    ];

    setActivities(mockActivities);
  };

  const handleLike = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId ? { ...activity, likes: activity.likes + 1 } : activity
    ));
  };

  const handleComment = (activityId: string) => {
    console.log('Comment on activity:', activityId);
  };

  const handleShare = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId ? { ...activity, shared: true } : activity
    ));
  };

  const getActivityIcon = (type: string) => {
    if (type === 'achievement') return <FaTrophy className="text-yellow-500" />;
    if (type === 'study') return <FaBook className="text-blue-500" />;
    if (type === 'streak') return <FaFire className="text-red-500" />;
    return <FaQuestion className="text-gray-500" />;
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaUsers className="text-green-500" />
          Hoạt động Cộng đồng
        </CardTitle>
        <div className="flex gap-2">
          {(['all', 'friends', 'achievements', 'study'] as const).map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
            >
              {filterType === 'all' ? 'Tất cả' : 
               filterType === 'friends' ? 'Bạn bè' :
               filterType === 'achievements' ? 'Thành tích' : 'Học tập'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{activity.user.name}</span>
                    {getActivityIcon(activity.type)}
                    <span className="text-sm text-gray-600">{activity.content}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{activity.timestamp}</span>
                    <span>{activity.likes} lượt thích</span>
                    <span>{activity.comments} bình luận</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleLike(activity.id)}
                >
                  <FaHeart className="mr-1" />
                  Thích
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleComment(activity.id)}
                >
                  <FaComment className="mr-1" />
                  Bình luận
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShare(activity.id)}
                >
                  <FaShare className="mr-1" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
