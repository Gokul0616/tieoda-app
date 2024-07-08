import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function searchUserItem({ item }) {
  const navigation = useNavigation(); // Fixed the typo here
  const avatarURL = require("../../../../assets/home/user.png");

  const handlePress = () => {
    navigation.navigate("profileOther", { initialUserId: item?.uid });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{item.displayName}</Text>
      <Image
        source={item.photoURL ? { uri: item.photoURL } : avatarURL}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}
