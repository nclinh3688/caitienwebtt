'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaPlay, 
  FaStop, 
  FaRedo,
  FaCheckCircle,
  FaTimesCircle,
  FaVolumeUp
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PronunciationTrainerProps {
  targetText: string;
  targetAudio?: string;
  onScoreUpdate?: (score: number, userSpeech: string) => void;
}

// Speech Recognition types
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function PronunciationTrainer({ targetText, targetAudio, onScoreUpdate }: PronunciationTrainerProps) {
  const [isListening, setIsListening] = useState(false);
  const [userSpeech, setUserSpeech] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Trình duyệt không hỗ trợ nhận diện giọng nói. Vui lòng sử dụng Chrome hoặc Edge.');
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ja-JP'; // Japanese language

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setUserSpeech(transcript);
      calculatePronunciationScore(targetText, transcript);
      setAttempts(prev => prev + 1);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      setError(`Lỗi nhận diện: ${event.error === 'no-speech' ? 'Không nghe thấy giọng nói' : event.error}`);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [targetText]);

  const calculatePronunciationScore = (target: string, spoken: string) => {
    // Simple pronunciation scoring algorithm
    // In a real app, you'd use more sophisticated algorithms or APIs
    
    // Convert to lowercase and remove punctuation for comparison
    const normalizeText = (text: string) => 
      text.toLowerCase()
          .replace(/[。、！？]/g, '') // Remove Japanese punctuation
          .replace(/\s+/g, ''); // Remove spaces
    
    const normalizedTarget = normalizeText(target);
    const normalizedSpoken = normalizeText(spoken);
    
    // Calculate similarity using Levenshtein distance
    const similarity = calculateSimilarity(normalizedTarget, normalizedSpoken);
    const pronunciationScore = Math.round(similarity * 100);
    
    setScore(pronunciationScore);
    onScoreUpdate?.(pronunciationScore, spoken);
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const startListening = () => {
    if (!recognitionRef.current || !isSupported) return;
    
    setUserSpeech('');
    setScore(null);
    setError(null);
    
    try {
      recognitionRef.current.start();
    } catch (err) {
      setError('Không thể bắt đầu nhận diện giọng nói');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const playTargetAudio = () => {
    if (targetAudio && audioRef.current) {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }
  };

  const resetPractice = () => {
    setUserSpeech('');
    setScore(null);
    setError(null);
    setAttempts(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <FaCheckCircle className="text-green-600" />;
    if (score >= 60) return <FaCheckCircle className="text-yellow-600" />;
    return <FaTimesCircle className="text-red-600" />;
  };

  if (!isSupported) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <FaMicrophoneSlash />
            Không hỗ trợ nhận diện giọng nói
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <FaMicrophone />
          Luyện phát âm với AI
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Target text display */}
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-700 mb-2">Hãy đọc theo:</h4>
          <p className="text-lg font-medium text-gray-900 leading-relaxed">{targetText}</p>
          
          {targetAudio && (
            <div className="mt-3">
              <audio ref={audioRef} src={targetAudio} className="hidden" />
              <Button
                onClick={playTargetAudio}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <FaVolumeUp />
                Nghe mẫu
              </Button>
            </div>
          )}
        </div>

        {/* Recording controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={!isSupported}
            className={`flex items-center gap-2 px-6 py-3 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isListening ? (
              <>
                <FaStop />
                Dừng ghi âm
              </>
            ) : (
              <>
                <FaMicrophone />
                Bắt đầu luyện
              </>
            )}
          </Button>
          
          {attempts > 0 && (
            <Button
              onClick={resetPractice}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FaRedo />
              Thử lại
            </Button>
          )}
        </div>

        {/* User speech result */}
        {userSpeech && (
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">Bạn đã nói:</h4>
            <p className="text-lg text-gray-900">{userSpeech}</p>
          </div>
        )}

        {/* Score display */}
        {score !== null && (
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-700">Điểm phát âm:</h4>
              <div className="flex items-center gap-2">
                {getScoreIcon(score)}
                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}/100
                </span>
              </div>
            </div>
            
            {score >= 80 && (
              <p className="text-green-600 mt-2">🎉 Tuyệt vời! Phát âm rất chuẩn!</p>
            )}
            {score >= 60 && score < 80 && (
              <p className="text-yellow-600 mt-2">👍 Khá tốt! Hãy thử lại để cải thiện.</p>
            )}
            {score < 60 && (
              <p className="text-red-600 mt-2">💪 Cần luyện tập thêm. Nghe mẫu và thử lại!</p>
            )}
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Practice stats */}
        {attempts > 0 && (
          <div className="text-center text-sm text-gray-500">
            Đã thử {attempts} lần
          </div>
        )}
      </CardContent>
    </Card>
  );
}