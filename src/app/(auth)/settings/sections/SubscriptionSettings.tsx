'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSubscriptionStatus } from '@/lib/hooks/useSubscriptionStatus';
import { useToast } from '@/lib/hooks/useToast';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Calendar,
  TrendingUp,
  Zap,
  AlertCircle,
  CheckCircle,
  Download,
  ExternalLink,
} from 'lucide-react';
import { SubscriptionTier, BillingCycle } from '@/lib/types/subscription';

export function SubscriptionSettings() {
  const { isLoading } = useSubscriptionStatus();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock data for demonstration
  const currentPlan = {
    tier: SubscriptionTier.STARTER,
    billingCycle: BillingCycle.MONTHLY,
    status: 'active',
    nextBillingDate: '2024-11-06',
    currentPeriodEnd: '2024-11-06',
    cancelAtPeriodEnd: false,
  };

  const usage = {
    snapshotsUsed: 45,
    snapshotsLimit: 100,
    emailsProcessed: 1250,
    emailsLimit: 2500,
  };

  const billingHistory = [
    { date: '2024-10-06', amount: '$29.00', status: 'paid', invoice: 'inv_123' },
    { date: '2024-09-06', amount: '$29.00', status: 'paid', invoice: 'inv_122' },
    { date: '2024-08-06', amount: '$29.00', status: 'paid', invoice: 'inv_121' },
  ];

  const getTierDisplayName = (tier: SubscriptionTier) => {
    const names = {
      [SubscriptionTier.FREE]: 'Free',
      [SubscriptionTier.TRIAL]: 'Trial',
      [SubscriptionTier.STARTER]: 'Starter',
      [SubscriptionTier.PRO]: 'Professional',
    };
    return names[tier] || tier;
  };

  const handleCancelSubscription = async () => {
    setIsUpdating(true);
    try {
      // Here you would make an API call to cancel the subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Subscription cancelled',
        description: 'Your subscription will end at the current billing period end.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReactivateSubscription = async () => {
    setIsUpdating(true);
    try {
      // Here you would make an API call to reactivate the subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Subscription reactivated',
        description: 'Your subscription will continue at the next billing cycle.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to reactivate subscription. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-48 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-64 bg-muted/50 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Current Plan Status */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-primary" />
            <div>
              <h3 className="text-xl font-semibold">Current Plan</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="default">{getTierDisplayName(currentPlan.tier)}</Badge>
                <span className="text-sm text-muted-foreground capitalize">
                  {currentPlan.billingCycle}
                </span>
              </div>
            </div>
          </div>
          {currentPlan.status === 'active' ? (
            <CheckCircle className="h-6 w-6 text-green-600" />
          ) : (
            <AlertCircle className="h-6 w-6 text-yellow-600" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Next Billing</span>
            </div>
            <p className="text-lg font-semibold">
              {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-background/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Status</span>
            </div>
            <p className="text-lg font-semibold capitalize">
              {currentPlan.cancelAtPeriodEnd ? 'Ending Soon' : currentPlan.status}
            </p>
          </div>

          <div className="bg-background/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Monthly Cost</span>
            </div>
            <p className="text-lg font-semibold">
              {currentPlan.tier === SubscriptionTier.STARTER
                ? '$29'
                : currentPlan.tier === SubscriptionTier.PRO
                ? '$79'
                : '$0'}
            </p>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Usage This Month</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Email Snapshots</span>
              <span className="text-sm text-muted-foreground">
                {usage.snapshotsUsed} / {usage.snapshotsLimit}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((usage.snapshotsUsed / usage.snapshotsLimit) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Emails Processed</span>
              <span className="text-sm text-muted-foreground">
                {usage.emailsProcessed.toLocaleString()} / {usage.emailsLimit.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((usage.emailsProcessed / usage.emailsLimit) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Plan Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Plan Management</h3>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href="/pricing">
              <TrendingUp className="h-4 w-4 mr-2" />
              Upgrade Plan
            </a>
          </Button>

          {/* <Button variant="outline">
            <CreditCard className="h-4 w-4 mr-2" />
            Update Payment Method
          </Button> */}

          {currentPlan.cancelAtPeriodEnd ? (
            <Button variant="outline" onClick={handleReactivateSubscription} disabled={isUpdating}>
              {isUpdating ? 'Processing...' : 'Reactivate Subscription'}
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleCancelSubscription} disabled={isUpdating}>
              {isUpdating ? 'Processing...' : 'Cancel Subscription'}
            </Button>
          )}
        </div>

        {currentPlan.cancelAtPeriodEnd && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800">Subscription Ending</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Your subscription will end on{' '}
                  {new Date(currentPlan.currentPeriodEnd).toLocaleDateString()}. You&apos;ll
                  continue to have access until then.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <Separator /> */}

      {/* Billing History */}
      {/* <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Billing History</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All
          </Button>
        </div>

        <div className="space-y-3">
          {billingHistory.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{bill.amount}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(bill.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant={bill.status === 'paid' ? 'default' : 'secondary'}>
                  {bill.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </motion.div>
  );
}
