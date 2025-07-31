'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  BookOpen, 
  Zap, 
  Trophy, 
  Target,
  Play,
  Star,
  Clock,
  Brain,
  Globe,
  Award,
  Flame,
  CheckCircle,
  Calendar
} from 'lucide-react'

// Mock data cho demo - trong thực tế sẽ lấy từ API
const mockLearningData = {
  user: {
    name: "Nguyễn Văn A",
    level: 12,
    totalXP: 2450,
    currentStreak: 7,
    longestStreak: 15,
    gems: 250,
    targetLanguage: "English"
  },
  dailyProgress: {
    goal: 30, // minutes
    completed: 18,
    xpEarned: 85,
    lessonsCompleted: 3
  },
  courses: [
    {
      id: 1,
      language: "English",
      level: "Beginner",
      title: "English Fundamentals",
      progress: 65,
      unitsCompleted: 4,
      totalUnits: 8,
      color: "#3B82F6",
      thumbnail: "🇺🇸"
    },
    {
      id: 2,
      language: "Japanese",
      level: "Beginner", 
      title: "Japanese Basics",
      progress: 25,
      unitsCompleted: 1,
      totalUnits: 6,
      color: "#EF4444",
      thumbnail: "🇯🇵"
    },
    {
      id: 3,
      language: "Korean",
      level: "Beginner",
      title: "Korean Starter",
      progress: 5,
      unitsCompleted: 0,
      totalUnits: 5,
      color: "#8B5CF6",
      thumbnail: "🇰🇷"
    }
  ],
  recentLessons: [
    { id: 1, title: "Past Tense Verbs", type: "Grammar", xp: 25, completed: true },
    { id: 2, title: "Food Vocabulary", type: "Vocabulary", xp: 20, completed: true },
    { id: 3, title: "Conversation Practice", type: "Speaking", xp: 30, completed: true },
    { id: 4, title: "Reading Comprehension", type: "Reading", xp: 35, completed: false }
  ],
  achievements: [
    { id: 1, name: "First Steps", icon: "👶", unlocked: true },
    { id: 2, name: "Week Warrior", icon: "🔥", unlocked: true },
    { id: 3, name: "Vocabulary Master", icon: "📚", unlocked: false },
    { id: 4, name: "Perfect Week", icon: "⭐", unlocked: false }
  ],
  vocabularyReview: {
    dueCount: 12,
    newCount: 8,
    accuracy: 85
  }
}

const LESSON_TYPE_COLORS = {
  Grammar: "#3B82F6",
  Vocabulary: "#10B981", 
  Speaking: "#F59E0B",
  Reading: "#8B5CF6",
  Listening: "#EF4444",
  Writing: "#06B6D4"
}

export default function LanguageLearningDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(mockLearningData)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading your learning dashboard...</p>
          <p className="text-sm text-gray-500">Preparing your personalized experience 🚀</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                🌟 CaiTienWebTT
              </h1>
              <div className="hidden md:flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-700">{data.user.currentStreak} day streak!</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">{data.user.gems} gems</span>
              </div>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {data.user.name}! 👋
          </h2>
          <p className="text-gray-600">Ready to continue your {data.user.targetLanguage} learning journey?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-indigo-100">Level & XP</CardTitle>
              <Trophy className="h-4 w-4 text-indigo-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level {data.user.level}</div>
              <p className="text-xs text-indigo-200 flex items-center mt-1">
                <Star className="h-3 w-3 mr-1" />
                {data.user.totalXP} total XP
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.user.currentStreak} days</div>
              <p className="text-xs text-orange-200 flex items-center mt-1">
                <Target className="h-3 w-3 mr-1" />
                Best: {data.user.longestStreak} days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Today's Progress</CardTitle>
              <Clock className="h-4 w-4 text-green-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.dailyProgress.completed}min</div>
              <p className="text-xs text-green-200 flex items-center mt-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                Goal: {data.dailyProgress.goal}min
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Vocabulary</CardTitle>
              <Brain className="h-4 w-4 text-purple-200" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.vocabularyReview.dueCount}</div>
              <p className="text-xs text-purple-200 flex items-center mt-1">
                <Award className="h-3 w-3 mr-1" />
                Due for review
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Goal Progress */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Daily Goal Progress
                </CardTitle>
                <CardDescription>
                  {data.dailyProgress.completed}/{data.dailyProgress.goal} minutes completed today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={(data.dailyProgress.completed / data.dailyProgress.goal) * 100} className="h-4" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{data.dailyProgress.xpEarned}</div>
                      <div className="text-xs text-gray-500">XP Earned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{data.dailyProgress.lessonsCompleted}</div>
                      <div className="text-xs text-gray-500">Lessons Done</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{Math.round((data.dailyProgress.completed / data.dailyProgress.goal) * 100)}%</div>
                      <div className="text-xs text-gray-500">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Progress */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                  Your Courses
                </CardTitle>
                <CardDescription>Continue learning your favorite languages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.courses.map((course) => (
                  <div key={course.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{course.thumbnail}</div>
                        <div>
                          <h4 className="font-semibold">{course.title}</h4>
                          <p className="text-sm text-gray-500">{course.level} • {course.unitsCompleted}/{course.totalUnits} units</p>
                        </div>
                      </div>
                      <Button size="sm" style={{ backgroundColor: course.color }}>
                        <Play className="h-3 w-3 mr-1" />
                        Continue
                      </Button>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{course.progress}% complete</span>
                      <span>{course.totalUnits - course.unitsCompleted} units remaining</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vocabulary Review */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-600" />
                  Vocabulary Review
                </CardTitle>
                <CardDescription>Spaced repetition system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-red-700">{data.vocabularyReview.dueCount} Due</div>
                    <div className="text-xs text-red-600">Ready for review</div>
                  </div>
                  <Button size="sm" variant="destructive">Review</Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-blue-700">{data.vocabularyReview.newCount} New</div>
                    <div className="text-xs text-blue-600">Learn today</div>
                  </div>
                  <Button size="sm" className="bg-blue-600">Learn</Button>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">{data.vocabularyReview.accuracy}%</div>
                  <div className="text-xs text-gray-600">Accuracy Rate</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Lessons */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.recentLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      {lesson.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{lesson.title}</div>
                        <div className="text-xs text-gray-500">{lesson.type}</div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold" style={{ color: LESSON_TYPE_COLORS[lesson.type as keyof typeof LESSON_TYPE_COLORS] }}>
                      +{lesson.xp} XP
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {data.achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-2 rounded-lg text-center ${
                        achievement.unlocked 
                          ? 'bg-yellow-100 border border-yellow-300' 
                          : 'bg-gray-100 border border-gray-200 opacity-50'
                      }`}
                    >
                      <div className="text-lg">{achievement.icon}</div>
                      <div className="text-xs font-medium mt-1">{achievement.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
