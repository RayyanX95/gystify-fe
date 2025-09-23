import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { subscriptionApi, SubscriptionStatus, UsageLimits } from '@/lib/api/subscription';

interface SubscriptionStore {
  // State
  status: SubscriptionStatus | null;
  limits: UsageLimits | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchStatus: () => Promise<void>;
  fetchLimits: () => Promise<void>;
  startTrial: () => Promise<boolean>;
  upgradePlan: (tier: string, billingCycle: 'monthly' | 'yearly') => Promise<boolean>;
  mockPayment: (tier: string, billingCycle: 'monthly' | 'yearly') => Promise<void>;
  reset: () => void;
  clearError: () => void;

  // Computed getters
  canCreateSnapshot: () => boolean;
  canProcessEmails: () => boolean;
  hasActiveAccess: () => boolean;
  isTrialExpired: () => boolean;
  isSubscriptionExpired: () => boolean;
  needsUpgrade: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      status: null,
      limits: null,
      isLoading: false,
      error: null,

      // Actions
      fetchStatus: async () => {
        try {
          set({ isLoading: true, error: null });
          const status = await subscriptionApi.getStatus();
          set({ status, isLoading: false });
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : 'Failed to fetch subscription status';
          set({
            error: message,
            isLoading: false,
          });
        }
      },

      fetchLimits: async () => {
        try {
          const limits = await subscriptionApi.getLimits();
          set({ limits });
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Failed to fetch limits';
          set({ error: message });
        }
      },

      startTrial: async () => {
        try {
          set({ isLoading: true, error: null });
          await subscriptionApi.startTrial();

          // Refresh data
          await Promise.all([get().fetchStatus(), get().fetchLimits()]);

          return true;
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Failed to start trial';
          set({ error: message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      upgradePlan: async (tier: string, billingCycle: 'monthly' | 'yearly') => {
        try {
          set({ isLoading: true, error: null });

          // First do mock payment
          await get().mockPayment(tier, billingCycle);

          // Then upgrade the plan
          await subscriptionApi.upgrade(tier, billingCycle);

          // Refresh data
          await Promise.all([get().fetchStatus(), get().fetchLimits()]);

          return true;
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Failed to upgrade plan';
          set({ error: message });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      mockPayment: async (tier: string, billingCycle: 'monthly' | 'yearly') => {
        // Mock payment processing - just a delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(void 0);
          }, 2000); // 2 second delay to simulate payment processing
        });
      },

      reset: () => {
        set({
          status: null,
          limits: null,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      // Computed getters
      canCreateSnapshot: () => {
        const { limits } = get();
        return limits?.canCreateSnapshot ?? false;
      },

      canProcessEmails: () => {
        const { limits } = get();
        return limits?.canProcessEmails ?? false;
      },

      hasActiveAccess: () => {
        const { status } = get();
        return status?.hasActiveAccess ?? false;
      },

      isTrialExpired: () => {
        const { limits } = get();
        return limits?.isTrialExpired ?? false;
      },

      isSubscriptionExpired: () => {
        const { limits } = get();
        return limits?.isSubscriptionExpired ?? false;
      },

      needsUpgrade: () => {
        const { status, limits } = get();
        return !status?.hasActiveAccess || limits?.isTrialExpired || limits?.isSubscriptionExpired;
      },
    }),
    { name: 'subscription-store' }
  )
);
