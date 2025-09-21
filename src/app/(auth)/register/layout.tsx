import { generateMetadata as generateSEOMetadata, combineKeywords } from '@/lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sign Up - Start Your AI Email Intelligence Journey',
  description:
    'Create your Gystify account and transform your email experience with AI-powered summaries, smart prioritization, and productivity insights. Get started free today.',
  keywords: combineKeywords('email', 'productivity').concat([
    'sign up',
    'register',
    'create account',
    'gystify signup',
    'gystify register',
    'email productivity signup',
    'ai email assistant signup',
    'free trial',
    'get started',
  ]),
  canonical: '/register',
  ogImage: '/og-register.png',
});

export { default } from './page';
