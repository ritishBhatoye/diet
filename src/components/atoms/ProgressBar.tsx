import React from 'react';
import { View } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#10B981',
  backgroundColor = '#E5E7EB',
  height = 8,
  className,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View
      className={`rounded-full ${className}`}
      style={{ backgroundColor, height }}
    >
      <View
        className="rounded-full"
        style={{
          backgroundColor: color,
          width: `${clampedProgress}%`,
          height: '100%',
        }}
      />
    </View>
  );
};
