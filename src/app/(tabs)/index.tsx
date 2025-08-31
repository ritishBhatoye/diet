import { images, offers } from "@/constants";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        ListHeaderComponent={
          <View>
            <View className="flex-row  justify-between w-full my-5">
              <View className="flex-col items-start">
                <Text className="text-sm text-primary">DELIVER TO</Text>
                <TouchableOpacity className="items-center flex-row gap-x-1 mt-0.5">
                  <Text className="text-dark-100">Jalandhar,Punjab</Text>
                  <Image
                    source={images.arrowDown}
                    className="size-3"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        contentContainerClassName="pb-28 px-5"
        data={offers}
        renderItem={({ item, index }) => {
          const isEven: boolean = index % 2 == 0;
          return (
            <View>
              <Pressable
                className={`w-full h-48 my-3 rounded-xl overflow-hidden shadow-lg flex items-center gap-5 ${isEven ? "flex-row-reverse" : "flex-row"}`}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="size-full"
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={`flex-1 h-full flex flex-col justify-center items-start gap-4 ${isEven ? "pl-10" : "pr-10"}`}
                    >
                      <Text className="text-3xl font-quicksand-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-10"
                        resizeMode="contain"
                        tintColor={"#ffffff"}
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
