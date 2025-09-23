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
import { useAuthStore } from '@/lib/stores/authStore';
import { useSubscriptionStore } from '@/lib/stores/subscriptionStore';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/useToast';

interface PricingCardProps {
  plan: PlanPricing;
  billingCycle: BillingCycle;
  index: number;
}

export const PricingCard = ({ plan, billingCycle, index }: PricingCardProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, setPendingPlan } = useAuthStore();
  const { status, startTrial, isLoading } = useSubscriptionStore();

  const isYearly = billingCycle === BillingCycle.YEARLY;
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const savings = calculateYearlySavings(plan.monthlyPrice, plan.yearlyPrice);
  const isCurrentPlan = status?.tier === plan.tier;
  const isTrial = plan.tier === 'trial';
  const isTrialActive = status?.isTrialActive;

  const getButtonText = () => {
    if (isCurrentPlan) {
      return 'Current Plan';
    }

    if (isTrial) {
      if (isTrialActive) {
        return 'Trial Active';
      }
      return 'Start Free Trial';
    }

    return isAuthenticated ? 'Select Plan' : 'Get Started';
  };

  const getButtonVariant = () => {
    if (isCurrentPlan) return 'outline';
    if (plan.isPopular) return 'default';
    return 'outline';
  };

  const isButtonDisabled = () => {
    return isLoading || (isCurrentPlan && !isTrial) || (isTrial && isTrialActive);
  };

  const handleSelectPlan = async () => {
    if (!isAuthenticated) {
      // Store plan selection and redirect to Google SSO
      setPendingPlan({
        tier: plan.tier,
        billingCycle: isYearly ? 'yearly' : 'monthly',
      });
      router.push('/login');
      return;
    }

    // User is authenticated
    if (isTrial) {
      // Start trial directly
      const success = await startTrial();
      if (success) {
        toast({
          title: 'Free trial started!',
          description: 'You can now create email snapshots and summaries.',
        });
        router.push('/dashboard');
      }
    } else {
      // Redirect to subscription confirmation page
      router.push(
        `/subscription/confirm?tier=${plan.tier}&billing=${isYearly ? 'yearly' : 'monthly'}`
      );
    }
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
            disabled={isButtonDisabled()}
            variant={getButtonVariant()}
            className={`w-full ${
              plan.isPopular && !isCurrentPlan ? 'bg-primary hover:bg-primary/90' : ''
            }`}
            size="lg"
          >
            {isLoading ? 'Loading...' : getButtonText()}
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
};
