import React from "react";
import { View, StyleSheet } from "react-native";

import { Colors } from "../constants";

const ListItemSeparator = () => <View style={styles.line} />;

const styles = StyleSheet.create({
  line: {
    height: 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.separatorColor,
  },
});

export default ListItemSeparator;
