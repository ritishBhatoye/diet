import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: any) => (
  <View>
    <Image
      source={icon}
      className="size-7"
      contentFit="contain"
      tintColor={focused ? "#FE8C00" : "#5D5F6D"}
    />
  </View>
);

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home" icon={images.home} />
          ),
        }}
      />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default TabLayout;
