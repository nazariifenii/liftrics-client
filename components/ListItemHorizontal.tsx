import React from "react";
import {
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

type Props = {
  id: string;
  title: string;
  image: string;
  selected: boolean;
  onPress: (id: string) => void;
};

const ListItemHorizontal: React.FC<Props> = ({
  id,
  title,
  image,
  selected,
  onPress,
}) => {
  const onItemPress = () => {
   onPress && onPress(id);
  };

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={styles.container}>
        {image && (
          <Ionicons
            name={Platform.OS === "ios" ? `ios-${image}` : `md-${image}`}
            size={35}
            color={selected ? Colors.tintColor : Colors.mainTextColor}
          />
        )}
        <Text style={[styles.itemTitle, selected ? styles.selectedText : null]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemHorizontal;

const styles = StyleSheet.create({
  container: {
    width: 55,
    alignItems: "center",
    paddingTop: 10,
  },
  itemTitle: {
    textAlign: "center",
    color: Colors.mainTextColor,
  },
  selectedText: {
    color: Colors.tintColor,
  },
});
