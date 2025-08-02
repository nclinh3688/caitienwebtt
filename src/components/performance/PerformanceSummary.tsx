'use client';

import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { usePerformance } from '@/hooks/usePerformance';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'warning' | 'poor';
  description: string;
}

export const PerformanceSummary = memo(function PerformanceSummary() {
  const { fps, memory, pageLoadTime, lcp, cls, performanceScore } = usePerformance();
  const [showDetails, setShowDetails] = useState(false);

  const metrics: PerformanceMetric[] = [
    {
      name: 'FPS',
      value: fps,
      unit: 'fps',
      threshold: 60,
      status: fps >= 50 ? 'good' : fps >= 30 ? 'warning' : 'poor',
      description: 'Frames per second - measures UI smoothness'
    },
    {
      name: 'Memory Usage',
      value: memory ? memory.usedJSHeapSize / 1024 / 1024 : 0,
      unit: 'MB',
      threshold: 50,
      status: memory && memory.usedJSHeapSize / 1024 / 1024 < 50 ? 'good' : 
              memory && memory.usedJSHeapSize / 1024 / 1024 < 100 ? 'warning' : 'poor',
      description: 'JavaScript heap size in memory'
    },
    {
      name: 'Page Load Time',
      value: pageLoadTime || 0,
      unit: 'ms',
      threshold: 2500,
      status: pageLoadTime && pageLoadTime < 2500 ? 'good' : 
              pageLoadTime && pageLoadTime < 4000 ? 'warning' : 'poor',
      description: 'Time to fully load the page'
    },
    {
      name: 'LCP',
      value: lcp || 0,
      unit: 'ms',
      threshold: 2500,
      status: lcp && lcp < 2500 ? 'good' : lcp && lcp < 4000 ? 'warning' : 'poor',
      description: 'Largest Contentful Paint - loading performance'
    },
    {
      name: 'CLS',
      value: cls || 0,
      unit: '',
      threshold: 0.1,
      status: cls !== null && cls < 0.1 ? 'good' : cls !== null && cls < 0.25 ? 'warning' : 'poor',
      description: 'Cumulative Layout Shift - visual stability'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'good': return 'default';
      case 'warning': return 'secondary';
      case 'poor': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${
                performanceScore >= 80 ? 'bg-green-500' : 
                performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              {performanceScore >= 80 && (
                <div className={`absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping`} />
              )}
            </div>
            Performance Dashboard
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant={getStatusVariant(performanceScore >= 80 ? 'good' : performanceScore >= 60 ? 'warning' : 'poor')}>
              Score: {performanceScore}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">Overall Performance</span>
            <span className="text-sm text-muted-foreground">{performanceScore}%</span>
          </div>
          <Progress value={performanceScore} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.name}</span>
                <Badge variant={getStatusVariant(metric.status)}>
                  {metric.value.toFixed(metric.name === 'CLS' ? 3 : 0)}{metric.unit}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${getStatusColor(metric.status)}`}
                  style={{
                    width: `${Math.min(100, (metric.value / metric.threshold) * 100)}%`
                  }}
                />
              </div>
              {showDetails && (
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              )}
            </div>
          ))}
        </div>

        {showDetails && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold">Performance Optimizations Applied:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <h5 className="font-medium text-sm">✅ Completed</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React.memo optimization for heavy components</li>
                  <li>• Console.log statements made dev-only</li>
                  <li>• Dark mode with smooth transitions</li>
                  <li>• Performance monitoring enabled</li>
                  <li>• Bundle analysis configured</li>
                  <li>• PWA optimization enabled</li>
                  <li>• Web Vitals tracking</li>
                  <li>• Lazy loading components</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-sm">🚀 Recommendations</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Implement virtual scrolling for long lists</li>
                  <li>• Add image optimization with next/image</li>
                  <li>• Use Suspense boundaries for better UX</li>
                  <li>• Consider code splitting for larger bundles</li>
                  <li>• Monitor bundle size regularly</li>
                  <li>• Optimize database queries</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm">Real-time monitoring active</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="text-sm">
            <strong>Performance Status:</strong> {
              performanceScore >= 80 ? '🚀 Excellent - Your app is running optimally!' :
              performanceScore >= 60 ? '⚡ Good - Minor optimizations recommended' :
              '🐌 Needs Attention - Consider implementing performance improvements'
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
});