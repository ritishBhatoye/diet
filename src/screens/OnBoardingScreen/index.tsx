import type { ReactElement } from 'react';
// eslint-disable-next-line no-duplicate-imports
import { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, type ViewToken } from 'react-native';

import { onboardingData } from '@/data/onboardingData';

import { OnboardingItem } from './OnboardingItem';

const { width: screenWidth } = Dimensions.get('window');

const OnBoardingScreen = (): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);
  const width = screenWidth;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0]?.index || 0);
      }
    }
  ).current;

  return (
    <FlatList<OnBoardingType>
      data={onboardingData}
      renderItem={({ item }) => (
        <OnboardingItem
          item={item}
          width={width}
          currentIndex={currentIndex}
          onboardingData={onboardingData}
          scrollX={scrollX}
        />
      )}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={32}
      ref={slidesRef}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewConfig}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
    />
  );
};

export default OnBoardingScreen;
