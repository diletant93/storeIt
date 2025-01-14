import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'cloud.appwrite.io'
      }
    ]
  }
};

export default nextConfig;
