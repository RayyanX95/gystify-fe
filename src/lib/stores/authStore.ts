'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tokens, UserInfo } from '../types';

interface PendingPlanSelection {
  tier: string;
  billingCycle: 'monthly' | 'yearly';
}

interface AuthState {
  user: UserInfo | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  pendingPlanSelection: PendingPlanSelection | null;
}

interface AuthActions {
  login: (tokens: Tokens, user: UserInfo) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  refreshTokens: (tokens: Tokens) => void;
  setPendingPlan: (plan: PendingPlanSelection) => void;
  clearPendingPlan: () => void;
  handlePostLoginRedirect: () => string;
  updateUser: (user: UserInfo) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  hasHydrated: false,
  pendingPlanSelection: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      login: (tokens: Tokens, user: UserInfo) => {
        saveTokensToCookies(tokens);

        set({
          tokens,
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      logout: () => {
        // Clear zustand store
        // debugger;
        set({
          tokens: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        clearAuthCookies();
      },
      refreshTokens: (tokens: Tokens) => {
        saveTokensToCookies(tokens);

        set((state) => ({
          tokens,
          isAuthenticated: !!state.user, // keep current auth status based on user presence
        }));
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setPendingPlan: (plan: PendingPlanSelection) => {
        set({ pendingPlanSelection: plan });
      },

      clearPendingPlan: () => {
        set({ pendingPlanSelection: null });
      },

      handlePostLoginRedirect: (): string => {
        const { pendingPlanSelection } = get();

        if (pendingPlanSelection) {
          // Clear the pending plan and redirect to confirmation
          set({ pendingPlanSelection: null });
          return `/dashboard/subscription/confirm?tier=${pendingPlanSelection.tier}&billing=${pendingPlanSelection.billingCycle}`;
        }

        // Default redirect to dashboard
        return '/dashboard';
      },

      updateUser: (user: UserInfo) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingPlanSelection: state.pendingPlanSelection,
      }),
      // called when rehydration starts/finishes; set hasHydrated when done
      onRehydrateStorage: () => () => {
        // ensure the store knows rehydration has completed
        // we use a microtask to ensure set is available
        Promise.resolve().then(() => {
          // set hasHydrated to true without overwriting other fields
          useAuthStore.setState({ hasHydrated: true } as Partial<AuthState>);
        });
      },
    }
  )
);

const saveTokensToCookies = (tokens: Tokens) => {
  if (typeof window !== 'undefined') {
    if (tokens.accessToken) {
      document.cookie = `access_token=${tokens.accessToken}; Path=/; SameSite=Lax; Secure=${
        window.location.protocol === 'https:'
      };`;
    }
    if (tokens.refreshToken) {
      document.cookie = `refresh_token=${tokens.refreshToken}; Path=/; SameSite=Lax; Secure=${
        window.location.protocol === 'https:'
      };`;
    }
  }
};

// clear tokens from cookies on logout
export const clearAuthCookies = () => {
  if (typeof window !== 'undefined') {
    document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};
