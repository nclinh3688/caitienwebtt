'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaChartLine, 
  FaTrophy, 
  FaStar, 
  FaClock, 
  FaCheck, 
  FaTimes,
  FaExclamationTriangle,
  FaRocket,
  FaCrown,
  FaGraduationCap,
  FaBook,
  FaBrain,
  FaEye,
  FaDownload,
  FaShare,
  FaSync
} from 'react-icons/fa';

interface ProgressData {
  id: string;
  category: string;
  current: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  lastUpdate: Date;
  trend: 'up' | 'down' | 'stable';
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  reward: string;
  unlockedAt?: Date;
}

interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  progress: number;
  estimatedTime: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'locked';
}

export default function AdvancedProgressTracking() {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  useEffect(() => {
    console.log('🔄 AdvancedProgressTracking: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedProgressTracking: Initializing data');
    
    // Progress Data
    const mockProgressData: ProgressData[] = [
      {
        id: '1',
        category: 'Grammar Mastery',
        current: 85,
        target: 100,
        unit: '%',
        status: 'good',
        lastUpdate: new Date(),
        trend: 'up'
      },
      {
        id: '2',
        category: 'Vocabulary Building',
        current: 1200,
        target: 1500,
        unit: 'words',
        status: 'good',
        lastUpdate: new Date(),
        trend: 'up'
      },
      {
        id: '3',
        category: 'Listening Comprehension',
        current: 72,
        target: 100,
        unit: '%',
        status: 'warning',
        lastUpdate: new Date(),
        trend: 'stable'
      },
      {
        id: '4',
        category: 'Speaking Fluency',
        current: 45,
        target: 100,
        unit: '%',
        status: 'critical',
        lastUpdate: new Date(),
        trend: 'down'
      }
    ];

    // Achievements
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        name: 'Grammar Guru',
        description: 'Master 100 grammar points',
        icon: '🎯',
        unlocked: true,
        progress: 100,
        reward: '500 XP + Badge',
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        name: 'Vocabulary Master',
        description: 'Learn 1000 new words',
        icon: '📚',
        unlocked: false,
        progress: 75,
        reward: '1000 XP + Title'
      },
      {
        id: '3',
        name: 'Listening Champion',
        description: 'Complete 50 listening exercises',
        icon: '🎧',
        unlocked: false,
        progress: 60,
        reward: '750 XP + Avatar'
      },
      {
        id: '4',
        name: 'Speaking Star',
        description: 'Practice speaking for 10 hours',
        icon: '🎤',
        unlocked: false,
        progress: 30,
        reward: '1500 XP + Special Access'
      }
    ];

    // Learning Paths
    const mockLearningPaths: LearningPath[] = [
      {
        id: '1',
        name: 'N5 Foundation',
        description: 'Complete beginner level Japanese',
        difficulty: 'Beginner',
        progress: 100,
        estimatedTime: 120,
        status: 'completed'
      },
      {
        id: '2',
        name: 'N4 Intermediate',
        description: 'Pre-intermediate Japanese',
        difficulty: 'Intermediate',
        progress: 65,
        estimatedTime: 180,
        status: 'in_progress'
      },
      {
        id: '3',
        name: 'N3 Advanced',
        description: 'Upper-intermediate Japanese',
        difficulty: 'Advanced',
        progress: 0,
        estimatedTime: 240,
        status: 'locked'
      },
      {
        id: '4',
        name: 'Business Japanese',
        description: 'Professional Japanese for work',
        difficulty: 'Expert',
        progress: 0,
        estimatedTime: 300,
        status: 'locked'
      }
    ];

    setProgressData(mockProgressData);
    setAchievements(mockAchievements);
    setLearningPaths(mockLearningPaths);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Overall Learning Progress</h3>
              <p className="text-gray-600">Your journey to Japanese mastery</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">78%</div>
              <div className="text-sm text-blue-600">Complete</div>
            </div>
          </div>
          <Progress value={78} className="h-3" />
        </CardContent>
      </Card>

      {/* Progress Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressData.map((item) => (
          <Card key={item.id} className={`border-2 ${
            item.status === 'excellent' ? 'border-green-200 bg-green-50' :
            item.status === 'good' ? 'border-blue-200 bg-blue-50' :
            item.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
            'border-red-200 bg-red-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{item.category}</h3>
                <Badge className={
                  item.status === 'excellent' ? 'bg-green-100 text-green-800' :
                  item.status === 'good' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {item.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{item.current}/{item.target} {item.unit}</span>
                </div>
                <Progress 
                  value={(item.current / item.target) * 100} 
                  className="h-2" 
                />
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last update: {item.lastUpdate.toLocaleDateString('vi-VN')}</span>
                  <div className={`flex items-center gap-1 ${
                    item.trend === 'up' ? 'text-green-600' :
                    item.trend === 'down' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {item.trend === 'up' ? '↗' : item.trend === 'down' ? '↘' : '→'}
                    {item.trend === 'up' ? 'Improving' : item.trend === 'down' ? 'Declining' : 'Stable'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Achievement Progress</h3>
              <p className="text-gray-600">Unlock your potential</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-600">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </div>
              <div className="text-sm text-yellow-600">Unlocked</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={`border-2 ${
            achievement.unlocked 
              ? 'border-green-200 bg-green-50' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <Badge className={
                        achievement.unlocked 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }>
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </Badge>
                      <span className="text-xs text-gray-500">{achievement.reward}</span>
                    </div>
                    
                    {achievement.unlockedAt && (
                      <div className="text-xs text-gray-500">
                        Unlocked: {achievement.unlockedAt.toLocaleDateString('vi-VN')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLearningPaths = () => (
    <div className="space-y-6">
      {/* Learning Path Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Learning Paths</h3>
              <p className="text-gray-600">Structured learning journey</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {learningPaths.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-purple-600">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <div className="space-y-4">
        {learningPaths.map((path) => (
          <Card key={path.id} className={`border-2 ${
            path.status === 'completed' ? 'border-green-200 bg-green-50' :
            path.status === 'in_progress' ? 'border-blue-200 bg-blue-50' :
            path.status === 'locked' ? 'border-gray-200 bg-gray-50' :
            'border-yellow-200 bg-yellow-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {path.status === 'completed' ? '🎓' :
                     path.status === 'in_progress' ? '📚' :
                     path.status === 'locked' ? '🔒' : '⏳'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{path.name}</h3>
                    <p className="text-sm text-gray-600">{path.description}</p>
                  </div>
                </div>
                <Badge className={
                  path.status === 'completed' ? 'bg-green-100 text-green-800' :
                  path.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                  path.status === 'locked' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {path.status.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Difficulty</span>
                  <span className="font-medium">{path.difficulty}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{path.progress}%</span>
                </div>
                <Progress value={path.progress} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Estimated Time</span>
                  <span className="font-medium">{path.estimatedTime} hours</span>
                </div>
                
                {path.status === 'in_progress' && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Continue Learning
                  </Button>
                )}
                
                {path.status === 'locked' && (
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Path to Unlock
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'achievements', label: 'Thành tựu', icon: FaTrophy },
    { id: 'learning-paths', label: 'Lộ trình học', icon: FaGraduationCap }
  ];

  const timeframes = [
    { value: 'week', label: 'Tuần' },
    { value: 'month', label: 'Tháng' },
    { value: 'quarter', label: 'Quý' },
    { value: 'year', label: 'Năm' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaChartLine className="text-blue-600" />
            Advanced Progress Tracking
          </h1>
          <p className="text-gray-600 mt-1">
            Theo dõi tiến độ học tập chi tiết và toàn diện
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.value}
                onClick={() => setSelectedTimeframe(timeframe.value)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedTimeframe === timeframe.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
          
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaShare className="mr-2" />
            Share Progress
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'achievements' && renderAchievements()}
      {activeTab === 'learning-paths' && renderLearningPaths()}
    </div>
  );
}
