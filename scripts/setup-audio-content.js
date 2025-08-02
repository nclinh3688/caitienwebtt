const fs = require('fs');
const path = require('path');

console.log('🎵 Setting up Audio Content for N5 Lessons...\n');

// Audio content structure
const audioContent = {
  lessons: {
    B01: {
      title: "Bài 1: Giới thiệu bản thân",
      vocabulary: [
        { word: "わたし", pronunciation: "watashi", meaning: "tôi" },
        { word: "あなた", pronunciation: "anata", meaning: "bạn" },
        { word: "せんせい", pronunciation: "sensei", meaning: "giáo viên" },
        { word: "がくせい", pronunciation: "gakusei", meaning: "học sinh" },
        { word: "だいがく", pronunciation: "daigaku", meaning: "đại học" }
      ],
      grammar: [
        { pattern: "N1 は N2 です", example: "わたしはがくせいです", meaning: "N1 là N2" },
        { pattern: "N1 は N2 ではありません", example: "わたしはせんせいではありません", meaning: "N1 không phải là N2" }
      ],
      conversation: [
        { speaker: "A", text: "はじめまして。わたしはミラーです。", meaning: "Rất vui được gặp bạn. Tôi là Miller." },
        { speaker: "B", text: "はじめまして。わたしは田中です。どうぞよろしく。", meaning: "Rất vui được gặp bạn. Tôi là Tanaka. Rất mong được sự giúp đỡ." }
      ]
    },
    B02: {
      title: "Bài 2: Đại từ chỉ định",
      vocabulary: [
        { word: "これ", pronunciation: "kore", meaning: "cái này" },
        { word: "それ", pronunciation: "sore", meaning: "cái đó" },
        { word: "あれ", pronunciation: "are", meaning: "cái kia" },
        { word: "この", pronunciation: "kono", meaning: "cái này (tính từ)" },
        { word: "その", pronunciation: "sono", meaning: "cái đó (tính từ)" }
      ],
      grammar: [
        { pattern: "これは N です", example: "これはほんです", meaning: "Đây là N" },
        { pattern: "それは N です", example: "それはえんぴつです", meaning: "Đó là N" }
      ],
      conversation: [
        { speaker: "A", text: "これはなんですか。", meaning: "Đây là cái gì?" },
        { speaker: "B", text: "それはほんです。", meaning: "Đó là quyển sách." }
      ]
    },
    B03: {
      title: "Bài 3: Số đếm",
      vocabulary: [
        { word: "いち", pronunciation: "ichi", meaning: "1" },
        { word: "に", pronunciation: "ni", meaning: "2" },
        { word: "さん", pronunciation: "san", meaning: "3" },
        { word: "よん", pronunciation: "yon", meaning: "4" },
        { word: "ご", pronunciation: "go", meaning: "5" }
      ],
      grammar: [
        { pattern: "N は いくつ ですか", example: "あなたはなんさいですか", meaning: "N bao nhiêu?" },
        { pattern: "N は 数字 です", example: "わたしは20さいです", meaning: "N là số" }
      ],
      conversation: [
        { speaker: "A", text: "あなたはなんさいですか。", meaning: "Bạn bao nhiêu tuổi?" },
        { speaker: "B", text: "わたしは20さいです。", meaning: "Tôi 20 tuổi." }
      ]
    }
  }
};

// Create audio directories
function createAudioDirectories() {
  const baseDir = path.join(__dirname, '../public/audio');
  const n5Dir = path.join(baseDir, 'n5');
  
  // Create base directories
  [baseDir, n5Dir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
  
  // Create lesson directories
  Object.keys(audioContent.lessons).forEach(lessonId => {
    const lessonDir = path.join(n5Dir, lessonId);
    if (!fs.existsSync(lessonDir)) {
      fs.mkdirSync(lessonDir, { recursive: true });
      console.log(`✅ Created lesson directory: ${lessonDir}`);
    }
  });
}

// Generate audio metadata
function generateAudioMetadata() {
  const metadataPath = path.join(__dirname, '../src/data/audio-metadata.json');
  
  const metadata = {
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
    lessons: {}
  };
  
  Object.keys(audioContent.lessons).forEach(lessonId => {
    const lesson = audioContent.lessons[lessonId];
    metadata.lessons[lessonId] = {
      title: lesson.title,
      audioFiles: {
        vocabulary: lesson.vocabulary.map(v => ({
          word: v.word,
          pronunciation: v.pronunciation,
          audioFile: `/audio/n5/${lessonId}/${v.pronunciation}.mp3`,
          duration: "1-2 seconds"
        })),
        grammar: lesson.grammar.map(g => ({
          pattern: g.pattern,
          example: g.example,
          audioFile: `/audio/n5/${lessonId}/grammar-${g.pattern.replace(/\s+/g, '-')}.mp3`,
          duration: "3-5 seconds"
        })),
        conversation: lesson.conversation.map(c => ({
          speaker: c.speaker,
          text: c.text,
          audioFile: `/audio/n5/${lessonId}/conv-${c.speaker}-${lesson.conversation.indexOf(c) + 1}.mp3`,
          duration: "5-10 seconds"
        }))
      }
    };
  });
  
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`✅ Generated audio metadata: ${metadataPath}`);
}

// Generate placeholder audio info
function generatePlaceholderInfo() {
  const placeholderPath = path.join(__dirname, '../src/data/audio-placeholders.json');
  
  const placeholders = [];
  
  Object.keys(audioContent.lessons).forEach(lessonId => {
    const lesson = audioContent.lessons[lessonId];
    
    // Vocabulary audio files
    lesson.vocabulary.forEach(vocab => {
      placeholders.push({
        path: `/audio/n5/${lessonId}/${vocab.pronunciation}.mp3`,
        description: `Pronunciation: ${vocab.word} (${vocab.meaning})`,
        duration: "1-2 seconds",
        type: "vocabulary"
      });
    });
    
    // Grammar audio files
    lesson.grammar.forEach(grammar => {
      placeholders.push({
        path: `/audio/n5/${lessonId}/grammar-${grammar.pattern.replace(/\s+/g, '-')}.mp3`,
        description: `Grammar: ${grammar.pattern} - ${grammar.example}`,
        duration: "3-5 seconds",
        type: "grammar"
      });
    });
    
    // Conversation audio files
    lesson.conversation.forEach(conv => {
      placeholders.push({
        path: `/audio/n5/${lessonId}/conv-${conv.speaker}-${lesson.conversation.indexOf(conv) + 1}.mp3`,
        description: `Conversation ${conv.speaker}: ${conv.text}`,
        duration: "5-10 seconds",
        type: "conversation"
      });
    });
  });
  
  fs.writeFileSync(placeholderPath, JSON.stringify(placeholders, null, 2));
  console.log(`✅ Generated audio placeholders: ${placeholderPath}`);
}

// Generate lesson audio integration
function generateLessonAudioIntegration() {
  const integrationPath = path.join(__dirname, '../src/lib/audio-integration.ts');
  
  const integrationCode = `// Audio Integration for N5 Lessons
export interface AudioFile {
  path: string;
  description: string;
  duration: string;
  type: 'vocabulary' | 'grammar' | 'conversation';
}

export interface LessonAudio {
  lessonId: string;
  title: string;
  audioFiles: {
    vocabulary: AudioFile[];
    grammar: AudioFile[];
    conversation: AudioFile[];
  };
}

export const audioData: Record<string, LessonAudio> = ${JSON.stringify(audioContent.lessons, null, 2)};

export function getAudioForLesson(lessonId: string): LessonAudio | null {
  return audioData[lessonId] || null;
}

export function getVocabularyAudio(lessonId: string, word: string): AudioFile | null {
  const lesson = audioData[lessonId];
  if (!lesson) return null;
  
  return lesson.audioFiles.vocabulary.find(v => v.path.includes(word)) || null;
}

export function getGrammarAudio(lessonId: string, pattern: string): AudioFile | null {
  const lesson = audioData[lessonId];
  if (!lesson) return null;
  
  return lesson.audioFiles.grammar.find(g => g.path.includes(pattern.replace(/\\s+/g, '-'))) || null;
}

export function playAudio(audioPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioPath);
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('Failed to play audio'));
    audio.play().catch(reject);
  });
}
`;

  fs.writeFileSync(integrationPath, integrationCode);
  console.log(`✅ Generated audio integration: ${integrationPath}`);
}

// Main execution
console.log('🎵 Setting up Audio Content Structure...\n');

createAudioDirectories();
generateAudioMetadata();
generatePlaceholderInfo();
generateLessonAudioIntegration();

console.log('\n🎉 Audio content setup completed!');
console.log('\n📋 Next steps:');
console.log('1. Add actual audio files to /public/audio/n5/');
console.log('2. Test audio playback in lesson player');
console.log('3. Implement audio controls in UI');
console.log('4. Add pronunciation practice features'); 