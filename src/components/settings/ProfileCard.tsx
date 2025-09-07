import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { images } from '@/constants';

const ProfileCard = () => (
  <View className="mb-5 bg-white px-5 pb-6 pt-5">
    <View className="mb-6 flex-row items-center">
      <Image source={images.avatar} className="mr-4 h-20 w-20 rounded-full" />
      <View className="flex-1">
        <Text className="font-quicksand-bold text-xl text-gray-800">
          John Doe
        </Text>
        <Text className="mb-2 text-sm text-gray-500">Joined 3 months ago</Text>
        <View className="flex-row items-center">
          <View className="mr-2 h-2 w-2 rounded-full bg-green-500" />
          <Text className="font-quicksand-medium text-sm text-green-600">
            12 day streak
          </Text>
        </View>
      </View>
      <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <Ionicons name="pencil-outline" size={24} color="#6B7280" />
      </TouchableOpacity>
    </View>

    <View className="flex-row justify-between">
      <View className="mr-2 flex-1 rounded-xl bg-blue-50 p-4">
        <Text className="font-quicksand-bold text-2xl text-blue-600">
          68.5kg
        </Text>
        <Text className="text-xs text-blue-500">Current Weight</Text>
      </View>
      <View className="mx-1 flex-1 rounded-xl bg-green-50 p-4">
        <Text className="font-quicksand-bold text-2xl text-green-600">
          23.7
        </Text>
        <Text className="text-xs text-green-500">BMI</Text>
      </View>
      <View className="ml-2 flex-1 rounded-xl bg-purple-50 p-4">
        <Text className="font-quicksand-bold text-2xl text-purple-600">
          156
        </Text>
        <Text className="text-xs text-purple-500">Total Logs</Text>
      </View>
    </View>
  </View>
);

export default ProfileCard;
