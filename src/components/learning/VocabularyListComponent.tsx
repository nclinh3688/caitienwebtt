'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Volume2, 
  Bookmark, 
  Star,
  ChevronDown,
  ChevronUp,
  Play,
  Pause
} from 'lucide-react';

interface VocabularyWord {
  id: string;
  japanese: string;
  hiragana: string;
  meaning: string;
  pronunciation: string;
  example?: string;
  exampleMeaning?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  lesson: string;
}

interface VocabularyListProps {
  words: VocabularyWord[];
  lessonTitle: string;
  onWordSelect?: (word: VocabularyWord) => void;
}

export default function VocabularyListComponent({ 
  words, 
  lessonTitle, 
  onWordSelect 
}: VocabularyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'japanese' | 'meaning' | 'difficulty'>('japanese');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [expandedWords, setExpandedWords] = useState<string[]>([]);

  // Get unique categories and difficulties
  const categories = useMemo(() => {
    const cats = [...new Set(words.map(word => word.category))];
    return ['all', ...cats];
  }, [words]);

  const difficulties = useMemo(() => {
    const diffs = [...new Set(words.map(word => word.difficulty))];
    return ['all', ...diffs];
  }, [words]);

  // Filter and sort words
  const filteredAndSortedWords = useMemo(() => {
    let filtered = words.filter(word => {
      const matchesSearch = 
        word.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.hiragana.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || word.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    // Sort words
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'japanese':
          aValue = a.japanese;
          bValue = b.japanese;
          break;
        case 'meaning':
          aValue = a.meaning;
          bValue = b.meaning;
          break;
        case 'difficulty':
          aValue = getDifficultyValue(a.difficulty);
          bValue = getDifficultyValue(b.difficulty);
          break;
        default:
          aValue = a.japanese;
          bValue = b.japanese;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [words, searchTerm, selectedCategory, selectedDifficulty, sortBy, sortOrder]);

  const getDifficultyValue = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 0;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'hard': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return 'Không xác định';
    }
  };

  const handleBookmark = (wordId: string) => {
    if (bookmarkedWords.includes(wordId)) {
      setBookmarkedWords(bookmarkedWords.filter(id => id !== wordId));
    } else {
      setBookmarkedWords([...bookmarkedWords, wordId]);
    }
  };

  const handleAudioPlay = (wordId: string) => {
    if (playingAudio === wordId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(wordId);
    }
  };

  const toggleWordExpansion = (wordId: string) => {
    if (expandedWords.includes(wordId)) {
      setExpandedWords(expandedWords.filter(id => id !== wordId));
    } else {
      setExpandedWords([...expandedWords, wordId]);
    }
  };

  const handleWordSelect = (word: VocabularyWord) => {
    if (onWordSelect) {
      onWordSelect(word);
    }
  };

  return (
    <div className="vocabulary-list-container">


      {/* Search and Filters */}
      <div className="search-filters-section">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm từ vựng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Danh mục:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Tất cả' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Độ khó:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'Tất cả' : getDifficultyText(difficulty)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sắp xếp theo:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="filter-select"
            >
              <option value="japanese">Tiếng Nhật</option>
              <option value="meaning">Nghĩa tiếng Việt</option>
              <option value="difficulty">Độ khó</option>
            </select>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-button"
          >
            {sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="vocabulary-list">
        <AnimatePresence>
          {filteredAndSortedWords.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="vocabulary-item"
            >
              <div className="word-main">
                <div className="word-info">
                  <div className="word-japanese">
                    <h3 className="text-xl font-bold text-gray-900">
                      {word.japanese}
                    </h3>
                    <p className="text-lg text-gray-600">
                      {word.hiragana}
                    </p>
                  </div>
                  
                  <div className="word-meaning">
                    <p className="text-lg font-semibold text-blue-600">
                      {word.meaning}
                    </p>
                    <p className="text-sm text-gray-500">
                      [{word.pronunciation}]
                    </p>
                  </div>
                </div>

                <div className="word-actions">
                  <button
                    onClick={() => handleBookmark(word.id)}
                    className={`bookmark-button ${bookmarkedWords.includes(word.id) ? 'bookmarked' : ''}`}
                  >
                    <Bookmark size={18} />
                  </button>
                  
                  <button
                    onClick={() => handleAudioPlay(word.id)}
                    className="audio-button"
                  >
                    {playingAudio === word.id ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  
                  <button
                    onClick={() => toggleWordExpansion(word.id)}
                    className="expand-button"
                  >
                    {expandedWords.includes(word.id) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              <div className="word-meta">
                <span className={`difficulty-badge ${getDifficultyColor(word.difficulty)}`}>
                  {getDifficultyText(word.difficulty)}
                </span>
                <span className="category-badge">
                  {word.category}
                </span>
                <span className="lesson-badge">
                  {word.lesson}
                </span>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedWords.includes(word.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="expanded-content"
                  >
                    {word.example && (
                      <div className="example-section">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Ví dụ:
                        </h4>
                        <div className="example-content">
                          <p className="text-base text-gray-800 mb-1">
                            {word.example}
                          </p>
                          {word.exampleMeaning && (
                            <p className="text-sm text-gray-600">
                              {word.exampleMeaning}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="action-buttons">
                      <button
                        onClick={() => handleWordSelect(word)}
                        className="select-word-button"
                      >
                        <BookOpen size={16} className="mr-2" />
                        Chọn từ này
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredAndSortedWords.length === 0 && (
          <div className="empty-state">
            <BookOpen className="text-gray-400 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy từ vựng
            </h3>
            <p className="text-gray-600">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
