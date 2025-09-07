import { useEffect, useMemo } from 'react';
import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import FoodItemCard from '@/components/elements/Cards/FoodItemCard';
import { useFoodStore } from '@/store/food';

interface Props {
  limit?: number;
  layout?: 'row' | 'grid';
  columns?: number; // used when layout = 'grid'
}

const BestFoodView = ({ limit, layout = 'row', columns = 2 }: Props) => {
  const items = useFoodStore(s => s.items);
  const fetch = useFoodStore(s => s.fetch);
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const data: FoodItemType[] = useMemo(() => {
    const merged = [...items];
    return typeof limit === 'number'
      ? merged.slice(0, Math.max(0, limit))
      : merged;
  }, [items, limit]);

  const isRow = layout === 'row';

  const sidePadding = 12; // px-5
  const gap = 16; // item gap
  const availableWidth = screenWidth - sidePadding * 2 - (columns - 1) * gap;
  const itemWidth = Math.floor(availableWidth / columns);

  return (
    <FlatList
      data={data}
      horizontal={isRow}
      numColumns={isRow ? 1 : columns}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: sidePadding,
        paddingVertical: 12,
      }}
      // We manage gaps manually to avoid clipping
      columnWrapperStyle={undefined}
      ItemSeparatorComponent={() =>
        isRow ? <View style={{ width: gap }} /> : null
      }
      renderItem={({ item, index }: { item: FoodItemType; index: number }) => {
        const isEndOfRow = !isRow && (index + 1) % columns === 0;
        const containerStyle = isRow
          ? undefined
          : {
              width: itemWidth,
              marginBottom: 16,
              marginRight: isEndOfRow ? 0 : gap,
            };
        return (
          <TouchableOpacity
            key={item._id ?? item.name ?? `item-${index}`}
            style={containerStyle}
          >
            <FoodItemCard item={item} cardType={'shrink'} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(_, index) => `food-item-${index}`}
    />
  );
};

export default BestFoodView;
