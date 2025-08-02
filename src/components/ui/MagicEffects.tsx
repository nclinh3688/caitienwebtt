'use client';

import React from 'react';

// ✨ Floating Particles Background
export function FloatingParticlesBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/4 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float floating-delayed" />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-pink-500/25 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-float floating-delayed" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-transparent">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}

// 🎨 Interactive Hero Button with Magic Effects
export function MagicHeroButton({ children, href, className = '', ...props }: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  [key: string]: any;
}) {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      className={`
        group relative inline-flex items-center justify-center
        px-8 py-4 font-bold text-lg text-white
        bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
        rounded-2xl shadow-2xl overflow-hidden
        transform transition-all duration-500
        hover:scale-105 hover:shadow-glow-purple
        ${className}
      `}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                      transform skew-x-12 -translate-x-full group-hover:translate-x-full 
                      transition-transform duration-1000" />
      
      {/* Hover Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </Component>
  );
}

// 🔮 Glassmorphism Card with Hover Effects
export function GlassCard({ children, className = '', ...props }: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`
        group relative overflow-hidden
        bg-white/10 backdrop-blur-xl border border-white/20
        rounded-3xl shadow-2xl
        transform transition-all duration-500
        hover:scale-105 hover:bg-white/15 hover:shadow-multiple
        ${className}
      `}
      {...props}
    >
      {/* Holographic Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                      transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                      transition-transform duration-1500 opacity-0 group-hover:opacity-100" />
      
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent 
                      bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'exclude' }} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// 🌟 Animated Stats Counter
export function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  className = '' 
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span className={`font-bold ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// 🎯 Feature Card with Advanced Hover
export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color = 'blue',
  className = '' 
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color?: 'blue' | 'purple' | 'pink' | 'emerald' | 'orange';
  className?: string;
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 group-hover:shadow-glow',
    purple: 'from-purple-500 to-purple-600 group-hover:shadow-glow-purple',
    pink: 'from-pink-500 to-pink-600 group-hover:shadow-glow-pink',
    emerald: 'from-emerald-500 to-emerald-600 group-hover:shadow-emerald-glow',
    orange: 'from-orange-500 to-orange-600 group-hover:shadow-orange-glow'
  };

  return (
    <GlassCard className={`p-8 group cursor-pointer ${className}`}>
      {/* Icon Container */}
      <div className={`
        inline-flex items-center justify-center w-16 h-16 mb-6
        bg-gradient-to-br ${colorClasses[color]}
        rounded-2xl shadow-lg
        transform transition-all duration-300
        group-hover:scale-110 group-hover:rotate-3
      `}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 
                     group-hover:text-transparent group-hover:bg-clip-text 
                     group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
                     transition-all duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
        {description}
      </p>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 
                      rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                      animate-pulse" />
    </GlassCard>
  );
}

// 🎭 Page Section with Animated Entrance
export function AnimatedSection({ 
  children, 
  className = '',
  delay = 0 
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`
        transform transition-all duration-1000
        ${isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-20 opacity-0'
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// 🌈 Gradient Text Animation
export function GradientText({ 
  children, 
  className = '',
  animated = true 
}: {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}) {
  return (
    <span className={`
      bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
      bg-clip-text text-transparent font-bold
      ${animated ? 'animate-gradient' : ''}
      ${className}
    `}
    style={animated ? { backgroundSize: '300% 300%' } : {}}>
      {children}
    </span>
  );
}