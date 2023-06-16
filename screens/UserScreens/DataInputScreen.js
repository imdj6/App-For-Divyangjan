import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const DataInputScreen = ({navigation}) => {
  const data1 = [
    { label: "Developer Mode", value: "0" },
    { label: "User Mode", value: "1" },
    { label: "Developer Mode", value: "2" },
    { label: "User Mode", value: "3" },
    { label: "Developer Mode", value: "4" },
    { label: "User Mode", value: "5" },
    { label: "Developer Mode", value: "6" },
    { label: "User Mode", value: "7" },
  ];
  const [value, setValue] = React.useState({
    data: "",
  });
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <View className="w-3/4 mx-auto my-auto  space-y-24">
        <Text className='text-blue-500 font-bold text-center text-lg'>Please Select A Text To start capturing the video</Text>
        <View className='flex-row flex-1 items-center bg-gray-100'>
          <Dropdown
            className="rounded-xl px-4 py-6 bg-gray-100 "
            iconStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            data={data1}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select a word to make video"
            searchPlaceholder="Search..."
            value={value.data}
            onChange={(item) => {
              setValue({ ...value, data: item.value });
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                name="braille"
                size={24}
                color="grey"
                style={styles.icon}
              />
            )}
          />
        </View>
        <View className='space-y-7'>
          <View>
          <Button
            onPress={()=>{navigation.navigate('Animation')}}
            className="rounded-full"
            title="Let's Go"
            color="blue"
            accessibilityLabel="Learn more about this purple button"
          />
          </View>
          <View>
          <Button
            onPress={()=>{navigation.navigate('Demo')}}
            className="rounded-full"
            title="Show me a Demo"
            color="blue"
            accessibilityLabel="Learn more about this purple button"
          />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DataInputScreen;

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    padding: 2,
    paddingRight: 8,
  },
});
