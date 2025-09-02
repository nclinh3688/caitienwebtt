'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';

import { LessonOverview } from '@/types/lesson';

interface GrammarLessonListClientProps {
  lessons: LessonOverview[];
}

export default function GrammarLessonListClient({ lessons }: GrammarLessonListClientProps) {
  return (
    <div className="space-y-4">
      {lessons.map(lesson => (
        <Link key={lesson.lessonNumber} href={`/courses/japanese/n5/grammar/${lesson.lessonNumber}`} passHref>
          <motion.div
            className="block p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: lesson.lessonNumber * 0.05 }}
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              第{lesson.lessonNumber}課   |   Bài {lesson.lessonNumber}
            </h2>
            
            
            <div className="flex items-center justify-between text-gray-500 text-sm">
              
              <span className="flex items-center">
                <Star size={16} className="mr-1" /> {lesson.difficulty}
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
