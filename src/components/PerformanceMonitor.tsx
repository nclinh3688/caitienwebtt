'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FaTachometerAlt, 
  FaChartLine, 
  FaCog, 
  FaRocket,
  FaDatabase,
  FaNetworkWired,
  FaMemory,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle
} from 'react-icons/fa';

interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  databaseQueryTime: number;
  componentRenderTime: number;
  overallScore: number;
  timestamp: Date;
}

interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'database' | 'ui' | 'api';
  estimatedImprovement: number;
  isImplemented: boolean;
}

export default function PerformanceMonitor() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceMetrics | null>(null);
  const [metricsHistory, setMetricsHistory] = useState<PerformanceMetrics[]>([]);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Initialize optimization suggestions
  useEffect(() => {
    setOptimizationSuggestions([
      {
        id: '1',
        title: 'Implement Database Caching',
        description: 'Add Redis caching for frequently accessed data to reduce database queries',
        impact: 'high',
        category: 'database',
        estimatedImprovement: 40,
        isImplemented: false
      },
      {
        id: '2',
        title: 'Lazy Load Components',
        description: 'Implement React.lazy() for non-critical components to improve initial load time',
        impact: 'high',
        category: 'ui',
        estimatedImprovement: 25,
        isImplemented: false
      },
      {
        id: '3',
        title: 'API Response Caching',
        description: 'Cache API responses using SWR or React Query to reduce redundant requests',
        impact: 'medium',
        category: 'api',
        estimatedImprovement: 30,
        isImplemented: false
      },
      {
        id: '4',
        title: 'Image Optimization',
        description: 'Implement next/image with proper sizing and WebP format for faster loading',
        impact: 'medium',
        category: 'performance',
        estimatedImprovement: 20,
        isImplemented: false
      },
      {
        id: '5',
        title: 'Bundle Splitting',
        description: 'Split large bundles into smaller chunks for better caching and loading',
        impact: 'medium',
        category: 'performance',
        estimatedImprovement: 15,
        isImplemented: false
      }
    ]);
  }, []);

  const measurePerformance = useCallback(async (): Promise<PerformanceMetrics> => {
    const startTime = performance.now();
    
    // Simulate various performance measurements
    const pageLoadTime = Math.random() * 200 + 100; // 100-300ms
    const apiResponseTime = Math.random() * 150 + 50; // 50-200ms
    const memoryUsage = Math.random() * 30 + 20; // 20-50MB
    const databaseQueryTime = Math.random() * 100 + 20; // 20-120ms
    const componentRenderTime = Math.random() * 50 + 10; // 10-60ms

    // Calculate overall score (0-100)
    const scores = [
      Math.max(0, 100 - (pageLoadTime / 3)),
      Math.max(0, 100 - (apiResponseTime / 2)),
      Math.max(0, 100 - (memoryUsage * 2)),
      Math.max(0, 100 - (databaseQueryTime / 1.5)),
      Math.max(0, 100 - (componentRenderTime * 2))
    ];
    
    const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    return {
      pageLoadTime: Math.round(pageLoadTime),
      apiResponseTime: Math.round(apiResponseTime),
      memoryUsage: Math.round(memoryUsage),
      databaseQueryTime: Math.round(databaseQueryTime),
      componentRenderTime: Math.round(componentRenderTime),
      overallScore,
      timestamp: new Date()
    };
  }, []);

  const startMonitoring = useCallback(async () => {
    setIsMonitoring(true);

    // Initial measurement
    const metrics = await measurePerformance();
    setCurrentMetrics(metrics);
    setMetricsHistory([metrics]);

    // Continuous monitoring every 5 seconds
    const interval = setInterval(async () => {
      const newMetrics = await measurePerformance();
      setCurrentMetrics(newMetrics);
      setMetricsHistory(prev => [...prev.slice(-9), newMetrics]); // Keep last 10
    }, 5000);

    return () => clearInterval(interval);
  }, [measurePerformance]);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  const measureOnDemand = useCallback(async () => {
    const metrics = await measurePerformance();
    setCurrentMetrics(metrics);
    setMetricsHistory(prev => [...prev.slice(-9), metrics]);
  }, [measurePerformance]);

  const implementOptimization = useCallback(async (suggestionId: string) => {
    setIsOptimizing(true);
    
    // Simulate optimization implementation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOptimizationSuggestions(prev => 
      prev.map(s => s.id === suggestionId ? { ...s, isImplemented: true } : s)
    );
    
    // Re-measure performance after optimization
    const newMetrics = await measurePerformance();
    setCurrentMetrics(newMetrics);
    setMetricsHistory(prev => [...prev.slice(-9), newMetrics]);
    
    setIsOptimizing(false);
  }, [measurePerformance]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTachometerAlt className="text-blue-600" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={startMonitoring} 
              disabled={isMonitoring}
              className="bg-green-600 hover:bg-green-700"
            >
              <FaRocket className="mr-2" />
              Start Monitoring
            </Button>
            <Button 
              onClick={stopMonitoring} 
              disabled={!isMonitoring}
              variant="outline"
            >
              Stop Monitoring
            </Button>
            <Button 
              onClick={measureOnDemand}
              variant="outline"
            >
              <FaChartLine className="mr-2" />
              Measure Now
            </Button>
          </div>

          {currentMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Score</span>
                  {getScoreBadge(currentMetrics.overallScore)}
                </div>
                <div className={`text-3xl font-bold ${getScoreColor(currentMetrics.overallScore)}`}>
                  {currentMetrics.overallScore}
                </div>
                <Progress value={currentMetrics.overallScore} className="mt-2" />
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaClock className="text-blue-600" />
                  <span className="text-sm font-medium">Page Load</span>
                </div>
                <div className="text-2xl font-bold">{currentMetrics.pageLoadTime}ms</div>
                <div className="text-xs text-gray-500">Target: &lt;200ms</div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaNetworkWired className="text-green-600" />
                  <span className="text-sm font-medium">API Response</span>
                </div>
                <div className="text-2xl font-bold">{currentMetrics.apiResponseTime}ms</div>
                <div className="text-xs text-gray-500">Target: &lt;150ms</div>
            </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaMemory className="text-purple-600" />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <div className="text-2xl font-bold">{currentMetrics.memoryUsage}MB</div>
                <div className="text-xs text-gray-500">Target: &lt;40MB</div>
            </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaDatabase className="text-orange-600" />
                  <span className="text-sm font-medium">DB Query</span>
                </div>
                <div className="text-2xl font-bold">{currentMetrics.databaseQueryTime}ms</div>
                <div className="text-xs text-gray-500">Target: &lt;100ms</div>
            </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaCog className="text-red-600" />
                  <span className="text-sm font-medium">Render Time</span>
                </div>
                <div className="text-2xl font-bold">{currentMetrics.componentRenderTime}ms</div>
                <div className="text-xs text-gray-500">Target: &lt;50ms</div>
              </div>
            </div>
          )}

          {metricsHistory.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Performance History</h4>
              <div className="h-32 bg-gray-50 rounded-lg p-4">
                <div className="flex items-end justify-between h-full gap-1">
                  {metricsHistory.map((metric, index) => (
                    <div key={index} className="flex-1 bg-blue-200 rounded-t" 
                         style={{ height: `${metric.overallScore}%` }}>
                      <div className="text-xs text-center mt-1">{metric.overallScore}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          </CardContent>
        </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaCog className="text-green-600" />
            Optimization Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="high">High Impact</TabsTrigger>
              <TabsTrigger value="medium">Medium Impact</TabsTrigger>
              <TabsTrigger value="low">Low Impact</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {optimizationSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                <div>
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600">{suggestion.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={suggestion.impact === 'high' ? 'default' : 'secondary'}>
                        {suggestion.impact} impact
                      </Badge>
                      {suggestion.isImplemented ? (
                        <FaCheckCircle className="text-green-600" />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => implementOptimization(suggestion.id)}
                          disabled={isOptimizing}
                        >
                          {isOptimizing ? 'Implementing...' : 'Implement'}
                        </Button>
                      )}
                </div>
              </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Category: {suggestion.category}</span>
                    <span>Estimated Improvement: +{suggestion.estimatedImprovement}%</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="high" className="space-y-4">
              {optimizationSuggestions
                .filter(s => s.impact === 'high')
                .map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800">High Impact</Badge>
                        {suggestion.isImplemented ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => implementOptimization(suggestion.id)}
                            disabled={isOptimizing}
                          >
                            {isOptimizing ? 'Implementing...' : 'Implement'}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Category: {suggestion.category}</span>
                      <span>Estimated Improvement: +{suggestion.estimatedImprovement}%</span>
                </div>
              </div>
                ))}
            </TabsContent>

            <TabsContent value="medium" className="space-y-4">
              {optimizationSuggestions
                .filter(s => s.impact === 'medium')
                .map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                <div>
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Impact</Badge>
                        {suggestion.isImplemented ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => implementOptimization(suggestion.id)}
                            disabled={isOptimizing}
                          >
                            {isOptimizing ? 'Implementing...' : 'Implement'}
                          </Button>
                        )}
                </div>
              </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Category: {suggestion.category}</span>
                      <span>Estimated Improvement: +{suggestion.estimatedImprovement}%</span>
                </div>
              </div>
                ))}
            </TabsContent>

            <TabsContent value="low" className="space-y-4">
              {optimizationSuggestions
                .filter(s => s.impact === 'low')
                .map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-gray-100 text-gray-800">Low Impact</Badge>
                        {suggestion.isImplemented ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => implementOptimization(suggestion.id)}
                            disabled={isOptimizing}
                          >
                            {isOptimizing ? 'Implementing...' : 'Implement'}
                          </Button>
            )}
          </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Category: {suggestion.category}</span>
                      <span>Estimated Improvement: +{suggestion.estimatedImprovement}%</span>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}