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
  FaLightbulb,
  FaHome,
  FaCalendarAlt,
  FaDollarSign,
  FaPlane,
  FaBriefcase,
  FaLanguage
} from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { LogoLink } from '@/components/ui/Logo';

export default function HeaderTatosa() {
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
      name: 'GIỚI THIỆU',
      href: '/about',
      icon: <FaHome className="w-4 h-4" />,
      dropdown: [
        { name: 'PHÚC KHIÊM là gì?', href: '/about', icon: <FaInfoCircle /> },
        { name: 'CLB Học tập', href: '/club', icon: <FaUsers /> },
        { name: 'Đội ngũ giảng viên', href: '/team', icon: <FaGraduationCap /> },
        { name: 'Thành tựu', href: '/achievements', icon: <FaTrophy /> },
      ]
    },
    {
      name: 'CHƯƠNG TRÌNH HỌC',
      href: '/courses',
      icon: <FaBook className="w-4 h-4" />,
      dropdown: [
        { 
          name: 'Phát âm cơ bản – chuyên sâu', 
          href: '/courses/pronunciation', 
          icon: <FaPlay />,
          description: 'Luyện phát âm chuẩn xác'
        },
        { 
          name: 'Đào tạo giáo viên', 
          href: '/courses/teacher-training', 
          icon: <FaGraduationCap />,
          description: 'Chứng chỉ giảng dạy'
        },
        { 
          name: 'Giao tiếp N1 – N5', 
          href: '/courses/conversation', 
          icon: <FaUsers />,
          description: 'Thực hành giao tiếp'
        },
        { 
          name: 'Luyện thi N1 – N5', 
          href: '/courses/exam-prep', 
          icon: <FaTrophy />,
          description: 'Ôn thi JLPT'
        },
        { 
          name: 'Huấn luyện viên cá nhân', 
          href: '/courses/personal-coach', 
          icon: <FaUser />,
          description: '1-1 với chuyên gia'
        },
        { 
          name: 'Đào tạo cho doanh nghiệp', 
          href: '/courses/corporate', 
          icon: <FaBriefcase />,
          description: 'In-house training'
        },
      ]
    },
    {
      name: 'LỊCH KHAI GIẢNG',
      href: '/schedule',
      icon: <FaCalendarAlt className="w-4 h-4" />,
    },
    {
      name: 'HỌC PHÍ',
      href: '/pricing',
      icon: <FaDollarSign className="w-4 h-4" />,
    },
    {
      name: 'DU HỌC',
      href: '/study-abroad',
      icon: <FaPlane className="w-4 h-4" />,
      dropdown: [
        { name: 'Lý do chọn Nhật Bản', href: '/study-abroad/why-japan', icon: <FaFlag /> },
        { name: 'Chi phí du học', href: '/study-abroad/costs', icon: <FaDollarSign /> },
        { name: 'Lộ trình du học', href: '/study-abroad/roadmap', icon: <FaChartLine /> },
        { name: 'Hồ sơ du học', href: '/study-abroad/documents', icon: <FaBook /> },
      ]
    },
    {
      name: 'VIỆC LÀM',
      href: '/jobs',
      icon: <FaBriefcase className="w-4 h-4" />,
      dropdown: [
        { name: 'Tại Nhật Bản', href: '/jobs/japan', icon: <FaFlag /> },
        { name: 'Tại Việt Nam', href: '/jobs/vietnam', icon: <FaFlag /> },
        { name: 'Tuyển dụng', href: '/jobs/recruitment', icon: <FaUsers /> },
      ]
    },
    {
      name: 'THÔNG DỊCH & BIÊN DỊCH',
      href: '/translation',
      icon: <FaLanguage className="w-4 h-4" />,
      dropdown: [
        { name: 'Biên dịch', href: '/translation/translation', icon: <FaBook /> },
        { name: 'Thông dịch', href: '/translation/interpretation', icon: <FaUsers /> },
      ]
    },
    {
      name: 'LIÊN HỆ',
      href: '/contact',
      icon: <FaInfoCircle className="w-4 h-4" />,
    }
  ];

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const DropdownItem = ({ item, onClose }: { item: any; onClose: () => void }) => (
    <Link
      href={item.href}
      onClick={onClose}
      className="flex items-start gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 hover:text-orange-600 rounded-lg transition-all duration-200 group"
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
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
    >
      <FaGlobe className="w-4 h-4" />
      <span className="font-medium text-sm">{language}</span>
    </button>
  );

  const SearchButton = () => (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
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
                placeholder="Tìm kiếm khóa học, lịch khai giảng..."
                className="w-full px-4 py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                autoFocus
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="text-sm text-gray-500 font-medium">Gợi ý tìm kiếm:</div>
              <div className="flex flex-wrap gap-2">
                {['JLPT N5', 'Phát âm tiếng Nhật', 'Luyện thi N3', 'Giao tiếp', 'Du học Nhật', 'Giáo viên'].map((suggestion, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 text-xs bg-orange-50 text-gray-600 rounded-full hover:bg-orange-100 hover:text-orange-600 transition-colors border border-orange-200"
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
      <button className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200">
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
      className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
    >
      {isDarkMode ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Header - Brand Section */}
      <div className={`bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-20'
      }`}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section - Left */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4"
              >
                <LogoLink size="lg" className="text-white" />
                <div className="hidden sm:block">
                  <div className="text-sm text-white/90 font-medium">
                    Học ngoại ngữ thông minh
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Brand Message - Right */}
            <div className="hidden lg:flex flex-col items-end text-right">
              <div className="text-sm text-white/90">
                Nơi <span className="text-orange-400 font-bold">DUY NHẤT</span> tại Việt Nam
              </div>
              <div className="text-sm text-white/90">
                đào tạo <span className="text-orange-400 font-bold">AI</span> tiếng Nhật <span className="text-orange-400 font-bold">CHUYÊN SÂU</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-2">
              <LanguageToggle />
              <SearchButton />
              <NotificationBell />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className={`bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500 transition-all duration-300 ${
        isScrolled ? 'h-12' : 'h-14'
      }`}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative" data-dropdown>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative text-white hover:text-orange-100 ${
                      activeDropdown === item.name ? 'bg-white/10 text-white' : ''
                    }`}
                    onClick={() => handleDropdownToggle(item.name)}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup="true"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.name && item.dropdown && (
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

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageToggle />
              <SearchButton />
              <NotificationBell />
              <DarkModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
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
              className="lg:hidden py-6 border-t border-white/20 bg-gradient-to-b from-orange-500 to-orange-600"
            >
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <button
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 text-white hover:bg-white/10 ${
                        activeDropdown === item.name ? 'bg-white/10' : ''
                      }`}
                      onClick={() => handleDropdownToggle(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      {item.dropdown && (
                        <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} />
                      )}
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
                              className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 text-white/80 hover:bg-white/5"
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
                      className="w-full border-2 border-white text-white hover:bg-white hover:text-orange-600 font-semibold"
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        window.location.href = '/auth/register';
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-white text-orange-600 hover:bg-orange-50 font-semibold"
                    >
                      Đăng ký học
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
