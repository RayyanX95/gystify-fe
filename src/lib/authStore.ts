'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NormalizedUser } from './types';

interface AuthState {
  user: NormalizedUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  login: (token: string, user: NormalizedUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      login: (token: string, user: NormalizedUser) =>
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        }),
      logout: () => {
        // Clear zustand store
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // Clear cookie by setting expired date
          document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      },
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
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
