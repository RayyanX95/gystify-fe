'use client';

import Head from 'next/head';

interface DynamicSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export default function DynamicSEO({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  additionalMeta = [],
}: DynamicSEOProps) {
  const baseUrl = 'https://gystify.app';
  const fullTitle = title ? `${title} | Gystify` : 'Gystify - AI-Powered Email Intelligence';
  const fullDescription =
    description ||
    'Transform your email overload into actionable insights with AI-powered summaries and smart automation.';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage ? `${baseUrl}${ogImage}` : `${baseUrl}/og-image.png`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Gystify" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@gystify" />
      <meta name="twitter:creator" content="@gystify" />

      {/* Additional meta tags */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : {})}
          {...(meta.property ? { property: meta.property } : {})}
          content={meta.content}
        />
      ))}

      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
    </Head>
  );
}
