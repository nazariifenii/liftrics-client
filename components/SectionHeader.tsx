import React from "react";
import { ViewStyle, Text, View, StyleSheet } from "react-native";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";

type Props = {
  title: string;
  containerStyle: ViewStyle;
};

const SectionHeader: React.FC<Props> = ({ title, containerStyle }) => (
  <View style={containerStyle}>
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
    fontSize: 17,
  },
});

export default SectionHeader;
