import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Real PHÚC KHIÊM Logo */}
        <Image
          src="/images/logo/phuc-khiem-logo.jpg"
          alt="PHÚC KHIÊM Education"
          width={48}
          height={48}
          className="w-full h-full object-contain rounded-full"
          priority
        />

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-orange-500/10 rounded-full blur-sm"></div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-poppins font-bold tracking-wide text-blue-900 ${textSizes[size]}`}>
            PHÚC KHIÊM
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Học ngoại ngữ thông minh
          </span>
        </div>
      )}
    </div>
  );
}

// Logo with Link wrapper
export function LogoLink({ size = 'md', showText = true, className = '' }: LogoProps) {
  return (
    <Link href="/" className={`hover:opacity-80 transition-opacity ${className}`}>
      <Logo size={size} showText={showText} />
    </Link>
  );
} 