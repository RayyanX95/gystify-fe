import { useAuthStore } from '@/lib/stores/authStore';
import { GoogleOAuthService } from '@/lib/googleOauth';
import { useToast } from '@/lib/hooks/useToast';
import { UserInfo } from '@/lib/types';
import { Tokens } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthStatus = 'loading' | 'success' | 'error';

export const useGoogleExchange = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { toast } = useToast();
  const { login } = useAuthStore();

  const [status, setStatus] = useState<AuthStatus>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage(`Authentication failed: ${error}`);
          toast({
            title: 'Authentication Failed',
            description: 'Google authentication was cancelled or failed.',
            variant: 'destructive',
          });
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code received from Google.');
          return;
        }

        setMessage('Exchanging authorization code...');

        const googleOAuth = new GoogleOAuthService();
        const res = await googleOAuth.exchangeCodeForTokens(code, state || undefined);

        // Normalize into token and user for the auth store
        let token: string | undefined;
        let normalizedUser: UserInfo | undefined;

        if (res.accessToken) {
          token = res.accessToken;
          const u = res.user;
          if (u) {
            normalizedUser = {
              id: u.id,
              email: u.email,
              firstName: u.firstName,
              lastName: u.lastName,
              name: `${u.firstName || ''}${u.lastName ? ' ' + u.lastName : ''}`.trim(),
              profilePicture: u.profilePicture,
            };
          }
        }

        if (token && normalizedUser) {
          setStatus('success');
          setMessage('Google account connected successfully!');
          // Build tokens object including optional refreshToken
          const tokens: Tokens = {
            accessToken: token,
            refreshToken: res.refreshToken,
            expiresIn: res.expiresIn, // in seconds
            tokenType: res.tokenType,
          };

          // Update auth store with tokens and user info
          login(tokens, {
            id: normalizedUser.id,
            email: normalizedUser.email,
            firstName: normalizedUser.firstName,
            lastName: normalizedUser.lastName,
            name: normalizedUser.name,
            profilePicture: normalizedUser.profilePicture,
          });

          // Redirect to dashboard after success
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else {
          setStatus('error');
          setMessage(res.message || 'Failed to connect Google account.');
        }
      } catch {
        // Only show error if we haven't already processed successfully
        if (status === 'loading') {
          setStatus('error');
          setMessage('An unexpected error occurred.');
          toast({
            title: 'Error',
            description: 'An unexpected error occurred during authentication.',
            variant: 'destructive',
          });
        }
      }
    };

    handleCallback();

    // We only want to run this once, hasProcessedRef prevents duplicate calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    status,
    message,
    setStatus,
    setMessage,
    // router, // Uncomment if you want to handle redirects outside
  };
};
