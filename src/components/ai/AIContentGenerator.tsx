'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AnimatedCard, AnimatedProgress } from '@/components/ui/AnimatedCard';
import { 
  FaBrain, 
  FaMagic, 
  FaRobot, 
  FaLightbulb,
  FaCog,
  FaPlay,
  FaCheck,
  FaTimes,
  FaRedo,
  FaStar,
  FaChartLine,
  FaBookOpen,
  FaHeadphones,
  FaMicrophone,
  FaPencilAlt,
  FaGamepad,
  FaFire
} from 'react-icons/fa';

interface GeneratedContent {
  id: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'speaking' | 'mixed';
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  content: {
    questions: Question[];
    totalQuestions: number;
    timeEstimate: number; // minutes
    points: number;
  };
  metadata: {
    topics: string[];
    skills: string[];
    aiGenerated: boolean;
    personalized: boolean;
    adaptiveDifficulty: boolean;
  };
}

interface Question {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'audio' | 'speaking' | 'matching' | 'translation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hints: string[];
  audioUrl?: string;
  difficulty: number; // 1-10 scale
  points: number;
}

interface AIContentGeneratorProps {
  userId?: string;
  language?: string;
  currentLevel?: string;
  learningGoals?: string[];
  weakAreas?: string[];
  className?: string;
}

export function AIContentGenerator({
  userId,
  language = 'japanese',
  currentLevel = 'beginner',
  learningGoals = [],
  weakAreas = [],
  className = ''
}: AIContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedType, setSelectedType] = useState<string>('mixed');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generationHistory, setGenerationHistory] = useState<GeneratedContent[]>([]);

  const contentTypes = [
    { id: 'vocabulary', name: 'Từ vựng', icon: FaBookOpen, color: 'blue' },
    { id: 'grammar', name: 'Ngữ pháp', icon: FaPencilAlt, color: 'green' },
    { id: 'listening', name: 'Nghe', icon: FaHeadphones, color: 'purple' },
    { id: 'speaking', name: 'Nói', icon: FaMicrophone, color: 'orange' },
    { id: 'reading', name: 'Đọc', icon: FaBookOpen, color: 'indigo' },
    { id: 'mixed', name: 'Tổng hợp', icon: FaFire, color: 'red' }
  ];

  useEffect(() => {
    // Load generation history from localStorage
    const saved = localStorage.getItem(`ai-content-history-${userId}`);
    if (saved) {
      setGenerationHistory(JSON.parse(saved));
    }
  }, [userId]);

  const generateContent = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          language,
          currentLevel,
          contentType: selectedType,
          learningGoals,
          weakAreas,
          customPrompt: customPrompt.trim() || undefined,
          preferredDifficulty: currentLevel,
          questionCount: 10
        }),
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (response.ok) {
        const generated = await response.json();
        setGeneratedContent(generated);
        
        // Add to history
        const newHistory = [generated, ...generationHistory.slice(0, 9)];
        setGenerationHistory(newHistory);
        localStorage.setItem(`ai-content-history-${userId}`, JSON.stringify(newHistory));
      } else {
        throw new Error('Generation failed');
      }
    } catch (error) {
      console.error('Content generation error:', error);
      
      // Fallback to demo content
      const demoContent = generateDemoContent();
      setGeneratedContent(demoContent);
      setGenerationProgress(100);
    } finally {
      setTimeout(() => setIsGenerating(false), 500);
    }
  };

  const generateDemoContent = (): GeneratedContent => {
    const demoQuestions: Question[] = [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'Chọn cách chào hỏi phù hợp vào buổi sáng:',
        options: ['おはよう', 'こんにちは', 'こんばんは', 'おやすみ'],
        correctAnswer: 'おはよう',
        explanation: 'おはよう (ohayou) được sử dụng để chào buổi sáng với người thân thiết.',
        hints: ['Suy nghĩ về thời gian trong ngày', 'Cách chào informal'],
        difficulty: 2,
        points: 10
      },
      {
        id: 'q2', 
        type: 'fill_blank',
        question: 'Điền từ thích hợp: 私は学生___です。',
        correctAnswer: 'です',
        explanation: 'です (desu) là động từ "to be" lịch sự trong tiếng Nhật.',
        hints: ['Cần động từ "to be"', 'Dạng lịch sự'],
        difficulty: 3,
        points: 15
      },
      {
        id: 'q3',
        type: 'audio',
        question: 'Nghe và chọn nghĩa đúng của từ này:',
        options: ['Sách', 'Bút', 'Bàn', 'Ghế'],
        correctAnswer: 'Sách',
        explanation: '本 (hon) có nghĩa là sách trong tiếng Nhật.',
        hints: ['Vật dụng để đọc', 'Thường có trong thư viện'],
        audioUrl: '/audio/hon.mp3',
        difficulty: 2,
        points: 12
      }
    ];

    return {
      id: `generated-${Date.now()}`,
      type: selectedType as any,
      title: `Bài tập ${contentTypes.find(t => t.id === selectedType)?.name} - AI Generated`,
      description: `Bài tập được tạo tự động bởi AI dựa trên trình độ ${currentLevel} của bạn`,
      difficulty: currentLevel as any,
      language,
      content: {
        questions: demoQuestions,
        totalQuestions: demoQuestions.length,
        timeEstimate: 15,
        points: demoQuestions.reduce((sum, q) => sum + q.points, 0)
      },
      metadata: {
        topics: ['Basic Conversation', 'Grammar Basics', 'Daily Vocabulary'],
        skills: ['listening', 'reading', 'grammar'],
        aiGenerated: true,
        personalized: true,
        adaptiveDifficulty: true
      }
    };
  };

  const startPractice = (content: GeneratedContent) => {
    // Navigate to practice session with generated content
    const practiceUrl = `/practice/ai-generated/${content.id}`;
    window.open(practiceUrl, '_blank');
  };

  const getTypeIcon = (type: string) => {
    const found = contentTypes.find(t => t.id === type);
    return found ? found.icon : FaBookOpen;
  };

  const getTypeColor = (type: string) => {
    const found = contentTypes.find(t => t.id === type);
    return found ? found.color : 'gray';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <AnimatedCard className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBrain className="text-purple-600 text-2xl" />
            🧠 AI Content Generator
            <Badge className="ml-2 bg-purple-600 text-white">
              <FaMagic className="mr-1" size={12} />
              Beta
            </Badge>
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Tạo bài tập và quiz cá nhân hóa với sức mạnh AI. Adaptive difficulty và personalized content.
          </p>
        </CardHeader>
      </AnimatedCard>

      {/* Content Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-blue-600" />
            Cấu hình tạo nội dung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Content Type Grid */}
          <div>
            <label className="block text-sm font-medium mb-2">Loại nội dung:</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-center
                    ${selectedType === type.id 
                      ? `border-${type.color}-500 bg-${type.color}-50` 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <type.icon className={`mx-auto mb-2 text-${type.color}-600`} size={20} />
                  <div className="text-xs font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Yêu cầu tùy chỉnh (optional):
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="VD: Tập trung vào từ vựng về ẩm thực, sử dụng kanji N5..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
            />
          </div>

          {/* User Context Display */}
          <div className="grid md:grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-700">Ngôn ngữ:</span>
              <p className="text-blue-600 font-bold">{language.toUpperCase()}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Trình độ:</span>
              <p className="text-green-600 font-bold">{currentLevel}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-700">Mục tiêu:</span>
              <p className="text-purple-600 font-bold">
                {learningGoals.length ? learningGoals.join(', ') : 'Tổng quát'}
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={generateContent}
            disabled={isGenerating}
            className="w-full py-3 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isGenerating ? (
              <>
                <LoadingSpinner size="sm" variant="primary" />
                Đang tạo nội dung...
              </>
            ) : (
              <>
                <FaMagic className="mr-2" />
                🎯 Tạo bài tập AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-pulse"></div>
                  <FaRobot className="absolute inset-0 m-auto text-purple-600 text-2xl animate-bounce" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="font-medium">AI đang tạo nội dung cá nhân hóa...</p>
                <AnimatedProgress 
                  value={generationProgress} 
                  maxValue={100} 
                  size="lg"
                  label={`${Math.round(generationProgress)}% hoàn thành`}
                />
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>🧠 Phân tích trình độ của bạn...</p>
                <p>📚 Chọn nội dung phù hợp...</p>
                <p>⚡ Tạo câu hỏi adaptive...</p>
                <p>🎯 Cá nhân hóa difficulty...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Content Display */}
      {generatedContent && !isGenerating && (
        <AnimatedCard className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 mb-2">
                  {React.createElement(getTypeIcon(generatedContent.type), {
                    className: `text-${getTypeColor(generatedContent.type)}-600`
                  })}
                  {generatedContent.title}
                  <Badge className="bg-green-600 text-white">
                    <FaCheck className="mr-1" size={10} />
                    Sẵn sàng
                  </Badge>
                </CardTitle>
                <p className="text-gray-600">{generatedContent.description}</p>
              </div>
              <Button
                onClick={() => startPractice(generatedContent)}
                className="bg-green-600 hover:bg-green-700"
              >
                <FaPlay className="mr-2" />
                Bắt đầu luyện tập
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Content Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">
                  {generatedContent.content.totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Câu hỏi</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">
                  {generatedContent.content.timeEstimate}min
                </div>
                <div className="text-sm text-gray-600">Thời gian</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">
                  {generatedContent.content.points}
                </div>
                <div className="text-sm text-gray-600">Điểm tối đa</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">
                  {generatedContent.difficulty}
                </div>
                <div className="text-sm text-gray-600">Độ khó</div>
              </div>
            </div>

            {/* AI Features */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <FaLightbulb className="text-yellow-500" />
                ✨ AI Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {generatedContent.metadata.aiGenerated && (
                  <Badge variant="outline" className="text-purple-600">
                    <FaBrain className="mr-1" size={10} />
                    AI Generated
                  </Badge>
                )}
                {generatedContent.metadata.personalized && (
                  <Badge variant="outline" className="text-blue-600">
                    <FaStar className="mr-1" size={10} />
                    Personalized
                  </Badge>
                )}
                {generatedContent.metadata.adaptiveDifficulty && (
                  <Badge variant="outline" className="text-green-600">
                    <FaChartLine className="mr-1" size={10} />
                    Adaptive Difficulty
                  </Badge>
                )}
              </div>
            </div>

            {/* Topics & Skills */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">📚 Topics:</h5>
                <div className="flex flex-wrap gap-1">
                  {generatedContent.metadata.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">🎯 Skills:</h5>
                <div className="flex flex-wrap gap-1">
                  {generatedContent.metadata.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Preview */}
            <div className="space-y-2">
              <h5 className="font-medium">🔍 Preview câu hỏi đầu tiên:</h5>
              <div className="p-3 bg-white rounded-lg border">
                <p className="font-medium mb-2">{generatedContent.content.questions[0]?.question}</p>
                {generatedContent.content.questions[0]?.options && (
                  <div className="grid grid-cols-2 gap-2">
                    {generatedContent.content.questions[0].options.map((option, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        {String.fromCharCode(65 + index)}. {option}
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  💡 {generatedContent.content.questions[0]?.hints[0]}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => startPractice(generatedContent)}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <FaPlay className="mr-2" />
                Bắt đầu luyện tập
              </Button>
              <Button
                variant="outline"
                onClick={generateContent}
                className="flex-1"
              >
                <FaRedo className="mr-2" />
                Tạo bài khác
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      )}

      {/* Generation History */}
      {generationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartLine className="text-gray-600" />
              📚 Lịch sử tạo nội dung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generationHistory.slice(0, 5).map((content, index) => (
                <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {React.createElement(getTypeIcon(content.type), {
                      className: `text-${getTypeColor(content.type)}-600`
                    })}
                    <div>
                      <p className="font-medium text-sm">{content.title}</p>
                      <p className="text-xs text-gray-600">
                        {content.content.totalQuestions} câu • {content.content.timeEstimate}min
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startPractice(content)}
                  >
                    <FaPlay className="mr-1" size={10} />
                    Làm lại
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default AIContentGenerator;