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
  FaLightbulb, 
  FaCog, 
  FaPlay, 
  FaStop, 
  FaSave, 
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaStar,
  FaBrain,
  FaMagic,
  FaRocket,
  FaGraduationCap,
  FaBook,
  FaPuzzlePiece,
  FaQuestionCircle,
  FaClipboardList
} from 'react-icons/fa';

interface Exercise {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'matching' | 'sentence_rearrangement';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  aiGenerated: boolean;
  quality: number;
  createdAt: Date;
}

interface AIGenerationConfig {
  exerciseTypes: string[];
  difficulty: string;
  count: number;
  language: string;
  includeExplanation: boolean;
  includeTags: boolean;
  qualityThreshold: number;
}

interface ContentAnalysis {
  vocabulary: string[];
  grammarPoints: string[];
  difficulty: string;
  topics: string[];
  readingLevel: string;
  estimatedTime: number;
}

export default function AIExerciseGenerator() {
  const [content, setContent] = useState('');
  const [generatedExercises, setGeneratedExercises] = useState<Exercise[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [config, setConfig] = useState<AIGenerationConfig>({
    exerciseTypes: ['multiple_choice', 'fill_blank'],
    difficulty: 'medium',
    count: 5,
    language: 'japanese',
    includeExplanation: true,
    includeTags: true,
    qualityThreshold: 0.8
  });
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  const exerciseTypes = [
    { value: 'multiple_choice', label: 'Trắc nghiệm', icon: '🔘', description: 'Câu hỏi với 4 lựa chọn' },
    { value: 'fill_blank', label: 'Điền từ', icon: '✏️', description: 'Điền từ vào chỗ trống' },
    { value: 'translation', label: 'Dịch', icon: '🌐', description: 'Dịch câu hoặc từ' },
    { value: 'matching', label: 'Nối từ', icon: '🔗', description: 'Nối từ với nghĩa' },
    { value: 'sentence_rearrangement', label: 'Sắp xếp câu', icon: '📝', description: 'Sắp xếp từ thành câu' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Dễ', color: 'bg-green-100 text-green-800', icon: '🌱' },
    { value: 'medium', label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800', icon: '🌿' },
    { value: 'hard', label: 'Khó', color: 'bg-red-100 text-red-800', icon: '🌳' }
  ];

  const languages = [
    { value: 'japanese', label: 'Tiếng Nhật', icon: '🇯🇵' },
    { value: 'chinese', label: 'Tiếng Trung', icon: '🇨🇳' },
    { value: 'english', label: 'Tiếng Anh', icon: '🇺🇸' },
    { value: 'korean', label: 'Tiếng Hàn', icon: '🇰🇷' },
    { value: 'vietnamese', label: 'Tiếng Việt', icon: '🇻🇳' }
  ];

  // Analyze content using AI
  const analyzeContent = async () => {
    if (!content.trim()) return;

    try {
      // Mock AI analysis - replace with real AI API call
      const mockAnalysis: ContentAnalysis = {
        vocabulary: ['こんにちは', 'ありがとう', 'おはよう', 'さようなら', 'お疲れ様'],
        grammarPoints: ['です/だ', 'は/が', 'を', 'に', 'で'],
        difficulty: 'n5',
        topics: ['greetings', 'basic_phrases', 'daily_conversation'],
        readingLevel: 'beginner',
        estimatedTime: 15
      };

      setContentAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Failed to analyze content:', error);
    }
  };

  // Generate exercises using AI
  const generateExercises = async () => {
    if (!content.trim() || !contentAnalysis) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Simulate AI generation process
      const totalSteps = config.count * 2; // Analysis + Generation
      let currentStep = 0;

      const newExercises: Exercise[] = [];

      for (let i = 0; i < config.count; i++) {
        // Simulate AI analysis step
        currentStep++;
        setGenerationProgress((currentStep / totalSteps) * 100);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Simulate AI generation step
        currentStep++;
        setGenerationProgress((currentStep / totalSteps) * 100);
        await new Promise(resolve => setTimeout(resolve, 800));

        const exerciseType = config.exerciseTypes[i % config.exerciseTypes.length];
        const newExercise: Exercise = {
          id: `exercise-${Date.now()}-${i}`,
          type: exerciseType as any,
          question: generateMockQuestion(exerciseType, contentAnalysis),
          options: exerciseType === 'multiple_choice' ? generateMockOptions() : undefined,
          correctAnswer: generateMockAnswer(exerciseType),
          explanation: config.includeExplanation ? generateMockExplanation(exerciseType) : '',
          difficulty: config.difficulty as any,
          tags: config.includeTags ? generateMockTags() : [],
          aiGenerated: true,
          quality: Math.random() * 0.3 + 0.7, // 0.7 - 1.0
          createdAt: new Date()
        };

        newExercises.push(newExercise);
      }

      setGeneratedExercises(prev => [...prev, ...newExercises]);
    } catch (error) {
      console.error('Failed to generate exercises:', error);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Mock generation functions - replace with real AI logic
  const generateMockQuestion = (type: string, analysis: ContentAnalysis): string => {
    const questions = {
      multiple_choice: `Trong tiếng Nhật, từ "${analysis.vocabulary[0]}" có nghĩa là gì?`,
      fill_blank: `Điền từ thích hợp: こんにちは、お元気ですか？私は___です。`,
      translation: `Dịch câu sau sang tiếng Việt: "おはようございます"`,
      matching: `Nối từ tiếng Nhật với nghĩa tiếng Việt tương ứng`,
      sentence_rearrangement: `Sắp xếp các từ sau thành câu hoàn chỉnh: は/私/学生/です`
    };
    return questions[type as keyof typeof questions] || questions.multiple_choice;
  };

  const generateMockOptions = (): string[] => {
    return ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Chào buổi sáng'];
  };

  const generateMockAnswer = (type: string): string => {
    const answers = {
      multiple_choice: 'Xin chào',
      fill_blank: '元気',
      translation: 'Chào buổi sáng',
      matching: 'こんにちは - Xin chào',
      sentence_rearrangement: '私は学生です'
    };
    return answers[type as keyof typeof answers] || 'Xin chào';
  };

  const generateMockExplanation = (type: string): string => {
    const explanations = {
      multiple_choice: 'こんにちは là cách chào hỏi lịch sự trong tiếng Nhật, tương đương với "Xin chào" trong tiếng Việt.',
      fill_blank: '元気 (genki) có nghĩa là "khỏe mạnh, tươi tắn", thường dùng để hỏi thăm sức khỏe.',
      translation: 'おはようございます là cách chào buổi sáng rất lịch sự trong tiếng Nhật.',
      matching: 'こんにちは là từ chào hỏi cơ bản, được sử dụng vào buổi chiều.',
      sentence_rearrangement: '私は学生です có nghĩa là "Tôi là học sinh", theo cấu trúc S + は + N + です'
    };
    return explanations[type as keyof typeof explanations] || 'Giải thích mặc định';
  };

  const generateMockTags = (): string[] => {
    const allTags = ['greetings', 'basic_phrases', 'grammar', 'vocabulary', 'n5', 'beginner'];
    return allTags.slice(0, Math.floor(Math.random() * 3) + 2);
  };

  const handleExerciseSelect = (exerciseId: string) => {
    setSelectedExercises(prev => 
      prev.includes(exerciseId) 
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
  };

  const handleSaveExercise = (exercise: Exercise) => {
    setGeneratedExercises(prev => 
      prev.map(ex => ex.id === exercise.id ? exercise : ex)
    );
    setEditingExercise(null);
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setGeneratedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    setSelectedExercises(prev => prev.filter(id => id !== exerciseId));
  };

  const handleBulkDelete = () => {
    if (selectedExercises.length === 0) return;
    
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedExercises.length} bài tập đã chọn?`)) {
      setGeneratedExercises(prev => prev.filter(ex => !selectedExercises.includes(ex.id)));
      setSelectedExercises([]);
    }
  };

  const handleExportExercises = () => {
    const exercisesToExport = selectedExercises.length > 0 
      ? generatedExercises.filter(ex => selectedExercises.includes(ex.id))
      : generatedExercises;

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Type,Question,Correct Answer,Explanation,Difficulty,Tags\n' +
      exercisesToExport.map(ex => 
        `${ex.type},"${ex.question}","${ex.correctAnswer}","${ex.explanation}",${ex.difficulty},"${ex.tags.join(', ')}"`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ai-generated-exercises.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 0.9) return 'text-green-600 bg-green-100';
    if (quality >= 0.8) return 'text-blue-600 bg-blue-100';
    if (quality >= 0.7) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getQualityLabel = (quality: number) => {
    if (quality >= 0.9) return 'Xuất sắc';
    if (quality >= 0.8) return 'Tốt';
    if (quality >= 0.7) return 'Khá';
    return 'Cần cải thiện';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaRobot className="text-blue-600" />
            AI Exercise Generator
          </h1>
          <p className="text-gray-600 mt-1">
            Tự động tạo bài tập chất lượng cao từ nội dung bài học sử dụng AI
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleExportExercises}
            disabled={generatedExercises.length === 0}
          >
            <FaDownload className="mr-2" />
            Export
          </Button>
          <Button
            onClick={generateExercises}
            disabled={!content.trim() || !contentAnalysis || isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <FaMagic className="mr-2" />
            {isGenerating ? 'Đang tạo...' : 'Tạo bài tập với AI'}
          </Button>
        </div>
      </div>

      {/* Content Input & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaBook className="text-blue-600" />
              Nội dung bài học
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="content">Nhập nội dung bài học</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập nội dung bài học để AI phân tích và tạo bài tập..."
                rows={8}
                className="resize-none"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={analyzeContent}
                disabled={!content.trim()}
                variant="outline"
                className="flex-1"
              >
                <FaBrain className="mr-2" />
                Phân tích nội dung
              </Button>
              <Button
                onClick={() => setContent('')}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                <FaTimes className="mr-2" />
                Xóa
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaLightbulb className="text-yellow-600" />
              Phân tích AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!contentAnalysis ? (
              <div className="text-center py-8 text-gray-500">
                <FaBrain className="text-4xl mx-auto mb-4 text-gray-300" />
                <p>Nhập nội dung và nhấn "Phân tích nội dung" để bắt đầu</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {contentAnalysis.vocabulary.length}
                    </div>
                    <div className="text-sm text-blue-700">Từ vựng</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {contentAnalysis.grammarPoints.length}
                    </div>
                    <div className="text-sm text-green-700">Điểm ngữ pháp</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Cấp độ:</span>
                    <Badge variant="outline" className="text-blue-600">
                      {contentAnalysis.difficulty.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Thời gian ước tính:</span>
                    <span className="text-sm text-gray-900">{contentAnalysis.estimatedTime} phút</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Chủ đề:</span>
                    <div className="flex flex-wrap gap-1">
                      {contentAnalysis.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-gray-600" />
            Cấu hình AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Loại bài tập</Label>
              <div className="space-y-2 mt-2">
                {exerciseTypes.map((type) => (
                  <label key={type.value} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.exerciseTypes.includes(type.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setConfig(prev => ({
                            ...prev,
                            exerciseTypes: [...prev.exerciseTypes, type.value]
                          }));
                        } else {
                          setConfig(prev => ({
                            ...prev,
                            exerciseTypes: prev.exerciseTypes.filter(t => t !== type.value)
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{type.icon} {type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label>Độ khó</Label>
              <select
                value={config.difficulty}
                onChange={(e) => setConfig(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map((diff) => (
                  <option key={diff.value} value={diff.value}>
                    {diff.icon} {diff.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label>Số lượng bài tập</Label>
              <Input
                type="number"
                value={config.count}
                onChange={(e) => setConfig(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                min="1"
                max="20"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Ngôn ngữ</Label>
              <select
                value={config.language}
                onChange={(e) => setConfig(prev => ({ ...prev, language: e.target.value }))}
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.icon} {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.includeExplanation}
                onChange={(e) => setConfig(prev => ({ ...prev, includeExplanation: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Bao gồm giải thích</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.includeTags}
                onChange={(e) => setConfig(prev => ({ ...prev, includeTags: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm">Bao gồm tags</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {isGenerating && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="animate-spin text-blue-600 text-2xl">⚡</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-blue-800">AI đang tạo bài tập...</span>
                  <span className="text-sm text-blue-600">{Math.round(generationProgress)}%</span>
                </div>
                <Progress value={generationProgress} className="h-2" />
                <p className="text-sm text-blue-600 mt-2">
                  Đang tạo {config.count} bài tập với độ khó {config.difficulty}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Exercises */}
      {generatedExercises.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FaPuzzlePiece className="text-green-600" />
                Bài tập đã tạo ({generatedExercises.length})
              </CardTitle>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={selectedExercises.length === 0}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash className="mr-1" />
                  Xóa đã chọn ({selectedExercises.length})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportExercises}
                >
                  <FaDownload className="mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedExercises.map((exercise) => (
                <div key={exercise.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedExercises.includes(exercise.id)}
                        onChange={() => handleExerciseSelect(exercise.id)}
                        className="rounded"
                      />
                      <Badge variant="outline" className="text-xs">
                        {exercise.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={`text-xs ${getQualityColor(exercise.quality)}`}>
                        {getQualityLabel(exercise.quality)} ({Math.round(exercise.quality * 100)}%)
                      </Badge>
                      {exercise.aiGenerated && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          <FaRobot className="mr-1" />
                          AI Generated
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditExercise(exercise)}
                      >
                        <FaEdit className="mr-1" />
                        Sửa
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteExercise(exercise.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash className="mr-1" />
                        Xóa
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Câu hỏi:</h4>
                      <p className="text-gray-700">{exercise.question}</p>
                    </div>
                    
                    {exercise.options && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Lựa chọn:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {exercise.options.map((option, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {String.fromCharCode(65 + index)}. {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Đáp án đúng:</h4>
                      <p className="text-gray-700 font-medium">{exercise.correctAnswer}</p>
                    </div>
                    
                    {exercise.explanation && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Giải thích:</h4>
                        <p className="text-gray-600 text-sm">{exercise.explanation}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Độ khó: {difficulties.find(d => d.value === exercise.difficulty)?.label}
                        </span>
                        <span className="text-xs text-gray-500">
                          Ngày tạo: {exercise.createdAt.toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      
                      {exercise.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {exercise.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Exercise Modal */}
      {editingExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chỉnh sửa bài tập</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingExercise(null)}
              >
                <FaTimes />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Loại bài tập</Label>
                <select
                  value={editingExercise.type}
                  onChange={(e) => setEditingExercise(prev => prev ? { ...prev, type: e.target.value as any } : null)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  {exerciseTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label>Câu hỏi</Label>
                <Textarea
                  value={editingExercise.question}
                  onChange={(e) => setEditingExercise(prev => prev ? { ...prev, question: e.target.value } : null)}
                  rows={3}
                  className="mt-1"
                />
              </div>
              
              {editingExercise.type === 'multiple_choice' && (
                <div>
                  <Label>Lựa chọn</Label>
                  <div className="space-y-2 mt-1">
                    {editingExercise.options?.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          if (editingExercise.options) {
                            const newOptions = [...editingExercise.options];
                            newOptions[index] = e.target.value;
                            setEditingExercise(prev => prev ? { ...prev, options: newOptions } : null);
                          }
                        }}
                        placeholder={`Lựa chọn ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label>Đáp án đúng</Label>
                <Input
                  value={editingExercise.correctAnswer}
                  onChange={(e) => setEditingExercise(prev => prev ? { ...prev, correctAnswer: e.target.value } : null)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Giải thích</Label>
                <Textarea
                  value={editingExercise.explanation}
                  onChange={(e) => setEditingExercise(prev => prev ? { ...prev, explanation: e.target.value } : null)}
                  rows={3}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Độ khó</Label>
                <select
                  value={editingExercise.difficulty}
                  onChange={(e) => setEditingExercise(prev => prev ? { ...prev, difficulty: e.target.value as any } : null)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                >
                  {difficulties.map((diff) => (
                    <option key={diff.value} value={diff.value}>
                      {diff.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
              <Button
                onClick={() => handleSaveExercise(editingExercise)}
                className="flex-1"
              >
                <FaSave className="mr-2" />
                Lưu thay đổi
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditingExercise(null)}
                className="flex-1"
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
