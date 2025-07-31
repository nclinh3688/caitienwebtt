"use client";

import { useState, useEffect } from 'react';
import lessons from '@/data/listening/kaiwa-lessons.json';
import AudioPlayer from '@/components/AudioPlayer';
import { PlayIcon, ClockIcon, BookOpenIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { getLessonProgress, getProgressStats, formatTime } from '@/lib/progress';

interface TranscriptItem {
  speaker: string;
  japanese: string;
  vietnamese: string;
  time: string;
}

interface Lesson {
  id: number;
  title: string;
  url: string;
  level: string;
  description: string;
  duration: string;
  vocabulary: string[];
  transcript: TranscriptItem[];
}

export default function ListeningPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [progressStats, setProgressStats] = useState(() => getProgressStats(lessons));

  const filteredLessons = filterLevel === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.level === filterLevel);

  const levels = ['all', ...Array.from(new Set(lessons.map(lesson => lesson.level)))];

  // Update progress stats when modal closes
  useEffect(() => {
    if (!selectedLesson) {
      setProgressStats(getProgressStats(lessons));
    }
  }, [selectedLesson]);

  const openPlayer = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const closePlayer = () => {
    setSelectedLesson(null);
  };

  const LessonCard = ({ lesson }: { lesson: Lesson }) => {
    const lessonProgress = getLessonProgress(lesson.id);
    
    return (
      <div 
        onClick={() => openPlayer(lesson)}
        className="group bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-blue-300 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b relative">
          {lessonProgress.completed && (
            <div className="absolute top-2 right-2">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {lesson.level}
            </span>
            <PlayIcon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{lesson.title}</h3>
          <p className="text-gray-600 text-sm">{lesson.description}</p>
          
          {/* Progress indicators */}
          {(lessonProgress.playCount > 0 || lessonProgress.timeSpent > 0) && (
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              {lessonProgress.playCount > 0 && (
                <span>🎧 {lessonProgress.playCount}</span>
              )}
              {lessonProgress.timeSpent > 0 && (
                <span>⏱️ {formatTime(lessonProgress.timeSpent)}</span>
              )}
            </div>
                     )}
         </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpenIcon className="w-4 h-4" />
              <span>{lesson.vocabulary.length} từ vựng</span>
            </div>
          </div>

          {/* Vocabulary Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Từ vựng chính:</h4>
            <div className="flex flex-wrap gap-1">
              {lesson.vocabulary.slice(0, 3).map((word, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  {word}
                </span>
              ))}
              {lesson.vocabulary.length > 3 && (
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                  +{lesson.vocabulary.length - 3} khác
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <div className={`rounded-lg p-3 transition-colors ${
            lessonProgress.completed 
              ? 'bg-green-50 group-hover:bg-green-100' 
              : 'bg-gray-50 group-hover:bg-blue-50'
          }`}>
            <p className={`text-sm transition-colors text-center ${
              lessonProgress.completed
                ? 'text-green-600 group-hover:text-green-700'
                : 'text-gray-600 group-hover:text-blue-600'
            }`}>
              {lessonProgress.completed ? '✓ Đã hoàn thành' : 'Click để bắt đầu học →'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Luyện nghe Hội thoại
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nâng cao kỹ năng nghe tiếng Nhật với các bài hội thoại thực tế, transcript chi tiết và từ vựng quan trọng
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filterLevel === level
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {level === 'all' ? 'Tất cả' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{progressStats.totalLessons}</div>
            <div className="text-gray-600">Tổng số bài</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{progressStats.completedLessons}</div>
            <div className="text-gray-600">Đã hoàn thành</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(progressStats.completionRate)}%
            </div>
            <div className="text-gray-600">Tiến độ</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {formatTime(progressStats.totalTimeSpent)}
            </div>
            <div className="text-gray-600">Thời gian học</div>
          </div>
        </div>

        {/* Progress Overview */}
        {progressStats.completedLessons > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Tiến độ học tập</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Hoàn thành: {progressStats.completedLessons}/{progressStats.totalLessons}</span>
                  <span>{Math.round(progressStats.completionRate)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressStats.completionRate}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-700">Thời gian học</div>
                <div className="text-blue-600">{formatTime(progressStats.totalTimeSpent)}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-700">Cấp độ yêu thích</div>
                <div className="text-purple-600">{progressStats.favoriteLevel || 'Chưa có'}</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-700">Trung bình/bài</div>
                <div className="text-green-600">
                  {progressStats.completedLessons > 0 
                    ? formatTime(progressStats.totalTimeSpent / progressStats.completedLessons)
                    : '0s'
                  }
                </div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-700">Còn lại</div>
                <div className="text-orange-600">{progressStats.totalLessons - progressStats.completedLessons} bài</div>
              </div>
            </div>
          </div>
        )}

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl mb-4">Không tìm thấy bài học nào</div>
            <button
              onClick={() => setFilterLevel('all')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Xem tất cả bài học
            </button>
          </div>
        )}
      </div>

      {/* Audio Player Modal */}
      {selectedLesson && (
        <AudioPlayer lesson={selectedLesson} onClose={closePlayer} />
      )}
    </div>
  );
}