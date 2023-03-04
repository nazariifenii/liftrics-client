import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/Colors";

type Props = {
  onPress: () => void;
};

const AddHeaderButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={Platform.OS === "ios" ? `ios-add` : "md-add"}
        size={35}
        color={Colors.black}
        style={{ marginHorizontal: 16 }}
      />
    </TouchableOpacity>
  );
};

export default AddHeaderButton;
