import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
export default function ProfilePostListItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("userPost", {
          creator: item.creator,
          profile: true,
        })
      }
    >
      <Image style={styles.image} source={{ uri: item.thumbnailURL }} />
    </TouchableOpacity>
  );
}
