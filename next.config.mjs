/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      // Keep your Unsplash config if you're still using it for placeholders
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
