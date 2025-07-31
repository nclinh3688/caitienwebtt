"use client";

import { useState } from 'react';
import lessons from '@/data/listening/kaiwa-lessons.json';
import { AudioPlayer } from '@/components/ui/audio-player';

// Define the type for a lesson for better type-checking
interface Lesson {
  id: number;
  title: string;
  url: string;
  level: string;
}

export default function ListeningPage() {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [playingLesson, setPlayingLesson] = useState<number | null>(null);

  const playAudio = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setPlayingLesson(lesson.id);
  };

  const n5Lessons = lessons.filter(lesson => lesson.level === 'N5').sort((a, b) => a.id - b.id);
  const n4Lessons = lessons.filter(lesson => lesson.level === 'N4').sort((a, b) => a.id - b.id);

  const renderLessonList = (levelLessons: Lesson[], levelName: string) => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">{levelName}</h2>
      <div className="space-y-4">
        {levelLessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => playAudio(lesson)}
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer flex justify-between items-center ${
              playingLesson === lesson.id
                ? 'bg-blue-100 border-blue-500 shadow-lg'
                : 'bg-white border-gray-200 hover:bg-gray-100 hover:shadow-md'
            }`}
          >
            <h5 className="text-xl font-semibold tracking-tight text-gray-800">{lesson.title}</h5>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${playingLesson === lesson.id ? 'text-blue-600' : 'text-gray-500'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-5xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
        Luyện nghe Hội thoại
      </h1>

      {renderLessonList(n5Lessons, "N5 Kaiwa (Bài 1-25)")}
      {renderLessonList(n4Lessons, "N4 Kaiwa (Bài 26-50)")}

      {currentLesson && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t z-50">
          <AudioPlayer
            src={currentLesson.url}
            title={currentLesson.title}
            subtitle={`Cấp độ: ${currentLesson.level}`}
            autoPlay={true}
            showDownload={true}
            showSubtitles={true}
            subtitles={[
              // Sample subtitles - in real app, load from separate file
              { start: 0, end: 5, text: "はじめまして、田中と申します。" },
              { start: 5, end: 10, text: "どうぞよろしくお願いします。" },
            ]}
            onProgress={(current, duration) => {
              // Track progress for user analytics
              console.log(`Progress: ${current}/${duration}`);
            }}
          />
        </div>
      )}
    </div>
  );
}