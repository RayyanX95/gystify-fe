import { HeroSection, FeaturesSection, CTASection, HowItWorksSection } from './_components';
import { generateStructuredData } from '@/lib/seo';

// No need for metadata here as the root layout is enough

// "Unlike other email tools that charge you upfront,
// we're so confident you'll love Gystify that we give you
// 15 free AI snapshots with no credit card required.

// Try it free for 7 days → Experience the value → Then decide."

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
