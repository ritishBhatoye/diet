import { router } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

import { Text } from '@/components';
import { Button } from '@/components/atoms/Button';

const Login = () => {
  const handleLogin = () => {
    // Handle login logic here
    router.push('/(tabs)');
  };

  const handleBackToOnboarding = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-6">
        <View className="mb-8">
          <Text
            variant="heading"
            fontFamily="plus-jakarta-sans-semibold"
            className="mb-4 text-center text-3xl text-gray-800"
          >
            Welcome Back
          </Text>
          <Text
            variant="subheading"
            fontFamily="plus-jakarta-sans-variable"
            className="text-center text-gray-600"
          >
            Sign in to continue your healthy journey
          </Text>
        </View>

        <View className="space-y-4">
          <Button
            title="Login with Email"
            variant="primary"
            size="large"
            onPress={handleLogin}
            className="w-full"
          />
          <Button
            title="Back to Onboarding"
            variant="outline"
            size="medium"
            onPress={handleBackToOnboarding}
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
