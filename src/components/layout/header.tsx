'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/authStore';
import { LogOut, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const Header = () => {
  const { user, logout, isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const headerContent = (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link href="/" className="flex items-center  text-foreground text-3xl">
          <strong className="text-primary font-[900] italic">G</strong>
          <motion.span
            whileHover={{ x: 4 }}
            className="text-2xl border-b-2 border-primary font-medium border-spacing-4"
          >
            ystify
          </motion.span>
        </Link>
        {hasHydrated ? (
          isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
              <Button variant="ghost" size="sm">
                <Link href="/dashboard" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-indigo-600"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => router.push('/register')}
              >
                Get Started
              </Button>
            </div>
          )
        ) : (
          // Rehydrating: render neutral placeholders to avoid flash
          <div className="flex items-center space-x-4">
            <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            <div className="h-8 w-20 bg-muted rounded animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );

  if (!isReady) {
    return (
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        {headerContent}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50"
    >
      {headerContent}
    </motion.div>
  );
};
