import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { View, type Animated } from 'react-native';

import { Text } from '@/components';

import { AuthActionButtons } from './AuthActionButtons';
import { Pagination } from './Pagination';

interface OnboardingItemProps {
  item: OnBoardingType;
  width: number;
  currentIndex: number;
  onboardingData: OnBoardingType[];
  scrollX: Animated.Value;
}

export const OnboardingItem = ({
  item,
  width,
  currentIndex,
  onboardingData,
  scrollX,
}: OnboardingItemProps) => (
  <View style={{ width }} className="h-full flex-1">
    <ImageBackground
      source={{ uri: item?.image }}
      style={{ flex: 1 }}
      className="flex-1"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', ' rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
          gap: 40,
          paddingHorizontal: 20,
        }}
      >
        <View className="mb-24 rounded-2xl bg-white/95 shadow-lg">
          <Text
            variant="heading"
            fontFamily="plus-jakarta-sans-semibold"
            className="mb-4 text-center text-2xl text-white"
          >
            {item.title}
          </Text>
          <Text
            variant="subheading"
            fontFamily="plus-jakarta-sans-variable"
            className="text-center leading-6 text-white"
          >
            {item.subtitle}
          </Text>
        </View>

        {/* Pagination + Buttons */}
        <View className="w-full items-center pt-6">
          <Pagination data={onboardingData} scrollX={scrollX} width={width} />

          {currentIndex === onboardingData.length - 1 ? (
            <AuthActionButtons />
          ) : null}
        </View>
      </LinearGradient>
    </ImageBackground>
  </View>
);
