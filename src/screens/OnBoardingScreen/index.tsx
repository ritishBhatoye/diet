import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components';
import { Button } from '@/components/atoms/Button';
import { onboardingData } from '@/data/onboardingData';

const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentData: OnBoardingType | undefined = onboardingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGetStarted = () => {
    router.push('/(auth)/register');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
        className="flex-1"
      >
        <ImageBackground
          source={currentData?.image ? { uri: currentData.image } : { uri: '' }}
          className="flex-1 justify-between"
          imageStyle={{ resizeMode: 'contain' }}
        >
          {/* Header with navigation */}
          <View className="flex-row items-center justify-between px-6 pt-4">
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              className={`rounded-full p-3 ${currentIndex === 0 ? 'bg-gray-300' : 'bg-green-500'}`}
            >
              <Ionicons
                name="chevron-back-outline"
                color={currentIndex === 0 ? '#9ca3af' : 'white'}
                size={20}
              />
            </TouchableOpacity>

            {/* Page indicators */}
            <View className="flex-row space-x-2">
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleNext}
              disabled={currentIndex === onboardingData.length - 1}
              className={`rounded-full p-3 ${
                currentIndex === onboardingData.length - 1
                  ? 'bg-gray-300'
                  : 'bg-green-500'
              }`}
            >
              <Ionicons
                name="chevron-forward-outline"
                color={
                  currentIndex === onboardingData.length - 1
                    ? '#9ca3af'
                    : 'white'
                }
                size={20}
              />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="px-6 pb-8">
            <View className="mb-6 rounded-2xl bg-white/90 p-6">
              <Text
                variant="heading"
                fontFamily="plus-jakarta-sans-semibold"
                className="mb-4 text-center text-2xl text-gray-800"
              >
                {currentData?.title}
              </Text>
              <Text
                variant="subheading"
                fontFamily="plus-jakarta-sans-variable"
                className="text-center leading-6 text-gray-600"
              >
                {currentData?.subtitle}
              </Text>
            </View>

            {/* CTA Buttons - Show only on last slide */}
            {currentIndex === onboardingData.length - 1 && (
              <View className="space-y-4">
                <Button
                  title="Get Started"
                  variant="primary"
                  size="large"
                  onPress={handleGetStarted}
                  className="w-full"
                />
                <Button
                  title="Login"
                  variant="outline"
                  size="large"
                  onPress={handleLogin}
                  className="w-full"
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
