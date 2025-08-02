'use client';

import React from 'react';
import { SharedCard, ResponsiveGrid, cn, styles } from './SharedUtils';
import { ComponentLoader } from '../LazyComponents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaBookOpen, 
  FaTrophy, 
  FaClock, 
  FaBell, 
  FaUser,
  FaChartLine,
  FaCalendarAlt,
  FaPlay,
  FaGraduationCap,
  FaRocket,
  FaFire,
  FaBullseye
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// 🎯 WELCOME HERO SECTION
export function DashboardHero({ 
  userName = "Student",
  streak = 5,
  totalPoints = 1250
}: {
  userName?: string;
  streak?: number;
  totalPoints?: number;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userName}! 👋
            </h1>
            <p className="text-white/80 text-lg">
              Ready to continue your learning journey?
            </p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2 text-2xl font-bold mb-1">
              <FaFire className="text-orange-400" />
              {streak} day streak
            </div>
            <div className="text-white/80">
              {totalPoints.toLocaleString()} total points
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <ResponsiveGrid cols={{ mobile: 2, tablet: 4, desktop: 4 }} gap="gap-4">
          <StatCard icon={FaBookOpen} label="Lessons" value="23" color="emerald" />
          <StatCard icon={FaTrophy} label="Achievements" value="12" color="yellow" />
          <StatCard icon={FaClock} label="Study Time" value="45h" color="blue" />
          <StatCard icon={FaBullseye} label="Accuracy" value="87%" color="purple" />
        </ResponsiveGrid>
      </div>
    </div>
  );
}

// 📊 QUICK STAT CARD
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  color: string;
}) {
  const colorClasses = {
    emerald: "bg-emerald-500/20 text-emerald-300",
    yellow: "bg-yellow-500/20 text-yellow-300",
    blue: "bg-blue-500/20 text-blue-300",
    purple: "bg-purple-500/20 text-purple-300"
  };

  return (
    <div className={cn(
      "p-4 rounded-xl backdrop-blur-sm border border-white/20",
      colorClasses[color as keyof typeof colorClasses]
    )}>
      <div className="flex items-center gap-3">
        <Icon className="text-2xl" />
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm opacity-80">{label}</div>
        </div>
      </div>
    </div>
  );
}

// 📚 LEARNING PROGRESS WIDGET
export function LearningProgressWidget() {
  const currentLessons = [
    { id: 1, title: "Basic Greetings", progress: 85, language: "Japanese" },
    { id: 2, title: "Numbers 1-100", progress: 60, language: "Japanese" },
    { id: 3, title: "Daily Conversations", progress: 30, language: "Japanese" }
  ];

  return (
    <SharedCard className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaRocket className="text-blue-500" />
          Continue Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentLessons.map((lesson) => (
          <div key={lesson.id} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium group-hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h4>
                <p className="text-sm text-gray-500">{lesson.language}</p>
              </div>
              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <FaPlay />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Progress value={lesson.progress} className="flex-1" />
              <span className="text-sm text-gray-600">{lesson.progress}%</span>
            </div>
          </div>
        ))}
        
        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <FaBookOpen className="mr-2" />
          Browse All Lessons
        </Button>
      </CardContent>
    </SharedCard>
  );
}

// 🎯 DAILY GOALS WIDGET
export function DailyGoalsWidget() {
  const goals = [
    { id: 1, title: "Complete 3 lessons", current: 2, target: 3, type: "lessons" },
    { id: 2, title: "Study for 30 minutes", current: 18, target: 30, type: "minutes" },
    { id: 3, title: "Practice pronunciation", current: 0, target: 1, type: "sessions" }
  ];

  return (
    <SharedCard className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaBullseye className="text-green-500" />
          Today's Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const isComplete = goal.current >= goal.target;
          
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={cn(
                  "font-medium",
                  isComplete ? "text-green-600" : "text-gray-700"
                )}>
                  {goal.title}
                </span>
                {isComplete && <Badge className="bg-green-500">Complete!</Badge>}
              </div>
              <div className="flex items-center gap-3">
                <Progress 
                  value={progress} 
                  className={cn(
                    "flex-1",
                    isComplete && "bg-green-100"
                  )}
                />
                <span className="text-sm text-gray-600">
                  {goal.current}/{goal.target}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </SharedCard>
  );
}

// 🏆 ACHIEVEMENTS WIDGET
export function AchievementsWidget() {
  const recentAchievements = [
    { id: 1, title: "First Lesson", description: "Completed your first lesson", date: "Today", icon: "🎯" },
    { id: 2, title: "Week Warrior", description: "7-day learning streak", date: "Yesterday", icon: "🔥" },
    { id: 3, title: "Vocab Master", description: "Learned 50 new words", date: "2 days ago", icon: "📚" }
  ];

  return (
    <SharedCard className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentAchievements.map((achievement) => (
          <div key={achievement.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-2xl">{achievement.icon}</span>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
              <span className="text-xs text-gray-500">{achievement.date}</span>
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          View All Achievements
        </Button>
      </CardContent>
    </SharedCard>
  );
}

// 📅 UPCOMING SCHEDULE WIDGET
export function UpcomingScheduleWidget() {
  const upcomingEvents = [
    { id: 1, title: "Grammar Review Session", time: "2:00 PM", type: "lesson" },
    { id: 2, title: "Speaking Practice with AI", time: "4:30 PM", type: "practice" },
    { id: 3, title: "Weekly Assessment", time: "Tomorrow 10:00 AM", type: "test" }
  ];

  return (
    <SharedCard className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FaCalendarAlt className="text-purple-500" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event) => {
          const typeColors = {
            lesson: "bg-blue-100 text-blue-700",
            practice: "bg-green-100 text-green-700", 
            test: "bg-orange-100 text-orange-700"
          };
          
          return (
            <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.time}</p>
              </div>
              <Badge className={typeColors[event.type as keyof typeof typeColors]}>
                {event.type}
              </Badge>
            </div>
          );
        })}
        
        <Button variant="outline" className="w-full">
          <FaCalendarAlt className="mr-2" />
          View Full Calendar
        </Button>
      </CardContent>
    </SharedCard>
  );
}

// 🤖 AI COACH WIDGET
export function AICoachWidget() {
  const suggestions = [
    "Practice more listening exercises to improve comprehension",
    "Review yesterday's vocabulary before starting new lessons",
    "Your strongest skill is reading - try some advanced texts!"
  ];

  return (
    <SharedCard className="h-full border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <HiSparkles className="text-2xl" />
          AI Learning Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm text-gray-700">{suggestion}</p>
          </div>
        ))}
        
        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          Get Personalized Study Plan
        </Button>
      </CardContent>
    </SharedCard>
  );
}