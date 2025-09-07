import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Food Details for ID: {id}</Text>
      {/* Display nutrition info, calories, etc. */}
    </View>
  );
}
