'use client';

import React from 'react';
import Head from 'next/head';

interface SEOOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course' | 'lesson';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export function SEOOptimizer({
  title,
  description,
  keywords = [],
  image = '/images/og-image.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOOptimizerProps) {
  const fullTitle = title ? `${title} | Caitienwebtt` : 'Caitienwebtt - Nền tảng học ngoại ngữ đa ngôn ngữ với AI';
  const fullDescription = description || 'Học tiếng Nhật, Trung, Anh, Hàn, Việt với AI thông minh. Hệ thống gamification, bài học tương tác, và cộng đồng học tập sôi động.';
  const fullKeywords = [...keywords, 'học ngoại ngữ', 'tiếng Nhật', 'tiếng Trung', 'tiếng Anh', 'tiếng Hàn', 'AI học tập', 'gamification'];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords.join(', ')} />
      <meta name="author" content={author || 'Caitienwebtt Team'} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || 'https://caitienwebtt.com'} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Caitienwebtt" />
      <meta property="og:locale" content="vi_VN" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@caitienwebtt" />
      
      {/* Article Specific Meta Tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags.length > 0 && (
        tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))
      )}
      
      {/* Course Specific Meta Tags */}
      {type === 'course' && (
        <>
          <meta property="og:type" content="website" />
          <meta property="product:price:amount" content="0" />
          <meta property="product:price:currency" content="VND" />
        </>
      )}
      
      {/* Lesson Specific Meta Tags */}
      {type === 'lesson' && (
        <>
          <meta property="og:type" content="website" />
          <meta property="learning:level" content="Beginner" />
          <meta property="learning:duration" content="15 minutes" />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || 'https://caitienwebtt.com'} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="vi" href="https://caitienwebtt.com" />
      <link rel="alternate" hrefLang="en" href="https://caitienwebtt.com/en" />
      <link rel="alternate" hrefLang="ja" href="https://caitienwebtt.com/ja" />
      <link rel="alternate" hrefLang="zh" href="https://caitienwebtt.com/zh" />
      <link rel="alternate" hrefLang="ko" href="https://caitienwebtt.com/ko" />
      <link rel="alternate" hrefLang="x-default" href="https://caitienwebtt.com" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === 'article' ? 'Article' : type === 'course' ? 'Course' : 'WebPage',
            "headline": fullTitle,
            "description": fullDescription,
            "image": image,
            "url": url || 'https://caitienwebtt.com',
            "publisher": {
              "@type": "Organization",
              "name": "Caitienwebtt",
              "logo": {
                "@type": "ImageObject",
                "url": "https://caitienwebtt.com/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url || 'https://caitienwebtt.com'
            },
            ...(type === 'article' && {
              "author": {
                "@type": "Person",
                "name": author || "Caitienwebtt Team"
              },
              "datePublished": publishedTime,
              "dateModified": modifiedTime,
              "articleSection": section,
              "keywords": fullKeywords.join(', ')
            }),
            ...(type === 'course' && {
              "provider": {
                "@type": "Organization",
                "name": "Caitienwebtt",
                "sameAs": "https://caitienwebtt.com"
              },
              "courseMode": "online",
              "educationalLevel": "Beginner",
              "inLanguage": "vi"
            }),
            ...(type === 'lesson' && {
              "learningResourceType": "Lesson",
              "educationalLevel": "Beginner",
              "inLanguage": "vi",
              "teaches": "Language Learning"
            })
          })
        }}
      />
    </Head>
  );
}

export default SEOOptimizer; 