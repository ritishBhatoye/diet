import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { Image } from "react-native";
const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerTitleStyle: { fontSize: 18, fontWeight: 600 },
          headerTitle: "Profile",
          headerLeft: () => (
            <Ionicons name="backspace-outline" color={"dark-100"} size={16} />
          ),
          headerRight: () => (
            <Image
              source={images.search}
              className="size-7"
              tintColor={"dark-100"}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default ProfileLayout;
