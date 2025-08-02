// Audio Integration for N5 Lessons
export interface AudioFile {
  path: string;
  description: string;
  duration: string;
  type: 'vocabulary' | 'grammar' | 'conversation';
}

export interface LessonAudio {
  lessonId: string;
  title: string;
  vocabulary?: AudioFile[];
  grammar?: AudioFile[];
  conversation?: AudioFile[];
  audioFiles?: {
    vocabulary: AudioFile[];
    grammar: AudioFile[];
    conversation: AudioFile[];
  };
}

export const audioData: Record<string, any> = {
  "B01": {
    "title": "Bài 1: Giới thiệu bản thân",
    "vocabulary": [
      {
        "word": "わたし",
        "pronunciation": "watashi",
        "audio": "/audio/n5/lesson-1/watashi.mp3"
      },
      {
        "word": "あなた", 
        "pronunciation": "anata",
        "audio": "/audio/n5/lesson-1/anata.mp3"
      },
      {
        "word": "あのひと",
        "pronunciation": "anohito",
        "audio": "/audio/n5/lesson-1/anohito.mp3"
      },
      {
        "word": "せんせい",
        "pronunciation": "sensei",
        "audio": "/audio/n5/lesson-1/sensei.mp3"
      },
      {
        "word": "がくせい",
        "pronunciation": "gakusei",
        "audio": "/audio/n5/lesson-1/gakusei.mp3"
      }
    ],
    "lesson_audio": "/audio/n5/lesson-1/lesson-b01.mp3"
  },
  "B02": {
    "title": "Bài 2: Đại từ chỉ định",
    "vocabulary": [
      {
        "word": "これ",
        "pronunciation": "kore",
        "audio": "/audio/n5/lesson-2/kore.mp3"
      },
      {
        "word": "それ",
        "pronunciation": "sore",
        "audio": "/audio/n5/lesson-2/sore.mp3"
      },
      {
        "word": "あれ",
        "pronunciation": "are",
        "audio": "/audio/n5/lesson-2/are.mp3"
      },
      {
        "word": "この",
        "pronunciation": "kono",
        "audio": "/audio/n5/lesson-2/kono.mp3"
      },
      {
        "word": "その",
        "pronunciation": "sono",
        "audio": "/audio/n5/lesson-2/sono.mp3"
      }
    ],
    "lesson_audio": "/audio/n5/lesson-2/lesson-b02.mp3"
  },
  "B03": {
    "title": "Bài 3: Số đếm",
    "vocabulary": [
      {
        "word": "いち",
        "pronunciation": "ichi",
        "audio": "/audio/n5/lesson-3/ichi.mp3"
      },
      {
        "word": "に",
        "pronunciation": "ni",
        "audio": "/audio/n5/lesson-3/ni.mp3"
      },
      {
        "word": "さん",
        "pronunciation": "san",
        "audio": "/audio/n5/lesson-3/san.mp3"
      },
      {
        "word": "よん",
        "pronunciation": "yon",
        "audio": "/audio/n5/lesson-3/yon.mp3"
      },
      {
        "word": "ご",
        "pronunciation": "go",
        "audio": "/audio/n5/lesson-3/go.mp3"
      }
    ],
    "lesson_audio": "/audio/n5/lesson-3/lesson-b03.mp3"
  }
};

export function getAudioForLesson(lessonId: string): LessonAudio | null {
  return audioData[lessonId] || null;
}

export function getVocabularyAudio(lessonId: string, word: string): AudioFile | null {
  const lesson = audioData[lessonId];
  if (!lesson) return null;
  
  return lesson.vocabulary?.find((v: any) => v.word === word) || null;
}

export function getGrammarAudio(lessonId: string, pattern: string): AudioFile | null {
  const lesson = audioData[lessonId];
  if (!lesson) return null;
  
  return lesson.grammar?.find((g: any) => g.path.includes(pattern.replace(/\s+/g, '-'))) || null;
}

export function playAudio(audioPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioPath);
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('Failed to play audio'));
    audio.play().catch(reject);
  });
}
