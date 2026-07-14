import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useSavedStoriesStore } from '@/store/useSavedStoriesStore';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarURL?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) => {
        set({ user, isAuthenticated: true });

        (async () => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/users/saved-stories`,
              { credentials: 'include' },
            );

            if (!res.ok) return;

            const data = await res.json();
            const ids: string[] =
              data.savedStories?.map((s: { _id: string }) => s._id) ?? [];

            useSavedStoriesStore.getState().setSavedIds(ids);
          } catch (error) {
            console.error(
              'Не вдалося синхронізувати збережені історії:',
              error,
            );
          }
        })();
      },

      logout: async () => {
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });
        } catch {}

        localStorage.removeItem('accessToken');
        set({ user: null, isAuthenticated: false });

        useSavedStoriesStore.getState().reset();
      },
    }),
    { name: 'auth-store' },
  ),
);
