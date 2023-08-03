import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
const DataInputScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "signwords"));
        const newData = querySnapshot.docs.map((doc) => {
          const { name, url } = doc.data();
          return { label: name, value: url };
        });
        setData(newData);
      } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once
  const [value, setValue] = React.useState({
    data: "",
  });
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <View className="w-3/4 mx-auto my-auto  space-y-24">
        <Text className="text-blue-500 font-bold text-center text-lg">
          Please Select A Text To start capturing the video
        </Text>
        <View className=" bg-gray-200">
          <Dropdown
            className="rounded-full  bg-gray-200 p-3"
            iconStyle={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select a Word to Record"
            searchPlaceholder="Search..."
            value={value.url}
            onChange={(item) => {
              setValue({ ...value, data: item.value, name: item.label });
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
        <View className="space-y-7">
          <View>
            <Button
              onPress={() => {
                value.data
                  ? navigation.navigate("Animation", {
                      name: value.name,
                    })
                  : alert("please choose a option to start");
              }}
              className="rounded-full"
              title="Start Recording"
              color="blue"
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
          <View>
            <Button
              onPress={() => {
                value.data
                  ? navigation.navigate("Demo", {
                      url: value.data,
                      name: value.name,
                    })
                  : alert("please choose a option to start");
              }}
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
    padding: 5,
    marginRight: 10,
  },
});
