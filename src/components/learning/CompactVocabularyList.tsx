'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bookmark, 
  Play,
  ChevronDown,
  ChevronUp
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

interface CompactVocabularyListProps {
  words: VocabularyWord[];
  lessonTitle: string;
  onWordSelect?: (word: VocabularyWord) => void;
}

export default function CompactVocabularyList({ 
  words, 
  lessonTitle, 
  onWordSelect 
}: CompactVocabularyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
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

  // Filter words
  const filteredWords = useMemo(() => {
    return words.filter(word => {
      const matchesSearch = 
        word.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || word.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [words, searchTerm, selectedCategory, selectedDifficulty]);

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

  return (
    <div className="compact-vocabulary-container">
      {/* Header */}
      <div className="compact-header">
        <div className="header-info">
          <h2 className="text-xl font-bold text-gray-900">
            📚 {lessonTitle}
          </h2>
          <p className="text-sm text-gray-600">
            {filteredWords.length} / {words.length} từ vựng
          </p>
        </div>
        
        <div className="header-stats">
          <span className="text-sm text-gray-500">
            Đã bookmark: {bookmarkedWords.length}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="compact-search-filters">
        <div className="search-box">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Tìm kiếm từ vựng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Tất cả danh mục' : category}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'Tất cả độ khó' : getDifficultyText(difficulty)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="compact-vocabulary-list">
        <AnimatePresence>
          {filteredWords.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              className="compact-vocabulary-item"
            >
              <div className="word-main-content">
                <div className="word-text">
                  <div className="japanese-text">
                    <span className="japanese-word">{word.japanese}</span>
                    <span className="pronunciation">[{word.pronunciation}]</span>
                  </div>
                  <div className="meaning-text">
                    {word.meaning}
                  </div>
                </div>

                <div className="word-actions">
                  <button
                    onClick={() => handleBookmark(word.id)}
                    className={`bookmark-btn ${bookmarkedWords.includes(word.id) ? 'bookmarked' : ''}`}
                  >
                    <Bookmark size={14} />
                  </button>
                  
                  <button
                    onClick={() => handleAudioPlay(word.id)}
                    className="audio-btn"
                  >
                    <Play size={14} />
                  </button>
                  
                  <button
                    onClick={() => toggleWordExpansion(word.id)}
                    className="expand-btn"
                  >
                    {expandedWords.includes(word.id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              </div>

              <div className="word-tags">
                <span className={`difficulty-tag ${getDifficultyColor(word.difficulty)}`}>
                  {getDifficultyText(word.difficulty)}
                </span>
                <span className="category-tag">
                  {word.category}
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
                        <p className="example-text">
                          <strong>Ví dụ:</strong> {word.example}
                        </p>
                        {word.exampleMeaning && (
                          <p className="example-meaning">
                            {word.exampleMeaning}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredWords.length === 0 && (
          <div className="empty-state">
            <p className="text-gray-500 text-center">
              Không tìm thấy từ vựng phù hợp
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
