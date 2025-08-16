'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  Filter,
  Search,
  Globe,
  GraduationCap
} from 'lucide-react';

interface Course {
  id: string;
  language: string;
  level: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  lessonCount: number;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  lessons: Array<{
    id: string;
    title: string;
    order: number;
    isPublished: boolean;
  }>;
  categories: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  _count: {
    lessons: number;
  };
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLanguageIcon = (language: string) => {
    const icons: { [key: string]: string } = {
      japanese: '🇯🇵',
      chinese: '🇨🇳',
      english: '🇺🇸',
      korean: '🇰🇷',
      vietnamese: '🇻🇳',
    };
    return icons[language] || '🌍';
  };

  const getLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      n5: 'from-green-500 to-emerald-500',
      n4: 'from-blue-500 to-cyan-500',
      n3: 'from-purple-500 to-pink-500',
      n2: 'from-orange-500 to-red-500',
      n1: 'from-red-600 to-pink-600',
      hsk1: 'from-green-500 to-emerald-500',
      hsk2: 'from-blue-500 to-cyan-500',
      hsk3: 'from-purple-500 to-pink-500',
      hsk4: 'from-orange-500 to-red-500',
      hsk5: 'from-red-600 to-pink-600',
      hsk6: 'from-red-700 to-pink-700',
      beginner: 'from-green-500 to-emerald-500',
      intermediate: 'from-blue-500 to-cyan-500',
      advanced: 'from-purple-500 to-pink-500',
    };
    return colors[level] || 'from-gray-500 to-gray-600';
  };

  const getLevelText = (level: string) => {
    const levels: { [key: string]: string } = {
      n5: 'N5 - Cơ Bản',
      n4: 'N4 - Sơ Trung Cấp',
      n3: 'N3 - Trung Cấp',
      n2: 'N2 - Trung Cao Cấp',
      n1: 'N1 - Cao Cấp',
      hsk1: 'HSK 1 - Cơ Bản',
      hsk2: 'HSK 2 - Sơ Trung Cấp',
      hsk3: 'HSK 3 - Trung Cấp',
      hsk4: 'HSK 4 - Trung Cao Cấp',
      hsk5: 'HSK 5 - Cao Cấp',
      hsk6: 'HSK 6 - Thành Thạo',
      beginner: 'Cơ Bản',
      intermediate: 'Trung Cấp',
      advanced: 'Cao Cấp',
    };
    return levels[level] || level;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const filteredCourses = courses.filter(course => {
    const matchesFilter = filter === 'all' || course.language === filter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải khóa học...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Khóa Học Ngoại Ngữ
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Học ngoại ngữ hiệu quả với phương pháp hiện đại, nội dung chất lượng và trải nghiệm học tập tương tác
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Language Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả ngôn ngữ</option>
              <option value="japanese">Tiếng Nhật</option>
              <option value="chinese">Tiếng Trung</option>
              <option value="english">Tiếng Anh</option>
              <option value="korean">Tiếng Hàn</option>
              <option value="vietnamese">Tiếng Việt</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-orange-100 rounded-t-2xl flex items-center justify-center">
                <div className="text-6xl">{getLanguageIcon(course.language)}</div>
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getLevelColor(course.level)}`}>
                  {getLevelText(course.level)}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessonCount} bài học</span>
                  </div>
                </div>

                {/* Categories */}
                {course.categories.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {course.categories.slice(0, 3).map((category) => (
                        <span
                          key={category.id}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button 
                  onClick={() => window.location.href = `/courses/${course.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Xem chi tiết
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
