/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : `${process.env.API_BASE_URL}/api/:path*`,
        },
      ]
    },
    experimental: {
        appDir: true,
      },
  }
  
  export default nextConfig;
