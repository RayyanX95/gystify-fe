'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Zap, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { IconWithBackground } from '@/components';

export default function FeaturesSection() {
  return (
    <section className="section-layout">
      <motion.div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Why Choose Gystify for Email Intelligence
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful AI-driven email summarization designed to help professionals cut through email
          overload and focus on what matters most.
        </p>
      </motion.div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: 'Smart AI Summarization',
            description:
              'Advanced AI technology analyzes your Gmail messages and creates clear, concise summaries that capture the key points and action items.',
          },
          {
            icon: <Clock className="h-8 w-8 text-primary" />,
            title: 'Save 3+ Hours Daily',
            description:
              'Transform lengthy emails into quick, digestible summaries so you can process your inbox faster and focus on important tasks.',
          },
          {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: 'Secure & Private',
            description:
              'Your email data is processed securely with industry-standard encryption. We prioritize your privacy and never store sensitive information.',
          },
          {
            icon: <Mail className="h-8 w-8 text-primary" />,
            title: 'Gmail Integration',
            description:
              'Currently supports Gmail with secure OAuth authentication. Additional email providers coming soon to expand your options.',
          },
        ].map((feature, index) => (
          <motion.div key={index}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full">
              <CardHeader className="text-center pb-4">
                <IconWithBackground>{feature.icon}</IconWithBackground>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
