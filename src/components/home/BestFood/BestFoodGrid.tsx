import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';

import { fetchFoodItems } from '@/api/sanity';
import FoodItemCard from '@/components/elements/Cards/FoodItemCard';

interface Props {
  columns?: number;
}

const BestFoodGrid = ({ columns = 2 }: Props) => {
  const [remoteItems, setRemoteItems] = useState<any[]>([]);
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    fetchFoodItems()
      .then(items => {
        console.log(
          '[CMS] BestFoodGrid raw items:',
          JSON.stringify(items, null, 2)
        );
        setRemoteItems(items);
        return items;
      })
      .catch(() => setRemoteItems([]));
  }, []);

  const data: any[] = useMemo(() => [...remoteItems], [remoteItems]);

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
            key={item?._id ?? item?.id ?? item?.image ?? item?.name}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/home/food/[id]',
                params: { id: item?._id },
              })
            }
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
