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
          Join thousands of professionals who have already revolutionized their email workflow with
          Summa. Start your free trial today.
        </p>
        <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-indigo-700 text-white">
          Get Started for Free
        </Button>
      </motion.div>
    </section>
  );
}
