import { Ionicons } from '@expo/vector-icons';
import { FlatList, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/atoms';
import { foodItemsData } from '@/data/foodItemsData';

import FoodItemCard from '../elements/Cards/FoodItemCard';

interface props {
  handleViewAll: () => void;
}

const BestFood = ({ handleViewAll }: props) => (
  <View className="mt-4 gap-5 px-5">
    <View className="flex flex-row items-center justify-between">
      <Text variant="heading">Best Food</Text>
      <TouchableOpacity
        onPress={handleViewAll}
        className="flex-row items-center gap-2"
      >
        <Text variant="label">View All</Text>
        <Ionicons name="chevron-forward-outline" size={18} color={'#000000'} />
      </TouchableOpacity>
    </View>
    <FlatList
      data={foodItemsData}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 2 }}
      ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      renderItem={({ item }: { item: FoodItemCardType }) => (
        <TouchableOpacity key={item.image}>
          <FoodItemCard item={item} cardType="shrink" />
        </TouchableOpacity>
      )}
      keyExtractor={index => `food-item-${index}`}
    />
  </View>
);

export default BestFood;
