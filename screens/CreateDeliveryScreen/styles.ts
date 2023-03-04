import { StyleSheet } from "react-native";
import { Layout } from "../../constants";

const paddingBorder = 16;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center"
  },
  photo: {
    marginTop: 20
  },
  sectionHeaderStyle: {
    marginTop: 20
  },
  deliverySizeHeader: {
    marginTop: 30
  },
  deliveryWeightHeader: {
    marginTop: 20
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20
  },
  button: {
    width: Layout.window.width - paddingBorder * 2,
    marginBottom: 15
  },
  sizeList: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default styles;
