import { ApiService } from './ApiService';

export interface SubscriptionStatus {
  tier: string;
  name: string;
  isTrialActive: boolean;
  isSubscriptionActive: boolean;
  hasActiveAccess: boolean;
  trialExpiresAt?: string;
  subscriptionExpiresAt?: string;
  usage: {
    snapshotsUsedToday: number;
    snapshotsRemainingToday: number;
    emailsSummarizedToday: number;
    totalEmailsSummarized: number;
    totalSnapshotsCreated: number;
    maxEmailsAllowed: number;
  };
}

export interface PricingPlan {
  tier: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
}

export interface UsageLimits {
  canCreateSnapshot: boolean;
  canProcessEmails: boolean;
  maxEmailsAllowed: number;
  snapshotsUsedToday: number;
  snapshotsRemainingToday: number;
  emailsSummarizedToday: number;
  totalEmailsSummarized: number;
  totalSnapshotsUsed: number;
  totalSnapshotsAllowed?: number;
  isTrialExpired: boolean;
  isSubscriptionExpired: boolean;
  hasActiveAccess: boolean;
}

export interface TrialResponse {
  message: string;
  trial: {
    startedAt: string;
    endsAt: string;
    daysRemaining: number;
  };
}

export interface UpgradeResponse {
  message: string;
  tier: string;
  billingCycle: string;
  effectiveAt: string;
}

// API Functions
export const subscriptionApi = {
  // Get user subscription status
  getStatus: async (): Promise<SubscriptionStatus> => {
    return await ApiService.send<SubscriptionStatus>('GET', 'subscriptionStatus');
  },

  // Get available pricing plans
  getPlans: async (): Promise<{ plans: PricingPlan[] }> => {
    return await ApiService.send<{ plans: PricingPlan[] }>('GET', 'subscriptionPlans');
  },

  // Check user limits and usage
  getLimits: async (): Promise<UsageLimits> => {
    return await ApiService.send<UsageLimits>('GET', 'subscriptionLimits');
  },

  // Start free trial
  startTrial: async (): Promise<TrialResponse> => {
    return await ApiService.send<TrialResponse>('POST', 'subscriptionStartTrial');
  },

  // Upgrade to a specific plan
  upgrade: async (tier: string, billingCycle: 'monthly' | 'yearly'): Promise<UpgradeResponse> => {
    return await ApiService.send<UpgradeResponse>('POST', 'subscriptionUpgradeByTier', {
      pathParams: { tier },
      payload: { billingCycle },
    });
  },
};
