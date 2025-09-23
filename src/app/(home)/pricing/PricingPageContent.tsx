'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PricingCard, PlanComparison, FAQSection } from './_components';
import { PRICING_PLANS, BillingCycle } from '@/lib/types/subscription';
import { generateStructuredData } from '@/lib/seo';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function PricingPageContent() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);

  const structuredData = generateStructuredData({
    type: 'SoftwareApplication',
    name: 'Gystify - AI Email Summarization Plans',
    description:
      'Choose the perfect AI email summarization plan for your needs. Free trial available with Gmail integration and advanced AI summaries.',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web Browser',
    offers: {
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  });

  const isYearly = billingCycle === BillingCycle.YEARLY;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-background py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Badge variant="secondary" className="mb-4">
                Simple, Transparent Pricing
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Choose Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500">
                  Perfect Plan
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Start with our free trial and upgrade when you&apos;re ready. All plans include our
                powerful AI email summarization and Gmail integration.
              </p>

              {/* Billing Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center gap-4 mb-12"
              >
                <span
                  className={`text-sm font-medium ${
                    !isYearly ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  Monthly
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setBillingCycle(isYearly ? BillingCycle.MONTHLY : BillingCycle.YEARLY)
                  }
                  className={`relative w-14 h-8 p-0 ${isYearly ? 'bg-primary' : 'bg-muted'}`}
                >
                  <div
                    className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-200 ${
                      isYearly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Button>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      isYearly ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    Yearly
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    Save up to 17%
                  </Badge>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {PRICING_PLANS.map((plan, index) => (
                <PricingCard
                  key={plan.tier}
                  plan={plan}
                  billingCycle={billingCycle}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">No setup fees</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Cancel anytime</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">30-day money back guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Plan Comparison */}
        <section className="bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <PlanComparison />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQSection />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Email Experience?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have already streamlined their email workflow
                with Gystify&apos;s AI-powered summaries.
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
                onClick={() => (window.location.href = '/register')}
              >
                Start Your Free Trial
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
