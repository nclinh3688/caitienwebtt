'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AIContentGenerator from '@/components/ai/AIContentGenerator';
import { LoadingSpinner, SlideIn } from '@/components/ui/LoadingSpinner';
import { 
  FaBrain, 
  FaMagic, 
  FaRobot, 
  FaStar,
  FaChartLine,
  FaLightbulb,
  FaFire,
  FaBookOpen,
  FaHeadphones,
  FaMicrophone,
  FaPencilAlt,
  FaGamepad,
  FaGraduationCap,
  FaTrophy,
  FaPlay
} from 'react-icons/fa';

export default function AIContentPage() {
  const { data: session, status } = useSession();
  const [userPreferences, setUserPreferences] = useState({
    language: 'japanese',
    currentLevel: 'beginner', 
    learningGoals: ['conversation', 'grammar'],
    weakAreas: ['pronunciation', 'listening']
  });

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <LoadingSpinner size="lg" variant="primary" text="Đang tải AI Content Generator..." />
      </div>
    );
  }

  const features = [
    {
      icon: FaBrain,
      title: 'AI Thông minh',
      description: 'Sử dụng Google Gemini để tạo nội dung chất lượng cao',
      color: 'purple'
    },
    {
      icon: FaStar,
      title: 'Cá nhân hóa',
      description: 'Dựa trên trình độ và mục tiêu học tập riêng',
      color: 'blue'
    },
    {
      icon: FaChartLine,
      title: 'Adaptive Difficulty',
      description: 'Độ khó tự động điều chỉnh theo năng lực',
      color: 'green'
    },
    {
      icon: FaFire,
      title: 'Đa dạng nội dung',
      description: 'Từ vựng, ngữ pháp, nghe, nói, đọc hiểu',
      color: 'orange'
    }
  ];

  const contentTypes = [
    { icon: FaBookOpen, name: 'Từ vựng', count: '1000+ words', color: 'blue' },
    { icon: FaPencilAlt, name: 'Ngữ pháp', count: '200+ patterns', color: 'green' },
    { icon: FaHeadphones, name: 'Nghe hiểu', count: '500+ audio', color: 'purple' },
    { icon: FaMicrophone, name: 'Phát âm', count: '300+ exercises', color: 'orange' },
    { icon: FaGamepad, name: 'Tổng hợp', count: 'Unlimited', color: 'red' },
    { icon: FaGraduationCap, name: 'Test AI', count: 'Smart tests', color: 'indigo' }
  ];

  const aiCapabilities = [
    '🧠 Phân tích trình độ học viên real-time',
    '📚 Tạo nội dung từ database khổng lồ', 
    '🎯 Personalization dựa trên learning path',
    '⚡ Adaptive difficulty theo performance',
    '💡 Smart hints và explanations',
    '📊 Analytics và progress tracking',
    '🔄 Continuous improvement từ feedback',
    '🌍 Multi-language support (5 ngôn ngữ)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <SlideIn direction="down" className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
                🧠 AI Content Generator
              </h1>
              <p className="text-xl lg:text-2xl text-gray-700 mb-6">
                Công nghệ AI tiên tiến tạo nội dung học tập cá nhân hóa
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Trải nghiệm học ngoại ngữ mới với AI Content Generator - 
                công cụ thông minh tạo bài tập, quiz và nội dung học tập được cá nhân hóa 
                100% dựa trên trình độ và mục tiêu của bạn.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="p-4 bg-white/70 backdrop-blur rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-gray-600">Unlimited Content</div>
                </div>
                <div className="p-4 bg-white/70 backdrop-blur rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-sm text-gray-600">Languages</div>
                </div>
                <div className="p-4 bg-white/70 backdrop-blur rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Personalized</div>
                </div>
                <div className="p-4 bg-white/70 backdrop-blur rounded-lg border">
                  <div className="text-2xl font-bold text-orange-600">AI</div>
                  <div className="text-sm text-gray-600">Powered</div>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Features Section */}
          <SlideIn direction="up" delay={200} className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              ✨ Tính năng đột phá
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group">
                  <Card className="h-full border-2 hover:border-purple-300 transition-all duration-300 hover:shadow-xl bg-white/80 backdrop-blur">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex p-4 rounded-full bg-${feature.color}-100 mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className={`text-2xl text-${feature.color}-600`} />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </SlideIn>

          {/* Content Types */}
          <SlideIn direction="left" delay={400} className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              📚 Loại nội dung có thể tạo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {contentTypes.map((type, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur">
                  <CardContent className="p-4 text-center">
                    <div className={`inline-flex p-3 rounded-full bg-${type.color}-100 mb-3 group-hover:scale-110 transition-transform`}>
                      <type.icon className={`text-xl text-${type.color}-600`} />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{type.name}</h4>
                    <p className="text-xs text-gray-500">{type.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SlideIn>

          {/* AI Capabilities */}
          <SlideIn direction="right" delay={600} className="mb-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  🚀 Sức mạnh AI đằng sau
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Được trang bị công nghệ AI tiên tiến nhất từ Google Gemini, 
                  hệ thống có thể hiểu sâu về ngôn ngữ và tạo ra nội dung 
                  chất lượng ngang tầm giáo viên chuyên nghiệp.
                </p>
                
                <div className="space-y-3">
                  {aiCapabilities.map((capability, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-purple-200">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="inline-flex p-6 bg-white rounded-full shadow-lg mb-4">
                        <FaRobot className="text-4xl text-purple-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-purple-800">AI Engine</h3>
                      <p className="text-purple-600">Google Gemini Pro</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Processing Power</span>
                        <div className="w-24 h-2 bg-purple-200 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-purple-600 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Learning Analytics</span>
                        <div className="w-24 h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div className="w-5/6 h-full bg-blue-600 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Personalization</span>
                        <div className="w-24 h-2 bg-green-200 rounded-full overflow-hidden">
                          <div className="w-full h-full bg-green-600 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SlideIn>

          {/* Main Content Generator */}
          <SlideIn direction="up" delay={800} className="mb-12">
            <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur">
              <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <FaMagic className="text-purple-600" />
                  🎯 Tạo nội dung AI ngay bây giờ
                </CardTitle>
                <p className="text-gray-600 mt-2">
                  Trải nghiệm sức mạnh AI Content Generator với tài khoản của bạn
                </p>
              </CardHeader>
              <CardContent className="p-6">
                {status === "authenticated" ? (
                  <AIContentGenerator
                    userId={session?.user?.email || undefined}
                    language={userPreferences.language}
                    currentLevel={userPreferences.currentLevel}
                    learningGoals={userPreferences.learningGoals}
                    weakAreas={userPreferences.weakAreas}
                  />
                ) : (
                  <div className="text-center space-y-6 py-12">
                    <div className="inline-flex p-6 bg-blue-100 rounded-full">
                      <FaGraduationCap className="text-4xl text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Đăng nhập để sử dụng AI Generator</h3>
                      <p className="text-gray-600 mb-6">
                        Tạo tài khoản miễn phí để trải nghiệm công nghệ AI Content Generator
                      </p>
                      <div className="flex gap-4 justify-center">
                        <Button 
                          onClick={() => window.location.href = '/auth/login'}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Đăng nhập
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => window.location.href = '/auth/register'}
                        >
                          Đăng ký miễn phí
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </SlideIn>

          {/* Success Stories */}
          <SlideIn direction="up" delay={1000}>
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <FaTrophy className="text-yellow-500" />
                  🌟 Thành tựu từ AI Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-600">95%</div>
                    <p className="text-gray-600">Học viên hài lòng với nội dung AI</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">3x</div>
                    <p className="text-gray-600">Tốc độ học nhanh hơn với AI</p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-600">10M+</div>
                    <p className="text-gray-600">Câu hỏi đã được tạo bởi AI</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </SlideIn>
        </div>
      </div>
    </div>
  );
}