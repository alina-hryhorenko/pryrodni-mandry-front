import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveStory, unsaveStory } from '@/services/stories';

type SavedStoriesState = {
  savedIds: string[];
  isSaved: (storyId: string) => boolean;
  toggleSaved: (storyId: string) => Promise<void>;
  setSavedIds: (ids: string[]) => void;
  reset: () => void;
};

export const useSavedStoriesStore = create<SavedStoriesState>()(
  persist(
    (set, get) => ({
      savedIds: [],

      isSaved: (storyId) => get().savedIds.includes(storyId),

      toggleSaved: async (storyId) => {
        const wasSaved = get().isSaved(storyId);

        set((state) => ({
          savedIds: wasSaved
            ? state.savedIds.filter((id) => id !== storyId)
            : [...state.savedIds, storyId],
        }));

        try {
          if (wasSaved) {
            await unsaveStory(storyId);
          } else {
            await saveStory(storyId);
          }
        } catch (error) {
          set((state) => ({
            savedIds: wasSaved
              ? [...state.savedIds, storyId]
              : state.savedIds.filter((id) => id !== storyId),
          }));
          throw error;
        }
      },

      setSavedIds: (ids) => set({ savedIds: ids }),

      reset: () => set({ savedIds: [] }),
    }),
    {
      name: 'saved-stories',
      partialize: (state) => ({ savedIds: state.savedIds }),
    },
  ),
);
