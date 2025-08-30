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

export default function N4GrammarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lessons, setLessons] = useState<GrammarLesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load grammar lessons data
    const loadGrammarLessons = async () => {
      try {
        // Demo data - 25 bài học cốt lõi N4
        const demoLessons: GrammarLesson[] = [
          // TRỢ TỪ NÂNG CAO
          {
            id: '26',
            title: 'Trợ từ によって (ni yotte)',
            japaneseTitle: 'Bài 26\n第26課',
            description: 'Theo, bởi, do',
            difficulty: 'medium',
            duration: '20 phút',
            patterns: 4,
            examples: 12,
            progress: 0,
            completed: false,
            category: 'advanced-particles',
            icon: '🎯'
          },
          {
            id: 'g002',
            title: 'Trợ từ について (ni tsuite)',
            japaneseTitle: 'Bài 27\n第27課',
            description: 'Về, liên quan đến',
            difficulty: 'medium',
            duration: '22 phút',
            patterns: 4,
            examples: 15,
            progress: 0,
            completed: false,
            category: 'advanced-particles',
            icon: '🎯'
          },
          {
            id: 'g003',
            title: 'Trợ từ に対して (ni taishite)',
            japaneseTitle: 'Bài 28\n第28課',
            description: 'Đối với, hướng về',
            difficulty: 'medium',
            duration: '25 phút',
            patterns: 5,
            examples: 18,
            progress: 0,
            completed: false,
            category: 'advanced-particles',
            icon: '🎯'
          },
          {
            id: 'g004',
            title: 'Trợ từ として (toshite)',
            japaneseTitle: 'Bài 29\n第29課',
            description: 'Với tư cách là, như là',
            difficulty: 'medium',
            duration: '23 phút',
            patterns: 4,
            examples: 16,
            progress: 0,
            completed: false,
            category: 'advanced-particles',
            icon: '🎯'
          },
          {
            id: 'g005',
            title: 'Trợ từ によって (ni yotte)',
            japaneseTitle: 'Bài 30\n第30課',
            description: 'Tùy theo, phụ thuộc vào',
            difficulty: 'hard',
            duration: '28 phút',
            patterns: 6,
            examples: 20,
            progress: 0,
            completed: false,
            category: 'advanced-particles',
            icon: '🎯'
          },

          // THỂ ĐỘNG TỪ NÂNG CAO
          {
            id: 'g006',
            title: 'Thể ば (ba)',
            japaneseTitle: 'Bài 31\n第31課',
            description: 'Điều kiện giả định',
            difficulty: 'hard',
            duration: '35 phút',
            patterns: 8,
            examples: 25,
            progress: 0,
            completed: false,
            category: 'advanced-verbs',
            icon: '📝'
          },
          {
            id: 'g007',
            title: 'Thể たら (tara)',
            japaneseTitle: 'Bài 32\n第32課',
            description: 'Điều kiện thực tế',
            difficulty: 'hard',
            duration: '32 phút',
            patterns: 7,
            examples: 22,
            progress: 0,
            completed: false,
            category: 'advanced-verbs',
            icon: '📝'
          },
          {
            id: 'g008',
            title: 'Thể なら (nara)',
            japaneseTitle: 'Bài 33\n第33課',
            description: 'Điều kiện giả định',
            difficulty: 'hard',
            duration: '30 phút',
            patterns: 6,
            examples: 20,
            progress: 0,
            completed: false,
            category: 'advanced-verbs',
            icon: '📝'
          },
          {
            id: 'g009',
            title: 'Thể ても (temo)',
            japaneseTitle: 'Bài 34\n第34課',
            description: 'Ngay cả khi, dù',
            difficulty: 'hard',
            duration: '33 phút',
            patterns: 7,
            examples: 24,
            progress: 0,
            completed: false,
            category: 'advanced-verbs',
            icon: '📝'
          },
          {
            id: '35',
            title: 'Thể なくても (nakutemo)',
            japaneseTitle: 'Bài 35\n第35課',
            description: 'Không cần, không phải',
            difficulty: 'hard',
            duration: '35 phút',
            patterns: 8,
            examples: 26,
            progress: 0,
            completed: false,
            category: 'advanced-verbs',
            icon: '📝'
          },

          // TÍNH TỪ NÂNG CAO
          {
            id: 'g011',
            title: 'Tính từ な + にする',
            japaneseTitle: 'Bài 36\n第36課',
            description: 'Làm cho, biến thành',
            difficulty: 'medium',
            duration: '28 phút',
            patterns: 6,
            examples: 20,
            progress: 0,
            completed: false,
            category: 'advanced-adjectives',
            icon: '🎨'
          },
          {
            id: 'g012',
            title: 'Tính từ い + くなる',
            japaneseTitle: 'Bài 37\n第37課',
            description: 'Trở nên, trở thành',
            difficulty: 'medium',
            duration: '26 phút',
            patterns: 5,
            examples: 18,
            progress: 0,
            completed: false,
            category: 'advanced-adjectives',
            icon: '🎨'
          },

          // CÂU GHÉP NÂNG CAO
          {
            id: 'g013',
            title: 'Liên từ けれども (keredomo)',
            japaneseTitle: 'Bài 38\n第38課',
            description: 'Nhưng, tuy nhiên',
            difficulty: 'medium',
            duration: '25 phút',
            patterns: 5,
            examples: 18,
            progress: 0,
            completed: false,
            category: 'advanced-connection',
            icon: '🔗'
          },
          {
            id: 'g014',
            title: 'Liên từ のに (noni)',
            japaneseTitle: 'Bài 39\n第39課',
            description: 'Mặc dù, nhưng',
            difficulty: 'hard',
            duration: '30 phút',
            patterns: 6,
            examples: 22,
            progress: 0,
            completed: false,
            category: 'advanced-connection',
            icon: '🔗'
          },
          {
            id: 'g015',
            title: 'Liên từ ばかりでなく (bakari de naku)',
            japaneseTitle: 'Bài 40\n第40課',
            description: 'Không chỉ... mà còn',
            difficulty: 'hard',
            duration: '32 phút',
            patterns: 7,
            examples: 24,
            progress: 0,
            completed: false,
            category: 'advanced-connection',
            icon: '🔗'
          },
          {
            id: 'g016',
            title: 'Liên từ どころか (dokoro ka)',
            japaneseTitle: 'Bài 41\n第41課',
            description: 'Không những... mà còn',
            difficulty: 'hard',
            duration: '35 phút',
            patterns: 8,
            examples: 26,
            progress: 0,
            completed: false,
            category: 'advanced-connection',
            icon: '🔗'
          },

          // THÌ VÀ THỜI GIAN NÂNG CAO
          {
            id: 'g017',
            title: 'Thì tương lai gần',
            japaneseTitle: 'Bài 42\n第42課',
            description: 'Sắp, chuẩn bị',
            difficulty: 'medium',
            duration: '28 phút',
            patterns: 6,
            examples: 20,
            progress: 0,
            completed: false,
            category: 'advanced-tense',
            icon: '⏰'
          },
          {
            id: 'g018',
            title: 'Thì hoàn thành',
            japaneseTitle: 'Bài 43\n第43課',
            description: 'Đã hoàn thành, xong',
            difficulty: 'hard',
            duration: '32 phút',
            patterns: 7,
            examples: 24,
            progress: 0,
            completed: false,
            category: 'advanced-tense',
            icon: '⏰'
          },

          // THỂ BỊ ĐỘNG NÂNG CAO
          {
            id: 'g019',
            title: 'Thể bị động gián tiếp',
            japaneseTitle: 'Bài 44\n第44課',
            description: 'Bị ảnh hưởng bởi',
            difficulty: 'hard',
            duration: '38 phút',
            patterns: 8,
            examples: 28,
            progress: 0,
            completed: false,
            category: 'advanced-passive',
            icon: '📝'
          },
          {
            id: 'g020',
            title: 'Thể bị động trực tiếp',
            japaneseTitle: 'Bài 45\n第45課',
            description: 'Bị làm gì đó',
            difficulty: 'hard',
            duration: '35 phút',
            patterns: 7,
            examples: 25,
            progress: 0,
            completed: false,
            category: 'advanced-passive',
            icon: '📝'
          },

          // THỂ SAI KHIẾN NÂNG CAO
          {
            id: 'g021',
            title: 'Thể sai khiến gián tiếp',
            japaneseTitle: 'Bài 46\n第46課',
            description: 'Cho phép, để',
            difficulty: 'hard',
            duration: '40 phút',
            patterns: 8,
            examples: 30,
            progress: 0,
            completed: false,
            category: 'advanced-causative',
            icon: '📝'
          },
          {
            id: 'g022',
            title: 'Thể sai khiến trực tiếp',
            japaneseTitle: 'Bài 47\n第47課',
            description: 'Bắt, buộc làm gì',
            difficulty: 'hard',
            duration: '38 phút',
            patterns: 7,
            examples: 26,
            progress: 0,
            completed: false,
            category: 'advanced-causative',
            icon: '📝'
          },

          // CÂU ĐIỀU KIỆN NÂNG CAO
          {
            id: 'g023',
            title: 'Câu điều kiện phức hợp',
            japaneseTitle: 'Bài 48\n第48課',
            description: 'Nếu... thì... (phức tạp)',
            difficulty: 'hard',
            duration: '45 phút',
            patterns: 9,
            examples: 32,
            progress: 0,
            completed: false,
            category: 'advanced-conditional',
            icon: '🔗'
          },
          {
            id: 'g024',
            title: 'Câu điều kiện giả định',
            japaneseTitle: 'Bài 49\n第49課',
            description: 'Giả sử, nếu như',
            difficulty: 'hard',
            duration: '42 phút',
            patterns: 8,
            examples: 30,
            progress: 0,
            completed: false,
            category: 'advanced-conditional',
            icon: '🔗'
          },
          {
            id: 'g025',
            title: 'Câu so sánh nâng cao',
            japaneseTitle: 'Bài 50\n第50課',
            description: 'So sánh phức tạp',
            difficulty: 'medium',
            duration: '35 phút',
            patterns: 7,
            examples: 25,
            progress: 0,
            completed: false,
            category: 'advanced-comparison',
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
                      href={`/courses/japanese/n4/grammar/lesson/${lesson.id}`}
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
              href="/courses/japanese/n4/grammar/practice"
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
              href="/courses/japanese/n4/grammar/quiz"
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
              href="/courses/japanese/n4/grammar/reference"
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
