import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import SearchUserItem from "../../components/search/useritem";
import { queryUserByEmail } from "../../services/user";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
export default function SearchScreen() {
  const [textInput, setTextInput] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    queryUserByEmail(textInput).then(setSearchUsers);
  }, [textInput]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChangeText={setTextInput}
        style={styles.textInput}
        placeholder="search"
      />
      <FlatList
        data={searchUsers}
        renderItem={({ item }) => <SearchUserItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
