import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import { StoreProvider } from "@repo/shared/redux/StoreProvider";
import AuthStateHandler from "@repo/shared/components/auth/AuthStateHandler";

import Header from "@/layout/headers/basic";
import Nav from "@/layout/nav/basic";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  authors: [{ name: "Pankaj Jasoria" }],
  applicationName: "Jasoria",
  title: "House Help Book | Find & Share Trusted Helpers",
  description:
    "Store and share trusted contacts for house help like maids, cooks, plumbers, and electricians. Simplify your daily life with House Help Book.",
  keywords: [
    "maid",
    "cook",
    "plumber",
    "electrician",
    "house help contacts",
    "share helpers",
    "find trusted helpers",
  ],
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  robots: "index, follow",
  referrer: "origin-when-cross-origin",
  openGraph: {
    siteName: "Jasoria",
    title: "House Help Book | Find & Share Trusted Helpers",
    description:
      "Keep all your house help contacts in one place and share them with friends & family.",
    type: "website",
    locale: "en-US",
    url: "https://househelpbook.com",
    images: [
      {
        url: "https://househelpbook.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "House Help Book | Find & Share Trusted Helpers",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <StoreProvider>
      <html lang={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground`}
        >
          <NextIntlClientProvider>
            <AuthStateHandler />
            <div className="sticky top-0 z-50">
              <Header />
              <Nav />
            </div>

            <main>{children}</main>
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
