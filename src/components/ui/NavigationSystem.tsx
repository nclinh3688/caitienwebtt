'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SharedCard, cn, styles } from './SharedUtils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaHome,
  FaBookOpen, 
  FaUsers, 
  FaClipboardList,
  FaUser,
  FaChartLine,
  FaGraduationCap,
  FaHeadphones,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaLock,
  FaStar,
  FaPlay,
  FaFlag
} from 'react-icons/fa';

// 🧭 MAIN NAVIGATION COMPONENT
export function SmartNavigation({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  
  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      href: '/dashboard', 
      icon: FaHome,
      description: 'Your learning overview'
    },
    { 
      id: 'courses', 
      label: 'Courses', 
      href: '/courses', 
      icon: FaBookOpen,
      description: 'Language lessons & materials'
    },
    { 
      id: 'listening', 
      label: 'Listening', 
      href: '/listening', 
      icon: FaHeadphones,
      description: 'Audio practice & conversations'
    },
    { 
      id: 'test', 
      label: 'Tests', 
      href: '/test', 
      icon: FaClipboardList,
      description: 'Assessments & practice quizzes'
    },
    { 
      id: 'community', 
      label: 'Community', 
      href: '/community', 
      icon: FaUsers,
      description: 'Connect with other learners'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      href: '/profile', 
      icon: FaUser,
      description: 'Your achievements & settings'
    }
  ];

  return (
    <nav className={cn("bg-white border-b border-gray-200 sticky top-0 z-50", className)}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <FaGraduationCap />
            PHÚC KHIÊM EDU
          </Link>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group",
                    isActive 
                      ? "bg-blue-100 text-blue-700 font-medium" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "text-sm transition-colors",
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Profile Quick Access */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FaChartLine className="mr-1" />
              Progress
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// 🗺️ LEARNING PATH BREADCRUMB
export function LearningBreadcrumb({ 
  path = [],
  currentProgress = 0 
}: { 
  path?: Array<{label: string; href?: string; completed?: boolean}>;
  currentProgress?: number;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Learning Path</h3>
        <Badge variant="outline">{currentProgress}% Complete</Badge>
      </div>
      
      <div className="flex items-center gap-2 overflow-x-auto">
        {path.map((step, index) => (
          <React.Fragment key={index}>
            <div className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all",
              step.completed 
                ? "bg-green-100 text-green-700"
                : index === path.length - 1
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            )}>
              {step.completed && <FaCheck className="text-xs" />}
              {step.href ? (
                <Link href={step.href} className="text-sm font-medium hover:underline">
                  {step.label}
                </Link>
              ) : (
                <span className="text-sm font-medium">{step.label}</span>
              )}
            </div>
            {index < path.length - 1 && (
              <FaArrowRight className="text-gray-400 text-xs flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-3">
        <Progress value={currentProgress} className="h-2" />
      </div>
    </div>
  );
}

// ➡️ LESSON NAVIGATION (Previous/Next)
export function LessonNavigation({ 
  previousLesson,
  nextLesson,
  currentLessonProgress = 0,
  onComplete
}: {
  previousLesson?: { title: string; href: string };
  nextLesson?: { title: string; href: string; locked?: boolean };
  currentLessonProgress?: number;
  onComplete?: () => void;
}) {
  const isCurrentComplete = currentLessonProgress >= 100;
  
  return (
    <div className="flex flex-col gap-4 mt-8 p-6 bg-gray-50 rounded-xl">
      {/* Current Lesson Progress */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-sm text-gray-600">Lesson Progress</span>
          <Badge variant={isCurrentComplete ? "default" : "outline"}>
            {currentLessonProgress}%
          </Badge>
        </div>
        <Progress value={currentLessonProgress} className="mb-4" />
        
        {!isCurrentComplete && onComplete && (
          <Button 
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <FaCheck className="mr-2" />
            Mark as Complete
          </Button>
        )}
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        {/* Previous Lesson */}
        {previousLesson ? (
          <Link 
            href={previousLesson.href}
            className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors flex-1 mr-2"
          >
            <FaArrowLeft className="text-gray-400" />
            <div className="text-left">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Previous</div>
              <div className="font-medium text-gray-900">{previousLesson.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1 mr-2" />
        )}
        
        {/* Next Lesson */}
        {nextLesson ? (
          <Link 
            href={nextLesson.href}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg transition-colors flex-1 ml-2",
              nextLesson.locked 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-50 text-gray-900"
            )}
          >
            <div className="text-right flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Next</div>
              <div className="font-medium flex items-center justify-end gap-2">
                {nextLesson.locked && <FaLock className="text-xs" />}
                {nextLesson.title}
              </div>
            </div>
            <FaArrowRight className={nextLesson.locked ? "text-gray-400" : "text-blue-500"} />
          </Link>
        ) : (
          <div className="flex-1 ml-2" />
        )}
      </div>
    </div>
  );
}

// 🎯 QUICK ACTION PANEL
export function QuickActionPanel() {
  const quickActions = [
    { 
      label: 'Continue Learning', 
      href: '/courses/japanese/n5/lesson-2', 
      icon: FaPlay,
      color: 'blue',
      description: 'Resume your current lesson'
    },
    { 
      label: 'Take Practice Test', 
      href: '/test/mini', 
      icon: FaClipboardList,
      color: 'green',
      description: 'Quick 5-minute quiz'
    },
    { 
      label: 'Join Discussion', 
      href: '/community', 
      icon: FaUsers,
      color: 'purple',
      description: 'Connect with learners'
    },
    { 
      label: 'Check Progress', 
      href: '/profile', 
      icon: FaChartLine,
      color: 'orange',
      description: 'View your achievements'
    }
  ];

  return (
    <SharedCard className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FaFlag className="text-blue-500" />
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action, index) => {
          const colorClasses = {
            blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
            green: "bg-green-100 text-green-700 hover:bg-green-200",
            purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
            orange: "bg-orange-100 text-orange-700 hover:bg-orange-200"
          };
          
          return (
            <Link
              key={index}
              href={action.href}
              className={cn(
                "p-4 rounded-lg transition-all duration-200 hover:scale-105",
                colorClasses[action.color as keyof typeof colorClasses]
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <action.icon className="text-lg" />
                <span className="font-medium">{action.label}</span>
              </div>
              <p className="text-xs opacity-80">{action.description}</p>
            </Link>
          );
        })}
      </div>
    </SharedCard>
  );
}

// 📱 MOBILE NAVIGATION
export function MobileNavigation() {
  const pathname = usePathname();
  
  const mobileNavItems = [
    { id: 'dashboard', label: 'Home', href: '/dashboard', icon: FaHome },
    { id: 'courses', label: 'Learn', href: '/courses', icon: FaBookOpen },
    { id: 'test', label: 'Test', href: '/test', icon: FaClipboardList },
    { id: 'community', label: 'Community', href: '/community', icon: FaUsers },
    { id: 'profile', label: 'Profile', href: '/profile', icon: FaUser }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="grid grid-cols-5 h-16">
        {mobileNavItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center transition-colors",
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              <item.icon className="text-lg mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}