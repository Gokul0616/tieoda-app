import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  imageViewContainer: {
    backgroundColor: "lightgray",
    height: 100,
    width: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    height: 50,
    position: "absolute",
    tintColor: "gray",
    width: 50,
  },
  imageURL: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  imageOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    ...StyleSheet.absoluteFill,
  },
  fieldContainer: {
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  fieldItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
