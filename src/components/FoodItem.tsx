import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { ICONS } from '@/constants';

import { Icon, Text } from './atoms';

interface FoodItemProps {
  name: string;
  calories: number;
  protein: number;
  image: any;
  onAdd?: () => void;
  onPress?: () => void;
}

export const FoodItem: React.FC<FoodItemProps> = ({
  name,
  calories,
  protein,
  image,
  onAdd,
  onPress,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="mb-3 flex-row items-center rounded-xl bg-white p-4 shadow-sm"
  >
    <View className="mr-4 h-16 w-16 items-center justify-center rounded-xl bg-gray-100">
      <Image source={image} className="h-12 w-12" resizeMode="contain" />
    </View>
    <View className="flex-1">
      <Text variant="body" weight="bold" className="mb-1">
        {name}
      </Text>
      <View className="flex-row items-center">
        <Text variant="caption" color="secondary" className="mr-4">
          {calories} cal
        </Text>
        <Text variant="caption" color="secondary">
          {protein}g protein
        </Text>
      </View>
    </View>
    {onAdd && (
      <TouchableOpacity
        onPress={onAdd}
        className="h-8 w-8 items-center justify-center rounded-full bg-green-100"
      >
        <Icon name={ICONS.add} size="small" color="#10B981" />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);
