import { create } from 'zustand';

import { getFoodItems } from '@/api/food.service';

interface FoodState {
  items: any;
  loading: boolean;
  error: string | undefined;
  fetch: () => Promise<void>;
}

export const useFoodStore = create<FoodState>(set => ({
  items: [],
  loading: false,
  error: undefined,
  async fetch() {
    set({ loading: true, error: undefined });
    try {
      const data = await getFoodItems();
      set({ items: data, loading: false });
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : 'Failed to load food items';
      set({ error: message, loading: false });
    }
  },
}));
