export const endPoints = {
  // -------------------- Health endpoints --------------------
  healthRoot: '/', // GET - Health check endpoint
  healthDetailed: '/health', // GET - Detailed health check

  // -------------------- Authentication endpoints --------------------
  authGoogleExchange: '/auth/google/exchange', // POST - Exchange Google authorization code for tokens
  authProfile: '/auth/profile', // GET - Get current user profile
  authTokenRefresh: '/auth/refresh', // POST - Refresh access token using refresh token

  // -------------------- Daily Summary endpoints --------------------
  summaryAll: '/summary/all', // GET - Get all daily Summaries

  // -------------------- Metrics endpoints --------------------
  metricsStats: '/metrics', // GET - Get user-based metrics

  snapshots: '/snapshots', // POST - Create a new snapshot, GET - Get all snapshots
  snapshotById: '/snapshots/{id}', // GET - Get snapshot by ID, DELETE - Delete snapshot by ID

  // -------------------- Subscription endpoints --------------------
  subscriptionStatus: '/subscription/status', // GET - Get user subscription status and usage
  subscriptionPlans: '/subscription/plans', // GET - Get all available pricing plans
  subscriptionLimits: '/subscription/limits', // GET - Check user limits and usage
  subscriptionStartTrial: '/subscription/start-trial', // POST - Start free trial for user
  subscriptionUpgradeByTier: '/subscription/upgrade/{tier}', // POST - Upgrade user to a specific plan
};

export type EndPoints = keyof typeof endPoints;
