'use client';

import { useParams } from 'next/navigation';
import kaiwaLessons from '@/data/listening/kaiwa-lessons.json';
import Link from 'next/link';
import { FaBook, FaPen, FaHeadphones, FaClipboardList, FaMicrophone } from 'react-icons/fa';

// Import the specific lesson data for B01, B02, B03. In a real app, this would be dynamic.
import lessonDataB01 from '@/data/jlpt-n5/B01.json';
import lessonDataB02 from '@/data/jlpt-n5/B02.json';
import lessonDataB03 from '@/data/jlpt-n5/B03.json';

export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;

  // Find the audio lesson from kaiwaLessons (which uses numeric IDs)
  const audioLesson = kaiwaLessons.find(l => l.id === parseInt(lessonId));

  // Map the numeric lessonId to the Bxx format for vocabulary/grammar data
  // This is a simplified mapping for MVP. For a full app, this would be more robust.
  let currentLessonData = null;
  if (lessonId === '1') {
    currentLessonData = lessonDataB01;
  } else if (lessonId === '2') {
    currentLessonData = lessonDataB02;
  } else if (lessonId === '3') {
    currentLessonData = lessonDataB03;
  }

  if (!audioLesson || !currentLessonData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Không tìm thấy bài học hoặc dữ liệu</h1>
        <Link href="/courses/japanese/n5">
          <div className="text-green-600 hover:underline mt-4">Quay lại danh sách</div>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Lesson Header */}
      <div className="text-center mb-12">
        <p className="text-lg font-semibold text-red-500">Khóa học N5</p>
        <h1 className="text-5xl font-extrabold text-gray-800 mt-2">Bài {lessonId}</h1>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content - Left/Center Column */}
        <div className="lg:col-span-2 space-y-10">
          {/* Từ vựng (Vocabulary) - ĐƯA LÊN ĐẦU */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"><FaBook className="text-green-500" /> Từ vựng</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6">Từ</th>
                    <th className="py-3 px-6">Kanji</th>
                    <th className="py-3 px-6">Nghĩa</th>
                    <th className="py-3 px-6">Ghi chú</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {currentLessonData.vocabulary.map((vocab, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 whitespace-nowrap font-medium">{vocab.content}</td>
                      <td className="py-3 px-6">{vocab.kanji || '-'}</td>
                      <td className="py-3 px-6">{vocab.meaning}</td>
                      <td className="py-3 px-6">-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ngữ pháp (Grammar) */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"><FaPen className="text-green-500" /> Ngữ pháp</h2>
            <div className="space-y-6">
              {currentLessonData.grammar.map((grammar, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h3 className="font-bold text-xl mb-2 text-blue-700">{grammar.content}</h3>
                  <p className="text-gray-800 mb-2"><span className="font-semibold">Ý nghĩa:</span> {grammar.meaning}</p>
                  {grammar.example && (
                    <p className="text-gray-600 italic mb-2"><span className="font-semibold">Ví dụ:</span> {grammar.example} {grammar.translation_example ? `(${grammar.translation_example})` : ''}</p>
                  )}
                  {grammar.additional_notes && (
                    <p className="text-gray-500 text-sm">{grammar.additional_notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kanji (nếu có) */}
          {(currentLessonData as any).kanji && Array.isArray((currentLessonData as any).kanji) && (currentLessonData as any).kanji.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"><span className="text-yellow-500">漢字</span> Kanji</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6">Kanji</th>
                      <th className="py-3 px-6">Âm On</th>
                      <th className="py-3 px-6">Âm Kun</th>
                      <th className="py-3 px-6">Nghĩa</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 text-sm font-light">
                    {(currentLessonData as any).kanji.map((kanji: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 font-bold text-2xl">{kanji.character}</td>
                        <td className="py-3 px-6">{kanji.onyomi}</td>
                        <td className="py-3 px-6">{kanji.kunyomi}</td>
                        <td className="py-3 px-6">{kanji.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Hội thoại (Transcript) - Đưa xuống dưới cùng */}
          {currentLessonData.transcript && (
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-10">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3"><FaHeadphones className="text-green-500" /> Hội thoại</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2"><FaMicrophone className="text-blue-500" /> Bản ghi hội thoại</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{currentLessonData.transcript}</p>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar with other sections */}
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-28">
                <h3 className="text-xl font-bold mb-4">Nội dung bài học</h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-lg text-gray-700"><FaBook /> Từ vựng</li>
                    <li className="flex items-center gap-3 text-lg text-gray-700"><FaPen /> Ngữ pháp</li>
                    <li className="flex items-center gap-3 text-lg font-semibold text-green-600"><FaHeadphones /> Hội thoại</li>
                    <li className="flex items-center gap-3 text-lg text-gray-400 italic"><FaClipboardList /> Bài tập (sắp có)</li>
                </ul>
            </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <Link href="/courses/japanese/n5">
            <div className="text-green-600 font-semibold hover:underline cursor-pointer">← Quay lại danh sách bài học</div>
        </Link>
      </div>
    </div>
  );
}