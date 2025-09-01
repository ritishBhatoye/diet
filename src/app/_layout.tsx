import { useFonts } from 'expo-font';

// eslint-disable-next-line import/order
import { FONTS } from '@/constants/font';

import '@/global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Quicksand fonts
    'Quicksand-Bold': FONTS.Quicksand.Bold,
    'Quicksand-Light': FONTS.Quicksand.Light,
    'Quicksand-Medium': FONTS.Quicksand.Medium,
    'Quicksand-Regular': FONTS.Quicksand.Regular,
    'Quicksand-SemiBold': FONTS.Quicksand.SemiBold,

    // Barlow fonts
    'Barlow-Black': FONTS.Barlow.Black,
    'Barlow-BlackItalic': FONTS.Barlow.BlackItalic,
    'Barlow-Bold': FONTS.Barlow.Bold,
    'Barlow-BoldItalic': FONTS.Barlow.BoldItalic,
    'Barlow-ExtraBold': FONTS.Barlow.ExtraBold,
    'Barlow-ExtraBoldItalic': FONTS.Barlow.ExtraBoldItalic,
    'Barlow-ExtraLight': FONTS.Barlow.ExtraLight,
    'Barlow-ExtraLightItalic': FONTS.Barlow.ExtraLightItalic,
    'Barlow-Italic': FONTS.Barlow.Italic,
    'Barlow-Light': FONTS.Barlow.Light,
    'Barlow-LightItalic': FONTS.Barlow.LightItalic,
    'Barlow-Medium': FONTS.Barlow.Medium,
    'Barlow-MediumItalic': FONTS.Barlow.MediumItalic,
    'Barlow-Regular': FONTS.Barlow.Regular,
    'Barlow-SemiBold': FONTS.Barlow.SemiBold,
    'Barlow-SemiBoldItalic': FONTS.Barlow.SemiBoldItalic,
    'Barlow-Thin': FONTS.Barlow.Thin,
    'Barlow-ThinItalic': FONTS.Barlow.ThinItalic,

    // Dancing Script fonts
    'DancingScript-Bold': FONTS.DancingScript.Bold,
    'DancingScript-Medium': FONTS.DancingScript.Medium,
    'DancingScript-Regular': FONTS.DancingScript.Regular,
    'DancingScript-SemiBold': FONTS.DancingScript.SemiBold,
    'DancingScript-VariableFont_wght': FONTS.DancingScript.Variable,

    // Montserrat fonts
    'Montserrat-Black': FONTS.Montserrat.Black,
    'Montserrat-BlackItalic': FONTS.Montserrat.BlackItalic,
    'Montserrat-Bold': FONTS.Montserrat.Bold,
    'Montserrat-BoldItalic': FONTS.Montserrat.BoldItalic,
    'Montserrat-ExtraBold': FONTS.Montserrat.ExtraBold,
    'Montserrat-ExtraBoldItalic': FONTS.Montserrat.ExtraBoldItalic,
    'Montserrat-ExtraLight': FONTS.Montserrat.ExtraLight,
    'Montserrat-ExtraLightItalic': FONTS.Montserrat.ExtraLightItalic,
    'Montserrat-Italic': FONTS.Montserrat.Italic,
    'Montserrat-Light': FONTS.Montserrat.Light,
    'Montserrat-LightItalic': FONTS.Montserrat.LightItalic,
    'Montserrat-Medium': FONTS.Montserrat.Medium,
    'Montserrat-MediumItalic': FONTS.Montserrat.MediumItalic,
    'Montserrat-Regular': FONTS.Montserrat.Regular,
    'Montserrat-SemiBold': FONTS.Montserrat.SemiBold,
    'Montserrat-SemiBoldItalic': FONTS.Montserrat.SemiBoldItalic,
    'Montserrat-Thin': FONTS.Montserrat.Thin,
    'Montserrat-ThinItalic': FONTS.Montserrat.ThinItalic,
    'Montserrat-VariableFont_wght': FONTS.Montserrat.Variable,
    'Montserrat-Italic-VariableFont_wght': FONTS.Montserrat.ItalicVariable,

    // Plus Jakarta Sans fonts
    'PlusJakartaSans-Bold': FONTS.PlusJakartaSans.Bold,
    'PlusJakartaSans-BoldItalic': FONTS.PlusJakartaSans.BoldItalic,
    'PlusJakartaSans-ExtraBold': FONTS.PlusJakartaSans.ExtraBold,
    'PlusJakartaSans-ExtraBoldItalic': FONTS.PlusJakartaSans.ExtraBoldItalic,
    'PlusJakartaSans-ExtraLight': FONTS.PlusJakartaSans.ExtraLight,
    'PlusJakartaSans-ExtraLightItalic': FONTS.PlusJakartaSans.ExtraLightItalic,
    'PlusJakartaSans-Italic': FONTS.PlusJakartaSans.Italic,
    'PlusJakartaSans-Light': FONTS.PlusJakartaSans.Light,
    'PlusJakartaSans-LightItalic': FONTS.PlusJakartaSans.LightItalic,
    'PlusJakartaSans-Medium': FONTS.PlusJakartaSans.Medium,
    'PlusJakartaSans-MediumItalic': FONTS.PlusJakartaSans.MediumItalic,
    'PlusJakartaSans-Regular': FONTS.PlusJakartaSans.Regular,
    'PlusJakartaSans-SemiBold': FONTS.PlusJakartaSans.SemiBold,
    'PlusJakartaSans-SemiBoldItalic': FONTS.PlusJakartaSans.SemiBoldItalic,
    'PlusJakartaSans-VariableFont_wght': FONTS.PlusJakartaSans.Variable,
    'PlusJakartaSans-Italic-VariableFont_wght':
      FONTS.PlusJakartaSans.ItalicVariable,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" />

      <StatusBar backgroundColor="#32CD32" translucent style="inverted" />
    </Stack>
  );
}
