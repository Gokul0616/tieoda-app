import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 65,
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  emailText: {
    padding: 20,
  },
  counterContainer: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  followContainer: {
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  counterLabelText: {
    fontSize: 11,
    color: "gray",
  },
  userProfileImageContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
  },
  image: {
    height: 100,
    position: "absolute",
    width: 100,
  },
});
export default styles;
