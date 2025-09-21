import { HeroSection, FeaturesSection, CTASection, HowItWorksSection } from './sections';
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  combineKeywords,
} from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'AI Email Summarization for Gmail - Transform Email Overload',
  description:
    'Transform your Gmail overload into clear, actionable insights with Gystify. AI-powered email summaries help busy professionals cut through clutter and focus on what matters. Free trial available.',
  keywords: combineKeywords('email', 'ai', 'productivity').concat([
    'gmail summarization',
    'email overload solution',
    'gmail productivity',
    'email summaries',
    'gmail AI assistant',
    'business email management',
    'email intelligence',
    'gmail automation',
  ]),
  canonical: '/',
  ogImage: '/og-home.png',
  twitterImage: '/twitter-home.png',
});

export default function HomePage() {
  const structuredData = generateStructuredData({
    type: 'SoftwareApplication',
    name: 'Gystify - AI Email Summarization for Gmail',
    description:
      'AI-powered email summarization platform that transforms Gmail overload into clear, actionable insights. Help busy professionals process emails faster with intelligent summaries.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web Browser',
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
