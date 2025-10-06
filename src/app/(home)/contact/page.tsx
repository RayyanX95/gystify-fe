import { generateStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the Gystify team. We're here to help with support, questions, and feedback about our AI email summarization platform.",
  openGraph: {
    title: 'Contact Us | Gystify',
    description:
      "Get in touch with the Gystify team. We're here to help with support, questions, and feedback about our AI email summarization platform.",
  },
};

export default function ContactPage() {
  const structuredData = generateStructuredData({
    type: 'Organization',
    name: 'Contact Gystify',
    description: 'Contact information for Gystify AI email summarization service',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ContactContent />
    </>
  );
}
