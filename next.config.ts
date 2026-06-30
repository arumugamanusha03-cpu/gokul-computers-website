import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'www.apple.com' },
      { protocol: 'https', hostname: 'www.asus.com' },
      { protocol: 'https', hostname: 'www.lenovo.com' },
      { protocol: 'https', hostname: 'www.hp.com' },
      { protocol: 'https', hostname: 'www.dell.com' },
      { protocol: 'https', hostname: 'psref.lenovo.com' },
      { protocol: 'https', hostname: 'cdn.mos.cms.futurecdn.net' },
      { protocol: 'https', hostname: 'i.rtings.com' },
      { protocol: 'https', hostname: 'assets.asus.com' },
      { protocol: 'https', hostname: 'dlcdnwebimgs.asus.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;