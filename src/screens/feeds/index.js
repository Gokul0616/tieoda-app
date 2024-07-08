import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import PostSingle from "../../components/general/post";
import { useEffect, useRef, useState } from "react";
import { getFeed, getPostByUserId } from "../../services/posts";
import useMaterialNavBarHeight from "../../hooks/useMaterialNavBarHeight";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FeedScreen({ route }) {
  const focused = useIsFocused();
  const { setCurrentUserProfileItemInView, creator, profile } =
    route.params || {};
  const mediaRefs = useRef({});
  const [posts, setPosts] = useState([]);
  const [currentViewableItemId, setCurrentViewableItemId] = useState(null);
  const [isPaused, setIsPaused] = useState({});
  const [overlayVisible, setOverlayVisible] = useState(true);
  const feedItemHeight =
    Dimensions.get("window").height - useMaterialNavBarHeight(profile);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 100 });

  useEffect(() => {
    if (!focused) {
      Object.keys(mediaRefs.current).forEach((id) => {
        const cell = mediaRefs.current[id];
        if (cell) {
          cell.pause();
        }
      });
    }
  }, [focused]);
  useEffect(() => {
    if (profile) {
      getPostByUserId(creator).then(setPosts);
    } else {
      const unsubscribe = getFeed(setPosts);
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const viewableItem = viewableItems[0].item;
      if (!profile) {
        setCurrentUserProfileItemInView(viewableItem.creator);
      }
      setCurrentViewableItemId(viewableItem.id);
    }
  });

  useEffect(() => {
    if (focused) {
      Object.keys(mediaRefs.current).forEach((id) => {
        const cell = mediaRefs.current[id];
        if (cell) {
          if (id === currentViewableItemId) {
            if (isPaused[id]) {
              cell.pause();
            } else {
              cell.play();
            }
          } else {
            cell.pause();
          }
        }
      });
    }
  }, [currentViewableItemId, focused, isPaused]);

  const handleLongPress = (item) => {
    const cell = mediaRefs.current[item.id];
    if (cell) {
      cell.pause();
      setOverlayVisible(false);
    }
  };

  const handlePressOut = (item) => {
    const cell = mediaRefs.current[item.id];
    if (cell) {
      cell.play();
      setOverlayVisible(true);
    }
  };

  const handlePress = (item) => {
    setIsPaused((prevState) => {
      const newState = { ...prevState, [item.id]: !prevState[item.id] };
      const cell = mediaRefs.current[item.id];
      if (cell) {
        if (newState[item.id]) {
          cell.pause();
        } else {
          cell.play();
        }
      }
      return newState;
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ height: feedItemHeight, backgroundColor: "black" }}
      activeOpacity={1}
      onLongPress={() => handleLongPress(item)}
      onPressOut={() => handlePressOut(item)}
    >
      <PostSingle
        overlayVisible={overlayVisible}
        item={item}
        handlePress={handlePress} // Pass handlePress as a prop
        ref={(PostSingleRef) => (mediaRefs.current[item.id] = PostSingleRef)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        renderItem={renderItem}
        viewabilityConfig={viewConfigRef.current}
        removeClippedSubviews
        snapToInterval={feedItemHeight}
        disableIntervalMomentum
        windowSize={1}
        maxToRenderPerBatch={1}
        decelerationRate={"normal"}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
        pagingEnabled
      />
    </SafeAreaView>
  );
}
