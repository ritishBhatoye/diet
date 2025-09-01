import { router } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

import { Text } from '@/components';
import { Button } from '@/components/atoms/Button';

const Register = () => {
  const handleRegister = () => {
    // Handle registration logic here
    router.push('/(tabs)');
  };

  const handleBackToOnboarding = () => {
    router.back();
  };

  const handleGoToLogin = () => {
    router.push('/(auth)/login');
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
            Get Started
          </Text>
          <Text
            variant="subheading"
            fontFamily="plus-jakarta-sans-variable"
            className="text-center text-gray-600"
          >
            Create your account to start your healthy lifestyle
          </Text>
        </View>

        <View className="space-y-4">
          <Button
            title="Create Account"
            variant="primary"
            size="large"
            onPress={handleRegister}
            className="w-full"
          />
          <Button
            title="Already have an account? Login"
            variant="secondary"
            size="medium"
            onPress={handleGoToLogin}
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

export default Register;
