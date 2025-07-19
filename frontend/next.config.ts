import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '3.108.58.47',
        port: '',
        pathname: '/media/**',
      },
    ],

  },
};

export default nextConfig;