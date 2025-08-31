import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { ICONS } from '@/constants';

import { Icon, Text } from '../atoms';

interface QuantityControlProps {
  quantity: number;
  unit?: string;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  unit = 'serving',
  onIncrease,
  onDecrease,
  className,
}) => {
  return (
    <View className={`flex-row items-center ${className}`}>
      <TouchableOpacity
        onPress={onDecrease}
        className="h-8 w-8 items-center justify-center rounded-full bg-gray-200"
      >
        <Icon name={ICONS.minus} size="small" color="#6B7280" />
      </TouchableOpacity>
      <Text variant="body" weight="bold" className="mx-3">
        {quantity} {unit}
      </Text>
      <TouchableOpacity
        onPress={onIncrease}
        className="h-8 w-8 items-center justify-center rounded-full bg-green-500"
      >
        <Icon name={ICONS.add} size="small" color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
