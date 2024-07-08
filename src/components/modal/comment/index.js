import { View, Text, Image, TextInput, FlatList } from "react-native";
import { useSelector } from "react-redux";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import {
  addComment,
  clearCommentListener,
  commentListener,
} from "../../../services/posts";
import CommentItem from "./item";
const CommentModal = ({ post }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    commentListener(post.id, setCommentList);

    return () => clearCommentListener();
  }, []);
  const handleCommentSend = () => {
    if (comment.length == 0) {
      return;
    }
    addComment(post.id, currentUser.uid, comment, true);
    setComment("");
  };
  const renderCommentsItem = ({ item }) => {
    return <CommentItem item={item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderCommentsItem}
        data={commentList}
        style={styles.flatList}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.containerInput}>
        <Image style={styles.avatar} source={{ uri: currentUser.photoURL }} />
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleCommentSend}>
          <Ionicons name="arrow-up-circle" size={34} color={"crimson"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CommentModal;
