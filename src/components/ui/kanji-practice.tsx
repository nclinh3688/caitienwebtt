'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  FaPen, 
  FaRedo, 
  FaPlay, 
  FaPause, 
  FaVolumeUp,
  FaCheck,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaLightbulb
} from 'react-icons/fa';

export interface KanjiData {
  kanji: string;
  kun: string[];
  on: string[];
  meaning: string[];
  strokes: number;
  strokeOrder: string[]; // SVG paths for each stroke
  examples: Array<{
    word: string;
    reading: string;
    meaning: string;
  }>;
  mnemonics?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  frequency: number; // Usage frequency ranking
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
}

interface KanjiPracticeProps {
  kanjiData: KanjiData;
  showStrokeOrder?: boolean;
  enableWritingPractice?: boolean;
  autoPlay?: boolean;
  onComplete?: (success: boolean) => void;
}

export function KanjiPractice({ 
  kanjiData, 
  showStrokeOrder = true,
  enableWritingPractice = true,
  autoPlay = false,
  onComplete
}: KanjiPracticeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [showReadings, setShowReadings] = useState(false);
  const [userStrokes, setUserStrokes] = useState<Array<{x: number, y: number}[]>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<{x: number, y: number}[]>([]);
  const [practiceMode, setPracticeMode] = useState<'view' | 'trace' | 'write'>('view');
  const [strokeAccuracy, setStrokeAccuracy] = useState<number[]>([]);

  // Canvas drawing functions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx);

    // Draw completed strokes
    if (practiceMode === 'view' || practiceMode === 'trace') {
      drawStrokeOrder(ctx);
    }

    // Draw user strokes
    drawUserStrokes(ctx);
  }, [currentStroke, practiceMode, userStrokes]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Draw grid lines
    const gridSize = 75;
    for (let i = 0; i <= 4; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * gridSize, 0);
      ctx.lineTo(i * gridSize, 300);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(300, i * gridSize);
      ctx.stroke();
    }

    // Draw center lines
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 300);
    ctx.moveTo(0, 150);
    ctx.lineTo(300, 150);
    ctx.stroke();
  };

  const drawStrokeOrder = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw strokes up to current stroke
    const strokesToDraw = practiceMode === 'trace' ? currentStroke : kanjiData.strokeOrder.length;
    for (let i = 0; i < Math.min(strokesToDraw, kanjiData.strokeOrder.length); i++) {
      const opacity = practiceMode === 'trace' && i === currentStroke - 1 ? 0.3 : 1;
      ctx.globalAlpha = opacity;
      
      // In a real implementation, you would parse SVG path data
      // For demo, we'll draw simple strokes
      drawStrokePath(ctx, i);
    }
    ctx.globalAlpha = 1;
  };

  const drawStrokePath = (ctx: CanvasRenderingContext2D, strokeIndex: number) => {
    // Demo stroke paths - in real app, these would be actual stroke data
    const demoStrokes = {
      0: [{x: 50, y: 50}, {x: 250, y: 50}], // Horizontal line
      1: [{x: 150, y: 30}, {x: 150, y: 270}], // Vertical line
      2: [{x: 30, y: 150}, {x: 270, y: 150}], // Another horizontal
      3: [{x: 100, y: 100}, {x: 200, y: 200}], // Diagonal
    };

    const strokePath = demoStrokes[strokeIndex as keyof typeof demoStrokes];
    if (!strokePath) return;

    ctx.beginPath();
    ctx.moveTo(strokePath[0].x, strokePath[0].y);
    for (let i = 1; i < strokePath.length; i++) {
      ctx.lineTo(strokePath[i].x, strokePath[i].y);
    }
    ctx.stroke();
  };

  const drawUserStrokes = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    userStrokes.forEach(stroke => {
      if (stroke.length > 1) {
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
      }
    });

    // Draw current path
    if (currentPath.length > 1) {
      ctx.strokeStyle = '#1d4ed8';
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }
      ctx.stroke();
    }
  };

  // Mouse/touch event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (practiceMode !== 'write' && practiceMode !== 'trace') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentPath([{x, y}]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentPath(prev => [...prev, {x, y}]);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (currentPath.length > 1) {
      setUserStrokes(prev => [...prev, currentPath]);
      
      // Analyze stroke accuracy (simplified)
      const accuracy = analyzeStrokeAccuracy(currentPath, userStrokes.length);
      setStrokeAccuracy(prev => [...prev, accuracy]);
      
      if (practiceMode === 'trace') {
        setCurrentStroke(prev => Math.min(prev + 1, kanjiData.strokeOrder.length));
      }
    }
    setCurrentPath([]);
  };

  const analyzeStrokeAccuracy = (userStroke: {x: number, y: number}[], strokeIndex: number) => {
    // Simplified accuracy calculation
    // In real app, would compare with actual stroke path data
    return Math.random() * 40 + 60; // Demo: 60-100% accuracy
  };

  const playStrokeOrder = () => {
    setIsPlaying(true);
    setCurrentStroke(0);
    
    const interval = setInterval(() => {
      setCurrentStroke(prev => {
        if (prev >= kanjiData.strokeOrder.length) {
          setIsPlaying(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetPractice = () => {
    setUserStrokes([]);
    setCurrentStroke(0);
    setStrokeAccuracy([]);
    setCurrentPath([]);
  };

  const getOverallAccuracy = () => {
    if (strokeAccuracy.length === 0) return 0;
    return Math.round(strokeAccuracy.reduce((sum, acc) => sum + acc, 0) / strokeAccuracy.length);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-3xl">
            <span className="text-6xl font-bold mr-4">{kanjiData.kanji}</span>
            学習モード
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              kanjiData.level === 'N5' ? 'bg-green-100 text-green-800' :
              kanjiData.level === 'N4' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {kanjiData.level}
            </span>
            <div className="flex">
              {[...Array(kanjiData.difficulty)].map((_, i) => (
                <span key={i} className="text-yellow-400">⭐</span>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Practice Canvas */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">練習エリア</h3>
              <div className="flex space-x-2">
                <Button
                  variant={practiceMode === 'view' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPracticeMode('view')}
                >
                  <FaEye className="mr-1" />
                  見る
                </Button>
                <Button
                  variant={practiceMode === 'trace' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPracticeMode('trace')}
                >
                  <FaPen className="mr-1" />
                  なぞる
                </Button>
                <Button
                  variant={practiceMode === 'write' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPracticeMode('write')}
                >
                  ✍️ 書く
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="border-2 border-gray-300 rounded-lg cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              
              {practiceMode === 'trace' && (
                <div className="absolute top-2 right-2 bg-white rounded-lg p-2 shadow-lg">
                  <div className="text-sm text-gray-600">画数: {currentStroke}/{kanjiData.strokes}</div>
                  <Progress value={(currentStroke / kanjiData.strokes) * 100} className="w-20 mt-1" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button onClick={playStrokeOrder} disabled={isPlaying}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                  {isPlaying ? '停止' : '筆順'}
                </Button>
                <Button onClick={resetPractice} variant="outline">
                  <FaRedo />
                  リセット
                </Button>
              </div>

              {strokeAccuracy.length > 0 && (
                <div className="text-right">
                  <div className="text-sm text-gray-600">精度</div>
                  <div className={`text-xl font-bold ${
                    getOverallAccuracy() >= 80 ? 'text-green-600' :
                    getOverallAccuracy() >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {getOverallAccuracy()}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Readings */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">読み方</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReadings(!showReadings)}
                >
                  {showReadings ? <FaEyeSlash /> : <FaEye />}
                  {showReadings ? '隠す' : '表示'}
                </Button>
              </div>
              
              {showReadings && (
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold text-blue-600">音読み: </span>
                    {kanjiData.on.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold text-green-600">訓読み: </span>
                    {kanjiData.kun.join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Meaning */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">意味</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMeaning(!showMeaning)}
                >
                  {showMeaning ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              
              {showMeaning && (
                <div className="bg-gray-50 rounded-lg p-3">
                  {kanjiData.meaning.join(', ')}
                </div>
              )}
            </div>

            {/* Examples */}
            <div>
              <h3 className="text-lg font-semibold mb-3">例</h3>
              <div className="space-y-3">
                {kanjiData.examples.map((example, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-gray-800">{example.word}</span>
                        <span className="ml-2 text-blue-600">({example.reading})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <FaVolumeUp />
                      </Button>
                    </div>
                    <div className="text-gray-700 mt-1">{example.meaning}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mnemonics */}
            {kanjiData.mnemonics && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <FaLightbulb className="mr-2 text-yellow-500" />
                  覚え方
                </h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800">{kanjiData.mnemonics}</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gray-800">{kanjiData.strokes}</div>
                <div className="text-sm text-gray-600">画数</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-gray-800">#{kanjiData.frequency}</div>
                <div className="text-sm text-gray-600">頻度</div>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Check */}
        {strokeAccuracy.length === kanjiData.strokes && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <FaCheck className="text-4xl text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-green-800">完成！</h3>
            </div>
            <p className="text-green-700 mb-4">
              総合精度: <span className="font-bold">{getOverallAccuracy()}%</span>
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={resetPractice}>
                もう一度
              </Button>
              <Button variant="outline" onClick={() => onComplete?.(getOverallAccuracy() >= 70)}>
                次の漢字
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}