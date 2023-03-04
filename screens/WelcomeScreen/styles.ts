import { StyleSheet } from "react-native";
import { Colors, Fonts, Layout } from "../../constants";

const paddingBorder = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: paddingBorder,
    alignItems: "center",
    justifyContent: "space-between"
  },
  imageTitleContainer: { alignItems: "center" },
  screenTitle: {
    fontSize: 38,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginTop: 20
  },
  imageStyle: { width: 300, height: 250 },
  descriptionText: {
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColors
  },
  buttonsContainer: {
    marginBottom: 53
  },
  button: {
    width: Layout.window.width - paddingBorder * 2,
    marginBottom: 15
  }
});

export default styles;
