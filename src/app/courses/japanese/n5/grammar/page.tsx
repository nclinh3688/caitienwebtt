'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  CheckCircle, 
  Clock, 
  Star,
  Play,
  GraduationCap,
  Brain,
  Zap,
  Award
} from 'lucide-react';

interface GrammarLesson {
  id: string;
  lessonNumber: number;
  title: string;
  japaneseTitle: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  patterns: number;
  examples: number;
  progress: number;
  completed: boolean;
  category: string;
  icon: string;
}

export default function N5GrammarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load grammar lessons data
    const loadGrammarLessons = async () => {
      try {
        // Demo data - 20 bài học cốt lõi N5
        const demoLessons: GrammarLesson[] = [
          // TRỢ TỪ CƠ BẢN
          {
            id: 'g001',
            lessonNumber: 1,
            title: 'Trợ từ は (wa)',
            japaneseTitle: 'Bài 1\n第1課',
            description: 'Chủ ngữ, chủ đề của câu',
            difficulty: 'easy',
            duration: '15 phút',
            patterns: 3,
            examples: 8,
            progress: 0,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g002',
            lessonNumber: 2,
            title: 'Trợ từ が (ga)',
            japaneseTitle: 'Bài 2\n第2課',
            description: 'Chủ ngữ của hành động',
            difficulty: 'easy',
            duration: '20 phút',
            patterns: 4,
            examples: 10,
            progress: 0,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g003',
            lessonNumber: 3,
            title: 'Trợ từ を (wo)',
            japaneseTitle: 'Bài 3\n第3課',
            description: 'Đối tượng của hành động',
            difficulty: 'easy',
            duration: '18 phút',
            patterns: 3,
            examples: 12,
            progress: 80,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g004',
            lessonNumber: 4,
            title: 'Trợ từ に (ni)',
            japaneseTitle: 'Bài 4\n第4課',
            description: 'Thời gian, địa điểm, mục đích',
            difficulty: 'medium',
            duration: '25 phút',
            patterns: 5,
            examples: 15,
            progress: 60,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g005',
            lessonNumber: 5,
            title: 'Trợ từ で (de)',
            japaneseTitle: 'Bài 5\n第5課',
            description: 'Phương tiện, địa điểm hành động',
            difficulty: 'medium',
            duration: '22 phút',
            patterns: 4,
            examples: 12,
            progress: 40,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g006',
            lessonNumber: 6,
            title: 'Trợ từ へ (he)',
            japaneseTitle: 'Bài 6\n第6課',
            description: 'Hướng di chuyển',
            difficulty: 'easy',
            duration: '15 phút',
            patterns: 2,
            examples: 8,
            progress: 20,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g007',
            lessonNumber: 7,
            title: 'Trợ từ から (kara)',
            japaneseTitle: 'Bài 7\n第7課',
            description: 'Điểm bắt đầu, nguyên nhân',
            difficulty: 'medium',
            duration: '20 phút',
            patterns: 3,
            examples: 10,
            progress: 0,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },
          {
            id: 'g008',
            lessonNumber: 8,
            title: 'Trợ từ まで (made)',
            japaneseTitle: 'Bài 8\n第8課',
            description: 'Điểm kết thúc, giới hạn',
            difficulty: 'medium',
            duration: '18 phút',
            patterns: 3,
            examples: 8,
            progress: 0,
            completed: false,
            category: 'basic-particles',
            icon: '🎯'
          },

          // CHIA ĐỘNG TỪ
          {
            id: 'g009',
            lessonNumber: 9,
            title: 'Thể từ điển (辞書形)',
            japaneseTitle: 'Bài 9\n第9課',
            description: 'Dạng cơ bản của động từ',
            difficulty: 'easy',
            duration: '30 phút',
            patterns: 6,
            examples: 20,
            progress: 90,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },
          {
            id: 'g010',
            lessonNumber: 10,
            title: 'Thể ます (masu)',
            japaneseTitle: 'Bài 10\n第10課',
            description: 'Dạng lịch sự của động từ',
            difficulty: 'easy',
            duration: '25 phút',
            patterns: 5,
            examples: 18,
            progress: 85,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },
          {
            id: 'g011',
            lessonNumber: 11,
            title: 'Thể て (te)',
            japaneseTitle: 'Bài 11\n第11課',
            description: 'Dạng liên kết, yêu cầu',
            difficulty: 'hard',
            duration: '40 phút',
            patterns: 8,
            examples: 25,
            progress: 30,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },
          {
            id: 'g012',
            lessonNumber: 12,
            title: 'Thể た (ta)',
            japaneseTitle: 'Bài 12\n第12課',
            description: 'Dạng quá khứ của động từ',
            difficulty: 'hard',
            duration: '35 phút',
            patterns: 7,
            examples: 22,
            progress: 25,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },

          // TÍNH TỪ
          {
            id: 'g013',
            lessonNumber: 13,
            title: 'Tính từ い (i-adjective)',
            japaneseTitle: 'Bài 13\n第13課',
            description: 'Tính từ kết thúc bằng い',
            difficulty: 'medium',
            duration: '30 phút',
            patterns: 6,
            examples: 20,
            progress: 70,
            completed: false,
            category: 'adjectives',
            icon: '🎨'
          },
          {
            id: 'g014',
            lessonNumber: 14,
            title: 'Tính từ な (na-adjective)',
            japaneseTitle: 'Bài 14\n第14課',
            description: 'Tính từ kết thúc bằng な',
            difficulty: 'medium',
            duration: '28 phút',
            patterns: 5,
            examples: 18,
            progress: 65,
            completed: false,
            category: 'adjectives',
            icon: '🎨'
          },

          // CÂU GHÉP
          {
            id: 'g015',
            lessonNumber: 15,
            title: 'Liên từ と (to)',
            japaneseTitle: 'Bài 15\n第15課',
            description: 'Và, cùng với',
            difficulty: 'easy',
            duration: '20 phút',
            patterns: 3,
            examples: 12,
            progress: 50,
            completed: false,
            category: 'sentence-connection',
            icon: '🔗'
          },
          {
            id: 'g016',
            lessonNumber: 16,
            title: 'Liên từ や (ya)',
            japaneseTitle: 'Bài 16\n第16課',
            description: 'Và (liệt kê không đầy đủ)',
            difficulty: 'easy',
            duration: '18 phút',
            patterns: 2,
            examples: 10,
            progress: 40,
            completed: false,
            category: 'sentence-connection',
            icon: '🔗'
          },
          {
            id: 'g017',
            lessonNumber: 17,
            title: 'Liên từ が (ga)',
            japaneseTitle: 'Bài 17\n第17課',
            description: 'Nhưng, tuy nhiên',
            difficulty: 'medium',
            duration: '22 phút',
            patterns: 4,
            examples: 15,
            progress: 20,
            completed: false,
            category: 'sentence-connection',
            icon: '🔗'
          },
          {
            id: 'g018',
            lessonNumber: 18,
            title: 'Liên từ から (kara)',
            japaneseTitle: 'Bài 18\n第18課',
            description: 'Vì, bởi vì',
            difficulty: 'medium',
            duration: '25 phút',
            patterns: 4,
            examples: 12,
            progress: 15,
            completed: false,
            category: 'sentence-connection',
            icon: '🔗'
          },

          // THÌ VÀ THỜI GIAN
          {
            id: 'g019',
            lessonNumber: 19,
            title: 'Thì hiện tại',
            japaneseTitle: 'Bài 19\n第19課',
            description: 'Cách diễn đạt hiện tại',
                difficulty: 'easy',
            duration: '25 phút',
            patterns: 5,
            examples: 18,
            progress: 95,
            completed: false,
            category: 'tense-time',
            icon: '⏰'
          },
          {
            id: 'g020',
            lessonNumber: 20,
            title: 'Thì quá khứ',
            japaneseTitle: 'Bài 20\n第20課',
            description: 'Cách diễn đạt quá khứ',
            difficulty: 'medium',
            duration: '30 phút',
            patterns: 6,
            examples: 20,
            progress: 75,
            completed: false,
            category: 'tense-time',
            icon: '⏰'
          },

          // BỔ SUNG 5 BÀI HỌC CUỐI CÙNG
          {
            id: 'g021',
            lessonNumber: 21,
            title: 'Thể khả năng',
            japaneseTitle: 'Bài 21\n第21課',
            description: 'Có thể, có khả năng làm gì',
            difficulty: 'hard',
            duration: '35 phút',
            patterns: 5,
            examples: 18,
            progress: 0,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },
          {
            id: 'g022',
            lessonNumber: 22,
            title: 'Thể bị động',
            japaneseTitle: 'Bài 22\n第22課',
            description: 'Bị, được làm gì đó',
            difficulty: 'hard',
            duration: '40 phút',
            patterns: 6,
            examples: 20,
            progress: 0,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },
          {
            id: 'g023',
            lessonNumber: 23,
            title: 'Thể sai khiến',
            japaneseTitle: 'Bài 23\n第23課',
            description: 'Bắt, cho phép làm gì',
            difficulty: 'hard',
            duration: '38 phút',
            patterns: 5,
            examples: 16,
            progress: 0,
            completed: false,
            category: 'verb-conjugation',
            icon: '📝'
          },
          {
            id: 'g024',
            lessonNumber: 24,
            title: 'Câu điều kiện',
            japaneseTitle: 'Bài 24\n第24課',
            description: 'Nếu... thì...',
            difficulty: 'hard',
            duration: '45 phút',
            patterns: 7,
            examples: 25,
            progress: 0,
            completed: false,
            category: 'sentence-connection',
            icon: '🔗'
          },
          {
            id: 'g025',
            lessonNumber: 25,
            title: 'Câu so sánh',
            japaneseTitle: 'Bài 25\n第25課',
            description: 'So sánh hơn, nhất, bằng',
            difficulty: 'medium',
            duration: '32 phút',
            patterns: 6,
            examples: 22,
            progress: 0,
            completed: false,
            category: 'adjectives',
            icon: '🎨'
          }
        ];

        setLessons(demoLessons);
        setLoading(false);
      } catch (error) {
        console.error('Error loading grammar lessons:', error);
        setLoading(false);
      }
    };

    loadGrammarLessons();
  }, []);

  const categories = [
    { id: 'basic-particles', name: 'Trợ từ cơ bản', icon: '🎯', color: 'from-blue-500 to-blue-600' },
    { id: 'verb-conjugation', name: 'Chia động từ', icon: '📝', color: 'from-green-500 to-green-600' },
    { id: 'adjectives', name: 'Tính từ', icon: '🎨', color: 'from-purple-500 to-purple-600' },
    { id: 'sentence-connection', name: 'Câu ghép', icon: '🔗', color: 'from-orange-500 to-orange-600' },
    { id: 'tense-time', name: 'Thì và thời gian', icon: '⏰', color: 'from-red-500 to-red-600' }
  ];

  const filteredLessons = selectedCategory 
    ? lessons.filter(lesson => lesson.category === selectedCategory)
    : lessons;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return 'Không xác định';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải bài học ngữ pháp...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">




        {/* Grammar Lessons Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="text-indigo-600" />
            Tất cả bài học
            <span className="text-lg font-normal text-gray-600">
              ({lessons.length} bài)
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Lesson Header */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-3 text-center whitespace-pre-line">{lesson.japaneseTitle}</h3>
                  

                  
                  {/* Action Button */}
                  <div className="text-center">
                    <Link
                      href={`/courses/japanese/n5/grammar/lesson/${lesson.lessonNumber}`}
                      className="inline-block w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-center hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      {lesson.completed ? 'Ôn lại' : 'Bắt đầu học'}
                    </Link>
                  </div>
                </div>
                

              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-yellow-600" />
            Hành động nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/courses/japanese/n5/grammar/practice"
              className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
            >
              <div className="p-3 rounded-lg bg-blue-500 text-white">
                <Target size={24} />
              </div>
                    <div>
                <h3 className="font-bold text-gray-900">Luyện tập</h3>
                <p className="text-sm text-gray-600">Bài tập ngữ pháp</p>
                    </div>
            </Link>
            
            <Link
              href="/courses/japanese/n5/grammar/quiz"
              className="flex items-center gap-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors border border-green-200"
            >
              <div className="p-3 rounded-lg bg-green-500 text-white">
                <BookOpen size={24} />
                              </div>
                              <div>
                <h3 className="font-bold text-gray-900">Kiểm tra</h3>
                <p className="text-sm text-gray-600">Bài kiểm tra ngữ pháp</p>
                              </div>
            </Link>
            
            <Link
              href="/courses/japanese/n5/grammar/reference"
              className="flex items-center gap-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200"
            >
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <Star size={24} />
                    </div>
              <div>
                <h3 className="font-bold text-gray-900">Tài liệu tham khảo</h3>
                <p className="text-sm text-gray-600">Bảng tóm tắt ngữ pháp</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
