'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaFont, 
  FaPlay,
  FaCheckCircle,
  FaArrowRight,
  FaVolumeUp,
  FaStar,
  FaClock,
  FaChartLine,
  FaArrowLeft,
  FaPencilAlt,
  FaEye
} from 'react-icons/fa';
import AIChatWidget from '@/components/ai/AIChatWidget';

interface KanjiCharacter {
  id: string;
  character: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  strokeCount: number;
  radicals: string[];
  examples: {
    japanese: string;
    romaji: string;
    vietnamese: string;
  }[];
  strokeOrder: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  jlptLevel: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

interface KanjiCategory {
  id: string;
  name: string;
  description: string;
  kanjiCount: number;
  progress: number;
  kanji: KanjiCharacter[];
}

export default function N5KanjiPage() {
  const [categories, setCategories] = useState<KanjiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedKanji, setSelectedKanji] = useState<KanjiCharacter | null>(null);

  useEffect(() => {
    // TODO: Load kanji data from API
    // This will be replaced with actual data loading
    const loadKanjiData = async () => {
      try {
        // Demo data structure - easy to replace with real data
        const demoCategories: KanjiCategory[] = [
          {
            id: 'basic-kanji',
            name: 'Kanji cơ bản',
            description: 'Các kanji cơ bản nhất trong N5',
            kanjiCount: 20,
            progress: 0,
            kanji: [
              {
                id: 'k001',
                character: '人',
                meaning: 'Người',
                onyomi: 'じん (jin)',
                kunyomi: 'ひと (hito)',
                strokeCount: 2,
                radicals: ['亻'],
                examples: [
                  {
                    japanese: '日本人',
                    romaji: 'nihonjin',
                    vietnamese: 'Người Nhật'
                  },
                  {
                    japanese: '人間',
                    romaji: 'ningen',
                    vietnamese: 'Con người'
                  }
                ],
                strokeOrder: ['1', '2'],
                difficulty: 'easy',
                category: 'basic-kanji',
                jlptLevel: 'N5'
              }
            ]
          },
          {
            id: 'radicals',
            name: 'Bộ thủ (Radicals)',
            description: 'Các bộ thủ cơ bản và ý nghĩa',
            kanjiCount: 15,
            progress: 0,
            kanji: []
          },
          {
            id: 'numbers',
            name: 'Số đếm',
            description: 'Kanji cho số từ 1-10',
            kanjiCount: 10,
            progress: 0,
            kanji: []
          },
          {
            id: 'family',
            name: 'Gia đình',
            description: 'Kanji về các thành viên gia đình',
            kanjiCount: 12,
            progress: 0,
            kanji: []
          }
        ];

        setCategories(demoCategories);
      } catch (error) {
        console.error('Error loading kanji data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadKanjiData();
  }, []);

  const calculateOverallProgress = () => {
    if (categories.length === 0) return 0;
    const totalProgress = categories.reduce((sum, category) => sum + category.progress, 0);
    return Math.round(totalProgress / categories.length);
  };

  const getSelectedCategoryData = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải kanji N5...</p>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/courses/japanese/n5" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FaArrowLeft size={16} />
              <span>Quay lại N5</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kanji N5</h1>
              <p className="text-gray-600">Học 100+ kanji cơ bản với bộ thủ và thứ tự nét</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Tổng tiến độ</h2>
            <Badge variant="outline" className="text-lg font-semibold">
              {overallProgress}%
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>0 / {categories.reduce((sum, cat) => sum + cat.kanjiCount, 0)} kanji đã học</span>
            <span>4 chủ đề</span>
          </div>
        </div>

        {/* Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <FaFont className="text-red-500" />
                      {category.name}
                    </div>
                    <Badge variant={category.progress >= 100 ? "default" : "outline"}>
                      {category.progress}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  
                  <Progress value={category.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{category.kanjiCount} kanji</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar />
                      <span>N5</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant={category.progress >= 100 ? "outline" : "default"}
                    className="w-full"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.progress >= 100 ? 'Ôn tập' : 'Bắt đầu học'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Kanji List */}
        {selectedCategory && !selectedKanji && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2"
                >
                  <FaArrowLeft size={14} />
                  Quay lại chủ đề
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getSelectedCategoryData()?.name}
                  </h2>
                  <p className="text-gray-600">{getSelectedCategoryData()?.description}</p>
                </div>
              </div>
              <Badge variant="outline">
                {getSelectedCategoryData()?.kanjiCount} kanji
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {getSelectedCategoryData()?.kanji.map((kanji, index) => (
                <Card 
                  key={kanji.id} 
                  className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedKanji(kanji)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{kanji.character}</div>
                      <div className="text-sm text-gray-600">{kanji.meaning}</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-gray-500 text-center">
                      <div>Onyomi: {kanji.onyomi}</div>
                      <div>Kunyomi: {kanji.kunyomi}</div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{kanji.strokeCount} nét</span>
                      <Badge variant={kanji.difficulty === 'easy' ? 'default' : kanji.difficulty === 'medium' ? 'secondary' : 'destructive'} className="text-xs">
                        {kanji.difficulty === 'easy' ? 'Dễ' : kanji.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty state for categories without kanji */}
            {getSelectedCategoryData()?.kanji.length === 0 && (
              <div className="text-center py-12">
                <FaFont className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chưa có kanji
                </h3>
                <p className="text-gray-600 mb-4">
                  Dữ liệu kanji sẽ được thêm vào đây
                </p>
                <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                  Quay lại chủ đề
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Kanji Detail */}
        {selectedKanji && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedKanji(null)}
                  className="flex items-center gap-2"
                >
                  <FaArrowLeft size={14} />
                  Quay lại danh sách
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Kanji: {selectedKanji.character}
                  </h2>
                  <p className="text-gray-600">{selectedKanji.meaning}</p>
                </div>
              </div>
              <Badge variant="outline">
                {selectedKanji.strokeCount} nét
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaFont className="text-red-500" />
                      Thông tin cơ bản
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-8xl font-bold text-gray-900 mb-4">{selectedKanji.character}</div>
                      <div className="text-xl text-gray-600">{selectedKanji.meaning}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="font-semibold text-gray-700 mb-1">Onyomi:</div>
                        <div className="text-gray-900">{selectedKanji.onyomi}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 mb-1">Kunyomi:</div>
                        <div className="text-gray-900">{selectedKanji.kunyomi}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Bộ thủ:</div>
                      <div className="flex gap-2">
                        {selectedKanji.radicals.map((radical, idx) => (
                          <Badge key={idx} variant="outline">{radical}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaEye className="text-blue-500" />
                      Ví dụ sử dụng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedKanji.examples.map((example, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <div className="font-semibold text-gray-700 mb-1">Tiếng Nhật:</div>
                              <div className="text-gray-900">{example.japanese}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-700 mb-1">Romaji:</div>
                              <div className="text-gray-600">{example.romaji}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-700 mb-1">Tiếng Việt:</div>
                              <div className="text-gray-600">{example.vietnamese}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Stroke Order */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaPencilAlt className="text-green-500" />
                      Thứ tự nét
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-2">
                      {selectedKanji.strokeOrder.map((stroke, idx) => (
                        <div key={idx} className="aspect-square border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          <span className="text-lg font-bold text-gray-600">{stroke}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="flex items-center gap-2 mx-auto">
                        <FaPlay size={12} />
                        Xem animation
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaVolumeUp className="text-purple-500" />
                      Phát âm
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Onyomi:</span>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FaVolumeUp size={12} />
                        Nghe
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Kunyomi:</span>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <FaVolumeUp size={12} />
                        Nghe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget 
        pageType="kanji"
        currentItem={selectedKanji || (selectedCategory ? getSelectedCategoryData()?.kanji[0] : undefined)}
        category={selectedCategory || undefined}
      />
    </div>
  );
}
