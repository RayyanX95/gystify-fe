import { generateMetadata as generateSEOMetadata, combineKeywords } from '@/lib/seo';
import { Metadata } from 'next';
import { SettingsContent } from './SettingsContent';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Account Settings - Manage Your Gystify Profile & Preferences',
  description:
    'Manage your Gystify account settings, profile information, notification preferences, and subscription. Customize your email intelligence experience.',
  keywords: combineKeywords('email', 'productivity').concat([
    'account settings',
    'user settings',
    'profile settings',
    'notifications',
    'subscription management',
    'account preferences',
    'email preferences',
    'user profile',
  ]),
  canonical: '/settings',
  ogImage: '/og-settings.png',
});

export default function SettingsPage() {
  return <SettingsContent />;
}
