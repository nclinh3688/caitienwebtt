'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FaBook, 
  FaPlus, 
  FaEdit, 
  FaEye, 
  FaTrash, 
  FaSearch,
  FaFilter,
  FaSort,
  FaDownload,
  FaUpload,
  FaCheck,
  FaTimes,
  FaClock,
  FaStar,
  FaGlobe,
  FaGraduationCap
} from 'react-icons/fa';

interface Lesson {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  category: string;
  difficulty: string;
  duration: number;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  author: string;
  tags: string[];
  viewCount: number;
  rating: number;
}

export default function LessonsManagementPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    filterAndSortLessons();
  }, [lessons, searchTerm, selectedLanguage, selectedLevel, selectedCategory, selectedStatus, sortBy, sortOrder]);

  const fetchLessons = async () => {
    try {
      // Mock data for demo
      const mockLessons: Lesson[] = [
        {
          id: '1',
          title: 'N5 Lesson 1 - Từ vựng cơ bản',
          description: 'Học các từ vựng cơ bản trong tiếng Nhật N5',
          language: 'japanese',
          level: 'n5',
          category: 'vocabulary',
          difficulty: 'beginner',
          duration: 30,
          status: 'published',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          author: 'Admin User',
          tags: ['từ vựng', 'cơ bản', 'N5'],
          viewCount: 1247,
          rating: 4.8
        },
        {
          id: '2',
          title: 'N5 Lesson 2 - Ngữ pháp cơ bản',
          description: 'Học ngữ pháp cơ bản trong tiếng Nhật N5',
          language: 'japanese',
          level: 'n5',
          category: 'grammar',
          difficulty: 'beginner',
          duration: 45,
          status: 'published',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
          author: 'Admin User',
          tags: ['ngữ pháp', 'cơ bản', 'N5'],
          viewCount: 892,
          rating: 4.6
        },
        {
          id: '3',
          title: 'HSK 1 Lesson 1 - Từ vựng cơ bản',
          description: 'Học các từ vựng cơ bản trong tiếng Trung HSK 1',
          language: 'chinese',
          level: 'hsk1',
          category: 'vocabulary',
          difficulty: 'beginner',
          duration: 35,
          status: 'published',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
          author: 'Admin User',
          tags: ['từ vựng', 'cơ bản', 'HSK1'],
          viewCount: 567,
          rating: 4.7
        },
        {
          id: '4',
          title: 'N5 Lesson 3 - Luyện nghe cơ bản',
          description: 'Luyện kỹ năng nghe cơ bản trong tiếng Nhật N5',
          language: 'japanese',
          level: 'n5',
          category: 'listening',
          difficulty: 'beginner',
          duration: 40,
          status: 'draft',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
          author: 'Admin User',
          tags: ['luyện nghe', 'cơ bản', 'N5'],
          viewCount: 0,
          rating: 0
        },
        {
          id: '5',
          title: 'TOEIC Basic - Grammar Review',
          description: 'Ôn tập ngữ pháp cơ bản cho kỳ thi TOEIC',
          language: 'english',
          level: 'basic',
          category: 'grammar',
          difficulty: 'intermediate',
          duration: 50,
          status: 'published',
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
          author: 'Admin User',
          tags: ['TOEIC', 'ngữ pháp', 'ôn tập'],
          viewCount: 1234,
          rating: 4.9
        }
      ];

      setLessons(mockLessons);
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortLessons = () => {
    let filtered = lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLanguage = selectedLanguage === 'all' || lesson.language === selectedLanguage;
      const matchesLevel = selectedLevel === 'all' || lesson.level === selectedLevel;
      const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || lesson.status === selectedStatus;

      return matchesSearch && matchesLanguage && matchesLevel && matchesCategory && matchesStatus;
    });

    // Sort lessons
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy as keyof Lesson];
      let bValue: any = b[sortBy as keyof Lesson];

      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = aValue.getTime();
        bValue = bValue.getTime();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredLessons(filtered);
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'japanese': return '🇯🇵';
      case 'chinese': return '🇨🇳';
      case 'english': return '🇺🇸';
      case 'korean': return '🇰🇷';
      case 'vietnamese': return '🇻🇳';
      default: return '🌍';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'n5': return 'N5';
      case 'n4': return 'N4';
      case 'n3': return 'N3';
      case 'n2': return 'N2';
      case 'n1': return 'N1';
      case 'hsk1': return 'HSK1';
      case 'hsk2': return 'HSK2';
      case 'basic': return 'Basic';
      default: return level.toUpperCase();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vocabulary': return '📚';
      case 'grammar': return '📝';
      case 'listening': return '🎧';
      case 'reading': return '📖';
      case 'speaking': return '🗣️';
      case 'writing': return '✍️';
      default: return '📚';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Đã xuất bản</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">Bản nháp</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800">Đã lưu trữ</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài học này?')) {
      try {
        // Mock delete - replace with real API call
        setLessons(prev => prev.filter(lesson => lesson.id !== lessonId));
        alert('Bài học đã được xóa thành công!');
      } catch (error) {
        console.error('Failed to delete lesson:', error);
        alert('Có lỗi xảy ra khi xóa bài học. Vui lòng thử lại.');
      }
    }
  };

  const handleExportLessons = () => {
    // Mock export - replace with real export functionality
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'ID,Title,Language,Level,Category,Status,Author,Created\n' +
      filteredLessons.map(lesson => 
        `${lesson.id},"${lesson.title}",${lesson.language},${lesson.level},${lesson.category},${lesson.status},${lesson.author},${lesson.createdAt.toLocaleDateString()}`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'lessons.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-blue-500 text-4xl mb-4">⚡</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang tải danh sách bài học...</h2>
        <p className="text-gray-500">Vui lòng chờ trong giây lát</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBook className="text-blue-600" />
            Quản lý bài học
          </h1>
          <p className="text-gray-600 mt-1">
            Quản lý tất cả bài học trong hệ thống PHÚC KHIÊM EDU
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={handleExportLessons}>
            <FaDownload className="mr-2" />
            Xuất CSV
          </Button>
          <Button variant="outline">
            <FaUpload className="mr-2" />
            Import
          </Button>
          <Button onClick={() => window.open('/admin/lessons/create', '_blank')}>
            <FaPlus className="mr-2" />
            Tạo bài học mới
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bài học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Language Filter */}
            <div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả ngôn ngữ</option>
                <option value="japanese">🇯🇵 Tiếng Nhật</option>
                <option value="chinese">🇨🇳 Tiếng Trung</option>
                <option value="english">🇺🇸 Tiếng Anh</option>
                <option value="korean">🇰🇷 Tiếng Hàn</option>
                <option value="vietnamese">🇻🇳 Tiếng Việt</option>
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả cấp độ</option>
                <option value="n5">N5</option>
                <option value="n4">N4</option>
                <option value="n3">N3</option>
                <option value="n2">N2</option>
                <option value="n1">N1</option>
                <option value="hsk1">HSK1</option>
                <option value="hsk2">HSK2</option>
                <option value="basic">Basic</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả danh mục</option>
                <option value="vocabulary">📚 Từ vựng</option>
                <option value="grammar">📝 Ngữ pháp</option>
                <option value="listening">🎧 Luyện nghe</option>
                <option value="reading">📖 Đọc hiểu</option>
                <option value="speaking">🗣️ Luyện nói</option>
                <option value="writing">✍️ Luyện viết</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã xuất bản</option>
                <option value="draft">Bản nháp</option>
                <option value="archived">Đã lưu trữ</option>
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <FaSort className="text-gray-400" />
              <span className="text-sm text-gray-600">Sắp xếp theo:</span>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="createdAt">Ngày tạo</option>
              <option value="updatedAt">Ngày cập nhật</option>
              <option value="title">Tiêu đề</option>
              <option value="viewCount">Lượt xem</option>
              <option value="rating">Đánh giá</option>
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="flex items-center gap-2"
            >
              {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Hiển thị {filteredLessons.length} / {lessons.length} bài học
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaClock className="text-gray-400" />
          Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        {filteredLessons.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bài học nào</h3>
              <p className="text-gray-500 mb-4">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedLanguage('all');
                setSelectedLevel('all');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}>
                Xóa bộ lọc
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">
                        {getLanguageIcon(lesson.language)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {lesson.title}
                          </h3>
                          {getStatusBadge(lesson.status)}
                        </div>
                        
                        <p className="text-gray-600 mb-3">
                          {lesson.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <FaGlobe />
                            {getLanguageIcon(lesson.language)} {lesson.language.toUpperCase()}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaGraduationCap />
                            {getLevelLabel(lesson.level)}
                          </span>
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(lesson.category)}
                            {lesson.category}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty === 'beginner' ? 'Cơ bản' :
                             lesson.difficulty === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock />
                            {lesson.duration} phút
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Tác giả: {lesson.author}</span>
                          <span>Ngày tạo: {lesson.createdAt.toLocaleDateString('vi-VN')}</span>
                          <span>Cập nhật: {lesson.updatedAt.toLocaleDateString('vi-VN')}</span>
                          {lesson.status === 'published' && (
                            <>
                              <span>Lượt xem: {lesson.viewCount.toLocaleString()}</span>
                              <span className="flex items-center gap-1">
                                <FaStar className="text-yellow-500" />
                                {lesson.rating}
                              </span>
                            </>
                          )}
                        </div>
                        
                        {lesson.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {lesson.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/admin/lessons/${lesson.id}`, '_blank')}
                    >
                      <FaEye className="mr-1" />
                      Xem
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/admin/lessons/${lesson.id}/edit`, '_blank')}
                    >
                      <FaEdit className="mr-1" />
                      Sửa
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
                      <FaTrash className="mr-1" />
                      Xóa
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
