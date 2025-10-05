import React from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-green-500';
      case 'secondary':
        return 'bg-gray-200';
      case 'outline':
        return 'border border-green-500 bg-transparent';
      default:
        return 'bg-green-500';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2';
      case 'medium':
        return 'px-4 py-3';
      case 'large':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'font-quicksand-bold text-center';
    const colorStyles: 'text-green-500' | 'text-gray-700' | 'text-white' =
      variant === 'outline'
        ? 'text-green-500'
        : variant === 'secondary'
          ? 'text-gray-700'
          : 'text-white';
    const sizeStyles =
      size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
    return `${baseStyles} ${colorStyles} ${sizeStyles}`;
  };

  return (
    <TouchableOpacity
      className={`rounded-xl ${getVariantStyles()} ${getSizeStyles()} ${className}`}
      {...props}
    >
      <Text className={getTextStyles()}>{title}</Text>
    </TouchableOpacity>
  );
};
