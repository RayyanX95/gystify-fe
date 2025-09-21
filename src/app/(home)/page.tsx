import { HeroSection, FeaturesSection, CTASection, HowItWorksSection } from './sections';
import { generateStructuredData } from '@/lib/seo';

// No need for metdata here as the root layout is enough

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
