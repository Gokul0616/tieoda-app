import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Touchable, Image } from "react-native";
import { Camera, CameraView } from "expo-camera/legacy";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styles from "./styles";
import {
  AutoFocus,
  FlashMode,
  VideoQuality,
} from "expo-camera/build/legacy/Camera.types";
import { Feather } from "@expo/vector-icons";
import * as VideoThumbnails from "expo-video-thumbnails";
export default function CameraScreen() {
  const [hasCameraPermissions, setHasCameraPermissions] = useState(false);
  const [hasAudioPermissions, setHasAudioPermissions] = useState(false);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false);

  const [galleryItems, setGalleryItems] = useState([]);

  const [cameraRef, setCameraRef] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );

  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermissions(cameraStatus.status === "granted");

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermissions(audioStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");

      if (galleryStatus.status === "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  if (!hasAudioPermissions || !hasCameraPermissions || !hasGalleryPermissions) {
    return (
      <View style={styles.container}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }
  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 3000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };
  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);

        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          navigation.navigate("savePost", {
            source: source,
            sourceThumb,
          });
          // console.log(source);
          // Handle the video data (e.g., save to gallery)
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      let sourceThumb = await generateThumbnail(result.assets[0].uri);
      navigation.navigate("savePost", {
        source: result.assets[0].uri,
        sourceThumb,
      });
    }
  };
  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.stopRecording();
    }
  };
  // console.log(cameraFlash);
  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
          autoFocus={AutoFocus.on}
          zoom={0}
        />
      ) : null}

      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={"white"} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            )
          }
        >
          <Feather
            name={cameraFlash === 0 ? "zap-off" : "zap"}
            size={24}
            color={"white"}
          />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
            style={styles.recordButton}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => pickFromGallery()}
            style={styles.galleryButton}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <Image
                style={styles.galleryButtonImage}
                source={{ uri: galleryItems[0].uri }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
