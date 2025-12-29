import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  outputFileTracingRoot: require('path').join(__dirname, '../'),
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bitpanda.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sbcdn.bitpanda.com',
        port: '',
      },
    ],
  },
  turbopack: {},
};

export default nextConfig;