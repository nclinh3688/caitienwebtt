'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Star,
  Heart,
  Share2,
  Bookmark,
  Search,
  Plus,
  X,
  User,
  Eye
} from 'lucide-react';

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const categories = [
    { key: 'all', label: 'Tất cả', icon: '🌐', count: 156 },
    { key: 'general', label: 'Chung', icon: '💬', count: 45 },
    { key: 'grammar', label: 'Ngữ pháp', icon: '📖', count: 32 },
    { key: 'vocabulary', label: 'Từ vựng', icon: '📚', count: 28 },
    { key: 'listening', label: 'Luyện nghe', icon: '🎧', count: 19 }
  ];

  const communityPosts = [
    {
      id: '1',
      title: 'Cách học từ vựng hiệu quả nhất?',
      content: 'Mình đang học N5 và gặp khó khăn với việc nhớ từ vựng. Ai có tips gì hay không?',
      author: 'Nguyễn Văn A',
      level: 'N5',
      category: 'vocabulary',
      likes: 24,
      replies: 8,
      views: 156,
      createdAt: '2 giờ trước'
    },
    {
      id: '2',
      title: 'Ngữ pháp は vs が - Khi nào dùng?',
      content: 'Mình vẫn hay nhầm lẫn giữa は và が. Có ai giải thích rõ ràng không?',
      author: 'Trần Thị B',
      level: 'N4',
      category: 'grammar',
      likes: 18,
      replies: 12,
      views: 203,
      createdAt: '5 giờ trước'
    }
  ];

  const stats = {
    totalMembers: 1247,
    activeToday: 89,
    totalPosts: 156,
    totalReplies: 892
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Cộng đồng học tập 👥
              </h1>
              <p className="text-lg text-gray-600">
                Kết nối, chia sẻ và học hỏi cùng cộng đồng người học tiếng Nhật
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowCreatePost(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Tạo bài viết</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Mời bạn bè</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thành viên</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalMembers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hoạt động hôm nay</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeToday}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bài viết</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.totalPosts}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bình luận</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalReplies}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết, câu hỏi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Community Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {communityPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {post.level}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{post.createdAt}</div>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h4>
                <p className="text-gray-600">{post.content}</p>
              </div>

              {/* Post Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.replies}</span>
                  </button>
                  
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600 transition-colors duration-200">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  
                  <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tạo bài viết mới</h3>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề bài viết..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {categories.filter(c => c.key !== 'all').map(category => (
                      <option key={category.key} value={category.key}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                  <textarea
                    rows={6}
                    placeholder="Viết nội dung bài viết của bạn..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                  Đăng bài
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}