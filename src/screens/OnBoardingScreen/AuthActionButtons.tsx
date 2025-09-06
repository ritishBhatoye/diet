import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '@/components/atoms/Button';

export const AuthActionButtons = () => {
  const handleGetStarted = () => {
    router.push('/(tabs)/index');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="w-full gap-5 px-6">
      <Button
        title="Get Started"
        variant="primary"
        size="large"
        onPress={handleGetStarted}
        className="w-full"
      />
      <Button
        title="Login"
        variant="outline"
        size="large"
        onPress={handleLogin}
        className="w-full"
      />
    </View>
  );
};
