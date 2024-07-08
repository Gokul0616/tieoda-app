import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "black", // Set a background color to avoid seeing any blank space
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background while loading
  },
  poster: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default styles;
