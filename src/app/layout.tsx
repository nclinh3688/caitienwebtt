import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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
  'theme-color': '#1e40af',
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
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        
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
        <AuthProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}