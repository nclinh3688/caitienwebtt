'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaChartLine, 
  FaChartBar, 
  FaChartPie, 
  FaChartArea, 
  FaDownload,
  FaShare,
  FaSync,
  FaEye,
  FaEyeSlash,
  FaFilter,
  FaCog,
  FaRocket,
  FaCrown,
  FaStar,
  FaTrophy,
  FaUsers,
  FaBook,
  FaBrain,
  FaMagic
} from 'react-icons/fa';

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface TimeSeriesData {
  date: string;
  value: number;
  category: string;
}

interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area';
  title: string;
  description: string;
  data: ChartData[] | TimeSeriesData[];
  options: any;
}

export default function AdvancedCharts() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [isDataVisible, setIsDataVisible] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  useEffect(() => {
    console.log('🔄 AdvancedCharts: useEffect triggered');
    initializeData();
  }, []);

  const initializeData = () => {
    console.log('🔄 AdvancedCharts: Initializing data');
    
    // Mock chart data
    const mockChartData: ChartData[] = [
      {
        id: '1',
        label: 'Grammar Mastery',
        value: 85,
        color: '#3B82F6',
        trend: 'up'
      },
      {
        id: '2',
        label: 'Vocabulary Building',
        value: 72,
        color: '#10B981',
        trend: 'up'
      },
      {
        id: '3',
        label: 'Listening Comprehension',
        value: 68,
        color: '#F59E0B',
        trend: 'stable'
      },
      {
        id: '4',
        label: 'Speaking Fluency',
        value: 45,
        color: '#EF4444',
        trend: 'down'
      }
    ];

    // Mock time series data
    const mockTimeSeriesData: TimeSeriesData[] = [
      { date: '2024-01', value: 65, category: 'Grammar' },
      { date: '2024-02', value: 68, category: 'Grammar' },
      { date: '2024-03', value: 72, category: 'Grammar' },
      { date: '2024-04', value: 75, category: 'Grammar' },
      { date: '2024-05', value: 78, category: 'Grammar' },
      { date: '2024-06', value: 82, category: 'Grammar' },
      { date: '2024-07', value: 85, category: 'Grammar' },
      { date: '2024-01', value: 45, category: 'Vocabulary' },
      { date: '2024-02', value: 48, category: 'Vocabulary' },
      { date: '2024-03', value: 52, category: 'Vocabulary' },
      { date: '2024-04', value: 58, category: 'Vocabulary' },
      { date: '2024-05', value: 62, category: 'Vocabulary' },
      { date: '2024-06', value: 68, category: 'Vocabulary' },
      { date: '2024-07', value: 72, category: 'Vocabulary' }
    ];

    setChartData(mockChartData);
    setTimeSeriesData(mockTimeSeriesData);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            Chart Type Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'line', label: 'Line Chart', icon: FaChartLine, color: 'text-blue-600' },
              { type: 'bar', label: 'Bar Chart', icon: FaChartBar, color: 'text-green-600' },
              { type: 'pie', label: 'Pie Chart', icon: FaChartPie, color: 'text-purple-600' },
              { type: 'area', label: 'Area Chart', icon: FaChartArea, color: 'text-orange-600' }
            ].map((chartType) => {
              const Icon = chartType.icon;
              return (
                <button
                  key={chartType.type}
                  onClick={() => setSelectedChartType(chartType.type)}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedChartType === chartType.type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`text-3xl mx-auto mb-2 ${chartType.color}`} />
                  <div className="font-medium text-gray-900">{chartType.label}</div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedChartType === 'line' && <FaChartLine className="text-blue-600" />}
              {selectedChartType === 'bar' && <FaChartBar className="text-green-600" />}
              {selectedChartType === 'pie' && <FaChartPie className="text-purple-600" />}
              {selectedChartType === 'area' && <FaChartArea className="text-orange-600" />}
              {selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)} Chart
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDataVisible(!isDataVisible)}
              >
                {isDataVisible ? <FaEye /> : <FaEyeSlash />}
              </Button>
              <Button variant="outline" size="sm">
                <FaDownload />
              </Button>
              <Button variant="outline" size="sm">
                <FaShare />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chart Placeholder */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <FaChartLine className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  {selectedChartType.charAt(0).toUpperCase() + selectedChartType.slice(1)} Chart
                </p>
                <p className="text-sm text-gray-400">Interactive visualization</p>
              </div>
            </div>

            {/* Chart Data Table */}
            {isDataVisible && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Label</th>
                      <th className="text-left p-2 font-medium">Value</th>
                      <th className="text-left p-2 font-medium">Trend</th>
                      <th className="text-left p-2 font-medium">Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{item.label}</td>
                        <td className="p-2 font-medium">{item.value}%</td>
                        <td className="p-2">
                          <Badge className={
                            item.trend === 'up' ? 'bg-green-100 text-green-800' :
                            item.trend === 'down' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {item.trend === 'up' ? '↗ Improving' : 
                             item.trend === 'down' ? '↘ Declining' : '→ Stable'}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-500">{item.color}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Chart Analytics</h3>
              <p className="text-gray-600">Advanced insights and data analysis</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {chartData.length}
              </div>
              <div className="text-sm text-purple-600">Data Points</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(chartData.reduce((acc, item) => acc + item.value, 0) / chartData.length)}%
                </p>
              </div>
              <FaChartLine className="text-blue-500 text-2xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Highest Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...chartData.map(item => item.value))}%
                </p>
              </div>
              <FaTrophy className="text-yellow-500 text-2xl" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Improving Trends</p>
                <p className="text-2xl font-bold text-gray-900">
                  {chartData.filter(item => item.trend === 'up').length}
                </p>
              </div>
              <FaStar className="text-green-500 text-2xl" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Series Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaChartArea className="text-orange-600" />
            Time Series Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Timeframe:</span>
              <div className="flex gap-2">
                {['week', 'month', 'quarter', 'year'].map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      selectedTimeframe === timeframe
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <FaChartArea className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Time Series Chart</p>
                <p className="text-sm text-gray-400">Showing {selectedTimeframe} data</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderConfiguration = () => (
    <div className="space-y-6">
      {/* Configuration Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Chart Configuration</h3>
              <p className="text-gray-600">Customize chart appearance and behavior</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                <FaCog className="text-4xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaEye className="text-green-600" />
              Display Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Data Labels</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Grid Lines</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Legend</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Animate Charts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaFilter className="text-purple-600" />
              Data Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Min Value Threshold</label>
                <input 
                  type="number" 
                  defaultValue={0} 
                  className="w-full mt-1 px-3 py-2 border rounded-md" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Value Threshold</label>
                <input 
                  type="number" 
                  defaultValue={100} 
                  className="w-full mt-1 px-3 py-2 border rounded-md" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Trend Filter</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option value="all">All Trends</option>
                  <option value="up">Improving Only</option>
                  <option value="down">Declining Only</option>
                  <option value="stable">Stable Only</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaDownload className="text-blue-600" />
            Export & Share
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">
              <FaDownload className="mr-2" />
              PNG Image
            </Button>
            <Button variant="outline" className="w-full">
              <FaDownload className="mr-2" />
              PDF Report
            </Button>
            <Button variant="outline" className="w-full">
              <FaShare className="mr-2" />
              Share Link
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: FaChartLine },
    { id: 'analytics', label: 'Phân tích', icon: FaChartBar },
    { id: 'configuration', label: 'Cấu hình', icon: FaCog }
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
            Advanced Charts
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống biểu đồ nâng cao với AI và real-time data
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
            <FaSync className="mr-2" />
            Refresh Data
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket className="mr-2" />
            Generate Report
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
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'configuration' && renderConfiguration()}
    </div>
  );
}
