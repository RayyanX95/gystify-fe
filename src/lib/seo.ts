import { Metadata } from 'next';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: string;
  twitterImage?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    noindex = false,
    nofollow = false,
    ogImage = '/og-image.png',
    twitterImage = '/twitter-image.png',
  } = config;

  const baseUrl = 'https://gystify.app';
  const fullTitle = title ? `${title} | Gystify` : 'Gystify - AI-Powered Email Intelligence';
  const fullDescription =
    description ||
    'Transform your email overload into actionable insights with AI-powered summaries. Boost productivity with intelligent email management.';

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [
      'email management',
      'AI email assistant',
      'email productivity',
      'email summarization',
      'intelligent inbox',
      ...keywords,
    ],
    alternates: {
      canonical: canonical ? `${baseUrl}${canonical}` : undefined,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: 'Gystify',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [twitterImage],
      creator: '@gystify',
      site: '@gystify',
    },
    robots: {
      index: !noindex,
      follow: !nofollow,
      nocache: true,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export interface StructuredDataConfig {
  type: 'WebApplication' | 'Organization' | 'WebSite' | 'SoftwareApplication';
  name?: string;
  description?: string;
  url?: string;
  logo?: string;
  sameAs?: string[];
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export function generateStructuredData(config: StructuredDataConfig) {
  const baseUrl = 'https://gystify.app';

  const baseData = {
    '@context': 'https://schema.org',
  };

  switch (config.type) {
    case 'WebApplication':
    case 'SoftwareApplication':
      return {
        ...baseData,
        '@type': config.type,
        name: config.name || 'Gystify',
        description: config.description || 'AI-powered email intelligence and productivity suite',
        url: config.url || baseUrl,
        applicationCategory: config.applicationCategory || 'BusinessApplication',
        operatingSystem: config.operatingSystem || 'Web Browser',
        offers: config.offers || {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Gystify',
          url: baseUrl,
        },
      };

    case 'Organization':
      return {
        ...baseData,
        '@type': 'Organization',
        name: config.name || 'Gystify',
        description:
          config.description || 'AI-powered email intelligence and productivity solutions',
        url: config.url || baseUrl,
        logo: config.logo || `${baseUrl}/logo.svg`,
        sameAs: config.sameAs || [
          'https://twitter.com/gystify',
          'https://linkedin.com/company/gystify',
        ],
      };

    case 'WebSite':
      return {
        ...baseData,
        '@type': 'WebSite',
        name: config.name || 'Gystify',
        description: config.description || 'AI-powered email intelligence platform',
        url: config.url || baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };

    default:
      return baseData;
  }
}

export const seoKeywords = {
  email: [
    'email management',
    'email productivity',
    'smart inbox',
    'email organization',
    'bulk email processing',
  ],
  ai: [
    'AI email assistant',
    'artificial intelligence',
    'machine learning email',
    'automated email processing',
    'intelligent email filtering',
  ],
  productivity: [
    'productivity tools',
    'time management',
    'workflow optimization',
    'business efficiency',
    'task automation',
  ],
  features: [
    'email summarization',
    'email analytics',
    'priority detection',
    'smart notifications',
    'email insights',
  ],
};

export function combineKeywords(...categories: (keyof typeof seoKeywords)[]): string[] {
  return categories.flatMap((category) => seoKeywords[category] || []);
}
