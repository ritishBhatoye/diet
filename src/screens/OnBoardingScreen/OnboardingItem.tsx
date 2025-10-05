import { View, type Animated } from 'react-native';

import { Text } from '@/components';

interface OnboardingItemProps {
  item: OnBoardingType;
  width: number;
  currentIndex: number;
  onboardingData: OnBoardingType[];
  scrollX: Animated.Value;
}

export const OnboardingItem = ({ item, width }: OnboardingItemProps) => (
  <View
    style={{
      flex: 1,
      width,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 40,
      paddingHorizontal: 20,
    }}
    className="h-full"
  >
    <View className="w-full items-center">
      <Text
        variant="heading"
        fontFamily="plus-jakarta-sans-semibold"
        className="mb-3 text-center text-2xl text-white"
      >
        {item.title}
      </Text>
      <Text
        variant="subheading"
        fontFamily="plus-jakarta-sans-variable"
        className="text-center leading-6 text-white opacity-90"
      >
        {item.subtitle}
      </Text>
    </View>
  </View>
);
