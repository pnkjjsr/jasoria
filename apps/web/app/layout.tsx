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
  title: "Jasoria",
  description: "Practical Solutions for Everyday Problems",
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
