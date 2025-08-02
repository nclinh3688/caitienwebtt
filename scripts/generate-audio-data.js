const fs = require('fs');
const path = require('path');

// Audio file mappings for N5 lessons
const audioData = {
  "B01": {
    "vocabulary": [
      {
        "content": "わたし",
        "audio": "/audio/n5/lesson-1/watashi.mp3"
      },
      {
        "content": "あなた", 
        "audio": "/audio/n5/lesson-1/anata.mp3"
      },
      {
        "content": "あのひと",
        "audio": "/audio/n5/lesson-1/anohito.mp3"
      },
      {
        "content": "せんせい",
        "audio": "/audio/n5/lesson-1/sensei.mp3"
      },
      {
        "content": "がくせい",
        "audio": "/audio/n5/lesson-1/gakusei.mp3"
      },
      {
        "content": "かいしゃいん",
        "audio": "/audio/n5/lesson-1/kaishain.mp3"
      },
      {
        "content": "だいがく",
        "audio": "/audio/n5/lesson-1/daigaku.mp3"
      },
      {
        "content": "びょういん",
        "audio": "/audio/n5/lesson-1/byouin.mp3"
      },
      {
        "content": "でんき",
        "audio": "/audio/n5/lesson-1/denki.mp3"
      },
      {
        "content": "だれ",
        "audio": "/audio/n5/lesson-1/dare.mp3"
      }
    ],
    "lesson_audio": "/audio/n5/lesson-1/lesson-b01.mp3"
  },
  "B02": {
    "vocabulary": [
      {
        "content": "これ",
        "audio": "/audio/n5/lesson-2/kore.mp3"
      },
      {
        "content": "それ",
        "audio": "/audio/n5/lesson-2/sore.mp3"
      },
      {
        "content": "あれ",
        "audio": "/audio/n5/lesson-2/are.mp3"
      },
      {
        "content": "この",
        "audio": "/audio/n5/lesson-2/kono.mp3"
      },
      {
        "content": "その",
        "audio": "/audio/n5/lesson-2/sono.mp3"
      },
      {
        "content": "あの",
        "audio": "/audio/n5/lesson-2/ano.mp3"
      },
      {
        "content": "ここ",
        "audio": "/audio/n5/lesson-2/koko.mp3"
      },
      {
        "content": "そこ",
        "audio": "/audio/n5/lesson-2/soko.mp3"
      },
      {
        "content": "あそこ",
        "audio": "/audio/n5/lesson-2/asoko.mp3"
      },
      {
        "content": "どこ",
        "audio": "/audio/n5/lesson-2/doko.mp3"
      }
    ],
    "lesson_audio": "/audio/n5/lesson-2/lesson-b02.mp3"
  },
  "B03": {
    "vocabulary": [
      {
        "content": "いち",
        "audio": "/audio/n5/lesson-3/ichi.mp3"
      },
      {
        "content": "に",
        "audio": "/audio/n5/lesson-3/ni.mp3"
      },
      {
        "content": "さん",
        "audio": "/audio/n5/lesson-3/san.mp3"
      },
      {
        "content": "よん",
        "audio": "/audio/n5/lesson-3/yon.mp3"
      },
      {
        "content": "ご",
        "audio": "/audio/n5/lesson-3/go.mp3"
      },
      {
        "content": "ろく",
        "audio": "/audio/n5/lesson-3/roku.mp3"
      },
      {
        "content": "なな",
        "audio": "/audio/n5/lesson-3/nana.mp3"
      },
      {
        "content": "はち",
        "audio": "/audio/n5/lesson-3/hachi.mp3"
      },
      {
        "content": "きゅう",
        "audio": "/audio/n5/lesson-3/kyuu.mp3"
      },
      {
        "content": "じゅう",
        "audio": "/audio/n5/lesson-3/juu.mp3"
      }
    ],
    "lesson_audio": "/audio/n5/lesson-3/lesson-b03.mp3"
  }
};

// Function to update lesson data with audio
function updateLessonWithAudio(lessonId, lessonData) {
  const audioInfo = audioData[lessonId];
  if (!audioInfo) return lessonData;

  // Update vocabulary with audio
  if (lessonData.vocabulary && audioInfo.vocabulary) {
    lessonData.vocabulary = lessonData.vocabulary.map(vocab => {
      const audioItem = audioInfo.vocabulary.find(a => a.content === vocab.content);
      return {
        ...vocab,
        audio: audioItem ? audioItem.audio : null
      };
    });
  }

  // Add lesson audio
  if (audioInfo.lesson_audio) {
    lessonData.lesson_audio = audioInfo.lesson_audio;
  }

  return lessonData;
}

// Function to generate audio data file
function generateAudioDataFile() {
  const audioDataPath = path.join(__dirname, '../src/data/audio-data.json');
  
  try {
    fs.writeFileSync(audioDataPath, JSON.stringify(audioData, null, 2));
    console.log('✅ Audio data file generated successfully!');
    console.log(`📁 Location: ${audioDataPath}`);
  } catch (error) {
    console.error('❌ Error generating audio data file:', error);
  }
}

// Function to create audio directory structure
function createAudioDirectories() {
  const audioBasePath = path.join(__dirname, '../public/audio');
  const n5Path = path.join(audioBasePath, 'n5');
  
  try {
    // Create base audio directory
    if (!fs.existsSync(audioBasePath)) {
      fs.mkdirSync(audioBasePath, { recursive: true });
    }
    
    // Create N5 directory
    if (!fs.existsSync(n5Path)) {
      fs.mkdirSync(n5Path, { recursive: true });
    }
    
    // Create lesson directories
    for (let i = 1; i <= 10; i++) {
      const lessonPath = path.join(n5Path, `lesson-${i}`);
      if (!fs.existsSync(lessonPath)) {
        fs.mkdirSync(lessonPath, { recursive: true });
      }
    }
    
    console.log('✅ Audio directories created successfully!');
  } catch (error) {
    console.error('❌ Error creating audio directories:', error);
  }
}

// Function to generate placeholder audio files info
function generateAudioPlaceholders() {
  const placeholderInfo = [];
  
  Object.keys(audioData).forEach(lessonId => {
    const lessonAudio = audioData[lessonId];
    
    // Add lesson audio
    if (lessonAudio.lesson_audio) {
      placeholderInfo.push({
        path: lessonAudio.lesson_audio,
        description: `Lesson ${lessonId} audio`,
        duration: '2-3 minutes'
      });
    }
    
    // Add vocabulary audio
    lessonAudio.vocabulary.forEach(vocab => {
      placeholderInfo.push({
        path: vocab.audio,
        description: `Pronunciation: ${vocab.content}`,
        duration: '1-2 seconds'
      });
    });
  });
  
  const placeholderPath = path.join(__dirname, '../src/data/audio-placeholders.json');
  
  try {
    fs.writeFileSync(placeholderPath, JSON.stringify(placeholderInfo, null, 2));
    console.log('✅ Audio placeholders file generated!');
    console.log(`📁 Location: ${placeholderPath}`);
  } catch (error) {
    console.error('❌ Error generating audio placeholders:', error);
  }
}

// Main execution
console.log('🎵 Generating Audio Data for N5 Lessons...\n');

createAudioDirectories();
generateAudioDataFile();
generateAudioPlaceholders();

console.log('\n🎉 Audio data generation completed!');
console.log('\n📋 Next steps:');
console.log('1. Add actual audio files to /public/audio/n5/');
console.log('2. Update lesson data with audio integration');
console.log('3. Test audio playback in lesson player');