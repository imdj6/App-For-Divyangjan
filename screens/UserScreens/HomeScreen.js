import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

import { getAuth } from "firebase/auth";
import {  updateDoc , doc, getDoc, setDoc, arrayUnion} from "firebase/firestore";

import { db } from "../../firebase";
export default function HomeScreen({ route,navigation }) {
  const { name } = route.params;
  //camera permission to allow microphone and camera
  const [hasPermission, setHasPermission] = useState(null);
  //camera type either back camera or front camera
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [videoSource, setVideoSource] = useState(null);
  //uploaded link
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const signwords=name;
  const cameraRef = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status2 } = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === "granted" || status2 === "granted");
    })();
  }, []);

  const auth = getAuth();
  const user = auth.currentUser;
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (user !== null) {
      setUserData(user);
    }
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
    recordVideo();
  };
  const recordVideo = async () => {
    if (cameraRef.current) {
      try {
        const videoRecordPromise = cameraRef.current.recordAsync({
          maxDuration: 6,
        });
        if (videoRecordPromise) {
          setIsVideoRecording(true);
          const data = await videoRecordPromise;
          const source = data.uri;
          if (source) {
            setIsPreview(true);
            console.log("video source", source);
            setVideoSource(source);
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const stopVideoRecording = () => {
    if (cameraRef.current) {
      setIsPreview(false);
      setIsVideoRecording(false);
      cameraRef.current.stopRecording();
    }
  };
  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const cancelPreview = async () => {
    // await cameraRef.current.resumePreview();
    setIsPreview(false);
    setVideoSource(null);
  };
  const renderCancelPreviewButton = () => (
    // <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
    //   <View style={[styles.closeCross, { transform: [{ rotate: "45deg" }] }]} />
    //   <View
    //     style={[styles.closeCross, { transform: [{ rotate: "-45deg" }] }]}
    //   />some-child
    // </TouchableOpacity>
    <></>
  );

  //sending video link to drive
  const handleSubmit = async () => {
    try {
      alert("started uploading please wait...");
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", videoSource, true);
        xhr.send(null);
      });

      const storageRef = ref(storage, `${user.uid + Math.random(5)}`);

      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImgUrl(downloadURL);
            const addDataToFirestore = async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                const customDocumentRef = doc(db, "data", user.uid);
            
                // Get the current document data
                const docSnapshot = await getDoc(customDocumentRef);
                const data = docSnapshot.exists() ? docSnapshot.data() : { [signwords]: [] };
            
                // Add the new URL to the 'name' array field
                data[signwords] = arrayUnion(downloadURL);
            
                // Update the document with the updated data
                await setDoc(customDocumentRef, data, { merge: true });
            
                alert("Data successfully added to the database,Redirecting to homescreen");
                navigation.navigate('Data');
              } catch (error) {
                console.error("Error adding data to Firestore:", error);
              }
            };
            addDataToFirestore();
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const renderVideoPlayer = () => (
    <LinearGradient
      colors={["#141e30", "#243b55"]}
      style={{ flex: 1, borderRadius: 20 }}
    >
      <View className="absolute mt-10 z-50 ml-2 opacity-50">
        <MaterialIcons
          name="cancel"
          size={32}
          color="white"
          onPress={cancelPreview}
        />
      </View>
      <Video
        source={{ uri: videoSource }}
        shouldPlay={true}
        isLooping
        className="h-full flex-1 mt-20"
      />
      <View className="bg-black p-5 rounded-xl z-50  opacity-50">
        <View className="flex-row space-x-3 bg-blue-500 justify-center rounded-full p-3 items-center">
          <Text className="text-2xl text-white">Submit</Text>
          <AntDesign
            name="checkcircle"
            size={28}
            color="white"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </LinearGradient>
  );
  const renderVideoRecordIndicator = () => (
    <View style={styles.recordIndicatorContainer}>
      <View style={styles.recordDot} />
      <Text style={styles.recordTitle}>{"Recording..."}</Text>
    </View>
  );
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{"Flip"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onLongPress={recordVideo}
        onPressOut={stopVideoRecording}
        style={styles.capture}
      />
    </View>
  );
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <Text style={styles.text}>
        Give Access To Camera and Microphone from device settings
      </Text>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {!isPreview && (
        <Camera
          ref={cameraRef}
          style={styles.container}
          type={cameraType}
          flashMode={Camera.Constants.FlashMode.on}
          onCameraReady={onCameraReady}
          onMountError={(error) => {
            console.log("cammera error", error);
          }}
        />
      )}
      <View style={styles.container}>
        {isVideoRecording && renderVideoRecordIndicator()}
        {videoSource && renderVideoPlayer()}
        {!videoSource && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 55,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#fff",
  },
});
