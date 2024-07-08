import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import NavBarGeneral from "../../../../components/general/navbar";
import { Divider } from "react-native-paper";
import generalStyles from "../../../../styles/generalStyle";
import { saveUserField } from "../../../../services/user";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function EditProfileFieldScreen({ route }) {
  const [textInputValue, setTextInputValue] = useState(value);
  const navigation = useNavigation();
  const { title, value, field } = route.params;
  const onSave = () => {
    saveUserField(field, textInputValue).then(() => {
      navigation.goBack();
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral
        title={title}
        rightButton={{ display: true, name: "save", action: onSave }}
      />
      <Divider />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={generalStyles.textInput}
          value={textInputValue}
          placeholder={value}
          onChangeText={(text) => setTextInputValue(text)}
        />
      </View>
    </SafeAreaView>
  );
}
