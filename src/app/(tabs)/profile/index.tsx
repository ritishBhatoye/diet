import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import ActionTile from '@/components/atoms/ActionTile';
import ProfileCard from '@/components/settings/ProfileCard';
import { SettingTileData } from '@/constants/dummyData/settings';

const Profile = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > 130) {
        navigation.setOptions({ headerTitle: 'My Account' });
      } else {
        navigation.setOptions({ headerTitle: '' });
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [navigation, scrollY]); // Added navigation and scrollY to dependencies

  return (
    <SafeAreaView className="h-full flex-1 bg-white">
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <ProfileCard />

        <View className="bg-white px-5">
          {SettingTileData.map((item, index) => (
            <View
              key={item.id}
              className={`${
                index === SettingTileData.length - 1 ? '' : 'border-b-[0.2px]'
              } py-5`}
            >
              <ActionTile actionData={item as any} />
            </View>
          ))}
        </View>

        <TouchableOpacity className="my-4 flex flex-row justify-between bg-white p-5">
          <Text className="text-start text-lg font-semibold text-black">
            LOGOUT
          </Text>
          <Ionicons name="chevron-forward-outline" color={'black'} size={24} />
        </TouchableOpacity>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
