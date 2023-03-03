import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Icon } from "expo";

import Colors from "../constants/Colors";

const OptionsHeaderButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon.Ionicons
        name={Platform.OS === "ios" ? `ios-more` : "md-more"}
        size={25}
        color={"black"}
        style={{ marginHorizontal: 16, marginTop: 4 }}
      />
    </TouchableOpacity>
  );
};

export default OptionsHeaderButton;
