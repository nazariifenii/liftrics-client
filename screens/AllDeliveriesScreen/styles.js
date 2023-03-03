import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constants";

export default StyleSheet.create({
  clearFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16
  },
  clearFilterText: {
    fontSize: 15
  },
  clearFilterTextLink: {
    color: Colors.selectedItemColor
  }
});
