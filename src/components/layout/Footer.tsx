'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaGlobe, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaGraduationCap
} from 'react-icons/fa';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Khóa học',
      links: [
        { name: 'Tiếng Nhật', href: '/courses/japanese' },
        { name: 'Tiếng Trung', href: '/courses/chinese' },
        { name: 'Tiếng Anh', href: '/courses/english' },
        { name: 'Tiếng Hàn', href: '/courses/korean' },
        { name: 'Tiếng Việt', href: '/courses/vietnamese' },
      ]
    },
    {
      title: 'Học tập',
      links: [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Bài học', href: '/lessons' },
        { name: 'Luyện nghe', href: '/listening' },
        { name: 'Kiểm tra', href: '/test' },
        { name: 'Thành tích', href: '/achievements' },
      ]
    },
    {
      title: 'Cộng đồng',
      links: [
        { name: 'Diễn đàn', href: '/community' },
        { name: 'Giáo viên', href: '/teachers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Sự kiện', href: '/events' },
        { name: 'Thành viên VIP', href: '/vip' },
      ]
    },
    {
      title: 'Hỗ trợ',
      links: [
        { name: 'Trung tâm hỗ trợ', href: '/support' },
        { name: 'Liên hệ', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Hướng dẫn', href: '/guide' },
        { name: 'Báo lỗi', href: '/report-bug' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook />, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: <FaTwitter />, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: <FaInstagram />, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: <FaYoutube />, href: '#', color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: '#', color: 'hover:text-blue-700' },
  ];

  const features = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: 'Học nhanh',
      description: 'Phương pháp AI hiện đại giúp học hiệu quả gấp 3 lần'
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: 'An toàn',
      description: 'Bảo mật thông tin cá nhân với tiêu chuẩn quốc tế'
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      title: 'Cộng đồng',
      description: '15,000+ học viên đang học tập và chia sẻ kinh nghiệm'
    },
    {
      icon: <FaGraduationCap className="w-6 h-6" />,
      title: 'Chứng chỉ',
      description: 'Chứng chỉ được công nhận bởi các tổ chức giáo dục'
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      
      {/* Top Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                PHÚC KHIÊM Education - Nền tảng học ngoại ngữ thông minh với AI. 
                Giúp bạn học 5 ngôn ngữ một cách hiệu quả và thú vị nhất.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="w-4 h-4 text-primary-400" />
                  <span>contact@phuckhiem.edu.vn</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="w-4 h-4 text-primary-400" />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaMapMarkerAlt className="w-4 h-4 text-primary-400" />
                  <span>Hà Nội, Việt Nam</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-gray-700 hover:scale-110`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-4 text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>&copy; {currentYear} PHÚC KHIÊM Education. Tất cả quyền được bảo lưu.</span>
              <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="relative z-10 bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 text-white">
              Đăng ký nhận tin tức
            </h3>
            <p className="text-gray-300 mb-6">
              Nhận thông tin về khóa học mới và tips học ngoại ngữ hiệu quả
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
