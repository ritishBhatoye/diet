import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/atoms';
import { MealCard } from '@/components/MealCard';

interface MealPlanDay {
  id: string;
  day: string;
  date: string;
  isToday: boolean;
  meals: {
    breakfast: { calories: number; target: number; items: number };
    lunch: { calories: number; target: number; items: number };
    dinner: { calories: number; target: number; items: number };
    snacks: { calories: number; target: number; items: number };
  };
}

const mockMealPlanData: MealPlanDay[] = [
  {
    id: '1',
    day: 'Today',
    date: 'Dec 9',
    isToday: true,
    meals: {
      breakfast: { calories: 320, target: 400, items: 2 },
      lunch: { calories: 450, target: 600, items: 1 },
      dinner: { calories: 0, target: 700, items: 0 },
      snacks: { calories: 150, target: 200, items: 1 },
    },
  },
  {
    id: '2',
    day: 'Tomorrow',
    date: 'Dec 10',
    isToday: false,
    meals: {
      breakfast: { calories: 0, target: 400, items: 0 },
      lunch: { calories: 0, target: 600, items: 0 },
      dinner: { calories: 0, target: 700, items: 0 },
      snacks: { calories: 0, target: 200, items: 0 },
    },
  },
];

const MyMealPlans = () => {
  const [selectedDay, setSelectedDay] = useState<string>('1');

  const selectedMealPlan = mockMealPlanData.find(day => day.id === selectedDay);

  const getTotalCalories = (meals: MealPlanDay['meals']) =>
    Object.values(meals).reduce((total, meal) => total + meal.calories, 0);

  const getTotalTarget = (meals: MealPlanDay['meals']) =>
    Object.values(meals).reduce((total, meal) => total + meal.target, 0);

  const handleAddFood = (mealType: string) => {
    // Navigate to food selection or open modal
    console.log(`Add food to ${mealType}`);
  };

  const handleCreateNewPlan = () => {
    // Navigate to meal plan creation
    console.log('Create new meal plan');
  };

  const handleViewAllPlans = () => {
    // Navigate to all meal plans
  };

  return (
    <View className="mt-3 flex-1 px-5">
      {/* Header */}
      <View className="mb-4 flex-row items-center justify-between px-5">
        <Text variant="heading" weight="bold">
          My Meal Plans
        </Text>
        <TouchableOpacity
          onPress={handleViewAllPlans}
          className="flex-row items-center gap-1"
        >
          <Text variant="label" color="secondary">
            View All
          </Text>
          <Ionicons name="chevron-forward-outline" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Day Selector */}
      <View className="mb-4 px-5">
        <FlatList
          data={mockMealPlanData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedDay(item.id)}
              className={` rounded-full px-8  py-3 ${
                selectedDay === item.id ? 'bg-green-500' : 'bg-gray-100'
              }`}
            >
              <Text
                variant="subheading"
                weight="medium"
                className={`
                 ${selectedDay === item.id ? 'text-white' : 'text-gray-600'}`}
              >
                {item.day}
              </Text>
              <Text
                variant="label"
                className={
                  selectedDay === item.id ? 'text-white' : 'text-gray-500'
                }
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {selectedMealPlan && (
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
        >
          {/* Daily Summary */}
          <View className="mb-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-4">
            <Text variant="subheading" weight="bold" className="mb-2">
              Daily Progress
            </Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text variant="caption" color="secondary">
                  Total Calories
                </Text>
                <Text variant="heading" weight="bold">
                  {getTotalCalories(selectedMealPlan.meals)}/
                  {getTotalTarget(selectedMealPlan.meals)}
                </Text>
              </View>
              <View className="items-end">
                <Text variant="caption" color="secondary">
                  Remaining
                </Text>
                <Text variant="subheading" weight="bold" color="success">
                  {getTotalTarget(selectedMealPlan.meals) -
                    getTotalCalories(selectedMealPlan.meals)}{' '}
                  cal
                </Text>
              </View>
            </View>
          </View>

          {/* Meal Cards */}
          <View className="gap-3">
            <MealCard
              mealType="Breakfast"
              totalCalories={selectedMealPlan.meals.breakfast.calories}
              targetCalories={selectedMealPlan.meals.breakfast.target}
              itemCount={selectedMealPlan.meals.breakfast.items}
              onAddFood={() => handleAddFood('breakfast')}
            />
            <MealCard
              mealType="Lunch"
              totalCalories={selectedMealPlan.meals.lunch.calories}
              targetCalories={selectedMealPlan.meals.lunch.target}
              itemCount={selectedMealPlan.meals.lunch.items}
              onAddFood={() => handleAddFood('lunch')}
            />
            <MealCard
              mealType="Dinner"
              totalCalories={selectedMealPlan.meals.dinner.calories}
              targetCalories={selectedMealPlan.meals.dinner.target}
              itemCount={selectedMealPlan.meals.dinner.items}
              onAddFood={() => handleAddFood('dinner')}
            />
            <MealCard
              mealType="Snacks"
              totalCalories={selectedMealPlan.meals.snacks.calories}
              targetCalories={selectedMealPlan.meals.snacks.target}
              itemCount={selectedMealPlan.meals.snacks.items}
              onAddFood={() => handleAddFood('snacks')}
            />
          </View>

          {/* Quick Actions */}
          <View className="mb-4 mt-6 gap-3">
            <TouchableOpacity
              onPress={handleCreateNewPlan}
              className="flex-row items-center justify-center rounded-xl bg-green-500 p-4"
            >
              <Ionicons name="add-circle-outline" size={20} color="white" />
              <Text variant="body" weight="medium" className="ml-2 text-white">
                Create New Meal Plan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center rounded-xl border border-gray-200 bg-white p-4">
              <Ionicons name="copy-outline" size={20} color="#6B7280" />
              <Text
                variant="body"
                weight="medium"
                className="ml-2 text-gray-700"
              >
                Copy from Previous Day
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyMealPlans;
