import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, View } from 'react-native';

import { ICONS } from '@/constants';

import { Icon, Text } from '../atoms';
const TopAppNavigator = () => (
  <LinearGradient
    colors={['#32CD32', '#90EE90', '#ffffff']}
    style={{ flex: 1, paddingVertical: 20 }}
  >
    <BlurView
      intensity={50}
      style={{ borderRadius: 20, overflow: 'hidden' }}
      tint="light"
      className="mx-6 rounded-lg p-4"
    >
      <View className="flex-col   px-5 pb-3 pt-5">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text variant="subheading" weight="bold">
              Good Morning!
            </Text>
            <Text variant="caption" color="secondary">
              Let&apos;s track your nutrition today
            </Text>
          </View>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-white">
            <Icon name={ICONS.profile} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-row items-center justify-center gap-4 rounded-2xl bg-white p-2 px-4">
          <Ionicons name="location-outline" color={'#000000'} size={20} />
          <Text>Mohali, Chandigarh Punjab</Text>
          <Ionicons name="chevron-down" color={'#000000'} size={20} />
        </TouchableOpacity>
      </View>
    </BlurView>
  </LinearGradient>
);

export default TopAppNavigator;
