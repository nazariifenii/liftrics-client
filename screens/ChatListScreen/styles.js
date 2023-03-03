import { StyleSheet } from "react-native";
import { Colors } from "../../constants";

export default StyleSheet.create({
  inputRow: {
    height: 58,
    flexDirection: "row"
  },
  message: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 16,
    marginVertical: 10
  },
  messageContainer: {
    paddingHorizontal: 7,
    backgroundColor: Colors.tintColor,
    height: 35,
    marginRight: 5,
    borderRadius: 80,
    borderColor: "transparent"
  },
  messageText: {
    flex: 1,
    paddingTop: 6,
    fontSize: 16,
    color: "#fff"
  }
});
