'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="text-white font-medium text-sm px-4 py-2 rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand Name */}
          <Link href="/" className="flex items-center gap-3 text-decoration-none">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg shadow-lg">
              <span className="text-white">P</span>
            </div>
            <span className="font-bold text-xl tracking-wide hidden sm:block">PHÚC KHIÊM EDU</span>
            <span className="font-bold text-lg tracking-wide sm:hidden">PKE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/courses">Khóa học</NavLink>
            <NavLink href="/test">Test</NavLink>
            <NavLink href="/community">Cộng đồng</NavLink>
            <NavLink href="/teachers">Giáo viên</NavLink>
            <NavLink href="/profile">Hồ sơ</NavLink>
            <NavLink href="/support">Hỗ trợ</NavLink>
            <NavLink href="/about">Về chúng tôi</NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <>
                <span className="text-white text-sm font-medium">Xin chào, {session.user?.name || session.user?.email?.split('@')[0]}!</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-green-700">
                  <Link href="/auth/register">
                    Đăng ký
                  </Link>
                </Button>
                <Button
                  size="sm"
                  onClick={() => signIn()}
                  className="bg-white text-green-700 hover:bg-gray-100"
                >
                  Đăng nhập
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-2">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/courses">Khóa học</NavLink>
              <NavLink href="/test">Test</NavLink>
              <NavLink href="/community">Cộng đồng</NavLink>
              <NavLink href="/teachers">Giáo viên</NavLink>
              <NavLink href="/profile">Hồ sơ</NavLink>
              <NavLink href="/support">Hỗ trợ</NavLink>
              <NavLink href="/about">Về chúng tôi</NavLink>
            </nav>
            
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/20">
              {session ? (
                <>
                  <span className="text-white text-sm font-medium px-4 py-2">Xin chào, {session.user?.name || session.user?.email?.split('@')[0]}!</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => signOut()}
                    className="border-white text-white hover:bg-white hover:text-green-700"
                  >
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-green-700">
                    <Link href="/auth/register">
                      Đăng ký
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => signIn()}
                    className="bg-white text-green-700 hover:bg-gray-100"
                  >
                    Đăng nhập
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
