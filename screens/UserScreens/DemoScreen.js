import { View, Text, Button } from "react-native";
import React from "react";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const DemoScreen = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <Video
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        paused={true}
        shouldPlay
        ref={video}
        muted={isMuted}
        style={{ flex: 1 }}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View className="w-30 mx-6 mb-6">
        <View>
          <Button
            title="Start Recording"
            onPress={() => {
              status.isPlaying ? video.current.pauseAsync():""
              navigation.navigate("Animation");
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default DemoScreen;
