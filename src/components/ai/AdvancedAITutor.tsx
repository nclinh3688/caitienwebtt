'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaRobot, 
  FaMicrophone, 
  FaMicrophoneSlash,
  FaBrain,
  FaGraduationCap,
  FaLightbulb,
  FaCheck,
  FaTimes,
  FaStar,
  FaChartLine,
  FaUserGraduate,
  FaBook,
  FaPuzzlePiece,
  FaHeadphones,
  FaVolumeUp,
  FaVolumeMute,
  FaPlay,
  FaPause,
  FaStop,
  FaDownload,
  FaUpload,
  FaCog,
  FaMagic,
  FaRocket,
  FaCrown
} from 'react-icons/fa';

interface LearningSession {
  id: string;
  topic: string;
  difficulty: string;
  duration: number;
  score: number;
  feedback: string;
  timestamp: Date;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  level: string;
  progress: number;
  estimatedTime: number;
  isActive: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'text' | 'interactive';
  duration: number;
  isCompleted: boolean;
  score: number;
}

interface AITutorConfig {
  voiceEnabled: boolean;
  language: string;
  difficulty: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  feedbackLevel: 'basic' | 'detailed' | 'expert';
  autoAdjust: boolean;
}

export default function AdvancedAITutor() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSession, setActiveSession] = useState<LearningSession | null>(null);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [config, setConfig] = useState<AITutorConfig>({
    voiceEnabled: true,
    language: 'japanese',
    difficulty: 'intermediate',
    learningStyle: 'mixed',
    feedbackLevel: 'detailed',
    autoAdjust: true
  });
  const [activeTab, setActiveTab] = useState('tutor');

  useEffect(() => {
    fetchLearningData();
  }, []);

  const fetchLearningData = async () => {
    try {
      // Mock data for demo
      const mockLearningPaths: LearningPath[] = [
        {
          id: '1',
          name: 'JLPT N5 Complete Path',
          description: 'Lộ trình hoàn chỉnh cho kỳ thi JLPT N5',
          level: 'N5',
          progress: 65,
          estimatedTime: 120,
          isActive: true,
          lessons: [
            { id: '1', title: 'Hiragana & Katakana', type: 'interactive', duration: 30, isCompleted: true, score: 95 },
            { id: '2', title: 'Basic Grammar', type: 'video', duration: 45, isCompleted: true, score: 88 },
            { id: '3', title: 'Essential Vocabulary', type: 'audio', duration: 60, isCompleted: false, score: 0 },
            { id: '4', title: 'Reading Practice', type: 'text', duration: 40, isCompleted: false, score: 0 }
          ]
        },
        {
          id: '2',
          name: 'Conversation Mastery',
          description: 'Luyện tập giao tiếp tiếng Nhật thực tế',
          level: 'N4-N3',
          progress: 35,
          estimatedTime: 90,
          isActive: true,
          lessons: [
            { id: '1', title: 'Daily Conversations', type: 'audio', duration: 30, isCompleted: true, score: 92 },
            { id: '2', title: 'Business Japanese', type: 'video', duration: 50, isCompleted: false, score: 0 },
            { id: '3', title: 'Cultural Context', type: 'text', duration: 25, isCompleted: false, score: 0 }
          ]
        }
      ];

      setLearningPaths(mockLearningPaths);
    } catch (error) {
      console.error('Failed to fetch learning data:', error);
    }
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    // Mock voice recognition - replace with real Web Speech API
    setTimeout(() => {
      const mockTranscript = 'こんにちは、お元気ですか？';
      setTranscript(mockTranscript);
      setIsListening(false);
    }, 3000);
  };

  const stopVoiceRecognition = () => {
    setIsListening(false);
  };

  const generateAIResponse = async () => {
    if (!transcript.trim()) return;

    setIsGenerating(true);
    try {
      // Mock AI response - replace with real AI API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = `Xin chào! Tôi thấy bạn đã nói: "${transcript}" (Xin chào, bạn có khỏe không?). Đây là một câu chào hỏi rất cơ bản và lịch sự trong tiếng Nhật. Hãy để tôi giúp bạn luyện tập thêm về chủ đề này!`;
      
      setAiResponse(mockResponse);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startLearningSession = (pathId: string) => {
    const path = learningPaths.find(p => p.id === pathId);
    if (!path) return;

    const session: LearningSession = {
      id: `session-${Date.now()}`,
      topic: path.name,
      difficulty: path.level,
      duration: 0,
      score: 0,
      feedback: '',
      timestamp: new Date()
    };

    setActiveSession(session);
  };

  const renderAITutor = () => (
    <div className="space-y-6">
      {/* Voice Interaction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMicrophone className="text-blue-600" />
            Tương tác bằng giọng nói
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
              className={`flex items-center gap-2 ${
                isListening 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isListening ? (
                <>
                  <FaMicrophoneSlash />
                  Dừng ghi âm
                </>
              ) : (
                <>
                  <FaMicrophone />
                  Bắt đầu ghi âm
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">
                {isListening ? 'Đang ghi âm...' : 'Sẵn sàng'}
              </span>
            </div>
          </div>

          {transcript && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <Label className="text-sm font-medium text-blue-800 mb-2 block">
                Bạn đã nói:
              </Label>
              <p className="text-blue-900 font-medium">{transcript}</p>
              <div className="mt-3">
                <Button
                  onClick={generateAIResponse}
                  disabled={isGenerating}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <FaBrain className="mr-2" />
                  {isGenerating ? 'AI đang xử lý...' : 'Nhận phản hồi AI'}
                </Button>
              </div>
            </div>
          )}

          {aiResponse && (
            <div className="p-4 bg-green-50 rounded-lg">
              <Label className="text-sm font-medium text-green-800 mb-2 block">
                Phản hồi từ AI Tutor:
              </Label>
              <p className="text-green-900">{aiResponse}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaGraduationCap className="text-purple-600" />
            Lộ trình học tập cá nhân hóa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPaths.map((path) => (
              <div key={path.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{path.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>Cấp độ: {path.level}</span>
                      <span>Thời gian: {path.estimatedTime} phút</span>
                      <span>Tiến độ: {path.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={path.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                      {path.isActive ? 'Đang học' : 'Tạm dừng'}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => startLearningSession(path.id)}
                      disabled={!path.isActive}
                    >
                      <FaPlay className="mr-1" />
                      Tiếp tục
                    </Button>
                  </div>
                </div>
                
                <Progress value={path.progress} className="h-2 mb-3" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {path.lessons.map((lesson) => (
                    <div key={lesson.id} className={`p-2 rounded text-xs text-center ${
                      lesson.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-xs">
                        {lesson.type} • {lesson.duration} phút
                      </div>
                      {lesson.isCompleted && (
                        <div className="text-xs font-bold">
                          {lesson.score}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Session */}
      {activeSession && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <FaPlay className="text-blue-600" />
              Phiên học đang hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-blue-600">Chủ đề:</span>
                <div className="font-medium text-blue-900">{activeSession.topic}</div>
              </div>
              <div>
                <span className="text-sm text-blue-600">Độ khó:</span>
                <div className="font-medium text-blue-900">{activeSession.difficulty}</div>
              </div>
              <div>
                <span className="text-sm text-blue-600">Thời gian:</span>
                <div className="font-medium text-blue-900">{activeSession.duration} phút</div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-3">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <FaCheck className="mr-1" />
                Hoàn thành
              </Button>
              <Button size="sm" variant="outline">
                <FaPause className="mr-1" />
                Tạm dừng
              </Button>
              <Button size="sm" variant="outline" className="text-red-600">
                <FaStop className="mr-1" />
                Dừng
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Cài đặt AI Tutor</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-gray-600" />
            Cấu hình cơ bản
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Ngôn ngữ học</Label>
              <select
                value={config.language}
                onChange={(e) => setConfig(prev => ({ ...prev, language: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="japanese">Tiếng Nhật</option>
                <option value="chinese">Tiếng Trung</option>
                <option value="english">Tiếng Anh</option>
                <option value="korean">Tiếng Hàn</option>
                <option value="vietnamese">Tiếng Việt</option>
              </select>
            </div>
            
            <div>
              <Label>Độ khó</Label>
              <select
                value={config.difficulty}
                onChange={(e) => setConfig(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="beginner">Người mới bắt đầu</option>
                <option value="intermediate">Trung cấp</option>
                <option value="advanced">Nâng cao</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Phong cách học tập</Label>
              <select
                value={config.learningStyle}
                onChange={(e) => setConfig(prev => ({ ...prev, learningStyle: e.target.value as any }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="visual">Trực quan</option>
                <option value="auditory">Thính giác</option>
                <option value="kinesthetic">Vận động</option>
                <option value="mixed">Hỗn hợp</option>
              </select>
            </div>
            
            <div>
              <Label>Mức độ phản hồi</Label>
              <select
                value={config.feedbackLevel}
                onChange={(e) => setConfig(prev => ({ ...prev, feedbackLevel: e.target.value as any }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="basic">Cơ bản</option>
                <option value="detailed">Chi tiết</option>
                <option value="expert">Chuyên sâu</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.voiceEnabled}
                onChange={(e) => setConfig(prev => ({ ...prev, voiceEnabled: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Bật nhận diện giọng nói</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.autoAdjust}
                onChange={(e) => setConfig(prev => ({ ...prev, autoAdjust: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Tự động điều chỉnh độ khó</span>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'tutor', label: 'AI Tutor', icon: FaRobot },
    { id: 'settings', label: 'Cài đặt', icon: FaCog }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCrown className="text-yellow-600" />
            Advanced AI Tutor
          </h1>
          <p className="text-gray-600 mt-1">
            AI Tutor thông minh với nhận diện giọng nói và học tập cá nhân hóa
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export dữ liệu
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <FaMagic className="mr-2" />
            Khởi chạy AI
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
      {activeTab === 'tutor' && renderAITutor()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
}
