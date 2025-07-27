import fs from 'fs';
import path from 'path';

const audioDir = path.join(__dirname, '../public/audio');
const outputDataFile = path.join(__dirname, '../src/data/listening/kaiwa-lessons.json');

function getLessonNumberFromFileName(fileName) {
  const match = fileName.match(/第(\d+)課/);
  return match ? parseInt(match[1], 10) : null;
}

const audioData = [];

fs.readdirSync(audioDir).forEach(folder => {
  const folderPath = path.join(audioDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    const levelMatch = folder.match(/N(\d+)/);
    const level = levelMatch ? `N${levelMatch[1]}` : 'Unknown Level';

    const lessons = fs.readdirSync(folderPath)
      .filter(file => file.endsWith('.mp3') && !file.startsWith('__'))
      .map(file => {
        const lessonNumber = getLessonNumberFromFileName(file);
        if (lessonNumber === null) return null;

        return {
          id: lessonNumber,
          title: `Bài ${lessonNumber}`,
          url: `/audio/${folder}/${file}`,
          level: level
        };
      })
      .filter(lesson => lesson !== null)
      .sort((a, b) => a.id - b.id);

    audioData.push(...lessons);
  }
});

fs.writeFileSync(outputDataFile, JSON.stringify(audioData, null, 2));

console.log(`Successfully generated audio data at ${outputDataFile}`);