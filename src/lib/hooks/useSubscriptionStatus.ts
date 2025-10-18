import { useEffect } from 'react';
import { useSubscriptionStore } from '@/lib/stores/subscriptionStore';
import { useAuthStore } from '../stores/authStore';

/**
 * Hook for managing subscription status in dashboard components
 * Automatically loads subscription data and provides status helpers
 */
export const useSubscriptionStatus = () => {
  const { isAuthenticated } = useAuthStore();
  const {
    status,
    limits,
    isLoading,
    error,
    fetchStatus,
    fetchLimits,
    canCreateSnapshot,
    canProcessEmails,
    hasActiveAccess,
    isTrialExpired,
    isSubscriptionExpired,
    needsUpgrade,
    clearError,
  } = useSubscriptionStore();

  // Load subscription data on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    if (!status) {
      fetchStatus();
    }
    if (!limits) {
      fetchLimits();
    }
  }, [status, limits, fetchStatus, fetchLimits, isAuthenticated]);

  return {
    // State
    status,
    limits,
    isLoading,
    error,

    // Actions
    refreshStatus: fetchStatus,
    refreshLimits: fetchLimits,
    clearError,

    // Computed status helpers
    canCreateSnapshot: canCreateSnapshot(),
    canProcessEmails: canProcessEmails(),
    hasActiveAccess: hasActiveAccess(),
    isTrialExpired: isTrialExpired(),
    isSubscriptionExpired: isSubscriptionExpired(),
    needsUpgrade: needsUpgrade(),

    // Convenience getters
    isOnTrial: status?.tier === 'trial' && status?.isTrialActive,
    isPaidSubscriber: status?.tier !== 'trial' && hasActiveAccess(),
    subscriptionTier: status?.tier,
    usagePercentage: limits
      ? {
          snapshots: limits.totalSnapshotsAllowed
            ? (limits.totalSnapshotsUsed / limits.totalSnapshotsAllowed) * 100
            : 0,
          emails: (limits.emailsSummarizedToday / limits.maxEmailsAllowed) * 100,
        }
      : null,
  };
};
