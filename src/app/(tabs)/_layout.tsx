import { Ionicons } from '@expo/vector-icons';
import cn from 'clsx';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

import GlassTabBarBackground from '@/components/atoms/GlassTabBarBackground';
import { ICONS } from '@/constants';

interface TabBarIconProps {
  focused: boolean;
  iconName?: string;
  title: string;
  icon?: any;
}

const TabBarIcon = ({ focused, iconName, title, icon }: TabBarIconProps) => (
  <View className="mt-12 flex min-h-full min-w-20 items-center justify-center gap-1">
    {iconName ? (
      <Ionicons
        name={iconName as any}
        size={28}
        color={focused ? '#22C55E' : '#4B5563'}
      />
    ) : (
      icon
    )}
    <Text
      className={cn(
        'text-sm font-semibold',
        focused ? 'text-primary' : 'text-gray-600'
      )}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        // Glass Effect
        tabBarBackground: () => <GlassTabBarBackground />,

        // Floating rounded style
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 20,
          height: 80,
          borderRadius: 50,
          backgroundColor: 'transparent', // must be transparent for blur to work
          overflow: 'hidden', // ensures rounded corners
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" iconName={ICONS.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Search"
              iconName={ICONS.search}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" iconName={ICONS.bag} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              iconName={ICONS.profile}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
