import axios from 'axios';
import { create } from 'zustand';

interface ScanState {
  image: string | null;
  result: any | null;
  loading: boolean;
  error: string | null;

  setImage: (img: string | null) => void;
  fetchNutritionData: (query: string) => Promise<void>;
  reset: () => void;
}

export const useScanStore = create<ScanState>(set => ({
  image: null,
  result: null,
  loading: false,
  error: null,

  setImage: img => set({ image: img }),

  fetchNutritionData: async query => {
    try {
      set({ loading: true, error: null });
      const response = await axios.post(
        'https://trackapi.nutritionix.com/v2/natural/nutrients',
        { query },
        {
          headers: {
            'x-app-id': 'YOUR_APP_ID',
            'x-app-key': 'YOUR_APP_KEY',
            'Content-Type': 'application/json',
          },
        }
      );
      set({ result: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  reset: () => set({ image: null, result: null, error: null }),
}));
