const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.dev https://*.clerk.com https://clerk.tempely.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.clerk.dev https://*.clerk.com https://clerk.tempely.com https://api.clerk.dev https://api.clerk.com https://assets.clerk.dev https://assets.clerk.com wss://*.clerk.dev wss://*.clerk.com;
  object-src 'none';
  frame-ancestors 'none';
  worker-src blob:;
`.replace(/\n/g, '');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    const path = require('path');
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
