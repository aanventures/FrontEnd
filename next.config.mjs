/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ['source.unsplash.com', 'images.unsplash.com'],
    // optionally allow via remotePatterns for flexibility
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'source.unsplash.com' },
    //   { protocol: 'https', hostname: 'images.unsplash.com' }
    // ]
  },
};

export default nextConfig;
