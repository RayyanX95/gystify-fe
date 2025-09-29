import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { StructuredData } from '@/components';
import { ReactNode } from 'react';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  console.log('API_URL', process.env.NEXT_PUBLIC_API_URL);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.gystify.com" />
      </head>
      <body
        className={`${inter.variable} ${poppins.className} antialiased font-sans`}
        suppressHydrationWarning
      >
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: 'Gystify - AI-Powered Email Intelligence & Productivity Suite',
    template: '%s | Gystify - Smart Email Management',
  },
  description:
    'Transform your email overload into actionable insights with AI-powered summaries. Boost productivity with intelligent email management, smart filtering, and automated prioritization.',
  keywords: [
    'email management',
    'AI email assistant',
    'email productivity',
    'email summarization',
    'intelligent inbox',
    'email automation',
    'productivity tools',
    'smart email filtering',
    'email analytics',
    'business email tools',
    'email insights',
    'automated email processing',
  ],
  authors: [{ name: 'Gystify Team' }],
  creator: 'Gystify',
  publisher: 'Gystify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gystify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gystify - AI-Powered Email Intelligence & Productivity Suite',
    description:
      'Transform your email overload into actionable insights with AI-powered summaries. Boost productivity with intelligent email management and smart filtering.',
    url: 'https://gystify.app',
    siteName: 'Gystify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gystify - AI-Powered Email Intelligence',
      },
      {
        url: '/og-image-square.png',
        width: 600,
        height: 600,
        alt: 'Gystify Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gystify - AI-Powered Email Intelligence',
    description:
      'Transform your email overload into actionable insights with AI-powered summaries. Boost productivity with intelligent email management.',
    images: ['/twitter-image.png'],
    creator: '@gystify',
    site: '@gystify',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',
  applicationName: 'Gystify',
  generator: 'Next.js',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'Gystify',
    statusBarStyle: 'default',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};
