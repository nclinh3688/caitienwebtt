// Progress tracking utility functions

export interface LessonProgress {
  lessonId: number;
  completed: boolean;
  completedAt?: string;
  timeSpent: number; // in seconds
  lastPosition: number; // last audio position in seconds
  playCount: number;
}

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  totalTimeSpent: number;
  completionRate: number;
  favoriteLevel?: string;
}

const PROGRESS_STORAGE_KEY = 'listening_progress';

// Get all lesson progress from localStorage
export function getAllProgress(): Record<number, LessonProgress> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
}

// Save lesson progress to localStorage
export function saveProgress(progress: Record<number, LessonProgress>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

// Get progress for a specific lesson
export function getLessonProgress(lessonId: number): LessonProgress {
  const allProgress = getAllProgress();
  return allProgress[lessonId] || {
    lessonId,
    completed: false,
    timeSpent: 0,
    lastPosition: 0,
    playCount: 0,
  };
}

// Update progress for a specific lesson
export function updateLessonProgress(
  lessonId: number, 
  updates: Partial<LessonProgress>
): void {
  const allProgress = getAllProgress();
  const currentProgress = getLessonProgress(lessonId);
  
  allProgress[lessonId] = {
    ...currentProgress,
    ...updates,
    lessonId,
  };
  
  saveProgress(allProgress);
}

// Mark lesson as completed
export function markLessonCompleted(lessonId: number): void {
  updateLessonProgress(lessonId, {
    completed: true,
    completedAt: new Date().toISOString(),
  });
}

// Increment play count
export function incrementPlayCount(lessonId: number): void {
  const progress = getLessonProgress(lessonId);
  updateLessonProgress(lessonId, {
    playCount: progress.playCount + 1,
  });
}

// Update time spent on lesson
export function updateTimeSpent(lessonId: number, additionalSeconds: number): void {
  const progress = getLessonProgress(lessonId);
  updateLessonProgress(lessonId, {
    timeSpent: progress.timeSpent + additionalSeconds,
  });
}

// Update last audio position
export function updateLastPosition(lessonId: number, position: number): void {
  updateLessonProgress(lessonId, {
    lastPosition: position,
  });
}

// Calculate overall statistics
export function getProgressStats(lessons: any[]): ProgressStats {
  const allProgress = getAllProgress();
  const completedLessons = Object.values(allProgress).filter(p => p.completed).length;
  const totalTimeSpent = Object.values(allProgress).reduce((total, p) => total + p.timeSpent, 0);
  
  // Find favorite level (most completed lessons)
  const levelCounts: Record<string, number> = {};
  lessons.forEach(lesson => {
    const progress = allProgress[lesson.id];
    if (progress?.completed) {
      levelCounts[lesson.level] = (levelCounts[lesson.level] || 0) + 1;
    }
  });
  
  const levelEntries = Object.entries(levelCounts);
  const favoriteLevel = levelEntries.length > 0 
    ? levelEntries.reduce((a, b) => levelCounts[a[0]] > levelCounts[b[0]] ? a : b)[0]
    : undefined;
  
  return {
    totalLessons: lessons.length,
    completedLessons,
    totalTimeSpent,
    completionRate: lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0,
    favoriteLevel,
  };
}

// Clear all progress (for testing or reset)
export function clearAllProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROGRESS_STORAGE_KEY);
}

// Format time in human readable format
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
}

// Get completion percentage for a lesson based on audio progress
export function getLessonCompletionPercentage(lessonId: number, duration: number): number {
  const progress = getLessonProgress(lessonId);
  if (progress.completed) return 100;
  if (duration <= 0) return 0;
  
  return Math.round((progress.lastPosition / duration) * 100);
}