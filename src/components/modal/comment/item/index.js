import { View, Text, Image } from "react-native";
import styles from "./styles";
import generalStyles from "../../../../styles/generalStyle";
import { useUser } from "../../../../hooks/useUser";
const CommentItem = ({ item }) => {
  const user = useUser(item.creator).data;
  return (
    <View style={styles.container}>
      <Image
        style={generalStyles.avatarSmall}
        source={{ uri: user.photoURL }}
      />
      <View style={styles.containertext}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text>{item.comment}</Text>
      </View>
    </View>
  );
};
export default CommentItem;
