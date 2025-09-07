import { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';

import { fetchFoodItems } from '@/api/sanity';
import FoodItemCard from '@/components/elements/Cards/FoodItemCard';
import { foodItemsData } from '@/data/foodItemsData';

interface Props {
  columns?: number;
}

const BestFoodGrid = ({ columns = 2 }: Props) => {
  const [remoteItems, setRemoteItems] = useState<FoodItemCardType[]>([]);
  const { width: screenWidth } = useWindowDimensions();

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
    return [...remoteItems, ...foodItemsData];
  }, [remoteItems]);

  const sidePadding = 20;
  const gap = 16;
  const availableWidth = screenWidth - sidePadding * 2 - (columns - 1) * gap;
  const itemWidth = Math.floor(availableWidth / columns);

  return (
    <FlatList
      data={data}
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: sidePadding,
        paddingVertical: 12,
      }}
      columnWrapperStyle={{ columnGap: gap }}
      renderItem={({ item, index }) => {
        const isEndOfRow = (index + 1) % columns === 0;
        const containerStyle = {
          width: itemWidth,
          marginBottom: 16,
          marginRight: isEndOfRow ? 0 : gap,
        } as const;
        return (
          <TouchableOpacity
            key={item.image ?? item.meal}
            style={containerStyle as any}
          >
            <FoodItemCard item={item} cardType={'shrink'} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(_, index) => `food-item-${index}`}
    />
  );
};

export default BestFoodGrid;
