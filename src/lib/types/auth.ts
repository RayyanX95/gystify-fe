export interface GoogleAuthConfig {
  clientId: string;
  redirectUri: string;
  scopes: string[];
}

export interface UserInfo {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  // full name derived from firstName and lastName for easier access
  name?: string;
  profilePicture?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface GoogleOAuthExchangeRes extends Tokens {
  success: boolean;
  user?: UserInfo;
  message?: string;
}
