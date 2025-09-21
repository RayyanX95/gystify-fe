'use client';

import { useEffect } from 'react';
import { generateStructuredData } from '@/lib/seo';

interface StructuredDataProps {
  type: 'WebApplication' | 'Organization' | 'WebSite' | 'SoftwareApplication';
  data?: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    let structuredData;

    switch (type) {
      case 'Organization':
        structuredData = generateStructuredData({
          type: 'Organization',
          name: 'Gystify',
          description:
            'AI-powered email intelligence platform that transforms email overload into actionable insights',
          url: 'https://gystify.app',
          logo: 'https://gystify.app/logo.svg',
          sameAs: [
            'https://twitter.com/gystify',
            'https://linkedin.com/company/gystify',
            'https://github.com/gystify',
          ],
          ...data,
        });
        break;

      case 'WebSite':
        structuredData = generateStructuredData({
          type: 'WebSite',
          name: 'Gystify - AI Email Intelligence Platform',
          description:
            'Transform your email overload into actionable insights with AI-powered summaries and smart automation',
          url: 'https://gystify.app',
          ...data,
        });
        break;

      case 'WebApplication':
      case 'SoftwareApplication':
        structuredData = generateStructuredData({
          type,
          name: 'Gystify Email Intelligence Suite',
          description:
            'Revolutionary AI-powered email management platform with smart summaries, priority detection, and productivity analytics',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web Browser, iOS, Android',
          offers: {
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
          ...data,
        });
        break;
    }

    if (structuredData) {
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [type, data]);

  return null;
}
