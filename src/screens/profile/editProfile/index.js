import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navbar";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { saveUserProfileImage } from "../../../services/user";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function EditProfileScreen() {
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const photoUri = result.assets[0].uri;
      saveUserProfileImage(photoUri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral title="Edit Profile" />
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageViewContainer}
          onPress={() => chooseImage()}
        >
          {auth.currentUser.photoURL ? (
            <Image
              style={styles.imageURL}
              source={{
                uri: auth.currentUser.photoURL,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require("../../../../assets/home/user.png")}
            />
          )}
          <View style={styles.imageOverlay} />
          <Feather name="camera" size={26} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <TouchableOpacity
          style={styles.fieldItemContainer}
          onPress={() =>
            navigation.navigate("editProfilefield", {
              title: "Display Name",
              field: "displayName",
              value: auth.currentUser.displayName,
            })
          }
        >
          <Text>Name</Text>
          <View style={styles.fieldValueContainer}>
            <Text>{auth.currentUser.displayName}</Text>
            <Feather name="chevron-right" size={20} color={"gray"} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
<Avatar.Icon
  size={80}
  icon={"account"}
  style={{ backgroundColor: "lightgray" }}
/>;
