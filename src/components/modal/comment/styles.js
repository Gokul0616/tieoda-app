import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
  containerInput: {
    flexDirection: "row",
    padding: 10,
  },
  input: {
    backgroundColor: "lightgrey",
    borderRadius: 4,
    marginHorizontal: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  flatList: {
    flex: 1,
    // marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default styles;
