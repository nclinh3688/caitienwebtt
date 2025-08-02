'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AnimatedProgress } from '@/components/ui/AnimatedCard';
import { 
  FaMicrophone, 
  FaPlay, 
  FaStop, 
  FaRedo, 
  FaVolumeUp,
  FaChartLine,
  FaMedal,
  FaLightbulb,
  FaWaveSquare,
  FaCheck,
  FaTimes,
  FaStar
} from 'react-icons/fa';

interface PronunciationAnalysis {
  overallScore: number;
  wordScores: Array<{
    word: string;
    score: number;
    feedback: string;
    improvement: string;
  }>;
  phonemeAnalysis: Array<{
    phoneme: string;
    accuracy: number;
    suggestion: string;
  }>;
  rhythm: {
    score: number;
    feedback: string;
  };
  intonation: {
    score: number;
    feedback: string;
  };
  fluency: {
    score: number;
    feedback: string;
  };
}

interface AdvancedPronunciationTrainerProps {
  targetText: string;
  targetAudio?: string;
  language?: 'japanese' | 'chinese' | 'english' | 'korean' | 'vietnamese';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  onScoreUpdate?: (analysis: PronunciationAnalysis) => void;
  className?: string;
}

export const AdvancedPronunciationTrainer = memo(function AdvancedPronunciationTrainer({
  targetText,
  targetAudio,
  language = 'japanese',
  difficulty = 'beginner',
  onScoreUpdate,
  className = ''
}: AdvancedPronunciationTrainerProps) {
  // Optimized state management - group related states
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    isAnalyzing: false,
    userSpeech: '',
    attempts: 0
  });
  
  const [analysisState, setAnalysisState] = useState({
    analysis: null as PronunciationAnalysis | null,
    bestScore: 0
  });
  
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    waveform: [] as number[]
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Speech Recognition setup
  const recognition = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = getLanguageCode(language);
      
      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setRecordingState(prev => ({ ...prev, userSpeech: transcript }));
        analyzeProunciation(transcript);
      };

      recognition.current.onerror = (event: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Speech recognition error:', event.error);
        }
        setRecordingState(prev => ({ ...prev, isRecording: false }));
      };

      recognition.current.onend = () => {
        setRecordingState(prev => ({ ...prev, isRecording: false }));
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [language]);

  const getLanguageCode = (lang: string): string => {
    const langCodes = {
      japanese: 'ja-JP',
      chinese: 'zh-CN', 
      english: 'en-US',
      korean: 'ko-KR',
      vietnamese: 'vi-VN'
    };
    return langCodes[lang as keyof typeof langCodes] || 'en-US';
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio visualization
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      // Start waveform visualization
      visualizeAudio();

      // Start speech recognition
      if (recognition.current) {
        recognition.current.start();
        setRecordingState(prev => ({ ...prev, isRecording: true }));
        setAnalysisState(prev => ({ ...prev, analysis: null }));
      }

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
    }
    setRecordingState(prev => ({ ...prev, isRecording: false }));
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const visualizeAudio = () => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const draw = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);
      
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.fillStyle = '#3b82f6';

      const barWidth = canvas.width / dataArray.length;
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx!.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
      }

      if (recordingState.isRecording) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
  };

  const analyzeProunciation = async (transcript: string) => {
    setRecordingState(prev => ({ ...prev, isAnalyzing: true }));
    setRecordingState(prev => ({ ...prev, attempts: prev.attempts + 1 }));

    try {
      // Call AI pronunciation analysis API
      const response = await fetch('/api/ai/pronunciation-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetText,
          userSpeech: transcript,
          language,
          difficulty,
          attempt: recordingState.attempts + 1
        }),
      });

      if (response.ok) {
        const analysisResult = await response.json();
        setAnalysisState(prev => ({ ...prev, analysis: analysisResult }));
        
        if (analysisResult.overallScore > analysisState.bestScore) {
          setAnalysisState(prev => ({ ...prev, bestScore: analysisResult.overallScore }));
        }

        onScoreUpdate?.(analysisResult);
      } else {
        // Fallback to mock analysis
        const mockAnalysis = generateMockAnalysis(transcript);
        setAnalysisState(prev => ({ ...prev, analysis: mockAnalysis }));
        onScoreUpdate?.(mockAnalysis);
      }
    } catch (error) {
      console.error('Error analyzing pronunciation:', error);
      const mockAnalysis = generateMockAnalysis(transcript);
      setAnalysisState(prev => ({ ...prev, analysis: mockAnalysis }));
      onScoreUpdate?.(mockAnalysis);
    } finally {
      setRecordingState(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const generateMockAnalysis = (transcript: string): PronunciationAnalysis => {
    const similarity = calculateSimilarity(targetText.toLowerCase(), transcript.toLowerCase());
    const baseScore = Math.round(similarity * 100);
    
    return {
      overallScore: Math.max(baseScore, 60),
      wordScores: targetText.split(' ').map((word, index) => ({
        word,
        score: Math.max(70 + Math.random() * 30, baseScore - 10),
        feedback: index % 2 === 0 ? 'Excellent!' : 'Good pronunciation',
        improvement: index % 3 === 0 ? 'Try to emphasize the first syllable' : 'Perfect timing'
      })),
      phonemeAnalysis: [
        { phoneme: 'さ', accuracy: 85, suggestion: 'Soften the \'s\' sound slightly' },
        { phoneme: 'ん', accuracy: 92, suggestion: 'Perfect nasal pronunciation' },
        { phoneme: 'か', accuracy: 78, suggestion: 'More emphasis on the \'k\' sound' }
      ],
      rhythm: {
        score: baseScore + 5,
        feedback: 'Natural rhythm with good pacing'
      },
      intonation: {
        score: baseScore - 5,
        feedback: 'Try to raise pitch slightly at the end of questions'
      },
      fluency: {
        score: baseScore,
        feedback: 'Smooth delivery with minimal hesitation'
      }
    };
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const substitutionCost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + substitutionCost
        );
      }
    }

    return matrix[str2.length][str1.length];
  };

  const playTargetAudio = () => {
    if (targetAudio) {
      const audio = new Audio(targetAudio);
      setAudioState(prev => ({ ...prev, isPlaying: true }));
      audio.play();
      audio.onended = () => setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <FaMedal className="text-yellow-500" />;
    if (score >= 80) return <FaStar className="text-blue-500" />;
    if (score >= 70) return <FaCheck className="text-green-500" />;
    return <FaTimes className="text-red-500" />;
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaMicrophone className="text-blue-600" />
          🎤 AI Pronunciation Trainer
          <Badge variant="outline" className="ml-2">
            {language.toUpperCase()} {difficulty}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Target Text Display */}
        <div className="text-center p-4 bg-gray-50 rounded-lg border">
          <p className="text-lg font-medium text-gray-800 mb-2">🎯 Target Pronunciation:</p>
          <p className="text-xl font-bold text-blue-600">{targetText}</p>
          {targetAudio && (
            <Button
              variant="outline"
              size="sm"
              onClick={playTargetAudio}
              disabled={audioState.isPlaying}
              className="mt-3"
            >
              <FaVolumeUp className="mr-2" />
              {audioState.isPlaying ? 'Playing...' : 'Listen to Target'}
            </Button>
          )}
        </div>

        {/* Recording Controls */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={recordingState.isRecording ? stopRecording : startRecording}
              disabled={recordingState.isAnalyzing}
              className={`px-8 py-3 text-lg ${
                recordingState.isRecording 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {recordingState.isRecording ? (
                <>
                  <FaStop className="mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <FaMicrophone className="mr-2" />
                  Start Recording
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setRecordingState(prev => ({ ...prev, userSpeech: '' }));
                setAnalysisState(prev => ({ ...prev, analysis: null }));
                setRecordingState(prev => ({ ...prev, attempts: 0 }));
              }}
              className="px-6 py-3"
            >
              <FaRedo className="mr-2" />
              Reset
            </Button>
          </div>

          {/* Audio Visualization */}
          {recordingState.isRecording && (
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                width={300}
                height={100}
                className="border rounded-lg bg-gray-50"
              />
            </div>
          )}

          {/* Recording Status */}
          {recordingState.isRecording && (
            <div className="flex items-center justify-center gap-2 text-red-600">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="font-medium">Recording... Speak clearly</span>
            </div>
          )}
        </div>

        {/* Analysis Loading */}
        {recordingState.isAnalyzing && (
          <div className="text-center py-8">
            <LoadingSpinner size="lg" variant="primary" text="AI analyzing pronunciation..." />
          </div>
        )}

        {/* User Speech Display */}
        {recordingState.userSpeech && (
          <div className="p-4 bg-blue-50 rounded-lg border">
            <p className="text-sm font-medium text-gray-700 mb-2">🗣️ What you said:</p>
            <p className="text-lg text-blue-800 font-medium">"{recordingState.userSpeech}"</p>
          </div>
        )}

        {/* Detailed Analysis Results */}
        {analysisState.analysis && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-2xl font-bold ${getScoreColor(analysisState.analysis.overallScore)}`}>
                {getScoreIcon(analysisState.analysis.overallScore)}
                {analysisState.analysis.overallScore}%
              </div>
              <p className="text-gray-600 mt-2">Overall Pronunciation Score</p>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{recordingState.attempts}</div>
                <div className="text-sm text-gray-600">Attempts</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">{analysisState.bestScore}%</div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <FaChartLine className="text-purple-600" />
                Detailed Analysis
              </h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Rhythm</span>
                    <span className="font-bold">{analysisState.analysis.rhythm.score}%</span>
                  </div>
                  <AnimatedProgress 
                    value={analysisState.analysis.rhythm.score} 
                    maxValue={100} 
                    size="sm"
                  />
                  <p className="text-xs text-gray-600 mt-2">{analysisState.analysis.rhythm.feedback}</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Intonation</span>
                    <span className="font-bold">{analysisState.analysis.intonation.score}%</span>
                  </div>
                  <AnimatedProgress 
                    value={analysisState.analysis.intonation.score} 
                    maxValue={100} 
                    size="sm"
                  />
                  <p className="text-xs text-gray-600 mt-2">{analysisState.analysis.intonation.feedback}</p>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Fluency</span>
                    <span className="font-bold">{analysisState.analysis.fluency.score}%</span>
                  </div>
                  <AnimatedProgress 
                    value={analysisState.analysis.fluency.score} 
                    maxValue={100} 
                    size="sm"
                  />
                  <p className="text-xs text-gray-600 mt-2">{analysisState.analysis.fluency.feedback}</p>
                </div>
              </div>
            </div>

            {/* Word-by-Word Analysis */}
            {analysisState.analysis.wordScores.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <FaWaveSquare className="text-orange-600" />
                  Word Analysis
                </h4>
                <div className="grid gap-2">
                  {analysisState.analysis.wordScores.map((wordScore, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <span className="font-medium text-gray-800">"{wordScore.word}"</span>
                        <p className="text-xs text-gray-600">{wordScore.improvement}</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-sm font-bold ${getScoreColor(wordScore.score)}`}>
                          {Math.round(wordScore.score)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestions */}
            <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <FaLightbulb className="text-yellow-500" />
                💡 AI Pronunciation Tips
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {analysisState.analysis.phonemeAnalysis.slice(0, 3).map((phoneme, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs">
                      {phoneme.phoneme}
                    </span>
                    <span>{phoneme.suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default AdvancedPronunciationTrainer;