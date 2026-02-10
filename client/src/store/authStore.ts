import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/User';
import { API_ENDPOINTS } from '../utils/constants';
import { default as api } from '../utils/axiosConfig';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email: string, password: string): Promise<boolean> => {
        set({ loading: true, error: null });
        
        try {
          const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
          
          const data = await response.data;
          
          if (data.success && data.data) {
            set({
              user: data.data.user,
              token: data.data.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return true;
          } else {
            set({
              error: data.error || 'Login failed',
              loading: false,
            });
            return false;
          }
        } catch (error) {
          set({
            error: 'Network error during login',
            loading: false,
          });
          return false;
        }
      },

      register: async (username: string, email: string, password: string): Promise<boolean> => {
        set({ loading: true, error: null });
        
        try {
          const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { username, email, password })
          
          const data = await response.data;
          
          if (data.success && data.data) {
            set({
              user: data.data.user,
              token: data.data.token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });
            return true;
          } else {
            set({
              error: data.error || 'Registration failed',
              loading: false,
            });
            return false;
          }
        } catch (error) {
          set({
            error: 'Network error during registration',
            loading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);