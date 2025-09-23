import { Suspense } from 'react';
import { BillingCycle, SubscriptionTier } from '@/lib/types';
import ConfirmationCard from './_components/ConfirmationCard';
import { Metadata } from 'next';

interface Props {
  searchParams: {
    tier?: string;
    billing?: string;
  };
}

export default function ConfirmationPage({ searchParams }: Props) {
  const tier = searchParams.tier as SubscriptionTier;
  const billing = searchParams.billing as 'monthly' | 'yearly';

  if (!tier || !billing) {
    return (
      <div className="container max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Subscription</h1>
          <p className="text-muted-foreground">
            The subscription details are missing. Please go back to pricing.
          </p>
        </div>
      </div>
    );
  }

  const billingCycle = billing === 'yearly' ? BillingCycle.YEARLY : BillingCycle.MONTHLY;
  return (
    <Suspense
      fallback={
        <div className="container max-w-2xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="text-center space-y-4">
              <div className="h-8 bg-muted rounded w-64 mx-auto" />
              <div className="h-4 bg-muted rounded w-96 mx-auto" />
            </div>
            <div className="h-96 bg-muted rounded" />
          </div>
        </div>
      }
    >
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Subscription</h1>
          <p className="text-muted-foreground">
            Review your plan details and complete your payment
          </p>
        </div>

        <ConfirmationCard tier={tier} billingCycle={billingCycle} />
      </div>
    </Suspense>
  );
}

export const metadata: Metadata = {
  title: 'Confirm Subscription - Gystify',
  description: 'Complete your subscription to Gystify',
  robots: {
    index: false,
    follow: false,
  },
};
