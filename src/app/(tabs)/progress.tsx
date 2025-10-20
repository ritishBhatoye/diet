import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';

import { Button, Text } from '@/components/atoms';
import { StatCard } from '@/components/elements';
import { images } from '@/constants';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Mock data - replace with actual data from storage
  const stats = {
    currentWeight: 75,
    startWeight: 80,
    goalWeight: 70,
    streak: 12,
    totalDays: 45,
  };

  const weightLoss = stats.startWeight - stats.currentWeight;
  const remaining = stats.currentWeight - stats.goalWeight;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 pb-4 pt-5">
        <Text variant="heading" weight="bold" className="mb-4">
          Your Progress
        </Text>

        {/* Period Selector */}
        <View className="mb-4 flex-row rounded-xl bg-gray-100 p-1">
          {(['week', 'month', 'year'] as const).map(period => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              className={`flex-1 rounded-lg py-2 ${
                selectedPeriod === period ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Text
                variant="caption"
                weight="bold"
                className={`text-center ${
                  selectedPeriod === period ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap justify-between">
          <View className="mb-3 w-[48%]">
            <StatCard
              value={`${weightLoss}kg`}
              label="Lost"
              color="green"
            />
          </View>
          <View className="mb-3 w-[48%]">
            <StatCard
              value={`${remaining}kg`}
              label="To Goal"
              color="blue"
            />
          </View>
          <View className="mb-3 w-[48%]">
            <StatCard
              value={stats.streak}
              label="Day Streak"
              color="orange"
            />
          </View>
          <View className="mb-3 w-[48%]">
            <StatCard
              value={stats.totalDays}
              label="Total Days"
              color="purple"
            />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Weight Chart Placeholder */}
        <View className="mx-5 mt-4 rounded-xl bg-white p-4 shadow-sm">
          <Text variant="subheading" weight="bold" className="mb-3">
            Weight Trend
          </Text>
          <View className="h-48 items-center justify-center rounded-lg bg-gray-100">
            <Text variant="caption" color="secondary">
              Chart coming soon
            </Text>
          </View>
        </View>

        {/* Progress Photos */}
        <View className="mx-5 mt-4 rounded-xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text variant="subheading" weight="bold">
              Progress Photos
            </Text>
            <Button title="Add Photo" size="small" />
          </View>
          
          <View className="h-32 items-center justify-center rounded-lg bg-gray-100">
            <Image
              source={images.emptyState}
              className="mb-2 h-16 w-16"
              resizeMode="contain"
            />
            <Text variant="caption" color="secondary">
              No photos yet
            </Text>
          </View>
        </View>

        {/* Body Measurements */}
        <View className="mx-5 my-4 rounded-xl bg-white p-4 shadow-sm">
          <View className="mb-3 flex-row items-center justify-between">
            <Text variant="subheading" weight="bold">
              Measurements
            </Text>
            <Button title="Update" size="small" />
          </View>
          
          <View className="space-y-3">
            <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
              <Text variant="body" color="secondary">Weight</Text>
              <Text variant="body" weight="bold">{stats.currentWeight} kg</Text>
            </View>
            <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
              <Text variant="body" color="secondary">Chest</Text>
              <Text variant="body" weight="bold">-- cm</Text>
            </View>
            <View className="flex-row items-center justify-between border-b border-gray-100 pb-3">
              <Text variant="body" color="secondary">Waist</Text>
              <Text variant="body" weight="bold">-- cm</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text variant="body" color="secondary">Hips</Text>
              <Text variant="body" weight="bold">-- cm</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Progress;
