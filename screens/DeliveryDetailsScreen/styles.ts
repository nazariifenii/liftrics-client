import { StyleSheet } from "react-native";
import { Layout, Colors, Fonts } from "../../constants";

const paddingBorder = 16;

export default StyleSheet.create({
  button: {
    width: Layout.window.width - paddingBorder * 2,
    margin: 16
  },
  centeredLoader: {
    flex: 1,
    justifyContent: "space-around"
  },
  orderRowContainer: {
    marginBottom: 26
  },
  driverRow: {
    marginTop: 26
  },
  bottomContainer: {
    justifyContent: "space-around"
  },
  informationalText: {
    fontSize: 16,
    fontFamily: Fonts.avenir,
    color: Colors.disabledTextColour,
    textAlign: "center",
    margin: 16
  },
  applicantsRow: {
    marginTop: 26
  },
  pictureContainer: {
    marginVertical: 15,
    alignItems: "center"
  },
  leaveFeedbackTitle: {
    textAlign: "center",
    fontSize: 21,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginTop: 20,
    marginBottom: 30
  }
});
