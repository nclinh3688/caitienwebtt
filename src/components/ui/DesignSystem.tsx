'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InteractiveCard } from '@/components/ui/MicroInteractions';
import { GlassCard, AnimatedSection, GradientText } from '@/components/ui/MagicEffects';
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaStar, 
  FaLock, 
  FaCrown,
  FaGlobe,
  FaUsers,
  FaBook,
  FaChartLine,
  FaTrophy,
  FaGraduationCap,
  FaBrain,
  FaClock,
  FaFlag,
  FaHeadphones,
  FaPencilAlt
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

// 🏗️ Page Layout Template
export function ModernPageLayout({ 
  children, 
  title, 
  subtitle, 
  background = 'gradient',
  className = '' 
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  background?: 'gradient' | 'pattern' | 'solid';
  className?: string;
}) {
  const backgrounds = {
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
    pattern: 'bg-white relative before:absolute before:inset-0 before:bg-hero-pattern before:opacity-5',
    solid: 'bg-white'
  };

  return (
    <div className={`min-h-screen ${backgrounds[background]} ${className}`}>
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float floating-delayed" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6 animate-slide-up">
            <GradientText className="text-white drop-shadow-lg">
              {title}
            </GradientText>
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-slide-up" 
               style={{animationDelay: '200ms'}}>
              {subtitle}
            </p>
          )}
          
          {/* Decorative Elements */}
          <div className="flex justify-center items-center gap-4 mt-8 animate-slide-up" style={{animationDelay: '400ms'}}>
            <HiSparkles className="text-yellow-300 text-2xl animate-sparkle" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <HiLightningBolt className="text-yellow-300 text-2xl animate-pulse" />
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <HiSparkles className="text-yellow-300 text-2xl animate-sparkle" style={{animationDelay: '0.5s'}} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative -mt-8 z-10">
        {children}
      </div>
    </div>
  );
}

// 🎯 Premium Course Card
// Icon mapping for all components
const iconMap: { [key: string]: React.ComponentType<any> } = {
  'FaGlobe': FaGlobe,
  'FaUsers': FaUsers,
  'FaBook': FaBook,
  'FaStar': FaStar,
  'FaCheckCircle': FaCheckCircle,
  'FaChartLine': FaChartLine,
  'FaTrophy': FaTrophy,
  'FaGraduationCap': FaGraduationCap,
  'FaBrain': FaBrain,
  'FaClock': FaClock,
  'FaFlag': FaFlag,
  'FaHeadphones': FaHeadphones,
  'FaPencilAlt': FaPencilAlt,
};

export function PremiumCourseCard({ 
  title, 
  description, 
  href, 
  iconName,
  level = 'beginner',
  lessons = 0,
  duration = '',
  featured = false,
  price = 'free'
}: {
  title: string;
  description: string;
  href: string;
  iconName?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  lessons?: number;
  duration?: string;
  featured?: boolean;
  price?: string;
}) {
  const levelColors = {
    beginner: 'from-green-500 to-emerald-500',
    intermediate: 'from-yellow-500 to-orange-500',
    advanced: 'from-red-500 to-pink-500'
  };

  const levelBadges = {
    beginner: 'Cơ bản',
    intermediate: 'Trung cấp', 
    advanced: 'Nâng cao'
  };

  return (
    <Link href={href}>
      <InteractiveCard 
        hoverEffect="lift" 
        glowColor="blue"
        className={`relative overflow-hidden ${featured ? 'ring-2 ring-yellow-400 ring-offset-4' : ''}`}
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute -top-1 -right-1 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaCrown className="w-3 h-3" />
              HOT
            </div>
          </div>
        )}

        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/30" />
        
        <CardContent className="relative z-10 p-0">
          {/* Header Section */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              {iconName && iconMap[iconName] && (
                <div className={`p-3 bg-gradient-to-r ${levelColors[level]} rounded-xl shadow-lg`}>
                  {React.createElement(iconMap[iconName], { className: "w-6 h-6 text-white" })}
                </div>
              )}
              <Badge 
                variant="secondary" 
                className={`bg-gradient-to-r ${levelColors[level]} text-white border-0 font-medium`}
              >
                {levelBadges[level]}
              </Badge>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-4">
              {description}
            </p>
          </div>

          {/* Stats Section */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <FaCheckCircle className="w-4 h-4 text-green-500" />
                  {lessons} bài học
                </span>
                {duration && (
                  <span>{duration}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`font-bold ${price === 'free' ? 'text-green-600' : 'text-blue-600'}`}>
                  {price === 'free' ? 'Miễn phí' : price}
                </span>
                <FaArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </CardContent>
      </InteractiveCard>
    </Link>
  );
}

// 🎮 Premium Test Card  
export function PremiumTestCard({
  title,
  description, 
  href,
  iconName,
  difficulty = 'easy',
  questions = 0,
  duration = '',
  category = 'general'
}: {
  title: string;
  description: string;
  href: string;
  iconName?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  questions?: number;
  duration?: string;
  category?: string;
}) {
  const difficultyColors = {
    easy: 'from-green-500 to-emerald-500',
    medium: 'from-yellow-500 to-orange-500', 
    hard: 'from-red-500 to-pink-500'
  };

  const difficultyLabels = {
    easy: 'Dễ',
    medium: 'Trung bình',
    hard: 'Khó'
  };

  return (
    <Link href={href}>
      <InteractiveCard hoverEffect="tilt" glowColor="purple">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            {iconName && iconMap[iconName] && (
              <div className={`p-3 bg-gradient-to-r ${difficultyColors[difficulty]} rounded-xl shadow-lg`}>
                {React.createElement(iconMap[iconName], { className: "w-6 h-6 text-white" })}
              </div>
            )}
            <Badge 
              variant="outline"
              className={`bg-gradient-to-r ${difficultyColors[difficulty]} text-white border-0`}
            >
              {difficultyLabels[difficulty]}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-4 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <span>{questions} câu hỏi</span>
              {duration && <span>• {duration}</span>}
            </div>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Bắt đầu
              <FaArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </CardContent>
      </InteractiveCard>
    </Link>
  );
}

// 📊 Stats Grid Component - Client Component for Icons
export function StatsGrid({ stats }: { 
  stats: Array<{
    label: string;
    value: string | number;
    iconName?: string;
    color?: string;
  }> 
}) {

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.iconName ? iconMap[stat.iconName] : null;
        return (
          <GlassCard key={index} className="p-6 text-center group hover:scale-105 transition-all duration-300">
            {IconComponent && (
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.color || 'bg-blue-500'}`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            )}
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </GlassCard>
        );
      })}
    </div>
  );
}

// 🎯 Call-to-Action Section
export function PremiumCTA({ 
  title, 
  subtitle, 
  primaryAction, 
  secondaryAction 
}: {
  title: string;
  subtitle: string;
  primaryAction: { label: string; href: string; };
  secondaryAction?: { label: string; href: string; };
}) {
  return (
    <AnimatedSection className="my-16">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float floating-delayed" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryAction.href}>
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90 font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {primaryAction.label}
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
            
            {secondaryAction && (
              <Link href={secondaryAction.href}>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-xl"
                >
                  {secondaryAction.label}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}