import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_ID: '',
    GOOGLE_SECRET: '',
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
