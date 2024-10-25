import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import createNextIntlPlugin from 'next-intl/plugin';
// import { withSentryConfig } from '@sentry/nextjs';
// import { env } from './env.mjs';

if (process.env.NODE_ENV === 'development') {
  // `await`ing the call is not necessary but it helps making sure that the setup has succeeded.
  //  If you cannot use top level awaits you could use the following to avoid an unhandled rejection:
  //  `setupDevPlatform().catch(e => console.error(e));`
  await setupDevPlatform({ persist: true });
}

const withIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withIntl({
  transpilePackages: ['next-mdx-remote'],
  images: {
    // domains: [
    //   'via.placeholder.com',
    //   'picsum.photos',
    //   'styles.redditmedia.com',
    //   'b.thumbs.redditmedia.com',
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'styles.redditmedia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'b.thumbs.redditmedia.com',
        pathname: '/**',
      },
      // 添加其他需要的远程图像模式
    ],
  },
  // i18n: {
  //     locales: ['en', 'zh'],
  //     defaultLocale: 'en',
  //     localeDetection: false
  //   }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://reddit101-server.tjsglion.workers.dev/:path*',
  //     },
  //   ];
  // },
});

// module.exports = nextConfig

export default nextConfig;

// const SentryWebpackPluginOptions = {
//   org: 'next-job',
//   project: 'subrise',
//   // authToken: env.SENTRY_AUTH_TOKEN, 
//   silent: true,
//   widenClientFileUpload: true,

//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   // Hides source maps from generated client bundles
//   hideSourceMaps: true,

//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,

//   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// }

// export default withSentryConfig(nextConfig, {
//   org: 'next-job',
//   project: 'subrise',
//   // authToken: env.SENTRY_AUTH_TOKEN, 
//   silent: true,
//   widenClientFileUpload: true,

//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
//   // This can increase your server load as well as your hosting bill.
//   // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
//   // side errors will fail.
//   tunnelRoute: "/monitoring",

//   // Hides source maps from generated client bundles
//   hideSourceMaps: true,

//   // Automatically tree-shake Sentry logger statements to reduce bundle size
//   disableLogger: true,

//   // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
//   // See the following for more information:
//   // https://docs.sentry.io/product/crons/
//   // https://vercel.com/docs/cron-jobs
//   automaticVercelMonitors: true,
// });

// export default withSentryConfig(nextConfig, {
//   webpack: (config, {webpack}) => {
//     config.plugins.push(
//          new webpack.DefinePlugin({
//            __SENTRY_DEBUG__: false,
//            __SENTRY_TRACING__: false,
//            __RRWEB_EXCLUDE_IFRAME__: true,
//            __RRWEB_EXCLUDE_SHADOW_DOM__: true,
//            __SENTRY_EXCLUDE_REPLAY_WORKER__: true,
//          }),
//        )
//        return config
//     return config;
//   }
// }, SentryWebpackPluginOptions);