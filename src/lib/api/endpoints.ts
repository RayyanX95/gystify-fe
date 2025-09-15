export const endPoints = {
  // -------------------- Health endpoints --------------------
  healthRoot: '/', // GET - Health check endpoint
  healthDetailed: '/health', // GET - Detailed health check

  // -------------------- Authentication endpoints --------------------
  authGoogleInit: '/auth/google', // GET - Initiate Google OAuth login
  authGoogleCallback: '/auth/google/callback', // GET - Google OAuth callback
  authGoogleExchange: '/auth/google/exchange', // POST - Exchange Google authorization code for tokens
  authProfile: '/auth/profile', // GET - Get current user profile
  authTokenRefresh: '/auth/token', // POST - Refresh access token using refresh token

  // -------------------- Daily Summary endpoints --------------------
  summaryGenerate: '/summary/generate', // POST - Generate and persist a daily summary for the authenticated user
  summaryExpandById: '/summary/{id}/expand', // POST - Expand a summary into a detailed report
  summaryGetForUser: '/summary', // GET - Get daily Summary for user

  // -------------------- Metrics endpoints --------------------
  metricsStats: '/metrics', // GET - Get user-based metrics
};

export type EndPoints = keyof typeof endPoints;
