import React from "react";
import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

type Props = {
  onPress: () => void;
};

const FilterHeaderButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name={Platform.OS === "ios" ? `ios-options` : "md-options"}
        size={25}
        color={Colors.black}
        style={styles.filterHeaderButtonIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterHeaderButtonIcon: { marginHorizontal: 16, marginTop: 4 },
});

export default FilterHeaderButton;
