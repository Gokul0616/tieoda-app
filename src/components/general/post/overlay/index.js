import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getLikesById, updateLike } from "../../../../services/posts";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import { openCommentModal } from "../../../../redux/actions/modal";

export default function PostSingleOverlay({ user, post, onLike }) {
  const avatarURL = require("../../../../../assets/home/user.png");
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const userDetail = user.data;
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted
    getLikesById(post.id, currentUser.uid).then((res) => {
      if (isMounted) {
        setCurrentLikeState((prevState) => ({
          ...prevState,
          state: res,
        }));
      }
    });
    return () => {
      isMounted = false; // Cleanup flag when component is unmounted
    };
  }, [post.id, currentUser.uid]);

  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst) => {
        setCurrentLikeState((prevState) => ({
          state: !prevState.state,
          counter: prevState.counter + (prevState.state ? -1 : 1),
        }));
        updateLike(post.id, currentUser.uid, currentLikeStateInst.state);
      }),
    []
  );

  useEffect(() => {
    onLike.current = () => handleUpdateLike(currentLikeState); // Update to use currentLikeState
  }, [handleUpdateLike, currentLikeState]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>
          {userDetail ? userDetail.displayName : ""}
        </Text>
        <Text style={styles.description}>{post ? post.description : ""}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("profileOther", {
              initialUserId: user?.data?.uid,
            })
          }
        >
          <Image
            style={userDetail?.photoURL ? styles.avatar : styles.image}
            source={
              userDetail?.photoURL ? { uri: userDetail?.photoURL } : avatarURL
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUpdateLike(currentLikeState)}
        >
          <Ionicons
            color="white"
            size={40}
            name={currentLikeState.state ? "heart" : "heart-outline"}
          />
          <Text style={styles.actionButtonText}>
            {currentLikeState.counter}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => dispatch(openCommentModal(true, post))}
        >
          <Ionicons color="white" size={40} name={"chatbubble"} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
