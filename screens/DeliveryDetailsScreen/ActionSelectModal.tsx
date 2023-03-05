import * as React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants";
import ListItemSeparator from "../../components/ListItemSeparator";

type Props = {
  isVisible: boolean;
  onOptionPress: (action: any) => void;
  onClose: () => void;
};

export default class ActionSelectModal extends React.PureComponent<Props> {
  onPress = (action: any) => {
    this.props.onOptionPress(action);
    this.props.onClose();
  };
  render() {
    const { isVisible } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        onBackdropPress={this.props.onClose}
        onBackButtonPress={this.props.onClose}
        style={styles.modal}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.onPress("edit")}>
            <View style={styles.button}>
              <Ionicons
                name={Platform.OS === "ios" ? `ios-brush` : "md-brush"}
                color={Colors.mainTextColor}
                size={22}
                style={{ width: 20 }}
              />
              <Text style={styles.buttonTitle}>Редагувати</Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 16 }}>
            <ListItemSeparator />
          </View>
          <TouchableOpacity onPress={() => this.onPress("delete")}>
            <View style={styles.button}>
              <Ionicons
                name={Platform.OS === "ios" ? `ios-trash` : "md-trash"}
                color={Colors.mainTextColor}
                size={25}
                style={{ width: 20 }}
              />
              <Text style={styles.buttonTitle}>Видалити</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    alignItems: "stretch",
    backgroundColor: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  buttonTitle: {
    fontSize: 19,
    marginLeft: 8,
    color: Colors.mainTextColor,
  },
});
