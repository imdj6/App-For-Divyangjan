import { View, Text,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import { ScaleIcon,WrenchScrewdriverIcon,ArrowRightOnRectangleIcon,BookOpenIcon,LockClosedIcon,UserGroupIcon } from "react-native-heroicons/solid";
import UserBoxes from "../../components/userBoxes";
import {  signOut } from "firebase/auth";







const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      // const displayName = user.displayName;
      // const email = user.email;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;

      setUserData(user);

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
  }, []);
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <View className="mt-10 p-5">
        <Text className="text-white text-2xl">Profile Screen</Text>
      </View>

      <View className=" p-5 m-2 bg-blue-500 rounded-3xl mt-2 flex-row items-center justify-between">
        <View className="flex-row items-center space-x-5">
          <View>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Y3xGA-xeTqioR6RSXK-0b1YN2XpGJviHhA",
              }}
              style={{ width: 60, height: 60 }}
              className="rounded-full object-contain"
            />
          </View>
          <View className="flex space-y-1">
            <Text className="text-lg">{user.displayName?user.displayName:"Danish Jamal"}</Text>
            <Text className="text-xs">{user.email}</Text>
          </View>
        </View>
      </View>

      <View className="grid gap-3 space-y-9 p-3 m-1 ">
        {/* {Calling the button by passing props} */}
        <UserBoxes buttonText="History" icon={BookOpenIcon}/>
        <UserBoxes buttonText="Friends" icon={UserGroupIcon}/>
        <UserBoxes buttonText="Block User" icon={LockClosedIcon}/>
        <UserBoxes buttonText="Settings" icon={WrenchScrewdriverIcon}/>
        <UserBoxes buttonText="Legal" icon={ScaleIcon}/>
        <UserBoxes buttonText="Logout" press={()=>{
          signOut(auth).then(() => {
            alert('logout successfully')
          }).catch((error) => {
            alert(error);
          });
        }} icon={ArrowRightOnRectangleIcon}/>
      </View>

    </LinearGradient>
  );
};

export default ProfileScreen;
