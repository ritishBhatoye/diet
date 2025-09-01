import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

import { Text } from '@/components';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    console.log('SplashScreen mounted'); // Debug log

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after animation
    const timer = setTimeout(() => {
      console.log('Navigating to onboarding'); // Debug log
      router.replace('/(onboarding)');
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim]);

  return (
    <View className="h-full flex-1 bg-blue-50">
      <LinearGradient
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
        className="flex-1 items-center justify-center"
      >
        {/* Main Logo/Icon Container */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center"
        >
          {/* Logo Container */}
          <View className="mb-8 h-32 w-32 items-center justify-center rounded-full bg-white/30 shadow-lg">
            <Text className="text-6xl">🥗</Text>
          </View>

          {/* App Name */}
          <Text
            variant="heading"
            fontFamily="plus-jakarta-sans-semibold"
            className="mb-4 text-5xl font-bold text-green-700"
          >
            Diet
          </Text>

          {/* Tagline */}
          <Text
            variant="subheading"
            fontFamily="plus-jakarta-sans-medium"
            className="text-center text-lg text-green-600"
          >
            Your Journey to Healthy Living
          </Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View
          style={{ opacity: fadeAnim }}
          className="absolute bottom-20"
        >
          <View className="flex-row space-x-2">
            <View className="h-3 w-3 rounded-full bg-green-500" />
            <View className="h-3 w-3 rounded-full bg-green-400" />
            <View className="h-3 w-3 rounded-full bg-green-300" />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
