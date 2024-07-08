import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import ProfilePostListItem from "./item";
export default function ProfilePostList({ posts }) {
  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        removeClippedSubviews
        data={posts}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => <ProfilePostListItem item={item && item} />}
      />
    </View>
  );
}
