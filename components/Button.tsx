import React from "react";
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

type Props = {
  titleStyle: ViewStyle;
  title: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({ onPress, titleStyle = {}, title }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={[styles.button, titleStyle]}>
      <Text>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
  },
});

export default Button;
