'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FaBook, 
  FaSave, 
  FaEye, 
  FaTimes, 
  FaPlus, 
  FaUpload,
  FaMicrophone,
  FaImage,
  FaVideo,
  FaFileAudio,
  FaGlobe,
  FaGraduationCap,
  FaClock,
  FaStar,
  FaCheck,
  FaExclamationTriangle,
  FaEdit
} from 'react-icons/fa';

interface LessonForm {
  title: string;
  description: string;
  content: string;
  language: string;
  level: string;
  category: string;
  tags: string[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPublished: boolean;
  audioUrl?: string;
  videoUrl?: string;
  images: string[];
  vocabulary: VocabularyItem[];
  grammar: GrammarItem[];
  exercises: ExerciseItem[];
}

interface VocabularyItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  audioUrl?: string;
}

interface GrammarItem {
  point: string;
  explanation: string;
  examples: string[];
  rules: string[];
}

interface ExerciseItem {
  type: 'multiple_choice' | 'fill_blank' | 'translation' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export default function CreateLessonPage() {
  const router = useRouter();
  const [form, setForm] = useState<LessonForm>({
    title: '',
    description: '',
    content: '',
    language: 'japanese',
    level: 'n5',
    category: 'grammar',
    tags: [],
    duration: 30,
    difficulty: 'beginner',
    isPublished: false,
    images: [],
    vocabulary: [],
    grammar: [],
    exercises: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newVocabulary, setNewVocabulary] = useState<VocabularyItem>({
    word: '',
    pronunciation: '',
    meaning: '',
    example: ''
  });
  const [newGrammar, setNewGrammar] = useState<GrammarItem>({
    point: '',
    explanation: '',
    examples: [],
    rules: []
  });
  const [newExercise, setNewExercise] = useState<ExerciseItem>({
    type: 'multiple_choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: ''
  });

  const languages = [
    { value: 'japanese', label: 'Tiếng Nhật', icon: '🇯🇵' },
    { value: 'chinese', label: 'Tiếng Trung', icon: '🇨🇳' },
    { value: 'english', label: 'Tiếng Anh', icon: '🇺🇸' },
    { value: 'korean', label: 'Tiếng Hàn', icon: '🇰🇷' },
    { value: 'vietnamese', label: 'Tiếng Việt', icon: '🇻🇳' }
  ];

  const levels = [
    { value: 'n5', label: 'N5 (Cơ bản)', icon: '🌱' },
    { value: 'n4', label: 'N4 (Sơ cấp)', icon: '🌿' },
    { value: 'n3', label: 'N3 (Trung cấp)', icon: '🌳' },
    { value: 'n2', label: 'N2 (Cao cấp)', icon: '🌲' },
    { value: 'n1', label: 'N1 (Thành thạo)', icon: '🏔️' }
  ];

  const categories = [
    { value: 'grammar', label: 'Ngữ pháp', icon: '📝' },
    { value: 'vocabulary', label: 'Từ vựng', icon: '📚' },
    { value: 'listening', label: 'Luyện nghe', icon: '🎧' },
    { value: 'reading', label: 'Đọc hiểu', icon: '📖' },
    { value: 'speaking', label: 'Luyện nói', icon: '🗣️' },
    { value: 'writing', label: 'Luyện viết', icon: '✍️' }
  ];

  const difficulties = [
    { value: 'beginner', label: 'Người mới bắt đầu', icon: '🌱' },
    { value: 'intermediate', label: 'Trung cấp', icon: '🌿' },
    { value: 'advanced', label: 'Nâng cao', icon: '🌳' }
  ];

  const handleInputChange = (field: keyof LessonForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setForm(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleAddVocabulary = () => {
    if (newVocabulary.word && newVocabulary.meaning) {
      setForm(prev => ({ ...prev, vocabulary: [...prev.vocabulary, { ...newVocabulary }] }));
      setNewVocabulary({ word: '', pronunciation: '', meaning: '', example: '' });
    }
  };

  const handleRemoveVocabulary = (index: number) => {
    setForm(prev => ({ 
      ...prev, 
      vocabulary: prev.vocabulary.filter((_, i) => i !== index) 
    }));
  };

  const handleAddGrammar = () => {
    if (newGrammar.point && newGrammar.explanation) {
      setForm(prev => ({ ...prev, grammar: [...prev.grammar, { ...newGrammar }] }));
      setNewGrammar({ point: '', explanation: '', examples: [], rules: [] });
    }
  };

  const handleRemoveGrammar = (index: number) => {
    setForm(prev => ({ 
      ...prev, 
      grammar: prev.grammar.filter((_, i) => i !== index) 
    }));
  };

  const handleAddExercise = () => {
    if (newExercise.question && newExercise.correctAnswer) {
      setForm(prev => ({ ...prev, exercises: [...prev.exercises, { ...newExercise }] }));
      setNewExercise({
        type: 'multiple_choice',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: ''
      });
    }
  };

  const handleRemoveExercise = (index: number) => {
    setForm(prev => ({ 
      ...prev, 
      exercises: prev.exercises.filter((_, i) => i !== index) 
    }));
  };

  const handleSave = async (publish: boolean = false) => {
    setLoading(true);
    try {
      // Mock save - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Lesson saved:', { ...form, isPublished: publish });
      
      // Show success message
      alert(publish ? 'Bài học đã được xuất bản thành công!' : 'Bài học đã được lưu thành công!');
      
      // Redirect to lessons list
      router.push('/admin/lessons');
    } catch (error) {
      console.error('Failed to save lesson:', error);
      alert('Có lỗi xảy ra khi lưu bài học. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề bài học *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Nhập tiêu đề bài học..."
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Ngôn ngữ *</Label>
                <select
                  id="language"
                  value={form.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map(lang => (
                    <option key={lang.value} value={lang.value}>
                      {lang.icon} {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="level">Cấp độ *</Label>
                <select
                  id="level"
                  value={form.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {levels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.icon} {level.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Danh mục *</Label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Độ khó *</Label>
                <select
                  id="difficulty"
                  value={form.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>
                      {diff.icon} {diff.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả ngắn *</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Mô tả ngắn gọn về bài học..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="duration">Thời lượng (phút) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={form.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  min="5"
                  max="180"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Thêm tag..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <FaPlus />
                  </Button>
                </div>
                {form.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer">
                        {tag}
                        <FaTimes 
                          className="ml-2 h-3 w-3" 
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Content Editor */}
            <div className="space-y-2">
              <Label htmlFor="content">Nội dung bài học *</Label>
              <div className="border border-gray-300 rounded-md">
                <div className="border-b border-gray-200 p-3 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <FaGlobe className="mr-1" />
                      Tiếng Việt
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaMicrophone className="mr-1" />
                      Ghi âm
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaImage className="mr-1" />
                      Hình ảnh
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaVideo className="mr-1" />
                      Video
                    </Button>
                    <Button size="sm" variant="outline">
                      <FaFileAudio className="mr-1" />
                      Audio
                    </Button>
                  </div>
                </div>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Nhập nội dung bài học chi tiết..."
                  rows={15}
                  className="border-0 focus:ring-0 resize-none"
                />
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-4">
              <Label>Media</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Thêm hình ảnh</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FaFileAudio className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Thêm audio</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <FaVideo className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Thêm video</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Vocabulary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Từ vựng</Label>
                <Button onClick={handleAddVocabulary} size="sm">
                  <FaPlus className="mr-1" />
                  Thêm từ vựng
                </Button>
              </div>
              
              {form.vocabulary.length > 0 && (
                <div className="space-y-3">
                  {form.vocabulary.map((vocab, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{vocab.word}</h4>
                        <Button
                          onClick={() => handleRemoveVocabulary(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTimes />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Phát âm:</span>
                          <p className="text-gray-900">{vocab.pronunciation}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Nghĩa:</span>
                          <p className="text-gray-900">{vocab.meaning}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="font-medium text-gray-600">Ví dụ:</span>
                        <p className="text-gray-900 mt-1">{vocab.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new vocabulary form */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Thêm từ vựng mới</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Từ vựng"
                    value={newVocabulary.word}
                    onChange={(e) => setNewVocabulary(prev => ({ ...prev, word: e.target.value }))}
                  />
                  <Input
                    placeholder="Phát âm"
                    value={newVocabulary.pronunciation}
                    onChange={(e) => setNewVocabulary(prev => ({ ...prev, pronunciation: e.target.value }))}
                  />
                  <Input
                    placeholder="Nghĩa"
                    value={newVocabulary.meaning}
                    onChange={(e) => setNewVocabulary(prev => ({ ...prev, meaning: e.target.value }))}
                  />
                  <Input
                    placeholder="Ví dụ"
                    value={newVocabulary.example}
                    onChange={(e) => setNewVocabulary(prev => ({ ...prev, example: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Grammar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Ngữ pháp</Label>
                <Button onClick={handleAddGrammar} size="sm">
                  <FaPlus className="mr-1" />
                  Thêm ngữ pháp
                </Button>
              </div>
              
              {form.grammar.length > 0 && (
                <div className="space-y-3">
                  {form.grammar.map((gram, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{gram.point}</h4>
                        <Button
                          onClick={() => handleRemoveGrammar(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTimes />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Giải thích:</span>
                          <p className="text-gray-900">{gram.explanation}</p>
                        </div>
                        {gram.examples.length > 0 && (
                          <div>
                            <span className="font-medium text-gray-600">Ví dụ:</span>
                            <ul className="list-disc list-inside text-gray-900">
                              {gram.examples.map((example, i) => (
                                <li key={i}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new grammar form */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Thêm ngữ pháp mới</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Điểm ngữ pháp"
                    value={newGrammar.point}
                    onChange={(e) => setNewGrammar(prev => ({ ...prev, point: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Giải thích"
                    value={newGrammar.explanation}
                    onChange={(e) => setNewGrammar(prev => ({ ...prev, explanation: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Exercises */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Bài tập</Label>
                <Button onClick={handleAddExercise} size="sm">
                  <FaPlus className="mr-1" />
                  Thêm bài tập
                </Button>
              </div>
              
              {form.exercises.length > 0 && (
                <div className="space-y-3">
                  {form.exercises.map((exercise, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          Bài tập {index + 1} - {exercise.type === 'multiple_choice' ? 'Trắc nghiệm' :
                           exercise.type === 'fill_blank' ? 'Điền từ' :
                           exercise.type === 'translation' ? 'Dịch' : 'Nối từ'}
                        </h4>
                        <Button
                          onClick={() => handleRemoveExercise(index)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaTimes />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Câu hỏi:</span>
                          <p className="text-gray-900">{exercise.question}</p>
                        </div>
                        {exercise.options && (
                          <div>
                            <span className="font-medium text-gray-600">Lựa chọn:</span>
                            <ul className="list-disc list-inside text-gray-900">
                              {exercise.options.map((option, i) => (
                                <li key={i}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-gray-600">Đáp án đúng:</span>
                          <p className="text-gray-900">{exercise.correctAnswer}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Giải thích:</span>
                          <p className="text-gray-900">{exercise.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new exercise form */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Thêm bài tập mới</h4>
                <div className="space-y-3">
                  <div>
                    <Label>Loại bài tập</Label>
                    <select
                      value={newExercise.type}
                      onChange={(e) => setNewExercise(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="multiple_choice">Trắc nghiệm</option>
                      <option value="fill_blank">Điền từ</option>
                      <option value="translation">Dịch</option>
                      <option value="matching">Nối từ</option>
                    </select>
                  </div>
                  <Textarea
                    placeholder="Câu hỏi"
                    value={newExercise.question}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, question: e.target.value }))}
                    rows={2}
                  />
                  {newExercise.type === 'multiple_choice' && (
                    <div className="grid grid-cols-2 gap-2">
                      {newExercise.options?.map((option, index) => (
                        <Input
                          key={index}
                          placeholder={`Lựa chọn ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(newExercise.options || [])];
                            newOptions[index] = e.target.value;
                            setNewExercise(prev => ({ ...prev, options: newOptions }));
                          }}
                        />
                      ))}
                    </div>
                  )}
                  <Input
                    placeholder="Đáp án đúng"
                    value={newExercise.correctAnswer}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, correctAnswer: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Giải thích"
                    value={newExercise.explanation}
                    onChange={(e) => setNewExercise(prev => ({ ...prev, explanation: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { number: 1, title: 'Thông tin cơ bản', icon: FaBook },
    { number: 2, title: 'Nội dung', icon: FaEdit },
    { number: 3, title: 'Từ vựng & Ngữ pháp', icon: FaGraduationCap },
    { number: 4, title: 'Bài tập', icon: FaStar }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBook className="text-blue-600" />
            Tạo bài học mới
          </h1>
          <p className="text-gray-600 mt-1">
            Tạo bài học hoàn chỉnh với nội dung, từ vựng, ngữ pháp và bài tập
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            <FaEye />
            {previewMode ? 'Ẩn xem trước' : 'Xem trước'}
          </Button>
          
          <Button
            onClick={() => handleSave(false)}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <FaSave />
            {loading ? 'Đang lưu...' : 'Lưu bản nháp'}
          </Button>
          
          <Button
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <FaCheck />
            {loading ? 'Đang xuất bản...' : 'Xuất bản'}
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Tiến độ tạo bài học</h2>
          <span className="text-sm text-gray-500">
            Bước {currentStep} / {steps.length}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <FaCheck className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          variant="outline"
        >
          Bước trước
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Bước {currentStep} / {steps.length}
          </span>
        </div>
        
        <Button
          onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
          disabled={currentStep === steps.length}
        >
          Bước tiếp theo
        </Button>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Preview Mode */}
      {previewMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaEye className="text-blue-600" />
              Xem trước bài học
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{form.title || 'Tiêu đề bài học'}</h2>
                <p className="text-gray-600 mb-4">{form.description || 'Mô tả bài học'}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <span>🌍 {languages.find(l => l.value === form.language)?.label}</span>
                  <span>🌱 {levels.find(l => l.value === form.level)?.label}</span>
                  <span>📝 {categories.find(c => c.value === form.category)?.label}</span>
                  <span>⏰ {form.duration} phút</span>
                </div>
              </div>
              
              {form.content && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Nội dung</h3>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{form.content}</p>
                  </div>
                </div>
              )}
              
              {form.vocabulary.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Từ vựng ({form.vocabulary.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {form.vocabulary.map((vocab, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium text-gray-900">{vocab.word}</div>
                        <div className="text-sm text-gray-600">{vocab.pronunciation}</div>
                        <div className="text-sm text-gray-700">{vocab.meaning}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {form.exercises.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Bài tập ({form.exercises.length})</h3>
                  <div className="space-y-3">
                    {form.exercises.map((exercise, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium text-gray-900 mb-2">
                          Câu {index + 1}: {exercise.question}
                        </div>
                        {exercise.options && (
                          <div className="space-y-1">
                            {exercise.options.map((option, i) => (
                              <div key={i} className="text-sm text-gray-600">
                                {String.fromCharCode(65 + i)}. {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
