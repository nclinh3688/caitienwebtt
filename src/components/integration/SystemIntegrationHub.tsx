'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaLink, 
  FaCog, 
  FaRocket, 
  FaChartLine, 
  FaUsers, 
  FaRobot,
  FaTrophy,
  FaBook,
  FaBrain,
  FaMagic,
  FaCheck,
  FaExclamationTriangle,
  FaClock,
  FaStar,
  FaCrown,
  FaSync,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
  FaDownload,
  FaPlay,
  FaStop,
  FaEye,
  FaLock,
  FaUnlock,
  FaBolt
} from 'react-icons/fa';

interface SystemStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  health: number;
  responseTime: number;
  uptime: number;
  lastCheck: Date;
}

interface IntegrationFlow {
  id: string;
  source: string;
  target: string;
  status: 'active' | 'inactive' | 'error';
  dataFlow: number;
  lastSync: Date;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

export default function SystemIntegrationHub() {
  const [systemStatuses, setSystemStatuses] = useState<SystemStatus[]>([]);
  const [integrationFlows, setIntegrationFlows] = useState<IntegrationFlow[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    console.log('🔄 SystemIntegrationHub: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 SystemIntegrationHub: Initializing data');
    
    // System Statuses
    const mockSystemStatuses: SystemStatus[] = [
      {
        id: '1',
        name: 'Content Management System',
        status: 'online',
        health: 95,
        responseTime: 120,
        uptime: 99.8,
        lastCheck: new Date()
      },
      {
        id: '2',
        name: 'AI Exercise Generator',
        status: 'online',
        health: 92,
        responseTime: 180,
        uptime: 99.5,
        lastCheck: new Date()
      },
      {
        id: '3',
        name: 'Enhanced Gamification',
        status: 'online',
        health: 98,
        responseTime: 95,
        uptime: 99.9,
        lastCheck: new Date()
      },
      {
        id: '4',
        name: 'Analytics Dashboard',
        status: 'online',
        health: 94,
        responseTime: 150,
        uptime: 99.7,
        lastCheck: new Date()
      }
    ];

    // Integration Flows
    const mockIntegrationFlows: IntegrationFlow[] = [
      {
        id: '1',
        source: 'Content Management',
        target: 'AI Generator',
        status: 'active',
        dataFlow: 1250,
        lastSync: new Date()
      },
      {
        id: '2',
        source: 'AI Generator',
        target: 'Gamification',
        status: 'active',
        dataFlow: 890,
        lastSync: new Date()
      },
      {
        id: '3',
        source: 'Gamification',
        target: 'Analytics',
        status: 'active',
        dataFlow: 2100,
        lastSync: new Date()
      },
      {
        id: '4',
        source: 'Analytics',
        target: 'Content Management',
        status: 'active',
        dataFlow: 750,
        lastSync: new Date()
      }
    ];

    // Performance Metrics
    const mockPerformanceMetrics: PerformanceMetric[] = [
      {
        id: '1',
        name: 'Overall System Health',
        value: 94.8,
        target: 95,
        unit: '%',
        status: 'good'
      },
      {
        id: '2',
        name: 'Average Response Time',
        value: 136,
        target: 150,
        unit: 'ms',
        status: 'excellent'
      },
      {
        id: '3',
        name: 'Data Throughput',
        value: 1250,
        target: 1000,
        unit: 'req/s',
        status: 'excellent'
      },
      {
        id: '4',
        name: 'Error Rate',
        value: 0.2,
        target: 0.5,
        unit: '%',
        status: 'excellent'
      }
    ];

    setSystemStatuses(mockSystemStatuses);
    setIntegrationFlows(mockIntegrationFlows);
    setPerformanceMetrics(mockPerformanceMetrics);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStatuses.map((system) => (
          <Card key={system.id} className={`border-2 ${
            system.status === 'online' ? 'border-green-200 bg-green-50' :
            system.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
            system.status === 'offline' ? 'border-red-200 bg-red-50' :
            'border-gray-200 bg-gray-50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{system.name}</h3>
                <Badge className={
                  system.status === 'online' ? 'bg-green-100 text-green-800' :
                  system.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  system.status === 'offline' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }>
                  {system.status === 'online' ? '🟢 Online' :
                   system.status === 'warning' ? '🟡 Warning' :
                   system.status === 'offline' ? '🔴 Offline' :
                   '⚫ Maintenance'}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Health Score</span>
                    <span className="font-medium">{system.health}%</span>
                  </div>
                  <Progress value={system.health} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Response:</span>
                    <div className="font-medium">{system.responseTime}ms</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Uptime:</span>
                    <div className="font-medium">{system.uptime}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaLink className="text-blue-600" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrationFlows.map((flow) => (
              <div key={flow.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    flow.status === 'active' ? 'bg-green-500' :
                    flow.status === 'inactive' ? 'bg-gray-400' :
                    'bg-red-500'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{flow.source} → {flow.target}</div>
                    <div className="text-xs text-gray-500">
                      {flow.dataFlow} req/s • Last sync: {flow.lastSync.toLocaleTimeString('vi-VN')}
                    </div>
                  </div>
                </div>
                <Badge className={
                  flow.status === 'active' ? 'bg-green-100 text-green-800' :
                  flow.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }>
                  {flow.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegration = () => (
    <div className="space-y-6">
      {/* Integration Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaNetworkWired className="text-purple-600" />
            Integration Flow Diagram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative p-8">
            {/* Content Management */}
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2">
              <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center">
                <FaBook className="text-blue-600 text-2xl mx-auto mb-2" />
                <div className="font-medium text-sm">Content Management</div>
                <div className="text-xs text-blue-600">System 1</div>
              </div>
            </div>
            
            {/* AI Generator */}
            <div className="absolute top-1/3 right-0">
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
                <FaRobot className="text-green-600 text-2xl mx-auto mb-2" />
                <div className="font-medium text-sm">AI Generator</div>
                <div className="text-xs text-green-600">System 2</div>
              </div>
            </div>
            
            {/* Gamification */}
            <div className="absolute bottom-1/3 left-0">
              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center">
                <FaTrophy className="text-purple-600 text-2xl mx-auto mb-2" />
                <div className="font-medium text-sm">Gamification</div>
                <div className="text-xs text-purple-600">System 3</div>
              </div>
            </div>
            
            {/* Analytics */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 text-center">
                <FaChartLine className="text-orange-600 text-2xl mx-auto mb-2" />
                <div className="font-medium text-sm">Analytics</div>
                <div className="text-xs text-orange-600">System 4</div>
              </div>
            </div>
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                </marker>
              </defs>
              <path d="M 25% 50 L 75% 33%" stroke="#6b7280" strokeWidth="2" 
                markerEnd="url(#arrowhead)" fill="none" />
              <path d="M 75% 67% L 25% 67%" stroke="#6b7280" strokeWidth="2" 
                markerEnd="url(#arrowhead)" fill="none" />
              <path d="M 0 67% L 25% 100%" stroke="#6b7280" strokeWidth="2" 
                markerEnd="url(#arrowhead)" fill="none" />
              <path d="M 25% 0 L 50% 100%" stroke="#6b7280" strokeWidth="2" 
                markerEnd="url(#arrowhead)" fill="none" />
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Integration Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaSync className="text-blue-600" />
              Data Synchronization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {integrationFlows.map((flow) => (
                <div key={flow.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="text-sm">
                    <span className="font-medium">{flow.source}</span>
                    <span className="mx-2">→</span>
                    <span className="font-medium">{flow.target}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {flow.dataFlow} req/s
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCog className="text-green-600" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Auto-sync</span>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Error Handling</span>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Retry Policy</span>
                <Badge className="bg-blue-100 text-blue-800">3 attempts</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Monitoring</span>
                <Badge className="bg-green-100 text-green-800">Real-time</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <FaChartLine className="text-blue-600" />
                {metric.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Target: {metric.target}{metric.unit}</span>
                  <Badge className={
                    metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                    metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                    metric.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {metric.status}
                  </Badge>
                </div>
                <Progress 
                  value={(metric.value / metric.target) * 100} 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaEye className="text-purple-600" />
            Real-time Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">System Monitoring</span>
              <Button
                size="sm"
                onClick={() => setIsMonitoring(!isMonitoring)}
                className={isMonitoring ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
              >
                {isMonitoring ? <FaStop className="mr-2" /> : <FaPlay className="mr-2" />}
                {isMonitoring ? 'Stop' : 'Start'}
              </Button>
            </div>
            
            {isMonitoring && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Network I/O</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Disk I/O</span>
                  <span className="font-medium">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'integration', label: 'Tích hợp', icon: FaLink },
    { id: 'performance', label: 'Hiệu suất', icon: FaBolt }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaCrown className="text-yellow-600" />
            System Integration Hub
          </h1>
          <p className="text-gray-600 mt-1">
            Trung tâm tích hợp và quản lý tất cả 4 systems PHÚC KHIÊM EDU
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket className="mr-2" />
            Launch System
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
      {activeTab === 'integration' && renderIntegration()}
      {activeTab === 'performance' && renderPerformance()}
    </div>
  );
}
