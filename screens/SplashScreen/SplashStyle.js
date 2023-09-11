import { StyleSheet } from "react-native";

const SplashStyle = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  wrapper: {
    flex: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    padding: 20,
    fontSize: 20
  },
});

export default SplashStyle;
