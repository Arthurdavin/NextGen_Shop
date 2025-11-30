/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional, recommended
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'arystorephone.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rog.asus.com', // added for ASUS images
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dlcdnrog.asus.com',  // <-- ADD THIS
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'content.abt.com',  // <-- ADD THIS
        pathname: '/**',
      },
      {
      protocol: 'https',
      hostname: 'content.abt.com',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'dlcdnrog.asus.com',
      pathname: '/**',
    },
    ],
  },
  // optional: you can add other Next.js config options here
  experimental: {
    appDir: true, // if using the app directory structure
  },
};

module.exports = nextConfig;
