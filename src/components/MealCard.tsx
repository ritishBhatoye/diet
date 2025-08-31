import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ICONS } from '@/constants';

import { Icon, ProgressBar, Text } from './atoms';

interface MealCardProps {
  mealType: string;
  totalCalories: number;
  targetCalories: number;
  itemCount: number;
  onAddFood: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({
  mealType,
  totalCalories,
  targetCalories,
  itemCount,
  onAddFood,
}) => {
  const percentage = (totalCalories / targetCalories) * 100;

  return (
    <View className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <View className="mb-3 flex-row items-center justify-between">
        <View>
          <Text variant="subheading" weight="bold">
            {mealType}
          </Text>
          <Text variant="caption" color="secondary">
            {totalCalories}/{targetCalories} cal • {itemCount} items
          </Text>
        </View>
        <TouchableOpacity
          onPress={onAddFood}
          className="h-8 w-8 items-center justify-center rounded-full bg-green-500"
        >
          <Icon name={ICONS.add} size="small" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ProgressBar progress={Math.min(percentage, 100)} color="#10B981" />
    </View>
  );
};
