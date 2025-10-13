export const endPoints = {
  // -------------------- Health endpoints --------------------
  healthRoot: '/api/v1', // GET - Health check endpoint
  healthDetailed: '/api/v1/health', // GET - Detailed health check

  // -------------------- Auth endpoints --------------------
  authGoogleExchange: '/api/v1/auth/google/exchange', // POST - Exchange Google authorization code for tokens
  authTokenRefresh: '/api/v1/auth/refresh', // POST - Refresh access token using refresh token
  authValidateRefresh: '/api/v1/auth/validate-refresh', // POST - Validate refresh token without generating new tokens
  authLogout: '/api/v1/auth/logout', // POST - Logout user (optional - for future token blacklisting)
  authProfile: '/api/v1/auth/profile', // GET - Get current user profile
  authDeleteProfile: '/api/v1/auth/profile', // DELETE - Delete current user account

  // -------------------- Subscription endpoints --------------------
  subscriptionStatus: '/api/v1/subscription/status', // GET - Get user subscription status and usage
  subscriptionPlans: '/api/v1/subscription/plans', // GET - Get all available pricing plans
  subscriptionLimits: '/api/v1/subscription/limits', // GET - Check user limits and usage
  subscriptionStartTrial: '/api/v1/subscription/start-trial', // POST - Start free trial for user
  subscriptionUpgradeByTier: '/api/v1/subscription/upgrade/{tier}', // POST - Upgrade user to a specific plan

  // -------------------- Snapshots endpoints --------------------
  snapshots: '/api/v1/snapshots', // GET - Get user's snapshots, POST - Create new snapshot from unread emails
  snapshotById: '/api/v1/snapshots/{id}', // GET - Get specific snapshot with items

  // -------------------- Metrics endpoints --------------------
  metrics: '/api/v1/metrics', // GET - Get metrics
};

export type EndPoints = keyof typeof endPoints;
