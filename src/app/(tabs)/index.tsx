import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { MacroStat, NutritionProgress, QuickActionButton } from '@/components';
import { Icon, Text } from '@/components/atoms';
import { ICONS, offers } from '@/constants';

const dailyStats = {
  calories: { consumed: 1250, target: 2000 },
  water: { consumed: 6, target: 8 },
  protein: { consumed: 45, target: 120 },
  carbs: { consumed: 150, target: 200 },
};

const quickActions = [
  { id: 1, title: 'Log Meal', iconName: ICONS.restaurant, color: '#10B981' },
  { id: 2, title: 'Scan Food', iconName: ICONS.barcode, color: '#3B82F6' },
  { id: 3, title: 'Add Water', iconName: ICONS.water, color: '#06B6D4' },
  { id: 4, title: 'Weigh In', iconName: ICONS.scale, color: '#8B5CF6' },
] as const;

export default function Index() {
  const calorieProgress =
    (dailyStats.calories.consumed / dailyStats.calories.target) * 100;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-5 pb-3 pt-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text variant="subheading" weight="bold">
                Good Morning!
              </Text>
              <Text variant="caption" color="secondary">
                Let&apos;s track your nutrition today
              </Text>
            </View>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <Icon name={ICONS.profile} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Daily Progress Card */}
        <View className="mx-5 mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <Text variant="subheading" weight="bold" className="mb-4">
            Today&apos;s Progress
          </Text>

          {/* Calories */}
          <NutritionProgress
            title="Calories"
            current={dailyStats.calories.consumed}
            target={dailyStats.calories.target}
            color="#10B981"
            className="mb-4"
          />

          {/* Macros */}
          <View className="flex-row justify-between">
            <MacroStat
              label="Protein"
              value={`${dailyStats.protein.consumed}g`}
              color="blue"
            />
            <MacroStat
              label="Carbs"
              value={`${dailyStats.carbs.consumed}g`}
              color="orange"
            />
            <MacroStat
              label="Water"
              value={`${dailyStats.water.consumed} cups`}
              color="cyan"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-5 mt-4">
          <Text variant="subheading" weight="bold" className="mb-3">
            Quick Actions
          </Text>
          <View className="flex-row justify-between">
            {quickActions.map(action => (
              <QuickActionButton
                key={action.id}
                title={action.title}
                iconName={action.iconName}
                color={action.color}
                className="mx-1"
              />
            ))}
          </View>
        </View>

        {/* Meal Plans */}
        <View className="mx-5 mb-4 mt-6">
          <Text variant="subheading" weight="bold" className="mb-3">
            Recommended Meals
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={offers}
            renderItem={({ item }) => (
              <Pressable
                className="mr-4 h-40 w-64 overflow-hidden rounded-xl shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                <View className="h-full flex-row">
                  <View className="flex-1 justify-center p-4">
                    <Text
                      variant="heading"
                      weight="bold"
                      color="white"
                      className="mb-2"
                    >
                      {item.title}
                    </Text>
                    <Text
                      variant="caption"
                      color="white"
                      className="opacity-90"
                    >
                      Healthy & Delicious
                    </Text>
                  </View>
                  <View className="h-full w-24">
                    <Image
                      source={item.image}
                      className="h-full w-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
