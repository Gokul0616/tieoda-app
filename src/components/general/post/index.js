import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, View, Image } from "react-native";
import { Video } from "expo-av";
import PostSingleOverlay from "./overlay";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useUser } from "../../../hooks/useUser";
import {
  State,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import React from "react";

const PostSingle = forwardRef(
  ({ item, overlayVisible, handlePress }, parentRef) => {
    const ref = useRef(null);
    const onLike = useRef(); // Ref to store the like function
    const user = useUser(item.creator);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useImperativeHandle(parentRef, () => ({
      play,
      unload,
      pause,
      stop,
    }));

    useEffect(() => {
      return () => unload();
    }, []);

    const play = async () => {
      if (ref.current == null) {
        return;
      }
      const status = await ref.current.getStatusAsync();
      if (status?.isPlaying) {
        return;
      }
      try {
        await ref.current.playAsync();
        setIsPaused(false); // Ensure isPaused state is updated
      } catch (e) {
        console.log(e);
      }
    };

    const stop = async () => {
      if (ref.current == null) {
        return;
      }
      const status = await ref.current.getStatusAsync();
      if (!status?.isPlaying) {
        return;
      }
      try {
        await ref.current.stopAsync();
      } catch (e) {
        console.log(e);
      }
    };

    const pause = async () => {
      if (ref.current == null) {
        return;
      }
      const status = await ref.current.getStatusAsync();
      if (!status?.isPlaying) {
        return;
      }
      try {
        await ref.current.pauseAsync();
        setIsPaused(true); // Ensure isPaused state is updated
      } catch (e) {
        console.log(e);
      }
    };

    const unload = async () => {
      if (ref.current == null) {
        return;
      }
      try {
        await ref.current.unloadAsync();
      } catch (e) {
        console.log(e);
      }
    };

    const doubleTapRef = React.useRef();
    const _onSingleTap = (event: TapGestureHandlerGestureEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        handlePress(item); // Call handlePress with the item
      }
    };

    const _onDoubleTap = (event: TapGestureHandlerGestureEvent) => {
      if (event.nativeEvent.state === State.ACTIVE) {
        if (onLike.current) {
          onLike.current();
        } else {
          console.log("onLike function is not assigned");
        }
      }
    };

    return (
      <View style={styles.container}>
        {overlayVisible && (
          <PostSingleOverlay
            user={user}
            post={item}
            onLike={onLike} // Pass the onLike ref to PostSingleOverlay
          />
        )}
        {!isLoaded && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="pink" />
          </View>
        )}
        {isPaused && (
          <Image
            source={require("../../../../assets/icons/play.png")}
            style={{
              position: "absolute",
              tintColor: "rgba(255, 255, 255, 0.5)",
              zIndex: 999,
              flex: 1,
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
        <TapGestureHandler
          onHandlerStateChange={_onSingleTap}
          waitFor={doubleTapRef}
        >
          <TapGestureHandler
            ref={doubleTapRef}
            onHandlerStateChange={_onDoubleTap}
            numberOfTaps={2}
          >
            <View style={styles.container}>
              <Video
                ref={ref}
                style={styles.video}
                resizeMode="cover"
                shouldPlay={false}
                isLooping
                source={{
                  uri: item.videoURL,
                }}
                usePoster
                posterSource={{ uri: item.thumbnailURL }}
                posterStyle={styles.poster}
                onLoadStart={() => {
                  setIsLoaded(false);
                }}
                onLoad={() => {
                  setIsLoaded(true);
                }}
                onError={(error) => console.log(error)}
              />
            </View>
          </TapGestureHandler>
        </TapGestureHandler>
      </View>
    );
  }
);

export default PostSingle;
