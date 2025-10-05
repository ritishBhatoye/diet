import 'dotenv/config';

export default {
  expo: {
    name: 'diet',
    slug: 'diet',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'diet',
    userInterfaceStyle: 'automatic',
    ios: { supportsTablet: true },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      'expo-barcode-scanner',
    ],
    experiments: { typedRoutes: true },
    extra: {
      EXPO_PUBLIC_GEMINI_KEY: process.env.EXPO_PUBLIC_GEMINI_KEY,
    },
  },
};
