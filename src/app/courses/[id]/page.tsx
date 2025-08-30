'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  ChevronRight,
  CheckCircle,
  Lock,
  Eye,
  Headphones,
  FileText,
  Target,
  Calendar,
  Award
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
    description: string;
    order: number;
    duration: number;
    difficulty: string;
    isPublished: boolean;
    createdAt: string;
  }>;
  categories: Array<{
    id: string;
    name: string;
    description: string;
    order: number;
  }>;
  _count: {
    lessons: number;
  };
}

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      if (data.success) {
        setCourse(data.data);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
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

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-blue-100 text-blue-800',
      advanced: 'bg-purple-100 text-purple-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyText = (difficulty: string) => {
    const texts: { [key: string]: string } = {
      beginner: 'Cơ Bản',
      intermediate: 'Trung Cấp',
      advanced: 'Cao Cấp',
    };
    return texts[difficulty] || difficulty;
  };

  const filteredLessons = course?.lessons.filter(lesson => 
    selectedCategory === 'all' || 
    course.categories.find(cat => cat.id === selectedCategory)?.name === 'Từ Vựng' && lesson.order === 1 ||
    course.categories.find(cat => cat.id === selectedCategory)?.name === 'Ngữ Pháp' && lesson.order === 2
  ) || [];

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

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Khóa học không tồn tại</h2>
            <p className="text-gray-600">Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Course Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Course Thumbnail */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-orange-100 rounded-2xl flex items-center justify-center">
                <div className="text-6xl">{getLanguageIcon(course.language)}</div>
              </div>
            </div>

            {/* Course Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getLevelColor(course.level)}`}>
                  {getLevelText(course.level)}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                  {course.isPublished ? 'Đang mở' : 'Đang chuẩn bị'}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 max-w-4xl">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-2">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">Thời lượng</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDuration(course.duration)}</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-2">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">Bài học</p>
                  <p className="text-lg font-semibold text-gray-900">{course.lessonCount}</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-2">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-gray-600">Mục tiêu</p>
                  <p className="text-lg font-semibold text-gray-900">N5</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-xl mb-2">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600">Chứng chỉ</p>
                  <p className="text-lg font-semibold text-gray-900">JLPT</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 shadow-lg">
                <Play className="w-6 h-6" />
                Bắt đầu học
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nội dung khóa học</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.categories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {category.name === 'Từ Vựng' && <FileText className="w-5 h-5 text-blue-600" />}
                        {category.name === 'Ngữ Pháp' && <Target className="w-5 h-5 text-blue-600" />}
                        {category.name === 'Luyện Nghe' && <Headphones className="w-5 h-5 text-blue-600" />}
                        {category.name === 'Luyện Đọc' && <Eye className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Lessons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Danh sách bài học</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Hiển thị:</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tất cả</option>
                    {course.categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => window.location.href = `/courses/${courseId}/lessons/${lesson.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-semibold">
                          {lesson.order}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                              {getDifficultyText(lesson.difficulty)}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDuration(lesson.duration)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.isPublished ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tiến độ học tập</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Hoàn thành</span>
                    <span className="text-gray-900 font-semibold">0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Bạn chưa bắt đầu khóa học này</p>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Bắt đầu ngay
                  </button>
                </div>
              </div>
            </div>

            {/* Course Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tính năng khóa học</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Bài học tương tác</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Audio phát âm</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Bài tập thực hành</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Theo dõi tiến độ</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Chứng chỉ hoàn thành</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
