import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "pub-4518f8276e4445ffb4ae9629e58c26af.r2.dev",
      },
      {
        protocol: "https",
        hostname: "www.flashfirejobs.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.adobe.com",
      },
    ],
  },
  
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/refundpolicy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/RefundPolicy",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/PrivacyPolicy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/privacypolicy",
        destination: "/privacy-policy",
        permanent: true,
      },
      // Redirect malformed routes
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/blogs/2",
        destination: "/blog/why-finding-a-job-in-the-us-as-a-new-graduate-feels-impossible",
        permanent: true,
      },
      {
        source: "/blogs/15",
        destination: "/blog/the-job-hunt-nearly-broke-me-until-i-discovered-this-one-strategy-that-changed-everything",
        permanent: true,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/:locale/blogs",
        destination: "/:locale/blog",
        permanent: true,
      },
      {
        source: "/en-ca/blogs",
        destination: "/en-ca/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
