'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaVolumeUp, 
  FaVolumeMute, 
  FaDownload,
  FaShare,
  FaHeart,
  FaBookmark,
  FaEye,
  FaClock,
  FaStar,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaRocket,
  FaCrown,
  FaGraduationCap,
  FaBrain,
  FaMagic,
  FaChartLine,
  FaUsers,
  FaTrophy,
  FaBook
} from 'react-icons/fa';

interface LessonData {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  audioUrl?: string;
  transcript?: string;
  vocabulary?: string[];
  grammar?: string[];
  exercises?: any[];
}

interface LearningProgress {
  id: string;
  skill: string;
  current: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface UserNotes {
  id: string;
  timestamp: number;
  content: string;
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'general';
}

export default function AdvancedLessonPlayer({ 
  lessonId, 
  onComplete, 
  onProgress 
}: {
  lessonId: string;
  onComplete: (lessonId: string) => void;
  onProgress: (lessonId: string, progress: number) => void;
}) {
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [learningProgress, setLearningProgress] = useState<LearningProgress[]>([]);
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const [activeTab, setActiveTab] = useState('lesson');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    console.log('🔄 AdvancedLessonPlayer: useEffect triggered');
    initializeLessonData();
  }, [lessonId]);

  const initializeLessonData = () => {
    console.log('🔄 AdvancedLessonPlayer: Initializing lesson data');
    
    // Mock lesson data
    const mockLessonData: LessonData = {
      id: lessonId,
      title: 'N5 Lesson 15: Basic Grammar Patterns',
      description: 'Learn fundamental Japanese grammar patterns including particle usage and verb conjugation',
      level: 'N5',
      duration: 1800, // 30 minutes in seconds
      progress: 65,
      status: 'in_progress',
      audioUrl: '/audio/n5-lesson-15.mp3',
      transcript: 'こんにちは。今日は基本的な文法パターンを勉強しましょう。',
      vocabulary: ['こんにちは', '今日', '基本的', '文法', 'パターン', '勉強'],
      grammar: ['は particle', 'を particle', 'ます form', 'て form'],
      exercises: [
        { id: '1', type: 'multiple_choice', question: 'Choose the correct particle', options: ['は', 'を', 'に', 'で'], correct: 'は' },
        { id: '2', type: 'fill_blank', question: 'Complete the sentence: 私は日本語___勉強します', answer: 'を' }
      ]
    };

    // Mock learning progress
    const mockLearningProgress: LearningProgress[] = [
      {
        id: '1',
        skill: 'Grammar Understanding',
        current: 75,
        target: 100,
        unit: '%',
        status: 'good'
      },
      {
        id: '2',
        skill: 'Vocabulary Retention',
        current: 68,
        target: 100,
        unit: '%',
        status: 'warning'
      },
      {
        id: '3',
        skill: 'Listening Comprehension',
        current: 82,
        target: 100,
        unit: '%',
        status: 'good'
      },
      {
        id: '4',
        skill: 'Speaking Practice',
        current: 45,
        target: 100,
        unit: '%',
        status: 'critical'
      }
    ];

    // Mock user notes
    const mockUserNotes: UserNotes[] = [
      {
        id: '1',
        timestamp: Date.now() - 24 * 60 * 60 * 1000,
        content: 'は particle marks the topic of the sentence',
        type: 'grammar'
      },
      {
        id: '2',
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        content: 'を particle marks the direct object',
        type: 'grammar'
      },
      {
        id: '3',
        timestamp: Date.now() - 60 * 60 * 1000,
        content: 'こんにちは = Hello (used during daytime)',
        type: 'vocabulary'
      }
    ];

    setLessonData(mockLessonData);
    setLearningProgress(mockLearningProgress);
    setUserNotes(mockUserNotes);
    setDuration(mockLessonData.duration);
  };

  const renderLesson = () => (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{lessonData?.title}</h2>
              <p className="text-gray-600 mb-3">{lessonData?.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FaGraduationCap />
                  Level: {lessonData?.level}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock />
                  Duration: {Math.floor((lessonData?.duration || 0) / 60)} min
                </span>
                <span className="flex items-center gap-1">
                  <FaChartLine />
                  Progress: {lessonData?.progress}%
                </span>
              </div>
            </div>
            <Badge className={
              lessonData?.status === 'completed' ? 'bg-green-100 text-green-800' :
              lessonData?.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }>
              {lessonData?.status?.replace('_', ' ')}
            </Badge>
          </div>
          
          <Progress value={lessonData?.progress || 0} className="h-3" />
        </CardContent>
      </Card>

      {/* Audio Player */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaVolumeUp className="text-green-600" />
            Audio Lesson
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </Button>
              
              <Button variant="outline" size="sm">
                <FaStop />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
              </div>
              <Progress value={(currentTime / duration) * 100} className="h-2" />
            </div>

            {/* Volume and Speed Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-20"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Speed:</span>
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transcript */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaEye className="text-blue-600" />
              Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">{lessonData?.transcript}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FaDownload className="mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <FaShare className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vocabulary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaBook className="text-green-600" />
              Key Vocabulary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {lessonData?.vocabulary?.map((word, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                  {word}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Learning Progress</h3>
              <p className="text-gray-600">Track your improvement across different skills</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {Math.round(learningProgress.reduce((acc, skill) => acc + skill.current, 0) / learningProgress.length)}%
              </div>
              <div className="text-sm text-green-600">Average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningProgress.map((skill) => (
          <Card key={skill.id} className={`border-2 ${
            skill.status === 'excellent' ? 'border-green-200 bg-green-50' :
            skill.status === 'good' ? 'border-blue-200 bg-blue-50' :
            skill.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
            'border-red-200 bg-red-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                <Badge className={
                  skill.status === 'excellent' ? 'bg-green-100 text-green-800' :
                  skill.status === 'good' ? 'bg-blue-100 text-blue-800' :
                  skill.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {skill.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{skill.current}/{skill.target} {skill.unit}</span>
                </div>
                <Progress value={skill.current} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-6">
      {/* Notes Overview */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Personal Notes</h3>
              <p className="text-gray-600">Your learning insights and observations</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">
                {userNotes.length}
              </div>
              <div className="text-sm text-yellow-600">Notes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBookmark className="text-purple-600" />
            My Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userNotes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={
                    note.type === 'vocabulary' ? 'bg-blue-100 text-blue-800' :
                    note.type === 'grammar' ? 'bg-green-100 text-green-800' :
                    note.type === 'pronunciation' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {note.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(note.timestamp).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <p className="text-gray-700">{note.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'lesson', label: 'Bài học', icon: FaBook },
    { id: 'progress', label: 'Tiến độ', icon: FaChartLine },
    { id: 'notes', label: 'Ghi chú', icon: FaBookmark }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaGraduationCap className="text-blue-600" />
            Advanced Lesson Player
          </h1>
          <p className="text-gray-600 mt-1">
            Trình phát bài học nâng cao với AI và tracking tiến độ
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Download Lesson
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket className="mr-2" />
            Complete Lesson
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'lesson' && renderLesson()}
      {activeTab === 'progress' && renderProgress()}
      {activeTab === 'notes' && renderNotes()}
    </div>
  );
} 