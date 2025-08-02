'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  BookOpen, 
  Clock,
  CheckCircle,
  Lock
} from 'lucide-react';

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'zap' | 'book' | 'clock' | 'check' | 'lock';
  category: 'learning' | 'streak' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: Date;
  points: number;
  className?: string;
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  target: Target,
  zap: Zap,
  book: BookOpen,
  clock: Clock,
  check: CheckCircle,
  lock: Lock
};

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  legendary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
};

const categoryColors = {
  learning: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  streak: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  milestone: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  special: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
};

export function AchievementCard({
  id,
  title,
  description,
  icon,
  category,
  rarity,
  isUnlocked,
  progress = 0,
  maxProgress = 100,
  unlockedAt,
  points,
  className = ''
}: AchievementCardProps) {
  const IconComponent = iconMap[icon];
  const progressPercentage = maxProgress > 0 ? (progress / maxProgress) * 100 : 0;

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      isUnlocked ? 'border-green-200 dark:border-green-800' : 'border-gray-200 dark:border-gray-700'
    } ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isUnlocked 
                ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
                : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'
            }`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold">{title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            <Badge className={rarityColors[rarity]}>
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </Badge>
            <Badge className={categoryColors[category]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Progress Bar */}
        {!isUnlocked && maxProgress > 0 && (
          <div className="mb-3">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Tiến độ</span>
              <span>{progress} / {maxProgress}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Status and Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isUnlocked ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Đã mở khóa
                </span>
                {unlockedAt && (
                  <span className="text-xs text-muted-foreground">
                    {unlockedAt.toLocaleDateString('vi-VN')}
                  </span>
                )}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Chưa mở khóa
                </span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{points} điểm</span>
          </div>
        </div>

        {/* Unlock Animation */}
        {isUnlocked && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/20 to-transparent animate-pulse" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AchievementCard; 