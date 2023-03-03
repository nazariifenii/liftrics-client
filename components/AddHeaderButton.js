import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Icon } from "expo";

import Colors from "../constants/Colors";

const AddHeaderButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon.Ionicons
        name={Platform.OS === "ios" ? `ios-add` : "md-add"}
        size={35}
        color={"black"}
        style={{ marginHorizontal: 16 }}
      />
    </TouchableOpacity>
  );
};

export default AddHeaderButton;
