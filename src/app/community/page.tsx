'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaUsers, 
  FaComments, 
  FaPen, 
  FaRobot,
  FaSearch,
  FaPlus,
  FaHeart,
  FaShare,
  FaBookmark,
  FaUserFriends,
  FaLightbulb,
  FaStar,
  FaClock,
  FaEye,
  FaThumbsUp
} from 'react-icons/fa';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('forum');
  const [searchQuery, setSearchQuery] = useState('');

  const communityData = {
    forum: {
      questions: [
        {
          id: 1,
          title: 'Cách phân biệt は và が trong tiếng Nhật?',
          author: 'Nguyễn Văn A',
          avatar: '👤',
          tags: ['Ngữ pháp', 'N5'],
          replies: 12,
          views: 156,
          likes: 8,
          time: '2 giờ trước',
          status: 'hot'
        },
        {
          id: 2,
          title: 'Tài liệu luyện thi JLPT N4 hiệu quả?',
          author: 'Trần Thị B',
          avatar: '👤',
          tags: ['Tài liệu', 'N4'],
          replies: 8,
          views: 89,
          likes: 5,
          time: '5 giờ trước',
          status: 'new'
        },
        {
          id: 3,
          title: 'Kinh nghiệm học kanji cho người mới bắt đầu',
          author: 'Lê Văn C',
          avatar: '👤',
          tags: ['Kanji', 'Kinh nghiệm'],
          replies: 15,
          views: 234,
          likes: 12,
          time: '1 ngày trước',
          status: 'popular'
        }
      ]
    },
    groups: [
      {
        id: 1,
        name: 'Nhóm luyện thi JLPT N5',
        description: 'Cùng nhau ôn thi JLPT N5 hiệu quả',
        members: 156,
        posts: 89,
        avatar: '📚',
        tags: ['N5', 'Luyện thi'],
        isJoined: true,
        lastActivity: '30 phút trước'
      },
      {
        id: 2,
        name: 'Giao lưu tiếng Nhật',
        description: 'Thực hành giao tiếp tiếng Nhật với người bản xứ',
        members: 89,
        posts: 45,
        avatar: '🗣️',
        tags: ['Giao tiếp', 'Thực hành'],
        isJoined: false,
        lastActivity: '2 giờ trước'
      },
      {
        id: 3,
        name: 'Chia sẻ tài liệu học tập',
        description: 'Chia sẻ và tìm kiếm tài liệu học tiếng Nhật chất lượng',
        members: 234,
        posts: 156,
        avatar: '📖',
        tags: ['Tài liệu', 'Chia sẻ'],
        isJoined: true,
        lastActivity: '1 giờ trước'
      }
    ],
    blogs: [
      {
        id: 1,
        title: 'Hành trình chinh phục JLPT N3 trong 6 tháng',
        author: 'Phạm Thị D',
        avatar: '👤',
        excerpt: 'Chia sẻ kinh nghiệm học tập và luyện thi JLPT N3 từ con số 0...',
        tags: ['Kinh nghiệm', 'N3'],
        likes: 23,
        comments: 8,
        views: 456,
        time: '3 ngày trước',
        featured: true
      },
      {
        id: 2,
        title: 'Top 10 ứng dụng học tiếng Nhật tốt nhất 2024',
        author: 'Hoàng Văn E',
        avatar: '👤',
        excerpt: 'Tổng hợp những ứng dụng học tiếng Nhật hiệu quả nhất hiện nay...',
        tags: ['Ứng dụng', 'Công nghệ'],
        likes: 18,
        comments: 12,
        views: 234,
        time: '1 tuần trước',
        featured: false
      }
    ],
    aiSuggestions: [
      {
        id: 1,
        type: 'group',
        message: 'Dựa trên sở thích của bạn, chúng tôi gợi ý tham gia nhóm "Luyện thi JLPT N5"',
        priority: 'high'
      },
      {
        id: 2,
        type: 'content',
        message: 'Có 5 bài viết mới về chủ đề bạn quan tâm',
        priority: 'medium'
      }
    ]
  };

  const renderForum = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">E1: Diễn đàn</h3>
        <Button>
          <FaPlus className="mr-2" />
          E1A: Đặt câu hỏi
        </Button>
      </div>
      
      <div className="space-y-3">
        {communityData.forum.questions.map((question) => (
          <Card key={question.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{question.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-blue-600 hover:underline cursor-pointer">
                      {question.title}
                    </h4>
                    <Badge variant={question.status === 'hot' ? 'destructive' : question.status === 'new' ? 'default' : 'secondary'}>
                      {question.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>👤 {question.author}</span>
                    <span>🕒 {question.time}</span>
                    <span>💬 {question.replies} trả lời</span>
                    <span>👁️ {question.views} lượt xem</span>
                    <span>👍 {question.likes} thích</span>
                  </div>
                  <div className="flex gap-2">
                    {question.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">E2: Nhóm học tập</h3>
        <Button>
          <FaPlus className="mr-2" />
          E2A: Tạo nhóm
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communityData.groups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="text-center mb-3">
                <div className="text-3xl mb-2">{group.avatar}</div>
                <h4 className="font-semibold text-blue-600">{group.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{group.description}</p>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>👥 {group.members} thành viên</span>
                <span>📝 {group.posts} bài viết</span>
              </div>
              
              <div className="flex gap-2 mb-3">
                {group.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">🕒 {group.lastActivity}</span>
                <Button 
                  size="sm" 
                  variant={group.isJoined ? "outline" : "default"}
                >
                  {group.isJoined ? 'Đã tham gia' : 'E2B: Tham gia nhóm'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">E3: Blog chia sẻ</h3>
        <Button>
          <FaPen className="mr-2" />
          E3A: Viết bài
        </Button>
      </div>
      
      <div className="space-y-4">
        {communityData.blogs.map((blog) => (
          <Card key={blog.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{blog.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-blue-600 hover:underline cursor-pointer">
                      {blog.title}
                    </h4>
                    {blog.featured && <Badge variant="default">⭐ Nổi bật</Badge>}
                  </div>
                  <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>👤 {blog.author}</span>
                    <span>🕒 {blog.time}</span>
                    <span>👍 {blog.likes} thích</span>
                    <span>💬 {blog.comments} bình luận</span>
                    <span>👁️ {blog.views} lượt xem</span>
                  </div>
                  <div className="flex gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cộng đồng học tập</h1>
        <p className="text-gray-600">Kết nối, chia sẻ và học hỏi cùng cộng đồng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <Button
              variant={activeTab === 'forum' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('forum')}
              className="flex-1"
            >
              <FaComments className="mr-2" />
              Diễn đàn
            </Button>
            <Button
              variant={activeTab === 'groups' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('groups')}
              className="flex-1"
            >
              <FaUsers className="mr-2" />
              Nhóm học tập
            </Button>
            <Button
              variant={activeTab === 'blogs' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('blogs')}
              className="flex-1"
            >
              <FaPen className="mr-2" />
              Blog chia sẻ
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm trong cộng đồng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          {activeTab === 'forum' && renderForum()}
          {activeTab === 'groups' && renderGroups()}
          {activeTab === 'blogs' && renderBlogs()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* E4: AI chatbot hỗ trợ cộng đồng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaRobot className="text-purple-600" />
                E4: AI Chatbot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Hỏi đáp nhanh với AI về học tập và cộng đồng
                </p>
                <Button className="w-full" variant="outline">
                  <FaRobot className="mr-2" />
                  Chat với AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* E5: AI lọc nội dung/chất lượng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaSearch className="text-green-600" />
                E5: AI Lọc nội dung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FaStar className="text-yellow-500" />
                  <span>Nội dung chất lượng cao</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaThumbsUp className="text-blue-500" />
                  <span>Được cộng đồng đánh giá tốt</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaEye className="text-green-500" />
                  <span>Nhiều lượt xem</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* E6: AI gợi ý nhóm học */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaLightbulb className="text-orange-600" />
                E6: AI Gợi ý
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communityData.aiSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-2">
                      <FaLightbulb className={`text-sm mt-0.5 ${
                        suggestion.priority === 'high' ? 'text-orange-500' : 'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm">{suggestion.message}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {suggestion.priority === 'high' ? 'Gợi ý cao' : 'Gợi ý'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Thống kê cộng đồng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Thành viên</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Nhóm học tập</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span>Bài viết hôm nay</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span>Câu hỏi chờ trả lời</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}