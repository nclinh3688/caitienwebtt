'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Plus, 
  Bell, 
  ChevronDown 
} from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onToggle
}: ProfileDropdownProps) {
  return (
    <div className="right-actions flex items-center space-x-3">
      {/* Notification Button */}
      <button className="notification-btn">
        <Bell size={20} />
        <span className="notification-dot"></span>
      </button>

      {/* Profile Dropdown */}
      <div className="profile-dropdown relative">
        <button 
          onClick={onToggle}
          className="profile-button"
        >
          <div className="profile-avatar">
            <User size={16} />
          </div>
          <span className="profile-name">Tài khoản</span>
          <ChevronDown 
            size={16} 
            className={`profile-chevron ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="profile-menu"
            >
              <div className="profile-menu-header">
                <div className="profile-menu-avatar">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="profile-menu-title">Chào bạn!</h3>
                  <p className="profile-menu-subtitle">Quản lý tài khoản của bạn</p>
                </div>
              </div>
              
              <div className="profile-menu-content">
                <Link href="/profile" className="profile-menu-item">
                  <User size={16} />
                  Hồ sơ cá nhân
                </Link>
                <Link href="/dashboard" className="profile-menu-item">
                  <User size={16} />
                  Dashboard
                </Link>
                <Link href="/settings" className="profile-menu-item">
                  <User size={16} />
                  Cài đặt
                </Link>
                <Link href="/achievements" className="profile-menu-item">
                  <User size={16} />
                  Thành tích
                </Link>
                <Link href="/support" className="profile-menu-item">
                  <User size={16} />
                  Hỗ trợ
                </Link>
                <Link href="/about" className="profile-menu-item">
                  <User size={16} />
                  Về trung tâm
                </Link>
              </div>
              
              <div className="profile-menu-auth">
                <Link href="/auth/login" className="profile-menu-item">
                  <User size={16} />
                  Đăng nhập
                </Link>
                <Link href="/auth/register" className="profile-menu-item">
                  <Plus size={16} />
                  Đăng ký
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
