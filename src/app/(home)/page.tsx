import { HeroSection, FeaturesSection, CTASection, HowItWorksSection } from './sections';
import {
  generateMetadata as generateSEOMetadata,
  combineKeywords,
  generateStructuredData,
} from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'AI-Powered Email Intelligence & Productivity Suite',
  description:
    'Transform your email overload into actionable insights with Gystify. Get AI-powered email summaries, smart prioritization, and automated workflows to boost your productivity by 3x.',
  keywords: combineKeywords('email', 'ai', 'productivity', 'features'),
  canonical: '/',
  ogImage: '/og-home.png',
  twitterImage: '/twitter-home.png',
});

export default function HomePage() {
  const structuredData = generateStructuredData({
    type: 'WebApplication',
    name: 'Gystify - AI Email Intelligence Platform',
    description:
      'Revolutionary AI-powered email management platform that transforms email overload into actionable insights with smart summaries, priority detection, and automated workflows.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web Browser, iOS, Android',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="bg-gray-50">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </div>
    </>
  );
}
