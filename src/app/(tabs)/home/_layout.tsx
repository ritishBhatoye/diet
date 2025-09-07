import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

const HomeLayout = () => (
  <Stack>
    <Stack.Screen options={{ headerShown: false }} name="index" />
    <Stack.Screen
      options={{
        headerShown: true,
        headerShadowVisible: false,
        title: 'Best Food',
        headerTitleStyle: {
          fontWeight: 'bold', // Unique style
          fontSize: 20, // Make title bigger
          color: '#374151', // Custom text color
        },
        headerLeft: () => (
          <Ionicons
            name="chevron-back-outline"
            size={20}
            color={'#000000'}
            className="rounded-full bg-gray-500/20 p-2"
            onPress={() => router.back()}
          />
        ),
      }}
      name="best-food"
    />
  </Stack>
);

export default HomeLayout;
