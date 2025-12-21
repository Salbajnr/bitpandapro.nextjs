import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bitpanda - Start investing today",
  description: "Trade in minutes from only €1. Your No.1 European broker for stocks, crypto, indices, ETFs and precious metals. Trade 24/7. Fee-free on all deposits.",
  keywords: "Bitpanda, cryptocurrency, crypto, trading, invest, stocks, ETFs, precious metals, bitcoin, ethereum",
  authors: [{ name: "Bitpanda" }],
  creator: "Bitpanda",
  publisher: "Bitpanda",
  robots: "index, follow",
  referrer: "origin",
  alternates: {
    canonical: "https://www.bitpanda.com/en"
  },
  openGraph: {
    type: "website",
    title: "Bitpanda - Start investing today",
    description: "Trade in minutes from only €1. Your No.1 European broker for stocks, crypto, indices, ETFs and precious metals. Trade 24/7. Fee-free on all deposits.",
    url: "https://www.bitpanda.com/en",
    siteName: "Bitpanda",
    images: [
      {
        url: "https://cdn.bitpanda.com/media/og-images-open-graph/bitpanda-og.png",
        width: 1200,
        height: 630,
        alt: "Bitpanda - Start investing today"
      }
    ]
  },
  twitter: {
    card: "summary",
    site: "@Bitpanda_global",
    title: "Bitpanda - Start investing today",
    description: "Trade in minutes from only €1. Your No.1 European broker for stocks, crypto, indices, ETFs and precious metals. Trade 24/7. Fee-free on all deposits."
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}