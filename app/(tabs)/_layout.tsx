import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

interface Layoutprops {
  title: string;
  focused: any;
  icon: any;
}

const TabIcons: React.FC<Layoutprops> = ({ title, focused, icon }) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full min-w-[112px] gap-2 h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
      >
        <Image source={icon} tintColor={"#151312"} className="size-5"></Image>
        <Text className="text-secondary text-base font-semibold mt-1  ">
          {title}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className="size-full justify-center items-center mt-4 rounded-full ">
        <Image source={icon} tintColor={"#A8B5DB"} />
      </View>
    );
  }
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0f0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcons title="Home" focused={focused} icon={icons.home} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search ",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcons title="Search" focused={focused} icon={icons.search} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved ",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcons title="saved" focused={focused} icon={icons.save} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile ",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcons title="user" focused={focused} icon={icons.person} />
            </>
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
