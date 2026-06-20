import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Use true if this is a permanent routing rule
      },
    ];
  },
};

export default nextConfig;
