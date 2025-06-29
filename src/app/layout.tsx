import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FPS Trainer - Master Your Skills",
  description: "Improve your FPS gaming skills through deliberate practice and precise measurement tracking",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    title: 'FPS Trainer - Master Your Skills',
    description: 'Improve your FPS gaming skills through deliberate practice and precise measurement tracking',
    url: 'https://fpstrainer.vercel.app',
    siteName: 'FPS Trainer',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FPS Trainer',
    description: 'Improve your FPS gaming skills through deliberate practice',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
