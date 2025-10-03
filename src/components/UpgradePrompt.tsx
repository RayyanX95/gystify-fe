'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Crown, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSubscriptionStatus } from '@/lib/hooks/useSubscriptionStatus';

interface Props {
  trigger?: 'trial-expired' | 'limit-reached' | 'feature-locked';
  feature?: string;
  className?: string;
}

export function UpgradePrompt({ trigger = 'limit-reached', feature, className = '' }: Props) {
  const router = useRouter();
  const { isTrialExpired, needsUpgrade, subscriptionTier } = useSubscriptionStatus();

  if (!needsUpgrade && !isTrialExpired) {
    return null;
  }

  const getPromptContent = () => {
    switch (trigger) {
      case 'trial-expired':
        return {
          title: 'Trial Expired',
          description:
            'Your free trial has ended. Choose a plan to continue using all features, or start a new trial.',
          icon: Crown,
          buttonText: 'View Plans & Trial',
        };
      case 'feature-locked':
        return {
          title: subscriptionTier === 'free' ? 'Unlock Premium Features' : `Upgrade for ${feature}`,
          description:
            subscriptionTier === 'free'
              ? `${feature} requires a subscription. Start with a free trial or choose a paid plan.`
              : `${feature} is available on paid plans. Upgrade to unlock this feature.`,
          icon: Zap,
          buttonText: subscriptionTier === 'free' ? 'Start Trial or Upgrade' : 'Upgrade Now',
        };
      default:
        return {
          title: 'Usage Limit Reached',
          description:
            "You've reached your daily limit. Upgrade for unlimited access or start a free trial.",
          icon: Zap,
          buttonText: 'View Options',
        };
    }
  };

  const content = getPromptContent();
  const Icon = content.icon;

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
              <Icon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{content.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
            </div>
            {subscriptionTier === 'trial' && (
              <Badge variant="outline" className="text-xs">
                Free Trial
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-3">
          {/* Trial highlight for free tier users */}
          {subscriptionTier === 'free' && (
            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg border border-amber-200/50">
              <p className="text-xs text-muted-foreground font-medium">
                💡 Try before you buy with our{' '}
                <span className="font-semibold text-amber-700 dark:text-amber-300">
                  14-day free trial
                </span>
              </p>
            </div>
          )}

          <Button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            <span>{content.buttonText}</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Convenience components for specific use cases
export function TrialExpiredPrompt(props: Omit<Props, 'trigger'>) {
  return <UpgradePrompt {...props} trigger="trial-expired" />;
}

export function LimitReachedPrompt(props: Omit<Props, 'trigger'>) {
  return <UpgradePrompt {...props} trigger="limit-reached" />;
}

export function FeatureLockedPrompt(props: Omit<Props, 'trigger'>) {
  return <UpgradePrompt {...props} trigger="feature-locked" />;
}
