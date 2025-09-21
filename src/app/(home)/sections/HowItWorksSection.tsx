'use client';

import { motion } from 'framer-motion';
import { Zap, MailOpen, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { IconWithBackground } from '@/components';

export default function HowItWorksSection() {
  return (
    <section className="section-layout">
      <motion.div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          From Email Chaos to Clarity in 3 Simple Steps
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your overwhelming inbox into an organized, actionable workspace with our proven
          3-step email intelligence process.
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
            icon: <MailOpen className="h-8 w-8 text-primary" />,
            title: '1. Connect Your Gmail',
            description:
              'Securely connect your Gmail account in under 30 seconds with OAuth 2.0 authentication. No passwords stored, ever.',
          },
          {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: '2. AI Analyzes & Summarizes',
            description:
              'Our AI engine processes your email content and creates clear, concise summaries that highlight the key information and main points.',
          },
          {
            icon: <CheckCircle className="h-8 w-8 text-primary" />,
            title: '3. Review & Take Action',
            description:
              'Access your personalized dashboard with clear email summaries that help you quickly understand and respond to important messages.',
          },
        ].map((step, idx) => (
          <Card
            key={idx}
            className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full"
          >
            <CardHeader className="text-center pb-4">
              <IconWithBackground>{step.icon}</IconWithBackground>
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
