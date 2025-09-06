import { Ionicons } from '@expo/vector-icons';
import cn from 'clsx';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

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
        color={focused ? '#FE8C00' : '#5D5F6D'}
      />
    ) : (
      icon
    )}
    <Text
      className={cn(
        'text-sm font-bold',
        focused ? 'text-primary' : 'text-gray-200'
      )}
    >
      {title}
    </Text>
  </View>
);

export default function TabLayout() {
  // const { isAuthenticated } = useAuthStore();

  // if(!isAuthenticated) return <Redirect href="/sign-in" />

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: 'absolute',
          bottom: 40,
          backgroundColor: 'white',
          shadowColor: '#1a1a1a',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
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
