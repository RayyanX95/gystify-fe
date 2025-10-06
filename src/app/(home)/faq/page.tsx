import { generateStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about Gystify AI email summarization, pricing, security, and more.',
  openGraph: {
    title: 'FAQ | Gystify',
    description:
      'Find answers to common questions about Gystify AI email summarization, pricing, security, and more.',
  },
};

export default function FAQPage() {
  const structuredData = generateStructuredData({
    type: 'WebSite',
    name: 'FAQ - Gystify',
    description: 'Frequently asked questions about Gystify AI email summarization service',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <FAQContent />
    </>
  );
}
