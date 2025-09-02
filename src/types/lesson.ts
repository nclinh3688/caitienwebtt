export interface LessonOverview {
  lessonNumber: number;
  japaneseTitle: string;
  vietnameseTitle: string;
  summary: string | { title: string; content: string; keyPoints: string[]; };
  estimatedTime: string;
  difficulty: string;
}