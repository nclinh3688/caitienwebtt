'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaUsers, 
  FaComments, 
  FaShare, 
  FaHeart,
  FaThumbsUp,
  FaReply,
  FaUserFriends,
  FaTrophy,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaVideo,
  FaCalendar,
  FaBookOpen
} from 'react-icons/fa';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  level: string;
  memberCount: number;
  maxMembers: number;
  meetingTime: string;
  meetingType: 'online' | 'offline' | 'hybrid';
  location?: string;
  tags: string[];
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  likes: number;
  replies: number;
  views: number;
  tags: string[];
  createdAt: Date;
  isPinned: boolean;
  isSolved: boolean;
}

interface PeerLearning {
  id: string;
  title: string;
  description: string;
  level: string;
  partnerLevel: string;
  partnerAvatar: string;
  partnerName: string;
  status: 'available' | 'busy' | 'offline';
  lastActive: Date;
  languages: string[];
  interests: string[];
}

interface SocialFeaturesProps {
  userId?: string;
  onGroupJoin?: (groupId: string) => void;
  onPostCreate?: (post: ForumPost) => void;
  onPeerConnect?: (peerId: string) => void;
}

export default function SocialFeatures({
  userId,
  onGroupJoin,
  onPostCreate,
  onPeerConnect
}: SocialFeaturesProps) {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [peerLearners, setPeerLearners] = useState<PeerLearning[]>([]);
  const [activeTab, setActiveTab] = useState<'groups' | 'forum' | 'peers'>('groups');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });

  useEffect(() => {
    loadStudyGroups();
    loadForumPosts();
    loadPeerLearners();
  }, []);

  const loadStudyGroups = () => {
    const mockGroups: StudyGroup[] = [
      {
        id: '1',
        name: 'Nhóm học N5 Hà Nội',
        description: 'Nhóm học tiếng Nhật N5 tại Hà Nội, gặp mặt offline hàng tuần',
        level: 'N5',
        memberCount: 8,
        maxMembers: 12,
        meetingTime: 'Chủ nhật 14:00',
        meetingType: 'offline',
        location: 'Café Trung Nguyên, Cầu Giấy',
        tags: ['N5', 'Offline', 'Hà Nội'],
        isActive: true,
        createdBy: 'Nguyễn Văn A',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Online N5 Study Group',
        description: 'Nhóm học online qua Zoom, tập trung vào ngữ pháp và từ vựng',
        level: 'N5',
        memberCount: 15,
        maxMembers: 20,
        meetingTime: 'Thứ 3, 5, 7 19:00',
        meetingType: 'online',
        tags: ['N5', 'Online', 'Zoom'],
        isActive: true,
        createdBy: 'Trần Thị B',
        createdAt: new Date('2024-01-10')
      },
      {
        id: '3',
        name: 'N5 Speaking Practice',
        description: 'Nhóm luyện nói tiếng Nhật, thực hành hội thoại hàng ngày',
        level: 'N5',
        memberCount: 6,
        maxMembers: 10,
        meetingTime: 'Hàng ngày 20:00',
        meetingType: 'online',
        tags: ['N5', 'Speaking', 'Daily'],
        isActive: true,
        createdBy: 'Lê Văn C',
        createdAt: new Date('2024-01-20')
      }
    ];
    
    setStudyGroups(mockGroups);
  };

  const loadForumPosts = () => {
    const mockPosts: ForumPost[] = [
      {
        id: '1',
        title: 'Cách phân biệt は và が trong ngữ pháp N5',
        content: 'Mình đang học N5 và gặp khó khăn trong việc phân biệt cách sử dụng は và が. Ai có thể giải thích rõ hơn không?',
        author: 'Nguyễn Văn A',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        likes: 12,
        replies: 8,
        views: 156,
        tags: ['N5', 'Ngữ pháp', 'は', 'が'],
        createdAt: new Date('2024-01-25'),
        isPinned: true,
        isSolved: false
      },
      {
        id: '2',
        title: 'Tài liệu học N5 hiệu quả',
        content: 'Chia sẻ tài liệu và phương pháp học N5 hiệu quả cho người mới bắt đầu',
        author: 'Trần Thị B',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        likes: 25,
        replies: 15,
        views: 342,
        tags: ['N5', 'Tài liệu', 'Phương pháp'],
        createdAt: new Date('2024-01-24'),
        isPinned: false,
        isSolved: true
      },
      {
        id: '3',
        title: 'Luyện nghe N5 - Kinh nghiệm thực tế',
        content: 'Chia sẻ kinh nghiệm luyện nghe N5 và các tài liệu nghe hiệu quả',
        author: 'Lê Văn C',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        likes: 18,
        replies: 12,
        views: 289,
        tags: ['N5', 'Luyện nghe', 'Kinh nghiệm'],
        createdAt: new Date('2024-01-23'),
        isPinned: false,
        isSolved: false
      }
    ];
    
    setForumPosts(mockPosts);
  };

  const loadPeerLearners = () => {
    const mockPeers: PeerLearning[] = [
      {
        id: '1',
        title: 'Tìm bạn học cùng N5',
        description: 'Mình đang học N5 và muốn tìm bạn học cùng để luyện tập',
        level: 'N5',
        partnerLevel: 'N5',
        partnerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        partnerName: 'Nguyễn Văn A',
        status: 'available',
        lastActive: new Date(),
        languages: ['Tiếng Việt', 'Tiếng Anh'],
        interests: ['Anime', 'Manga', 'Văn hóa Nhật']
      },
      {
        id: '2',
        title: 'Luyện nói tiếng Nhật N5',
        description: 'Tìm bạn để luyện nói tiếng Nhật, tập trung vào hội thoại cơ bản',
        level: 'N5',
        partnerLevel: 'N5-N4',
        partnerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        partnerName: 'Trần Thị B',
        status: 'busy',
        lastActive: new Date(Date.now() - 300000), // 5 minutes ago
        languages: ['Tiếng Việt', 'Tiếng Nhật'],
        interests: ['Du lịch', 'Ẩm thực', 'Phim ảnh']
      },
      {
        id: '3',
        title: 'Học nhóm N5 online',
        description: 'Tìm 2-3 bạn để học nhóm online, chia sẻ kiến thức và luyện tập',
        level: 'N5',
        partnerLevel: 'N5',
        partnerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        partnerName: 'Lê Văn C',
        status: 'available',
        lastActive: new Date(),
        languages: ['Tiếng Việt', 'Tiếng Anh', 'Tiếng Nhật'],
        interests: ['Công nghệ', 'Âm nhạc', 'Thể thao']
      }
    ];
    
    setPeerLearners(mockPeers);
  };

  const handleJoinGroup = (groupId: string) => {
    onGroupJoin?.(groupId);
    // Update member count
    setStudyGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, memberCount: Math.min(group.memberCount + 1, group.maxMembers) }
        : group
    ));
  };

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      const post: ForumPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: 'Bạn',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        likes: 0,
        replies: 0,
        views: 0,
        tags: newPost.tags,
        createdAt: new Date(),
        isPinned: false,
        isSolved: false
      };
      
      setForumPosts(prev => [post, ...prev]);
      setNewPost({ title: '', content: '', tags: [] });
      setShowCreatePost(false);
      onPostCreate?.(post);
    }
  };

  const handleConnectPeer = (peerId: string) => {
    onPeerConnect?.(peerId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'online': return FaVideo;
      case 'offline': return FaMapMarkerAlt;
      case 'hybrid': return FaUsers;
      default: return FaUsers;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'groups' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('groups')}
          className="flex items-center gap-2"
        >
          <FaUsers />
          Nhóm học tập
        </Button>
        <Button
          variant={activeTab === 'forum' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('forum')}
          className="flex items-center gap-2"
        >
          <FaComments />
          Diễn đàn
        </Button>
        <Button
          variant={activeTab === 'peers' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('peers')}
          className="flex items-center gap-2"
        >
          <FaUserFriends />
          Học cùng bạn
        </Button>
      </div>

      {/* Study Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Nhóm học tập</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <FaUsers />
              Tạo nhóm mới
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studyGroups.map(group => {
              const MeetingIcon = getMeetingTypeIcon(group.meetingType);
              
              return (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge variant="outline" className="mt-2">
                          {group.level}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          {group.memberCount}/{group.maxMembers} thành viên
                        </div>
                        <div className="text-xs text-gray-500">
                          {group.isActive ? 'Đang hoạt động' : 'Tạm dừng'}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MeetingIcon className="text-gray-400" />
                        <span>{group.meetingTime}</span>
                      </div>
                      {group.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>{group.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {group.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleJoinGroup(group.id)}
                      disabled={group.memberCount >= group.maxMembers}
                      className="w-full"
                    >
                      {group.memberCount >= group.maxMembers ? 'Đã đầy' : 'Tham gia'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Forum */}
      {activeTab === 'forum' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Diễn đàn thảo luận</h2>
            <Button 
              onClick={() => setShowCreatePost(!showCreatePost)}
              className="flex items-center gap-2"
            >
              <FaComments />
              Tạo bài viết
            </Button>
          </div>

          {/* Create Post Form */}
          {showCreatePost && (
            <Card>
              <CardHeader>
                <CardTitle>Tạo bài viết mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full p-2 border rounded-lg"
                      placeholder="Nhập tiêu đề bài viết..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nội dung</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full p-2 border rounded-lg h-32"
                      placeholder="Nhập nội dung bài viết..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreatePost}>Đăng bài</Button>
                    <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                      Hủy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Forum Posts */}
          <div className="space-y-4">
            {forumPosts.map(post => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.createdAt.toLocaleDateString()}</span>
                            {post.isPinned && (
                              <>
                                <span>•</span>
                                <Badge variant="destructive" className="text-xs">Ghim</Badge>
                              </>
                            )}
                            {post.isSolved && (
                              <>
                                <span>•</span>
                                <Badge variant="default" className="text-xs">Đã giải quyết</Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{post.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaThumbsUp />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaReply />
                            {post.replies}
                          </span>
                          <span>{post.views} lượt xem</span>
                        </div>
                        
                        <div className="flex gap-1">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Peer Learning */}
      {activeTab === 'peers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Học cùng bạn</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <FaUserFriends />
              Tìm bạn học
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {peerLearners.map(peer => (
              <Card key={peer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={peer.partnerAvatar}
                        alt={peer.partnerName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(peer.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{peer.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{peer.partnerName}</span>
                        <span>•</span>
                        <span>{peer.level}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{peer.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-gray-400" />
                      <span>Hoạt động {peer.lastActive.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaBookOpen className="text-gray-400" />
                      <span>Cấp độ: {peer.partnerLevel}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Ngôn ngữ:</h4>
                    <div className="flex flex-wrap gap-1">
                      {peer.languages.map(lang => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-sm mb-2">Sở thích:</h4>
                    <div className="flex flex-wrap gap-1">
                      {peer.interests.map(interest => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleConnectPeer(peer.id)}
                    disabled={peer.status === 'offline'}
                    className="w-full"
                  >
                    {peer.status === 'offline' ? 'Offline' : 'Kết nối'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 