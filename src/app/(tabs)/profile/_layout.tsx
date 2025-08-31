import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { ICONS } from '@/constants';

const ProfileLayout = () => (
  <Stack>
    <Stack.Screen
      name="profile"
      options={{
        headerTitleStyle: { fontSize: 18, fontWeight: 600 },
        headerTitle: 'Profile',
        headerLeft: () => (
          <Ionicons name="backspace-outline" color={'dark-100'} size={16} />
        ),
        headerRight: () => (
          <Ionicons name={ICONS.search} size={24} color={'#374151'} />
        ),
      }}
    />
  </Stack>
);

export default ProfileLayout;
