import { View, Text, Button } from "react-native";
import React from "react";
import { Video, ResizeMode } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const DemoScreen = ({ navigation, route }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { url, name } = route.params;
  return (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <Video
        source={{
          uri: url ? url : alert("video is not available"),
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
              status.isPlaying ? video.current.pauseAsync() : "";
              navigation.navigate("Animation", {
                name
              });
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default DemoScreen;
