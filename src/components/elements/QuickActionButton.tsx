import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Icon, Text } from '../atoms';

interface QuickActionButtonProps {
  title: string;
  iconName: keyof typeof import('@expo/vector-icons/Ionicons').glyphMap;
  color: string;
  onPress?: () => void;
  className?: string;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  title,
  iconName,
  color,
  onPress,
  className,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 items-center rounded-xl bg-white p-4 shadow-sm ${className}`}
    >
      <View
        className="mb-2 h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name={iconName} color={color} />
      </View>
      <Text
        variant="caption"
        weight="medium"
        color="secondary"
        className="text-center"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
