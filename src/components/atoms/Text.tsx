import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'label';
  weight?: 'regular' | 'medium' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  className,
  children,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'heading':
        return 'text-2xl';
      case 'subheading':
        return 'text-lg';
      case 'body':
        return 'text-base';
      case 'caption':
        return 'text-sm';
      case 'label':
        return 'text-xs';
      default:
        return 'text-base';
    }
  };

  const getWeightStyles = () => {
    switch (weight) {
      case 'regular':
        return 'font-quicksand-regular';
      case 'medium':
        return 'font-quicksand-medium';
      case 'bold':
        return 'font-quicksand-bold';
      default:
        return 'font-quicksand-regular';
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return 'text-gray-800';
      case 'secondary':
        return 'text-gray-500';
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-orange-600';
      case 'error':
        return 'text-red-600';
      case 'white':
        return 'text-white';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <RNText
      className={`${getVariantStyles()} ${getWeightStyles()} ${getColorStyles()} ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
};
