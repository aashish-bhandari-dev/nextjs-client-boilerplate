import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { AuthResponseData, AuthTokens } from '@/types/auth.types';
import { User } from '@/types/user.types';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isHydrated: boolean;

  // Pure state actions
  setAuth: (data: AuthResponseData, rememberMe?: boolean) => void;
  clearAuth: () => void;
  setUser: (user: User | null) => void;
  updateUser: (partialUser: Partial<User>) => void;
  setTokens: (tokens: AuthTokens | null, rememberMe?: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
}

const COOKIE_OPTIONS = {
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isHydrated: false,

      setHydrated: (hydrated: boolean) => set({ isHydrated: hydrated }),

      setAuth: (data: AuthResponseData, rememberMe = false) => {
        const { user, tokens } = data;
        const hasTokens = !!tokens?.accessToken;
        const isAuth = !!user && hasTokens;

        const cookieOpts = rememberMe
          ? { ...COOKIE_OPTIONS, expires: 30 }
          : COOKIE_OPTIONS;

        // Synchronize cookies for proxy / server / client authentication
        if (tokens?.accessToken) {
          Cookies.set('access_token', tokens.accessToken, cookieOpts);
        }
        if (tokens?.refreshToken) {
          Cookies.set('refresh_token', tokens.refreshToken, cookieOpts);
        }
        if (user?.role) {
          Cookies.set('user_role', user.role, cookieOpts);
        }

        set({
          user: user || null,
          tokens: tokens || null,
          isAuthenticated: isAuth,
        });
      },

      clearAuth: () => {
        // Clear all session cookies
        Cookies.remove('access_token', COOKIE_OPTIONS);
        Cookies.remove('refresh_token', COOKIE_OPTIONS);
        Cookies.remove('user_role', COOKIE_OPTIONS);

        // Reset store state
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User | null) => {
        const isAuth = !!user;
        set({ user, isAuthenticated: isAuth });
        if (user?.role) {
          Cookies.set('user_role', user.role, COOKIE_OPTIONS);
        } else {
          Cookies.remove('user_role', COOKIE_OPTIONS);
        }
      },

      updateUser: (partialUser: Partial<User>) => {
        set((state) => {
          if (!state.user) return state;
          const updated = { ...state.user, ...partialUser };
          if (updated.role) {
            Cookies.set('user_role', updated.role, COOKIE_OPTIONS);
          }
          return { user: updated };
        });
      },

      setTokens: (tokens: AuthTokens | null, rememberMe = false) => {
        const cookieOpts = rememberMe
          ? { ...COOKIE_OPTIONS, expires: 30 }
          : COOKIE_OPTIONS;

        set({ tokens });
        if (tokens?.accessToken) {
          Cookies.set('access_token', tokens.accessToken, cookieOpts);
        } else {
          Cookies.remove('access_token', COOKIE_OPTIONS);
        }
        if (tokens?.refreshToken) {
          Cookies.set('refresh_token', tokens.refreshToken, cookieOpts);
        } else {
          Cookies.remove('refresh_token', COOKIE_OPTIONS);
        }
      },
    }),
    {
      name: 'client-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
