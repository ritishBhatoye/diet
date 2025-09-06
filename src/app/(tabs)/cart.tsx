import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button, Icon, Text } from '@/components/atoms';
import { QuantityControl, StatCard } from '@/components/elements';
import { ICONS, images } from '@/constants';

const cartItems = [
  {
    id: 1,
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    quantity: 1,
    image: images.burgerOne,
    meal: 'Lunch',
  },
  {
    id: 2,
    name: 'Brown Rice',
    calories: 112,
    protein: 2.3,
    quantity: 0.5,
    unit: 'cup',
    image: images.salad,
    meal: 'Lunch',
  },
  {
    id: 3,
    name: 'Greek Yogurt',
    calories: 100,
    protein: 17,
    quantity: 1,
    unit: 'cup',
    image: images.avocado,
    meal: 'Breakfast',
  },
];

const Cart = () => {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items
        .map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const totalCalories = items.reduce(
    (sum, item) => sum + item.calories * item.quantity,
    0
  );
  const totalProtein = items.reduce(
    (sum, item) => sum + item.protein * item.quantity,
    0
  );

  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.meal]) acc[item.meal] = [];
      acc[item.meal].push(item);
      return acc;
    },
    {} as Record<string, typeof items>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 pb-3 pt-5">
        <View className="mb-4 flex-row items-center justify-between">
          <Text variant="heading" weight="bold">
            Food Log
          </Text>
          <Button title="Add Meal" size="small" />
        </View>

        {/* Summary */}
        <View className="flex-row justify-between space-x-2">
          <StatCard
            value={Math.round(totalCalories)}
            label="Calories"
            color="blue"
          />
          <StatCard
            value={`${Math.round(totalProtein)}g`}
            label="Protein"
            color="blue"
          />
          <StatCard value={items.length} label="Items" color="green" />
        </View>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-5">
          <Image
            source={images.emptyState}
            className="mb-4 h-32 w-32"
            resizeMode="contain"
          />
          <Text variant="subheading" weight="bold" className="mb-2">
            No foods logged yet
          </Text>
          <Text
            variant="caption"
            color="secondary"
            className="mb-6 text-center"
          >
            Start tracking your nutrition by adding foods to your daily log
          </Text>
          <Button title="Log Your First Meal" size="large" />
        </View>
      ) : (
        <FlatList
          className="flex-1"
          showsVerticalScrollIndicator={false}
          data={Object.entries(groupedItems)}
          renderItem={({ item: [mealType, mealItems] }) => (
            <View className="mx-5 mb-4">
              <Text variant="subheading" weight="bold" className="mb-3">
                {mealType}
              </Text>
              {mealItems.map(item => (
                <View
                  key={item.id}
                  className="mb-3 rounded-xl bg-white p-4 shadow-sm"
                >
                  <View className="flex-row items-center">
                    <View className="mr-4 h-16 w-16 items-center justify-center rounded-xl bg-gray-100/20 ">
                      <Image
                        source={item.image}
                        className="h-12 w-12"
                        resizeMode="contain"
                      />
                    </View>
                    <View className="flex-1">
                      <Text variant="body" weight="bold" className="mb-1">
                        {item.name}
                      </Text>
                      <View className="mb-2 flex-row items-center">
                        <Text
                          variant="caption"
                          color="secondary"
                          className="mr-4"
                        >
                          {Math.round(item.calories * item.quantity)} cal
                        </Text>
                        <Text variant="caption" color="secondary">
                          {Math.round(item.protein * item.quantity)}g protein
                        </Text>
                      </View>
                      <QuantityControl
                        quantity={item.quantity}
                        unit={item.unit || 'serving'}
                        onIncrease={() => updateQuantity(item.id, 0.5)}
                        onDecrease={() => updateQuantity(item.id, -0.5)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => updateQuantity(item.id, -item.quantity)}
                      className="ml-2 h-8 w-8 items-center justify-center rounded-full bg-red-100"
                    >
                      <Icon name={ICONS.delete} size="small" color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Cart;
