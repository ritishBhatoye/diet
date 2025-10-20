# Implementation Guide

## Quick Start

Your app has been restructured! Here's what to do next:

### 1. Clean Install Dependencies

```bash
# Remove old dependencies
npm uninstall @sanity/client @sanity/image-url react-native-appwrite

# Clean install
rm -rf node_modules package-lock.json
npm install
```

### 2. Test the App

```bash
npm start
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator
- Scan QR code for physical device

### 3. Verify New Structure

Check that all 4 tabs work:
- ✅ Home (Dashboard)
- ✅ Diary (Food logging)
- ✅ Progress (Tracking)
- ✅ Profile (Settings)

## Next Implementation Steps

### Step 1: AsyncStorage Integration (30 min)

Create a storage service:

```typescript
// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  DIARY_ENTRIES: 'diary_entries',
  USER_PROFILE: 'user_profile',
  PROGRESS_DATA: 'progress_data',
  WATER_INTAKE: 'water_intake',
  STREAK_DATA: 'streak_data',
};

export const storage = {
  async save(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
  
  async get(key: string) {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  
  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
```

### Step 2: Diary Store with Persistence (45 min)

Update `src/store/diary.ts`:

```typescript
import { create } from 'zustand';
import { storage, StorageKeys } from '@/services/storage';

interface DiaryEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity: number;
  unit: string;
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  date: string;
  image?: string;
}

interface DiaryState {
  entries: DiaryEntry[];
  loading: boolean;
  
  loadEntries: () => Promise<void>;
  addEntry: (entry: Omit<DiaryEntry, 'id'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<DiaryEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getEntriesForDate: (date: string) => DiaryEntry[];
}

export const useDiaryStore = create<DiaryState>((set, get) => ({
  entries: [],
  loading: false,
  
  loadEntries: async () => {
    set({ loading: true });
    const entries = await storage.get(StorageKeys.DIARY_ENTRIES) || [];
    set({ entries, loading: false });
  },
  
  addEntry: async (entry) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    const entries = [...get().entries, newEntry];
    await storage.save(StorageKeys.DIARY_ENTRIES, entries);
    set({ entries });
  },
  
  updateEntry: async (id, updates) => {
    const entries = get().entries.map(e => 
      e.id === id ? { ...e, ...updates } : e
    );
    await storage.save(StorageKeys.DIARY_ENTRIES, entries);
    set({ entries });
  },
  
  deleteEntry: async (id) => {
    const entries = get().entries.filter(e => e.id !== id);
    await storage.save(StorageKeys.DIARY_ENTRIES, entries);
    set({ entries });
  },
  
  getEntriesForDate: (date) => {
    return get().entries.filter(e => e.date === date);
  },
}));
```

### Step 3: Gemini AI Integration (1 hour)

Update `src/services/ai.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';

const genAI = new GoogleGenerativeAI(
  Constants.expoConfig?.extra?.EXPO_PUBLIC_GEMINI_KEY || ''
);

export async function analyzeMealPhoto(imageUri: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Convert image to base64
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const base64 = await blobToBase64(blob);
    
    const prompt = `Analyze this food image and provide nutrition information in JSON format:
    {
      "name": "food name",
      "calories": number,
      "protein": number (grams),
      "carbs": number (grams),
      "fat": number (grams),
      "serving_size": "description"
    }
    
    Only return the JSON, no other text.`;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64.split(',')[1],
        },
      },
    ]);
    
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Could not parse nutrition data');
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw error;
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
```

### Step 4: Update Scan Meal Screen (30 min)

Replace the analyze function in `scan-meal.tsx`:

```typescript
import { analyzeMealPhoto } from '@/services/ai';
import { useDiaryStore } from '@/store/diary';

// Inside component:
const addEntry = useDiaryStore(state => state.addEntry);

const handleAnalyze = async () => {
  if (!capturedImage) return;

  setAnalyzing(true);
  try {
    const result = await analyzeMealPhoto(capturedImage);
    
    Alert.alert(
      result.name,
      `Calories: ${result.calories}\n` +
      `Protein: ${result.protein}g\n` +
      `Carbs: ${result.carbs}g\n` +
      `Fat: ${result.fat}g`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add to Diary',
          onPress: async () => {
            await addEntry({
              name: result.name,
              calories: result.calories,
              protein: result.protein,
              carbs: result.carbs,
              fat: result.fat,
              quantity: 1,
              unit: 'serving',
              meal: 'Lunch', // TODO: Let user select
              date: new Date().toISOString().split('T')[0],
              image: capturedImage,
            });
            router.back();
          },
        },
      ]
    );
  } catch (error) {
    Alert.alert('Error', 'Failed to analyze meal');
  } finally {
    setAnalyzing(false);
  }
};
```

### Step 5: Water Tracker (30 min)

Create `src/store/water.ts`:

```typescript
import { create } from 'zustand';
import { storage, StorageKeys } from '@/services/storage';

interface WaterState {
  cups: number;
  target: number;
  date: string;
  
  loadWater: () => Promise<void>;
  addCup: () => Promise<void>;
  setTarget: (target: number) => Promise<void>;
}

export const useWaterStore = create<WaterState>((set, get) => ({
  cups: 0,
  target: 8,
  date: new Date().toISOString().split('T')[0],
  
  loadWater: async () => {
    const data = await storage.get(StorageKeys.WATER_INTAKE);
    const today = new Date().toISOString().split('T')[0];
    
    if (data?.date === today) {
      set({ cups: data.cups, target: data.target, date: today });
    } else {
      set({ cups: 0, date: today });
    }
  },
  
  addCup: async () => {
    const cups = get().cups + 1;
    const data = { cups, target: get().target, date: get().date };
    await storage.save(StorageKeys.WATER_INTAKE, data);
    set({ cups });
  },
  
  setTarget: async (target) => {
    const data = { cups: get().cups, target, date: get().date };
    await storage.save(StorageKeys.WATER_INTAKE, data);
    set({ target });
  },
}));
```

Update home screen water button:

```typescript
import { useWaterStore } from '@/store/water';

// Inside component:
const addCup = useWaterStore(state => state.addCup);
const waterCups = useWaterStore(state => state.cups);

const handleAddWater = async () => {
  await addCup();
  Alert.alert('Water Added', `${waterCups + 1} cups today!`);
};
```

## Testing Checklist

After each step, test:

- [ ] Data persists after app restart
- [ ] AI analysis returns valid nutrition data
- [ ] Barcode scanner finds products
- [ ] Water counter increments
- [ ] Diary entries save and load
- [ ] Progress data displays correctly

## Common Issues

### Issue: Gemini API not working
**Solution**: Check your API key in `.env` and `app.config.js`

### Issue: Camera permission denied
**Solution**: Check `app.json` for camera permissions

### Issue: AsyncStorage not persisting
**Solution**: Check if you're awaiting async calls

### Issue: Barcode scanner not finding products
**Solution**: Try different products, not all are in OpenFoodFacts

## Performance Tips

1. **Lazy load images**: Use `expo-image` for better performance
2. **Debounce search**: Wait 300ms before searching
3. **Cache API responses**: Store in AsyncStorage
4. **Optimize re-renders**: Use React.memo and useCallback
5. **Compress images**: Before storing or uploading

## Next Features to Add

1. **Meal Planner** (2-3 hours)
2. **Progress Charts** (2-3 hours)
3. **Export Data** (1 hour)
4. **Notifications** (1-2 hours)
5. **Dark Mode** (1 hour)

## Resources

- [Expo Camera Docs](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Gemini AI Docs](https://ai.google.dev/docs)
- [OpenFoodFacts API](https://world.openfoodfacts.org/data)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/)
