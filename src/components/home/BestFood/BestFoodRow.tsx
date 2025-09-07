import { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { fetchFoodItems } from '@/api/sanity';
import FoodItemCard from '@/components/elements/Cards/FoodItemCard';
import { foodItemsData } from '@/data/foodItemsData';

interface Props {
  limit?: number;
}

const BestFoodRow = ({ limit }: Props) => {
  const [remoteItems, setRemoteItems] = useState<FoodItemCardType[]>([]);

  useEffect(() => {
    fetchFoodItems()
      .then(items =>
        items.map(it => ({
          meal: it.name,
          ingredients: it.description ?? `${it.calories ?? ''} kcal`,
          rating: '4.5',
          image: undefined,
        }))
      )
      .then(mapped => setRemoteItems(mapped))
      .catch(() => setRemoteItems([]));
  }, []);

  const data: FoodItemCardType[] = useMemo(() => {
    const merged = [...remoteItems, ...foodItemsData];
    return typeof limit === 'number'
      ? merged.slice(0, Math.max(0, limit))
      : merged;
  }, [remoteItems, limit]);

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 12 }}
      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      renderItem={({ item }: { item: FoodItemCardType }) => (
        <TouchableOpacity key={item.image ?? item.meal}>
          <FoodItemCard item={item} cardType={'shrink'} />
        </TouchableOpacity>
      )}
      keyExtractor={(_, index) => `food-item-${index}`}
    />
  );
};

export default BestFoodRow;
