'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Zap, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
  return (
    <section className="section-layout">
      <motion.div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Why Choose Summa?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed to streamline your email management and boost your
          productivity.
        </p>
      </motion.div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Zap className="h-8 w-8 text-primary" />,
            title: 'AI-Powered',
            description:
              'Advanced AI technology provides accurate and contextual email summaries in seconds.',
          },
          {
            icon: <Clock className="h-8 w-8 text-primary" />,
            title: 'Save Time',
            description:
              'Reduce email processing time by up to 80% with intelligent summarization.',
          },
          {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: 'Secure & Private',
            description:
              'Enterprise-grade security ensures your email data remains private and protected.',
          },
          {
            icon: <Mail className="h-8 w-8 text-primary" />,
            title: 'Easy Integration',
            description:
              'Seamlessly connects with all major email providers including Gmail, Outlook, and more.',
          },
        ].map((feature, index) => (
          <motion.div key={index}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white h-full">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  {feature.icon}
                </div>
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
