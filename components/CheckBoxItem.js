import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { CheckBox } from "react-native-elements";

const CheckBoxItem = ({ title, checked, onPress }) => {
  onItemPress = () => {
    onPress(title);
  };
  return <CheckBox title={title} checked={checked} onPress={onItemPress} />;
};

const styles = StyleSheet.create({});

export default CheckBoxItem;
