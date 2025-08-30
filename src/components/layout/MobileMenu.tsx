'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  GraduationCap,
  BookOpen,
  Trophy,
  Users,
  User,
  ChevronLeft
} from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
    color: string;
    dropdown?: Array<{
      name: string;
      href: string;
      icon: string;
      submenu?: Array<{
        name: string;
        href: string;
        icon: string;
        submenu?: Array<{
          name: string;
          href: string;
          icon: string;
        }>;
      }>;
    }>;
  }>;
}

type ViewType = 'main' | 'languages' | 'levels' | 'content' | 'lessons' | 'dropdown';

// Import lesson data
const n5Lessons = [
  { id: "N5-B01", title: "Bài 1: Tự giới thiệu" },
  { id: "N5-B02", title: "Bài 2: Đồ vật, địa điểm" },
  { id: "N5-B03", title: "Bài 3: Địa điểm, số đếm" },
  { id: "N5-B04", title: "Bài 4: Thời gian, ngày tháng" },
  { id: "N5-B05", title: "Bài 5: Gia đình, nghề nghiệp" },
  { id: "N5-B06", title: "Bài 6: Food & Dining" },
  { id: "N5-B07", title: "Bài 7: Shopping & Money" },
  { id: "N5-B08", title: "Bài 8: Transportation & Travel" },
  { id: "N5-B09", title: "Bài 9: Family & Relationships" },
  { id: "N5-B10", title: "Bài 10: Hobbies & Activities" },
  { id: "N5-B11", title: "Bài 11: Daily Routine" },
  { id: "N5-B12", title: "Bài 12: Weather & Seasons" },
  { id: "N5-B13", title: "Bài 13: Health & Body" },
  { id: "N5-B14", title: "Bài 14: School & Education" },
  { id: "N5-B15", title: "Bài 15: Work & Office" },
  { id: "N5-B16", title: "Bài 16: Technology & Internet" },
  { id: "N5-B17", title: "Bài 17: Entertainment & Media" },
  { id: "N5-B18", title: "Bài 18: Sports & Exercise" },
  { id: "N5-B19", title: "Bài 19: Travel & Tourism" },
  { id: "N5-B20", title: "Bài 20: Business & Economy" },
  { id: "N5-B21", title: "Bài 21: Culture & Tradition" },
  { id: "N5-B22", title: "Bài 22: Social Issues" },
  { id: "N5-B23", title: "Bài 23: Environment & Nature" },
  { id: "N5-B24", title: "Bài 24: Future & Goals" },
  { id: "N5-B25", title: "Bài 25: Review & Test" }
];

const n4Lessons = [
  { id: "N4-B01", title: "Bài 26: Ngữ pháp cơ bản N4" },
  { id: "N4-B02", title: "Bài 27: Thể て và cách sử dụng" },
  { id: "N4-B03", title: "Bài 28: Thể た và quá khứ" },
  { id: "N4-B04", title: "Bài 29: Trợ từ に và で" },
  { id: "N4-B05", title: "Bài 30: Trợ từ から và まで" },
  { id: "N4-B06", title: "Bài 31: Thể khả năng" },
  { id: "N4-B07", title: "Bài 32: Thể bị động" },
  { id: "N4-B08", title: "Bài 33: Thể sai khiến" },
  { id: "N4-B09", title: "Bài 34: Điều kiện với たら" },
  { id: "N4-B10", title: "Bài 35: Điều kiện với ば" },
  { id: "N4-B11", title: "Bài 36: Điều kiện với と" },
  { id: "N4-B12", title: "Bài 37: Thể ている" },
  { id: "N4-B13", title: "Bài 38: Thể てある" },
  { id: "N4-B14", title: "Bài 39: Thể ておく" },
  { id: "N4-B15", title: "Bài 40: Thể てしまう" },
  { id: "N4-B16", title: "Bài 41: Thể てみる" },
  { id: "N4-B17", title: "Bài 42: Thể てあげる" },
  { id: "N4-B18", title: "Bài 43: Thể てもらう" },
  { id: "N4-B19", title: "Bài 44: Thể てくれる" },
  { id: "N4-B20", title: "Bài 45: Trợ từ は và が nâng cao" },
  { id: "N4-B21", title: "Bài 46: Trợ từ の và こと" },
  { id: "N4-B22", title: "Bài 47: Trợ từ と và や" },
  { id: "N4-B23", title: "Bài 48: Trợ từ より và ほど" },
  { id: "N4-B24", title: "Bài 49: Trợ từ か và ね" },
  { id: "N4-B25", title: "Bài 50: Tổng hợp và ôn tập N4" }
];

export default function MobileMenu({
  isOpen,
  onClose,
  navigationItems
}: MobileMenuProps) {
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedContent, setSelectedContent] = useState<string>('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setCurrentView('levels');
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setCurrentView('content');
  };

  const handleContentSelect = (content: string) => {
    setSelectedContent(content);
    // Bỏ setCurrentView('lessons') - redirect thẳng đến trang
    const url = getFormattedUrl(content);
    window.location.href = url;
  };

  // Function để lấy URL đúng cho content type
  const getFormattedUrl = (content: string) => {
    if (selectedLanguage === 'Tiếng Nhật') {
      if (selectedLevel.includes('N5')) {
        if (content === 'Từ vựng') return '/courses/japanese/n5/vocabulary';
        if (content === 'Ngữ pháp') return '/courses/japanese/n5/grammar';
        if (content === 'Kanji') return '/courses/japanese/n5/kanji';
        if (content === 'Luyện nghe') return '/courses/japanese/n5/listening';
      } else if (selectedLevel.includes('N4')) {
        if (content === 'Từ vựng') return '/courses/japanese/n4/vocabulary';
        if (content === 'Ngữ pháp') return '/courses/japanese/n4/grammar';
        if (content === 'Kanji') return '/courses/japanese/n4/kanji';
        if (content === 'Luyện nghe') return '/courses/japanese/n4/listening';
      }
    }
    // Default fallback
    return `/courses/${selectedLanguage.toLowerCase()}/${selectedLevel.toLowerCase()}/${content.toLowerCase()}`;
  };

  const handleBack = () => {
    switch (currentView) {
      case 'languages':
        setCurrentView('main');
        break;
      case 'levels':
        setCurrentView('languages');
        setSelectedLanguage('');
        break;
      case 'content':
        setCurrentView('levels');
        setSelectedLevel('');
        break;
      case 'dropdown':
        setCurrentView('main');
        setSelectedLanguage('');
        break;
    }
  };

  const handleClose = () => {
    setCurrentView('main');
    setSelectedLanguage('');
    setSelectedLevel('');
    setSelectedContent('');
    onClose();
  };

  const languages = [
    { name: 'Tiếng Nhật', icon: '🇯🇵', levels: ['N5 - Cơ bản', 'N4 - Sơ cấp', 'N3 - Trung cấp', 'N2 - Cao cấp', 'N1 - Thành thạo'] },
    { name: 'Tiếng Trung', icon: '🇨🇳', levels: ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6', 'HSK 7', 'HSK 8', 'HSK 9'] },
    { name: 'Tiếng Hàn', icon: '🇰🇷', levels: ['TOPIK 1', 'TOPIK 2', 'TOPIK 3', 'TOPIK 4', 'TOPIK 5', 'TOPIK 6'] },
    { name: 'Tiếng Anh', icon: '🇺🇸', levels: ['A1 - Beginner', 'A2 - Elementary', 'B1 - Intermediate', 'B2 - Upper Intermediate', 'C1 - Advanced'] },
    { name: 'Tiếng Việt', icon: '🇻🇳', levels: ['Cơ bản', 'Sơ cấp', 'Trung cấp', 'Cao cấp', 'Thành thạo'] }
  ];

  const contentTypes = [
    { name: 'Từ vựng', icon: '📚' },
    { name: 'Ngữ pháp', icon: '📖' },
    { name: 'Kanji', icon: '🈯' },
    { name: 'Luyện nghe', icon: '🎧' }
  ];

  const renderMainMenu = () => (
    <div className="mobile-nav">
      {navigationItems?.map((item) => (
        <div 
          key={item.name}
          className="mobile-nav-item-card" 
          onClick={() => {
            if (item.name === 'KHÓA HỌC') {
              setCurrentView('languages');
            } else if (item.dropdown && item.dropdown.length > 0) {
              // Show dropdown for other items
              setCurrentView('dropdown');
              setSelectedLanguage(item.name);
            } else {
              window.location.href = item.href;
            }
          }}
        >
          <div className="mobile-nav-icon">
            {item.icon}
          </div>
          <div className="mobile-nav-content">
            <span className="mobile-nav-title">{item.name}</span>
            {item.dropdown && item.dropdown.length > 0 && (
              <span className="text-xs text-gray-300 ml-2">▼</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguages = () => (
    <div className="mobile-nav">
      {languages.map((language) => (
        <div 
          key={language.name}
          className="mobile-nav-item-card" 
          onClick={() => handleLanguageSelect(language.name)}
        >
          <div className="mobile-nav-icon">
            <span className="text-2xl">{language.icon}</span>
          </div>
          <div className="mobile-nav-content">
            <span className="mobile-nav-title">{language.name}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLevels = () => {
    const language = languages.find(l => l.name === selectedLanguage);
    if (!language) return null;

    return (
      <div className="mobile-nav">
        {language.levels.map((level) => (
          <div 
            key={level}
            className="mobile-nav-item-card" 
            onClick={() => handleLevelSelect(level)}
          >
            <div className="mobile-nav-icon">
              <span className="text-lg">📚</span>
            </div>
            <div className="mobile-nav-content">
              <span className="mobile-nav-title">{level}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => (
    <div className="mobile-nav">
      {contentTypes.map((content) => (
        <div 
          key={content.name}
          className="mobile-nav-item-card" 
          onClick={() => handleContentSelect(content.name)}
        >
          <div className="mobile-nav-icon">
            <span className="text-2xl">{content.icon}</span>
          </div>
          <div className="mobile-nav-content">
            <span className="mobile-nav-title">{content.name}</span>
          </div>
        </div>
      ))}
    </div>
  );



  const renderDropdown = () => {
    const currentItem = navigationItems?.find(item => item.name === selectedLanguage);
    
    if (!currentItem?.dropdown) return null;
    
    return (
      <div className="mobile-nav">
        {currentItem.dropdown.map((dropdownItem) => (
          <div 
            key={dropdownItem.name}
            className="mobile-nav-item-card" 
            onClick={() => window.location.href = dropdownItem.href}
          >
            <div className="mobile-nav-icon">
              <span className="text-lg">{dropdownItem.icon}</span>
            </div>
            <div className="mobile-nav-content">
              <span className="mobile-nav-title">{dropdownItem.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'main': return 'Menu';
      case 'languages': return 'KHÓA HỌC';
      case 'levels': return selectedLanguage;
      case 'content': return selectedLevel;
      case 'dropdown': return selectedLanguage;
      default: return 'Menu';
    }
  };

  const shouldShowBackButton = currentView !== 'main';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay"
            onClick={handleClose}
          />
          
          {/* Mobile Menu Content */}
          <motion.div
            initial={{ right: '-100%' }}
            animate={{ right: 0 }}
            exit={{ right: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mobile-menu-content"
          >
            {/* Mobile Menu Header */}
            <div className="mobile-menu-header">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {shouldShowBackButton && (
                    <button
                      onClick={handleBack}
                      className="mobile-back-btn"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <span className="text-white font-semibold text-lg">{getHeaderTitle()}</span>
                </div>
                <button
                  onClick={handleClose}
                  className="mobile-menu-close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Dynamic Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentView === 'main' && renderMainMenu()}
                {currentView === 'languages' && renderLanguages()}
                {currentView === 'levels' && renderLevels()}
                {currentView === 'content' && renderContent()}
                {currentView === 'dropdown' && renderDropdown()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
