import { generateMetadata as generateSEOMetadata, combineKeywords } from '@/lib/seo';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Dashboard - Email Analytics & Insights',
  description:
    'Access your personalized email dashboard with AI-powered insights, priority summaries, and productivity metrics. Track your email efficiency and discover actionable patterns.',
  keywords: combineKeywords('email', 'productivity', 'features').concat([
    'email dashboard',
    'email analytics',
    'email metrics',
    'productivity dashboard',
    'email insights',
  ]),
  canonical: '/dashboard',
  noindex: true, // Private dashboard, no need to index
  ogImage: '/og-dashboard.png',
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
