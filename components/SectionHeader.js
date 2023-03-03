import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";
const SectionHeader = ({ title, containerStyle }) => (
  <View style={[styles.containerStyle, containerStyle]}>
    <Text style={styles.titleStyle}>{title}</Text>
    <ListItemSeparator />
  </View>
);

const styles = StyleSheet.create({
  titleStyle: {
    marginLeft: 16,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
    marginBottom: 2,
    fontSize: 17
  }
});

export default SectionHeader;
