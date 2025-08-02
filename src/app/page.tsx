'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaBook, 
  FaGraduationCap, 
  FaHeadphones, 
  FaUsers, 
  FaTrophy,
  FaStar,
  FaPlay,
  FaArrowRight,
  FaGlobe,
  FaRocket,
  FaLightbulb,
  FaCheckCircle
} from 'react-icons/fa';
import { FeatureCard, StatsCard, TestimonialCard } from '@/components/ui/AnimatedCard';
import { CTAButton, ModernButton } from '@/components/ui/ModernButton';

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaBook className="text-2xl" />,
      title: "Học 5 Ngôn Ngữ",
      description: "Tiếng Nhật, Trung, Anh, Hàn, Việt với phương pháp hiện đại"
    },
    {
      icon: <FaGraduationCap className="text-2xl" />,
      title: "AI Hỗ Trợ",
      description: "Trợ lý AI thông minh giúp học tập hiệu quả hơn"
    },
    {
      icon: <FaHeadphones className="text-2xl" />,
      title: "Luyện Nghe",
      description: "Audio chất lượng cao với phát âm chuẩn bản xứ"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Học viên", trend: { value: 15, isPositive: true } },
    { value: "500+", label: "Bài học", trend: { value: 8, isPositive: true } },
    { value: "95%", label: "Hài lòng", trend: { value: 2, isPositive: true } },
    { value: "24/7", label: "Hỗ trợ", trend: { value: 0, isPositive: true } }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Học sinh",
      content: "Tôi đã học được rất nhiều từ khóa học này. Giao diện rất dễ sử dụng và nội dung rất hữu ích!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Trần Thị B",
      role: "Sinh viên",
      content: "Khóa học giúp tôi cải thiện đáng kể khả năng tiếng Nhật. Các bài tập rất thực tế!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lê Văn C",
      role: "Nhân viên văn phòng",
      content: "Tôi rất hài lòng với chất lượng khóa học. Giáo viên nhiệt tình và phương pháp học hiệu quả.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const languages = [
    { name: "Tiếng Nhật", level: "N5-N1", icon: "🇯🇵", color: "from-red-500 to-red-700" },
    { name: "Tiếng Trung", level: "HSK 1-6", icon: "🇨🇳", color: "from-red-600 to-yellow-500" },
    { name: "Tiếng Anh", level: "A1-C2", icon: "🇺🇸", color: "from-blue-500 to-red-500" },
    { name: "Tiếng Hàn", level: "TOPIK 1-6", icon: "🇰🇷", color: "from-blue-600 to-red-600" },
    { name: "Tiếng Việt", level: "Cơ bản", icon: "🇻🇳", color: "from-red-500 to-yellow-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Học Ngoại Ngữ
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Thông Minh
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Khám phá 5 ngôn ngữ với AI tutor thông minh, phương pháp học hiện đại và trải nghiệm học tập tuyệt vời
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <CTAButton onClick={() => window.location.href = '/courses'}>
                  Bắt đầu học ngay
                </CTAButton>
                
                <ModernButton
                  variant="outline"
                  size="lg"
                  icon={<FaPlay />}
                  onClick={() => window.open('/demo', '_blank')}
                >
                  Xem demo
                </ModernButton>
              </div>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  trend={stat.trend}
                  className="delay-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Công nghệ AI tiên tiến kết hợp với phương pháp học tập khoa học
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="delay-200"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              5 Ngôn Ngữ Chính
            </h2>
            <p className="text-xl text-gray-600">
              Từ cơ bản đến nâng cao, phù hợp mọi trình độ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {languages.map((language, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl p-6 text-center text-white bg-gradient-to-br ${language.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => window.location.href = `/courses/${language.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className="text-4xl mb-4">{language.icon}</div>
                <h3 className="text-xl font-bold mb-2">{language.name}</h3>
                <p className="text-sm opacity-90">{language.level}</p>
                
                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Học viên nói gì?
            </h2>
            <p className="text-xl text-gray-600">
              Những phản hồi chân thực từ học viên của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.content}
                author={testimonial.name}
                role={testimonial.role}
                avatar={testimonial.avatar}
                className="delay-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn sàng bắt đầu hành trình học tập?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cùng 10,000+ học viên đang học tập hiệu quả
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton onClick={() => window.location.href = '/auth/register'}>
              Đăng ký miễn phí
            </CTAButton>
            
            <ModernButton
              variant="ghost"
              size="lg"
              onClick={() => window.location.href = '/courses'}
            >
              Khám phá khóa học
            </ModernButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PHÚC KHIÊM EDU</h3>
              <p className="text-gray-400">
                Nền tảng học ngoại ngữ thông minh với AI
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Khóa học</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/courses/japanese" className="hover:text-white transition-colors">Tiếng Nhật</Link></li>
                <li><Link href="/courses/chinese" className="hover:text-white transition-colors">Tiếng Trung</Link></li>
                <li><Link href="/courses/english" className="hover:text-white transition-colors">Tiếng Anh</Link></li>
                <li><Link href="/courses/korean" className="hover:text-white transition-colors">Tiếng Hàn</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/support" className="hover:text-white transition-colors">Trung tâm hỗ trợ</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Liên hệ</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Về chúng tôi</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Theo dõi</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaGlobe className="text-xl" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaRocket className="text-xl" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PHÚC KHIÊM EDU. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
