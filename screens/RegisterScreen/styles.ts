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
  screenTitle: {
    fontSize: 38,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginTop: 20,
    textAlign: "center"
  },
  inputContainerStyle: {
    width: Layout.window.width - paddingBorder * 2
  },
  buttonsContainer: {
    marginBottom: 53
  },
  button: {
    width: Layout.window.width - paddingBorder * 2,
    marginBottom: 15
  },
  inputsContainer: {
    marginTop: 80
  },
  containerStyle: {
    marginTop: 9
  },
  inputsRow: {
    flexDirection: "row"
  }
});

export default styles;
