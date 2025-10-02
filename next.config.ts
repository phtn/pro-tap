import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://192.168.1.5:3000',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Ensure outgoing requests use a safer referrer policy than "unsafe-url"
          {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
        ],
      },
    ]
  },
}

export default nextConfig
