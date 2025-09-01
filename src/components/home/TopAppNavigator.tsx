import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';

import { ICONS } from '@/constants';

import { Icon, Text } from '../atoms';
import { LocationBottomSheet } from '../elements';

const TopAppNavigator = () => {
  const [isLocationSheetVisible, setIsLocationSheetVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setIsLocationSheetVisible(false);
  };

  const handleOpenLocationSheet = () => {
    setIsLocationSheetVisible(true);
  };

  return (
    <SafeAreaView>
      <BlurView
        intensity={50}
        style={{ borderRadius: 20, overflow: 'hidden' }}
        tint="light"
        className="mx-6 rounded-lg p-4"
      >
        <View className="flex-col   px-5 pb-3 pt-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text fontFamily="plus-jakarta-sans" weight="medium">
                Good Morning!
              </Text>
              <Text
                variant="heading"
                fontFamily="dancing-script"
                weight="semibold"
              >
                Ritish..
              </Text>

              <Text
                variant="caption"
                color="secondary"
                fontFamily="barlow"
                weight="light"
              >
                Let&apos;s track your nutrition today
              </Text>
            </View>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-white">
              <Icon name={ICONS.profile} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleOpenLocationSheet}
            className="flex-row items-center justify-center gap-4 rounded-2xl bg-white p-2 px-4"
          >
            <Icon name={ICONS.location} color="#000000" size="small" />
            <Text fontFamily="plus-jakarta-sans" weight="medium">
              {selectedLocation?.name || 'Select Location'}
            </Text>
            <Icon name={ICONS.chevronDown} color="#000000" size="small" />
          </TouchableOpacity>

          <LocationBottomSheet
            visible={isLocationSheetVisible}
            onClose={() => setIsLocationSheetVisible(false)}
            onLocationSelect={handleLocationSelect}
          />
        </View>
      </BlurView>
    </SafeAreaView>
  );
};

export default TopAppNavigator;
