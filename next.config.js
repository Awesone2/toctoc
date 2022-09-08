/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoredBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
