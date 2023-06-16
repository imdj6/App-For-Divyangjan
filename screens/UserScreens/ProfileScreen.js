import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const ProfileScreen = () => {
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <View className="mt-10 ">
        <Text className='text-white text-2xl'>Profile Screen</Text>
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;
