import './src/shared/config/env.mjs';

import { readFileSync } from 'node:fs';

/**
 * Once supported replace by node / eslint / ts and out of experimental, replace by
 * `import packageJson from './package.json' assert { type: 'json' };`
 * @type {import('type-fest').PackageJson}
 */
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)).toString('utf-8'));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  pageExtensions: ['page.mdx', 'page.md', 'page.jsx', 'page.js', 'page.tsx', 'page.ts'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  experimental: {
    scrollRestoration: true,
  },

  productionBrowserSourceMaps: true,

  poweredByHeader: false,

  headers() {
    const headers = [
      {
        // Make all fonts immutable and cached for one year
        source: '/static/media/(.*?)',
        headers: [
          {
            key: 'Cache-Control',
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Make all other static assets immutable and cached for one hour
        source: '/static/(.*?)',
        headers: [
          {
            key: 'Cache-Control',
            // See https://www.keycdn.com/blog/cache-control-immutable#what-is-cache-control-immutable
            // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#browser_compatibility
            value: 'public, max-age=3600, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_APP_URL,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];

    return headers;
  },

  env: {
    NEXT_PUBLIC_APP_NAME: packageJson.name ?? 'APP_NAME-ENV-not-found',
    NEXT_PUBLIC_APP_VERSION: packageJson.version ?? 'unknown',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
