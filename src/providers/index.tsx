'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { QueryProvider } from './QueryProvider';
import { Footer, Header } from '@/components';

// Dynamically import components with no SSR to prevent hydration issues
const Toaster = dynamic(() => import('@/components/ui/toaster').then((m) => m.Toaster), {
  ssr: false,
  loading: () => null,
});

const AppAnimator = dynamic(() => import('./AppAnimator').then((m) => m.AppAnimator), {
  ssr: false,
  loading: () => <main className="flex-1">{null}</main>,
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <AppAnimator>{children}</AppAnimator>
        <Footer />
      </div>
      <Toaster />
    </QueryProvider>
  );
};
