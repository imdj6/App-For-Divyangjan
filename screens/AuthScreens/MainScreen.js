import React from "react";
import { Text, Pressable, Image, View } from "react-native";
// import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

function MainScreen({ navigation }) {
  return (
    <View className="w-full h-full">
      <LinearGradient
        colors={["#141e30", "#243b55"]}
        style={{ flex: 1, borderRadius: 20 }}
      >
        <View className="mx-4 h-full flex justify-center align-center space-y-6">
          <View>
            <Image
              source={require("../../assets/phone.png")}
              style={{ width: 250, height: 250, alignSelf: "center" }}
            />
          </View>
          <Text className="text-2xl font-extrabold text-center mx-6 text-blue-500">
            Keep all you client conversations in one place
          </Text>
          <Text className="text-white text-sm text-center mx-4">
          Connect with a diverse and supportive community from around the globe. Join interactive forums, engage in meaningful conversations, and forge friendships with individuals who share your passion for sign language.
          </Text>
          <View>
            <Pressable className="bg-blue-500 rounded-3xl py-2 px-4 m-4">
              <Text
                className="text-center text-white font-bold text-base"
                onPress={() => navigation.navigate("Login")}
              >
                Sign In
              </Text>
            </Pressable>
            <Pressable className="bg-blue-500 rounded-3xl py-2 px-4 m-4">
              <Text
                className="text-center text-white font-bold text-base"
                onPress={() => navigation.navigate("Signup")}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default MainScreen;
