'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===== 3D CARD EFFECT =====
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Card3D({ children, className = '', intensity = 20 }: Card3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / intensity;
    const rotateY = (centerX - x) / intensity;
    
    setMousePosition({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative perspective-1000 cursor-pointer',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? mousePosition.x : 0,
        rotateY: isHovered ? mousePosition.y : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          transform: "translateZ(20px)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// ===== PARALLAX BACKGROUND =====
interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxBackground({ children, className = '', speed = 0.5 }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

// ===== FLOATING ELEMENTS =====
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FloatingElement({ 
  children, 
  className = '', 
  duration = 3, 
  delay = 0,
  direction = 'up'
}: FloatingElementProps) {
  const directions = {
    up: { y: [0, -20, 0] },
    down: { y: [0, 20, 0] },
    left: { x: [0, -20, 0] },
    right: { x: [0, 20, 0] }
  };

  return (
    <motion.div
      className={className}
      animate={directions[direction]}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// ===== TYPING ANIMATION =====
interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypingAnimation({ 
  text, 
  speed = 50, 
  className = '',
  onComplete 
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </motion.span>
  );
}

// ===== SCROLL TRIGGERED ANIMATION =====
interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
}

export function ScrollAnimation({ 
  children, 
  className = '', 
  threshold = 0.1,
  animation = 'fadeIn'
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold });

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 }
    },
    slideLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    },
    slideRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      {...animations[animation]}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
    >
      {children}
    </motion.div>
  );
}

// ===== GRADIENT TEXT =====
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'primary' | 'accent' | 'brand' | 'rainbow';
  animate?: boolean;
}

export function GradientText({ 
  children, 
  className = '', 
  gradient = 'brand',
  animate = false 
}: GradientTextProps) {
  const gradients = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700',
    accent: 'bg-gradient-to-r from-accent-600 to-accent-700',
    brand: 'bg-gradient-to-r from-primary-600 to-accent-600',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500'
  };

  const animatedGradients = {
    primary: 'bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700',
    accent: 'bg-gradient-to-r from-accent-600 via-accent-500 to-accent-700',
    brand: 'bg-gradient-to-r from-primary-600 via-accent-500 to-primary-700',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500'
  };

  return (
    <motion.span
      className={cn(
        'bg-clip-text text-transparent font-bold',
        animate ? animatedGradients[gradient] : gradients[gradient],
        animate && 'bg-[length:200%_200%] animate-gradient',
        className
      )}
    >
      {children}
    </motion.span>
  );
}

// ===== INTERACTIVE BUTTON =====
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export function InteractiveButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'default',
  size = 'md'
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    default: 'bg-primary-600 hover:bg-primary-700 text-white',
    gradient: 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold transition-all duration-200',
        'focus:outline-none focus:ring-4 focus:ring-primary-500/50',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: isPressed ? 0.95 : 1,
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        style={{
          left: mousePosition.x - 50,
          top: mousePosition.y - 50,
          width: 100,
          height: 100,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isPressed ? 1 : 0,
          opacity: isPressed ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// ===== PROGRESSIVE DISCLOSURE =====
interface ProgressiveDisclosureProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function ProgressiveDisclosure({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: ProgressiveDisclosureProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: "easeOut"
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// ===== MAGNETIC EFFECT =====
interface MagneticEffectProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticEffect({ 
  children, 
  className = '',
  strength = 0.3 
}: MagneticEffectProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={cn('cursor-pointer', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.div>
  );
} 