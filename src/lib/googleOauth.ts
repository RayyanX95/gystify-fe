import { endPoints } from './api';
import { GoogleAuthConfig, GoogleOAuthExchangeRes } from './types';

export class GoogleOAuthService {
  private config: GoogleAuthConfig;

  constructor() {
    this.config = {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirectUri: `${window.location.origin}/google/callback`,
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
        'https://www.googleapis.com/auth/gmail.modify',
      ],
    };
  }

  /**
   * Generate the Google OAuth authorization URL
   */
  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      response_type: 'code',
      access_type: 'offline', // For refresh tokens
      prompt: 'consent', // Force consent screen to get refresh token
      include_granted_scopes: 'true',
      state: this.generateState(), // CSRF protection
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  /**
   * Initiate Google OAuth flow by redirecting to Google
   */
  initiateAuth(): void {
    const authUrl = this.getAuthUrl();
    window.location.href = authUrl;
  }

  /**
   * Generate a random state parameter for CSRF protection
   */
  private generateState(): string {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0].toString(36);
  }

  /**
   * Exchange authorization code for tokens (via your backend)
   */
  async exchangeCodeForTokens(code: string, state?: string): Promise<GoogleOAuthExchangeRes> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endPoints.authGoogleExchange}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for session management
          body: JSON.stringify({
            code,
            state,
            redirectUri: this.config.redirectUri,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`OAuth exchange failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error exchanging OAuth code:', error);
      throw error;
    }
  }

  /**
   * Check if user has Google account connected (via your backend)
   */
  async checkGoogleConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/status`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        return data.connected || false;
      }
      return false;
    } catch (error) {
      console.error('Error checking Google connection:', error);
      return false;
    }
  }

  /**
   * Disconnect Google account (via your backend)
   */
  async disconnectGoogle(): Promise<void> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google/disconnect`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to disconnect Google account: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error disconnecting Google account:', error);
      throw error;
    }
  }
}

// http://localhost:3000/google/callback?state=wmaj0p&code=4/0AVGzR1D5Lnalpf9E6Q00iKbsV6c-2QSY44Ipin5rS5RbKVCldcVAZcNedMcjmfQ5w1X01w&scope=email%20profile%20https://www.googleapis.com/auth/gmail.readonly%20https://www.googleapis.com/auth/gmail.modify%20https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email%20openid&authuser=0&prompt=consent
