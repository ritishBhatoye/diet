import { View } from 'react-native';

import BestFoodHeader from './BestFoodHeader';
import BestFoodRow from './BestFoodRow';

interface props {
  limit: number;
  handleViewAll: () => void;
}

const BestFood = ({ handleViewAll, limit }: props) => (
  <View className="mt-4 gap-5 px-5">
    <BestFoodHeader handleViewAll={handleViewAll} />
    <BestFoodRow limit={limit} />
  </View>
);

export default BestFood;
