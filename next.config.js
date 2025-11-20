const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Removed "output: 'export'" because it breaks ISR, Notion, dynamic routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
};

module.exports = withBundleAnalyzer(nextConfig);
