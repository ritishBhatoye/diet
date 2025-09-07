import { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { fetchFoodItems } from '@/api/sanity';
import FoodItemCard from '@/components/elements/Cards/FoodItemCard';
import { foodItemsData } from '@/data/foodItemsData';

interface Props {
  limit?: number;
  layout?: 'row' | 'grid';
  columns?: number; // used when layout = 'grid'
}

const BestFoodView = ({ limit, layout = 'row', columns = 2 }: Props) => {
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

  const isRow = layout === 'row';
  const gridItemStyle = !isRow
    ? { width: columns === 2 ? '48%' : `${Math.floor(100 / columns)}%` }
    : undefined;

  return (
    <FlatList
      data={data}
      horizontal={isRow}
      numColumns={isRow ? 1 : columns}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 2 }}
      columnWrapperStyle={
        !isRow ? { paddingHorizontal: 2, gap: 16 } : undefined
      }
      ItemSeparatorComponent={() =>
        isRow ? <View style={{ width: 16 }} /> : null
      }
      renderItem={({ item }: { item: FoodItemCardType }) => (
        <TouchableOpacity
          key={item.image ?? item.meal}
          style={gridItemStyle as any}
        >
          <FoodItemCard item={item} cardType={'shrink'} />
        </TouchableOpacity>
      )}
      keyExtractor={(_, index) => `food-item-${index}`}
    />
  );
};

export default BestFoodView;
