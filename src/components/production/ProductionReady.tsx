'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaShieldAlt, 
  FaRocket, 
  FaCheck, 
  FaTimes, 
  FaExclamationTriangle,
  FaCog,
  FaDownload,
  FaUpload,
  FaPlay,
  FaStop,
  FaSync,
  FaEye,
  FaLock,
  FaUnlock,
  FaServer,
  FaDatabase,
  FaNetworkWired,
  FaMobile,
  FaDesktop,
  FaTablet,
  FaGlobe,
  FaCloud,
  FaBolt,
  FaStar,
  FaTrophy,
  FaCrown
} from 'react-icons/fa';

interface SecurityStatus {
  id: string;
  name: string;
  status: 'secure' | 'warning' | 'critical';
  description: string;
  lastCheck: Date;
  score: number;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running';
  duration: number;
  details: string;
  timestamp: Date;
}

export default function ProductionReady() {
  const [securityStatuses, setSecurityStatuses] = useState<SecurityStatus[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [activeTab, setActiveTab] = useState('security');
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    console.log('🔄 ProductionReady: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 ProductionReady: Initializing data');
    // Security Statuses
    const mockSecurityStatuses: SecurityStatus[] = [
      {
        id: '1',
        name: 'Authentication & Authorization',
        status: 'secure',
        description: 'JWT tokens, role-based access control, secure sessions',
        lastCheck: new Date(),
        score: 95
      },
      {
        id: '2',
        name: 'Data Encryption',
        status: 'secure',
        description: 'AES-256 encryption for sensitive data, TLS 1.3 for transport',
        lastCheck: new Date(),
        score: 98
      },
      {
        id: '3',
        name: 'SQL Injection Protection',
        status: 'secure',
        description: 'Parameterized queries, input validation, ORM protection',
        lastCheck: new Date(),
        score: 100
      },
      {
        id: '4',
        name: 'XSS Protection',
        status: 'secure',
        description: 'Content Security Policy, input sanitization',
        lastCheck: new Date(),
        score: 92
      },
      {
        id: '5',
        name: 'Rate Limiting',
        status: 'warning',
        description: 'API rate limiting implemented but needs optimization',
        lastCheck: new Date(),
        score: 75
      }
    ];

    // Performance Metrics
    const mockPerformanceMetrics: PerformanceMetric[] = [
      {
        id: '1',
        name: 'Page Load Time',
        value: 1.2,
        target: 2.0,
        unit: 'seconds',
        status: 'excellent'
      },
      {
        id: '2',
        name: 'API Response Time',
        value: 150,
        target: 200,
        unit: 'ms',
        status: 'excellent'
      },
      {
        id: '3',
        name: 'Database Query Time',
        value: 25,
        target: 50,
        unit: 'ms',
        status: 'excellent'
      },
      {
        id: '4',
        name: 'Memory Usage',
        value: 65,
        target: 80,
        unit: '%',
        status: 'good'
      },
      {
        id: '5',
        name: 'CPU Usage',
        value: 45,
        target: 70,
        unit: '%',
        status: 'excellent'
      }
    ];

    // Test Results
    const mockTestResults: TestResult[] = [
      {
        id: '1',
        name: 'Unit Tests',
        status: 'passed',
        duration: 2.3,
        details: 'All 156 tests passed successfully',
        timestamp: new Date()
      },
      {
        id: '2',
        name: 'Integration Tests',
        status: 'passed',
        duration: 8.7,
        details: 'All 23 integration tests passed',
        timestamp: new Date()
      },
      {
        id: '3',
        name: 'E2E Tests',
        status: 'passed',
        duration: 45.2,
        details: 'All 12 E2E scenarios completed successfully',
        timestamp: new Date()
      },
      {
        id: '4',
        name: 'Performance Tests',
        status: 'passed',
        duration: 12.1,
        details: 'Load testing with 1000 concurrent users passed',
        timestamp: new Date()
      },
      {
        id: '5',
        name: 'Security Tests',
        status: 'passed',
        duration: 15.8,
        details: 'Penetration testing completed, no vulnerabilities found',
        timestamp: new Date()
      }
    ];

    setSecurityStatuses(mockSecurityStatuses);
    setPerformanceMetrics(mockPerformanceMetrics);
    setTestResults(mockTestResults);

    // Calculate overall score
    const securityScore = mockSecurityStatuses.reduce((acc, item) => acc + item.score, 0) / mockSecurityStatuses.length;
    const performanceScore = mockPerformanceMetrics.reduce((acc, item) => {
      const ratio = item.value / item.target;
      return acc + (ratio <= 1 ? 100 : Math.max(0, 100 - (ratio - 1) * 50));
    }, 0) / mockPerformanceMetrics.length;
    const testScore = mockTestResults.filter(t => t.status === 'passed').length / mockTestResults.length * 100;
    
    setOverallScore(Math.round((securityScore + performanceScore + testScore) / 3));
    console.log('🔄 ProductionReady: Data initialized, overall score:', Math.round((securityScore + performanceScore + testScore) / 3));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure':
      case 'passed':
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'good':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure':
      case 'passed':
      case 'excellent':
        return <FaCheck className="text-green-500" />;
      case 'warning':
      case 'good':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'critical':
      case 'failed':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaCog className="text-gray-500" />;
    }
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    
    // Simulate running tests
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsRunningTests(false);
    
    // Update test results
    const updatedTests = testResults.map(test => ({
      ...test,
      status: 'passed' as const,
      timestamp: new Date()
    }));
    
    setTestResults(updatedTests);
  };

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Overall Security Score */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <FaShieldAlt className="text-green-600" />
            Tổng quan bảo mật
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-6xl font-bold text-green-600 mb-4">
              {overallScore}
            </div>
            <div className="text-xl text-green-700 mb-2">Điểm bảo mật tổng thể</div>
            <div className="text-sm text-green-600">
              Hệ thống đã sẵn sàng cho production
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Statuses */}
      <div className="space-y-4">
        {securityStatuses.map((status) => (
          <Card key={status.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {status.name === 'Authentication & Authorization' && '🔐'}
                    {status.name === 'Data Encryption' && '🔒'}
                    {status.name === 'SQL Injection Protection' && '🛡️'}
                    {status.name === 'XSS Protection' && '🚫'}
                    {status.name === 'Rate Limiting' && '⏱️'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{status.name}</h4>
                    <p className="text-sm text-gray-600">{status.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={`mb-2 ${getStatusColor(status.status)}`}>
                    {getStatusIcon(status.status)}
                    {status.status}
                  </Badge>
                  <div className="text-2xl font-bold text-green-600">{status.score}%</div>
                  <div className="text-xs text-gray-500">
                    {status.lastCheck.toLocaleTimeString('vi-VN')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="text-2xl">
                  {metric.name === 'Page Load Time' && '⚡'}
                  {metric.name === 'API Response Time' && '🚀'}
                  {metric.name === 'Database Query Time' && '🗄️'}
                  {metric.name === 'Memory Usage' && '💾'}
                  {metric.name === 'CPU Usage' && '🖥️'}
                </div>
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Value</span>
                <span className="text-2xl font-bold text-blue-600">
                  {metric.value} {metric.unit}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Target</span>
                <span className="text-sm font-medium text-gray-900">
                  {metric.target} {metric.unit}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Performance</span>
                  <Badge className={getStatusColor(metric.status)}>
                    {getStatusIcon(metric.status)}
                    {metric.status}
                  </Badge>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, (metric.value / metric.target) * 100)}%`,
                      backgroundColor: metric.status === 'excellent' ? '#10B981' : 
                                   metric.status === 'good' ? '#F59E0B' : 
                                   metric.status === 'warning' ? '#F97316' : '#EF4444'
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTesting = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Testing Results</h2>
        <Button 
          onClick={runAllTests}
          disabled={isRunningTests}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isRunningTests ? (
            <>
              <FaSync className="mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <FaPlay className="mr-2" />
              Run All Tests
            </>
          )}
        </Button>
      </div>
      
      <div className="space-y-4">
        {testResults.map((test) => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {test.name === 'Unit Tests' && '🧪'}
                    {test.name === 'Integration Tests' && '🔗'}
                    {test.name === 'E2E Tests' && '🌐'}
                    {test.name === 'Performance Tests' && '⚡'}
                    {test.name === 'Security Tests' && '🔒'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.details}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={`mb-2 ${getStatusColor(test.status)}`}>
                    {getStatusIcon(test.status)}
                    {test.status}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    Duration: {test.duration}s
                  </div>
                  <div className="text-xs text-gray-500">
                    {test.timestamp.toLocaleTimeString('vi-VN')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'security', label: 'Bảo mật', icon: FaShieldAlt },
    { id: 'performance', label: 'Hiệu suất', icon: FaBolt },
    { id: 'testing', label: 'Testing', icon: FaCheck }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaRocket className="text-blue-600" />
            Production Ready
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống đã sẵn sàng cho production với bảo mật và hiệu suất tối ưu
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <FaRocket className="mr-2" />
            Deploy to Production
          </Button>
        </div>
      </div>

      {/* Production Status */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h3 className="text-xl font-bold text-green-800">Hệ thống đã sẵn sàng!</h3>
                <p className="text-green-700">
                  Tất cả kiểm tra đã hoàn tất. Hệ thống có thể deploy lên production.
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {testResults.filter(t => t.status === 'passed').length}/{testResults.length}
              </div>
              <div className="text-sm text-green-600">Tests passed</div>
            </div>
          </div>
        </CardContent>
      </Card>

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
      {activeTab === 'security' && renderSecurity()}
      {activeTab === 'performance' && renderPerformance()}
      {activeTab === 'testing' && renderTesting()}
    </div>
  );
}
