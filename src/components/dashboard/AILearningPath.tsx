'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaRobot, 
  FaRoute, 
  FaBrain, 
  FaBullseye, 
  FaStar, 
  FaClock, 
  FaCheck, 
  FaLock,
  FaChartLine,
  FaLightbulb,
  FaBookOpen,
  FaHeadphones,
  FaMicrophone,
  FaPencilAlt,
  FaGamepad
} from 'react-icons/fa';

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'practice' | 'test' | 'review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // minutes
  isCompleted: boolean;
  isUnlocked: boolean;
  skillFocus: string[];
  aiRecommendation?: string;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  language: string;
  level: string;
  totalSteps: number;
  completedSteps: number;
  estimatedDuration: number; // total hours
  personalizedFor: string[];
  steps: LearningStep[];
}

interface AILearningPathProps {
  userId?: string;
  className?: string;
}

export function AILearningPath({ userId, className = '' }: AILearningPathProps) {
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    language: 'japanese',
    currentLevel: 'beginner',
    goals: ['conversation', 'grammar'],
    timeAvailable: 30, // minutes per day
    learningStyle: 'mixed'
  });

  useEffect(() => {
    generatePersonalizedPath();
  }, [userPreferences]);

  const generatePersonalizedPath = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/ai/learning-path', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          preferences: userPreferences,
          currentProgress: currentPath?.completedSteps || 0
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentPath(data.learningPath);
      } else {
        // Fallback to mock data
        setCurrentPath(generateMockLearningPath());
      }
    } catch (error) {
      console.error('Error generating learning path:', error);
      setCurrentPath(generateMockLearningPath());
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockLearningPath = (): LearningPath => {
    return {
      id: 'path-1',
      name: 'Lộ trình Tiếng Nhật N5 cá nhân hóa',
      description: 'Được thiết kế riêng dựa trên mục tiêu và thời gian học của bạn',
      language: 'japanese',
      level: 'N5',
      totalSteps: 12,
      completedSteps: 3,
      estimatedDuration: 48, // hours
      personalizedFor: ['Giao tiếp hàng ngày', 'Ngữ pháp cơ bản', '30 phút/ngày'],
      steps: [
        {
          id: 'step-1',
          title: 'Hiragana & Katakana mastery',
          description: 'Thuộc lòng và viết thành thạo 2 bảng chữ cái cơ bản',
          type: 'lesson',
          difficulty: 'beginner',
          estimatedTime: 45,
          isCompleted: true,
          isUnlocked: true,
          skillFocus: ['reading', 'writing'],
          aiRecommendation: 'Excellent! Bạn đã hoàn thành xuất sắc. Tiếp tục duy trì!'
        },
        {
          id: 'step-2', 
          title: 'Chào hỏi & Giới thiệu bản thân',
          description: 'Học cách chào hỏi và tự giới thiệu trong các tình huống khác nhau',
          type: 'practice',
          difficulty: 'beginner',
          estimatedTime: 30,
          isCompleted: true,
          isUnlocked: true,
          skillFocus: ['speaking', 'listening'],
          aiRecommendation: 'Phát âm rất tốt! Hãy thực hành thêm với conversation partner.'
        },
        {
          id: 'step-3',
          title: 'Số đếm & Thời gian',
          description: 'Học cách đếm số và nói về thời gian trong tiếng Nhật',
          type: 'lesson',
          difficulty: 'beginner', 
          estimatedTime: 40,
          isCompleted: true,
          isUnlocked: true,
          skillFocus: ['vocabulary', 'grammar'],
          aiRecommendation: 'Bạn học rất nhanh! Suggestion: Luyện tập với đồng hồ thực tế.'
        },
        {
          id: 'step-4',
          title: '🎯 HIỆN TẠI: Particles は, が, を',
          description: 'Hiểu và sử dụng chính xác 3 particles quan trọng nhất',
          type: 'lesson',
          difficulty: 'intermediate',
          estimatedTime: 50,
          isCompleted: false,
          isUnlocked: true,
          skillFocus: ['grammar', 'sentence-structure'],
          aiRecommendation: 'Đây là nền tảng quan trọng! AI gợi ý: Học theo ví dụ cụ thể trước.'
        },
        {
          id: 'step-5',
          title: 'Thực hành Particles với AI',
          description: 'Luyện tập particles qua bài tập tương tác với AI',
          type: 'practice',
          difficulty: 'intermediate',
          estimatedTime: 35,
          isCompleted: false,
          isUnlocked: false,
          skillFocus: ['grammar', 'application']
        },
        {
          id: 'step-6',
          title: 'Mini Test: Grammar Foundation',
          description: 'Kiểm tra kiến thức đã học và điều chỉnh lộ trình',
          type: 'test',
          difficulty: 'intermediate',
          estimatedTime: 25,
          isCompleted: false,
          isUnlocked: false,
          skillFocus: ['all']
        }
      ]
    };
  };

  const getStepIcon = (type: LearningStep['type']) => {
    switch (type) {
      case 'lesson': return <FaBookOpen className="text-blue-600" />;
      case 'practice': return <FaGamepad className="text-green-600" />;
      case 'test': return <FaBullseye className="text-orange-600" />;
      case 'review': return <FaChartLine className="text-purple-600" />;
      default: return <FaBookOpen />;
    }
  };

  const getDifficultyColor = (difficulty: LearningStep['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markStepCompleted = async (stepId: string) => {
    if (!currentPath) return;

    const updatedSteps = currentPath.steps.map(step => 
      step.id === stepId ? { ...step, isCompleted: true } : step
    );

    // Unlock next step
    const currentIndex = currentPath.steps.findIndex(s => s.id === stepId);
    if (currentIndex < currentPath.steps.length - 1) {
      updatedSteps[currentIndex + 1].isUnlocked = true;
    }

    setCurrentPath({
      ...currentPath,
      steps: updatedSteps,
      completedSteps: updatedSteps.filter(s => s.isCompleted).length
    });

    // Send to backend
    try {
      await fetch('/api/ai/learning-path/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId, completed: true })
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (!currentPath) {
    return (
      <Card className={`${className}`}>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <FaBrain className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-600">AI đang phân tích và tạo lộ trình cho bạn...</p>
            {isGenerating && (
              <div className="mt-4">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="flex items-center gap-2">
          <FaRobot className="text-blue-600" />
          <FaRoute className="text-purple-600" />
          AI Lộ trình học tập cá nhân
        </CardTitle>
        <div className="flex items-center gap-4 mt-2">
          <Badge className="bg-blue-100 text-blue-800">
            {currentPath.language.toUpperCase()} {currentPath.level}
          </Badge>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <FaClock /> {currentPath.estimatedDuration}h tổng cộng
          </span>
          <span className="text-sm text-gray-600">
            {currentPath.completedSteps}/{currentPath.totalSteps} bước
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{currentPath.name}</h3>
            <span className="text-sm text-blue-600 font-medium">
              {Math.round((currentPath.completedSteps / currentPath.totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(currentPath.completedSteps / currentPath.totalSteps) * 100}%` 
              }}
            />
          </div>
          <p className="text-sm text-gray-600">{currentPath.description}</p>
          
          {/* Personalized Features */}
          <div className="flex flex-wrap gap-2 mt-3">
            {currentPath.personalizedFor.map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <FaLightbulb className="mr-1" size={10} />
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Learning Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <FaBullseye className="text-orange-500" />
            Lộ trình từng bước
          </h4>
          
          {currentPath.steps.slice(0, 6).map((step, index) => (
            <div 
              key={step.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                step.isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : step.isUnlocked 
                    ? 'bg-white border-gray-200 hover:border-blue-300 cursor-pointer' 
                    : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Step Number & Icon */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.isCompleted 
                      ? 'bg-green-500 text-white' 
                      : step.isUnlocked 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step.isCompleted ? <FaCheck size={12} /> : index + 1}
                  </div>
                  {index < currentPath.steps.length - 1 && (
                    <div className={`w-0.5 h-8 mt-2 ${
                      step.isCompleted ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStepIcon(step.type)}
                    <h5 className="font-medium">{step.title}</h5>
                    {!step.isUnlocked && <FaLock className="text-gray-400" size={12} />}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getDifficultyColor(step.difficulty)}>
                      {step.difficulty}
                    </Badge>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <FaClock /> {step.estimatedTime}min
                    </span>
                    <div className="flex gap-1">
                      {step.skillFocus.map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendation */}
                  {step.aiRecommendation && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-2">
                      <div className="flex items-start gap-2">
                        <FaRobot className="text-blue-600 mt-0.5" size={14} />
                        <p className="text-sm text-blue-800">{step.aiRecommendation}</p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    {step.isUnlocked && !step.isCompleted && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Bắt đầu học
                      </Button>
                    )}
                    {step.isCompleted && (
                      <Button size="sm" variant="outline">
                        Ôn tập lại
                      </Button>
                    )}
                    {step.isUnlocked && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => markStepCompleted(step.id)}
                      >
                        <FaCheck className="mr-1" size={12} />
                        Đánh dấu hoàn thành
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
          <h5 className="font-semibold flex items-center gap-2 mb-2">
            <FaBrain className="text-purple-600" />
            💡 AI Insights
          </h5>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-purple-700">Điểm mạnh:</span>
              <p className="text-gray-600">Học từ vựng rất nhanh, ghi nhớ tốt</p>
            </div>
            <div>
              <span className="font-medium text-purple-700">Cần cải thiện:</span>
              <p className="text-gray-600">Particles usage, conversation practice</p>
            </div>
            <div>
              <span className="font-medium text-purple-700">Gợi ý:</span>
              <p className="text-gray-600">Tăng thời gian practice speaking lên 15min/day</p>
            </div>
            <div>
              <span className="font-medium text-purple-700">Dự đoán:</span>
              <p className="text-gray-600">Có thể đạt N5 trong 3-4 tháng nữa</p>
            </div>
          </div>
        </div>

        {/* Regenerate Path */}
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            onClick={generatePersonalizedPath}
            disabled={isGenerating}
            className="text-blue-600 border-blue-300 hover:bg-blue-50"
          >
            <FaRobot className="mr-2" />
            {isGenerating ? 'Đang tạo...' : 'Tạo lại lộ trình với AI'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AILearningPath;