'use client';

import { useState, useEffect } from 'react';
import { Search, Volume2, BookOpen, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import courses from '@/data/courses.json';
import dictionaryData from '@/data/dictionary/dictionary-data.json';

interface DictionaryEntry {
  id: string;
  word: string;
  pronunciation?: string;
  language: string;
  level: string;
  meanings: Array<{
    partOfSpeech: string;
    definition: string;
    example?: string;
    translation?: string;
  }>;
}

const sampleEntries: DictionaryEntry[] = dictionaryData;

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredEntries, setFilteredEntries] = useState<DictionaryEntry[]>(sampleEntries);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getLanguageName = (langId: string) => {
    const course = courses.find(c => c.id === langId);
    return course?.name || langId;
  };

  const getLevelName = (langId: string, levelId: string) => {
    const course = courses.find(c => c.id === langId);
    const level = course?.levels.find(l => l.id === levelId);
    return level?.name || levelId;
  };

  useEffect(() => {
    let filtered = sampleEntries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.pronunciation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.meanings.some(meaning => 
          meaning.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by language
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(entry => entry.language === selectedLanguage);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(entry => entry.level === selectedLevel);
    }

    setFilteredEntries(filtered);
  }, [searchTerm, selectedLanguage, selectedLevel]);

  const playPronunciation = (word: string, language: string) => {
    // Simple text-to-speech implementation
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = language === 'japanese' ? 'ja-JP' : 
                      language === 'chinese' ? 'zh-CN' :
                      language === 'korean' ? 'ko-KR' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const availableLevels = selectedLanguage === 'all' 
    ? [] 
    : courses.find(c => c.id === selectedLanguage)?.levels || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <BookOpen className="inline-block mr-3 mb-2" size={48} />
            Từ điển đa ngôn ngữ
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto opacity-90">
            Tra cứu từ vựng, ngữ pháp và ví dụ cho Tiếng Nhật, Anh, Trung, Hàn và Việt
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm từ vựng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Bộ lọc
              </Button>
            </div>

            {/* Filter Options */}
            {isFilterOpen && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Language Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngôn ngữ
                    </label>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => {
                        setSelectedLanguage(e.target.value);
                        setSelectedLevel('all'); // Reset level when language changes
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">Tất cả ngôn ngữ</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cấp độ
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      disabled={selectedLanguage === 'all'}
                    >
                      <option value="all">Tất cả cấp độ</option>
                      {availableLevels.map(level => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 text-gray-600">
            Tìm thấy {filteredEntries.length} kết quả
          </div>

          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">{entry.word}</h3>
                      {entry.pronunciation && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => playPronunciation(entry.word, entry.language)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Volume2 size={16} />
                        </Button>
                      )}
                    </div>
                    {entry.pronunciation && (
                      <p className="text-gray-600 mb-2">/{entry.pronunciation}/</p>
                    )}
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {getLanguageName(entry.language)}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {getLevelName(entry.language, entry.level)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {entry.meanings.map((meaning, index) => (
                    <div key={index} className="border-l-4 border-blue-200 pl-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-500">
                          {meaning.partOfSpeech}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-2">{meaning.definition}</p>
                      {meaning.example && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-700 mb-1"><strong>Ví dụ:</strong> {meaning.example}</p>
                          {meaning.translation && (
                            <p className="text-gray-600 text-sm"><strong>Dịch:</strong> {meaning.translation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-500">Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 