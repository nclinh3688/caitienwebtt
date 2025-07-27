"use client";

import { useState } from 'react';
import lessons from '@/data/listening/kaiwa-lessons.json';

// Define the type for a lesson for better type-checking
interface Lesson {
  id: number;
  title: string;
  url: string;
  level: string;
}

export default function ListeningPage() {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [playingLesson, setPlayingLesson] = useState<number | null>(null);

  const playAudio = (lesson: Lesson) => {
    setCurrentAudio(lesson.url);
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

      {currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-center">
                 <audio controls autoPlay src={currentAudio} className="w-full max-w-2xl">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
      )}
    </div>
  );
}