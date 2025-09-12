'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/lib/hooks/useToast';

export default function HeroSection() {
  const { toast } = useToast();
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section-layout"
    >
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6"
        >
          Summarize Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
            Emails
          </span>{' '}
          Instantly
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
        >
          Transform your email overload into clear, actionable insights with AI-powered
          summarization. Save time, stay organized, and never miss what matters.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, staggerChildren: 0.1 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-indigo-700 text-white"
            onClick={() =>
              toast({
                title: 'Get Started',
                description: 'Sign up for a free trial to start using Summa.',
                duration: 4000,
                variant: 'destructive',
              })
            }
          >
            Start Free Trial
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            Watch Demo
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
