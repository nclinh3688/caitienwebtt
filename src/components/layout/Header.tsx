'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  Trophy, 
  Bell, 
  ChevronDown,
  Search,
  Globe,
  Sun,
  Moon,
  GraduationCap,
  Brain,
  Users,
  Info,
  Flag,
  Play,
  Star
} from 'lucide-react';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navigationItems = [
    {
      name: 'Khóa học',
      href: '/courses',
      icon: <BookOpen size={16} />,
      dropdown: [
        { name: 'Tiếng Nhật', href: '/courses/japanese', icon: '🇯🇵', description: 'JLPT N5-N1' },
        { name: 'Tiếng Trung', href: '/courses/chinese', icon: '🇨🇳', description: 'HSK 1-6' },
        { name: 'Tiếng Anh', href: '/courses/english', icon: '🇺🇸', description: 'TOEIC, IELTS' },
        { name: 'Tiếng Hàn', href: '/courses/korean', icon: '🇰🇷', description: 'TOPIK 1-6' },
        { name: 'Tiếng Việt', href: '/courses/vietnamese', icon: '🇻🇳', description: 'Cho người nước ngoài' },
      ]
    },
    {
      name: 'Test',
      href: '/test',
      icon: <GraduationCap size={16} />,
      dropdown: [
        { name: 'JLPT (Nhật)', href: '/test/jlpt', icon: <Flag size={16} />, description: 'N5, N4, N3, N2, N1' },
        { name: 'HSK (Trung)', href: '/test/hsk', icon: <Flag size={16} />, description: 'HSK 1-6, HSKK' },
        { name: 'TOEIC (Anh)', href: '/test/toeic', icon: <Flag size={16} />, description: 'Listening & Reading' },
        { name: 'TOPIK (Hàn)', href: '/test/topik', icon: <Flag size={16} />, description: 'TOPIK I, TOPIK II' },
        { name: 'IELTS (Anh)', href: '/test/ielts', icon: <Flag size={16} />, description: 'Academic & General' },
      ]
    },
    {
      name: 'AI Features',
      href: '/ai-content',
      icon: <Brain size={16} />,
      badge: 'NEW',
      dropdown: [
        { name: 'AI Chat Tutor', href: '/ai-content', icon: <Brain size={16} />, description: 'Trò chuyện với AI 24/7' },
        { name: 'Phân tích phát âm', href: '/pronunciation', icon: <Play size={16} />, description: 'Đánh giá chính xác 99%' },
        { name: 'Tạo bài học', href: '/practice/ai-generated', icon: <BookOpen size={16} />, description: 'Bài học cá nhân hóa' },
        { name: 'Đánh giá trình độ', href: '/assessment', icon: <Star size={16} />, description: 'Test miễn phí' },
      ]
    },
    {
      name: 'Giáo viên',
      href: '/teachers',
      icon: <Users size={16} />,
      dropdown: [
        { name: 'Danh sách giáo viên', href: '/teachers', icon: <Users size={16} />, description: '100+ giáo viên chất lượng' },
        { name: 'Đặt lịch học', href: '/booking', icon: <BookOpen size={16} />, description: '1-1, nhóm nhỏ' },
        { name: 'Đánh giá', href: '/reviews', icon: <Star size={16} />, description: 'Xem feedback học viên' },
      ]
    },
    {
      name: 'Về chúng tôi',
      href: '/about',
      icon: <Info size={16} />,
      dropdown: [
        { name: 'Giới thiệu', href: '/about', icon: <Info size={16} />, description: 'Sứ mệnh & Tầm nhìn' },
        { name: 'Đội ngũ', href: '/team', icon: <Users size={16} />, description: 'Chuyên gia ngôn ngữ' },
        { name: 'Tin tức', href: '/news', icon: <BookOpen size={16} />, description: 'Cập nhật mới nhất' },
        { name: 'Liên hệ', href: '/contact', icon: <Info size={16} />, description: 'Hỗ trợ 24/7' },
      ]
    }
  ];

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-4">
              <Logo />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  PHÚC KHIÊM Education
                </h1>
                <p className="text-sm text-gray-600 font-medium">
                  Học tập thông minh, tương lai tươi sáng
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <motion.div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  <button
                    className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                      activeDropdown === item.name 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                    onClick={() => handleDropdownToggle(item.name)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-secondary-500 text-white rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                    
                    {/* Underline animation */}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-xl overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {item.dropdown?.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-all duration-200 group"
                            >
                              <span className="text-lg group-hover:scale-110 transition-transform mt-0.5">
                                {dropdownItem.icon}
                              </span>
                              <div className="flex-1">
                                <div className="font-semibold">{dropdownItem.name}</div>
                                {dropdownItem.description && (
                                  <div className="text-sm text-gray-500 mt-1">{dropdownItem.description}</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <Search size={20} />
            </motion.button>

            {/* Language Selector */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <Globe size={20} />
              <span className="font-medium">VI</span>
              <ChevronDown size={16} />
            </motion.button>

            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* User Menu */}
            {session ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </motion.button>
                
                {/* User Profile */}
                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-gray-900 font-semibold">{session.user?.name}</p>
                      <p className="text-sm text-gray-500">Học viên</p>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </motion.button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    >
                      <div className="p-4">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-semibold text-gray-900">{session.user?.name}</div>
                          <div className="text-sm text-gray-500">{session.user?.email}</div>
                        </div>
                        
                        <div className="py-2 space-y-1">
                          <Link 
                            href="/profile" 
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-all duration-200"
                          >
                            <User size={18} />
                            <span>Hồ sơ</span>
                          </Link>
                          <Link 
                            href="/dashboard" 
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-all duration-200"
                          >
                            <BookOpen size={18} />
                            <span>Dashboard</span>
                          </Link>
                          <Link 
                            href="/achievements" 
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-all duration-200"
                          >
                            <Trophy size={18} />
                            <span>Thành tích</span>
                          </Link>
                          <Link 
                            href="/settings" 
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-all duration-200"
                          >
                            <Settings size={18} />
                            <span>Cài đặt</span>
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-2">
                          <button 
                            onClick={() => signOut()}
                            className="flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 w-full text-left"
                          >
                            <LogOut size={18} />
                            <span>Đăng xuất</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/auth/signin" 
                  className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
                >
                  Đăng nhập
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/auth/signup" 
                    className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    Học thử miễn phí
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200/20"
            >
              <div className="px-2 pt-4 pb-6 space-y-4">
                {/* Mobile Navigation Items */}
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <button
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeDropdown === item.name 
                          ? 'text-primary-600 bg-primary-50' 
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                      onClick={() => handleDropdownToggle(item.name)}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-secondary-500 text-white rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
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
                          {item.dropdown.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              <span className="text-lg">{dropdownItem.icon}</span>
                              <div>
                                <div className="font-medium">{dropdownItem.name}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500">{dropdownItem.description}</div>
                                )}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-gray-200/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Globe size={20} />
                      <span className="font-medium">VI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Search size={20} />
                      <Bell size={20} />
                      <Moon size={20} />
                    </div>
                  </div>
                  
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 px-4 py-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold">{session.user?.name}</p>
                          <p className="text-sm text-gray-500">Học viên</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link 
                          href="/profile" 
                          className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Hồ sơ
                        </Link>
                        <Link 
                          href="/settings" 
                          className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Cài đặt
                        </Link>
                        <button 
                          onClick={() => {
                            signOut();
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link 
                        href="/auth/signin" 
                        className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Đăng nhập
                      </Link>
                      <Link 
                        href="/auth/signup" 
                        className="block px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Học thử miễn phí
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
