import React, { useEffect, useState } from "react";
// import logo from "../../assets/logo.png"
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
//import Icon from 'react-native-vector-icons/FontAwesome';
// import { StackScreenProps } from '@react-navigation/stack';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function SignUpScreen({ navigation }) {
  const auth = getAuth();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleKeyboardShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  const [value, setValue] = React.useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    mode: "",
    error: "",
  });

  const data = [
    { label: "Male", value: "0" },
    { label: "Female", value: "1" },
  ];
  const data1 = [
    { label: "Developer Mode", value: "0" },
    { label: "User Mode", value: "1" },
  ];

  async function signUp() {
    if (
      value.email === "" ||
      value.password === "" ||
      value.age == "" ||
      value.name == "" ||
      value.mode == "" ||
      value.gender == ""
    ) {
      alert("please fill the required fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password)
        .then(async (authUser) => {
          try {
            const docRef = await addDoc(collection(db, "users"), {
              id: authUser.user.uid,
              name: value.name,
              age: value.age,
              email: value.email,
              mode: value.mode,
              gender: value.gender,
            });
            setValue({
              ...value,
              name: "",
              email: "",
              password: "",
              age: "",
              gender: "",
              mode: "",
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        })
        .then(async (authUser) => {
          try {
            updateProfile(auth.currentUser, {
              displayName: value.name,
              photoURL:
                "https://img.freepik.com/free-icon/priest_318-211734.jpg?size=626&ext=jpg",
            }).catch((error) => {
              console.log(error);
            });
            alert('you have been logined');
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <KeyboardAvoidingView
      className="w-full h-full  bg-black"
      behavior={isKeyboardVisible ? "padding" : "height"}
    >
      <View className="mx-4 mt-10 h-5/6 flex justify-center align-center space-y-10">
        {/* <Image source={logo} style={{ width: 100, height: 100, alignSelf: "center" }} /> */}

        <View className="space-y-6 my-auto">
          <Text className="block font-title text-2xl  font-bold text-center text-white">
            Sign Up
          </Text>
          <View className="mt-1 space-y-4 ">
            <View className="flex font-main items-center flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Ionicons
                name="person-circle"
                size={18}
                color="gray"
                style={styles.icon}
              />
              <TextInput
                placeholder="Name"
                value={value.name}
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, name: text })}
              />
            </View>

            <View className="flex font-main items-center flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="email" size={18} color="gray" />
              <TextInput
                placeholder="Email"
                value={value.email}
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, email: text })}
              />
            </View>

            <View className="flex font-main items-center flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <MaterialIcons
                name="date-range"
                size={18}
                style={styles.icon}
                color="black"
              />

              <TextInput
                placeholder="Age"
                value={value.age}
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, age: text })}
              />
            </View>

            <Dropdown
              className="rounded-xl px-1 py-2 bg-gray-100 "
              iconStyle={{ justifyContent: "space-between" }}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Gender"
              searchPlaceholder="Search..."
              value={value.gender}
              onChange={(item) => {
                setValue({ ...value, gender: item.value });
              }}
              renderLeftIcon={() => (
                <Entypo
                  name="select-arrows"
                  size={18}
                  color="grey"
                  style={styles.icon}
                />
              )}
            />

            <Dropdown
              className="rounded-xl px-1 py-2 bg-gray-100 "
              iconStyle={{ justifyContent: "space-between" }}
              data={data1}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Mode"
              searchPlaceholder="Search..."
              value={value.mode}
              onChange={(item) => {
                setValue({ ...value, mode: item.value });
              }}
              renderLeftIcon={() => (
                <Entypo
                  name="select-arrows"
                  size={18}
                  color="grey"
                  style={styles.icon}
                />
              )}
            />

            <View className="flex items-center flex-row justify-center align-center rounded-xl px-1 py-1 bg-gray-100">
              <Icon style={styles.icon} name="lock" size={18} color="gray" />
              <TextInput
                placeholder="Password"
                className="flex-1 pt-2.5 pr-2.5 pb-2.5 pl-0"
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
              />
            </View>
          </View>

          <Pressable
            className="bg-background border border-white rounded-3xl py-2 px-4 m-4"
            onPress={signUp}
          >
            <Text className="text-center text-white font-bold text-base">
              Sign Up
            </Text>
          </Pressable>
        </View>
        <Text className="text-center text-white font-main text-base">
          Have an account?{" "}
          <Text
            className="text-blue"
            onPress={() => navigation.navigate("Login")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

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
