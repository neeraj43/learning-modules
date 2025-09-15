import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Static export configuration for Firebase Hosting (temporarily disabled for testing)
  // output: 'export',
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  
  experimental: {
    // Enable CSS Modules with custom naming
    cssChunking: 'strict'
  },
  // CSS Modules configuration
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true
  },
  // Module Federation configuration
  // Temporarily disabled due to compatibility issues with Next.js 15.5.2
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Add Module Federation plugin configuration
  //   if (!isServer) {
  //     const NextFederationPlugin = require('@module-federation/nextjs-mf');
  //     
  //     config.plugins.push(
  //       new NextFederationPlugin({
  //         name: 'comprehensive-web-app',
  //         filename: 'static/chunks/remoteEntry.js',
  //         exposes: {
  //           './Button': './src/components/ui/Button',
  //           './ReactBasicExamples': './src/components/examples/ReactBasicExamples',  
  //           './useLocalStorage': './src/hooks/useLocalStorage',
  //         },
  //         shared: {
  //           react: {
  //             singleton: true,
  //             requiredVersion: '^19.1.0',
  //           },
  //           'react-dom': {
  //             singleton: true,
  //             requiredVersion: '^19.1.0',
  //           },
  //         },
  //       })
  //     );
  //   }

  //   return config;
  // },
  // Enable output file tracing to resolve the warning
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;