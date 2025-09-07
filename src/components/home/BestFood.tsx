import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { fetchFoodItems } from '@/api/sanity';
import { Text } from '@/components/atoms';
import { foodItemsData } from '@/data/foodItemsData';

import FoodItemCard from '../elements/Cards/FoodItemCard';

interface props {
  handleViewAll: () => void;
}

const BestFood = ({ handleViewAll }: props) => {
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

  const data: FoodItemCardType[] = [...remoteItems, ...foodItemsData];

  return (
    <View className="mt-4 gap-5 px-5">
      <View className="flex flex-row items-center justify-between">
        <Text variant="heading">Best Food</Text>
        <TouchableOpacity
          onPress={handleViewAll}
          className="flex-row items-center gap-2"
        >
          <Text variant="label">View All</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color={'#000000'}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 2 }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        renderItem={({ item }: { item: FoodItemCardType }) => (
          <TouchableOpacity key={item.image ?? item.meal}>
            <FoodItemCard item={item} cardType="shrink" />
          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => `food-item-${index}`}
      />
    </View>
  );
};

export default BestFood;
