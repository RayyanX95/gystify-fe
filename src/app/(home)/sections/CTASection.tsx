'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="bg-white border-t">
      <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
          Ready to Transform Your Email Experience?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Stop drowning in email overload. Start your free trial and experience the power of
          AI-powered email summaries. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-indigo-700 text-white">
            Start Free Trial
          </Button>
          <p className="text-sm text-muted-foreground">
            ✓ Free to try ✓ No credit card ✓ Gmail integration
          </p>
        </div>
      </motion.div>
    </section>
  );
}
