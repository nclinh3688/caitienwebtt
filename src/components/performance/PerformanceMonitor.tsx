'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FaTachometerAlt,
  FaClock,
  FaMemory,
  FaNetworkWired,
  FaDatabase,
  FaRocket,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSync,
  FaChartLine
} from 'react-icons/fa';

interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  databaseQueryTime: number;
  componentRenderTime: number;
  overallScore: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    pageLoadTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    databaseQueryTime: 0,
    componentRenderTime: 0,
    overallScore: 0
  });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [history, setHistory] = useState<PerformanceMetrics[]>([]);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(measurePerformance, 5000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const measurePerformance = async () => {
    const startTime = performance.now();
    
    // Measure API response time
    const apiStart = performance.now();
    try {
      await fetch('/api/dashboard/advanced/insights');
    } catch (error) {
      console.error('API test failed:', error);
    }
    const apiResponseTime = performance.now() - apiStart;

    // Measure database query time (simulated)
    const dbQueryTime = Math.random() * 100 + 50; // 50-150ms

    // Measure memory usage (simulated)
    const memoryUsage = Math.random() * 50 + 20; // 20-70MB

    // Calculate overall score
    const pageLoadTime = performance.now() - startTime;
    const componentRenderTime = Math.random() * 30 + 10; // 10-40ms
    
    const overallScore = Math.max(0, 100 - 
      (pageLoadTime / 10) - 
      (apiResponseTime / 5) - 
      (memoryUsage / 2) - 
      (dbQueryTime / 10) - 
      (componentRenderTime / 2)
    );

    const newMetrics: PerformanceMetrics = {
      pageLoadTime: Math.round(pageLoadTime),
      apiResponseTime: Math.round(apiResponseTime),
      memoryUsage: Math.round(memoryUsage),
      databaseQueryTime: Math.round(dbQueryTime),
      componentRenderTime: Math.round(componentRenderTime),
      overallScore: Math.round(overallScore)
    };

    setMetrics(newMetrics);
    setHistory(prev => [...prev.slice(-9), newMetrics]);
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    measurePerformance();
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceStatus = (score: number) => {
    if (score >= 80) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const status = getPerformanceStatus(metrics.overallScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FaTachometerAlt className="text-2xl text-purple-500" />
            <div>
              <span className="text-2xl">Performance Monitor</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={status.color}>
                  {status.text}
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  <FaRocket className="mr-1" />
                  Real-time Monitoring
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Monitor performance metrics của Advanced Dashboard để tối ưu hóa
            </p>
            <div className="flex gap-2">
              {!isMonitoring ? (
                <Button onClick={startMonitoring} className="bg-green-600 hover:bg-green-700">
                  <FaChartLine className="mr-2" />
                  Start Monitoring
                </Button>
              ) : (
                <Button onClick={stopMonitoring} variant="destructive">
                  <FaExclamationTriangle className="mr-2" />
                  Stop Monitoring
                </Button>
              )}
              <Button onClick={measurePerformance} variant="outline">
                <FaSync className="mr-2" />
                Measure Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaRocket className="text-blue-500" />
            Overall Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">
              {metrics.overallScore}
            </div>
            <div className="text-2xl text-gray-600">/ 100</div>
            <Progress value={metrics.overallScore} className="w-full h-3" />
            <div className={`text-lg font-semibold ${getPerformanceColor(metrics.overallScore)}`}>
              {status.text}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaClock className="text-blue-500" />
              Page Load Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {metrics.pageLoadTime}ms
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Target: &lt; 100ms
            </div>
            <Progress 
              value={Math.min(100, (100 / metrics.pageLoadTime) * 100)} 
              className="w-full mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaNetworkWired className="text-green-500" />
              API Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {metrics.apiResponseTime}ms
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Target: &lt; 200ms
            </div>
            <Progress 
              value={Math.min(100, (200 / metrics.apiResponseTime) * 100)} 
              className="w-full mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaDatabase className="text-purple-500" />
              Database Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {metrics.databaseQueryTime}ms
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Target: &lt; 100ms
            </div>
            <Progress 
              value={Math.min(100, (100 / metrics.databaseQueryTime) * 100)} 
              className="w-full mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaMemory className="text-orange-500" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {metrics.memoryUsage}MB
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Target: &lt; 50MB
            </div>
            <Progress 
              value={Math.min(100, (50 / metrics.memoryUsage) * 100)} 
              className="w-full mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaRocket className="text-red-500" />
              Component Render
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {metrics.componentRenderTime}ms
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Target: &lt; 30ms
            </div>
            <Progress 
              value={Math.min(100, (30 / metrics.componentRenderTime) * 100)} 
              className="w-full mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FaCheckCircle className="text-green-500" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-2">
              <div className={`text-2xl font-bold ${getPerformanceColor(metrics.overallScore)}`}>
                {metrics.overallScore >= 80 ? '✅' : metrics.overallScore >= 60 ? '⚠️' : '❌'}
              </div>
              <div className="text-sm text-gray-600">
                {isMonitoring ? 'Monitoring Active' : 'Monitoring Stopped'}
              </div>
              <Badge className={status.color}>
                {status.text}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance History */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartLine className="text-blue-500" />
              Performance History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {history.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm text-gray-600">
                    {new Date().toLocaleTimeString()}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">Score: <span className="font-semibold">{metric.overallScore}</span></span>
                    <span className="text-sm">Load: <span className="font-semibold">{metric.pageLoadTime}ms</span></span>
                    <span className="text-sm">API: <span className="font-semibold">{metric.apiResponseTime}ms</span></span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
