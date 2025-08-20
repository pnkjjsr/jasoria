/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig = {
  // Suppress hydration warnings caused by browser extensions in development
  reactStrictMode: true,
  typescript: {
    // Temporarily disable type checking during build due to Next.js 15.5.0 validator bug
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
