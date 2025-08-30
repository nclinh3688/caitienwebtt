'use client';

import VocabularyLearning from '@/components/learning/VocabularyLearning';

export default function VocabularyPage() {
  // Sample data for demonstration
  const sampleTopics = [
    {
      id: 'greetings',
      title: 'Chào hỏi cơ bản',
      description: 'Các từ vựng chào hỏi hàng ngày',
      icon: '👋',
      progress: 25,
      totalWords: 25,
      learnedWords: 6,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'numbers',
      title: 'Số đếm',
      description: 'Số từ 1-100 và cách đếm',
      icon: '🔢',
      progress: 60,
      totalWords: 30,
      learnedWords: 18,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'colors',
      title: 'Màu sắc',
      description: 'Từ vựng về màu sắc cơ bản',
      icon: '🎨',
      progress: 40,
      totalWords: 20,
      learnedWords: 8,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'family',
      title: 'Gia đình',
      description: 'Từ vựng về các thành viên gia đình',
      icon: '👨‍👩‍👧‍👦',
      progress: 15,
      totalWords: 35,
      learnedWords: 5,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <VocabularyLearning
      level="N5"
      totalProgress={35}
      totalWords={200}
      learnedWords={70}
      topics={sampleTopics}
    />
  );
}
