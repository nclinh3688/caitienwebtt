'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaCalendar, 
  FaClock, 
  FaPlay, 
  FaPause, 
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaLightbulb,
  FaRocket,
  FaBullseye,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaTrophy,
  FaPlus,
  FaEdit,
  FaRobot
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

interface StudySession {
  id: string;
  title: string;
  type: 'lesson' | 'practice' | 'test' | 'review' | 'break';
  duration: number;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'skipped';
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  description: string;
  aiRecommendation?: string;
  tags: string[];
}

interface DailySchedule {
  date: string;
  sessions: StudySession[];
  totalStudyTime: number;
  completedSessions: number;
  totalSessions: number;
}

interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  progress: number;
  status: 'on_track' | 'behind' | 'ahead';
}

export default function AdvancedStudySchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState<DailySchedule[]>([]);
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    initializeSchedule();
  }, []);

  const initializeSchedule = async () => {
    try {
      const response = await fetch('/api/dashboard/advanced/schedule/public');
      if (response.ok) {
        const data = await response.json();
        setSchedules(data.dailyStats || []);
        setWeeklyGoals(data.weeklyGoals || []);
      } else {
        console.error('Failed to fetch schedule');
        // Fallback to mock data if API fails
        initializeMockData();
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      // Fallback to mock data if API fails
      initializeMockData();
    }
  };

  const initializeMockData = () => {
    const mockSchedules: DailySchedule[] = [];
    const mockGoals: WeeklyGoal[] = [
      {
        id: '1',
        title: 'Hoàn thành 5 bài học N5',
        target: 5,
        current: 3,
        unit: 'lessons',
        deadline: '2024-01-07',
        progress: 60,
        status: 'on_track'
      },
      {
        id: '2',
        title: 'Luyện tập 200 từ vựng',
        target: 200,
        current: 150,
        unit: 'words',
        deadline: '2024-01-07',
        progress: 75,
        status: 'ahead'
      }
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const sessions: StudySession[] = [
        {
          id: `session-${i}-1`,
          title: 'Bài học N5 - Grammar',
          type: 'lesson',
          duration: 45,
          startTime: '08:00',
          endTime: '08:45',
          status: i === 0 ? 'scheduled' : 'scheduled',
          priority: 'high',
          difficulty: 'medium',
          subject: 'Grammar',
          description: 'Học về particles và verb conjugations',
          aiRecommendation: i === 0 ? 'Thời gian tốt nhất để học ngữ pháp' : undefined,
          tags: ['N5', 'Grammar', 'Particles']
        },
        {
          id: `session-${i}-2`,
          title: 'Luyện tập Kanji',
          type: 'practice',
          duration: 30,
          startTime: '09:00',
          endTime: '09:30',
          status: i === 0 ? 'scheduled' : 'scheduled',
          priority: 'medium',
          difficulty: 'hard',
          subject: 'Kanji',
          description: 'Ôn tập 20 kanji N5 cơ bản',
          tags: ['N5', 'Kanji', 'Writing']
        }
      ];

      const totalStudyTime = sessions
        .filter(s => s.type !== 'break')
        .reduce((sum, s) => sum + s.duration, 0);

      mockSchedules.push({
        date: dateStr,
        sessions,
        totalStudyTime,
        completedSessions: 0,
        totalSessions: sessions.length
      });
    }

    setSchedules(mockSchedules);
    setWeeklyGoals(mockGoals);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'skipped': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <FaBookOpen className="text-blue-500" />;
      case 'practice': return <FaPen className="text-green-500" />;
      case 'test': return <FaClipboardList className="text-purple-500" />;
      case 'review': return <FaRedo className="text-orange-500" />;
      case 'break': return <FaCoffee className="text-gray-500" />;
      default: return <FaBookOpen className="text-gray-500" />;
    }
  };

  const startSession = (sessionId: string) => {
    setSchedules(prev => prev.map(schedule => ({
      ...schedule,
      sessions: schedule.sessions.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'in_progress' }
          : session
      )
    })));
  };

  const completeSession = (sessionId: string) => {
    setSchedules(prev => prev.map(schedule => ({
      ...schedule,
      sessions: schedule.sessions.map(session => 
        session.id === sessionId 
          ? { ...session, status: 'completed' }
          : session
      )
    })));
  };

  const todaySchedule = schedules.find(s => s.date === selectedDate.toISOString().split('T')[0]) || {
    date: selectedDate.toISOString().split('T')[0],
    sessions: [],
    totalStudyTime: 0,
    completedSessions: 0,
    totalSessions: 0
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    
    if (dateStr === today.toISOString().split('T')[0]) return 'Hôm nay';
    return date.toLocaleDateString('vi-VN', { weekday: 'long' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FaCalendar className="text-2xl text-green-500" />
            <div>
              <span className="text-2xl">Study Schedule</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <HiSparkles className="mr-1" />
                  AI Optimized
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <FaRobot className="mr-1" />
                  Smart Planning
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Lịch học được tối ưu hóa bởi AI dựa trên hiệu suất và mục tiêu của bạn
            </p>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
              <FaEdit className="mr-2" />
              {isEditing ? 'Done' : 'Edit'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaBullseye className="text-blue-500" />
            Weekly Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">{goal.title}</h4>
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {goal.current}/{goal.target}
                  </div>
                  <div className="text-xs text-gray-500">{goal.unit}</div>
                </div>
                <Progress value={goal.progress} className="w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>📅 Daily Schedule</span>
            <div className="text-sm text-gray-600">
              Total Study Time: <span className="font-semibold text-blue-600">{todaySchedule.totalStudyTime} min</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaySchedule.sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FaCalendar className="text-4xl mx-auto mb-2" />
              <p>Không có lịch học cho ngày này</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todaySchedule.sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                    session.status === 'completed' ? 'bg-green-50 border-green-200' :
                    session.status === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                    'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {getTypeIcon(session.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{session.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{session.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>⏰ {session.startTime} - {session.endTime}</span>
                          <span>⏱️ {session.duration} min</span>
                        </div>
                        {session.aiRecommendation && (
                          <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                            💡 AI: {session.aiRecommendation}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {session.status === 'scheduled' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => startSession(session.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <FaPlay className="mr-1" />
                            Start
                          </Button>
                        </>
                      )}
                      {session.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => completeSession(session.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <FaCheck className="mr-1" />
                          Complete
                        </Button>
                      )}
                      {session.status === 'completed' && (
                        <div className="text-center">
                          <div className="text-green-600 text-sm font-semibold">✓ Done</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Helper components
const FaCoffee = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zM20 8h-2V5h2v3zM4 19h16v2H4z"/>
  </svg>
);

const FaClipboardList = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
  </svg>
);

const FaRedo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
  </svg>
);
