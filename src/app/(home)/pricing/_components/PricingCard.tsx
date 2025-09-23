'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import {
  PlanPricing,
  BillingCycle,
  formatPrice,
  calculateYearlySavings,
} from '@/lib/types/subscription';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PricingCardProps {
  plan: PlanPricing;
  billingCycle: BillingCycle;
  index: number;
}

export default function PricingCard({ plan, billingCycle, index }: PricingCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isYearly = billingCycle === BillingCycle.YEARLY;
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const savings = calculateYearlySavings(plan.monthlyPrice, plan.yearlyPrice);

  const handleSelectPlan = async () => {
    setIsLoading(true);

    // For trial plan, redirect to register
    if (plan.tier === 'trial') {
      router.push('/register');
      return;
    }

    // For paid plans, you would integrate with your payment processor
    // For now, redirect to register with plan parameter
    router.push(`/register?plan=${plan.tier}&billing=${billingCycle}`);

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative"
    >
      <Card
        className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
          plan.isPopular
            ? 'border-primary shadow-lg ring-2 ring-primary/20 scale-105'
            : 'hover:border-primary/50'
        }`}
      >
        {plan.isPopular && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Most Popular
            </div>
          </div>
        )}

        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
          <p className="text-muted-foreground text-sm">{plan.description}</p>

          <div className="mt-4">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-bold">{formatPrice(price)}</span>
              {price > 0 && (
                <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
              )}
            </div>

            {isYearly && savings > 0 && (
              <Badge variant="secondary" className="mt-2">
                Save {savings}% annually
              </Badge>
            )}

            {isYearly && price > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {formatPrice(Math.round(price / 12))}/month billed annually
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleSelectPlan}
            disabled={isLoading}
            className={`w-full ${
              plan.isPopular
                ? 'bg-primary hover:bg-primary/90'
                : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
            }`}
            size="lg"
          >
            {isLoading ? 'Loading...' : plan.tier === 'trial' ? 'Start Free Trial' : 'Get Started'}
          </Button>

          {plan.tier === 'trial' && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              No credit card required
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
