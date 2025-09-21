import { generateMetadata as generateSEOMetadata, combineKeywords } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sign In - Access Your Email Intelligence Dashboard',
  description:
    'Sign in to Gystify to access your personalized AI-powered email dashboard. Get instant email summaries, priority insights, and productivity analytics.',
  keywords: combineKeywords('email', 'productivity').concat([
    'sign in',
    'login',
    'email login',
    'gystify login',
    'gystify sign in',
    'user authentication',
    'secure login',
    'email dashboard access',
  ]),
  canonical: '/login',
  ogImage: '/og-login.png',
});

export { default } from './page';
