'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown,
  GraduationCap,
  BookOpen,
  Trophy,
  Users,
  User,
  Search,
  Bell,
  Sparkles,
  Brain,
  Calendar,
  Settings,
  HelpCircle,
  Info
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  // 🎯 4 MENU CHÍNH + 1 MENU CÁ NHÂN (4+1 MODEL) - OPTIMIZED
  const navigationItems = [
    {
      name: 'HỌC TẬP',
      href: '/dashboard',
      icon: <GraduationCap size={18} />,
      color: 'from-blue-500 to-blue-600',
      dropdown: [
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Tiến độ', href: '/progress', icon: '📈' },
        { name: 'Thành tích', href: '/achievements', icon: '🏆' },
        { name: 'AI Coach', href: '/ai-coach', icon: '🤖' }
      ]
    },
    {
      name: 'KHÓA HỌC',
      href: '/courses',
      icon: <BookOpen size={18} />,
      color: 'from-orange-500 to-orange-600',
      dropdown: [
        { name: 'Tiếng Nhật', href: '/courses/japanese', icon: '🇯🇵' },
        { name: 'Tiếng Trung', href: '/courses/chinese', icon: '🇨🇳' },
        { name: 'Tiếng Anh', href: '/courses/english', icon: '🇺🇸' },
        { name: 'Tiếng Hàn', href: '/courses/korean', icon: '🇰🇷' },
        { name: 'Tiếng Việt', href: '/courses/vietnamese', icon: '🇻🇳' }
      ]
    },
    {
      name: 'LUYỆN THI',
      href: '/test',
      icon: <Trophy size={18} />,
      color: 'from-purple-500 to-purple-600',
      dropdown: [
        { name: 'JLPT', href: '/test/jlpt', icon: '🇯🇵' },
        { name: 'HSK', href: '/test/hsk', icon: '🇨🇳' },
        { name: 'TOEIC/IELTS', href: '/test/english', icon: '🇺🇸' },
        { name: 'TOPIK', href: '/test/topik', icon: '🇰🇷' },
        { name: 'VSL Test', href: '/test/vsl', icon: '🇻🇳' },
        { name: 'AI Mock Test', href: '/test/ai', icon: '🤖' }
      ]
    },
    {
      name: 'CỘNG ĐỒNG',
      href: '/community',
      icon: <Users size={18} />,
      color: 'from-green-500 to-green-600',
      dropdown: [
        { name: 'Diễn đàn', href: '/community/forum', icon: '💬' },
        { name: 'Nhóm học tập', href: '/community/groups', icon: '👥' },
        { name: 'Blog chia sẻ', href: '/community/blog', icon: '📝' },
        { name: 'Thách đấu', href: '/community/challenges', icon: '🎯' }
      ]
    }
  ];

  const profileMenuItems = [
    { 
      name: 'Hồ sơ cá nhân', 
      href: '/profile', 
      icon: <User size={16} />
    },
    { 
      name: 'Cài đặt', 
      href: '/settings', 
      icon: <Settings size={16} />
    },
    { 
      name: 'Hỗ trợ', 
      href: '/support', 
      icon: <HelpCircle size={16} />
    },
    { 
      name: 'Về trung tâm', 
      href: '/about', 
      icon: <Info size={16} />
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo Section - Left Side */}
          <div className="logo-container relative">
            <div className="logo-image relative">
              <Logo />
              {/* AI Sparkle Effect */}
              <div className="sparkle-effect">
                <Sparkles size={12} className="text-white" />
              </div>
              <div className="sparkle-effect delayed">
                <Brain size={12} className="text-white" />
              </div>
            </div>
            <div className="logo-text">
              <h1>PHÚC KHIÊM</h1>
              <p>Education</p>
            </div>
          </div>

          {/* Desktop Navigation - 4 MENU CHÍNH - OPTIMIZED SPACING */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className={`nav-item ${item.color} ${openDropdown === item.name ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                >
                  <span className="icon">{item.icon}</span>
                  {item.name}
                  <ChevronDown size={16} className="chevron" />
                </button>
                
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <div key={dropdownItem.name} className="dropdown-item">
                          <span className="item-icon">{dropdownItem.icon}</span>
                          <div className="item-content">
                            <span className="item-title">{dropdownItem.name}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Side - Actions + Profile - Enhanced */}
          <div className="right-actions hidden lg:flex items-center space-x-4">
            {/* Search - Enhanced */}
            <button className="action-button search">
              <Search size={20} />
            </button>

            {/* Notifications - Enhanced */}
            <button className="action-button notification relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* Profile Menu - Enhanced */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('profile')}
                className="profile-button flex items-center space-x-3"
              >
                <User size={18} />
                <span className="font-medium">Profile</span>
                <ChevronDown 
                  size={16} 
                  className="chevron transition-all duration-300" 
                />
              </button>

              <AnimatePresence>
                {openDropdown === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                    className="dropdown-menu absolute top-full right-0 mt-3"
                  >
                    <div className="space-y-3">
                      {profileMenuItems.map((menuItem) => (
                        <Link
                          key={menuItem.name}
                          href={menuItem.href}
                          onClick={closeAllDropdowns}
                          className="dropdown-item group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            {menuItem.icon}
                          </div>
                          <div className="item-content">
                            <span className="item-title">
                              {menuItem.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Auth Buttons - Enhanced */}
                    <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                      <Link
                        href="/auth/login"
                        className="auth-button login block w-full text-center"
                      >
                        Đăng nhập
                      </Link>
                      <Link
                        href="/auth/register"
                        className="auth-button register block w-full text-center"
                      >
                        Đăng ký
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle lg:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mobile-menu lg:hidden"
          >
            <div className="mobile-menu-content">
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <div className="mobile-menu-item">
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-semibold">{item.name}</span>
                    </div>
                    
                    {item.dropdown && (
                      <div className="ml-6 space-y-2 mt-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mobile-menu-item"
                          >
                            <span className="mr-3">{dropdownItem.icon}</span>
                            <span>{dropdownItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              <div className="mt-8 space-y-4">
                <button className="auth-button login">
                  Đăng nhập
                </button>
                <button className="auth-button register">
                  Đăng ký
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeAllDropdowns}
        />
      )}
    </header>
  );
}
