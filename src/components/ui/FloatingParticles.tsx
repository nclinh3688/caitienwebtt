'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
}

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  speed?: number;
  size?: { min: number; max: number };
  className?: string;
}

export default function FloatingParticles({
  count = 50,
  colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
  speed = 0.5,
  size = { min: 2, max: 6 },
  className = ''
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * (size.max - size.min) + size.min,
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * 100 + 50
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Reset particle if life is over
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = Math.random() * 100 + 50;
          particle.opacity = Math.random() * 0.5 + 0.1;
        }

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw connections between nearby particles
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 100) * 0.1;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, colors, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

// Simpler Floating Elements Component
export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      
      {/* Small sparkles */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
      
      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 0}} />
            <stop offset="50%" style={{stopColor: '#3b82f6', stopOpacity: 0.5}} />
            <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 0}} />
          </linearGradient>
        </defs>
        <path
          d="M0,200 Q200,100 400,200 T800,200"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,400 Q300,300 600,400 T1200,400"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{animationDelay: '2s'}}
        />
      </svg>
    </div>
  );
}