'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Plus, 
  Search, 
  Star, 
  Clock,
  BookOpen,
  Target,
  Send,
  Heart,
  Share2,
  MoreHorizontal
} from 'lucide-react';

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  level: string;
  language: string;
  isPublic: boolean;
  createdAt: Date;
  lastActivity: Date;
  tags: string[];
}

interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  type: 'question' | 'achievement' | 'study_tip' | 'motivation';
  likes: number;
  comments: number;
  timestamp: Date;
  tags: string[];
}

export function SocialFeatures() {
  const [activeTab, setActiveTab] = useState<'groups' | 'feed' | 'create'>('groups');
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data
    const mockGroups: StudyGroup[] = [
      {
        id: '1',
        name: 'JLPT N5 Study Group',
        description: 'Nhóm học tập cho kỳ thi JLPT N5. Chia sẻ tài liệu và kinh nghiệm học tập.',
        memberCount: 45,
        maxMembers: 50,
        level: 'N5',
        language: 'Japanese',
        isPublic: true,
        createdAt: new Date('2024-01-01'),
        lastActivity: new Date(),
        tags: ['JLPT', 'N5', 'Grammar', 'Vocabulary']
      },
      {
        id: '2',
        name: 'HSK 1 Beginners',
        description: 'Nhóm dành cho người mới bắt đầu học tiếng Trung HSK 1.',
        memberCount: 32,
        maxMembers: 40,
        level: 'HSK 1',
        language: 'Chinese',
        isPublic: true,
        createdAt: new Date('2024-01-15'),
        lastActivity: new Date(Date.now() - 86400000),
        tags: ['HSK', 'Beginner', 'Chinese', 'Pinyin']
      }
    ];

    const mockPosts: Post[] = [
      {
        id: '1',
        userId: '1',
        username: 'NguyenVanA',
        avatar: '/avatars/1.jpg',
        content: 'Vừa hoàn thành bài học N5 Lesson 15! Cảm thấy rất vui khi hiểu được ngữ pháp mới. Ai có thể giải thích thêm về cách sử dụng particle に trong trường hợp này không?',
        type: 'achievement',
        likes: 12,
        comments: 5,
        timestamp: new Date(),
        tags: ['N5', 'Grammar', 'Particle']
      },
      {
        id: '2',
        userId: '2',
        username: 'TranThiB',
        avatar: '/avatars/2.jpg',
        content: 'Mẹo học kanji hiệu quả: Hãy liên kết kanji với hình ảnh hoặc câu chuyện. Ví dụ: 木 (tree) + 日 (sun) = 東 (east) - mặt trời mọc từ phía đông, nơi có nhiều cây!',
        type: 'study_tip',
        likes: 28,
        comments: 8,
        timestamp: new Date(Date.now() - 3600000),
        tags: ['Kanji', 'Study Tip', 'Memory']
      }
    ];

    setStudyGroups(mockGroups);
    setPosts(mockPosts);
  }, []);

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`;
    return `${Math.floor(diffInMinutes / 1440)} ngày trước`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cộng đồng học tập</h1>
          <p className="text-muted-foreground">Kết nối với người học khác và chia sẻ kinh nghiệm</p>
        </div>
        <Button onClick={() => setActiveTab('create')}>
          <Plus className="h-4 w-4 mr-2" />
          Tạo nhóm
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'groups', label: 'Nhóm học tập', icon: Users },
          { id: 'feed', label: 'Bảng tin', icon: MessageCircle },
          { id: 'create', label: 'Tạo mới', icon: Plus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Tìm kiếm nhóm học tập..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span>{group.memberCount}/{group.maxMembers} thành viên</span>
                      </div>
                      <Badge variant="outline">{group.level}</Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {group.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Activity */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Hoạt động: {formatTimeAgo(group.lastActivity)}</span>
                      <span>{group.language}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        Tham gia
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  U
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Chia sẻ thành tích học tập hoặc đặt câu hỏi..."
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Thành tích
                      </Button>
                      <Button variant="outline" size="sm">
                        <Target className="h-4 w-4 mr-1" />
                        Mẹo học
                      </Button>
                    </div>
                    <Button>
                      <Send className="h-4 w-4 mr-1" />
                      Đăng
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="pt-6">
                  <div className="flex space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {post.username.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{post.username}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTimeAgo(post.timestamp)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm mb-3">{post.content}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Chia sẻ
                          </Button>
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

      {activeTab === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle>Tạo nhóm học tập mới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tên nhóm</label>
                <Input placeholder="Nhập tên nhóm..." />
              </div>
              
              <div>
                <label className="text-sm font-medium">Mô tả</label>
                <Textarea placeholder="Mô tả về nhóm học tập..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Ngôn ngữ</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Tiếng Nhật</option>
                    <option>Tiếng Trung</option>
                    <option>Tiếng Anh</option>
                    <option>Tiếng Hàn</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Cấp độ</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>N5/HSK 1</option>
                    <option>N4/HSK 2</option>
                    <option>N3/HSK 3</option>
                    <option>N2/HSK 4</option>
                    <option>N1/HSK 5</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Số lượng thành viên tối đa</label>
                <Input type="number" placeholder="50" />
              </div>
              
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="public" />
                <label htmlFor="public" className="text-sm">Nhóm công khai</label>
              </div>
              
              <Button className="w-full">
                Tạo nhóm
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default SocialFeatures; 