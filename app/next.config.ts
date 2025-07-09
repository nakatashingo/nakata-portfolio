import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // imagesプロパティを追記
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;