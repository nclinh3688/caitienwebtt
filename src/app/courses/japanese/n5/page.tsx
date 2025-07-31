import Link from 'next/link';
import lessons from '@/data/jlpt-n5/lessons-n5.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FaPlay, FaQuestionCircle, FaPen, FaCheck, FaLock } from 'react-icons/fa';

export default function JapaneseN5Page() {
  // In real app, get from user progress data
  const completedLessons = 3;
  const progress = (completedLessons / lessons.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">JLPT N5 Course</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Cấp độ cơ bản cho người mới bắt đầu học tiếng Nhật. Học từ vựng, ngữ pháp và kanji căn bản.
        </p>
        
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Tiến trình học tập</h3>
            <span className="text-2xl font-bold text-green-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-4" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{completedLessons}</div>
              <div className="text-sm text-gray-600">Đã hoàn thành</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{lessons.length - completedLessons}</div>
              <div className="text-sm text-gray-600">Còn lại</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">N5</div>
              <div className="text-sm text-gray-600">Cấp độ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/courses/japanese/n5/quiz" passHref>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <FaQuestionCircle className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Quiz N5</h3>
              <p className="text-blue-600">Kiểm tra kiến thức</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/listening" passHref>
          <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <FaPlay className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Luyện Nghe</h3>
              <p className="text-green-600">Bài hội thoại N5</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <FaPen className="text-4xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Luyện Kanji</h3>
            <p className="text-purple-600">Viết và ghi nhớ</p>
          </CardContent>
        </Card>
      </div>

      {/* Lessons List */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Danh sách bài học</h2>
        <div className="grid gap-4">
          {lessons.map((lesson, index) => {
            const isCompleted = index < completedLessons;
            const isCurrentLesson = index === completedLessons;
            const isLocked = index > completedLessons;

            return (
              <Card 
                key={lesson.id} 
                className={`transition-all duration-300 ${
                  isCompleted ? 'bg-green-50 border-green-200' :
                  isCurrentLesson ? 'bg-blue-50 border-blue-200 shadow-lg' :
                  'bg-gray-50 border-gray-200'
                } ${!isLocked ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                        isCompleted ? 'bg-green-500' :
                        isCurrentLesson ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}>
                        {isCompleted ? (
                          <FaCheck />
                        ) : isLocked ? (
                          <FaLock />
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{lesson.title}</h3>
                        <p className="text-gray-600">{lesson.description}</p>
                        {lesson.vocabulary && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              Từ vựng: {lesson.vocabulary.length}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              Ngữ pháp: {lesson.grammar?.length || 0}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                              Kanji: {lesson.kanji?.length || 0}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {isCompleted && (
                        <span className="text-green-600 font-semibold">Hoàn thành</span>
                      )}
                      {isCurrentLesson && (
                        <span className="text-blue-600 font-semibold">Đang học</span>
                      )}
                      {!isLocked && (
                        <Link href={lesson.path} passHref>
                          <Button variant={isCurrentLesson ? 'default' : 'outline'}>
                            {isCompleted ? 'Ôn lại' : isCurrentLesson ? 'Tiếp tục' : 'Bắt đầu'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Study Tips */}
      <div className="mt-16">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-yellow-800">
              💡 Mẹo học hiệu quả
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Lộ trình học N5:</h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Học 2-3 bài/tuần</li>
                  <li>• Ôn lại bài cũ mỗi ngày</li>
                  <li>• Luyện nghe ít nhất 30 phút/ngày</li>
                  <li>• Viết kanji 10-15 phút/ngày</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Chuẩn bị thi JLPT:</h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Hoàn thành 25 bài học</li>
                  <li>• Làm quiz đạt 80% trở lên</li>
                  <li>• Thuộc 103 kanji cơ bản</li>
                  <li>• Nghe hiểu hội thoại hàng ngày</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}