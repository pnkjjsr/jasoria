/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig = {
  // Suppress hydration warnings caused by browser extensions in development
  reactStrictMode: true,
  experimental: {
    // This helps with hydration mismatches from browser extensions
    suppressHydrationWarning: true,
  },
};

export default withNextIntl(nextConfig);
