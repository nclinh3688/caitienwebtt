'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  GraduationCap,
  BookOpen,
  Trophy,
  Users,
  User,
  Plus,
  Bell,
  Home,
  BookOpenCheck,
  Target,
  Users2
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import DesktopNavigation from './DesktopNavigation';
import MobileMenu from './MobileMenu';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Mobile menu state only

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside any dropdown area
      if (!target.closest('.nav-item') && 
          !target.closest('.dropdown-menu') && 
          !target.closest('.profile-button') &&
          !target.closest('.right-actions')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: string | null) => {
    setOpenDropdown(dropdown);
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // 🎯 4 MENU CHÍNH + 1 MENU CÁ NHÂN (4+1 MODEL) - RESTORED
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
        { 
          name: 'Tiếng Nhật', 
          href: '/courses/japanese', 
          icon: '🇯🇵',
          submenu: [
            { 
              name: 'N5 - Cơ bản', 
              href: '/courses/japanese/n5', 
              icon: '🟢',
              submenu: [
                { name: 'Từ vựng', href: '/courses/japanese/n5/vocabulary', icon: '📚' },
                { name: 'Ngữ pháp', href: '/courses/japanese/n5/grammar', icon: '📖' },
                { name: 'Kanji', href: '/courses/japanese/n5/kanji', icon: '🈯' },
                { name: 'Luyện nghe', href: '/courses/japanese/n5/listening', icon: '🎧' }
              ]
            },
            { 
              name: 'N4 - Sơ cấp', 
              href: '/courses/japanese/n4', 
              icon: '🟡',
              submenu: [
                { name: 'Từ vựng', href: '/courses/japanese/n4/vocabulary', icon: '📚' },
                { name: 'Ngữ pháp', href: '/courses/japanese/n4/grammar', icon: '📖' },
                { name: 'Kanji', href: '/courses/japanese/n4/kanji', icon: '🈯' },
                { name: 'Luyện nghe', href: '/courses/japanese/n4/listening', icon: '🎧' }
              ]
            },
            { 
              name: 'N3 - Trung cấp', 
              href: '/courses/japanese/n3', 
              icon: '🟠',
              submenu: [
                { name: 'Từ vựng', href: '/courses/japanese/n3/vocabulary', icon: '📚' },
                { name: 'Ngữ pháp', href: '/courses/japanese/n3/grammar', icon: '📖' },
                { name: 'Kanji', href: '/courses/japanese/n3/kanji', icon: '🈯' },
                { name: 'Luyện nghe', href: '/courses/japanese/n3/listening', icon: '🎧' }
              ]
            },
            { 
              name: 'N2 - Cao cấp', 
              href: '/courses/japanese/n2', 
              icon: '🔴',
              submenu: [
                { name: 'Từ vựng', href: '/courses/japanese/n2/vocabulary', icon: '📚' },
                { name: 'Ngữ pháp', href: '/courses/japanese/n2/grammar', icon: '📖' },
                { name: 'Kanji', href: '/courses/japanese/n2/kanji', icon: '🈯' },
                { name: 'Luyện nghe', href: '/courses/japanese/n2/listening', icon: '🎧' }
              ]
            },
            { 
              name: 'N1 - Thượng cấp', 
              href: '/courses/japanese/n1', 
              icon: '⚫',
              submenu: [
                { name: 'Từ vựng', href: '/courses/japanese/n1/vocabulary', icon: '📚' },
                { name: 'Ngữ pháp', href: '/courses/japanese/n1/grammar', icon: '📖' },
                { name: 'Kanji', href: '/courses/japanese/n1/kanji', icon: '🈯' },
                { name: 'Luyện nghe', href: '/courses/japanese/n1/listening', icon: '🎧' }
              ]
            }
          ]
        },
        { 
          name: 'Tiếng Trung', 
          href: '/courses/chinese', 
          icon: '🇨🇳',
          submenu: [
            { name: 'HSK 1', href: '/courses/chinese/hsk1', icon: '🟢' },
            { name: 'HSK 2', href: '/courses/chinese/hsk2', icon: '🟡' },
            { name: 'HSK 3', href: '/courses/chinese/hsk3', icon: '🟠' },
            { name: 'HSK 4', href: '/courses/chinese/hsk4', icon: '🔴' },
            { name: 'HSK 5', href: '/courses/chinese/hsk5', icon: '⚫' },
            { name: 'HSK 6', href: '/courses/chinese/hsk6', icon: '🟣' },
            { name: 'HSK 7', href: '/courses/chinese/hsk7', icon: '🔵' },
            { name: 'HSK 8', href: '/courses/chinese/hsk8', icon: '🟤' },
            { name: 'HSK 9', href: '/courses/chinese/hsk9', icon: '⚪' }
          ]
        },
        { 
          name: 'Tiếng Hàn', 
          href: '/courses/korean', 
          icon: '🇰🇷',
          submenu: [
            { name: 'TOPIK 1', href: '/courses/korean/topik1', icon: '🟢' },
            { name: 'TOPIK 2', href: '/courses/korean/topik2', icon: '🟡' },
            { name: 'TOPIK 3', href: '/courses/korean/topik3', icon: '🟠' },
            { name: 'TOPIK 4', href: '/courses/korean/topik4', icon: '🔴' },
            { name: 'TOPIK 5', href: '/courses/korean/topik5', icon: '⚫' },
            { name: 'TOPIK 6', href: '/courses/korean/topik6', icon: '🟣' }
          ]
        },
        { 
          name: 'Tiếng Anh', 
          href: '/courses/english', 
          icon: '🇺🇸',
          submenu: [
            { name: 'A1 - Beginner', href: '/courses/english/a1', icon: '🟢' },
            { name: 'A2 - Elementary', href: '/courses/english/a2', icon: '🟡' },
            { name: 'B1 - Intermediate', href: '/courses/english/b1', icon: '🟠' },
            { name: 'B2 - Upper Intermediate', href: '/courses/english/b2', icon: '🔴' },
            { name: 'C1 - Advanced', href: '/courses/english/c1', icon: '⚫' }
          ]
        },
        { 
          name: 'Tiếng Việt', 
          href: '/courses/vietnamese', 
          icon: '🇻🇳',
          submenu: [
            { name: 'Cơ bản', href: '/courses/vietnamese/basic', icon: '🟢' },
            { name: 'Sơ cấp', href: '/courses/vietnamese/elementary', icon: '🟡' },
            { name: 'Trung cấp', href: '/courses/vietnamese/intermediate', icon: '🟠' },
            { name: 'Cao cấp', href: '/courses/vietnamese/advanced', icon: '🔴' },
            { name: 'Thành thạo', href: '/courses/vietnamese/fluent', icon: '⚫' }
          ]
        }
      ]
    },
    {
      name: 'LUYỆN THI',
      href: '/practice',
      icon: <Trophy size={18} />,
      color: 'from-yellow-500 to-yellow-600',
      dropdown: [
        { name: 'JLPT Thử nghiệm', href: '/test', icon: '📝' },
        { name: 'Kiểm tra nhanh', href: '/test/mini', icon: '⚡' },
        { name: 'Thi tổng hợp', href: '/comprehensive-test', icon: '📋' },
        { name: 'Luyện kỹ năng', href: '/test/skill', icon: '🎯' }
      ]
    },
    {
      name: 'CỘNG ĐỒNG',
      href: '/community',
      icon: <Users size={18} />,
      color: 'from-purple-500 to-purple-600',
      dropdown: [
        { name: 'Diễn đàn', href: '/community', icon: '💬' },
        { name: 'Nhóm học tập', href: '/community/groups', icon: '👥' },
        { name: 'Chia sẻ kinh nghiệm', href: '/community/share', icon: '💡' },
        { name: 'Sự kiện', href: '/community/events', icon: '📅' }
      ]
    },
    {
      name: 'PROFILE',
      href: '/profile',
      icon: <User size={18} />,
      color: 'from-pink-500 to-pink-600',
      dropdown: [
        { name: 'Hồ sơ cá nhân', href: '/profile', icon: '👤' },
        { name: 'Cài đặt', href: '/settings', icon: '⚙️' },
        { name: 'Hỗ trợ', href: '/support', icon: '❓' },
        { name: 'Về trung tâm', href: '/about', icon: 'ℹ️' }
      ]
    }
  ];

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          {/* Logo Section - Always Visible */}
          <div className="logo-section">
              <Logo />
          </div>

          {/* Desktop Navigation */}
          <DesktopNavigation 
            navigationItems={navigationItems}
            openDropdown={openDropdown}
            onToggleDropdown={toggleDropdown}
          />

          {/* Mobile Header Actions - Hidden on Desktop */}
          <div className="mobile-header-actions lg:hidden">
            <div className="mobile-logo-text text-gray-600 font-medium">MENU</div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

                {/* Mobile Menu */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            navigationItems={navigationItems}
          />
    </header>
  );
}