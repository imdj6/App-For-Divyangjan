import React, { useState } from "react";
// import logo from "../../assets/logo.png";
import { Entypo } from "@expo/vector-icons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function LoginScreen({ navigation }) {
  const auth = getAuth();

  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      alert('please fill the required fields')
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password)
    } catch (error) {
      alert(error);
    }
  }

  return (
    <View className="w-full h-full  bg-black">
      <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
        {/* <Image
          source={logo}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        /> */}
        <Text className="block text-2xl font-bold text-center text-white">
          Sign In
        </Text>

        <View className="space-y-6">
          <View className="mt-1 space-y-4">
            <View className="flex font-main flex-row align-center rounded-xl px-1 py-1 bg-gray-100 text-black items-center">
              {/* <Icon style={styles.icon} name="email" size={18} color="gray" /> */}
              <Entypo name="email" size={18} color="gray" style={styles.icon} />
              <TextInput
                placeholder="Email"
                value={value.email}
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 "
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View className="flex flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100 items-center">
              <Entypo name="lock" size={24} color="black" style={styles.icon} />
              <TextInput
                placeholder="Password"
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0 text-black"
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>
          <Pressable className="bg-background border border-white rounded-3xl py-2 px-4 m-4">
            <Text
              className="text-center text-white font-bold text-base"
              onPress={signIn}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
        <Text className="text-center text-white font-main text-base">
          Don't Have an account?{" "}
          <Text
            className="text-blue"
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});
