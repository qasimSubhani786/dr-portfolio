/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || [])];
    return config;
  },
};

module.exports = nextConfig;
