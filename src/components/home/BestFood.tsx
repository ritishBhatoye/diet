import { View } from 'react-native';

import BestFoodHeader from './BestFood/BestFoodHeader';
import BestFoodRow from './BestFood/BestFoodRow';

interface props {
  handleViewAll: () => void;
}

const BestFood = ({ handleViewAll }: props) => (
  <View className="mt-4 gap-5 px-5">
    <BestFoodHeader handleViewAll={handleViewAll} />
    <BestFoodRow limit={8} />
  </View>
);

export default BestFood;
