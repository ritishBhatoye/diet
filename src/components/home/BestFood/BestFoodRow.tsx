import { useEffect, useMemo } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import FoodItemCard from '@/components/elements/Cards/FoodItemCard';
import { useFoodStore } from '@/store/food';
import { router } from 'expo-router';

interface Props {
  limit?: number;
}

const BestFoodRow = ({ limit }: Props) => {
  const items = useFoodStore(s => s.items);
  const fetch = useFoodStore(s => s.fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const data: any[] = useMemo(() => {
    const merged = [...items];
    return typeof limit === 'number'
      ? merged.slice(0, Math.max(0, limit))
      : merged;
  }, [items, limit]);

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 0, paddingVertical: 12 }}
      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      renderItem={({ item }: { item: any }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/(tabs)/home/food/[id]',
              params: { id: item?._id },
            })
          }
          key={item?._id ?? item?.id ?? item?.image ?? item?.name}
        >
          <FoodItemCard item={item} cardType={'shrink'} />
        </TouchableOpacity>
      )}
      keyExtractor={(_, index) => `food-item-${index}`}
    />
  );
};

export default BestFoodRow;
