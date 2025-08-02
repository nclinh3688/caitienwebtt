'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaMicrophone, 
  FaPlay, 
  FaPause, 
  FaVolumeUp,
  FaBrain,
  FaLightbulb,
  FaChartLine,
  FaBullseye,
  FaStar,
  FaCheck,
  FaTimes,
  FaRedo,
  FaDownload,
  FaShare,
  FaHeart,
  FaRobot,
  FaMagic,
  FaGraduationCap,
  FaClock,
  FaTrophy,
  FaFire,
  FaEye,
  FaEyeSlash,
  FaBookOpen,
  FaPen,
  FaHeadphones
} from 'react-icons/fa';

interface PronunciationAnalysis {
  word: string;
  userPronunciation: string;
  accuracy: number;
  feedback: string[];
  suggestions: string[];
  audioUrl?: string;
  confidence: number;
  pitchAnalysis: {
    correct: boolean;
    suggestion: string;
  };
  rhythmAnalysis: {
    correct: boolean;
    suggestion: string;
  };
}

interface LearningRecommendation {
  type: 'vocabulary' | 'grammar' | 'kanji' | 'listening' | 'speaking' | 'reading' | 'writing';
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  aiConfidence: number;
  tags: string[];
  prerequisites: string[];
}

interface PersonalizedPath {
  level: string;
  currentProgress: number;
  nextLessons: string[];
  focusAreas: string[];
  estimatedCompletion: string;
  dailyGoal: number;
  weeklyGoal: number;
  monthlyGoal: number;
  strengths: string[];
  weaknesses: string[];
  recommendedStudyTime: number;
  optimalStudySchedule: {
    morning: number;
    afternoon: number;
    evening: number;
  };
}

interface AIFeaturesProps {
  userId?: string;
  onPronunciationComplete?: (analysis: PronunciationAnalysis) => void;
  onRecommendationSelected?: (recommendation: LearningRecommendation) => void;
  onPathUpdated?: (path: PersonalizedPath) => void;
}

export default function AIFeatures({ 
  userId, 
  onPronunciationComplete, 
  onRecommendationSelected,
  onPathUpdated
}: AIFeaturesProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pronunciationAnalysis, setPronunciationAnalysis] = useState<PronunciationAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<LearningRecommendation[]>([]);
  const [personalizedPath, setPersonalizedPath] = useState<PersonalizedPath | null>(null);
  const [currentWord, setCurrentWord] = useState('わたし');
  const [userAudio, setUserAudio] = useState<string | null>(null);
  const [referenceAudio, setReferenceAudio] = useState<string | null>(null);
  const [showAdvancedAnalysis, setShowAdvancedAnalysis] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [learningMode, setLearningMode] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    loadRecommendations();
    loadPersonalizedPath();
    generateAIInsights();
  }, [userId, learningMode]);

  const loadRecommendations = () => {
    const mockRecommendations: LearningRecommendation[] = [
      {
        type: 'vocabulary',
        title: 'Từ vựng về gia đình',
        description: 'Học các từ vựng liên quan đến gia đình và mối quan hệ',
        difficulty: 'easy',
        estimatedTime: 15,
        priority: 'high',
        reason: 'Dựa trên tiến độ học tập của bạn, đây là chủ đề phù hợp tiếp theo',
        aiConfidence: 95,
        tags: ['Gia đình', 'Mối quan hệ', 'Cơ bản'],
        prerequisites: ['N5 cơ bản']
      },
      {
        type: 'grammar',
        title: 'Ngữ pháp về thời gian',
        description: 'Học cách nói về thời gian và lịch trình',
        difficulty: 'medium',
        estimatedTime: 20,
        priority: 'medium',
        reason: 'Bạn đã sẵn sàng cho ngữ pháp phức tạp hơn',
        aiConfidence: 87,
        tags: ['Thời gian', 'Lịch trình', 'Trung cấp'],
        prerequisites: ['N5 cơ bản', 'Ngữ pháp cơ bản']
      },
      {
        type: 'listening',
        title: 'Luyện nghe cơ bản',
        description: 'Cải thiện kỹ năng nghe với các đoạn hội thoại đơn giản',
        difficulty: 'easy',
        estimatedTime: 10,
        priority: 'high',
        reason: 'Kỹ năng nghe cần được cải thiện',
        aiConfidence: 92,
        tags: ['Luyện nghe', 'Hội thoại', 'Cơ bản'],
        prerequisites: ['Phát âm cơ bản']
      },
      {
        type: 'speaking',
        title: 'Luyện nói hàng ngày',
        description: 'Thực hành phát âm và hội thoại hàng ngày',
        difficulty: 'medium',
        estimatedTime: 25,
        priority: 'high',
        reason: 'Cần cải thiện kỹ năng nói',
        aiConfidence: 89,
        tags: ['Phát âm', 'Hội thoại', 'Thực hành'],
        prerequisites: ['Từ vựng cơ bản', 'Ngữ pháp cơ bản']
      },
      {
        type: 'kanji',
        title: 'Kanji cơ bản N5',
        description: 'Học 100 ký tự Kanji cơ bản cho N5',
        difficulty: 'hard',
        estimatedTime: 30,
        priority: 'medium',
        reason: 'Kanji sẽ giúp bạn đọc hiểu tốt hơn',
        aiConfidence: 78,
        tags: ['Kanji', 'N5', 'Viết'],
        prerequisites: ['Hiragana', 'Katakana']
      }
    ];
    
    setRecommendations(mockRecommendations);
  };

  const loadPersonalizedPath = () => {
    const mockPath: PersonalizedPath = {
      level: 'N5',
      currentProgress: 35,
      nextLessons: ['B04', 'B05', 'B06', 'B07', 'B08'],
      focusAreas: ['Phát âm', 'Ngữ pháp cơ bản', 'Từ vựng', 'Luyện nghe'],
      estimatedCompletion: '2 tuần',
      dailyGoal: 30,
      weeklyGoal: 210,
      monthlyGoal: 900,
      strengths: ['Từ vựng', 'Ngữ pháp cơ bản'],
      weaknesses: ['Phát âm', 'Luyện nghe'],
      recommendedStudyTime: 45,
      optimalStudySchedule: {
        morning: 15,
        afternoon: 20,
        evening: 10
      }
    };
    
    setPersonalizedPath(mockPath);
  };

  const generateAIInsights = () => {
    const insights = [
      'Bạn học tốt nhất vào buổi sáng từ 8-10h',
      'Từ vựng là điểm mạnh của bạn',
      'Cần tập trung vào phát âm nhiều hơn',
      'Nên luyện nghe ít nhất 15 phút mỗi ngày',
      'Ngữ pháp cơ bản đã vững, có thể học nâng cao'
    ];
    setAiInsights(insights);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setUserAudio(url);
        setIsRecording(false);
        analyzePronunciation(url);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const analyzePronunciation = async (audioUrl: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with advanced features
    setTimeout(() => {
      const analysis: PronunciationAnalysis = {
        word: currentWord,
        userPronunciation: audioUrl,
        accuracy: Math.floor(Math.random() * 40) + 60, // 60-100%
        feedback: [
          'Phát âm rõ ràng và chính xác',
          'Cần cải thiện ngữ điệu',
          'Tốc độ nói phù hợp',
          'Âm thanh được phát âm đúng'
        ],
        suggestions: [
          'Luyện tập với tốc độ chậm hơn',
          'Chú ý đến ngữ điệu lên xuống',
          'Thực hành với native speaker',
          'Ghi âm và so sánh với mẫu'
        ],
        audioUrl: audioUrl,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
        pitchAnalysis: {
          correct: Math.random() > 0.3,
          suggestion: 'Cần luyện tập ngữ điệu cao thấp'
        },
        rhythmAnalysis: {
          correct: Math.random() > 0.4,
          suggestion: 'Tốc độ nói cần đều đặn hơn'
        }
      };
      
      setPronunciationAnalysis(analysis);
      setIsAnalyzing(false);
      onPronunciationComplete?.(analysis);
    }, 3000);
  };

  const playReferenceAudio = () => {
    setReferenceAudio('/audio/n5/lesson-1/watashi.mp3');
  };

  const handleRecommendationClick = (recommendation: LearningRecommendation) => {
    onRecommendationSelected?.(recommendation);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return FaBookOpen;
      case 'grammar': return FaPen;
      case 'kanji': return FaStar;
      case 'listening': return FaHeadphones;
      case 'speaking': return FaMicrophone;
      case 'reading': return FaEye;
      case 'writing': return FaGraduationCap;
      default: return FaBullseye;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRobot className="text-2xl" />
            AI Learning Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100">
            Trợ lý AI thông minh giúp bạn học tiếng Nhật hiệu quả hơn
          </p>
        </CardContent>
      </Card>

      {/* AI Pronunciation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaMicrophone className="text-blue-600" />
            Phân tích phát âm AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Word */}
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2">{currentWord}</h3>
              <p className="text-gray-600">Hãy phát âm từ này</p>
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center gap-4">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                className="flex items-center gap-2"
                disabled={isAnalyzing}
              >
                {isRecording ? <FaPause /> : <FaMicrophone />}
                {isRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
              </Button>

              <Button
                onClick={playReferenceAudio}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <FaPlay />
                Nghe mẫu
              </Button>
            </div>

            {/* Analysis Results */}
            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">AI đang phân tích phát âm...</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 justify-center">
                    <FaBrain className="text-purple-500" />
                    <span className="text-sm">Phân tích ngữ âm</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <FaMagic className="text-blue-500" />
                    <span className="text-sm">So sánh với mẫu</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <FaBullseye className="text-green-500" />
                    <span className="text-sm">Đưa ra gợi ý</span>
                  </div>
                </div>
              </div>
            )}

            {pronunciationAnalysis && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-blue-800 text-lg">Kết quả phân tích AI</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-600">
                      {pronunciationAnalysis.accuracy}% chính xác
                    </Badge>
                    <Badge variant="outline" className="text-purple-600">
                      {pronunciationAnalysis.confidence}% tin cậy
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Nhận xét tích cực:
                    </h5>
                    <ul className="space-y-2">
                      {pronunciationAnalysis.feedback.map((feedback, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-blue-600">{feedback}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-blue-700 mb-3 flex items-center gap-2">
                      <FaLightbulb className="text-yellow-500" />
                      Gợi ý cải thiện:
                    </h5>
                    <ul className="space-y-2">
                      {pronunciationAnalysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
                          <span className="text-blue-600">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Advanced Analysis */}
                <div className="mt-6">
                  <Button
                    onClick={() => setShowAdvancedAnalysis(!showAdvancedAnalysis)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {showAdvancedAnalysis ? <FaEyeSlash /> : <FaEye />}
                    {showAdvancedAnalysis ? 'Ẩn phân tích chi tiết' : 'Xem phân tích chi tiết'}
                  </Button>

                  {showAdvancedAnalysis && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <h6 className="font-medium mb-2">Phân tích ngữ điệu:</h6>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${pronunciationAnalysis.pitchAnalysis.correct ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm">{pronunciationAnalysis.pitchAnalysis.suggestion}</span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border">
                        <h6 className="font-medium mb-2">Phân tích nhịp điệu:</h6>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${pronunciationAnalysis.rhythmAnalysis.correct ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm">{pronunciationAnalysis.rhythmAnalysis.suggestion}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Learning Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBrain className="text-purple-600" />
            Gợi ý học tập thông minh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => {
              const TypeIcon = getTypeIcon(recommendation.type);
              
              return (
                <div
                  key={index}
                  className="p-6 border rounded-lg hover:border-purple-300 transition-all cursor-pointer bg-gradient-to-r from-white to-purple-50"
                  onClick={() => handleRecommendationClick(recommendation)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <TypeIcon className="text-2xl text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 text-lg">{recommendation.title}</h4>
                        <p className="text-gray-600 mt-1">{recommendation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(recommendation.difficulty)}>
                        {recommendation.difficulty}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(recommendation.priority)}>
                        {recommendation.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400" />
                      <span className="text-sm">{recommendation.estimatedTime} phút</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBullseye className="text-gray-400" />
                      <span className="text-sm">{recommendation.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaBrain className="text-gray-400" />
                      <span className="text-sm">{recommendation.aiConfidence}% tin cậy</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {recommendation.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-xs text-gray-500 max-w-xs">
                      {recommendation.reason}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Learning Path */}
      {personalizedPath && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartLine className="text-green-600" />
              Lộ trình học tập cá nhân hóa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{personalizedPath.level}</div>
                  <div className="text-sm text-gray-600">Cấp độ hiện tại</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{personalizedPath.currentProgress}%</div>
                  <div className="text-sm text-gray-600">Tiến độ</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{personalizedPath.dailyGoal} phút</div>
                  <div className="text-sm text-gray-600">Mục tiêu hàng ngày</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{personalizedPath.estimatedCompletion}</div>
                  <div className="text-sm text-gray-600">Dự kiến hoàn thành</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tiến độ tổng thể</span>
                  <span>{personalizedPath.currentProgress}%</span>
                </div>
                <Progress value={personalizedPath.currentProgress} className="h-3" />
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FaBrain className="text-purple-600" />
                  AI Insights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FaTrophy className="text-green-600" />
                    Điểm mạnh:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {personalizedPath.strengths.map((strength, index) => (
                      <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <FaFire className="text-red-600" />
                    Cần cải thiện:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {personalizedPath.weaknesses.map((weakness, index) => (
                      <Badge key={index} variant="destructive">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Lessons */}
              <div>
                <h4 className="font-semibold mb-2">Bài học tiếp theo:</h4>
                <div className="flex gap-2">
                  {personalizedPath.nextLessons.map((lesson, index) => (
                    <Badge key={index} variant="outline" className="text-lg px-3 py-1">
                      {lesson}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Optimal Study Schedule */}
              <div>
                <h4 className="font-semibold mb-2">Lịch học tối ưu:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">{personalizedPath.optimalStudySchedule.morning} phút</div>
                    <div className="text-sm text-gray-600">Sáng</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{personalizedPath.optimalStudySchedule.afternoon} phút</div>
                    <div className="text-sm text-gray-600">Chiều</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{personalizedPath.optimalStudySchedule.evening} phút</div>
                    <div className="text-sm text-gray-600">Tối</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 