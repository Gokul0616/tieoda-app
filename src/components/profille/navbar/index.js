import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
export default function ProfileNavBar({ user }) {
  const profileName = user?.displayName
    ? user?.displayName
    : user?.providerData[0].displayName;
  console.log();
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Feather name="search" size={20} />
      </TouchableOpacity>
      <Text style={styles.text}>
        {profileName ? profileName : user?.username}
      </Text>
      <TouchableOpacity>
        <Feather name="menu" size={20} />
      </TouchableOpacity>
    </View>
  );
}
