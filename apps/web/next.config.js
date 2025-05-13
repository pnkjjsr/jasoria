/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {},
  // i18n: {
  //   locales: ["en", "hi"],
  //   defaultLocale: "en",
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
