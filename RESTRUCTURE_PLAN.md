# Diet App Restructure Plan

## Current State Analysis
- Food delivery UI (Swiggy/Zomato style) - TOO COMPLEX
- Basic tracking features
- Gemini AI integration (underutilized)
- Barcode scanner (installed but not used)
- Sanity CMS (not needed for this pivot)

## New Direction: Personal Nutrition Assistant

### Core Features to Keep
1. ✅ Daily progress tracking (calories, macros, water)
2. ✅ Food diary/log
3. ✅ Profile/settings

### Features to REMOVE
1. ❌ Food delivery/ordering UI
2. ❌ Restaurant menus
3. ❌ Cart/checkout flow
4. ❌ Location services
5. ❌ Sanity CMS integration

### Features to ADD
1. ✨ AI Meal Photo Analysis (Gemini) - KILLER FEATURE
2. ✨ Barcode Scanner for packaged foods
3. ✨ Simple meal planning (weekly view)
4. ✨ Progress photos & body metrics
5. ✨ Streak tracking & gamification
6. ✨ Water intake tracker (enhance existing)
7. ✨ Recipe database with macro filters

## New App Structure

### Tab Navigation
1. **Home** - Dashboard with daily stats, streaks, quick actions
2. **Diary** - Food log with AI scan & barcode features
3. **Progress** - Charts, photos, measurements
4. **Profile** - Settings, goals, preferences

### Key Screens
- Home Dashboard
- AI Photo Scan (camera + analysis)
- Barcode Scanner
- Food Diary (by meal)
- Add Food (search + manual)
- Meal Planner (weekly)
- Progress Tracker (charts + photos)
- Body Metrics
- Settings

## Implementation Steps

### Phase 1: Clean Up (Remove Delivery Features)
- Remove cart/ordering logic
- Remove location services
- Remove Sanity CMS calls
- Simplify search to local/API data

### Phase 2: Enhance Core Features
- Improve food diary UI
- Add meal-based organization
- Enhance progress tracking

### Phase 3: Add AI Features
- Implement AI photo analysis (Gemini)
- Add barcode scanning
- Integrate OpenFoodFacts API

### Phase 4: Add Planning & Tracking
- Weekly meal planner
- Progress photos
- Body measurements
- Streak system

### Phase 5: Polish
- Animations
- Onboarding
- Settings
- Export data

## Tech Stack (Simplified)
- Expo Router ✓
- Zustand (state) ✓
- Gemini AI ✓
- expo-barcode-scanner ✓
- OpenFoodFacts API (free nutrition data)
- AsyncStorage (local data)
- expo-image-picker ✓
- React Native Reanimated ✓

## Data Storage
- AsyncStorage for local data (no backend needed!)
- User preferences
- Food diary entries
- Progress photos (local)
- Body measurements

## Removed Dependencies
- @sanity/client
- @sanity/image-url
- react-native-appwrite (if not used elsewhere)
