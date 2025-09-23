/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_ID: '',
    GOOGLE_SECRET: '',
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
