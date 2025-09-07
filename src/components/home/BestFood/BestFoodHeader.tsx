import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/atoms';

interface Props {
  handleViewAll: () => void;
}

const BestFoodHeader = ({ handleViewAll }: Props) => (
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
);

export default BestFoodHeader;
