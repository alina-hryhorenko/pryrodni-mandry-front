import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SavedStoriesState = {
  savedIds: string[];
  isSaved: (storyId: string) => boolean;
  toggleSaved: (storyId: string) => Promise<void>;
};

export const useSavedStoriesStore = create<SavedStoriesState>()(
  persist(
    (set, get) => ({
      savedIds: [],

      isSaved: (storyId) => get().savedIds.includes(storyId),

      toggleSaved: async (storyId) => {
        const wasSaved = get().isSaved(storyId);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stories/${storyId}/save`,
          {
            method: wasSaved ? 'DELETE' : 'POST',
            credentials: 'include',
          },
        );

        if (!res.ok) {
          let message = 'Не вдалося зберегти статтю. Спробуйте ще раз.';
          try {
            const body = await res.json();
            if (body?.message) message = body.message;
          } catch {}
          throw new Error(message);
        }

        set((state) => ({
          savedIds: wasSaved
            ? state.savedIds.filter((id) => id !== storyId)
            : [...state.savedIds, storyId],
        }));
      },
    }),
    {
      name: 'saved-stories',
    },
  ),
);
