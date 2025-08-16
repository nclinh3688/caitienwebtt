'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FaChartLine,
  FaTrophy,
  FaStar,
  FaFire,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaRocket,
  FaBullseye,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaGraduationCap,
  FaUsers,
  FaShare,
  FaDownload,
  FaCalendar,
  FaBrain,
  FaArrowUp,
  FaArrowDown,
  FaMinus,
  FaClipboardList,
  FaPlay,
  FaPause,
  FaFlag,
  FaEye,
  FaClock
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// Import our new components
import AdvancedProgressTracking from '@/components/AdvancedProgressTracking';
import AdvancedTestingSystem from '@/components/AdvancedTestingSystem';
import AdvancedAIInsights from '@/components/ai/AdvancedAIInsights';
import AdvancedStudySchedule from '@/components/dashboard/AdvancedStudySchedule';
import AdvancedAchievementsSystem from '@/components/gamification/AdvancedAchievementsSystem';

export default function AdvancedDashboardPage() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Advanced Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaEye className="text-6xl text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Required</h1>
          <p className="text-gray-600 mb-4">Please sign in to access the Advanced Dashboard</p>
          <Button>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Advanced Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive learning analytics and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <HiSparkles className="mr-1" />
                AI Powered
              </Badge>
              <Button variant="outline">
                <FaDownload className="mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FaChartLine className="text-sm" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <FaBullseye className="text-sm" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="testing" className="flex items-center gap-2">
              <FaClipboardList className="text-sm" />
              Testing
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <FaBrain className="text-sm" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <FaCalendar className="text-sm" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <FaTrophy className="text-sm" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
                  <FaBookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                  <FaClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45h</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+8%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <FaFire className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7 days</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+2 days</span> from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                  <FaStar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+3%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FaChartLine className="text-blue-500" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Your learning progress over the last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FaBullseye className="text-green-500" />
                    Skill Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Performance across different skill areas</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <AdvancedProgressTracking />
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <AdvancedTestingSystem />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <AdvancedAIInsights />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <AdvancedStudySchedule />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AdvancedAchievementsSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
