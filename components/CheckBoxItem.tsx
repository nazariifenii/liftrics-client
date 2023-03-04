import React from "react";
import { CheckBox } from "react-native-elements";

type Props = {
  title: string;
  checked: boolean;
  onPress: (title: string) => void;
};

const CheckBoxItem: React.FC<Props> = ({ title, checked, onPress }) => {
  const onItemPress = () => {
    onPress(title);
  };

  return <CheckBox title={title} checked={checked} onPress={onItemPress} />;
};

export default CheckBoxItem;
