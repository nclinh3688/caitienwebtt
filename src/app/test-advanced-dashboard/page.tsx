'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdvancedAIInsights from '@/components/ai/AdvancedAIInsights';
import AdvancedStudySchedule from '@/components/dashboard/AdvancedStudySchedule';
import AdvancedAchievementsSystem from '@/components/gamification/AdvancedAchievementsSystem';
import PerformanceMonitor from '@/components/PerformanceMonitor';

export default function TestAdvancedDashboard() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);

  const seedTestData = async () => {
    setIsSeeding(true);
    try {
      // Create test data using public APIs
      const testData = [
        {
          type: 'recommendation',
          title: 'Tăng cường luyện tập Kanji',
          description: 'Dựa trên phân tích, bạn cần tập trung vào việc học Kanji N5. Độ chính xác hiện tại chỉ đạt 65%, thấp hơn mức trung bình 15%.',
          confidence: 0.92,
          impact: 'high',
          category: 'Kanji Learning',
          actionRequired: true,
          estimatedTime: 30,
          priority: 1
        },
        {
          type: 'warning',
          title: 'Giảm thời gian học liên tục',
          description: 'Thời gian học liên tục trung bình 2.5 giờ có thể gây mệt mỏi. Khuyến nghị chia nhỏ thành các phiên 45 phút với nghỉ ngơi 15 phút.',
          confidence: 0.87,
          impact: 'medium',
          category: 'Study Habits',
          actionRequired: true,
          estimatedTime: 15,
          priority: 2
        }
      ];

      // Create insights
      const insightsPromises = testData.map(insight => 
        fetch('/api/dashboard/advanced/insights/public', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(insight)
        })
      );

      // Create study sessions
      const sessionData = {
        title: 'Bài học N5 - Grammar',
        type: 'lesson',
        duration: 45,
        startTime: '08:00',
        endTime: '08:45',
        priority: 'high',
        difficulty: 'medium',
        subject: 'Grammar',
        description: 'Học về particles và verb conjugations',
        scheduledDate: new Date().toISOString()
      };

      const sessionPromise = fetch('/api/dashboard/advanced/schedule/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData)
      });

      // Create achievement
      const achievementData = {
        title: 'First Steps',
        description: 'Hoàn thành bài học đầu tiên',
        category: 'learning',
        rarity: 'common',
        icon: '🎯',
        maxProgress: 1,
        rewardType: 'xp',
        rewardValue: '100',
        requirements: ['Complete first lesson'],
        bonusDescription: '+10% XP bonus for 1 day',
        bonusValue: 0.1
      };

      const achievementPromise = fetch('/api/dashboard/advanced/achievements/public', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(achievementData)
      });

      // Wait for all requests to complete
      const results = await Promise.all([
        ...insightsPromises,
        sessionPromise,
        achievementPromise
      ]);

      const successCount = results.filter(r => r.ok).length;
      setSeedResult({ 
        message: `Created ${successCount} test items successfully`,
        details: 'Test data created using public APIs'
      });

      // Refresh the page to show new data
      setTimeout(() => window.location.reload(), 1000);

    } catch (error) {
      setSeedResult({ error: 'Error seeding data: ' + error });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-3xl">🧪 Advanced Dashboard Testing</CardTitle>
          <p className="text-gray-600">
            Test và validate Advanced Dashboard với real database
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={seedTestData} 
              disabled={isSeeding}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSeeding ? '🔄 Seeding...' : '🌱 Seed Test Data'}
            </Button>
            
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline"
            >
              🔄 Refresh Page
            </Button>

            <Button 
              onClick={() => window.open('/dashboard/advanced', '_blank')} 
              variant="outline"
            >
              📊 Open Real Dashboard
            </Button>
          </div>

          {seedResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Seed Result:</h4>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(seedResult, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Testing Tabs */}
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">🧠 AI Insights</TabsTrigger>
          <TabsTrigger value="schedule">📅 Study Schedule</TabsTrigger>
          <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
          <TabsTrigger value="performance">⚡ Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights Component Test</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedAIInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Schedule Component Test</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedStudySchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements Component Test</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvancedAchievementsSystem />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Monitor Test</CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceMonitor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* API Testing */}
      <Card>
        <CardHeader>
          <CardTitle>🔌 API Endpoints Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">AI Insights API</h4>
              <p className="text-sm text-gray-600 mb-2">Test AI insights endpoints</p>
              <Button size="sm" variant="outline" onClick={() => fetch('/api/dashboard/advanced/insights').then(r => r.json()).then(console.log)}>
                Test GET
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Schedule API</h4>
              <p className="text-sm text-gray-600 mb-2">Test study schedule endpoints</p>
              <Button size="sm" variant="outline" onClick={() => fetch('/api/dashboard/advanced/schedule').then(r => r.json()).then(console.log)}>
                Test GET
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Achievements API</h4>
              <p className="text-sm text-gray-600 mb-2">Test achievements endpoints</p>
              <Button size="sm" variant="outline" onClick={() => fetch('/api/dashboard/advanced/achievements').then(r => r.json()).then(console.log)}>
                Test GET
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
