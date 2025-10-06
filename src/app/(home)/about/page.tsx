import { generateStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import AboutUsContent from './AboutUsContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Gystify's mission to transform email productivity through AI-powered summarization and intelligent email management.",
  openGraph: {
    title: 'About Us | Gystify',
    description:
      "Learn about Gystify's mission to transform email productivity through AI-powered summarization and intelligent email management.",
  },
};

export default function AboutUsPage() {
  const structuredData = generateStructuredData({
    type: 'Organization',
    name: 'Gystify - About Us',
    description: 'About Gystify AI email summarization company',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <AboutUsContent />
    </>
  );
}
