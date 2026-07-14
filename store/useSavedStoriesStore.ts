import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { saveStory, unsaveStory } from '@/services/stories';

interface SavedStore {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => Promise<void>;
}

export const useSavedStoriesStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedIds: [],

      isSaved: (id) => get().savedIds.includes(id),

      toggleSaved: async (id) => {
        const isAlreadySaved = get().savedIds.includes(id);
        set((state) => ({
          savedIds: isAlreadySaved
            ? state.savedIds.filter((savedId) => savedId !== id)
            : [...state.savedIds, id],
        }));

        try {
          if (isAlreadySaved) {
            await unsaveStory(id);
          } else {
            await saveStory(id);
          }
        } catch (error) {
          set((state) => ({
            savedIds: isAlreadySaved
              ? [...state.savedIds, id]
              : state.savedIds.filter((savedId) => savedId !== id),
          }));
          console.error('Не вдалося змінити статус збереження ', error);
        }
      },
    }),
    {
      name: 'saved_stories',
    },
  ),
);
