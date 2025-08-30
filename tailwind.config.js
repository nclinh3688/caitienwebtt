/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Optimize for mobile performance
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Optimize for production
  ...(process.env.NODE_ENV === 'production' && {
    purge: {
      enabled: true,
      content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      options: {
        safelist: [
          'html', 'body',
          /^motion-/, /^animate-/,
          /^hero-/, /^nav-/, /^dropdown-/, /^auth-/, /^profile-/,
          /^logo-/, /^action-/, /^mobile-/, /^content-/,
          /^feature-/, /^testimonial-/, /^course-/, /^btn-/
        ],
      },
    },
  }),
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
  // Optimize for production
  ...(process.env.NODE_ENV === 'production' && {
    purge: {
      enabled: true,
      content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
      ],
    },
  }),
};
