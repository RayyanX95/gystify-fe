import { generateStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import PrivacyPolicyContent from './PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Gystify protects your privacy and handles your email data with our comprehensive privacy policy.',
  openGraph: {
    title: 'Privacy Policy | Gystify',
    description:
      'Learn how Gystify protects your privacy and handles your email data with our comprehensive privacy policy.',
  },
};

export default function PrivacyPolicyPage() {
  const structuredData = generateStructuredData({
    type: 'WebSite',
    name: 'Privacy Policy - Gystify',
    description: 'Privacy policy for Gystify AI email summarization service',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <PrivacyPolicyContent />
    </>
  );
}
