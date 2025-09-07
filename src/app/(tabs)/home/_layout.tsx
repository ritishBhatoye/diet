import { Stack } from 'expo-router';

const HomeLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="best-food" />
    <Stack.Screen name="index" />
  </Stack>
);

export default HomeLayout;
