import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, View } from "react-native";
import { Video } from "expo-av";
import { useUser } from "../../../../hooks/useUser";
import PostSingleOverlay from "./overlay";
import styles from "./styles";

const PostSingle = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);
  const user = useUser(item.creator).data;
  const [isLoaded, setIsLoaded] = useState(false);

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const unload = async () => {
    if (ref.current == null) {
      return;
    }
    try {
      await ref.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <PostSingleOverlay user={user} post={item} />
      {!isLoaded && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <Video
        ref={ref}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={true}
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
  );
});

export default PostSingle;
