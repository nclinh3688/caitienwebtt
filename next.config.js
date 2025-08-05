/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal configuration to avoid hanging
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Basic image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Basic compression
  compress: true,
}

module.exports = nextConfig 