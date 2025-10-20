# Diet App - Personal Nutrition Assistant

A React Native app built with Expo that helps you track nutrition, analyze meals with AI, and monitor your progress.

## 🎯 Core Features

### 1. **AI Meal Analysis** (Killer Feature)
- Take a photo of your meal
- Get instant nutrition breakdown using Google Gemini AI
- Auto-log to your food diary

### 2. **Barcode Scanner**
- Scan packaged food barcodes
- Fetch nutrition data from OpenFoodFacts API (free, open database)
- Quick-add to diary

### 3. **Food Diary**
- Log meals by time (Breakfast, Lunch, Dinner, Snacks)
- Track calories, protein, carbs, fats
- View daily totals

### 4. **Progress Tracking**
- Weight trends over time
- Progress photos
- Body measurements
- Streak tracking

### 5. **Dashboard**
- Daily nutrition overview
- Quick actions (Log Meal, Scan Food, Add Water, Weigh In)
- Fitness coach tips
- Macro breakdown

## 📱 App Structure

```
src/app/(tabs)/
├── home/           # Dashboard with daily stats
├── diary.tsx       # Food logging with AI/barcode
├── progress.tsx    # Charts, photos, measurements
├── profile/        # Settings and user info
├── scan-meal.tsx   # AI photo analysis
└── scan-barcode.tsx # Barcode scanner
```

## 🛠 Tech Stack

- **Framework**: Expo (React Native)
- **Navigation**: Expo Router
- **State**: Zustand
- **Storage**: AsyncStorage (local-first)
- **AI**: Google Gemini API
- **Nutrition Data**: OpenFoodFacts API
- **Styling**: NativeWind (Tailwind CSS)
- **Camera**: expo-camera, expo-image-picker
- **Barcode**: expo-barcode-scanner

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create `.env` file:
```
EXPO_PUBLIC_GEMINI_KEY=your_gemini_api_key
```

3. Run the app:
```bash
npm start
```

## 📊 Data Storage

All data is stored locally using AsyncStorage:
- User preferences
- Food diary entries
- Progress photos (local URIs)
- Body measurements
- Streak data

No backend required!

## 🎨 Key Screens

### Home Dashboard
- Daily calorie/macro progress
- Water intake tracker
- Quick action buttons
- Fitness coach tips

### Food Diary
- Three ways to add food:
  1. AI Scan (photo)
  2. Barcode scan
  3. Manual search
- Organized by meal type
- Edit/delete entries

### Progress
- Weight chart
- Progress photos timeline
- Body measurements
- Streak counter

### Profile
- User settings
- Goals (weight, calories, macros)
- App preferences
- Export data

## 🔑 Key Features to Implement

### Phase 1 (Core) ✅
- [x] Tab navigation restructure
- [x] Food diary UI
- [x] Progress tracking UI
- [x] AI scan screen
- [x] Barcode scanner screen

### Phase 2 (Functionality)
- [ ] AsyncStorage integration
- [ ] Gemini AI meal analysis
- [ ] OpenFoodFacts API integration
- [ ] Water intake tracker
- [ ] Daily streak system

### Phase 3 (Enhanced)
- [ ] Weekly meal planner
- [ ] Progress photos gallery
- [ ] Body measurements tracker
- [ ] Charts (weight, calories)
- [ ] Export data feature

### Phase 4 (Polish)
- [ ] Onboarding flow
- [ ] Animations
- [ ] Haptic feedback
- [ ] Dark mode
- [ ] Notifications

## 🎯 Why This Approach?

### Removed (Too Complex for Solo Dev)
- ❌ Food delivery/ordering
- ❌ Restaurant menus
- ❌ Location services
- ❌ Backend/database
- ❌ Payment processing

### Added (Feasible & Unique)
- ✅ AI meal photo analysis
- ✅ Barcode scanning
- ✅ Local-first storage
- ✅ Progress tracking
- ✅ Simple meal planning

## 📝 API Keys Needed

1. **Google Gemini API** (Free tier available)
   - Get from: https://makersuite.google.com/app/apikey
   - Used for: AI meal analysis

2. **OpenFoodFacts** (No key needed!)
   - Free, open database
   - Used for: Barcode nutrition data

## 🎨 Design Philosophy

- **Simple**: Easy to use, minimal friction
- **Fast**: Local-first, instant feedback
- **Smart**: AI-powered, not manual entry
- **Personal**: Your data stays on your device

## 📱 Supported Platforms

- iOS
- Android
- (Web support limited due to camera features)

## 🤝 Contributing

This is a personal project, but suggestions welcome!

## 📄 License

MIT
