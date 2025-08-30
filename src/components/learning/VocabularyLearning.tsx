'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Play, 
  Target, 
  Users, 
  Palette, 
  Home,
  Brain,
  Trophy,
  Clock,
  Star
} from 'lucide-react';

interface VocabularyTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  totalWords: number;
  learnedWords: number;
  color: string;
}

interface VocabularyLearningProps {
  level: string;
  totalProgress: number;
  totalWords: number;
  learnedWords: number;
  topics: VocabularyTopic[];
}

export default function VocabularyLearning({
  level = "N5",
  totalProgress = 0,
  totalWords = 200,
  learnedWords = 0,
  topics = []
}: VocabularyLearningProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAIPractice, setShowAIPractice] = useState(false);

  // Default topics if none provided
  const defaultTopics: VocabularyTopic[] = [
    {
      id: 'greetings',
      title: 'Chào hỏi cơ bản',
      description: 'Các từ vựng chào hỏi hàng ngày',
      icon: <Users size={24} />,
      progress: 0,
      totalWords: 25,
      learnedWords: 0,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'numbers',
      title: 'Số đếm',
      description: 'Số từ 1-100 và cách đếm',
      icon: <Target size={24} />,
      progress: 0,
      totalWords: 30,
      learnedWords: 0,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'colors',
      title: 'Màu sắc',
      description: 'Từ vựng về màu sắc cơ bản',
      icon: <Palette size={24} />,
      progress: 0,
      totalWords: 20,
      learnedWords: 0,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'family',
      title: 'Gia đình',
      description: 'Từ vựng về các thành viên gia đình',
      icon: <Home size={24} />,
      progress: 0,
      totalWords: 35,
      learnedWords: 0,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const currentTopics = topics.length > 0 ? topics : defaultTopics;

  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
    // Here you would navigate to the specific topic learning page
    console.log(`Navigating to topic: ${topicId}`);
  };

  const handleAIPractice = () => {
    setShowAIPractice(true);
    // Here you would open AI practice modal or navigate to AI practice page
    console.log('Opening AI Practice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <motion.div 
        className="bg-white shadow-sm border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.button 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              <span>Quay lại {level}</span>
            </motion.button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Từ vựng {level}
              </h1>
              <p className="text-gray-600">
                Học {totalWords}+ từ vựng cơ bản với phát âm chuẩn
              </p>
            </div>

            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overall Progress Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tổng tiến độ
              </h2>
              <p className="text-gray-600 mb-4">
                {learnedWords} / {totalWords} từ đã học
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-500" />
                  <span className="text-gray-600">{currentTopics.length} chủ đề</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-green-500" />
                  <span className="text-gray-600">Ước tính: {Math.ceil((totalWords - learnedWords) / 10)} ngày</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="relative w-32 h-32"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
                    animate={{ 
                      strokeDasharray: 283, 
                      strokeDashoffset: 283 - (283 * totalProgress) / 100 
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{totalProgress}%</div>
                    <div className="text-sm text-gray-500">Hoàn thành</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* AI Practice Generator */}
        <motion.div 
          className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl shadow-lg p-8 mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles size={32} className="text-yellow-300" />
              <h2 className="text-2xl font-bold">AI Practice Generator</h2>
            </div>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              Tạo bài tập tùy chỉnh với AI để luyện tập Từ vựng {level}. 
              AI sẽ phân tích tiến độ học tập và tạo bài tập phù hợp nhất cho bạn.
            </p>
            <motion.button
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg flex items-center gap-3 mx-auto hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAIPractice}
            >
              <Brain size={24} />
              Tạo bài tập AI
            </motion.button>
          </div>
        </motion.div>

        {/* Vocabulary Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => handleTopicClick(topic.id)}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${topic.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {topic.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {topic.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {topic.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Tiến độ</span>
                    <span>{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${topic.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {topic.learnedWords}/{topic.totalWords} từ
                  </span>
                  <motion.button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={16} className="inline mr-1" />
                    Học
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Tips */}
        <motion.div 
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <Star size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Mẹo học từ vựng hiệu quả
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Học 10-15 từ mỗi ngày để duy trì hiệu quả
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Sử dụng AI Practice để ôn tập thông minh
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Luyện tập phát âm với audio chuẩn
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating AI Assistant */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.button
          className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Brain size={24} />
        </motion.button>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap">
          AI Trợ lý
        </div>
      </motion.div>
    </div>
  );
}
