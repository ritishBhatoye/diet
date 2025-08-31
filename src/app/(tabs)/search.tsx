import { useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/atoms';
import { CategoryChip, SearchBar } from '@/components/elements';
import { FoodItem } from '@/components/FoodItem';
import { CATEGORIES, images } from '@/constants';

const recentSearches = [
  'Chicken Breast',
  'Quinoa Salad',
  'Greek Yogurt',
  'Almonds',
];

const popularFoods = [
  {
    id: 1,
    name: 'Grilled Chicken',
    calories: 165,
    protein: 31,
    image: images.burgerOne,
  },
  {
    id: 2,
    name: 'Brown Rice',
    calories: 112,
    protein: 2.3,
    image: images.salad,
  },
  { id: 3, name: 'Avocado', calories: 160, protein: 2, image: images.avocado },
  {
    id: 4,
    name: 'Salmon Fillet',
    calories: 206,
    protein: 22,
    image: images.pizzaOne,
  },
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('1');

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-5 pb-3 pt-5">
        <Text variant="heading" weight="bold" className="mb-4">
          Search Foods
        </Text>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search for foods, recipes..."
          onClear={() => setSearchQuery('')}
          className="mb-4"
        />

        {/* Categories */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          renderItem={({ item }) => (
            <CategoryChip
              title={item.name}
              isSelected={selectedCategory === item.id}
              onPress={() => setSelectedCategory(item.id)}
              className="mr-3"
            />
          )}
        />
      </View>

      <FlatList
        className="flex-1"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            {/* Recent Searches */}
            {searchQuery.length === 0 && (
              <View className="mb-6">
                <Text variant="subheading" weight="bold" className="mb-3">
                  Recent Searches
                </Text>
                <View className="flex-row flex-wrap">
                  {recentSearches.map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      className="mb-2 mr-2 rounded-full bg-white px-4 py-2 shadow-sm"
                    >
                      <Text variant="caption" weight="medium" color="secondary">
                        {search}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Popular Foods */}
            <Text variant="subheading" weight="bold" className="mb-3">
              {searchQuery.length > 0 ? 'Search Results' : 'Popular Foods'}
            </Text>
          </View>
        }
        data={popularFoods}
        renderItem={({ item }) => (
          <View className="mx-5">
            <FoodItem
              name={item.name}
              calories={item.calories}
              protein={item.protein}
              image={item.image}
              onAdd={() => {
                /* Add to cart logic */
              }}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default Search;
