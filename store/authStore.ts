import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSavedStoriesStore } from './useSavedStoriesStore';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  articlesAmount?: number;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: async (user) => {
        set({ user, isAuthenticated: true });

        try {
          const res = await fetch(`${API_URL}/api/users/saved-stories`, {
            credentials: 'include',
          });

          if (!res.ok) return;

          const data = await res.json();
          const ids: string[] =
            data.savedStories?.map((s: { _id: string }) => s._id) ?? [];

          useSavedStoriesStore.setState({ savedIds: ids });
        } catch (error) {
          console.error('Не вдалося синхронізувати збережені історії:', error);
        }
      },

      logout: async () => {
        try {
          await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
        } catch (error) {
          console.error('Logout request failed:', error);
        }

        localStorage.removeItem('accessToken');
        set({ user: null, isAuthenticated: false });
        useSavedStoriesStore.setState({ savedIds: [] });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
