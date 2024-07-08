import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "white",
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
  },
  formContainer: {
    margin: 20,
    flexDirection: "row",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    width: 60,
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 20,
  },
  cancelButton: {
    alignItems: "center",
    flex: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 4,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ff4040",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginRight: 10,
    borderRadius: 4,
  },
  cancelButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  spacerContainer: {
    flex: 1,
  },
  upladingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
