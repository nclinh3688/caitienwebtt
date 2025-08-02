'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Clock, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fmp: number; // First Meaningful Paint
}

interface PerformanceScore {
  overall: number;
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fmp: 0
  });

  const [score, setScore] = useState<PerformanceScore>({
    overall: 0,
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      startPerformanceMonitoring();
    }
  }, []);

  const startPerformanceMonitoring = () => {
    setIsMonitoring(true);

    // Monitor First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        calculateScore('fcp', fcpEntry.startTime);
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Monitor Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        calculateScore('lcp', lastEntry.startTime);
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fidEntry = entries[0] as PerformanceEventTiming;
      if (fidEntry && 'processingStart' in fidEntry) {
        const fid = fidEntry.processingStart - fidEntry.startTime;
        setMetrics(prev => ({ ...prev, fid }));
        calculateScore('fid', fid);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      setMetrics(prev => ({ ...prev, cls: clsValue }));
      calculateScore('cls', clsValue);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Monitor Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      setMetrics(prev => ({ ...prev, ttfb }));
      calculateScore('ttfb', ttfb);
    }

    // Monitor First Meaningful Paint
    const fmpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fmpEntry = entries.find(entry => entry.name === 'first-meaningful-paint');
      if (fmpEntry) {
        setMetrics(prev => ({ ...prev, fmp: fmpEntry.startTime }));
      }
    });
    fmpObserver.observe({ entryTypes: ['paint'] });
  };

  const calculateScore = (metric: keyof PerformanceMetrics, value: number) => {
    let newScore = 0;
    
    switch (metric) {
      case 'fcp':
        newScore = value <= 1800 ? 100 : value <= 3000 ? 75 : value <= 4000 ? 50 : 25;
        break;
      case 'lcp':
        newScore = value <= 2500 ? 100 : value <= 4000 ? 75 : value <= 5000 ? 50 : 25;
        break;
      case 'fid':
        newScore = value <= 100 ? 100 : value <= 300 ? 75 : value <= 500 ? 50 : 25;
        break;
      case 'cls':
        newScore = value <= 0.1 ? 100 : value <= 0.25 ? 75 : value <= 0.5 ? 50 : 25;
        break;
      case 'ttfb':
        newScore = value <= 600 ? 100 : value <= 1000 ? 75 : value <= 1500 ? 50 : 25;
        break;
    }

    setScore(prev => {
      const updatedScore: PerformanceScore = {
        overall: prev.overall,
        fcp: metric === 'fcp' ? newScore : prev.fcp,
        lcp: metric === 'lcp' ? newScore : prev.lcp,
        fid: metric === 'fid' ? newScore : prev.fid,
        cls: metric === 'cls' ? newScore : prev.cls,
        ttfb: metric === 'ttfb' ? newScore : prev.ttfb
      };
      
      // Calculate overall score
      const scores = [updatedScore.fcp, updatedScore.lcp, updatedScore.fid, updatedScore.cls, updatedScore.ttfb];
      const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      
      return { ...updatedScore, overall: overallScore };
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score >= 70) return <Info className="h-4 w-4 text-yellow-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };

  const formatMetric = (metric: keyof PerformanceMetrics, value: number) => {
    switch (metric) {
      case 'fcp':
      case 'lcp':
      case 'fmp':
        return `${(value / 1000).toFixed(2)}s`;
      case 'fid':
        return `${value.toFixed(0)}ms`;
      case 'cls':
        return value.toFixed(3);
      case 'ttfb':
        return `${value.toFixed(0)}ms`;
      default:
        return value.toString();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Monitor</h1>
          <p className="text-muted-foreground">Theo dõi hiệu suất trang web và trải nghiệm người dùng</p>
        </div>
        <Badge variant={isMonitoring ? 'default' : 'secondary'} className="flex items-center space-x-2">
          <Activity className="h-4 w-4" />
          <span>{isMonitoring ? 'Đang theo dõi' : 'Chưa theo dõi'}</span>
        </Badge>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span>Điểm tổng thể</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-yellow-500">
              {score.overall}
            </div>
            <div className="flex items-center justify-center space-x-2">
              {getScoreIcon(score.overall)}
              <span className={getScoreColor(score.overall)}>
                {score.overall >= 90 ? 'Tuyệt vời' : score.overall >= 70 ? 'Tốt' : 'Cần cải thiện'}
              </span>
            </div>
            <Progress value={score.overall} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Contentful Paint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">First Contentful Paint</span>
              {getScoreIcon(score.fcp)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatMetric('fcp', metrics.fcp)}</div>
              <Progress value={score.fcp} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Thời gian hiển thị nội dung đầu tiên
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Largest Contentful Paint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">Largest Contentful Paint</span>
              {getScoreIcon(score.lcp)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatMetric('lcp', metrics.lcp)}</div>
              <Progress value={score.lcp} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Thời gian hiển thị nội dung lớn nhất
              </p>
            </div>
          </CardContent>
        </Card>

        {/* First Input Delay */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">First Input Delay</span>
              {getScoreIcon(score.fid)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatMetric('fid', metrics.fid)}</div>
              <Progress value={score.fid} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Độ trễ phản hồi đầu tiên
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cumulative Layout Shift */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">Cumulative Layout Shift</span>
              {getScoreIcon(score.cls)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatMetric('cls', metrics.cls)}</div>
              <Progress value={score.cls} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Độ ổn định bố cục
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time to First Byte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm">Time to First Byte</span>
              {getScoreIcon(score.ttfb)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatMetric('ttfb', metrics.ttfb)}</div>
              <Progress value={score.ttfb} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Thời gian phản hồi server
              </p>
            </div>
          </CardContent>
        </Card>

        {/* First Meaningful Paint */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">First Meaningful Paint</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{formatMetric('fmp', metrics.fmp)}</div>
              <p className="text-xs text-muted-foreground">
                Thời gian hiển thị nội dung có ý nghĩa
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <span>Khuyến nghị cải thiện</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {score.fcp < 90 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cải thiện First Contentful Paint</p>
                  <p className="text-sm text-muted-foreground">
                    Tối ưu hóa CSS, giảm kích thước bundle, sử dụng CDN
                  </p>
                </div>
              </div>
            )}
            
            {score.lcp < 90 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cải thiện Largest Contentful Paint</p>
                  <p className="text-sm text-muted-foreground">
                    Tối ưu hóa hình ảnh, lazy loading, preload critical resources
                  </p>
                </div>
              </div>
            )}
            
            {score.fid < 90 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cải thiện First Input Delay</p>
                  <p className="text-sm text-muted-foreground">
                    Giảm JavaScript blocking, code splitting, optimize event handlers
                  </p>
                </div>
              </div>
            )}
            
            {score.cls < 90 && (
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium">Cải thiện Cumulative Layout Shift</p>
                  <p className="text-sm text-muted-foreground">
                    Đặt kích thước cố định cho hình ảnh, tránh thêm nội dung phía trên
                  </p>
                </div>
              </div>
            )}
            
            {score.overall >= 90 && (
              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Hiệu suất tuyệt vời!</p>
                  <p className="text-sm text-muted-foreground">
                    Trang web của bạn đang hoạt động rất tốt. Hãy duy trì hiệu suất này.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PerformanceMonitor;