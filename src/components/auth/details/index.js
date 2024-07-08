import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../../redux/actions/auth";
const AuthDetails = ({ authpage, setDetailsPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handlelogin = () => {
    dispatch(login(email, password))
      .then((user) => {
        console.log("Logged in successfully:");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  const handleRegister = () => {
    dispatch(register(email, password))
      .then((user) => {
        console.log("Registered successfully:");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDetailsPage(false)}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        style={styles.textInput}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={authpage == 0 ? handlelogin : handleRegister}
      >
        <Text style={styles.buttonText}>
          {authpage == 0 ? "Sign in" : "Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default AuthDetails;
