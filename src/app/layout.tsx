import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WebVitals } from '@/components/web-vitals';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Caitienwebtt - Nền tảng học ngoại ngữ đa ngôn ngữ với AI',
    template: '%s | Caitienwebtt'
  },
  description: 'Học tiếng Nhật, Trung, Anh, Hàn, Việt với AI thông minh. Hệ thống gamification, bài học tương tác, và cộng đồng học tập sôi động.',
  keywords: [
    'học ngoại ngữ',
    'tiếng Nhật',
    'tiếng Trung', 
    'tiếng Anh',
    'tiếng Hàn',
    'JLPT',
    'HSK',
    'AI học tập',
    'gamification',
    'cộng đồng học tập',
    'bài học tương tác',
    'phát âm',
    'ngữ pháp',
    'từ vựng'
  ],
  authors: [{ name: 'Caitienwebtt Team' }],
  creator: 'Caitienwebtt',
  publisher: 'Caitienwebtt',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://caitienwebtt.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://caitienwebtt.com',
    title: 'Caitienwebtt - Nền tảng học ngoại ngữ đa ngôn ngữ với AI',
    description: 'Học tiếng Nhật, Trung, Anh, Hàn, Việt với AI thông minh. Hệ thống gamification, bài học tương tác, và cộng đồng học tập sôi động.',
    siteName: 'Caitienwebtt',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Caitienwebtt - Học ngoại ngữ với AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caitienwebtt - Nền tảng học ngoại ngữ đa ngôn ngữ với AI',
    description: 'Học tiếng Nhật, Trung, Anh, Hàn, Việt với AI thông minh. Hệ thống gamification, bài học tương tác, và cộng đồng học tập sôi động.',
    images: ['/images/twitter-image.jpg'],
    creator: '@caitienwebtt',
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'education',
  classification: 'Educational Technology',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Caitienwebtt',
    'application-name': 'Caitienwebtt',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Caitienwebtt" />
        <meta name="application-name" content="Caitienwebtt" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="preconnect" href="https://generativelanguage.googleapis.com" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.openai.com" />
        <link rel="dns-prefetch" href="//generativelanguage.googleapis.com" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalApplication",
              "name": "Caitienwebtt",
              "description": "Nền tảng học ngoại ngữ đa ngôn ngữ với AI thông minh",
              "url": "https://caitienwebtt.com",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "VND"
              },
              "provider": {
                "@type": "Organization",
                "name": "Caitienwebtt",
                "url": "https://caitienwebtt.com"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Language Learners"
              },
              "educationalLevel": ["Beginner", "Intermediate", "Advanced"],
              "teaches": ["Japanese", "Chinese", "English", "Korean", "Vietnamese"],
              "learningResourceType": ["Interactive Lesson", "Quiz", "Audio", "Video", "Game"]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <WebVitals />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}