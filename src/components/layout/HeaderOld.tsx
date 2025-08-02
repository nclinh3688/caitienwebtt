'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaGlobe,
  FaMoon,
  FaSun,
  FaBook,
  FaGraduationCap,
  FaBrain,
  FaUsers,
  FaInfoCircle,
  FaFlag,
  FaPlay,
  FaStar,
  FaHeadphones,
  FaTrophy,
  FaChartLine,
  FaLightbulb
} from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { LogoLink } from '@/components/ui/Logo';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('VI');
  const [notifications, setNotifications] = useState(3);
  const { data: session } = useSession();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside search and dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close search dropdown
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }

      // Close navigation dropdowns
      const target = event.target as Node;
      const dropdownElements = document.querySelectorAll('[data-dropdown]');
      let clickedInsideDropdown = false;
      
      dropdownElements.forEach(element => {
        if (element.contains(target)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navigationItems = [
    {
      name: 'Khóa học',
      href: '/courses',
      icon: <FaBook className="w-4 h-4" />,
      dropdown: [
        { 
          name: 'Tiếng Nhật', 
          href: '/courses/japanese', 
          icon: '🇯🇵', 
          description: 'JLPT N5-N1, Giao tiếp, Phát âm',
          badge: 'HOT'
        },
        { 
          name: 'Tiếng Trung', 
          href: '/courses/chinese', 
          icon: '🇨🇳', 
          description: 'HSK 1-6, Giao tiếp thương mại'
        },
        { 
          name: 'Tiếng Anh', 
          href: '/courses/english', 
          icon: '🇺🇸', 
          description: 'TOEIC, IELTS, Giao tiếp'
        },
        { 
          name: 'Tiếng Hàn', 
          href: '/courses/korean', 
          icon: '🇰🇷', 
          description: 'TOPIK 1-6, K-pop, Văn hóa'
        },
        { 
          name: 'Tiếng Việt', 
          href: '/courses/vietnamese', 
          icon: '🇻🇳', 
          description: 'Cho người nước ngoài'
        },
        { 
          name: 'Tiếng Đức', 
          href: '/courses/german', 
          icon: '🇩🇪', 
          description: 'A1-C2, Du học, Định cư'
        },
      ]
    },
    {
      name: 'Luyện thi',
      href: '/test',
      icon: <FaGraduationCap className="w-4 h-4" />,
      dropdown: [
        { 
          name: 'JLPT (Nhật)', 
          href: '/test/jlpt', 
          icon: <FaTrophy />,
          description: 'N5, N4, N3, N2, N1'
        },
        { 
          name: 'HSK (Trung)', 
          href: '/test/hsk', 
          icon: <FaTrophy />,
          description: 'HSK 1-6, HSKK'
        },
        { 
          name: 'TOEIC (Anh)', 
          href: '/test/toeic', 
          icon: <FaTrophy />,
          description: 'Listening & Reading'
        },
        { 
          name: 'TOPIK (Hàn)', 
          href: '/test/topik', 
          icon: <FaTrophy />,
          description: 'TOPIK I, TOPIK II'
        },
        { 
          name: 'IELTS (Anh)', 
          href: '/test/ielts', 
          icon: <FaTrophy />,
          description: 'Academic & General'
        },
      ]
    },
    {
      name: 'AI Features',
      href: '/ai-content',
      icon: <FaBrain className="w-4 h-4" />,
      badge: 'NEW',
      dropdown: [
        { 
          name: 'AI Chat Tutor', 
          href: '/ai-content', 
          icon: <FaBrain />,
          description: 'Trò chuyện với AI 24/7'
        },
        { 
          name: 'Phân tích phát âm', 
          href: '/pronunciation', 
          icon: <FaPlay />,
          description: 'Đánh giá chính xác 99%'
        },
        { 
          name: 'Tạo bài học', 
          href: '/practice/ai-generated', 
          icon: <FaBook />,
          description: 'Bài học cá nhân hóa'
        },
        { 
          name: 'Đánh giá trình độ', 
          href: '/assessment', 
          icon: <FaChartLine />,
          description: 'Test miễn phí'
        },
      ]
    },
    {
      name: 'Giáo viên',
      href: '/teachers',
      icon: <FaUsers className="w-4 h-4" />,
      dropdown: [
        { 
          name: 'Danh sách giáo viên', 
          href: '/teachers', 
          icon: <FaUsers />,
          description: '100+ giáo viên chất lượng'
        },
        { 
          name: 'Đặt lịch học', 
          href: '/booking', 
          icon: <FaBook />,
          description: '1-1, nhóm nhỏ'
        },
        { 
          name: 'Đánh giá', 
          href: '/reviews', 
          icon: <FaStar />,
          description: 'Xem feedback học viên'
        },
      ]
    },
    {
      name: 'Về chúng tôi',
      href: '/about',
      icon: <FaInfoCircle className="w-4 h-4" />,
      dropdown: [
        { 
          name: 'Giới thiệu', 
          href: '/about', 
          icon: <FaInfoCircle />,
          description: 'Sứ mệnh & Tầm nhìn'
        },
        { 
          name: 'Đội ngũ', 
          href: '/team', 
          icon: <FaUsers />,
          description: 'Chuyên gia ngôn ngữ'
        },
        { 
          name: 'Tin tức', 
          href: '/news', 
          icon: <FaBook />,
          description: 'Cập nhật mới nhất'
        },
        { 
          name: 'Liên hệ', 
          href: '/contact', 
          icon: <FaInfoCircle />,
          description: 'Hỗ trợ 24/7'
        },
      ]
    }
  ];

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const DropdownItem = ({ item, onClose }: { item: any; onClose: () => void }) => (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-start gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 rounded-lg transition-all duration-200 group"
    >
      <span className="text-lg group-hover:scale-110 transition-transform mt-0.5">
        {item.icon}
      </span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{item.name}</span>
          {item.badge && (
            <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
      </div>
    </Link>
  );

  const LanguageToggle = () => (
    <button
      onClick={() => setLanguage(language === 'VI' ? 'EN' : 'VI')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 transition-all duration-200"
    >
      <FaGlobe className="w-4 h-4" />
      <span className="font-medium text-sm">{language}</span>
    </button>
  );

  const SearchButton = () => (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 transition-all duration-200"
      >
        <FaSearch className="w-4 h-4" />
      </button>
      
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm khóa học, bài học, giáo viên..."
                className="w-full px-4 py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                autoFocus
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-gray-500 font-medium">Gợi ý tìm kiếm:</div>
              <div className="flex flex-wrap gap-2">
                {['JLPT N5', 'HSK 1', 'TOEIC', 'Phát âm tiếng Nhật', 'Ngữ pháp N3', 'Giao tiếp'].map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 text-xs bg-gradient-to-r from-blue-50 to-orange-50 text-gray-600 rounded-full hover:from-blue-100 hover:to-orange-100 hover:text-blue-600 transition-colors border border-gray-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const NotificationBell = () => (
    <div className="relative">
      <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 transition-all duration-200">
        <FaBell className="w-4 h-4" />
        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {notifications > 9 ? '9+' : notifications}
          </span>
        )}
      </button>
    </div>
  );

  const DarkModeToggle = () => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600 transition-all duration-200"
    >
      {isDarkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
    </button>
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 h-[90px] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600'
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section - Left */}
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <LogoLink size="lg" className={isScrolled ? "text-blue-900" : "text-white"} />
              <div className="hidden sm:block">
                <div className={`text-sm font-medium ${isScrolled ? 'text-gray-500' : 'text-white/90'}`}>
                  Học ngoại ngữ thông minh
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Menu - Center */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative" data-dropdown>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative ${
                    isScrolled 
                      ? 'text-blue-900 hover:text-orange-500' 
                      : 'text-white/90 hover:text-white'
                  } ${activeDropdown === item.name ? (isScrolled ? 'text-orange-500 bg-orange-50' : 'text-white bg-white/10') : ''}`}
                  onClick={() => handleDropdownToggle(item.name)}
                  aria-expanded={activeDropdown === item.name}
                  aria-haspopup="true"
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    activeDropdown === item.name ? 'rotate-180' : ''
                  }`} />
                  
                  {/* Underline animation */}
                  <div className={`absolute bottom-0 left-1/2 h-0.5 bg-orange-500 transition-all duration-300 ${
                    activeDropdown === item.name ? 'w-full left-0' : 'w-0'
                  }`}></div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-md overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {item.dropdown?.map((dropdownItem: any, index: number) => (
                          <DropdownItem 
                            key={index} 
                            item={dropdownItem} 
                            onClose={() => setActiveDropdown(null)} 
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* User Actions - Right */}
          <div className="flex items-center gap-2">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageToggle />
              <SearchButton />
              <NotificationBell />
              <DarkModeToggle />
            </div>

            {/* CTA Button */}
            <Button
              size="sm"
              onClick={() => window.location.href = '/auth/register'}
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-4 py-2 rounded-lg"
            >
              Học thử miễn phí
            </Button>

            {/* User Menu */}
            {session ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                  </div>
                  <FaChevronDown className="w-3 h-3" />
                </button>
                
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-semibold text-gray-900">{session.user?.name || 'User'}</div>
                      <div className="text-sm text-gray-500">{session.user?.email}</div>
                    </div>
                    <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200">
                      <FaUser className="w-4 h-4" />
                      <span>Hồ sơ</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200">
                      <FaCog className="w-4 h-4" />
                      <span>Cài đặt</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-lg transition-all duration-200 w-full text-left"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => signIn()}
                className={`border-2 font-semibold transition-all duration-200 ${
                  isScrolled 
                    ? 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-blue-900'
                }`}
              >
                Đăng nhập
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
                isScrolled 
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-6 border-t border-white/20"
            >
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <button
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isScrolled 
                          ? 'text-blue-900 hover:bg-gray-100' 
                          : 'text-white hover:bg-white/10'
                      } ${activeDropdown === item.name ? (isScrolled ? 'bg-orange-50 text-orange-600' : 'bg-white/10 text-white') : ''}`}
                      onClick={() => handleDropdownToggle(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Mobile Dropdown */}
                    <AnimatePresence>
                      {activeDropdown === item.name && item.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 mt-2 space-y-2 overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem: any, index: number) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                                isScrolled 
                                  ? 'text-gray-600 hover:bg-gray-50' 
                                  : 'text-white/80 hover:bg-white/5'
                              }`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <span className="text-lg">{dropdownItem.icon}</span>
                              <div>
                                <div className="font-medium">{dropdownItem.name}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs opacity-75">{dropdownItem.description}</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <LanguageToggle />
                  <SearchButton />
                  <NotificationBell />
                  <DarkModeToggle />
                </div>
                
                {session ? (
                  <div className="space-y-3">
                    <div className="px-4 py-2 text-sm text-white/90">
                      Xin chào, {session.user?.name || session.user?.email?.split('@')[0]}!
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-white hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser className="w-4 h-4" />
                      <span>Hồ sơ</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left text-white hover:bg-white/10"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => signIn()}
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold"
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        window.location.href = '/auth/register';
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold"
                    >
                      Học thử miễn phí
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
