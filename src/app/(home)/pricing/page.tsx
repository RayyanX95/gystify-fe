import { Metadata } from 'next';
import { generateMetadata, combineKeywords } from '@/lib/seo';
import PricingPageContent from './PricingPageContent';

export const metadata: Metadata = generateMetadata({
  title: 'Pricing Plans - Choose Your Perfect AI Email Solution',
  description:
    'Compare Gystify pricing plans and find the perfect AI email summarization solution for your needs. Free trial available with Gmail integration, advanced AI summaries, and more.',
  keywords: combineKeywords('email', 'ai', 'productivity', 'features').concat([
    'pricing plans',
    'email subscription',
    'AI email pricing',
    'gmail integration pricing',
    'email productivity plans',
    'free trial',
    'email summarization cost',
  ]),
  canonical: '/pricing',
});

export default function PricingPage() {
  return <PricingPageContent />;
}
