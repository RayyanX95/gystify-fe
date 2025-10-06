import { generateStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import TermsOfUseContent from './TermsOfUseContent';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read our terms of service for using Gystify AI email summarization platform.',
  openGraph: {
    title: 'Terms of Use | Gystify',
    description: 'Read our terms of service for using Gystify AI email summarization platform.',
  },
};

export default function TermsOfUsePage() {
  const structuredData = generateStructuredData({
    type: 'WebSite',
    name: 'Terms of Use - Gystify',
    description: 'Terms of service for Gystify AI email summarization service',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <TermsOfUseContent />
    </>
  );
}
