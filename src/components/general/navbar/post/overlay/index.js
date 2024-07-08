import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function PostSingleOverlay({ user, post }) {
  const avatarURL = require("../../../../../../assets/home/user.png");
  const navigation = useNavigation();
  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{user ? user.displayName : ""}</Text>
        <Text style={styles.description}>{post ? post.description : ""}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("profileOther", { initialUserId: user?.uid })
          }
        >
          <Image
            style={user?.photoURL ? styles.avatar : styles.image}
            source={user?.photoURL ? { uri: user?.photoURL } : avatarURL}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          // onPress={() => handleUpdateLike(currentLikeState)}
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
          // onPress={() => dispatch(openCommentModal(true, post))}
        >
          <Ionicons color="white" size={40} name={"chatbubble"} />
          <Text style={styles.actionButtonText}>{post.commentsCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
