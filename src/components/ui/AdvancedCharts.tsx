'use client';

import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FaChartLine, FaChartBar, FaChartPie, FaArrowUp } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { AnimatedCounter } from '@/components/ui/MagicEffects';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale
);

// 📊 Advanced Learning Progress Chart
export function LearningProgressChart({ data, className = '' }: {
  data: any;
  className?: string;
}) {
  const [animatedData, setAnimatedData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate chart data on mount
    setTimeout(() => setIsVisible(true), 300);
    
    if (isVisible && data) {
      const timer = setTimeout(() => {
        setAnimatedData({
          labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5', 'Tuần 6'],
          datasets: [
            {
              label: 'Tiến độ học tập',
              data: [20, 35, 50, 65, 78, 85],
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: 'rgb(59, 130, 246)',
              pointBorderColor: '#fff',
              pointBorderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointHoverBackgroundColor: 'rgb(147, 51, 234)',
              pointHoverBorderColor: '#fff',
            },
            {
              label: 'Mục tiêu',
              data: [25, 40, 55, 70, 80, 90],
              borderColor: 'rgb(16, 185, 129)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 2,
              borderDash: [5, 5],
              fill: false,
              tension: 0.4,
              pointRadius: 0,
            }
          ]
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, data]);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic',
    },
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:shadow-glow transition-all duration-300">
            <FaChartLine className="w-5 h-5 text-white" />
          </div>
          <span>Tiến độ học tập</span>
          <HiSparkles className="w-5 h-5 text-yellow-500 animate-sparkle" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {animatedData ? (
            <Line data={animatedData} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-ping" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 📊 Skills Radar Chart
export function SkillsRadarChart({ className = '' }: { className?: string }) {
  const [animatedData, setAnimatedData] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        labels: ['Nghe', 'Nói', 'Đọc', 'Viết', 'Ngữ pháp', 'Từ vựng'],
        datasets: [
          {
            label: 'Trình độ hiện tại',
            data: [85, 70, 92, 78, 88, 82],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
          },
          {
            label: 'Mục tiêu',
            data: [90, 85, 95, 88, 92, 90],
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2,
            borderDash: [5, 5],
            pointBackgroundColor: 'rgb(16, 185, 129)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
          }
        ]
      });
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 10,
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        pointLabels: {}
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold',
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
      }
    },
    animation: {
      duration: 2500,
      easing: 'easeOutElastic' as const,
    },
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg group-hover:shadow-glow transition-all duration-300">
            <FaChartPie className="w-5 h-5 text-white" />
          </div>
          <span>Kỹ năng ngôn ngữ</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          {animatedData ? (
            <Radar data={animatedData} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-ping" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 📊 Study Time Distribution
export function StudyTimeChart({ className = '' }: { className?: string }) {
  const [animatedData, setAnimatedData] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        labels: ['Từ vựng', 'Ngữ pháp', 'Luyện nghe', 'Luyện nói', 'Đọc hiểu', 'Viết'],
        datasets: [
          {
            data: [25, 20, 15, 12, 18, 10],
            backgroundColor: [
              'rgba(59, 130, 246, 0.8)',
              'rgba(147, 51, 234, 0.8)',
              'rgba(16, 185, 129, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(139, 92, 246, 0.8)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(147, 51, 234)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
              'rgb(139, 92, 246)',
            ],
            borderWidth: 2,
            hoverOffset: 8,
          }
        ]
      });
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((context.parsed * 100) / total);
            return `${context.label}: ${percentage}% (${context.parsed}h)`;
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce' as const,
    },
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:shadow-glow transition-all duration-300">
            <FaChartBar className="w-5 h-5 text-white" />
          </div>
          <span>Phân bổ thời gian học</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {animatedData ? (
            <Doughnut data={animatedData} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-ping" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 📊 Weekly Activity Chart
export function WeeklyActivityChart({ className = '' }: { className?: string }) {
  const [animatedData, setAnimatedData] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData({
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [
          {
            label: 'Phút học (tuần này)',
            data: [45, 60, 30, 75, 90, 35, 20],
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Phút học (tuần trước)',
            data: [35, 50, 45, 65, 80, 25, 15],
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      });
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'bold',
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y} phút`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 'bold',
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return value + 'p';
          }
        }
      },
    },
    animation: {
      duration: 1800,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg group-hover:shadow-glow transition-all duration-300">
            <FaArrowUp className="w-5 h-5 text-white" />
          </div>
          <span>Hoạt động trong tuần</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          {animatedData ? (
            <Bar data={animatedData} options={options} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-ping" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// 📊 Quick Stats Cards with Animations
export function QuickStatsCards({ data, className = '' }: {
  data: any;
  className?: string;
}) {
  const stats = [
    {
      title: 'Streak hiện tại',
      value: 15,
      suffix: ' ngày',
      icon: '🔥',
      color: 'from-orange-500 to-red-500',
      trend: '+2 từ tuần trước'
    },
    {
      title: 'Từ vựng đã học',
      value: 1250,
      suffix: ' từ',
      icon: '📚',
      color: 'from-blue-500 to-purple-500',
      trend: '+85 tuần này'
    },
    {
      title: 'Thời gian học',
      value: 127,
      suffix: ' giờ',
      icon: '⏰',
      color: 'from-emerald-500 to-teal-500',
      trend: '+12h tuần này'
    },
    {
      title: 'Bài học hoàn thành',
      value: 42,
      suffix: ' bài',
      icon: '✅',
      color: 'from-purple-500 to-pink-500',
      trend: '+5 bài tuần này'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className="group hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-xl group-hover:shadow-glow transition-all duration-300`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    duration={1500 + index * 200}
                  />
                </div>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </div>
            <div className="text-xs text-emerald-600 font-medium">
              {stat.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}