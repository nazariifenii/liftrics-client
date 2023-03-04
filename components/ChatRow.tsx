import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";

import { Colors, Fonts } from "../constants";
import ListItemSeparator from "./ListItemSeparator";

type Props = {
  userName: string;
  imageUrl: string;
};

const ChatRow: React.FC<Props> = ({
  userName,
  imageUrl = "http://liftrics.herokuapp.com/users/5ce0598130f17600160a23a7/profile-pic",
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainRow}>
          <View style={styles.row}>
            <Avatar
              rounded
              source={{
                uri: imageUrl,
              }}
              size="medium"
            />
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{userName}</Text>
              <Text style={styles.tapToStart}>
                Натисність, щоб розпочати бесіду...
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ListItemSeparator />
    </>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  nameText: {
    fontSize: 19,
    fontFamily: Fonts.avenir,
    color: Colors.mainTextColor,
  },
  nameContainer: {
    justifyContent: "space-between",
    marginLeft: 5,
  },
  tapToStart: {
    fontSize: 15,
    fontFamily: Fonts.avenir,
    color: Colors.disabledTextColour,
  },
});
