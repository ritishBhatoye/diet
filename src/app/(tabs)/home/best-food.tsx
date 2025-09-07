import { SafeAreaView } from 'react-native';

import BestFoodView from '@/components/home/BestFood/BestFoodView';

const BestFoodScreen = () => (
  <SafeAreaView className="flex-1">
    <BestFoodView layout={'grid'} limit={20} />
  </SafeAreaView>
);
export default BestFoodScreen;
