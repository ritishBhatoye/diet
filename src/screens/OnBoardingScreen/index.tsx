import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactElement } from 'react';
// eslint-disable-next-line no-duplicate-imports
import { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  View,
  type ViewToken,
} from 'react-native';

import { onboardingData } from '@/data/onboardingData';

import { AuthActionButtons } from './AuthActionButtons';
import { OnboardingItem } from './OnboardingItem';
import { Pagination } from './Pagination';

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

  const backgroundImage =
    onboardingData[currentIndex]?.image || onboardingData[0]?.image;

  return (
    <ImageBackground
      source={{ uri: backgroundImage as any }}
      style={{ flex: 1 }}
      className="flex-1"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', ' rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
        style={{
          flex: 1,
          // justifyContent: 'flex-end',
          paddingBottom: 70,
          // gap: 40,
          // paddingHorizontal: 20,
        }}
      >
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
        <View className="w-full items-center pt-6">
          <Pagination data={onboardingData} scrollX={scrollX} width={width} />
          {currentIndex === onboardingData.length - 1 ? (
            <AuthActionButtons />
          ) : null}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default OnBoardingScreen;
