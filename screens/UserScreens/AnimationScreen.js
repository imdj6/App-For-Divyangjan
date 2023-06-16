import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
const AnimationScreen = ({navigation}) => {
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
        <Text className='text-white text-center my-auto text-xl text-bold '>Recording will start after the timer Stops</Text>
      <View className="mx-auto my-auto">
        <CountdownCircleTimer
          isPlaying
          duration={7}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          className="mx-auto my-auto"
          onComplete={() => {
            navigation.navigate('Main')
          }}
        >
          {({ remainingTime }) => <Text className='text-blue-500 text-4xl'>{remainingTime}</Text>}
        </CountdownCircleTimer>
      </View>
    </LinearGradient>
  );
};

export default AnimationScreen;
