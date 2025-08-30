'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  dropdown?: Array<{
    name: string;
    href: string;
    icon: string | React.ReactNode;
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
}

interface DesktopNavigationProps {
  navigationItems: NavigationItem[];
  openDropdown: string | null;
  onToggleDropdown: (dropdown: string | null) => void;
}

export default function DesktopNavigation({
  navigationItems,
  openDropdown,
  onToggleDropdown
}: DesktopNavigationProps) {
  // Local state for nested menus
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  
  // Refs for hover areas
  const languageRef = useRef<HTMLDivElement>(null);
  const nestedRef = useRef<HTMLDivElement>(null);
  const levelRef = useRef<HTMLDivElement>(null);
  const subSubRef = useRef<HTMLDivElement>(null);

  // Timeout refs for delayed hiding
  const languageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const levelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (languageTimeoutRef.current) clearTimeout(languageTimeoutRef.current);
      if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
    };
  }, []);

  const handleLanguageMouseEnter = (languageName: string) => {
    if (languageTimeoutRef.current) clearTimeout(languageTimeoutRef.current);
    setHoveredLanguage(languageName);
  };

  const handleLanguageMouseLeave = () => {
    languageTimeoutRef.current = setTimeout(() => {
      setHoveredLanguage(null);
      setHoveredLevel(null); // Also hide level when language is hidden
    }, 150); // 150ms delay
  };

  const handleLevelMouseEnter = (levelName: string) => {
    if (levelTimeoutRef.current) clearTimeout(levelTimeoutRef.current);
    setHoveredLevel(levelName);
  };

  const handleLevelMouseLeave = () => {
    levelTimeoutRef.current = setTimeout(() => {
      setHoveredLevel(null);
    }, 150); // 150ms delay
  };

  // Function to hide all menus after click
  const handleMenuClick = () => {
    setHoveredLanguage(null);
    setHoveredLevel(null);
    onToggleDropdown(null);
  };

  return (
    <nav className="desktop-nav hidden lg:flex space-x-1">
      {navigationItems.map((item) => (
        <div key={item.name} className="nav-item relative">
          <button
            className="nav-button group"
            onClick={() => onToggleDropdown(openDropdown === item.name ? null : item.name)}
          >
            <div className={`nav-icon bg-gradient-to-r ${item.color}`}>
              {item.icon}
            </div>
            <span className="nav-text">{item.name}</span>
            {item.dropdown && (
              <ChevronDown 
                size={16} 
                className={`nav-chevron ${openDropdown === item.name ? 'rotate-180' : ''}`}
              />
            )}
          </button>

          {item.dropdown && (
            <AnimatePresence>
              {openDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="dropdown-menu"
                >
                  <div className="dropdown-items">
                    {item.dropdown.map((dropdownItem) => (
                      <div key={dropdownItem.name} className="dropdown-item-container">
                        <Link
                          href={dropdownItem.href}
                          className="dropdown-item group"
                          onMouseEnter={() => handleLanguageMouseEnter(dropdownItem.name)}
                          onMouseLeave={handleLanguageMouseLeave}
                          onClick={handleMenuClick}
                        >
                          <span className="item-icon">
                            {dropdownItem.icon}
                          </span>
                          <span className="item-title">
                            {dropdownItem.name}
                          </span>
                        </Link>
                        
                        {/* NESTED SUBMENU FOR KHÓA HỌC */}
                        {dropdownItem.submenu && hoveredLanguage === dropdownItem.name && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="nested-dropdown"
                            onMouseEnter={() => handleLanguageMouseEnter(dropdownItem.name)}
                            onMouseLeave={handleLanguageMouseLeave}
                          >
                            <div className="nested-dropdown-items">
                              {dropdownItem.submenu.map((subItem) => (
                                <div key={subItem.name} className="nested-item-container">
                                  <Link
                                    href={subItem.href}
                                    className="nested-link group"
                                    onMouseEnter={() => handleLevelMouseEnter(subItem.name)}
                                    onMouseLeave={handleLevelMouseLeave}
                                    onClick={handleMenuClick}
                                  >
                                    <span className="item-icon">
                                      {subItem.icon}
                                    </span>
                                    <span className="item-title">
                                      {subItem.name}
                                    </span>
                                  </Link>
                                  
                                  {/* SUB-SUBMENU FOR N5-N1 */}
                                  {subItem.submenu && hoveredLevel === subItem.name && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -10 }}
                                      transition={{ duration: 0.2 }}
                                      className="sub-submenu"
                                      onMouseEnter={() => handleLevelMouseEnter(subItem.name)}
                                      onMouseLeave={handleLevelMouseLeave}
                                    >
                                      <div className="sub-submenu-items">
                                        {subItem.submenu.map((subSubItem) => (
                                          <Link
                                            key={subSubItem.name}
                                            href={subSubItem.href}
                                            className="sub-submenu-link"
                                            onClick={handleMenuClick}
                                          >
                                            <span className="item-icon">
                                              {subSubItem.icon}
                                            </span>
                                            <span className="item-title">
                                              {subSubItem.name}
                                            </span>
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </nav>
  );
}
