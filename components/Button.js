import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const Button = props => (
  <TouchableHighlight onPress={props.onPress}>
    <View style={[styles.button, ...props.titleStyle]}>
      <Text>{props.title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16
  }
});

export default Button;
