import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { View } from 'react-native';

import { Text } from '@/components/atoms';

interface Props {
  item: FoodItemCardType;
  cardType: 'shrink' | 'expand';
}

const FoodItemCard = ({ item, cardType }: Props) => (
  <View
    className={`rounded-2xl bg-white p-4 py-5 pb-7 ${
      cardType === 'shrink'
        ? 'w-56 flex-col' // Fixed width for horizontal scrolling
        : 'flex-1 flex-row'
    }`}
  >
    <Image
      source={item?.image ? { uri: item.image } : item?.image}
      className="rounded-2xl"
      style={{
        borderRadius: 9,
        height: cardType === 'shrink' ? 120 : 150,
        width: cardType === 'shrink' ? '100%' : 100,
      }}
    />
    <View
      className={`flex-col items-start justify-between ${
        cardType === 'shrink' ? 'mt-3' : 'ml-4 flex-1'
      }`}
    >
      <View className="w-full">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="flex-1 font-medium" numberOfLines={1}>
            {item.meal}
          </Text>
          <View className="ml-2 flex-row items-center">
            <Ionicons name="star" color="#FFD700" size={16} />
            <Text className="ml-1 text-xs">{item.rating}</Text>
          </View>
        </View>
        <Text
          className="text-sm text-gray-600"
          variant="body"
          numberOfLines={2}
        >
          {item.ingredients}
        </Text>
      </View>
    </View>
  </View>
);

export default FoodItemCard;
