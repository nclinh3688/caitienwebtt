import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import '@/styles/base.css'
import '@/styles/components.css'
import '@/styles/header.css'
import '@/styles/mobile-menu.css'
import '@/styles/dashboard.css'
import '@/styles/progress.css'
import '@/styles/mobile.css'
import '@/styles/ai-components.css'
import '@/styles/modern-page.css'
import '@/styles/vocabulary-learning.css'
import '@/styles/vocabulary-dashboard.css'
import '@/styles/flashcard.css'
import '@/styles/vocabulary-list.css'
import '@/styles/compact-vocabulary.css'
import '@/styles/simple-vocabulary-table.css'
import '@/styles/vocabulary-page.css'
import AuthProvider from '@/components/AuthProvider'
import Header from '@/components/layout/Header'
import FontOptimizer from '@/components/optimization/FontOptimizer'
import AccessibilityEnhancer from '@/components/optimization/AccessibilityEnhancer'
import AIAssistant from '@/components/ui/AIAssistant'

import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'PHÚC KHIÊM Education - Học ngoại ngữ thông minh với AI',
  description: 'Nền tảng học ngoại ngữ thông minh với AI tutor, 5 ngôn ngữ (Nhật, Trung, Anh, Hàn, Việt), phương pháp học hiện đại và trải nghiệm học tập tuyệt vời.',
  keywords: 'học ngoại ngữ, tiếng nhật, tiếng trung, tiếng anh, tiếng hàn, AI tutor, JLPT, HSK, TOEIC, IELTS, phát âm, ngữ pháp, từ vựng, học online',
  authors: [{ name: 'PHÚC KHIÊM Education Team' }],
  creator: 'PHÚC KHIÊM Education',
  publisher: 'PHÚC KHIÊM Education',
  metadataBase: new URL('https://eloquent-semolina-f30407.netlify.app'),
  openGraph: {
    title: 'PHÚC KHIÊM Education - Học ngoại ngữ thông minh với AI',
    description: 'Nền tảng học ngoại ngữ thông minh với AI tutor, 5 ngôn ngữ, phương pháp học hiện đại.',
    url: 'https://eloquent-semolina-f30407.netlify.app',
    siteName: 'PHÚC KHIÊM Education',
    images: [
      {
        url: '/images/logo/phuc-khiem-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'PHÚC KHIÊM Education Logo',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PHÚC KHIÊM Education - Học ngoại ngữ thông minh với AI',
    description: 'Nền tảng học ngoại ngữ thông minh với AI tutor, 5 ngôn ngữ, phương pháp học hiện đại.',
    images: ['/images/logo/phuc-khiem-logo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://eloquent-semolina-f30407.netlify.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Critical CSS Inline for Performance */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            :root {
              --primary-50: #eff6ff;
              --primary-100: #dbeafe;
              --primary-500: #3b82f6;
              --primary-600: #2563eb;
              --primary-700: #1d4ed8;
              
              /* Mobile-first variables */
              --mobile-header-height: 60px;
              --mobile-font-size: 14px;
              --mobile-padding: 16px;
            }
            
            /* Mobile-first critical styles */
            @media (max-width: 768px) {
              html { font-size: 14px; }
              body { margin: 0; padding: 0; }
              header { height: var(--mobile-header-height) !important; }
              .hero-slider { height: 60vh !important; }
              .hero-slide { padding: 20px !important; }
              .hero-slide h2 { font-size: 20px !important; line-height: 1.2 !important; }
              .hero-slide p { font-size: 12px !important; line-height: 1.3 !important; }
              .nav-item { font-size: 12px !important; }
              .auth-button { font-size: 12px !important; padding: 8px 12px !important; }
            }
            
            /* Performance optimizations */
            * { box-sizing: border-box; }
            img { max-width: 100%; height: auto; }
            button, a { touch-action: manipulation; }
            
            /* Disable heavy animations on mobile */
            @media (max-width: 768px) {
              .hero-slider { animation: none !important; }
              .hero-slide { transform: none !important; }
              * { animation-duration: 0.2s !important; transition-duration: 0.2s !important; }
            }
            
            /* Reduce motion for accessibility */
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after { animation-duration: 0.01ms !important; }
            }
              --primary-800: #1e40af;
              --primary-900: #1e3a8a;
              --secondary-500: #f97316;
              --secondary-600: #ea580c;
              --secondary-700: #c2410c;
              --bg-primary: #ffffff;
              --text-primary: #0f172a;
              --text-secondary: #475569;
              --border-light: #e2e8f0;
            }
            
            * {
              box-sizing: border-box;
              padding: 0;
              margin: 0;
            }
            
            html {
              scroll-behavior: smooth;
            }
            
            body {
              color: var(--text-primary);
              background: var(--bg-primary);
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Critical header styles */
            .header-critical {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 50;
              background: rgba(255, 255, 255, 0.9);
              backdrop-filter: blur(8px);
              border-bottom: 1px solid rgba(226, 232, 240, 0.2);
              transition: all 0.3s ease;
            }
            
            .header-container {
              max-width: 80rem;
              margin: 0 auto;
              padding: 0 1rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 4rem;
            }
            
            .logo-container {
              display: flex;
              align-items: center;
              gap: 1rem;
            }
            
            /* REMOVED CONFLICTING CSS - logo-text styles moved to header-enhanced.css */
            
            .logo-subtitle {
              font-size: 0.875rem;
              color: var(--text-secondary);
              font-weight: 500;
            }
            
            /* Critical navigation styles */
            .nav-desktop {
              display: none;
            }
            
            @media (min-width: 1024px) {
              .nav-desktop {
                display: flex;
                align-items: center;
                gap: 1.5rem;
              }
            }
            
            .nav-item {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.5rem 1rem;
              border-radius: 0.5rem;
              font-weight: 500;
              color: var(--text-primary);
              text-decoration: none;
              transition: all 0.2s ease;
            }
            
            .nav-item:hover {
              color: var(--primary-600);
              background: var(--primary-50);
            }
            
            /* Critical button styles */
            .btn-primary {
              background: linear-gradient(135deg, var(--primary-600) 0%, var(--secondary-500) 100%);
              color: white;
              padding: 0.75rem 1.5rem;
              border-radius: 0.75rem;
              font-weight: 500;
              text-decoration: none;
              transition: all 0.2s ease;
              border: none;
              cursor: pointer;
            }
            
            .btn-primary:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            }
            
            /* Critical main content styles */
            main {
              padding-top: 4rem;
              min-height: calc(100vh - 4rem);
            }
            
            /* Critical loading states */
            .skeleton {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
            
            /* Critical responsive styles */
            @media (max-width: 640px) {
              .header-container {
                padding: 0 1rem;
              }
              
              .logo-text {
                font-size: 1.25rem;
              }
              
              .logo-subtitle {
                display: none;
              }
            }
          `
        }} />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/logo/phuc-khiem-logo.jpg" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KZC0Q6PH7J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KZC0Q6PH7J', {
              page_title: 'PHÚC KHIÊM Education',
              page_location: window.location.href,
            });
          `}
        </Script>
        
        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${inter.className} ${poppins.variable}`}>
        <FontOptimizer />
        <AccessibilityEnhancer />
        <AuthProvider>
          <Header />
          <main className="pt-16" id="main-content">
            {children}
          </main>
          <AIAssistant />
        </AuthProvider>
      </body>
    </html>
  )
}