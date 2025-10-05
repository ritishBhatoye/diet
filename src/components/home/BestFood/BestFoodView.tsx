import { useEffect, useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import FoodItemCard from '@/components/elements/Cards/FoodItemCard';
import { useFoodStore } from '@/store/food';

interface Props {
  limit?: number;
  columns?: number; // number of columns you want
}

const BestFoodView = ({ limit, columns = 2 }: Props) => {
  const items = useFoodStore(s => s.items);
  const fetch = useFoodStore(s => s.fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const data: FoodItemType[] = useMemo(() => {
    const merged = [...items];
    return typeof limit === 'number'
      ? merged.slice(0, Math.max(0, limit))
      : merged;
  }, [items, limit]);

  // Calculate percentage width for each column
  const itemWidthPercent = Math.floor(100 / columns);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="w-11/12 mx-auto gap-4"
    >
      <View className="flex-row flex-wrap justify-between">
        {data.map((item, index) => (
          <TouchableOpacity
            key={item._id ?? item.name ?? `item-${index}`}
            // dynamic width using NativeWind
            className={`mb-4`}
            style={{ width: `${itemWidthPercent}%` }}
          >
            <FoodItemCard item={item} cardType="shrink" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default BestFoodView;
