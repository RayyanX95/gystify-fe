'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { MotionMain } from '@/lib/motion';

export function AppAnimator({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure animations only start after hydration
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <AnimatePresence mode="wait">
      <MotionMain
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-1"
      >
        {children}
      </MotionMain>
    </AnimatePresence>
  );
}
