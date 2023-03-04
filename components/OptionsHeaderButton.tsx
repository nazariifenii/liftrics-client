import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../constants";

type Props = {
  onPress: () => void;
};

const OptionsHeaderButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather size={25} color={Colors.black} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: { marginHorizontal: 16, marginTop: 4 },
});

export default OptionsHeaderButton;
