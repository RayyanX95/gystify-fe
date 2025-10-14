import { FeatureLockedPrompt, LimitReachedPrompt, TrialExpiredPrompt } from '@/components';

/**
 * Renders the appropriate prompt component based on user subscription status
 */
export const renderUserStatusPrompt = (
  isTrialExpired: boolean,
  isSubscriptionExpired: boolean,
  subscriptionTier: string,
  needsUpgrade: boolean,
  hasActiveAccess: boolean
) => {
  // Don't show prompts for free users (they have their own onboarding flow)
  if (subscriptionTier === 'free') {
    return null;
  }

  // Show appropriate prompt based on specific conditions
  if (isTrialExpired) {
    return (
      <div className="mt-4">
        <TrialExpiredPrompt feature="email processing and snapshots" />
      </div>
    );
  }

  if (isSubscriptionExpired) {
    return (
      <div className="mt-4">
        <FeatureLockedPrompt feature="email processing and snapshots" />
      </div>
    );
  }

  // Show limit reached prompt for users who have reached their usage limits
  if (needsUpgrade && hasActiveAccess) {
    return (
      <div className="mt-4">
        <LimitReachedPrompt feature="email processing and snapshots" />
      </div>
    );
  }

  // No prompt needed for users with active access and no limits
  return null;
};
