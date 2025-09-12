'use client';

import { motion } from 'framer-motion';
import { Zap, MailOpen, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function HowItWorksSection() {
  return (
    <section className="section-layout">
      <motion.div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how Summa transforms your emails into actionable summaries in just a few steps.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {[
          {
            icon: <MailOpen className="h-10 w-10 text-primary" />,
            title: 'Connect Your Email',
            description:
              'Securely link your email account with Summa. We support Gmail, Outlook, and more.',
          },
          {
            icon: <Zap className="h-10 w-10 text-primary" />,
            title: 'AI Summarizes',
            description:
              'Our advanced AI instantly analyzes and summarizes your emails for clarity and action.',
          },
          {
            icon: <CheckCircle className="h-10 w-10 text-primary" />,
            title: 'Review & Act',
            description:
              'Get concise summaries and take action faster—reply, archive, or follow up with ease.',
          },
        ].map((step, idx) => (
          <Card
            key={idx}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full"
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{step.icon}</div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="text-base leading-relaxed text-muted-foreground">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
