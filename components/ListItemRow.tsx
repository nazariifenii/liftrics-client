import React from "react";
import { StyleSheet, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Colors, Fonts } from "../constants";

type Props = {
  title: string;
  subtitle: string;
  onPress?: () => void;
};

const ListItemRow: React.FC<Props> = ({ title, subtitle, onPress }) => {
  return (
    <ListItem bottomDivider onPress={onPress}>
      <ListItem.Content style={styles.containerStyle}>
        <ListItem.Title style={styles.titleStyle}>
          <Text>{title}</Text>
        </ListItem.Title>
        <ListItem.Subtitle style={styles.subtitleStyle}>
          <Text>{subtitle}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>
      {!!onPress && <ListItem.Chevron />}
    </ListItem>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingLeft: 16,
    paddingVertical: 5,
  },
  titleStyle: {
    fontSize: 12,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
  },
  subtitleStyle: {
    fontSize: 15,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
  },
});

export default ListItemRow;
