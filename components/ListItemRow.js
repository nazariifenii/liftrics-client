import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { Colors, Fonts } from "../constants";

const ListItemRow = ({ title, subtitle, onPress }) => {
  return (
    <ListItem
      title={title}
      subtitle={subtitle}
      onPress={onPress}
      chevron={!!onPress}
      subtitleStyle={styles.subtitleStyle}
      titleStyle={styles.titleStyle}
      containerStyle={styles.containerStyle}
      bottomDivider
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: 16,
    paddingVertical: 5
  },
  titleStyle: {
    fontSize: 12,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor
  },
  subtitleStyle: {
    fontSize: 15,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor
  }
});

export default ListItemRow;
