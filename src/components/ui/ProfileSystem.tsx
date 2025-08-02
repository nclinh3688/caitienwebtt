'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InteractiveCard, AnimatedProgressRing } from '@/components/ui/MicroInteractions';
import { GlassCard, AnimatedSection, GradientText, AnimatedCounter } from '@/components/ui/MagicEffects';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaCamera,
  FaEdit,
  FaBook,
  FaBookmark,
  FaTrophy,
  FaStar,
  FaCog,
  FaRobot,
  FaChartLine,
  FaLightbulb,
  FaDownload,
  FaShare,
  FaGraduationCap,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaArrowRight,
  FaFire,
  FaHeart,
  FaCrown,
  FaMedal,
  FaRocket
} from 'react-icons/fa';

// 👤 Premium Profile Hero Section
export function ProfileHero({ 
  profileData, 
  isEditing, 
  onEdit 
}: {
  profileData: any;
  isEditing: boolean;
  onEdit: () => void;
}) {
  const stats = [
    { label: 'Courses', value: profileData.learning?.enrolledCourses?.length || 0, icon: FaBook },
    { label: 'Certificates', value: profileData.achievements?.certificates?.length || 0, icon: FaTrophy },
    { label: 'Tests Passed', value: profileData.achievements?.scores?.length || 0, icon: FaCheckCircle },
    { label: 'Study Days', value: '45', icon: FaFire } // Mock data
  ];

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float floating-delayed" />
      </div>

      <div className="relative z-10 p-8 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
                  {profileData.basic.avatar ? (
                    <img src={profileData.basic.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="w-12 h-12 text-white/80" />
                  )}
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <FaCamera className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="mt-4 text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-2">
                  {profileData.basic.name || 'Anonymous User'}
                </h1>
                <p className="text-white/80 mb-2">{profileData.basic.email}</p>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <FaCalendarAlt />
                  <span>Joined {new Date(profileData.basic.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <GlassCard key={index} className="p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <AnimatedCounter 
                    value={stat.value} 
                    className="text-2xl font-bold text-white mb-1" 
                  />
                  <div className="text-sm text-white/80">{stat.label}</div>
                </GlassCard>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={onEdit}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                variant="outline"
              >
                <FaEdit className="mr-2" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
              <Button
                className="bg-white text-blue-600 hover:bg-white/90"
                size="sm"
              >
                <FaShare className="mr-2" />
                Share Profile
              </Button>
            </div>
          </div>

          {/* Bio Section */}
          {profileData.basic.bio && (
            <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-white/90 leading-relaxed">
                {profileData.basic.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 📚 Premium Learning Section
export function PremiumLearningSection({ learningData }: { learningData: any }) {
  return (
    <div className="space-y-6">
      {/* Enrolled Courses */}
      <AnimatedSection>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaBook className="text-blue-500" />
            Enrolled Courses
            <Badge variant="secondary" className="ml-2">
              {learningData.enrolledCourses?.length || 0}
            </Badge>
          </h3>
          <p className="text-gray-600">Your active learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningData.enrolledCourses?.map((course: any, index: number) => (
            <div key={course.id} style={{ animationDelay: `${index * 100}ms` }}>
              <InteractiveCard hoverEffect="lift" glowColor="blue">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-2">
                        {course.name}
                      </h4>
                      <Badge variant="outline" className="mb-3">
                        {course.language}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {course.progress}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {course.completedLessons}/{course.totalLessons}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Progress value={course.progress} className="h-2" />
                      <div className="absolute -top-1 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        Started {new Date(course.startDate).toLocaleDateString()}
                      </span>
                      {course.estimatedCompletion && (
                        <span className="flex items-center gap-1">
                          <FaClock />
                          Est. {new Date(course.estimatedCompletion).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      Continue Learning
                      <FaArrowRight className="ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </InteractiveCard>
            </div>
          )) || (
            <div className="col-span-full text-center py-12">
              <FaBook className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No Enrolled Courses</h4>
              <p className="text-gray-500 mb-4">Start your learning journey today!</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                <FaRocket className="mr-2" />
                Browse Courses
              </Button>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Saved Lessons */}
      <AnimatedSection>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaBookmark className="text-purple-500" />
            Saved Lessons
            <Badge variant="secondary" className="ml-2">
              {learningData.savedLessons?.length || 0}
            </Badge>
          </h3>
          <p className="text-gray-600">Lessons bookmarked for later review</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {learningData.savedLessons?.slice(0, 6).map((lesson: any, index: number) => (
            <InteractiveCard 
              key={lesson.id} 
              hoverEffect="scale"
              className="group cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {lesson.title}
                    </h5>
                    <p className="text-sm text-gray-600 mt-1">{lesson.course}</p>
                    <div className="flex gap-1 mt-2">
                      {lesson.tags?.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(lesson.savedDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          )) || (
            <div className="col-span-full text-center py-8">
              <FaBookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No saved lessons yet</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

// 🏆 Premium Achievements Section
export function PremiumAchievementsSection({ achievementsData }: { achievementsData: any }) {
  return (
    <div className="space-y-8">
      {/* Certificates */}
      <AnimatedSection>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaGraduationCap className="text-yellow-500" />
            Certificates
            <Badge variant="secondary" className="ml-2">
              {achievementsData.certificates?.length || 0}
            </Badge>
          </h3>
          <p className="text-gray-600">Your earned certifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.certificates?.map((cert: any, index: number) => (
            <InteractiveCard 
              key={cert.id}
              hoverEffect="glow"
              glowColor="yellow"
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <FaGraduationCap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">
                  {cert.name}
                </h4>
                {cert.description && (
                  <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                )}
                <div className="text-xs text-gray-500 mb-4">
                  Issued {new Date(cert.issuedAt).toLocaleDateString()}
                </div>
                <Button size="sm" variant="outline" className="group-hover:bg-yellow-50">
                  <FaDownload className="mr-2" />
                  Download
                </Button>
              </CardContent>
            </InteractiveCard>
          )) || (
            <div className="col-span-full text-center py-12">
              <FaGraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No Certificates Yet</h4>
              <p className="text-gray-500">Complete courses to earn certificates!</p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Badges */}
      <AnimatedSection>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaMedal className="text-purple-500" />
            Badges & Achievements
            <Badge variant="secondary" className="ml-2">
              {achievementsData.badges?.length || 0}
            </Badge>
          </h3>
          <p className="text-gray-600">Special accomplishments and milestones</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {achievementsData.badges?.map((badge: any, index: number) => (
            <InteractiveCard 
              key={badge.id}
              hoverEffect="lift"
              className="group text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">{badge.icon}</span>
                </div>
                <h5 className="font-medium text-sm text-gray-900 mb-1">
                  {badge.name}
                </h5>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                <div className="text-xs text-gray-500">
                  {new Date(badge.earnedDate).toLocaleDateString()}
                </div>
              </CardContent>
            </InteractiveCard>
          )) || (
            <div className="col-span-full text-center py-12">
              <FaMedal className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No Badges Yet</h4>
              <p className="text-gray-500">Keep learning to unlock achievements!</p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Test Scores */}
      <AnimatedSection>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaChartLine className="text-green-500" />
            Test Results
            <Badge variant="secondary" className="ml-2">
              {achievementsData.scores?.length || 0}
            </Badge>
          </h3>
          <p className="text-gray-600">Your test performance history</p>
        </div>

        <div className="space-y-4">
          {achievementsData.scores?.slice(0, 5).map((score: any, index: number) => (
            <InteractiveCard 
              key={score.id}
              hoverEffect="lift"
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <FaChartLine className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{score.testName}</h4>
                      <p className="text-sm text-gray-600">
                        {score.correctAnswers}/{score.totalQuestions} correct answers
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(score.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">
                      {score.score}%
                    </div>
                    <Badge 
                      variant={score.score >= 80 ? "default" : score.score >= 60 ? "secondary" : "destructive"}
                      className="mt-1"
                    >
                      {score.score >= 80 ? "Excellent" : score.score >= 60 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </InteractiveCard>
          )) || (
            <div className="text-center py-12">
              <FaChartLine className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No Test Results</h4>
              <p className="text-gray-500">Take some tests to see your progress!</p>
            </div>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}