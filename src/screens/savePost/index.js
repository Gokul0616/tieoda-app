import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/actions/post";

export default function SavePostScreen(props) {
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSavePost = async () => {
    setRequestRunning(true);
    try {
      await dispatch(
        createPost(
          description,
          props.route.params.source,
          props.route.params.sourceThumb
        )
      );
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setRequestRunning(false);
    }
  };
  if (requestRunning) {
    return (
      <View style={styles.upladingContainer}>
        <ActivityIndicator color={"red"} size={"large"} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Describe your video"
          multiline
          maxLength={150}
          onChangeText={(text) => setDescription(text)}
          style={styles.inputText}
        />
        <Image source={props.route.params.source} style={styles.mediaPreview} />
      </View>
      <View style={styles.spacerContainer} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.cancelButton}
        >
          <Feather name="x" size={24} color={"black"} />
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSavePost()}
          style={styles.postButton}
        >
          <Feather name="corner-left-up" size={24} color={"white"} />
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
