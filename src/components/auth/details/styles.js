import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderColor: "lightgray",
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    marginTop: 40,
  },
  button: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 15,
    marginTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default styles;
