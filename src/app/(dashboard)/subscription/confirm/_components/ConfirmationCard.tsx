'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import {
  PRICING_PLANS,
  SubscriptionTier,
  BillingCycle,
  calculateYearlySavings,
} from '@/lib/types/subscription';
import { useSubscriptionStore } from '@/lib/stores/subscriptionStore';
import { useToast } from '@/lib/hooks/useToast';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';

interface ConfirmationCardProps {
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
}

export default function ConfirmationCard({ tier, billingCycle }: ConfirmationCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { upgradePlan, isLoading } = useSubscriptionStore();
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');

  const plan = PRICING_PLANS.find((p) => p.tier === tier);
  if (!plan) {
    router.push('/pricing');
    return null;
  }

  const isYearly = billingCycle === BillingCycle.YEARLY;
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const savings = calculateYearlySavings(plan.monthlyPrice, plan.yearlyPrice);

  const handleConfirmPayment = async () => {
    setPaymentStep('processing');

    try {
      // Simulate Stripe payment processing
      toast({
        title: 'Processing payment...',
        description: 'Securely processing your payment with Stripe.',
      });

      // Mock Stripe payment confirmation (2-3 second delay)
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Simulate successful payment intent confirmation
      const success = await upgradePlan(tier, isYearly ? 'yearly' : 'monthly');

      if (success) {
        setPaymentStep('success');
        toast({
          title: 'Payment successful!',
          description: `Welcome to ${plan.name}! Your subscription is now active.`,
        });

        // Redirect to dashboard after showing success
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        throw new Error('Subscription activation failed');
      }
    } catch {
      setPaymentStep('details');
      toast({
        title: 'Payment failed',
        description: 'Your card was declined. Please check your card details and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    router.push('/pricing');
  };

  if (paymentStep === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <p className="text-muted-foreground">
              Welcome to {plan.name}! Redirecting to dashboard...
            </p>
          </CardHeader>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid lg:grid-cols-3 gap-8 items-start  section-layout">
        <OrderSummary plan={plan} price={price} isYearly={isYearly} savings={savings} />

        <PaymentForm
          tier={tier}
          planName={plan.name}
          price={price}
          isYearly={isYearly}
          isLoading={isLoading}
          paymentStep={paymentStep}
          onConfirmPayment={handleConfirmPayment}
          onCancel={handleCancel}
        />
      </div>
    </motion.div>
  );
}
