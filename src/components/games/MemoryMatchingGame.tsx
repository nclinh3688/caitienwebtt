'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, RotateCcw, Trophy, Clock, Star, Zap, Play, Pause, Lightbulb } from 'lucide-react';
import { lesson1Vocabulary } from '@/data/lesson1-vocabulary';

interface VocabularyPair {
  id: string;
  japanese: string;
  romaji: string;
  kanji: string;
  vietnamese: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameState {
  selectedJapanese: string | null;
  selectedVietnamese: string | null;
  matchedPairs: Set<string>;
  score: number;
  timeElapsed: number;
  hintsUsed: number;
  gameStarted: boolean;
  gameCompleted: boolean;
}

interface HighScore {
  score: number;
  time: number;
  date: string;
  difficulty: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export default function MemoryMatchingGame() {
  // Get data from URL parameters
  const [vocabularyPairs, setVocabularyPairs] = useState<VocabularyPair[]>([]);
  const [lessonTitle, setLessonTitle] = useState<string>('Bài học');
  const [gameMode, setGameMode] = useState<string>('easy');

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
      try {
        const gameData = JSON.parse(decodeURIComponent(dataParam));
        const words = gameData.words || [];
        
        // Convert to VocabularyPair format
        const pairs: VocabularyPair[] = words.map((word: any) => ({
          id: word.id,
          japanese: word.hiragana,
          romaji: '',
          kanji: word.kanji || '',
          vietnamese: word.meaning,
          category: word.category || 'general',
          difficulty: word.difficulty || 'easy'
        }));
        
        setVocabularyPairs(pairs);
        setLessonTitle(gameData.lesson || 'Bài học');
        setGameMode(gameData.mode || 'easy');
      } catch (error) {
        console.error('Error parsing game data:', error);
        // Fallback to default lesson1Vocabulary
        const fallbackPairs = lesson1Vocabulary.map(word => ({
          id: word.id,
          japanese: word.hiragana,
          romaji: '',
          kanji: word.kanji,
          vietnamese: word.meaning,
          category: word.category,
          difficulty: word.difficulty
        }));
        setVocabularyPairs(fallbackPairs);
      }
    } else {
      // Default to lesson1Vocabulary if no data provided
      const defaultPairs = lesson1Vocabulary.map(word => ({
        id: word.id,
        japanese: word.hiragana,
        romaji: '',
        kanji: word.kanji,
        vietnamese: word.meaning,
        category: word.category,
        difficulty: word.difficulty
      }));
      setVocabularyPairs(defaultPairs);
    }
  }, []);

  const [gameState, setGameState] = useState<GameState>({
    selectedJapanese: null,
    selectedVietnamese: null,
    matchedPairs: new Set(),
    score: 0,
    timeElapsed: 0,
    hintsUsed: 0,
    gameStarted: false,
    gameCompleted: false
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first-match', name: 'Bắt đầu hành trình', description: 'Ghép được cặp từ đầu tiên', unlocked: false, icon: '🎯' },
    { id: 'speed-demon', name: 'Tốc độ siêu đỉnh', description: 'Hoàn thành trong 30 giây', unlocked: false, icon: '⚡' },
    { id: 'perfect-match', name: 'Hoàn hảo', description: 'Không sai lần nào', unlocked: false, icon: '🏆' },
    { id: 'persistent', name: 'Kiên trì', description: 'Sử dụng 5 gợi ý', unlocked: false, icon: '💪' }
  ]);

  // Filter words by difficulty
  const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    return vocabularyPairs.filter(word => word.difficulty === difficulty);
  };

  const currentWords = useMemo(() => getWordsByDifficulty(selectedDifficulty), [selectedDifficulty, vocabularyPairs]);

  // Create game pairs - FIXED ORDER, NO RANDOM SHUFFLING
  const gamePairs = useMemo(() => {
    if (vocabularyPairs.length === 0) return [];
    
    const words = vocabularyPairs.slice(0, 10); // Use first 10 words for the game
    const pairs = words.map(word => ({
      japanese: { id: `j-${word.id}`, japanese: word.japanese, kanji: word.kanji, pairId: word.id },
      vietnamese: { id: `v-${word.id}`, vietnamese: word.vietnamese, pairId: word.id }
    }));
    return pairs;
  }, [vocabularyPairs]);

  // FIXED ORDER - NO RANDOM SHUFFLING
  const shuffledJapanese = useMemo(() => 
    gamePairs.map(pair => pair.japanese), 
    [gamePairs]
  );

  const shuffledVietnamese = useMemo(() => 
    gamePairs.map(pair => pair.vietnamese), 
    [gamePairs]
  );

  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
    initializeAchievements();
  }, []);

  const initializeGame = () => {
    setGameState(prev => ({
      ...prev,
      selectedJapanese: null,
      selectedVietnamese: null,
      matchedPairs: new Set(),
      score: 0,
      timeElapsed: 0,
      hintsUsed: 0,
      gameStarted: true,
      gameCompleted: false
    }));
  };

  const initializeAchievements = () => {
    // Achievements are now initialized directly in the state
  };

  // Game logic functions
  const isMatched = (id: string) => {
    const pairId = id.startsWith('j-') ? id.substring(2) : id.substring(2);
    return gameState.matchedPairs.has(pairId);
  };

  const handleJapaneseClick = (id: string) => {
    if (gameState.gameCompleted || isMatched(id)) return;
    
    setGameState(prev => ({
      ...prev,
      selectedJapanese: id,
      selectedVietnamese: null // Reset Vietnamese selection
    }));
  };

  const handleVietnameseClick = (id: string) => {
    if (gameState.gameCompleted || isMatched(id)) return;
    
    if (gameState.selectedJapanese) {
      const japanesePairId = gameState.selectedJapanese.substring(2);
      const vietnamesePairId = id.substring(2);
      
      if (japanesePairId === vietnamesePairId) {
        // Correct match
        const newMatchedPairs = new Set(gameState.matchedPairs);
        newMatchedPairs.add(japanesePairId);
        
        const newScore = gameState.score + 10;
        
        setGameState(prev => ({
          ...prev,
          matchedPairs: newMatchedPairs,
          score: newScore,
          selectedJapanese: null,
          selectedVietnamese: null
        }));
        
        // Check if game is completed
        if (newMatchedPairs.size === gamePairs.length) {
          endGame();
        }
      } else {
        // Wrong match
        setGameState(prev => ({
          ...prev,
          selectedJapanese: null,
          selectedVietnamese: null
        }));
      }
    } else {
      setGameState(prev => ({
        ...prev,
        selectedVietnamese: id
      }));
    }
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      gameCompleted: false,
      score: 0,
      timeElapsed: 0,
      matchedPairs: new Set(),
      selectedJapanese: null,
      selectedVietnamese: null
    }));
  };

  const endGame = () => {
    const finalScore = gameState.score;
    const finalTime = gameState.timeElapsed;
    
    // Save high score
    const newHighScore: HighScore = {
      score: finalScore,
      time: finalTime,
      date: new Date().toISOString(),
      difficulty: selectedDifficulty
    };
    
    setHighScores(prev => [...prev, newHighScore].sort((a, b) => b.score - a.score).slice(0, 5));
    
    // Check achievements
    checkAchievements(finalScore, finalTime);
    
    setGameState(prev => ({
      ...prev,
      gameCompleted: true
    }));
  };

  const checkAchievements = (score: number, time: number) => {
    const newAchievements = [...achievements];
    
    if (score >= 10 && !achievements.find(a => a.id === 'first-match')?.unlocked) {
      newAchievements.find(a => a.id === 'first-match')!.unlocked = true;
    }
    
    if (time <= 30 && !achievements.find(a => a.id === 'speed-demon')?.unlocked) {
      newAchievements.find(a => a.id === 'speed-demon')!.unlocked = true;
    }
    
    if (score === 100 && !achievements.find(a => a.id === 'perfect-match')?.unlocked) {
      newAchievements.find(a => a.id === 'perfect-match')!.unlocked = true;
    }
    
    if (gameState.hintsUsed >= 5 && !achievements.find(a => a.id === 'persistent')?.unlocked) {
      newAchievements.find(a => a.id === 'persistent')!.unlocked = true;
    }
    
    setAchievements(newAchievements);
  };

  const useHint = () => {
    if (gameState.hintsUsed < 5) {
      setGameState(prev => ({
        ...prev,
        hintsUsed: prev.hintsUsed + 1
      }));
    }
  };

  const pauseGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameCompleted: true // Pause means game is over
    }));
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.gameStarted && !gameState.gameCompleted) {
      interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeElapsed: prev.timeElapsed + 1
        }));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState.gameStarted, gameState.gameCompleted]);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: false,
      gameCompleted: false,
      selectedJapanese: null,
      selectedVietnamese: null,
      matchedPairs: new Set(),
      score: 0,
      timeElapsed: 0,
      hintsUsed: 0
    }));
  };

  const changeDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    setSelectedDifficulty(difficulty);
    setGameState(prev => ({
      ...prev,
      selectedJapanese: null,
      selectedVietnamese: null,
      matchedPairs: new Set(),
      score: 0,
      timeElapsed: 0,
      hintsUsed: 0,
      gameStarted: false,
      gameCompleted: false
    }));
  };

  const toggleShuffleMode = () => {
    // Shuffle mode is now handled by the gamePairs data
  };

  const toggleTimeChallenge = () => {
    // Time challenge is now handled by the gamePairs data
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Debug function để kiểm tra state
  const debugState = () => {
    console.log('Game State:', {
      selectedJapanese: gameState.selectedJapanese,
      selectedVietnamese: gameState.selectedVietnamese,
      matchedPairs: gameState.matchedPairs,
      isPlaying: gameState.gameStarted,
      isPaused: gameState.gameCompleted
    });
  };

  // Loading state
  if (vocabularyPairs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">Đang tải từ vựng...</h2>
            <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🎮 Trò chơi ghi nhớ từ vựng</h1>
          <p className="text-lg text-gray-600 mb-2">Ghép đúng từ tiếng Nhật với nghĩa tiếng Việt</p>
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">
            {lessonTitle} - Chế độ {gameMode === 'easy' ? 'Dễ' : gameMode === 'medium' ? 'Trung bình' : 'Khó'}
          </div>
        </motion.div>

        {/* Game Controls */}
        {!gameState.gameStarted && !showResults && (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Thiết lập trò chơi</h2>
            
            {/* Difficulty Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Độ khó hiện tại:</h3>
              <div className="flex gap-3">
                {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => changeDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty === 'easy' ? 'Dễ' : difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Đang chơi với {vocabularyPairs.length} từ vựng từ {lessonTitle}
              </p>
            </div>

            {/* Game Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="shuffle-mode"
                  checked={true} // Shuffle mode is now handled by gamePairs
                  onChange={toggleShuffleMode}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="shuffle-mode" className="text-gray-700">Chế độ xáo trộn</label>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="time-challenge"
                  checked={true} // Time challenge is now handled by gamePairs
                  onChange={toggleTimeChallenge}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="time-challenge" className="text-gray-700">Thử thách thời gian</label>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
              >
                <Play size={20} className="inline mr-2" />
                Bắt đầu chơi
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Game Interface */}
        {gameState.gameStarted && (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Game Stats */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{gameState.score}</div>
                  <div className="text-sm text-gray-600">Điểm số</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {gameState.matchedPairs.size}/{gamePairs.length}
                  </div>
                  <div className="text-sm text-gray-600">Cặp đã ghép</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {formatTime(gameState.timeElapsed)}
                  </div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={pauseGame}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {gameState.gameCompleted ? <Play size={20} /> : <Pause size={20} />}
                </button>
                
                <button
                  onClick={resetGame}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
                
                <button
                  onClick={useHint}
                  disabled={gameState.hintsUsed >= 5}
                  className={`p-2 rounded-lg transition-colors ${
                    gameState.hintsUsed >= 5
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-yellow-100 text-yellow-600'
                  }`}
                >
                  <Lightbulb size={20} />
                </button>
                
                <button
                  onClick={debugState}
                  className="p-2 rounded-lg hover:bg-purple-100 transition-colors text-purple-600"
                  title="Debug State"
                >
                  🐛
                </button>
                
                <div className="text-sm text-gray-600">
                  Gợi ý: {gameState.hintsUsed}/5
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="relative">
              {/* Dividing Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2 z-10"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Column 1: Japanese Words (First Set) */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🇯🇵 Từ tiếng Nhật</h3>
                  <div className="space-y-3">
                    {shuffledJapanese.slice(0, Math.ceil(shuffledJapanese.length / 2)).map((item) => {
                      const matched = isMatched(item.id);
                      const selected = gameState.selectedJapanese === item.id;
                      
                      return (
                        <motion.div
                          key={`col1-${item.id}`}
                          initial={{ opacity: 1, scale: 1, height: 'auto' }}
                          animate={{ 
                            opacity: matched ? 0 : 1, 
                            scale: matched ? 0.8 : 1,
                            height: matched ? 0 : 'auto'
                          }}
                          exit={{ opacity: 0, scale: 0.8, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          whileHover={{ scale: matched ? 1 : 1.02 }}
                          whileTap={{ scale: matched ? 1 : 0.98 }}
                          onClick={() => !matched && handleJapaneseClick(item.id)}
                          className={`p-3 rounded-lg border-2 transition-all overflow-hidden ${
                            matched
                              ? 'bg-green-100 border-green-300 opacity-0 cursor-not-allowed'
                              : selected
                              ? 'bg-blue-100 border-blue-400 shadow-md cursor-pointer'
                              : 'bg-white border-gray-200 hover:border-blue-300 cursor-pointer'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`text-lg font-bold mb-1 ${
                              matched ? 'text-green-700' : 'text-gray-900'
                            }`}>
                              {item.japanese}
                            </div>
                            {item.kanji && (
                              <div className={`text-sm ${
                                matched ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {item.kanji}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Vietnamese Meanings (First Set) - SEPARATE COLUMN */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🇻🇳 Nghĩa tiếng Việt</h3>
                  <div className="space-y-3">
                    {shuffledVietnamese.slice(0, Math.ceil(shuffledVietnamese.length / 2)).map((item) => {
                      const matched = isMatched(item.id);
                      const selected = gameState.selectedVietnamese === item.id;
                      
                      return (
                        <motion.div
                          key={`col2-${item.id}`}
                          initial={{ opacity: 1, scale: 1, height: 'auto' }}
                          animate={{ 
                            opacity: matched ? 0 : 1, 
                            scale: matched ? 0.8 : 1,
                            height: matched ? 0 : 'auto'
                          }}
                          exit={{ opacity: 0, scale: 0.8, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          whileHover={{ scale: matched ? 1 : 1.02 }}
                          whileTap={{ scale: matched ? 1 : 0.98 }}
                          onClick={() => !matched && handleVietnameseClick(item.id)}
                          className={`p-3 rounded-lg border-2 transition-all overflow-hidden ${
                            matched
                              ? 'bg-green-100 border-green-300 opacity-0 cursor-not-allowed'
                              : selected
                              ? 'bg-green-100 border-green-400 shadow-md cursor-pointer'
                              : 'bg-white border-gray-200 hover:border-green-300 cursor-pointer'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`text-base font-semibold ${
                              matched ? 'text-green-700' : 'text-gray-900'
                            }`}>
                              {item.vietnamese}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 3: Japanese Words (Second Set) */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🇯🇵 Từ tiếng Nhật</h3>
                  <div className="space-y-3">
                    {shuffledJapanese.slice(Math.ceil(shuffledJapanese.length / 2)).map((item) => {
                      const matched = isMatched(item.id);
                      const selected = gameState.selectedJapanese === item.id;
                      
                      return (
                        <motion.div
                          key={`col3-${item.id}`}
                          initial={{ opacity: 1, scale: 1, height: 'auto' }}
                          animate={{ 
                            opacity: matched ? 0 : 1, 
                            scale: matched ? 0.8 : 1,
                            height: matched ? 0 : 'auto'
                          }}
                          exit={{ opacity: 0, scale: 0.8, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          whileHover={{ scale: matched ? 1 : 1.02 }}
                          whileTap={{ scale: matched ? 1 : 0.98 }}
                          onClick={() => !matched && handleJapaneseClick(item.id)}
                          className={`p-3 rounded-lg border-2 transition-all overflow-hidden ${
                            matched
                              ? 'bg-green-100 border-green-300 opacity-0 cursor-not-allowed'
                              : selected
                              ? 'bg-blue-100 border-blue-400 shadow-md cursor-pointer'
                              : 'bg-white border-gray-200 hover:border-blue-300 cursor-pointer'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`text-lg font-bold mb-1 ${
                              matched ? 'text-green-700' : 'text-gray-900'
                            }`}>
                              {item.japanese}
                            </div>
                            {item.kanji && (
                              <div className={`text-sm ${
                                matched ? 'text-green-600' : 'text-gray-600'
                              }`}>
                                {item.kanji}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Column 4: Vietnamese Meanings (Second Set) - SEPARATE COLUMN */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">🇻🇳 Nghĩa tiếng Việt</h3>
                  <div className="space-y-3">
                    {shuffledVietnamese.slice(Math.ceil(shuffledVietnamese.length / 2)).map((item) => {
                      const matched = isMatched(item.id);
                      const selected = gameState.selectedVietnamese === item.id;
                      
                      return (
                        <motion.div
                          key={`col4-${item.id}`}
                          initial={{ opacity: 1, scale: 1, height: 'auto' }}
                          animate={{ 
                            opacity: matched ? 0 : 1, 
                            scale: matched ? 0.8 : 1,
                            height: matched ? 0 : 'auto'
                          }}
                          exit={{ opacity: 0, scale: 0.8, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          whileHover={{ scale: matched ? 1 : 1.02 }}
                          whileTap={{ scale: matched ? 1 : 0.98 }}
                          onClick={() => !matched && handleVietnameseClick(item.id)}
                          className={`p-3 rounded-lg border-2 transition-all overflow-hidden ${
                            matched
                              ? 'bg-green-100 border-green-300 opacity-0 cursor-not-allowed'
                              : selected
                              ? 'bg-green-100 border-green-400 shadow-md cursor-pointer'
                              : 'bg-white border-gray-200 hover:border-green-300 cursor-pointer'
                          }`}
                        >
                          <div className="text-center">
                            <div className={`text-base font-semibold ${
                              matched ? 'text-green-700' : 'text-gray-900'
                            }`}>
                              {item.vietnamese}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Screen */}
        {showResults && (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Chúc mừng! Bạn đã hoàn thành!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{gameState.score}</div>
                <div className="text-gray-600">Điểm số</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {formatTime(gameState.timeElapsed)}
                </div>
                <div className="text-gray-600">Thời gian</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {gameState.hintsUsed}
                </div>
                <div className="text-gray-600">Gợi ý đã dùng</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🏆 Thành tích đạt được</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.unlocked
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className="font-semibold text-gray-900 mb-1">{achievement.name}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                    {achievement.unlocked && (
                      <div className="text-xs text-yellow-600 mt-2">✅ Đã mở khóa</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Chơi lại
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowResults(false)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Quay lại
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* High Scores */}
        {highScores.length > 0 && (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Trophy size={24} className="text-yellow-600 mr-2" />
              Điểm cao nhất
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {highScores.map((score, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{score.score}</div>
                  <div className="text-sm text-gray-600">{score.difficulty} - {formatTime(score.time)}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

