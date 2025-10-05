import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { Portal } from 'react-native-portalize';

import { MacroStat, NutritionProgress, QuickActionButton } from '@/components';
import { Text } from '@/components/atoms';
import CustomModal from '@/components/elements/CustomModal';
import BestFood from '@/components/home/BestFood';
import MyMealPlans from '@/components/home/MyMealPlans';
import TopAppNavigator from '@/components/home/TopAppNavigator';
import { useUploadImage } from '@/components/hooks/useUploadImage';
import { offers } from '@/constants';
import { quickActionsData } from '@/constants/quickActions';

const dailyStats = {
  calories: { consumed: 1250, target: 2000 },
  water: { consumed: 6, target: 8 },
  protein: { consumed: 45, target: 120 },
  carbs: { consumed: 150, target: 200 },
};

export default function HomeScreen() {
  // Handler functions for each action
  const { result, pickAndUploadImage } = useUploadImage();
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);

  const handleLogMeal = () => {
    // TODO: open bottom sheet logic
  };
  const handleScanFood = async () => {
    const scanResult: any = await pickAndUploadImage();
    console.log(' scanResult ', scanResult);
    if (scanResult?.calories) {
      setIsScanModalOpen(true);
    } else if (scanResult?.error) {
      Alert.alert('Error', scanResult.error);
    }
  };
  const handleAddWater = () => {
    // TODO: add water logic
  };
  const handleWeighIn = () => {
    // TODO: weigh in logic
  };

  // Map action IDs to handlers

  const actionHandlers: Record<number, () => void> = {
    1: handleLogMeal,
    2: handleScanFood,
    3: handleAddWater,
    4: handleWeighIn,
  };

  // const calorieProgress =
  //   (dailyStats.calories.consumed / dailyStats.calories.target) * 100;

  return (
    <LinearGradient
      colors={['#32CD32', '#90EE90', '#6EA763', '#ffffff']}
      style={{ flex: 1, paddingVertical: 20 }}
    >
      <Portal>
        <CustomModal
          visible={isScanModalOpen}
          title="Scan Result"
          message={`Your scanned food has ${result?.calories} calories.`}
          onClose={() => setIsScanModalOpen(false)}
          confirmText="OK"
          onConfirm={() => setIsScanModalOpen(false)}
        />
      </Portal>
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Header */}
        <TopAppNavigator />

        {/* Daily Progress Card */}
        <View className="mx-5 mt-4 rounded-2xl bg-white  p-4 shadow-sm">
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
            {quickActionsData.map(
              (action: (typeof quickActionsData)[number]) => (
                <QuickActionButton
                  key={action.id}
                  title={action.title}
                  iconName={action.iconName}
                  color={action.color}
                  className="mx-1"
                  onPress={actionHandlers[action.id] || (() => {})}
                />
              )
            )}
          </View>
        </View>

        <BestFood
          handleViewAll={() => {
            router.push('/(tabs)/home/best-food');
          }}
        />
        <MyMealPlans />
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
    </LinearGradient>
  );
}
