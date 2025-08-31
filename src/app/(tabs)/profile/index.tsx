import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Text } from '@/components/atoms';
import { images } from '@/constants';

const userStats = {
  currentWeight: 68.5,
  targetWeight: 65,
  height: 170,
  age: 28,
  streak: 12,
  totalLogs: 156,
};

const menuItems = [
  { id: 1, title: 'Goals & Targets', iconName: ICONS.star, color: '#10B981' },
  { id: 2, title: 'Progress Photos', iconName: ICONS.camera, color: '#3B82F6' },
  {
    id: 3,
    title: 'Body Measurements',
    iconName: ICONS.analytics,
    color: '#8B5CF6',
  },
  {
    id: 4,
    title: 'Meal Preferences',
    iconName: ICONS.nutrition,
    color: '#F59E0B',
  },
  {
    id: 5,
    title: 'Notifications',
    iconName: ICONS.notifications,
    color: '#EF4444',
  },
  { id: 6, title: 'Export Data', iconName: ICONS.arrowRight, color: '#6B7280' },
] as const;

const Profile = () => {
  const weightProgress =
    ((userStats.currentWeight - userStats.targetWeight) /
      userStats.currentWeight) *
    100;
  const bmi = (userStats.currentWeight / (userStats.height / 100) ** 2).toFixed(
    1
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-5 pb-6 pt-5">
          <View className="mb-6 flex-row items-center">
            <Avatar
              source={images.avatar}
              size="large"
              backgroundColor="#D1FAE5"
              className="mr-4"
            />
            <View className="flex-1">
              <Text className="font-quicksand-bold text-xl text-gray-800">
                John Doe
              </Text>
              <Text className="mb-2 text-sm text-gray-500">
                Joined 3 months ago
              </Text>
              <View className="flex-row items-center">
                <View className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                <Text className="font-quicksand-medium text-sm text-green-600">
                  {userStats.streak} day streak
                </Text>
              </View>
            </View>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Image
                source={images.pencil}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-between">
            <View className="mr-2 flex-1 rounded-xl bg-blue-50 p-4">
              <Text className="font-quicksand-bold text-2xl text-blue-600">
                {userStats.currentWeight}kg
              </Text>
              <Text className="text-xs text-blue-500">Current Weight</Text>
            </View>
            <View className="mx-1 flex-1 rounded-xl bg-green-50 p-4">
              <Text className="font-quicksand-bold text-2xl text-green-600">
                {bmi}
              </Text>
              <Text className="text-xs text-green-500">BMI</Text>
            </View>
            <View className="ml-2 flex-1 rounded-xl bg-purple-50 p-4">
              <Text className="font-quicksand-bold text-2xl text-purple-600">
                {userStats.totalLogs}
              </Text>
              <Text className="text-xs text-purple-500">Total Logs</Text>
            </View>
          </View>
        </View>

        {/* Progress Section */}
        <View className="mx-5 mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text className="mb-4 font-quicksand-bold text-lg text-gray-800">
            Weight Progress
          </Text>

          <View className="mb-3 flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-gray-500">Current</Text>
              <Text className="font-quicksand-bold text-lg text-gray-800">
                {userStats.currentWeight}kg
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500">Remaining</Text>
              <Text className="font-quicksand-bold text-lg text-orange-600">
                {(userStats.currentWeight - userStats.targetWeight).toFixed(1)}
                kg
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-sm text-gray-500">Target</Text>
              <Text className="font-quicksand-bold text-lg text-green-600">
                {userStats.targetWeight}kg
              </Text>
            </View>
          </View>

          <View className="mb-2 h-2 rounded-full bg-gray-200">
            <View
              className="h-2 rounded-full bg-green-500"
              style={{
                width: `${Math.max(20, 100 - Math.abs(weightProgress))}%`,
              }}
            />
          </View>
          <Text className="text-center text-xs text-gray-500">
            {Math.abs(weightProgress).toFixed(1)}% to goal
          </Text>
        </View>

        {/* Menu Items */}
        <View className="mx-5 mb-6 mt-4">
          <Text className="mb-3 font-quicksand-bold text-lg text-gray-800">
            Settings
          </Text>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              className="mb-2 flex-row items-center rounded-xl bg-white p-4 shadow-sm"
            >
              <View
                className="mr-4 h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Image
                  source={item.icon}
                  className="h-5 w-5"
                  resizeMode="contain"
                  style={{ tintColor: item.color }}
                />
              </View>
              <Text className="flex-1 font-quicksand-medium text-base text-gray-800">
                {item.title}
              </Text>
              <Image
                source={images.arrowRight}
                className="h-4 w-4"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity className="mt-4 flex-row items-center rounded-xl bg-red-50 p-4">
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <Image
                source={images.logout}
                className="h-5 w-5"
                resizeMode="contain"
              />
            </View>
            <Text className="flex-1 font-quicksand-medium text-base text-red-600">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
