import React from 'react';
import { View } from 'react-native';

import { ProgressBar, Text } from './atoms';

interface NutritionCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export const NutritionCard: React.FC<NutritionCardProps> = ({
  title,
  current,
  target,
  unit,
  color,
}) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <View className="rounded-xl bg-white p-4 shadow-sm">
      <View className="mb-2 flex-row items-center justify-between">
        <Text variant="caption" weight="medium" color="secondary">
          {title}
        </Text>
        <Text variant="caption" weight="bold">
          {current}/{target}
          {unit}
        </Text>
      </View>
      <ProgressBar progress={percentage} color={color} />
      <Text variant="label" color="secondary" className="mt-1">
        {Math.round(percentage)}% of daily goal
      </Text>
    </View>
  );
};
